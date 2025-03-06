import {useEffect, useRef} from 'react'

export default function useDebounced(func: any, delay: number, cleanUp = false) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  function clearTimer() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }

  useEffect(() => (cleanUp ? clearTimer : undefined), [cleanUp])

  return (...args: any) => {
    clearTimer()
    timeoutRef.current = setTimeout(() => func(...args), delay) as NodeJS.Timeout
  }
}
