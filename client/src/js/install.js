// Get the install button element by its ID.
const butInstall = document.getElementById('buttonInstall');
let deferredPrompt;

// Logic for handling the PWA installation prompt.
window.addEventListener('beforeinstallprompt', (event) => {
    window.deferredPrompt = event;
    butInstall.classList.toggle('hidden', false);
});

// Event listener for the install button click.
butInstall.addEventListener('click', async () => {
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
        return;
    }
    promptEvent.prompt();
    const { outcome } = await promptEvent.userChoice;
    if (outcome === 'accepted') {
        console.log('User accepted the PWA installation');
    } else {
        console.log('User declined the PWA installation');
    }
    window.deferredPrompt = null;
    butInstall.classList.toggle('hidden', true);
});

// Hide the install button if the app is already installed.
window.addEventListener('appinstalled', () => {
    window.deferredPrompt = null;
});
