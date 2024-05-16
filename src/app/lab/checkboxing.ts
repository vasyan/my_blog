import * as buffers from './buffers';

function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

let getElementsCache: any;
function getPixels () {
  if (getElementsCache) return getElementsCache;
  const elements = document.querySelectorAll(".checkbox-display input");
  getElementsCache = elements;
  return elements;
}

let iDoBlockRoutineRunning = false;
const CHECKBOX_SIZE = 13;
const CHECKBOX_SIZE_MOBILE = 8;
type Resolution = [number, number];
function getResolution(): Resolution {
  const viewportWidth = window.innerWidth;
  const isMobile = isMobileDevice() || viewportWidth < 768;
  const size = isMobile ? CHECKBOX_SIZE_MOBILE : CHECKBOX_SIZE;
  return [
    Math.floor(window.innerWidth / size),
    // Math.floor(((window.innerHeight - (isMobile ? 230 : 140))) / size)
    Math.floor(((window.innerHeight - 120)) / size)
  ];
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
const hireMe: TextObject = {
  buffer: buffers.hireMe,
  width: buffers.hireMe.length / 5,
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

type BufferGetter = () => Promise<Buffer>;
type Buffer = Array<0 | 1>;
type Position = [number | string, number | string];


type DrawItem = {
  textObject: TextObject;
  position: Position;
}

type DrawQueue = DrawItem[];

async function drawToCanvas (queue: DrawQueue) {
  // console.log('[log] drawToCanvas', queue);
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

  // ----------------- IN CASE OF CANVAS
  // const font = new FontFace('BBFont', 'url(/path/to/font/file)');               
  // document.fonts.add(await font.load());                                         

  // context.font = 'lighter 10px Pixelify Sans';
  // context.fillText('Vasily Styazhkin', 2, 15);                                     
  // const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  // const binaryMap = [];
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
  // ----------------- END IN CASE OF CANVAS

  let maxWidth = 0;
  let maxHeight = 0;

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

  // console.log('startIndex', startIndex, endIndex);

  // Calculate merged buffer dimensions
  for (let i = 0; i < queue.length; i++) {
    const buffer = typeof queue[i].textObject.buffer === 'function'
      ? await (queue[i].textObject.buffer as BufferGetter)()
      : queue[i].textObject.buffer;
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

    for (let j = 0; j < buffer.length; j++) {
      const x = j % textObject.width;
      const y = Math.floor(j / textObject.width);

      const index = (y + renderStartY) * maxWidth + (x + renderStartX);
      mergedBuffer[index] = buffer[j];
    }
  }

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

function renderCheckboxes(force: boolean = false) {
  // console.log('[log] renderCheckboxes');
  if (!force && document.querySelector(".checkbox-display input")) {
    console.log('[log] renderCheckboxes already rendered');
    return;
  }

  const [cols, rows] = getResolution();
  const area = cols * rows;

  if (force) {
    const elem = document.querySelector(".checkbox-display");
    if (elem) elem.innerHTML = '';
    // if (elem) {
    //   const delta = area - elem.children.length;

    //   console.log('delta', delta);

    //   if (delta > 0) {
    //     for (let i = 0; i < delta; i++) {
    //       const checkbox = document.createElement("input");
    //       checkbox.type = "checkbox";
    //       elem.appendChild(checkbox);
    //     }
    //   } else if (delta < 0) {
    //     for (let i = 0; i < Math.abs(delta); i++) {
    //       elem.removeChild(elem.lastElementChild as Node);
    //     }
    //   }
    // }
  }

  const fragment = document.createDocumentFragment();
  for (let i = 0; i < area; i++) {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    fragment.appendChild(checkbox);
  }

  // console.log('[log] renderCheckboxes appending fragment');
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
  // --------- IN CASE OF CANVAS
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
  // --------- END IN CASE OF CANVAS

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
  console.log('[log] main');
  if (typeof document === 'undefined') return;
  const main = document.createElement('main')
  main.className = 'homepage-main-container d-flex align-items-center';
  const displayEl = document.createElement('div');
  displayEl.className = 'checkbox-display';
  main.appendChild(displayEl);
  // document.body.appendChild(main);
  document.querySelector('.draw-here')?.appendChild(main);

  listenEvents();

  // getSvgBuffer();

  function render (options: { force?: boolean } = {}) {
    const [canvasWidth, canvasHeight] = getResolution();
    renderCheckboxes(options.force);
    drawToCanvas([
      { textObject: vasilyator, position: [2, 1] },
      { textObject: hireMe, position: [2, canvasHeight - 5] },
      // { textObject: iDo, position: [10, 10] },
      // { textObject: doTs, position: [23, 10] },
      // { textObject: nodeLogo, position: [50, 0] },
    ]);
  }

  render();

  iDoBlockRoutineRunning = true;
  iDoBlockRoutine(2, 10);

  const debounceRender = debounce(render, 400);


  !isMobileDevice() && window.addEventListener('resize', () => {
    console.log('resize');
    getElementsCache = null;
    debounceRender({ force: true });
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
      iDoBlockRoutineRunning = true;
    } else {
      iDoBlockRoutineRunning = false;
    }

    iDoBlockRoutine(2, 10);
  });
}

async function iDoBlockRoutine (x: number = 10, y: number = 10) {
  const items = [doTs, doJs, doAWS, doDocker, doForms];
  let index = 0;

  while (iDoBlockRoutineRunning) {
    drawToCanvas([
      { textObject: iDo, position: [x, y] },
      { textObject: items[index], position: [x + 13, y] },
    ]);
    await delay(3000);
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
