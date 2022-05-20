import { MongoClient, MongoClientOptions } from "mongodb";

const uri = String(process.env.MONGODB_URI);
const options: MongoClientOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

let client: any;
let clientPromise: any;

if (!process.env.MONGODB_URI)
  throw new Error("Please add Your Mongo URI to .env.local");

if (process.env.NODE_ENV === "development") {
  // read the documentation for more details

  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
