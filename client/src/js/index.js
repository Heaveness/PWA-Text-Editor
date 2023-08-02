// Import the Workbox class from 'workbox-window'.
import { Workbox } from 'workbox-window';
// Import the 'Editor' class from './editor'.
import Editor from './editor';
// Import './database' and '../css/style.css' (assumed to be other dependencies).

// Get the main element.
const main = document.querySelector('#main');

// Function to create and show a loading spinner.
const loadSpinner = () => {
    const spinner = document.createElement('div');
    spinner.classList.add('spinner');
    spinner.innerHTML = `
    <div class="loading-container">
    <div class="loading-spinner" />
    </div>
    `;
    main.appendChild(spinner);
};

// Create an instance of the 'Editor' class.
const editor = new Editor();

// If the 'editor' instance is undefined, show a loading spinner.
if (typeof editor === 'undefined') {
    loadSpinner();
}

// Check if service workers are supported in the browser.
if ('serviceWorker' in navigator) {
    const workboxSW = new Workbox('/src-sw.js');
    workboxSW.register();
} else {
    console.error('Service workers are not supported in this browser.');
}
