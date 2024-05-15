"use client";
import Script from 'next/script';
import typescriptImgSrc from '/public/typescript.svg'
import { promises as fs } from 'fs';
import { FlowFlags } from 'typescript';
import { get } from 'http';

const logoTs = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="500" zoomAndPan="magnify" viewBox="0 0 375 374.999991" height="500" preserveAspectRatio="xMidYMid meet" version="1.0"><defs><clipPath id="e33202744a"><path d="M 25.464844 25.464844 L 349.464844 25.464844 L 349.464844 349.464844 L 25.464844 349.464844 Z M 25.464844 25.464844 " clip-rule="nonzero"/></clipPath></defs><g clip-path="url(#e33202744a)"><path fill="#000000" d="M 25.464844 61.464844 L 25.464844 313.464844 C 25.464844 333.355469 41.574219 349.464844 61.464844 349.464844 L 313.464844 349.464844 C 333.355469 349.464844 349.464844 333.355469 349.464844 313.464844 L 349.464844 61.464844 C 349.464844 41.574219 333.355469 25.464844 313.464844 25.464844 L 61.464844 25.464844 C 41.574219 25.464844 25.464844 41.574219 25.464844 61.464844 Z M 217.453125 195.582031 L 179.328125 195.582031 L 179.328125 313.464844 L 148.605469 313.464844 L 148.605469 195.582031 L 111.273438 195.582031 L 111.273438 169.464844 L 217.453125 169.464844 Z M 223.429688 306.734375 L 223.429688 275.214844 C 223.429688 275.214844 240.636719 288.195312 261.300781 288.195312 C 281.964844 288.195312 281.15625 274.695312 281.15625 272.839844 C 281.15625 253.238281 222.636719 253.238281 222.636719 209.820312 C 222.636719 150.765625 307.902344 174.074219 307.902344 174.074219 L 306.84375 202.136719 C 306.84375 202.136719 292.550781 192.597656 276.386719 192.597656 C 260.238281 192.597656 254.40625 200.28125 254.40625 208.488281 C 254.40625 229.675781 313.464844 227.550781 313.464844 270.195312 C 313.464844 335.859375 223.429688 306.734375 223.429688 306.734375 Z M 223.429688 306.734375 " fill-opacity="1" fill-rule="nonzero"/></g></svg>`;

// export default function LabPage() {}

type Resolution = [number, number];
function getResolution(): Resolution {
  return [Math.floor(window.innerWidth / 13), Math.floor(((window.innerHeight - 80) / 2) / 13)];
}

type TextObject = {
  buffer: Array<0 | 1> | (() => Promise<Array<0 | 1>>);
  width: number;
}

const vasyan: TextObject = {
  buffer: [
    1,0,1,0,0,1,1,0,1,1,1,0,1,0,1,0,0,1,1,0,1,0,1,0,0,
    1,0,1,0,1,0,1,0,1,0,0,0,1,0,1,0,1,0,1,0,1,0,1,0,0,
    1,0,1,0,1,1,1,0,1,1,1,0,1,0,1,0,1,1,1,0,1,0,1,0,0,
    1,0,1,0,1,0,1,0,0,0,1,0,0,1,0,0,1,0,1,0,1,1,1,0,0,
    0,1,0,0,1,0,1,0,1,1,1,0,0,1,0,0,1,0,1,0,1,0,1,0,0,
  ],
  width: 25,
}

const bio: TextObject = {
  buffer: [
    1,0,0,1,1,0,0,0,1,0,0,0,0,1,0,0,0,1,0,0,1,1,0,0,1,1,1,
    1,0,0,1,0,1,0,1,0,1,0,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,
    1,0,0,1,0,1,0,1,0,1,0,0,1,0,0,0,1,0,1,0,1,0,1,0,1,1,0,
    1,0,0,1,0,1,0,1,0,1,0,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,
    1,0,0,1,1,0,0,0,1,0,0,0,0,1,0,0,0,1,0,0,1,1,0,0,1,1,1
  ],
  width: 27,
}

const tsLogo: TextObject = {
  width: 25,
  buffer: () => getSvgBuffer(logoTs, [10, 10]),
}

type Position = [number | string, number | string];


type DrawItem = {
  textObject: TextObject;
  position: Position;
}

type DrawQueue = DrawItem[];

async function drawToCanvas (queue: DrawQueue) {
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

  const mergedBuffers = [];
  let maxWidth = 0;
  let maxHeight = 0;

  for (let i = 0; i < queue.length; i++) {
    const buffer = typeof queue[i].textObject.buffer === 'function' ? await queue[i].textObject.buffer() : queue[i].textObject.buffer;
    console.log('buffer', buffer);
    maxHeight = Math.max(
      maxHeight,
      (buffer.length / queue[i].textObject.width) + getStartY(queue[i], canvasHeight));
  }

  console.log('maxHeight', maxHeight);

  return;

  const inputWidth = textObject.width;
  const inputHeight = 5;

  const centerX = position[0] === 'center';
  const centerY = position[1] === 'center';
  const renderStartX = typeof position[0] === 'number'
    ? position[0]
    : centerX ? Math.floor(canvasWidth / 2) - Math.floor(inputWidth / 2)
    : Math.floor(canvasWidth / (100 / parseInt(position[0])));

  // const renderStartY = Math.floor(canvasHeight / 2) - Math.floor(inputHeight / 2);
  const renderStartY = typeof position[1] === 'number'
    ? position[1]
    : centerY ? Math.floor(canvasHeight / 2) - Math.floor(inputHeight / 2)
    : Math.floor(canvasHeight / (100 / parseInt(position[1])));

  console.log('renderStartX', renderStartX, 'renderStartY', renderStartY);

  for (let i = 0; i < elements.length; i++) {
    const x = i % canvasWidth;
    const y = Math.floor(i / canvasWidth);
    // elements[i].checked = false;

    if (
      x < renderStartX || x >= renderStartX + inputWidth ||
      y < renderStartY || y >= renderStartY + inputHeight
    ) {
      continue;
    }
    const index = (y - renderStartY) * inputWidth + (x - renderStartX);

    // console.log(i, 'x', x, 'y', y, 'index', index);

    elements[i].checked = !!textObject.buffer[index];
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

function getStartX (drawItem: DrawItem, canvasWidth: number) {
  const { position, textObject } = drawItem;
  const centerX = position[0] === 'center';
  const renderStartX = typeof position[0] === 'number'
    ? position[0]
    : centerX ? Math.floor(canvasWidth / 2) - Math.floor(textObject.width / 2)
    : Math.floor(canvasWidth / (100 / parseInt(position[0])));

  return renderStartX;
}
function getStartY (drawItem: DrawItem, canvasHeight: number) {
  const { position, textObject } = drawItem;
  const centerY = position[1] === 'center';
  const renderStartY = typeof position[1] === 'number'
    ? position[1]
    : centerY ? Math.floor(canvasHeight / 2) - Math.floor(textObject.buffer.length / textObject.width / 2)
    : Math.floor(canvasHeight / (100 / parseInt(position[1])));

  return renderStartY;
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

const debouncedProcessCanvas = debounce(drawToCanvas, 300);

function debounce(func: Function, timeout: number) {
  let timer: NodeJS.Timeout;
  return function (...args: any[]) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, timeout);
  };
}

function getSvgBuffer(svg: string, size: [number, number]): Promise<Array<1 | 0>> {
  const canvas = document.createElement('canvas');
  canvas.width = size[0];
  canvas.height = size[1];
  const ctx = canvas.getContext('2d');
  const img = new Image();
  if (!ctx) return Promise.resolve([]);
  img.src = 'data:image/svg+xml;base64,' + btoa(svg);
  console.log('img', img.src);
  // img.onload = () => {
  //   const scale = Math.min(canvas.width / img.width, canvas.height / img.height);
  //   const scaledWidth = img.width * scale;
  //   const scaledHeight = img.height * scale;

  //   ctx.drawImage(img, 0, 0, scaledWidth, scaledHeight);
  //   ctx.imageSmoothingEnabled = true;
  //   // document.body.appendChild(canvas);
  //   const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  //   console.log('imageData', imageData);
  // }

  return new Promise((resolve, reject) => {
    img.onload = () => {
      const scale = Math.min(canvas.width / img.width, canvas.height / img.height);
      const scaledWidth = img.width * scale;
      const scaledHeight = img.height * scale;

      ctx.drawImage(img, 0, 0, scaledWidth, scaledHeight);
      ctx.imageSmoothingEnabled = true;
      // document.body.appendChild(canvas);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      console.log('imageData', imageData);
      resolve(imageData.data.map((value, index) => {
        if (index % 4 === 3) return 0;

        return value > 128 ? 1 : 0;
      }) as any);
    }
  });
}

(function main () {
  // console.log('call main');
  if (typeof document === 'undefined') return;
  const main = document.createElement('main')
  main.className = 'main-container d-flex align-items-center';
  const displayEl = document.createElement('div');
  displayEl.className = 'checkbox-display';
  main.appendChild(displayEl);
  document.body.appendChild(main);

  // getSvgBuffer();

  renderCheckboxes();
  drawToCanvas([
    { textObject: vasyan, position: [5, 5] },
    { textObject: bio, position: [5, 20] },
    { textObject: tsLogo, position: [5, 30]}
  ]);
  // drawToCanvas(bio, [5, 20]);

  window.addEventListener('resize', () => {
    console.log('resize', data);
    // renderCheckboxes();
    // drawToCanvas(vasyan, [5, 5]);
    // drawToCanvas(bio, [5, 20]);
  });
})();


// console.log('svg', typescriptImgSrc.src );


let file: Buffer;
let data: string;

export default function Page() {
  // file = await fs.readFile(process.cwd() + '/public/typescript.svg');
  // data = file.toString('utf-8');
  // // main();

  // return <Script src="/lab/page.js" />;
}
