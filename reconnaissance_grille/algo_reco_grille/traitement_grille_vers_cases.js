



export default async function traitementGrilleVersCases(img,borderCleaning,borderFree,midSpace,BandWonly) {

    await loadOpenCV();
    //Paramètres à entrer : img,0.1,0.25,0.1,true

    let imgSudokuRaw = cv.imread(img);
    let imgSudoku = new cv.Mat();
    let outerBox = new cv.Mat();
    let ksize = new cv.Size(7, 7);
    cv.cvtColor(imgSudokuRaw,imgSudoku, cv.COLOR_RGBA2GRAY);
    cv.GaussianBlur(imgSudoku, imgSudoku, ksize, 0);
    cv.adaptiveThreshold(imgSudoku, outerBox, 255, cv.ADAPTIVE_THRESH_GAUSSIAN_C, cv.THRESH_BINARY, 5, 2);
    let kernel = cv.matFromArray(3, 3, cv.CV_8UC1, [0, 1, 0, 1, 1, 1, 0, 1, 0]);
    let anchor = new cv.Point(-1, -1);
    cv.bitwise_not(outerBox, outerBox);
    cv.dilate(outerBox, outerBox, kernel,anchor);


    var maxArea = -1;
    var maxPt = {x:0,y:0}

    const mask = new cv.Mat(outerBox.rows+2, outerBox.cols+2, cv.CV_8UC1, [0, 0, 0, 0]);
    for (x=0;x<outerBox.size().width;x++){
        for (y=0;y<outerBox.size().height;y++){
        if (outerBox.ucharPtr(y,x) >= 128){
            let point = {x: x, y: y};
            const rect = {};

            area = cv.floodFill(
            outerBox,
            mask,
            point,
            [64, 64, 64, 0],
            rect,
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            (4 | (255 << 8)));

            if (area > maxArea){
            maxPt = point;
            maxArea = area;
            }
        }
        }
    }

    const mask2 = new cv.Mat(outerBox.rows+2, outerBox.cols+2, cv.CV_8UC1, [0, 0, 0, 0]);
    cv.floodFill(outerBox, mask2, maxPt, [255,255,255,255]);


    const mask3 = new cv.Mat(outerBox.rows+2, outerBox.cols+2, cv.CV_8UC1, [0, 0, 0, 0]);
    for(let y=0;y<outerBox.size().height;y++)
    {
        let row = outerBox.ucharPtr(y);
        for(let x=0;x<outerBox.size().width;x++)
        {
            if(row[x]==64 && x!=maxPt.x && y!=maxPt.y)
            {
                cv.floodFill(outerBox, mask3, {x:x,y:y}, [0,0,0,0]);
            }
        }
    }


    let outerBoxRaw = new cv.Mat();
    outerBoxRaw = outerBox.clone();


    let dst = cv.Mat.zeros(outerBox.rows, outerBox.cols, cv.CV_8UC3);
    let lines = new cv.Mat();
    cv.Canny(outerBox, outerBox, 50, 200, 3);
    cv.HoughLines(outerBox, lines, 1, Math.PI / 180,
        130, 0, 0, 0, Math.PI);

    for (let i = 0; i < lines.rows; ++i) {
        let rho = lines.data32F[i * 2];
        let theta = lines.data32F[i * 2 + 1];
        let a = Math.cos(theta);
        let b = Math.sin(theta);
        let x0 = a * rho;
        let y0 = b * rho;
        let startPoint = {x: x0 - 1000 * b, y: y0 + 1000 * a};
        let endPoint = {x: x0 + 1000 * b, y: y0 - 1000 * a};
        cv.line(dst, startPoint, endPoint, [255, 0, 0, 255]);
    }

    let topEdge = new cv.Mat();
    topEdge[0] = 1000;
    topEdge[1] = 1000;
    let bottomEdge = new cv.Mat();
    bottomEdge[0] = -1000;
    bottomEdge[1] = -1000;
    let leftEdge = new cv.Mat();
    leftEdge[0] = 1000;
    leftEdge[1] = 1000;
    let rightEdge = new cv.Mat();
    rightEdge[0] = -1000;
    rightEdge[1] = -1000;

    var rightLine = 0;
    var leftLine = 0;

    for (let i = 0; i < lines.rows; ++i) {
        let rho = lines.data32F[i * 2];
        let theta = lines.data32F[i * 2 + 1];

        let xIntercept = rho/Math.cos(theta);
        let yIntercept = rho/(Math.cos(theta)*Math.sin(theta));

        if(theta>3.1416*80/180 && theta<3.1416*100/180)
        {
            if(Math.abs(rho)<topEdge[0]){

                topEdge[0] = rho;
                topEdge[1] = theta;
                var topLine = i;
            }
            
            if(Math.abs(rho)>bottomEdge[0]){

                bottomEdge[0] = rho;
                bottomEdge[1] = theta;
            }

        }


        else if(theta<3.1416*10/180 || theta>3.1416*170/180)
        {
            if(xIntercept>rightEdge[0])
            {
                rightEdge[0] = xIntercept;
                rightEdge[1] = yIntercept;
                rightLine = i;
            }
            else if(xIntercept<=leftEdge[0])
            {
                leftEdge[0] = xIntercept;
                leftEdge[1] = yIntercept;
                leftLine = i;
            }
        }
    }
    
    let rho = lines.data32F[topLine * 2];
    let theta = lines.data32F[topLine * 2 + 1];
    let a = Math.cos(theta);
    let b = Math.sin(theta);
    let x0 = a * rho;
    let y0 = b * rho;
    let startPoint = {x: x0 - 1000 * b, y: y0 + 1000 * a};
    let endPoint = {x: x0 + 1000 * b, y: y0 - 1000 * a};
    cv.line(dst, startPoint, endPoint, [0, 255, 0, 255]);

    rho = bottomEdge[0];
    theta = bottomEdge[1];
    a = Math.cos(theta);
    b = Math.sin(theta);
    x0 = a * rho;
    y0 = b * rho;
    startPoint = {x: x0 - 1000 * b, y: y0 + 1000 * a};
    endPoint = {x: x0 + 1000 * b, y: y0 - 1000 * a};
    cv.line(dst, startPoint, endPoint, [0, 0, 255, 255]);

    rho = lines.data32F[rightLine * 2];
    theta = lines.data32F[rightLine * 2 + 1];
    rightEdge[0] = rho;
    rightEdge[1] = theta;
    a = Math.cos(theta);
    b = Math.sin(theta);
    x0 = a * rho;
    y0 = b * rho;
    startPoint = {x: x0 - 1000 * b, y: y0 + 1000 * a};
    endPoint = {x: x0 + 1000 * b, y: y0 - 1000 * a};
    cv.line(dst, startPoint, endPoint, [0, 0, 255, 255]);

    rho = lines.data32F[leftLine * 2];
    theta = lines.data32F[leftLine * 2 + 1];
    leftEdge[0] = rho;
    leftEdge[1] = theta;
    a = Math.cos(theta);
    b = Math.sin(theta);
    x0 = a * rho;
    y0 = b * rho;
    startPoint = {x: x0 - 1000 * b, y: y0 + 1000 * a};
    endPoint = {x: x0 + 1000 * b, y: y0 - 1000 * a};
    cv.line(dst, startPoint, endPoint, [0, 255, 0, 255]);



    let left1 = {x:0,y:0}; 
    let left2 = {x:0,y:0}; 
    let right1 = {x:0,y:0};
    let right2 = {x:0,y:0};
    let bottom1 = {x:0,y:0};
    let bottom2 = {x:0,y:0};
    let top1 = {x:0,y:0};
    let top2 = {x:0,y:0};

    let height=outerBox.size().height;
    let width=outerBox.size().width;

    if(leftEdge[1]!=0)
    {
        left1.x=0;        left1.y=leftEdge[0]/Math.sin(leftEdge[1]);
        left2.x=width;    left2.y=-left2.x/Math.tan(leftEdge[1]) + left1.y;
    }
    else
    {
        left1.y=0;        left1.x=leftEdge[0]/Math.cos(leftEdge[1]);
        left2.y=height;    left2.x=left1.x - height*Math.tan(leftEdge[1]);

    }

    if(rightEdge[1]!=0)
    {
        right1.x=0;        right1.y=rightEdge[0]/Math.sin(rightEdge[1]);
        right2.x=width;    right2.y=-right2.x/Math.tan(rightEdge[1]) + right1.y;
    }
    else
    {
        right1.y=0;        right1.x=rightEdge[0]/Math.cos(rightEdge[1]);
        right2.y=height;    right2.x=right1.x - height*Math.tan(rightEdge[1]);

    }

    bottom1.x=0;    bottom1.y=bottomEdge[0]/Math.sin(bottomEdge[1]);
    bottom2.x=width;bottom2.y=-bottom2.x/Math.tan(bottomEdge[1]) + bottom1.y;

    top1.x=0;        top1.y=topEdge[0]/Math.sin(topEdge[1]);
    top2.x=width;    top2.y=-top2.x/Math.tan(topEdge[1]) + top1.y;


    // Next, we find the intersection of  these four lines
    let leftA = left2.y-left1.y;
    let leftB = left1.x-left2.x;

    let leftC = leftA*left1.x + leftB*left1.y;

    let rightA = right2.y-right1.y;
    let rightB = right1.x-right2.x;

    let rightC = rightA*right1.x + rightB*right1.y;

    let topA = top2.y-top1.y;
    let topB = top1.x-top2.x;

    let topC = topA*top1.x + topB*top1.y;

    let bottomA = bottom2.y-bottom1.y;
    let bottomB = bottom1.x-bottom2.x;

    let bottomC = bottomA*bottom1.x + bottomB*bottom1.y;

    // Intersection of left and top
    let detTopLeft = leftA*topB - leftB*topA;

    let ptTopLeft = new cv.Point((topB*leftC - leftB*topC)/detTopLeft, (leftA*topC - topA*leftC)/detTopLeft);

    // Intersection of top and right
    let detTopRight = rightA*topB - rightB*topA;

    let ptTopRight = new cv.Point((topB*rightC-rightB*topC)/detTopRight, (rightA*topC-topA*rightC)/detTopRight);

    // Intersection of right and bottom
    let detBottomRight = rightA*bottomB - rightB*bottomA;
    let ptBottomRight = new cv.Point((bottomB*rightC-rightB*bottomC)/detBottomRight, (rightA*bottomC-bottomA*rightC)/detBottomRight);// Intersection of bottom and left
    let detBottomLeft = leftA*bottomB-leftB*bottomA;
    let ptBottomLeft = new cv.Point((bottomB*leftC-leftB*bottomC)/detBottomLeft, (leftA*bottomC-bottomA*leftC)/detBottomLeft);


    let maxLength = (ptBottomLeft.x-ptBottomRight.x)*(ptBottomLeft.x-ptBottomRight.x) + (ptBottomLeft.y-ptBottomRight.y)*(ptBottomLeft.y-ptBottomRight.y);

    let temp = (ptTopRight.x-ptBottomRight.x)*(ptTopRight.x-ptBottomRight.x) + (ptTopRight.y-ptBottomRight.y)*(ptTopRight.y-ptBottomRight.y);
    if(temp>maxLength) maxLength = temp;

    temp = (ptTopRight.x-ptTopLeft.x)*(ptTopRight.x-ptTopLeft.x) + (ptTopRight.y-ptTopLeft.y)*(ptTopRight.y-ptTopLeft.y);
    if(temp>maxLength) maxLength = temp;

    temp = (ptBottomLeft.x-ptTopLeft.x)*(ptBottomLeft.x-ptTopLeft.x) + (ptBottomLeft.y-ptTopLeft.y)*(ptBottomLeft.y-ptTopLeft.y);
    if(temp>maxLength) maxLength = temp;
    
    maxLength = Math.sqrt(maxLength);

    let srcTri = cv.matFromArray(4, 1, cv.CV_32FC2, [ptTopLeft.x, ptTopLeft.y, ptTopRight.x, ptTopRight.y, ptBottomRight.x, ptBottomRight.y, ptBottomLeft.x, ptBottomLeft.y]);
    let dstTri = cv.matFromArray(4, 1, cv.CV_32FC2, [0, 0, maxLength-1, 0, maxLength-1, maxLength-1, 0, maxLength-1]);

    let dst_2 = new cv.Mat();
    let dsize = new cv.Size(maxLength, maxLength);
    let M = cv.getPerspectiveTransform(srcTri, dstTri);
    let imgSudokuWarp = new cv.Mat();
    cv.warpPerspective(imgSudokuRaw, imgSudokuWarp, M, dsize, cv.INTER_LINEAR, cv.BORDER_CONSTANT, new cv.Scalar());
    cv.warpPerspective(outerBoxRaw, dst_2, M, dsize, cv.INTER_LINEAR, cv.BORDER_CONSTANT, new cv.Scalar());




    function extractBox(img,ptTopLeft,ptTopRight,ptBottomRight,ptBottomLeft){

        let maxLength = (ptBottomLeft.x-ptBottomRight.x)*(ptBottomLeft.x-ptBottomRight.x) + (ptBottomLeft.y-ptBottomRight.y)*(ptBottomLeft.y-ptBottomRight.y);
        let temp = (ptTopRight.x-ptBottomRight.x)*(ptTopRight.x-ptBottomRight.x) + (ptTopRight.y-ptBottomRight.y)*(ptTopRight.y-ptBottomRight.y);
        if(temp>maxLength) maxLength = temp;
        temp = (ptTopRight.x-ptTopLeft.x)*(ptTopRight.x-ptTopLeft.x) + (ptTopRight.y-ptTopLeft.y)*(ptTopRight.y-ptTopLeft.y);
        if(temp>maxLength) maxLength = temp;
        temp = (ptBottomLeft.x-ptTopLeft.x)*(ptBottomLeft.x-ptTopLeft.x) + (ptBottomLeft.y-ptTopLeft.y)*(ptBottomLeft.y-ptTopLeft.y);
        if(temp>maxLength) maxLength = temp;
        
        maxLength = Math.sqrt(maxLength);

        let srcTri = cv.matFromArray(4, 1, cv.CV_32FC2, [ptTopLeft.x, ptTopLeft.y, ptTopRight.x, ptTopRight.y, ptBottomRight.x, ptBottomRight.y, ptBottomLeft.x, ptBottomLeft.y]);
        let dstTri = cv.matFromArray(4, 1, cv.CV_32FC2, [0, 0, maxLength-1, 0, maxLength-1, maxLength-1, 0, maxLength-1]);

        let dstGrille = new cv.Mat();
        let dsize = new cv.Size(maxLength, maxLength);
        let M = cv.getPerspectiveTransform(srcTri, dstTri);
        cv.warpPerspective(img, dstGrille, M, dsize, cv.INTER_LINEAR, cv.BORDER_CONSTANT, new cv.Scalar());
        return dstGrille

        }

    function findSixteenPoints(img,imgWarp,houghPrecision,borderReduction){

        //Fonction renvoyant les 9 cases d'une grille. Prends en entrée l'image de départ

        let dstR = new cv.Mat();
        var borderReduction = borderReduction;
        let maxLength = img.size().height;
        let dsize = new cv.Size(maxLength-2*borderReduction*maxLength, maxLength-2*borderReduction*maxLength);
        let srcTri = cv.matFromArray(4, 1, cv.CV_32FC2, [borderReduction*maxLength,borderReduction*maxLength,maxLength-borderReduction*maxLength,borderReduction*maxLength,borderReduction*maxLength,maxLength-borderReduction*maxLength,maxLength-borderReduction*maxLength,maxLength-borderReduction*maxLength]);
        let dstTri = cv.matFromArray(4, 1, cv.CV_32FC2, [0, 0, maxLength-2*borderReduction*maxLength-1,0 , 0, maxLength-2*borderReduction*maxLength-1, maxLength-2*borderReduction*maxLength-1, maxLength-2*borderReduction*maxLength-1]);
        let M = cv.getPerspectiveTransform(srcTri, dstTri);
        cv.warpPerspective(img, dstR, M, dsize, cv.INTER_LINEAR, cv.BORDER_CONSTANT, new cv.Scalar());

        let dst = img.clone();
        let lines = new cv.Mat();
        let temp = new cv.Mat();
        cv.Canny(dstR, dstR, 50, 200, 3);
        cv.HoughLines(dstR, lines, 1, Math.PI / 180,
            houghPrecision, 0, 0, 0, Math.PI);

        for (let i = 0; i < lines.rows; ++i) {
            let rho = lines.data32F[i * 2];
            let theta = lines.data32F[i * 2 + 1];
            let a = Math.cos(theta);
            let b = Math.sin(theta);
            let x0 = a * rho;
            let y0 = b * rho;
            let startPoint = {x: x0 - 1000 * b, y: y0 + 1000 * a};
            let endPoint = {x: x0 + 1000 * b, y: y0 - 1000 * a};
            cv.line(dstR, startPoint, endPoint, [255, 0, 0, 255]);
        }

        let topEdge = new cv.Mat();
        topEdge[0] = 1000;
        topEdge[1] = 1000;
        let bottomEdge = new cv.Mat();
        bottomEdge[0] = -1000;
        bottomEdge[1] = -1000;
        let leftEdge = new cv.Mat();
        leftEdge[0] = 1000;
        leftEdge[1] = 1000;
        let rightEdge = new cv.Mat();
        rightEdge[0] = -1000;
        rightEdge[1] = -1000;

        let rightLine = 0;
        let leftLine = 0;

        var nbTopLine = 0;
        var topRho = 0;
        var topTheta = 0;
        var nbBottomLine = 0;
        var bottomRho = 0;
        var bottomTheta = 0;
        var nbLeftLine = 0;
        var leftRho = 0;
        var leftTheta = 0;
        var nbRightLine = 0;
        var rightRho = 0;
        var rightTheta = 0;

        for (let i = 0; i < lines.rows; ++i) {
            let rho = lines.data32F[i * 2];
            let theta = lines.data32F[i * 2 + 1];

            let xIntercept = rho/Math.cos(theta);
            let yIntercept = rho/(Math.cos(theta)*Math.sin(theta));

            if(theta>3.1416*80/180 && theta<3.1416*100/180)
            {
                if(rho<0.5*dstR.size().height){

                    topRho += rho;
                    topTheta += theta;
                    nbTopLine ++;
                }
                
                if(rho>0.5*dstR.size().height){

                    bottomRho += rho;
                    bottomTheta += theta;
                    nbBottomLine ++;
                }

            }


            else if(theta<3.1416*10/180 || theta>3.1416*170/180)
            {
                if(Math.abs(rho)<0.5*dstR.size().width)
                {
                    if (rho<0){
                        leftRho += Math.abs(lines.data32F[i * 2]);
                        leftTheta += 3.1416 - lines.data32F[i * 2 + 1];
                        nbLeftLine ++;
                    }
                    else{
                        leftRho += lines.data32F[i * 2];
                        leftTheta += lines.data32F[i * 2 + 1];
                        nbLeftLine ++;
                    }
                }
                else if(Math.abs(rho)>0.5*dstR.size().width){
                    if (rho<0){
                        rightRho += Math.abs(lines.data32F[i * 2]);
                        rightTheta += 3.1416 - lines.data32F[i * 2 + 1];
                        nbRightLine ++;
                    }
                    else{
                        rightRho += lines.data32F[i * 2];
                        rightTheta += lines.data32F[i * 2 + 1];
                        nbRightLine ++;
                }
            }
            }
        }

        

        let rho = topRho/nbTopLine;
        let theta = topTheta/nbTopLine;
        topEdge[0] = rho;
        topEdge[1] = theta;
        let a = Math.cos(theta);
        let b = Math.sin(theta);
        let x0 = a * rho;
        let y0 = b * rho;
        let startPoint = {x: x0 - 1000 * b, y: y0 + 1000 * a};
        let endPoint = {x: x0 + 1000 * b, y: y0 - 1000 * a};
        cv.line(dstR, startPoint, endPoint, [0, 255, 0, 255]);


        rho = bottomRho/nbBottomLine;
        theta = bottomTheta/nbBottomLine;
        bottomEdge[0] = rho;
        bottomEdge[1] = theta;
        a = Math.cos(theta);
        b = Math.sin(theta);
        x0 = a * rho;
        y0 = b * rho;
        startPoint = {x: x0 - 1000 * b, y: y0 + 1000 * a};
        endPoint = {x: x0 + 1000 * b, y: y0 - 1000 * a};
        cv.line(dstR, startPoint, endPoint, [0, 255, 0, 255]);

        rho = leftRho/nbLeftLine;
        theta = leftTheta/nbLeftLine;
        leftEdge[0] = rho;
        leftEdge[1] = theta;
        a = Math.cos(theta);
        b = Math.sin(theta);
        x0 = a * rho;
        y0 = b * rho;
        startPoint = {x: x0 - 1000 * b, y: y0 + 1000 * a};
        endPoint = {x: x0 + 1000 * b, y: y0 - 1000 * a};
        cv.line(dstR, startPoint, endPoint, [0, 255, 0, 255]);

        rho = rightRho/nbRightLine;
        theta = rightTheta/nbRightLine;
        rightEdge[0] = rho;
        rightEdge[1] = theta;
        a = Math.cos(theta);
        b = Math.sin(theta);
        x0 = a * rho;
        y0 = b * rho;
        startPoint = {x: x0 - 1000 * b, y: y0 + 1000 * a};
        endPoint = {x: x0 + 1000 * b, y: y0 - 1000 * a};
        cv.line(dstR, startPoint, endPoint, [0, 255, 0, 255]);

        rho = 0.333333/(0.333333-borderReduction)*topRho/nbTopLine;
        theta = topTheta/nbTopLine;
        topEdge[0] = rho;
        topEdge[1] = theta;
        a = Math.cos(theta);
        b = Math.sin(theta);
        x0 = a * rho;
        y0 = b * rho;
        startPoint = {x: x0 - 1000 * b, y: y0 + 1000 * a};
        endPoint = {x: x0 + 1000 * b, y: y0 - 1000 * a};
        cv.line(dst, startPoint, endPoint, [0, 255, 0, 255]);

        rho = 0.666666/(0.666666-borderReduction)*bottomRho/nbBottomLine;
        theta = bottomTheta/nbBottomLine;
        bottomEdge[0] = rho;
        bottomEdge[1] = theta;
        a = Math.cos(theta);
        b = Math.sin(theta);
        x0 = a * rho;
        y0 = b * rho;
        startPoint = {x: x0 - 1000 * b, y: y0 + 1000 * a};
        endPoint = {x: x0 + 1000 * b, y: y0 - 1000 * a};
        cv.line(dst, startPoint, endPoint, [0, 255, 0, 255]);

        rho = 0.333333/(0.333333-borderReduction)*leftRho/nbLeftLine;
        theta = leftTheta/nbLeftLine;
        leftEdge[0] = rho;
        leftEdge[1] = theta;
        a = Math.cos(theta);
        b = Math.sin(theta);
        x0 = a * rho;
        y0 = b * rho;
        startPoint = {x: x0 - 1000 * b, y: y0 + 1000 * a};
        endPoint = {x: x0 + 1000 * b, y: y0 - 1000 * a};
        cv.line(dst, startPoint, endPoint, [0, 255, 0, 255]);

        rho = 0.6666666/(0.666666-borderReduction)*rightRho/nbRightLine;
        theta = rightTheta/nbRightLine;
        rightEdge[0] = rho;
        rightEdge[1] = theta;
        a = Math.cos(theta);
        b = Math.sin(theta);
        x0 = a * rho;
        y0 = b * rho;
        startPoint = {x: x0 - 1000 * b, y: y0 + 1000 * a};
        endPoint = {x: x0 + 1000 * b, y: y0 - 1000 * a};
        cv.line(dst, startPoint, endPoint, [0, 255, 0, 255]);

        var point1 = {x:0,y:0};
        var point2 = {x:0,y:0};
        var point3 = {x:0,y:0};
        var point4 = {x:0,y:0};
        var point5= {x:0,y:0};
        var point6 = {x:0,y:0};
        var point7 = {x:0,y:0};
        var point8 = {x:0,y:0};
        var point9 = {x:0,y:0};
        var point10 = {x:0,y:0};
        var point11 = {x:0,y:0};
        var point12 = {x:0,y:0};
        var point13 = {x:0,y:0};
        var point14 = {x:0,y:0};
        var point15 = {x:0,y:0};
        var point16 = {x:0,y:0};
        


        //On commence par calculer les intersections des droites entre-elles : les points 6,7,10,11

        let left1 = {x:0,y:0};  
        let left2 = {x:0,y:0};   
        let right1 = {x:0,y:0}; 
        let right2 = {x:0,y:0}; 
        let bottom1 = {x:0,y:0};
        let bottom2 = {x:0,y:0};
        let top1 = {x:0,y:0};   
        let top2 = {x:0,y:0};   
        let height=img.size().height;
        let width=img.size().width;


        left1.y=0;        left1.x=leftEdge[0]/Math.cos(leftEdge[1]);
        left2.y=height;    left2.x=left1.x - height*Math.tan(leftEdge[1]);

        point2 = left1;
        point14 = left2;


        right1.y=0;        right1.x=rightEdge[0]/Math.cos(rightEdge[1]);
        right2.y=height;    right2.x=right1.x - height*Math.tan(rightEdge[1]);

        point3 = right1;
        point15 = right2;
        

        bottom1.x=0;    bottom1.y=bottomEdge[0]/Math.sin(bottomEdge[1]);
        bottom2.x=width;bottom2.y=-bottom2.x/Math.tan(bottomEdge[1]) + bottom1.y;

        point9 = bottom1;
        point12 = bottom2;

        top1.x=0;        top1.y=topEdge[0]/Math.sin(topEdge[1]);
        top2.x=width;    top2.y=-top2.x/Math.tan(topEdge[1]) + top1.y;


        point5 = top1;
        point8 = top2;


        // Next, we find the intersection of these four lines
        let leftA = left2.y-left1.y;
        let leftB = left1.x-left2.x;
        let leftC = leftA*left1.x + leftB*left1.y;
        let rightA = right2.y-right1.y;
        let rightB = right1.x-right2.x;
        let rightC = rightA*right1.x + rightB*right1.y;
        let topA = top2.y-top1.y;
        let topB = top1.x-top2.x;
        let topC = topA*top1.x + topB*top1.y;
        let bottomA = bottom2.y-bottom1.y;
        let bottomB = bottom1.x-bottom2.x;
        let bottomC = bottomA*bottom1.x + bottomB*bottom1.y;

        // Intersection of left and top
        let detTopLeft = leftA*topB - leftB*topA;

        let ptTopLeft = new cv.Point((topB*leftC - leftB*topC)/detTopLeft, (leftA*topC - topA*leftC)/detTopLeft);

        // Intersection of top and right
        let detTopRight = rightA*topB - rightB*topA;

        let ptTopRight = new cv.Point((topB*rightC-rightB*topC)/detTopRight, (rightA*topC-topA*rightC)/detTopRight);

        // Intersection of right and bottom
        let detBottomRight = rightA*bottomB - rightB*bottomA;
        let ptBottomRight = new cv.Point((bottomB*rightC-rightB*bottomC)/detBottomRight, (rightA*bottomC-bottomA*rightC)/detBottomRight);// Intersection of bottom and left
        let detBottomLeft = leftA*bottomB-leftB*bottomA;
        let ptBottomLeft = new cv.Point((bottomB*leftC-leftB*bottomC)/detBottomLeft, (leftA*bottomC-bottomA*leftC)/detBottomLeft);

        point6 = ptTopLeft;
        point7 = ptTopRight;
        point10 = ptBottomLeft;
        point11 = ptBottomRight;

        point1 = {x:0,y:0};
        point4 = {x:width,y:0};
        point13 = {x:0,y:height};
        point16 = {x:width,y:height};

        let points = [point1,point2,point3,point4,point5,point6,point7,point8,point9,point10,point11,point12,point13,point14,point15,point16];
        
        //On classe les parties de grille de la gauche vers la droite, du haut vers le bas.

        let grille1 = new cv.Mat();
        let grille2 = new cv.Mat();
        let grille3 = new cv.Mat();
        let grille4 = new cv.Mat();
        let grille5 = new cv.Mat();
        let grille6 = new cv.Mat();
        let grille7 = new cv.Mat();
        let grille8 = new cv.Mat();
        let grille9 = new cv.Mat();


        grille1 = extractBox(imgWarp,point1,point2,point6,point5);
        grille2 = extractBox(imgWarp,point2,point3,point7,point6);
        grille3 = extractBox(imgWarp,point3,point4,point8,point7);
        grille4 = extractBox(imgWarp,point5,point6,point10,point9);
        grille5 = extractBox(imgWarp,point6,point7,point11,point10);
        grille6 = extractBox(imgWarp,point7,point8,point12,point11);
        grille7 = extractBox(imgWarp,point9,point10,point14,point13);
        grille8 = extractBox(imgWarp,point10,point11,point15,point14);
        grille9 = extractBox(imgWarp,point11,point12,point16,point15);

        let grilles = [grille1,grille2,grille3,grille4,grille5,grille6,grille7,grille8,grille9]
        return grilles;



    }


    function findNinetyPoints(img){

        let points = [];
        let cases = [];
        let height = img.size().height;
        let width =  img.size().width;


        for (let j=0;j<10;j++){
            for (let i=0;i<10;i++){
                let point = {x:1/9*i*width,y:1/9*j*height};
                points.push(point);
            }
        }

        for (let j=0;j<9;j++){
            for (let i=0;i<9;i++){
                cases.push(extractBox(img,points[10*j+i],points[10*j+i+1],points[10+10*j+i+1],points[10+10*j+i]));
            }
        }

        return cases
    }

    function clearDigit(imgDigit,borderCleaning,borderFree,midSpace,BandWonly){

        let clearImgDigit = imgDigit.clone();
        let filled = false;
        cv.cvtColor(clearImgDigit,clearImgDigit, cv.COLOR_RGBA2GRAY);
        cv.adaptiveThreshold(clearImgDigit, clearImgDigit, 255, cv.ADAPTIVE_THRESH_GAUSSIAN_C, cv.THRESH_BINARY, 5, 2);
        cv.bitwise_not(clearImgDigit, clearImgDigit);

        var maxArea = -1;
        var maxPt = {x:0,y:0}
        const mask = new cv.Mat(clearImgDigit.rows+2, clearImgDigit.cols+2, cv.CV_8UC1, [0, 0, 0, 0]);
        for (x=0;x<clearImgDigit.size().width;x++){
            for (y=0;y<clearImgDigit.size().height;y++){
                if (clearImgDigit.ucharPtr(y,x) >= 128){
                    let point = {x: x, y: y};
                    const rect = {};

                    area = cv.floodFill(
                    clearImgDigit,
                    mask,
                    point,
                    [64, 64, 64, 0],
                    rect,
                    [0, 0, 0, 0],
                    [0, 0, 0, 0],
                    (4 | (255 << 8)));

                    if (area > maxArea && (x<clearImgDigit.size().width-borderCleaning*clearImgDigit.size().width) && (x>borderCleaning*clearImgDigit.size().width) && (y<clearImgDigit.size().height-borderCleaning*clearImgDigit.size().height) && (y>borderCleaning*clearImgDigit.size().height)){
                    maxPt = point;
                    maxArea = area;
                    }
                }
            }
        }
        const mask2 = new cv.Mat(clearImgDigit.rows+2, clearImgDigit.cols+2, cv.CV_8UC1, [0, 0, 0, 0]);
        cv.floodFill(clearImgDigit, mask2, maxPt, [255,255,255,255]);

        const mask3 = new cv.Mat(clearImgDigit.rows+2, clearImgDigit.cols+2, cv.CV_8UC1, [0, 0, 0, 0]);
        for(let y=0;y<clearImgDigit.size().height;y++)
        {
            let row = clearImgDigit.ucharPtr(y);
            for(let x=0;x<clearImgDigit.size().width;x++)
            {
                if(row[x]==64 && x!=maxPt.x && y!=maxPt.y)
                {
                    cv.floodFill(clearImgDigit, mask3, {x:x,y:y}, [0,0,0,0]);
                }
            }
        }

        let maybeFilled = false;
        for (x=0;x<clearImgDigit.size().width;x++){
            for (y=0;y<clearImgDigit.size().height;y++){
                if (clearImgDigit.ucharPtr(y,x) <= 254){
                    clearImgDigit.ucharPtr(y,x)[0] = 0;
                }
                if (clearImgDigit.ucharPtr(y,x) >= 254 && (x<clearImgDigit.size().width-borderFree*clearImgDigit.size().width) && (x>borderFree*clearImgDigit.size().width) && (y<1/2*clearImgDigit.size().height-midSpace*clearImgDigit.size().height) && (y>borderFree*clearImgDigit.size().height)){
                    maybeFilled = true;
                }
                if (clearImgDigit.ucharPtr(y,x) >= 254 && (x<clearImgDigit.size().width-borderFree*clearImgDigit.size().width) && (x>borderFree*clearImgDigit.size().width) && (y<clearImgDigit.size().height-borderFree*clearImgDigit.size().height) && (y>1/2*clearImgDigit.size().height+midSpace*clearImgDigit.size().height) && (maybeFilled == true)){
                    filled = true;
                }
            }
        }
        
        let xSum = 0;
        let ySum = 0;
        let pointsNb = 0;

        for (x=0;x<clearImgDigit.size().width;x++){
            for (y=0;y<clearImgDigit.size().height;y++){
            if (clearImgDigit.ucharPtr(y,x) >= 128){
                xSum += x;
                ySum += y;
                pointsNb ++;
            }
            }
        }

        xRectified = xSum/pointsNb;
        yRectified = ySum/pointsNb;
        let xTranslation = clearImgDigit.size().width/2 - xRectified;
        let yTranslation = clearImgDigit.size().height/2 - yRectified;

        let M = cv.matFromArray(2, 3, cv.CV_64FC1, [1, 0, Math.round(xTranslation), 0, 1, Math.round(yTranslation)]);
        let dsize = new cv.Size(clearImgDigit.rows, clearImgDigit.cols);

        cv.warpAffine(clearImgDigit, clearImgDigit, M, dsize, cv.INTER_LINEAR, cv.BORDER_CONSTANT, new cv.Scalar());
        let fsize = new cv.Size(28, 28);
        cv.resize(clearImgDigit, clearImgDigit, fsize, 0, 0, cv.INTER_AREA);

        if (BandWonly == false){
            result = [clearImgDigit,filled];
            return result
        }

        else{
            cv.threshold(clearImgDigit, clearImgDigit, 128, 255, cv.THRESH_BINARY);

            for (x=0;x<clearImgDigit.size().width;x++){
                for (y=0;y<clearImgDigit.size().height;y++){
                    if (clearImgDigit.ucharPtr(y,x) == 255){
                        if (clearImgDigit.ucharPtr(y+1,x)<=191){
                            clearImgDigit.ucharPtr(y+1,x)[0] += 63;
                            if (clearImgDigit.ucharPtr(y+1,x)>=189){
                                if (clearImgDigit.ucharPtr(y+1,x)<=191){
                                    clearImgDigit.ucharPtr(y+2,x)[0] += 63;
                                }
                                if (clearImgDigit.ucharPtr(y+1,x+1)<=191){
                                    clearImgDigit.ucharPtr(y+1,x+1)[0] += 63;
                                }
                                if (clearImgDigit.ucharPtr(y+1,x-1)<=191){
                                    clearImgDigit.ucharPtr(y+1,x-1)[0] += 63;
                                }
                            }
                        }

                        if (clearImgDigit.ucharPtr(y-1,x)<=191){
                            clearImgDigit.ucharPtr(y-1,x)[0] += 63;
                            if (clearImgDigit.ucharPtr(y-1,x)>=189){
                                if (clearImgDigit.ucharPtr(y-2,x)<=191){
                                    clearImgDigit.ucharPtr(y-2,x)[0] += 63;
                                }
                                if (clearImgDigit.ucharPtr(y-1,x+1)<=191){
                                    clearImgDigit.ucharPtr(y-1,x+1)[0] += 63;
                                }
                                if (clearImgDigit.ucharPtr(y-1,x-1)<=191){
                                    clearImgDigit.ucharPtr(y-1,x-1)[0] += 63;
                                }
                            }
                        }
                        if (clearImgDigit.ucharPtr(y,x+1)<=191){
                            clearImgDigit.ucharPtr(y,x+1)[0] += 63;
                            if (clearImgDigit.ucharPtr(y,x+1)>=189){
                                if (clearImgDigit.ucharPtr(y-1,x+1)<=191){
                                    clearImgDigit.ucharPtr(y-1,x+1)[0] += 63;
                                }
                                if (clearImgDigit.ucharPtr(y,x+2)<=191){
                                    clearImgDigit.ucharPtr(y,x+2)[0] += 63;
                                }
                                if (clearImgDigit.ucharPtr(y+1,x+1)<=191){
                                    clearImgDigit.ucharPtr(y+1,x+1)[0] += 63;
                                }
                            }
                        }
                        if (clearImgDigit.ucharPtr(y,x-1)<=191){
                            clearImgDigit.ucharPtr(y,x-1)[0] += 63;
                            if (clearImgDigit.ucharPtr(y,x-1)>=189){
                                if (clearImgDigit.ucharPtr(y-1,x-1)<=191){
                                    clearImgDigit.ucharPtr(y-1,x-1)[0] += 63;
                                }
                                if (clearImgDigit.ucharPtr(y,x-2)<=191){
                                    clearImgDigit.ucharPtr(y,x-2)[0] += 63;
                                }
                                if (clearImgDigit.ucharPtr(y+1,x-1)<=191){
                                    clearImgDigit.ucharPtr(y+1,x-1)[0] += 63;
                                }
                            }
                        }
                    
                    }
                }
            }   

            cv.threshold(clearImgDigit, clearImgDigit, 128, 255, cv.THRESH_BINARY);

            result = [clearImgDigit,filled];

            return result;
        }
    }







    let grilles = findNinetyPoints(imgSudokuWarp);
    for (let i=0;i<81;i++){
        //digitGrid.push(findSixteenPoints(grilles[i],80,0.1));
    }

    clearDigits = [];
    isFilled = [];

    for (let i=0;i<81;i++){
        let cD = clearDigit(grilles[i],borderCleaning,borderFree,midSpace,BandWonly); //0.1,0.25,0.1,true
        clearDigits.push(cD[0]);
        isFilled.push(cD[1])
    }

    result = [clearDigits,isFilled]

    return result
}

/* Exemple d'utilisation de l'algorithme pour récupérer seulement les cases avec un chiffre dedans : 

  let casesEtIsFilled = traitementGrilleVersCases(imgSudokuRaw,0.1,0.25,0.1,true)
  let cases = casesEtIsFilled[0];
  let isFilled = casesEtIsFilled[1];
  for (let i=0;i<81;i++){
    if(isFilled[i] == true){
        chiffreSuppose = algoML(cases[i]);
    }
  }
}
*/


/* Module = {
    traitementGrilleVersCases
};
cv = require("./opencv.js"); */

/* function loadOpenCV() {
  return new Promise(resolve => {
    global.Module = {
      onRuntimeInitialized: resolve
    };
    global.cv = require('./opencv.js');
  });
} */