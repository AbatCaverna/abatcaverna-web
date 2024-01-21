declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ABAT_TOKEN: string;
      ABAT_API_URL: string;

      GOOGLE_ID: string
      GOOGLE_SECRET: string
      NEXT_PUBLIC_GOOGLE_KEY: string
      NEXT_PUBLIC_MAPS_KEY: string

      MONGODB_URI: string
      MONGODB_DB_NAME: string

      NEXTAUTH_URL: string
      NEXTAUTH_SECRET: string

      NEXT_PUBLIC_STRIPE_KEY: string
      STRIPE_PRIVATE_KEY: string
      STRIPE_WEBHOOK_SECRET: string

      SENDGRID_API_KEY: string
    }
  }
}
