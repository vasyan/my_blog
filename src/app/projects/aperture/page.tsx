"use client"
import { useState } from 'react';
import './styles.scss';

export default function AperturePage () {
  const [value, setValue] = useState(1);
  const [focusValue, setFocusValue] = useState(1);

  return (
    <main className="main-container life-in-weeks">
      <div className="container px-2">
        <div className="text-center mb-4">
          <h1><a href="https://en.wikipedia.org/wiki/Aperture" className="text-decoration-underline">Aperture</a> simulation ( aka css filter property stress test )</h1>
        </div>
        <label>F-stop</label>
        <input
          className=""
          type="range"
          value={value}
          min={1}
          max={10}
          step={1}
          onKeyDown={e => e.preventDefault()}
          onChange={e => { setValue(parseInt(e.target.value, 10))}}
        />
        <div>
          <label>Focus</label>
          <input
            className=""
            type="range"
            value={focusValue}
            min={1}
            max={20}
            step={1}
            onKeyDown={e => e.preventDefault()}
            onChange={e => { setFocusValue(parseInt(e.target.value, 10))}}
          />
        </div>

        <div className="leafs-container">
          {Array(15).fill(null).map((_, index) => {
            const blur = (Math.abs(focusValue - index) * 2) - (value / 1.1);
            return (
              <div
                key={index}
                className={`leaf ${index === 3 && 'pig' || index === 6 && 'cat'}`}
                style={{ filter: `blur(${blur}px)` }}
              />
            );
          })}
        </div>
        <p className="mt-3">
          This is a simplified demonstration of how aperture and focal length changes affect the sharpness of a scene. Lower values for the diaphragm (f-stop, aperture) result in a shorter focus range, and vice versa.
        </p>
        <p>
          Try to catch a kittie&apos;s portrait with a nice <a className="text-decoration-underline" href="https://en.wikipedia.org/wiki/Bokeh">bokeh</a>
        </p>
      </div>
    </main>
  );
}

function Leaf () {
  return (
    <div className="leaf" />
  );
}
