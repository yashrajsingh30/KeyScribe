// src/lib/appwrite.js
import { Client, Account, Databases, ID, Query } from 'appwrite';

const client = new Client()
  .setEndpoint(process.env.REACT_APP_APPWRITE_ENDPOINT)    // e.g. https://cloud.appwrite.io/v1
  .setProject(process.env.REACT_APP_APPWRITE_PROJECT_ID);  // your Appwrite project ID

export const account   = new Account(client);
export const databases = new Databases(client);

const DB_ID            = process.env.REACT_APP_APPWRITE_DATABASE_ID;
const NOTES_COLLECTION = process.env.REACT_APP_APPWRITE_COLLECTION_ID;

/**
 * Sign up → create user account, then log them in
 */
export async function signup(email, password) {
  // 1) Create the Appwrite user
  await account.create(ID.unique(), email, password, email);
  // 2) Immediately create a session
  await account.createEmailPasswordSession(email, password);
  // 3) Return the user object
  return account.get();
}

/**
 * Log in existing user
 */
export async function login(email, password) {
  await account.createEmailPasswordSession(email, password);
  return account.get();
}

/**
 * Log out current user
 */
export async function logout() {
  return account.deleteSession('current');
}

/**
 * Get currently logged-in user (throws if none)
 */
export async function getUser() {
  return account.get();
}

/**
 * Fetch all notes for a given userId
 */
export async function fetchNotes(userId) {
  const res = await databases.listDocuments(DB_ID, NOTES_COLLECTION, [
    Query.equal('userId', [userId]),
    Query.orderDesc('updatedAt'),
  ]);
  return res.documents;
}

/**
 * Create or update a note document
 */
export async function saveNote(note) {
  const { $id, userId, title, content, updatedAt } = note;
  const payload = { userId, title, content, updatedAt };

  if ($id) {
    return databases.updateDocument(DB_ID, NOTES_COLLECTION, $id, payload);
  } else {
    return databases.createDocument(DB_ID, NOTES_COLLECTION, ID.unique(), payload);
  }
}

/**
 * Delete a note by its document ID
 */
export async function deleteNote(id) {
  return databases.deleteDocument(DB_ID, NOTES_COLLECTION, id);
}
