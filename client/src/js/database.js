// Import the 'openDB' method from the 'idb' package.
import { openDB } from 'idb';

// Define a function to initialize the IndexedDB database.
const initdb = async () => {
  // Open the 'jate' database with version 1.
  openDB('jate', 1, {
    upgrade(db) {
      // If the 'jate' object store already exists, log a message and return.
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }

      // Otherwise, create an object store named 'jate' with autoIncrement set to true.
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });
};

// Added logic to a method that accepts some content and adds it to the database.
export const putDb = async (content) => {
  const db = await openDB('jate', 1);

  const transaction = db.transaction('jate', 'readwrite');
  const objectStore = transaction.objectStore('jate');

  try {
    // Use the put method to add or update the content in the database.
    await objectStore.put({ content });

    console.log('Content saved to IndexedDB');
  } catch (error) {
    console.error('Error saving content to IndexedDB:', error);
  }
};

// Added logic for a method that gets all the content from the database.
export const getDb = async () => {
  const db = await openDB('jate', 1);

  const transaction = db.transaction('jate', 'readonly');
  const objectStore = transaction.objectStore('jate');

  try {
    // Use the get method to retrieve the content from the database.
    const data = await objectStore.get(1); // Assuming you only have one entry with the key 'id' set to 1.

    return data?.content || null; // Return the content or null if not found.
  } catch (error) {
    console.error('Error retrieving content from IndexedDB:', error);
    return null;
  }
};

initdb();
