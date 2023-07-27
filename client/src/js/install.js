const butInstall = document.getElementById('buttonInstall');

let deferredPrompt;

// Logic for installing the PWA
window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  deferredPrompt = event;
  // Show the install button
  butInstall.style.display = 'block';
});

butInstall.addEventListener('click', async () => {
  // Show the installation prompt
  deferredPrompt.prompt();
  const { outcome } = await deferredPrompt.userChoice;
  if (outcome === 'accepted') {
    console.log('User accepted the PWA installation');
  } else {
    console.log('User declined the PWA installation');
  }
  // Hide the install button
  butInstall.style.display = 'none';
});

// Hide the install button if the app is already installed
window.addEventListener('appinstalled', () => {
  butInstall.style.display = 'none';
});