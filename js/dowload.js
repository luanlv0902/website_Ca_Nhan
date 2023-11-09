function downloadImage(imageUrl) {
    var a = document.createElement('a');
    a.href = imageUrl;
    a.download = 'image.jpg';
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}