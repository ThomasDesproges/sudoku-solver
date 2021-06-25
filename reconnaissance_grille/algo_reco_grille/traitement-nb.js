
let imgElement = document.getElementById('imageSrc');
let inputElement = document.getElementById('fileInput');
console.log(imgElement.src,imgElement);
console.log("initalisation de l'image okay");
inputElement.addEventListener('change', (e) => {
imgElement.src = URL.createObjectURL(e.target.files[0]);
}, false);

imgElement.onload = function() {
  console.log("fonction transformation active");
  let imgSudoku = cv.imread(imgElement);
  let outerBox = new cv.Mat();
  let ksize = new cv.Size(7, 7);
  cv.cvtColor(imgSudoku,imgSudoku, cv.COLOR_RGBA2GRAY);
  cv.GaussianBlur(imgSudoku, imgSudoku, ksize, 0);
  cv.imshow("canvasOutput",imgSudoku);
  cv.adaptiveThreshold(imgSudoku, outerBox, 255, cv.ADAPTIVE_THRESH_GAUSSIAN_C, cv.THRESH_BINARY, 5, 2);
  let kernel = cv.matFromArray(3, 3, cv.CV_8UC1, [0, 1, 0, 1, 1, 1, 0, 1, 0]);
  let anchor = new cv.Point(-1, -1);
  cv.bitwise_not(outerBox, outerBox)
  cv.dilate(outerBox, outerBox, kernel,anchor);
  cv.imshow("canvasOutput",imgSudoku);
  cv.imshow("canvasOutput2",outerBox);
  let row = 3, col = 4;
  let pixel_3_4 = imgSudoku.ucharPtr(row);
  let pixel_4_3 = imgSudoku.ucharPtr(4,3);
  console.log(pixel_3_4);
  console.log(pixel_4_3);


  let maxArea = -1;
  let maxPt = {x:0,y:0}

  let color = cv.matFromArray(1, 3, cv.CV_8UC1, [0, 0, 64]);
  let color_1 = cv.matFromArray(1, 3, cv.CV_8UC1, [50,50,50]);
  let color_2 = cv.matFromArray(1, 3, cv.CV_8UC1, [50,50,50]);

  for (x=0;x<outerBox.size().width;x++){
    let col = outerBox.ucharPtr(x)
    for (y=0;y<outerBox.size().height;y++){
      if (col[y] >= 128){
        let point = {x: x, y: y};
        const mask = new cv.Mat(outerBox.rows+2, outerBox.cols+2, cv.CV_8U, [0, 0, 0, 0])
        const rect = {};
        let area = cv.floodFill(
            outerBox,
            mask,
            point,
            [0, 0, 64, 0],
            rect,
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            4 | (255 << 8));

        if (area > maxArea){
          maxPt = point;
          maxArea = area;
          console.log("rect",rect)
          console.log("maxArea",maxArea);
          console.log(maxPt);
          console.log(x);
          console.log(y);
          console.log(outerBox.size())
        }
      }
    }
  }
}