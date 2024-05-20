// Get the input elements
const imageUrlInputElement = document.getElementById('imageUrlInput');
const imageContainerElement = document.getElementById('imageContainer');
const previewButtonElement = document.getElementById('previewButton');

previewButtonElement.addEventListener('click', function() {
    const imageUrl = imageUrlInputElement.value;

    // Clear any existing content in the image container
    imageContainerElement.innerHTML = '';

    if (imageUrl) {
        // Create an image element
        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = 'Image Preview';

        // Create a download button
        const downloadButton = document.createElement('button');
        downloadButton.innerText = 'Download Image';
        downloadButton.classList.add('download-button');

        downloadButton.addEventListener('click', function() {
            const a = document.createElement('a');
            a.href = imageUrl;
            a.download = '';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        });

        // Add the image and download button to the image container
        imageContainerElement.appendChild(img);
        imageContainerElement.appendChild(downloadButton);
    } else {
        alert('Please enter a valid image URL.');
    }
});