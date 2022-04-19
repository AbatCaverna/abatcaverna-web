
import { loadStripe } from '@stripe/stripe-js'

export default async function getStripe() {
    const stripeJs = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!)

    return stripeJs
}