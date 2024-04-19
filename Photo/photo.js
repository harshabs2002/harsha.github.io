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

function dupli() {
  const originalImage = document.getElementById("duplimage");
  const newImage = originalImage.cloneNode(true); // Create a deep clone

  newImage.id = originalImage.id + "-duplicate";
  const parentElement = originalImage.parentElement;
  parentElement.insertBefore(newImage, originalImage.nextSibling);
}

function increaseBrightness() {
  const originalImage = document.getElementById("bright");
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  canvas.width = originalImage.naturalWidth;
  canvas.height = originalImage.naturalHeight;

  context.drawImage(originalImage, 0, 0);

  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

  const brightnessFactor = 1.2; // Increase brightness by 20%
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    data[i] = Math.min(255, data[i] * brightnessFactor); // Red
    data[i + 1] = Math.min(255, data[i + 1] * brightnessFactor); // Green
    data[i + 2] = Math.min(255, data[i + 2] * brightnessFactor); // Blue
  }

  context.putImageData(imageData, 0, 0);

  originalImage.src = canvas.toDataURL();
}



function createAvatar() {
  const originalImage = document.getElementById("avatar");
  const canvas = document.getElementById("avatarCanvas");
  const context = canvas.getContext("2d");
  const avatarSize = Math.min(canvas.width, canvas.height);
  context.beginPath();
  context.arc(avatarSize / 2, avatarSize / 2, avatarSize / 2, 0, 2 * Math.PI);
  context.clip();
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

  ctx.putImageData(imageData, 0, 0);
  image.src = canvas.toDataURL();
}

function changeColor(imageElement, toColor) {

  // Create the canvas element
  var canvas = document.createElement('canvas');
  var context = canvas.getContext('2d');

  height = canvas.height = imageElement.naturalHeight || imageElement.offsetHeight || imageElement.height;
  width = canvas.width = imageElement.naturalWidth || imageElement.offsetWidth || imageElement.width;


  context.drawImage(imageElement, 0, 0);

  imageElement.crossOrigin = "anonymous";
  imgData = context.getImageData(
              0, 0, width, height);

  length = imgData.data.length;

  for (var i = 0; i < length; i += 4) {
      if(toColor == 'red'){
          imgData.data[i] = imgData.data[i+1] + imgData.data[i+2];
      }
      else if(toColor == 'green'){
          imgData.data[i+1] = imgData.data[i] + imgData.data[i+2];
      }
      else{
          imgData.data[i+2] = imgData.data[i] + imgData.data[i+1];
      }


  }

  context.putImageData(imgData, 0, 0);
  imageElement.src = canvas.toDataURL();
}
function resolution(imageElement) {

  var img = document.getElementById(imageElement);
  var canvas = document.createElement('canvas');
  var context = canvas.getContext('2d');
  const scaleFactor = 0.9;

  canvas.width = img.width * scaleFactor;
  canvas.height = img.height * scaleFactor;

  context.drawImage(img, 0, 0, canvas.width, canvas.height);
  img.crossOrigin = "anonymous";
  const reducedImageDataURL = canvas.toDataURL('image/jpeg', 0.2);
  img.src = reducedImageDataURL;
}
function generateQR(imagePath, canvasId) {
  const qrCode = new QRCodeStyling({
    width: 170,
    height: 170,
    type: "svg",
    data: imagePath,
  });

  const canvas = document.getElementById(canvasId);
  canvas.innerHTML = ""; // Clear previous QR code
  qrCode.append(canvas); // Display QR code for the image path
}