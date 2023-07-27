import { Workbox } from 'workbox-window';
import Editor from './editor';
import './database';
import '../css/style.css';

const editor = new Editor();

// Check if service workers are supported
if ('serviceWorker' in navigator) {
  // register workbox service worker
  const workboxSW = new Workbox('/src-sw.js');
  workboxSW.register();
} else {
  console.error('Service workers are not supported in this browser.');
}
