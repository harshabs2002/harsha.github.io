function analyzeImageColors() {
  const img = document.getElementById('image_1');
  const result = document.getElementById('result');
  
  const canvas = document.createElement('canvas');
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  let rCount = 0;
  let gCount = 0;
  let bCount = 0;
  for (let i = 0; i < data.length; i += 4) {
      if (data[i] > data[i + 1] + data[i + 2]) {
          rCount++;
      } else if (data[i + 1] > data[i] + data[i + 2]) {
          gCount++;
      } else {
          bCount++;
      }
  }
  let resultText = '';
  if (rCount > gCount && rCount > bCount) {
      resultText = 'The image is reddish.';
  } else if (gCount > rCount && gCount > bCount) {
      resultText = 'The image is greenish.';
  } else {
      resultText = 'The image is blueish.';
  }
  result.textContent = resultText;
}

document.getElementById('checkColor').addEventListener('click', () => {
  analyzeImageColors();
});

const img = document.getElementById('image_1');
img.onload = () => {
  analyzeImageColors();
};


function makeReddish() {
  const image = new ImageJS(document.getElementById("image_2"));

  // Get image data (library specific function)
  const imageData = image.getImageData();

  // Loop through pixels and adjust red value (limited approach)
  for (let i = 0; i < imageData.data.length; i += 4) {
    // Increase red value slightly, clamp to prevent overflow (0-255)
    imageData.data[i] = Math.min(255, imageData.data[i] + 20);
  }

  // Update image source with modified data (might not work in all browsers)
  image.putImageData(imageData);
  document.getElementById("image_2").src = image.toDataURL(); // Corrected ID here
}


function dupli() {
  const originalImage = document.getElementById("duplimage");
  const newImage = originalImage.cloneNode(true); // Create a deep clone

  // Generate a unique ID for the new image (optional)
  newImage.id = originalImage.id + "-duplicate";

  // Find a suitable parent element to insert the new image (optional)
  const parentElement = originalImage.parentElement;

  // Insert the new image after the original image (or adjust as needed)
  parentElement.insertBefore(newImage, originalImage.nextSibling);
}

function increaseBrightness() {
  const originalImage = document.getElementById("bright");
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  // Set canvas dimensions to match the image
  canvas.width = originalImage.naturalWidth;
  canvas.height = originalImage.naturalHeight;

  // Draw the original image onto the canvas
  context.drawImage(originalImage, 0, 0);

  // Get image data
  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

  // Increase brightness (adjust factor as needed)
  const brightnessFactor = 1.2; // Increase brightness by 20%
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    data[i] = Math.min(255, data[i] * brightnessFactor); // Red
    data[i + 1] = Math.min(255, data[i + 1] * brightnessFactor); // Green
    data[i + 2] = Math.min(255, data[i + 2] * brightnessFactor); // Blue
  }

  // Update canvas with modified data
  context.putImageData(imageData, 0, 0);

  // Replace the original image source with the canvas data URL
  originalImage.src = canvas.toDataURL();
}


function reduceResolution() {
  const originalImage = document.getElementById("reso");
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  // Define the new resolution (adjust width and height as needed)
  const newWidth = Math.floor(originalImage.naturalWidth / 2);
  const newHeight = Math.floor(originalImage.naturalHeight / 2);

  // Set canvas dimensions to the new resolution
  canvas.width = newWidth;
  canvas.height = newHeight;

  // Draw the original image onto the canvas with scaling
  context.drawImage(originalImage, 0, 0, originalImage.naturalWidth, originalImage.naturalHeight, 0, 0, newWidth, newHeight);

  // Replace the original image source with the canvas data URL (lower resolution)
  originalImage.src = canvas.toDataURL();
}

function createAvatar() {
  const originalImage = document.getElementById("avatar");
  const canvas = document.getElementById("avatarCanvas");
  const context = canvas.getContext("2d");

  // Define the avatar size (adjust width and height as needed)
  const avatarSize = Math.min(canvas.width, canvas.height);

  // Clip a circular region from the original image
  context.beginPath();
  context.arc(avatarSize / 2, avatarSize / 2, avatarSize / 2, 0, 2 * Math.PI);
  context.clip();

  // Draw the original image onto the canvas with scaling and clipping
  context.drawImage(originalImage, 0, 0, originalImage.naturalWidth, originalImage.naturalHeight, 0, 0, avatarSize, avatarSize);
}


function grayscale() {
  var image = document.getElementById('grayscale');
  var canvas = document.createElement('canvas');
  canvas.width = image.width;
  canvas.height = image.height;
  var ctx = canvas.getContext('2d');
  ctx.drawImage(image, 0, 0);

  var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  var data = imageData.data;

  for (var i = 0; i < data.length; i += 4) {
      var r = data[i];
      var g = data[i + 1];
      var b = data[i + 2];
      var grayscale = 0.2126 * r + 0.7152 * g + 0.0722 * b; // Using luminance method

      // Set the grayscale value for all color channels
      data[i] = grayscale; // Red channel
      data[i + 1] = grayscale; // Green channel
      data[i + 2] = grayscale; // Blue channel
  }

  // Put the modified image data back onto the canvas
  ctx.putImageData(imageData, 0, 0);

  // Replace the original image with the grayscale version
  image.src = canvas.toDataURL();
}
// Function to generate QR code
function qrgeneration() {
  const qrCanvas = document.createElement("canvas");

  // Set canvas dimensions
  qrCanvas.width = 200;
  qrCanvas.height = 200;

  // Generate QR code
  const qrCode = new QRCode(qrCanvas, {
      text: "https://example.com", // Example URL to encode in the QR code
      width: 200,
      height: 200,
  });

  // Convert the QR code canvas to base64 data URL
  const qrDataURL = qrCanvas.toDataURL();

  // Get the image element with the ID 'qr'
  const qrImage = document.getElementById("qr");

  // Set the 'src' attribute of the image to the generated QR code data URL
  qrImage.src = qrDataURL;
}

