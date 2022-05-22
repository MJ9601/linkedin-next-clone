import { MongoClient } from "mongodb";

// const uri = process.env.MONGODB_URI;
// const dbName = process.env.MONGODB_DB;

const uri = "mongodb://localhost:27017/linkedin"; //local server;
const dbName = "linkedin";

let cachedClient: null | any = null; 
let cachedDb: null | any = null;

if (!uri || !dbName) throw new Error("The uri or db name is not defined!");

export const connectToDB = async () => {
  if (cachedClient && cachedDb) return { client: cachedClient, db: cachedDb };

  const _client = new MongoClient(uri);

  const client = await _client.connect();

  const db = client.db(dbName);

  cachedClient = client;
  cachedDb = db;

  return { client, db };
};
