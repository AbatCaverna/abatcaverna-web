import { NextApiRequest, NextApiResponse } from "next";
import { Readable } from "stream";
import Stripe from "stripe";
import { Email } from "../../../backend/Providers/email";
import stripe from "../../../backend/Providers/stripe"
import connectDatabase  from "../../../backend/Providers/mongo";

async function buffer(readable: Readable) {
  const chunks = [];

  for await (const chunk of readable) {
      chunks.push(
          typeof chunk === "string" ? Buffer.from(chunk) : chunk
      )
  }

  return Buffer.concat(chunks);
}

const relevantEvents = new Set([
  'checkout.session.completed',
])

export const config = {
  api: {
      bodyParser: false
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method === 'POST') {
      const buff = await buffer(req)
      const secret = req.headers['stripe-signature']
      const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

      let event: Stripe.Event
  
      try {
  
        if (secret && webhookSecret) {
          event = stripe.webhooks.constructEvent(buff, secret, webhookSecret)
  
        } else {
          return res.status(500).send("error with server keys not found")
        }
      } catch (err) {
        const { message } = err as any
        console.log(
          `[SERVER](${new Date().toDateString()}): webhook checkout error`,
          message
        )
        return res.status(400).send(`Webhook error: ${message}`)
      }
  
      const { type } = event
      if(relevantEvents.has(type)) {
        try {
          switch(type) {
            case 'checkout.session.completed':
              const checkoutSession = event.data.object as Stripe.Checkout.Session
              console.log(
                `[SERVER](${new Date().toDateString()}): webhook checkout complete`
              )
  
              const { name, email } = checkoutSession.customer_details!
  
              const line_items = await stripe.checkout.sessions.listLineItems(checkoutSession.id)

              const products = []
              let isIngresso = false
              
              for (const item of line_items.data) {
                const price = await stripe.prices.retrieve(item.price?.id!, {
                  expand: ['product']
                })

                const item_data = {
                  price_id: item.price?.id,
                  titulo: item.description || "",
                  preco: (price?.unit_amount! / 100).toLocaleString('pt-BR', {
                    style: 'currency', 
                    currency: 'BRL'
                  }),
                  isIngresso: false
                }

                const product = price.product as Stripe.Product

                if (product.metadata.ingresso) {
                  console.log(`[SERVER](${new Date().toDateString()}): Trying to buy a ticket, creating pdf file...`)
                  isIngresso = true
                  item_data.isIngresso = true
                }

                products.push(item_data)
              }
  
              const emailProvider = new Email()
  
              if (!name || !email) {
                return res.status(500).send(`Webhook error: $customer not found`)
              }

              const { database } = await connectDatabase()

              if (!database) return res.status(500).send('Could not connect to database')

              try {

                // busco por uma compra do usuario, 
                const orders = await database.collection("user_orders").find({ user_email: email }).toArray() as any

                if (orders) {
                  for (const order of orders) {
                    for (const product of order.products) {
                      if (product.isIngresso) {
                        console.log('[SERVER]: Usuario tentou comprar mais de um ingresso')
                        return res.status(500).send(`Usuário pode comprar apenas um ingresso por conta`)
                      }
                    }
                  }
                }

                await database.collection("user_orders").insertOne({
                  user_email: email,
                  products: products
                })
    
                await emailProvider.sendEmail(products, name, email, isIngresso)
              } catch (error) {
                console.log('[SERVER]: Erro handling checkout', error)
                return res.status(500).send(error)
              }

             
  
              break
            default:
              throw new Error('Unhandled webhook event')
          }
        } catch (error) {
          return res.json({error: 'Webhook handler failed'})
        }
      }
  
      res.status(200).json({received: true})
    } else {
      res.setHeader('Allow', 'POST');
      res.status(405).end('Method not allowed')
    }
    
}