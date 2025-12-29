import { Client } from "typesense";

export const client = new Client({
  nodes: [{ url: process.env.TYPESENSE_URL! }],
  apiKey: process.env.TYPESENSE_API_KEY!,
  connectionTimeoutSeconds: 30,
});
