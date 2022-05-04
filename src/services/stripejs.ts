
import { loadStripe } from '@stripe/stripe-js'

export default async function getStripe() {
    if (process.env.NEXT_PUBLIC_STRIPE_KEY === undefined) {
        throw new Error('Please add stripe public key!')
    }
    
    const stripeJs = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY)

    return stripeJs
}