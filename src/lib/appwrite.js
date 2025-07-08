// src/lib/appwrite.js
import { Client, Account, Databases, ID, Query } from 'appwrite';

const client = new Client()
  .setEndpoint(process.env.REACT_APP_APPWRITE_ENDPOINT)
  .setProject(process.env.REACT_APP_APPWRITE_PROJECT_ID);

// Establish an anonymous session once
const account = new Account(client);
account.createAnonymousSession()
  .then(() => console.log('✅ Anonymous session OK'))
  .catch(err => console.error('❌ Anonymous login failed', err));

export const databases = new Databases(client);

export async function fetchNotes(userId) {
  const res = await databases.listDocuments(
    process.env.REACT_APP_APPWRITE_DATABASE_ID,
    process.env.REACT_APP_APPWRITE_COLLECTION_ID,
    [
      Query.equal('userId', [userId]),
      Query.orderDesc('updatedAt')
    ]
  );
  return res.documents;
}

export async function saveNote(note) {
  const { $id, userId, title, content, updatedAt } = note;
  const payload = { userId, title, content, updatedAt };
  if ($id) {
    // Update existing
    return databases.updateDocument(
      process.env.REACT_APP_APPWRITE_DATABASE_ID,
      process.env.REACT_APP_APPWRITE_COLLECTION_ID,
      $id,
      payload
    );
  } else {
    // Create new
    return databases.createDocument(
      process.env.REACT_APP_APPWRITE_DATABASE_ID,
      process.env.REACT_APP_APPWRITE_COLLECTION_ID,
      ID.unique(),
      payload
    );
  }
}

export async function deleteNote(id) {
  return databases.deleteDocument(
    process.env.REACT_APP_APPWRITE_DATABASE_ID,
    process.env.REACT_APP_APPWRITE_COLLECTION_ID,
    id
  );
}
