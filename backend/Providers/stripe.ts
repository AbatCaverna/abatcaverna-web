import Stripe from 'stripe'

const privateKey = process.env.STRIPE_PRIVATE_KEY || ""

const stripe =  new Stripe(privateKey, {
  apiVersion: '2020-08-27',
});

export default stripe