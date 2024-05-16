// src/app/lab/buffers.ts
var vasilyator = [1, 0, 1, 0, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1];
var hireMe = [1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1];
var iDo = [1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0];
var doTs = [1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1];
var doJs = [0, 1, 1, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1];
var doAWS = [0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1];
var doDocker = [1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1];
var doForms = [1, 1, 1, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1];

// src/app/lab/checkboxing.ts
var isMobileDevice = function() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};
var getPixels = function() {
  if (getElementsCache)
    return getElementsCache;
  const elements = document.querySelectorAll(".checkbox-display input");
  getElementsCache = elements;
  return elements;
};
var getResolution = function() {
  const viewportWidth = window.innerWidth;
  const isMobile = isMobileDevice() || viewportWidth < 768;
  const size = isMobile ? CHECKBOX_SIZE_MOBILE : CHECKBOX_SIZE;
  return [
    Math.floor(window.innerWidth / size),
    Math.floor((window.innerHeight - 120) / size)
  ];
};
async function drawToCanvas(queue) {
  const [canvasWidth, canvasHeight] = getResolution();
  const elements = getPixels();
  if (!elements) {
  }
  let maxWidth = 0;
  let maxHeight = 0;
  const startIndex = Math.min(...queue.map((item) => {
    const x = getStartX(item, canvasWidth);
    const y = getStartY(item, canvasHeight);
    return y * canvasWidth + x;
  }));
  const endIndex = Math.max(...queue.map((item) => {
    const x = getStartX(item, canvasWidth) + item.textObject.width;
    const y = getStartY(item, canvasHeight) + item.textObject.buffer.length / item.textObject.width;
    return y * canvasWidth + x + item.textObject.width;
  }));
  for (let i = 0;i < queue.length; i++) {
    const buffer = typeof queue[i].textObject.buffer === "function" ? await queue[i].textObject.buffer() : queue[i].textObject.buffer;
    maxHeight = Math.max(maxHeight, buffer.length / queue[i].textObject.width + getStartY(queue[i], canvasHeight));
    maxWidth = Math.max(maxWidth, queue[i].textObject.width + getStartX(queue[i], canvasWidth));
  }
  const mergedBuffer = new Array(maxWidth * maxHeight).fill(0);
  for (let i = 0;i < queue.length; i++) {
    const { textObject } = queue[i];
    const buffer = await resolveBuffer(textObject);
    const renderStartX = getStartX(queue[i], canvasWidth);
    const renderStartY = getStartY(queue[i], canvasHeight);
    for (let j = 0;j < buffer.length; j++) {
      const x = j % textObject.width;
      const y = Math.floor(j / textObject.width);
      const index = (y + renderStartY) * maxWidth + (x + renderStartX);
      mergedBuffer[index] = buffer[j];
    }
  }
  for (let i = startIndex;i < endIndex; i++) {
    const x = i % canvasWidth;
    const y = Math.floor(i / canvasWidth);
    if (x >= maxWidth || y >= maxHeight) {
      continue;
    }
    const relativeIndexInMergedBuffer = y * maxWidth + x;
    elements[i].checked = !!mergedBuffer[relativeIndexInMergedBuffer];
  }
  return;
}
async function resolveBuffer(textObject) {
  return typeof textObject.buffer === "function" ? textObject.buffer() : textObject.buffer;
}
var getStartX = function(drawItem, canvasWidth) {
  const { position, textObject } = drawItem;
  const centerX = position[0] === "center";
  const renderStartX = typeof position[0] === "number" ? position[0] : centerX ? Math.floor(canvasWidth / 2) - Math.floor(textObject.width / 2) : Math.floor(canvasWidth / (100 / parseInt(position[0])));
  return renderStartX;
};
var getStartY = function(drawItem, canvasHeight) {
  const { position, textObject } = drawItem;
  const centerY = position[1] === "center";
  const renderStartY = typeof position[1] === "number" ? position[1] : centerY ? Math.floor(canvasHeight / 2) - Math.floor(textObject.buffer.length / textObject.width / 2) : Math.floor(canvasHeight / (100 / parseInt(position[1])));
  return renderStartY;
};
var renderCheckboxes = function(force = false) {
  if (!force && document.querySelector(".checkbox-display input")) {
    console.log("[log] renderCheckboxes already rendered");
    return;
  }
  const [cols, rows] = getResolution();
  const area = cols * rows;
  if (force) {
    const elem = document.querySelector(".checkbox-display");
    if (elem)
      elem.innerHTML = "";
  }
  const fragment = document.createDocumentFragment();
  for (let i = 0;i < area; i++) {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    fragment.appendChild(checkbox);
  }
  document.querySelector(".checkbox-display")?.appendChild(fragment);
};
var debounce = function(func, timeout) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, timeout);
  };
};
var delay = function(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
var listenEvents = function() {
  document.getElementById("dev-animation")?.addEventListener("change", async (e) => {
    if (e.target.checked) {
      iDoBlockRoutineRunning = true;
    } else {
      iDoBlockRoutineRunning = false;
    }
    iDoBlockRoutine(2, 10);
  });
};
async function iDoBlockRoutine(x = 10, y = 10) {
  const items = [doTs2, doJs2, doAWS2, doDocker2, doForms2];
  let index = 0;
  while (iDoBlockRoutineRunning) {
    drawToCanvas([
      { textObject: iDo2, position: [x, y] },
      { textObject: items[index], position: [x + 13, y] }
    ]);
    await delay(3000);
    drawToCanvas([
      { textObject: { ...items[index], buffer: items[index].buffer.map(() => 0) }, position: [x + 13, y] }
    ]);
    index = (index + 1) % items.length;
  }
}
var dumpBufferToConsole = function(buffer, width) {
  console.log("dumping buffer with length", buffer.length);
  let result = "";
  for (let i = 0;i < buffer.length; i++) {
    result += buffer[i] ? "\u25A0" : "_";
    if (i % width === width - 1) {
      result += "\n";
    }
  }
  console.log(result);
};
var dumpSelectedElementsInRect = function($leftTopX, $leftTopY, $width, $height) {
  const [canvasWidth, canvasHeight] = getResolution();
  const elements = getPixels();
  const result = new Array($width * $height).fill(0);
  const startIndex = $leftTopY * canvasWidth + $leftTopX;
  const endIndex = ($leftTopY + $height) * canvasWidth + $leftTopX + $width;
  console.log("startIndex", startIndex, "endIndex", endIndex);
  for (let i = startIndex;i < endIndex; i++) {
    const x = i % canvasWidth;
    const y = Math.floor(i / canvasWidth);
    if (x < $leftTopX || x >= $leftTopX + $width || y < $leftTopY || y >= $leftTopY + $height) {
      continue;
    }
    const index = (y - $leftTopY) * $width + (x - $leftTopX);
    if (index > result.length)
      continue;
    result[index] = elements[i].checked ? 1 : 0;
  }
  return result;
};
var getElementsCache;
var iDoBlockRoutineRunning = false;
var CHECKBOX_SIZE = 13;
var CHECKBOX_SIZE_MOBILE = 8;
var vasilyator2 = {
  buffer: vasilyator,
  width: 31
};
var iDo2 = {
  buffer: iDo,
  width: iDo.length / 5
};
var hireMe2 = {
  buffer: hireMe,
  width: hireMe.length / 5
};
var doTs2 = {
  buffer: doTs,
  width: doTs.length / 5
};
var doJs2 = {
  buffer: doJs,
  width: doJs.length / 5
};
var doAWS2 = {
  buffer: doAWS,
  width: doAWS.length / 5
};
var doDocker2 = {
  buffer: doDocker,
  width: doDocker.length / 5
};
var doForms2 = {
  buffer: doForms,
  width: doForms.length / 5
};
(function main() {
  console.log("[log] main");
  if (typeof document === "undefined")
    return;
  const main2 = document.createElement("main");
  main2.className = "homepage-main-container d-flex align-items-center";
  const displayEl = document.createElement("div");
  displayEl.className = "checkbox-display";
  main2.appendChild(displayEl);
  document.querySelector(".draw-here")?.appendChild(main2);
  listenEvents();
  function render(options = {}) {
    const [canvasWidth, canvasHeight] = getResolution();
    renderCheckboxes(options.force);
    drawToCanvas([
      { textObject: vasilyator2, position: [2, 1] },
      { textObject: hireMe2, position: [2, canvasHeight - 5] }
    ]);
  }
  render();
  iDoBlockRoutineRunning = true;
  iDoBlockRoutine(2, 10);
  const debounceRender = debounce(render, 400);
  !isMobileDevice() && window.addEventListener("resize", () => {
    console.log("resize");
    getElementsCache = null;
    debounceRender({ force: true });
  });
})();
window.dumpSelectedElementsInRect = dumpSelectedElementsInRect;
window.dumpBufferToConsole = dumpBufferToConsole;
