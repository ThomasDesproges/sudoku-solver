let imgElement = document.getElementById('imageSrc');
let inputElement = document.getElementById('fileInput');
console.log(imgElement.src,imgElement);
inputElement.addEventListener('change', (e) => {
imgElement.src = URL.createObjectURL(e.target.files[0]);
}, false);

imgElement.onload = function() {
    console.log("fonction transformation active");
    let outerBox = cv.imread(imgElement);
    cv.cvtColor(outerBox,outerBox, cv.COLOR_RGBA2GRAY);
    console.log("point5570",outerBox.ucharPtr(55,70));
    console.log("point4040",outerBox.ucharPtr(40,40));
    point = {x:55,y:70}
    console.log("outerBox5570before",outerBox.ucharPtr(55,70));
    var mask = new cv.Mat(outerBox.rows + 2, outerBox.cols + 2, cv.CV_8U, [0,0,0,0])
    const rect = {};
    cv.floodFill(
    outerBox,
    mask,
    point,
    [64, 64, 64, 0],
    rect,
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    (4 | (255 << 8)));

    console.log("outerBox5570",outerBox.ucharPtr(55,70));
    console.log("outerBox5670",outerBox.ucharPtr(56,70));
    console.log("mask5570",mask.ucharPtr(55,70));
    console.log("What we should have : outerBox5570 : 64; mask5570 : 255");
    cv.imshow('canvasOutput2', outerBox);
    cv.imshow('canvasOutput3', mask);
}