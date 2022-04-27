import { MongoClient } from 'mongodb'

export default async function connectMongo() {
  const uri = process.env.MONGODB_URI
  const options = {}
  
  if (!process.env.MONGODB_URI || !uri) {
    throw new Error('Please add your Mongo URI to .env.local')
  }
  
  // Export a module-scoped MongoClient promise. By doing this in a
  // separate module, the client can be shared across functions.
  const client = new MongoClient(uri, options)
  const clientPromise = client.connect()
  try {
    const database = (await clientPromise).db('abatcaverna')
    console.info(`LOG[SERVER](${new Date().toDateString()}): Database connected!`)
    return { database }
  } catch (error) {
    console.error(`Error[SERVER](${new Date().toDateString()}): Database connection error!`, error)
    return { }
  }

}
