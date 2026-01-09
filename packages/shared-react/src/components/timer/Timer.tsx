'use client';

import { useEffect, useState } from "react";

function formatMillisecondsToTimer(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}


export interface TimerProps {
  initialEta: number;
  refreshRate?: number;
  step?: number;
  etaFormatter?: (originalEta: number) => string;
  onStop?: () => void;
  onTick?: (prevEta: number, newEta: number)=>void;
}


//TODO: create a library for this
export default function Timer({
  initialEta,
  refreshRate = 1000,
  step = 1000,
  onStop,
  onTick,
  etaFormatter = formatMillisecondsToTimer
}: TimerProps) {
  const [eta, setEta] = useState<{current: number; prev: number}>(()=>({
    current: initialEta,
    prev: NaN,
  }));

  useEffect(()=>{
    onTick?.(eta.prev, eta.current)
    if(eta.current <= 0)
      onStop?.()
  }, [eta])

  useEffect(() => {
    const intervalId = setInterval(() => {
      setEta(prev => {
        const newValue = prev.current - step;
 
        if (newValue <= 0) {
          clearInterval(intervalId)
          return {
            current: 0,
            prev: prev.current
          }
        }

        return {current: newValue, prev: prev.current}
      });

    }, refreshRate)

    return () => {
      clearInterval(intervalId)
    }
  }, [refreshRate, step, onTick, onStop])

  return etaFormatter(eta.current)

}