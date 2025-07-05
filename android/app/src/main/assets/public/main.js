import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { SplashScreen } from '@capacitor/splash-screen';

// Function to show a custom message box instead of alert()
function showMessageBox(message) {
    const messageBox = document.getElementById('messageBox');
    const messageText = document.getElementById('messageText');
    const messageCloseButton = document.getElementById('messageCloseButton');

    messageText.textContent = message;
    messageBox.classList.remove('hidden');

    messageCloseButton.onclick = () => {
        messageBox.classList.add('hidden');
    };
}

document.addEventListener('DOMContentLoaded', async () => {
    // Show the splash screen on app load
    await SplashScreen.show({
        showDuration: 3000, // Duration in ms
        autoHide: true,
        fadeInDuration: 200,
        fadeOutDuration: 200,
        launchShowDuration: 3000, // Redundant with showDuration but good to have
    });

    // Hide the splash screen after a delay (or when your app is ready)
    // For this example, we'll let autoHide handle it, but you can manually hide it
    // setTimeout(async () => {
    //     await SplashScreen.hide();
    // }, 3000); // Hide after 3 seconds

    const scanButton = document.getElementById('scanButton');
    const pasteButton = document.getElementById('pasteButton');
    const dialButton = document.getElementById('dialButton');
    const pinInput = document.getElementById('pinInput');
    const scannedImage = document.getElementById('scannedImage');

    // Function to handle camera capture
    scanButton.addEventListener('click', async () => {
        try {
            const photo = await Camera.getPhoto({
                quality: 90,
                allowEditing: false,
                resultType: CameraResultType.Uri, // Use Uri to display image easily
                source: CameraSource.Camera, // Directly open the camera
                promptLabelHeader: 'Scan Airtime Card',
                promptLabelPhoto: 'Choose from Gallery',
                promptLabelPicture: 'Take Photo'
            });

            // Set the image source to the captured photo
            scannedImage.src = photo.webPath;

            // --- OCR Simulation / Placeholder ---
            // In a real application, you would send 'photo.base64String' or 'photo.webPath'
            // to an OCR service (e.g., Google ML Kit, Tesseract.js, or a custom backend).
            // For this example, we'll prompt the user to manually enter the PIN.
            showMessageBox('Image captured! Please manually enter the 16-digit airtime PIN into the field below.');
            pinInput.focus(); // Focus on the input field
            // --- End OCR Simulation ---

        } catch (error) {
            console.error('Camera capture error:', error);
            showMessageBox('Failed to open camera or capture image. Please ensure camera permissions are granted.');
        }
    });

    // Function to handle pasting from clipboard
    pasteButton.addEventListener('click', async () => {
        try {
            // Check if Clipboard API is available and permissions are granted
            if (navigator.clipboard && navigator.clipboard.readText) {
                const text = await navigator.clipboard.readText();
                if (text) {
                    pinInput.value = text.trim();
                    showMessageBox('Text pasted from clipboard!');
                } else {
                    showMessageBox('Clipboard is empty or contains no text.');
                }
            } else {
                showMessageBox('Clipboard access not supported in this environment or permission denied.');
            }
        } catch (error) {
            console.error('Clipboard paste error:', error);
            showMessageBox('Failed to paste from clipboard. Please ensure clipboard permissions are granted.');
        }
    });

    // Function to handle dialing the PIN
    dialButton.addEventListener('click', () => {
        const pin = pinInput.value.trim();

        if (pin.length === 0) {
            showMessageBox('Please enter the airtime PIN first.');
            return;
        }

        // Construct the dialing string for your network.
        // Example for Zimbabwe: *121*PIN# is common for Econet.
        // Adjust this based on the specific network if needed.
        const dialString = `*121*${pin}#`;

        // Use window.location.href to trigger the phone dialer
        // The 'tel:' URI scheme will open the phone's dialer with the number pre-filled.
        window.location.href = `tel:${encodeURIComponent(dialString)}`;

        showMessageBox(`Attempting to dial: ${dialString}. Your phone's dialer should open shortly.`);
    });
});
