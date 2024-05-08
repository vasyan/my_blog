"use client"
export default function LabPage() {}

function getResolution() {
  return [Math.floor(window.innerWidth / 13), Math.floor((window.innerHeight - 80) / 13)];
}

const vasyan =
[
  1,0,1,0,0,1,1,0,1,1,1,0,1,0,1,0,0,1,1,0,1,0,1,0,0,
  1,0,1,0,1,0,1,0,1,0,0,0,1,0,1,0,1,0,1,0,1,0,1,0,0,
  1,0,1,0,1,1,1,0,1,1,1,0,1,0,1,0,1,1,1,0,1,0,1,0,0,
  1,0,1,0,1,0,1,0,0,0,1,0,0,1,0,0,1,0,1,0,1,1,1,0,0,
  0,1,0,0,1,0,1,0,1,1,1,0,0,1,0,0,1,0,1,0,1,0,1,0,0,
]

async function processCanvas () {
  const [canvasWidth, canvasHeight] = getResolution();
  // const canvas = document.createElement('canvas');                               
  // const context = canvas.getContext('2d');                                       
  // canvas.width = canvasWidth;                                                   
  // canvas.height = canvasHeight;                                                 

  const elements: any = document.querySelectorAll(".checkbox-display input");
  if (!elements) {                                                                
  //   console.log('Failed at all');
  //   return;                                                                      
  }

  // const font = new FontFace('BBFont', 'url(/path/to/font/file)');               
  // document.fonts.add(await font.load());                                         

  // context.font = 'lighter 10px Pixelify Sans';
  // context.fillText('Vasily Styazhkin', 2, 15);                                     
  // const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  // const binaryMap = [];

  const inputWidth = 25;
  const inputHeight = 5;

  const renderStartX = Math.floor(canvasWidth / 2) - Math.floor(inputWidth / 2);
  const renderStartY = Math.floor(canvasHeight / 2) - Math.floor(inputHeight / 2);

  console.log('renderStartX', renderStartX, 'renderStartY', renderStartY);

  for (let i = 0; i < elements.length; i++) {
    const x = i % canvasWidth;
    const y = Math.floor(i / canvasWidth);

    if (x < renderStartX || x >= renderStartX + inputWidth) { continue; }
    if (y < renderStartY || y >= renderStartY + inputHeight) { continue; }
    const index = (y - renderStartY) * inputWidth + (x - renderStartX);

    // console.log(i, 'x', x, 'y', y, 'index', index);

    elements[i].checked = !!vasyan[index];
  }

  // for (let i = 0; i < imageData.data.length; i += 4) {
  //   const alpha = imageData.data[i + 3];
  //   const value = alpha > 128 ? 1 : 0;
  //   binaryMap.push(value);
  //   // if (value) {
  //     elements[i / 4].checked = !!value;
  //   // }

  //   // if (elements[i - 1 / 4].cheked) {
  //   //   console.log('checked');
  //   // }
  //   // have to check if there is more than 6 neighbor elements checked

  //   const siblings = [elements[i], elements[i - 1], elements[i + 1], elements[i - desiredWidth], elements[i - desiredWidth - 1], elements[i - desiredWidth + 1], elements[i + desiredWidth - 1], elements[i + desiredWidth - 1], elements[i + desiredWidth + 1]];

  //   if (i === 4 * 500) {
  //     console.log('overflowed', siblings);
  //   }
  // }
}

function renderCheckboxes() {
  if (document.querySelector(".checkbox-display input")) return;

  const [cols, rows] = getResolution();
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < cols * rows; i++) {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    fragment.appendChild(checkbox);
  }

  document.querySelector(".checkbox-display")?.appendChild(fragment);
}

(function () {
  if (typeof document === 'undefined') return;
  const main = document.createElement('main')
  main.className = 'main-container d-flex align-items-center';
  const displayEl = document.createElement('div');
  displayEl.className = 'checkbox-display';
  main.appendChild(displayEl);
  document.body.appendChild(main);

  renderCheckboxes();
  processCanvas();
})();


// console.log('vasyan', vasyan.length);
