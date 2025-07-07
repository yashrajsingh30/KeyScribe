import { Client, Account, Databases } from 'appwrite';

// Initialize the Appwrite client
const client = new Client()
  .setEndpoint(process.env.REACT_APP_APPWRITE_ENDPOINT)
  .setProject(process.env.REACT_APP_APPWRITE_PROJECT);

export const account = new Account(client);
export const databases = new Databases(client);
export const DATABASE_ID = process.env.REACT_APP_DATABASE_ID;
export const COLLECTION_ID = process.env.REACT_APP_COLLECTION_ID;