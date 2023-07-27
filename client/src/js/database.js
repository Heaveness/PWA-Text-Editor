import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const db = await openDB('jate', 1);

  const transaction = db.transaction('jate', 'readwrite');
  const objectStore = transaction.objectStore('jate');

  // Use the put method to add or update the content in the database
  await objectStore.put({ content });

  console.log('Content saved to IndexedDB');
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const db = await openDB('jate', 1);

  const transaction = db.transaction('jate', 'readonly');
  const objectStore = transaction.objectStore('jate');

  // Use the get method to retrieve the content from the database
  const data = await objectStore.get(1); // Assuming you only have one entry with the key 'id' set to 1

  return data?.content || null; // Return the content or null if not found
};

initdb();
