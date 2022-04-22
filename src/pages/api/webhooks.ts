import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { Readable } from 'stream';
import Stripe from "stripe";
import { Email } from "../../../backend/Providers/email";
import stripe from "../../../backend/Providers/stripe"

async function buffer(readable: Readable) {
    const chunks = [];

    for await (const chunk of readable) {
        chunks.push(
            typeof chunk === "string" ? Buffer.from(chunk) : chunk
        )
    }

    return Buffer.concat(chunks);
}

export const config = {
    api: {
        bodyParser: false
    }
}

const relevantEvents = new Set([
    'checkout.session.completed',
])

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
    if(request.method === 'POST') {
      const buff = await buffer(request)
      const secret = request.headers['stripe-signature'] || ''
      const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || ''

      let event: Stripe.Event

      try {
          event = stripe.webhooks.constructEvent(buff, secret, webhookSecret)
      } catch (err) {
        const { message } = err as any
        return response.status(400).send(`Webhook error: ${message}`)
      }

      const { type } = event
      if(relevantEvents.has(type)) {
        try {
          switch(type) {
            case 'checkout.session.completed':
              const checkoutSession = event.data.object as Stripe.Checkout.Session
              console.log(
                `[SERVER](${new Date().toDateString()}): webhook checkout complete`,
                checkoutSession
              )

              const { name, email } = checkoutSession.customer_details!

              const line_items = await stripe.checkout.sessions.listLineItems(checkoutSession.id)
              const list = line_items.data.map((item) => ({
                titulo: item.description || "",
                preco: (item.price?.unit_amount! / 100).toLocaleString('pt-BR', {
                  style: 'currency', 
                  currency: 'BRL'
                })
              }))

              const emailProvider = new Email()

              if (!name || !email) {
                return response.status(500).send(`Webhook error: $customer not found`)
              }

              await emailProvider.sendEmail(list, name, email)
              break
            default:
              throw new Error('Unhandled webhook event')
          }
        } catch (error) {
          return response.json({error: 'Webhook handler failed'})
        }
      }

      response.status(200).json({received: true})
    } else {
      response.setHeader('Allow', 'POST');
      response.status(405).end('Method not allowed')
    }
    
}