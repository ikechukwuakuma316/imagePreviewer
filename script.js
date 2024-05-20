// Get the input elements
const uploadInput = document.getElementById('upload');
const imageUrlInput = document.getElementById('imageUrl');

// Add event listener to the file input
uploadInput.addEventListener('change', function() {
    // Clear the image URL input field when a file is selected
    imageUrlInput.value = '';
});

document.getElementById('previewBtn').addEventListener('click', function () {
    const file = uploadInput.files[0];
    const imageUrl = imageUrlInput.value;
    const previewImg = document.getElementById('previewImg');
    const downloadBtn = document.getElementById('downloadBtn');

    let imgSrc = '';
    let downloadName = '';

    if (file) {
        imgSrc = URL.createObjectURL(file);
        downloadName = file.name;
    } else if (imageUrl) {
        imgSrc = imageUrl;
        downloadName = imageUrl.split('/').pop();
    } else {
        alert('Please select a file or enter an image URL.');
        return;
    }

    previewImg.src = imgSrc;
    previewImg.style.display = 'block';

    // Clone and replace the download button to remove previous event listeners
    const newDownloadBtn = downloadBtn.cloneNode(true);
    downloadBtn.parentNode.replaceChild(newDownloadBtn, downloadBtn);

    // Add a new event listener to the new download button
    newDownloadBtn.addEventListener('click', function () {
        fetch(imgSrc)
            .then(response => response.blob())
            .then(blob => {
                const blobUrl = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = blobUrl;
                a.download = downloadName;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            })
            .catch(error => console.error(error));
    });
});