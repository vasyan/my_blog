"use client"
import { useRef, useState, useEffect } from 'react'
import { update } from './widget/visualizer'
import { Rating } from './widget/rating'
import { assets, bikes, pipes } from './data'
import Script from 'next/script'
import './css/dist.css'

const threeJsUrl = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";

const getBikeImage = (path?: string) => {
  return `/revfella/assets/${path}/main.jpg`;
}

const getPipeImage = (path?: string) => {
  return `/revfella/assets/pipes/${path}.png`;
}

export default function App() {
  const [bikeId, setBikeId] = useState<number>(bikes[2].id)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const availablePipes = pipes.filter(({ id }) => { 
    return find(assets, { bikeId, pipeId: id })
  });
  const [pipeId, setPipeId] = useState<number>(availablePipes[0].id)
  const [debouncedIsLoading] = useDebounce(isLoading, 600)

  const containerRef = useRef<HTMLDivElement>(null)

  const onStateChange = (payload: string) => {
    // console.log('onStateChange: ', payload);
    switch (payload) {
      case 'loadstart':
        // console.log('here');
        setIsLoading(true);
        break;
      case 'canplay':
        setIsLoading(false);
        break;
    }
  }

  const updateAudioSource = (bikeId: number, pipeId: number) => {
    const bike = find(bikes, { id: bikeId });
    const pipe = find(pipes, { id: pipeId });
    let audioSource = `/revfella/assets/${bike?.path}/${pipe?.path}.mp3`;

    // if (import.meta.env.PROD) {
    //   const wpPath = '/wp-content/plugins/vroom-player/assets/'
    //   audioSource = `${wpPath}${bike?.path}/${pipe?.path}.mp3`;
    // }

    update({
      container: containerRef.current!,
      audioSource,
      onStateChange,
      onEnded: () => {
        setIsPlaying(false);
      }
    });
    setIsPlaying(true);
  }

  const onBikeChange = (event: any) => {
    const newValue = +(event.target?.value || 0);
    let newPipeId = pipeId;
    const asset = find(assets, { bikeId: newValue, pipeId });
    setBikeId(newValue);

    if (!asset) {
      newPipeId = find(assets, { bikeId: newValue })?.pipeId || 0;
      setPipeId(newPipeId);
    }

    updateAudioSource(newValue, newPipeId);
  }

  const onPipeChange = (event: any) => {
    const newValue = +(event.target?.value || 0);
    setPipeId(newValue);
    updateAudioSource(bikeId, newValue);
  }

  const handleUpdate = () => {
    updateAudioSource(bikeId, pipeId);
  }

  // console.log('render', isLoading);

  return (
    <div className="container mx-auto p-2 vr-player vh-100 align-content-center">
      <Script
        // type="importmap"
        // type="module"
        src={threeJsUrl}
        strategy="lazyOnload"
        onLoad={() =>
          setIsLoading(false)
        }
      />
      <div className="flex flex-col lg:flex-row lg:justify-center gap-4">
        <div className="">
          <div className="flex flex-col md:flex-row lg:flex-col gap-4 lg:w-72">
            <select value={bikeId} onChange={onBikeChange} className="cursor-pointer px-2 w-full rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              {bikes.map(({ id, title }) => {
                return <option key={id} value={id}>{title}</option>
              })}
            </select>
            <select value={pipeId} onChange={onPipeChange} className="cursor-pointer px-2 w-full rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              {availablePipes.map(({ id, title }) => {
                return <option key={id} value={id}>{title}</option>
              })}
            </select>
          </div>
          <div className="p-4 flex justify-center pt-9">
            <Rating rating={4.2} />
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="vr-player-content">
            <div className="relative">
              <img width={144} height={144} className="pipe-image"
                src={getPipeImage(find(pipes, { id: pipeId })?.path) || ''}
              />
              <img width={419} height={256} className="bike-image rounded-md shadow-lg ring-1 ring-black ring-opacity-5"
                src={getBikeImage(find(bikes, { id: bikeId })?.path) || ''}
              />
              {!isPlaying && !isLoading && (
                <button onClick={handleUpdate} className="vr-play-button text-gray-600 hover:text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                  Play
                </button>
              )}
            </div>
            <div ref={containerRef} className="relative vr-player-audio-vizualization rounded-b-md shadow-lg overflow-hidden mt-4">
              {debouncedIsLoading && isLoading && (
                <div className="flex absolute z-100 top-0 items-center justify-center w-full h-full border border-gray-200 rounded-lg bg-gray-200 animate-pulse">
                  <div className="px-3 py-2 text-md font-medium leading-none text-center text-red-800 ">Loading...</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function find (collection: any[], predicate: any): any {
  return collection.find(item => {
    for (const key in predicate) {
      if (item[key] !== predicate[key]) {
        return false
      }
    }
    return true
  })
}

function useDebounce (value: any, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return [debouncedValue]
}
