---
title: 'How to add scrolling to react-dnd list'
description: "Simple solution to make a draggable and scrollable list with react-dnd without additional dependencies."
date: '2024-05-13'
categories:
    - 'react'
---

Full code and demo available at [codesandbox](https://codesandbox.io/p/sandbox/react-dnd-with-scrolling-cvvw8f)

![demo](/react-dnd-scrolling.gif)

Recently, I found myself needing a sortable list with drag-n-drop in react application. In my opinion, [react-dnd](https://react-dnd.github.io/react-dnd/) is an excellent lightweight library that provides a very flexible API. However, you have to implement any extra by yourself.
There are several alternatives that are ready to solve this problem, but they can bloat your project-dependency-weight as a trade-off. This might be fine for many cases, but this project too cozy for such a thing. So, let's DIY!

The official documentation includes [a sorting by dragging example](https://react-dnd.github.io/react-dnd/examples/sortable/simple) . Unfortunately, scrolling is not included. The main goal in this article is to demonstrate how to trigger scrolling with react-dnd when a user drags an element to the bottom or top edges of container.

At its most basic, it will involve state for scroll direction, which we will use to update the container `scrollTop` on approximately every 1/60th of second. To make the UX smooth the `scrollSpeedRef` will store a "power of scrolling" relative to how close the dragging element located to the edge. The idea is to simulate a physical world where pushing harder results in faster movement.

```typescript
const [scrollDir, setScrollDir] = useState<-1 | 0 | 1>(0);
const scrollSpeedRef = useRef(1);
```

`useInterval` is a variant of a popular utility hook found in many libraries. In my case the project is built with [React-Bootstrap](https://github.com/react-bootstrap/react-bootstrap), which is internally uses [@restart/hooks](https://github.com/react-restart/hooks). The logic is simple "execute a `callback` every `delay` if the `condition` is equal to true". We will pass `scrollDirection !== 0` as a `condition`, then an interval with the container's `scrollTop` updating code will run at the frequency specified by `delay`.

```typescript
function useInterval(callback: () => void, delay: number, condition: boolean) {
  const savedCallback = useRef(() => {});

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!condition) {
      return;
    }

    function tick() {
      savedCallback.current();
    }

    const id = setInterval(tick, delay);
    return () => {
      clearInterval(id);
    };
  }, [delay, condition]);
}
```

The scrolling magic happens in the next `useEffect` body. We need to listen to the dnd events somehow, and that's what `monitor.subscribeToOffsetChange` is for. It gets the position of the dragged element to calculate how close it is to the top or bottom. If it's within the `TRESHOLD` range, the direction state is updated with `-1` or `1`. This will run the `useInterval` discussed above.

```typescript
useEffect(() => {
  const TRESHOLD = 120;
  const ELEMENT_HEIGHT = 42;

  return monitor.subscribeToOffsetChange(() => {
    const offset = monitor.getSourceClientOffset()?.y;
    const rect = scrollEl.current?.getBoundingClientRect();
    if (!offset || !rect) {
      setScrollDir(0);
      return;
    }

    let direction: typeof scrollDir = 0;
    scrollSpeedRef.current = 1;
    if (offset > rect.bottom - (TRESHOLD + ELEMENT_HEIGHT)) {
      scrollSpeedRef.current = (offset - (rect.bottom - (TRESHOLD + ELEMENT_HEIGHT))) / TRESHOLD;
      direction = 1;
    } else if (offset < rect.top + TRESHOLD) {
      scrollSpeedRef.current = (offset - (rect.top + TRESHOLD)) / TRESHOLD;
      direction = -1;
    }

    setScrollDir(direction);
  });
}, [monitor]);

```

Be mindful of the props you pass to a list element. The longer the list, the mre renders will occur if any prop changes. Treat everything but primitive types with special care. In this example, we have the callback function, so wrap it with memoization.

```typescript
const onChangePosition = useCallback((from: number, to: number, hoveredItem: DragItem) => {
  setItems(prev => move(prev, from, to)); 
  hoveredItem.index = to;
}, [setItems]);
```

In cases where a callback manipulates a state, update the state by passing a function. It simplifies the `useCallback`'s dependencies. Since `setItems` is always the same function, we get a never invalidated memoization.

By adding a simple animation the feature will look and feel completed. 
Every list element knows its position. Store the previous value to compare it to new one.  This provides enough information to calculate the direction of a transition.

```typescript
useEffect(() => {
  if (prevIndex.current === index) return;
  setAnimationDirection(index - prevIndex.current);
  prevIndex.current = index;
}, [dropProps.handlerId, index])

const className = classNames('item', {
  'dragging': isDragging,
  'move-up': animationDirection > 0,
  'move-down': animationDirection < 0,
});
```

A little bit of CSS to make it alive.

```css
@keyframes moveUp {
  0% { transform: translate3d(0px, -42px, 0px); }
  100% { transform: translate3d(0px, 0px, 0px); }
}
@keyframes moveDown {
  0% { transform: translate3d(0px, 44px, 0px); }
  100% { transform: translate3d(0px, 0px, 0px); }
}

.move-up {
  animation-name: moveUp;
  animation-duration: .2s;
  animation-timing-function: ease-in-out;
}

.move-down {
  animation-name: moveDown;
  animation-duration: .2s;
  animation-timing-function: ease-in-out;
}
```
