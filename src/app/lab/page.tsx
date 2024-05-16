"use client";
import { get } from 'http';
// import Script from 'next/script';
// import typescriptImgSrc from '/public/typescript.svg'
import * as buffers from './buffers';

// const logoTsSvg = `<?xml version="1.0" encoding="utf-8"?>
// <svg viewBox="88.7973 75.8199 324 324" width="324" height="324" xmlns="http://www.w3.org/2000/svg">
//   <path fill="#000000" d="M 25.465 61.465 L 25.465 313.465 C 25.465 333.355 41.574 349.465 61.465 349.465 L 313.465 349.465 C 333.355 349.465 349.465 333.355 349.465 313.465 L 349.465 61.465 C 349.465 41.574 333.355 25.465 313.465 25.465 L 61.465 25.465 C 41.574 25.465 25.465 41.574 25.465 61.465 Z M 217.453 195.582 L 179.328 195.582 L 179.328 313.465 L 148.605 313.465 L 148.605 195.582 L 111.273 195.582 L 111.273 169.465 L 217.453 169.465 L 217.453 195.582 Z M 223.43 306.734 L 225.106 287.635 C 225.106 287.635 250.911 296.485 271.575 296.485 C 292.239 296.485 290.92 257.332 290.92 255.476 C 290.92 235.875 217.905 244.743 232.785 203.954 C 251.256 153.323 307.515 177.013 307.515 177.013 L 306.844 202.137 C 306.844 202.137 292.551 192.598 276.387 192.598 C 260.238 192.598 254.406 200.281 254.406 208.488 C 254.406 229.676 313.465 227.551 313.465 270.195 C 313.465 335.859 223.43 306.734 223.43 306.734 Z M 223.43 306.734" fill-opacity="1" fill-rule="nonzero" transform="matrix(1, 0, 0, 1, 63.3322639465332, 50.354927062988274)"/>
// </svg>`;
// const logoNodeSvg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="500" zoomAndPan="magnify" viewBox="0 0 375 374.999991" height="500" preserveAspectRatio="xMidYMid meet" version="1.0"><defs><clipPath id="0a84bbcb79"><path d="M 10.808594 75 L 364.058594 75 L 364.058594 300 L 10.808594 300 Z M 10.808594 75 " clip-rule="nonzero"/></clipPath></defs><g clip-path="url(#0a84bbcb79)"><path fill="#000000" d="M 253.535156 75.21875 C 251.746094 75.21875 250.109375 76.652344 250.109375 78.648438 L 250.109375 141.316406 L 235.910156 133.03125 C 235.019531 132.507812 234.019531 132.253906 233.015625 132.253906 C 232.011719 132.253906 231.011719 132.507812 230.121094 133.03125 L 196.003906 152.945312 C 194.226562 153.96875 193.132812 155.867188 193.132812 157.910156 L 193.132812 197.777344 C 193.132812 199.828125 194.226562 201.714844 196.003906 202.742188 L 230.121094 222.652344 C 231.011719 223.175781 232.011719 223.433594 233.015625 223.433594 C 234.019531 223.433594 235.019531 223.175781 235.910156 222.652344 L 270.027344 202.742188 C 271.804688 201.714844 272.898438 199.816406 272.898438 197.777344 L 272.898438 89.246094 C 272.898438 87.21875 271.816406 85.351562 270.074219 84.324219 L 255.226562 75.683594 C 254.667969 75.367188 254.105469 75.21875 253.535156 75.21875 Z M 141.855469 132.253906 C 140.855469 132.253906 139.855469 132.515625 138.960938 133.03125 L 104.84375 152.945312 C 103.066406 153.96875 101.972656 155.867188 101.972656 157.910156 L 101.972656 197.777344 C 101.972656 199.828125 103.066406 201.714844 104.84375 202.742188 L 138.960938 222.652344 C 140.75 223.691406 142.957031 223.691406 144.746094 222.652344 L 178.867188 202.742188 C 180.644531 201.714844 181.738281 199.816406 181.738281 197.777344 L 181.738281 157.910156 C 181.738281 155.859375 180.644531 153.96875 178.867188 152.945312 L 144.746094 133.03125 C 143.851562 132.515625 142.855469 132.253906 141.855469 132.253906 Z M 324.175781 132.253906 C 323.175781 132.253906 322.171875 132.507812 321.285156 133.03125 L 287.164062 152.945312 C 285.386719 153.96875 284.292969 155.867188 284.292969 157.910156 L 284.292969 197.777344 C 284.292969 199.828125 285.386719 201.714844 287.164062 202.742188 L 320.261719 222.761719 C 322.039062 223.847656 324.269531 223.855469 326.070312 222.808594 L 342.339844 213.34375 C 344.023438 212.375 344.035156 209.925781 342.339844 208.933594 L 307.085938 188.152344 L 307.085938 167.6875 L 324.175781 157.730469 L 341.269531 167.6875 L 341.269531 181.941406 C 341.269531 183.84375 342.871094 184.136719 343.941406 183.5 C 348.25 180.96875 361.234375 173.433594 361.234375 173.433594 C 362.976562 172.417969 364.058594 170.539062 364.058594 168.511719 L 364.058594 157.910156 C 364.058594 155.859375 362.96875 153.96875 361.1875 152.945312 L 327.070312 133.03125 C 326.171875 132.507812 325.179688 132.253906 324.175781 132.253906 Z M 50.695312 132.277344 C 49.691406 132.277344 48.6875 132.53125 47.800781 133.054688 L 13.679688 152.945312 C 11.902344 153.980469 10.808594 155.878906 10.808594 157.933594 L 10.808594 208.820312 C 10.808594 211.308594 13.496094 212.847656 15.640625 211.605469 L 30.773438 202.785156 C 32.515625 201.761719 33.601562 199.894531 33.601562 197.863281 L 33.601562 167.730469 L 50.695312 157.753906 L 67.785156 167.730469 L 67.785156 197.863281 C 67.785156 199.894531 68.871094 201.761719 70.613281 202.785156 L 85.746094 211.605469 C 87.890625 212.859375 90.578125 211.308594 90.578125 208.820312 L 90.578125 157.933594 C 90.578125 155.878906 89.484375 153.980469 87.707031 152.945312 L 53.585938 133.054688 C 52.699219 132.53125 51.695312 132.277344 50.695312 132.277344 Z M 233.015625 157.730469 L 250.109375 167.710938 L 250.109375 187.976562 L 233.015625 197.953125 L 215.921875 187.976562 L 215.921875 167.710938 Z M 324.175781 166.484375 L 314.40625 172.1875 L 314.40625 183.566406 L 324.175781 189.246094 L 333.949219 183.566406 L 333.949219 172.1875 Z M 186.367188 212.027344 C 185.195312 212.027344 184.007812 212.316406 182.984375 212.898438 L 150.933594 231.425781 C 148.828125 232.589844 147.550781 234.878906 147.550781 237.261719 L 147.550781 274.277344 C 147.550781 276.660156 148.882812 278.902344 150.933594 280.113281 L 159.371094 284.921875 C 163.414062 286.917969 164.902344 286.925781 166.738281 286.925781 C 172.777344 286.925781 176.21875 283.3125 176.21875 276.925781 L 176.21875 240.359375 C 176.21875 239.800781 175.785156 239.398438 175.285156 239.398438 L 171.234375 239.398438 C 170.675781 239.398438 170.277344 239.855469 170.277344 240.359375 L 170.277344 276.925781 C 170.277344 279.699219 167.351562 282.539062 162.574219 280.15625 L 153.804688 275.101562 C 153.519531 274.929688 153.316406 274.585938 153.316406 274.253906 L 153.316406 237.238281 C 153.316406 236.910156 153.476562 236.519531 153.804688 236.347656 L 185.855469 217.863281 C 186.195312 217.691406 186.582031 217.691406 186.855469 217.863281 L 218.929688 236.347656 C 219.257812 236.519531 219.417969 236.851562 219.417969 237.238281 L 219.417969 274.253906 C 219.417969 274.640625 219.203125 274.972656 218.929688 275.144531 L 186.855469 293.699219 C 186.570312 293.867188 186.128906 293.867188 185.855469 293.699219 L 177.664062 288.820312 C 177.449219 288.707031 177.101562 288.640625 176.886719 288.753906 C 174.617188 290.085938 174.164062 290.261719 172.054688 290.980469 C 171.496094 291.152344 170.738281 291.492188 172.34375 292.382812 L 182.984375 298.707031 C 184.042969 299.265625 185.203125 299.597656 186.367188 299.597656 C 187.585938 299.597656 188.769531 299.269531 189.707031 298.664062 L 221.753906 280.113281 C 223.863281 278.949219 225.136719 276.660156 225.136719 274.277344 L 225.136719 237.261719 C 225.136719 234.878906 223.804688 232.648438 221.753906 231.425781 L 189.707031 212.898438 C 188.707031 212.316406 187.539062 212.027344 186.367188 212.027344 Z M 236.355469 229.109375 C 233.082031 229.109375 230.210938 231.757812 230.210938 235.257812 C 230.210938 238.644531 232.96875 241.425781 236.355469 241.425781 C 239.738281 241.425781 242.496094 238.644531 242.496094 235.257812 C 242.496094 231.757812 239.683594 229.054688 236.355469 229.109375 Z M 236.289062 230.089844 C 239.183594 230.089844 241.519531 232.371094 241.519531 235.257812 C 241.519531 238.085938 239.171875 240.421875 236.289062 240.492188 C 233.449219 240.492188 231.144531 238.144531 231.144531 235.257812 C 231.144531 232.371094 233.460938 230.089844 236.289062 230.089844 Z M 234.039062 231.761719 L 234.039062 238.6875 L 235.351562 238.6875 L 235.351562 235.925781 L 236.578125 235.925781 C 237.078125 235.925781 237.199219 236.140625 237.3125 236.527344 C 237.3125 236.585938 237.523438 238.378906 237.578125 238.710938 L 239.003906 238.710938 C 238.84375 238.378906 238.726562 237.429688 238.667969 236.859375 C 238.507812 235.972656 238.457031 235.359375 237.511719 235.300781 C 238.011719 235.132812 238.847656 234.863281 238.847656 233.585938 C 238.847656 231.75 237.253906 231.761719 236.421875 231.761719 Z M 235.351562 232.875 L 236.464844 232.875 C 236.808594 232.875 237.46875 232.863281 237.46875 233.808594 C 237.46875 234.199219 237.300781 234.824219 236.398438 234.8125 L 235.351562 234.8125 Z M 194.957031 238.53125 C 185.808594 238.53125 180.378906 242.433594 180.378906 248.867188 C 180.378906 255.914062 185.816406 257.796875 194.578125 258.6875 C 205.0625 259.734375 205.886719 261.246094 205.886719 263.296875 C 205.886719 266.902344 202.996094 268.398438 196.226562 268.398438 C 187.738281 268.398438 185.871094 266.292969 185.253906 262.074219 C 185.195312 261.628906 184.796875 261.292969 184.296875 261.292969 L 180.136719 261.292969 C 179.632812 261.292969 179.199219 261.691406 179.199219 262.25 C 179.199219 267.632812 182.132812 274.078125 196.160156 274.078125 C 206.449219 274.066406 212.273438 270.074219 212.273438 263.074219 C 212.273438 256.140625 207.609375 254.296875 197.738281 252.964844 C 187.757812 251.628906 186.769531 250.957031 186.769531 248.621094 C 186.769531 246.683594 187.585938 244.144531 194.957031 244.144531 C 201.554688 244.144531 204.015625 245.585938 205.019531 250.023438 C 205.132812 250.46875 205.441406 250.734375 205.886719 250.734375 L 210.046875 250.734375 C 210.320312 250.734375 210.554688 250.628906 210.714844 250.46875 C 210.886719 250.253906 210.996094 250.03125 210.9375 249.757812 C 210.277344 242.09375 205.226562 238.53125 194.957031 238.53125 Z M 194.957031 238.53125 " fill-opacity="1" fill-rule="nonzero"/></g></svg>`


let getElementsCache: any;
function getPixels () {
  if (getElementsCache) return getElementsCache;
  const elements = document.querySelectorAll(".checkbox-display input");
  getElementsCache = elements;
  return elements;
}

const CHECKBOX_SIZE = 13;
type Resolution = [number, number];
function getResolution(): Resolution {
  return [Math.floor(window.innerWidth / CHECKBOX_SIZE), Math.floor(((window.innerHeight - 80) / 2) / CHECKBOX_SIZE)];
}

type TextObject = {
  buffer: Buffer | BufferGetter;
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
const vasilyator: TextObject = {
  buffer: buffers.vasilyator,
  width: 31,
}
const iDo: TextObject = {
  buffer: buffers.iDo,
  width: buffers.iDo.length / 5,
}
const doTs: TextObject = {
  buffer: buffers.doTs,
  width: buffers.doTs.length / 5,
}
const doJs: TextObject = {
  buffer: buffers.doJs,
  width: buffers.doJs.length / 5,
}
const doAWS: TextObject = {
  buffer: buffers.doAWS,
  width: buffers.doAWS.length / 5,
}
const doDocker: TextObject = {
  buffer: buffers.doDocker,
  width: buffers.doDocker.length / 5,
}
const doForms: TextObject = {
  buffer: buffers.doForms,
  width: buffers.doForms.length / 5,
}

// function textObject (buffer: BufferGetter, width: number): TextObject {
//   return {
//     buffer,
//     width,
//   }
// }

// const tsLogo: TextObject = {
//   width: 11,
//   buffer: () => getSvgBuffer(logoTsSvg, [11, 11]),
// }
// const nodeLogo: TextObject = {
//   width: 11,
//   buffer: () => getSvgBuffer(logoNodeSvg, [11, 11]),
// }

type BufferGetter = () => Promise<Buffer>;
type Buffer = Array<0 | 1>;
type Position = [number | string, number | string];


type DrawItem = {
  textObject: TextObject;
  position: Position;
}

type DrawQueue = DrawItem[];

async function drawToCanvas (queue: DrawQueue) {
  console.log('[log] drawToCanvas', queue);
  const [canvasWidth, canvasHeight] = getResolution();
  // const canvas = document.createElement('canvas');                               
  // const context = canvas.getContext('2d');                                       
  // canvas.width = canvasWidth;                                                   
  // canvas.height = canvasHeight;                                                 

  const elements: any = getPixels();
  if (!elements) {                                                                
    // console.log('Failed at all');
  //   return;                                                                      
  }

  // const font = new FontFace('BBFont', 'url(/path/to/font/file)');               
  // document.fonts.add(await font.load());                                         

  // context.font = 'lighter 10px Pixelify Sans';
  // context.fillText('Vasily Styazhkin', 2, 15);                                     
  // const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  // const binaryMap = [];

  let maxWidth = 0;
  let maxHeight = 0;

  // const startIndex = $leftTopY * canvasWidth + $leftTopX;
  // const endIndex = ($leftTopY + $height) * canvasWidth + $leftTopX + $width;

  const startIndex = Math.min(
    ...queue.map((item) => {
      const x = getStartX(item, canvasWidth);
      const y = getStartY(item, canvasHeight);

      return y * canvasWidth + x;
    })
  );

  const endIndex = Math.max(
    ...queue.map((item) => {
      const x = getStartX(item, canvasWidth) + item.textObject.width;
      const y = getStartY(item, canvasHeight) + item.textObject.buffer.length / item.textObject.width;

      return y * canvasWidth + x + item.textObject.width;
    })
  );

  console.log('startIndex', startIndex, endIndex);

  // Calculate merged buffer dimensions
  for (let i = 0; i < queue.length; i++) {
    const buffer = typeof queue[i].textObject.buffer === 'function' ? await queue[i].textObject.buffer() : queue[i].textObject.buffer;
    // console.log('buffer', buffer);
    maxHeight = Math.max(
      maxHeight,
      (buffer.length / queue[i].textObject.width) + getStartY(queue[i], canvasHeight));
    maxWidth = Math.max(
      maxWidth,
      queue[i].textObject.width + getStartX(queue[i], canvasWidth));
  }


  const mergedBuffer = new Array(maxWidth * maxHeight).fill(0);
  // console.log('maxHeight', {maxHeight, maxWidth, length: mergedBuffer.length});

  // Write to merged buffer
  for (let i = 0; i < queue.length; i++) {
    const { textObject } = queue[i];
    const buffer = await resolveBuffer(textObject);
    const renderStartX = getStartX(queue[i], canvasWidth);
    const renderStartY = getStartY(queue[i], canvasHeight);

    // console.log('here', buffer.length);
    for (let j = 0; j < buffer.length; j++) {
      const x = j % textObject.width;
      const y = Math.floor(j / textObject.width);

      const index = (y + renderStartY) * maxWidth + (x + renderStartX);
      mergedBuffer[index] = buffer[j];
    }
  }

  // for (let i = 0; i < elements.length; i++) {
  //   const x = i % canvasWidth;
  //   const y = Math.floor(i / canvasHeight);
  //   // elements[i].checked = false;

  //   // if (
  //   //   x < renderStartX || x >= renderStartX + inputWidth ||
  //   //   y < renderStartY || y >= renderStartY + inputHeight
  //   // ) {
  //   //   continue;
  //   // }
  //   const index = y * maxWidth + Math.min(x, maxWidth);

    // console.log(i, 'x', x, 'y', y, 'index', index);

  //   elements[i].checked = !!mergedBuffer[index];
  // }

  // Draw to canvas
  for (let i = startIndex; i < endIndex; i++) {
    const x = i % canvasWidth;
    const y = Math.floor(i / canvasWidth);

    if (x >= maxWidth || y >= maxHeight) {
      continue;
    }

    const relativeIndexInMergedBuffer = y * maxWidth + x;

    elements[i].checked = !!mergedBuffer[relativeIndexInMergedBuffer];
  }

  // dumpBufferToConsole(mergedBuffer, 10);

  return;

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

async function resolveBuffer (textObject: TextObject) {
  return typeof textObject.buffer === 'function' ? textObject.buffer() : textObject.buffer;
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
  console.log('[log] renderCheckboxes');
  if (document.querySelector(".checkbox-display input")) {
    console.log('[log] renderCheckboxes already rendered');
    return;
  }

  const [cols, rows] = getResolution();
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < cols * rows; i++) {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    fragment.appendChild(checkbox);
  }

  console.log('[log] renderCheckboxes appending fragment');
  document.querySelector(".checkbox-display")?.appendChild(fragment);
}

// const debouncedProcessCanvas = debounce(drawToCanvas, 300);

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
  // console.log('img', img.src);
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
      // console.log('imageData', imageData);
      const binaryMap = [];
      for (let i = 0; i < imageData.data.length; i += 4) {
        const alpha = imageData.data[i + 3];
        const value = alpha > 128 ? 1 : 0;
        binaryMap.push(value);
      }

      resolve(binaryMap as any);
    }
  });
}

(function main () {
  if (typeof document === 'undefined') return;
  const main = document.createElement('main')
  main.className = 'main-container d-flex align-items-center';
  const displayEl = document.createElement('div');
  displayEl.className = 'checkbox-display';
  main.appendChild(displayEl);
  document.body.appendChild(main);

  listenEvents();

  // getSvgBuffer();

  function render () {
    renderCheckboxes();
    drawToCanvas([
      { textObject: vasilyator, position: [1, 1] },
      // { textObject: iDo, position: [10, 10] },
      // { textObject: doTs, position: [23, 10] },
      // { textObject: nodeLogo, position: [50, 0] },
    ]);
  }

  render();

  window.addEventListener('resize', () => {
    // console.log('resize', data);
    // render();
    // renderCheckboxes();
    // drawToCanvas(vasyan, [5, 5]);
    // drawToCanvas(bio, [5, 20]);
  });
})();

function delay (ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


function listenEvents() {
  document.getElementById('dev-animation')?.addEventListener('change', async (e) => {
    if ((e.target as HTMLInputElement).checked) {
      await iDoBlockRoutine(1, 10);
    }
  });
}


async function iDoBlockRoutine (x: number = 10, y: number = 10) {
  console.log('iDoBlockRoutine');
  const items = [doTs, doJs, doAWS, doDocker, doForms];
  let index = 0;

  while (true) {
    drawToCanvas([
      { textObject: iDo, position: [x, y] },
      { textObject: items[index], position: [x + 13, y] },
    ]);
    await delay(1000);
    drawToCanvas([
      { textObject: { ...items[index], buffer: (items[index].buffer as Buffer).map(() => 0) }, position: [x + 13, y] },
    ]);
    index = (index + 1) % items.length;
  }
}

function dumpBufferToConsole(buffer: any[], width: number) {
  console.log('dumping buffer with length', buffer.length);
  let result = '';
  for (let i = 0; i < buffer.length; i++) {
    result += buffer[i] ? '■' : '_';
    if (i % width === width - 1) {
      result += '\n';
    }
  }

  console.log(result);
}


export default function Page() {
  // file = await fs.readFile(process.cwd() + '/public/typescript.svg');
  // data = file.toString('utf-8');
  // // main();

  // return <Script src="/lab/page.js" />;
}

function dumpSelectedElementsInRect($leftTopX: number, $leftTopY: number, $width: number, $height: number) {
  const [canvasWidth, canvasHeight] = getResolution();
  const elements: any = getPixels();
  const result = new Array($width * $height).fill(0);

  const startIndex = $leftTopY * canvasWidth + $leftTopX;
  const endIndex = ($leftTopY + $height) * canvasWidth + $leftTopX + $width;

  console.log('startIndex', startIndex, 'endIndex', endIndex);

  for (let i = startIndex; i < endIndex; i++) {
    const x = i % canvasWidth;
    const y = Math.floor(i / canvasWidth);

    if (
      x < $leftTopX || x >= $leftTopX + $width ||
      y < $leftTopY || y >= $leftTopY + $height
    ) {
      continue;
    }

    const index = (y - $leftTopY) * $width + (x - $leftTopX);
    if (index > result.length) continue;

    result[index] = elements[i].checked ? 1 : 0;
  }

  return result;
}

(window as any).dumpSelectedElementsInRect = dumpSelectedElementsInRect;
(window as any).dumpBufferToConsole = dumpBufferToConsole;
