import { useState, useEffect, useRef } from 'react'

/**
 * Reusable typewriter hook.
 * - Ek single string doge (loop: false) → ek baar type hoke ruk jayega.
 * - Strings ka array doge (loop: true) → type → pause → delete → next
 *   string, infinite cycle mein (jaise "Frontend Developer" → "React
 *   Developer" → ...).
 */
export function useTypewriter(words, { loop = false, typingSpeed = 80, deletingSpeed = 40, pauseTime = 1400 } = {}) {
  const list = Array.isArray(words) ? words : [words]
  const [text, setText] = useState('')
  const indexRef = useRef(0)   // konsa word chal raha hai
  const charRef = useRef(0)    // kitne characters ab tak type hue
  const deletingRef = useRef(false)

  useEffect(() => {
    let timeoutId

    function tick() {
      const currentWord = list[indexRef.current]

      if (!deletingRef.current) {
        // typing forward
        charRef.current += 1
        setText(currentWord.slice(0, charRef.current))

        if (charRef.current === currentWord.length) {
          if (!loop) return // single-shot: yahin ruk jao, delete mat karo
          deletingRef.current = true
          timeoutId = setTimeout(tick, pauseTime)
          return
        }
        timeoutId = setTimeout(tick, typingSpeed)
      } else {
        // deleting backward
        charRef.current -= 1
        setText(currentWord.slice(0, charRef.current))

        if (charRef.current === 0) {
          deletingRef.current = false
          indexRef.current = (indexRef.current + 1) % list.length
          timeoutId = setTimeout(tick, 300)
          return
        }
        timeoutId = setTimeout(tick, deletingSpeed)
      }
    }

    timeoutId = setTimeout(tick, typingSpeed)
    return () => clearTimeout(timeoutId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return text
}