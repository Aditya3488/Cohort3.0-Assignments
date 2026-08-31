import { useRef, useEffect } from 'react'
import { themeColors } from '../theme/colors'

export default function CodeRainBackground({ className = '', theme = 'dark' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    // seedha JS object se colors — koi DOM timing dependency nahi,
    // isliye same-page toggle par bhi turant sahi color milega
    const colors = themeColors[theme] || themeColors.dark

    function hexToRgb(hex) {
      const h = hex.replace('#', '')
      const bigint = parseInt(h, 16)
      return { r: (bigint >> 16) & 255, g: (bigint >> 8) & 255, b: bigint & 255 }
    }
    const inkRgb = hexToRgb(colors.ink)
    const mutedRgb = hexToRgb(colors.muted)
    const accentRgb = hexToRgb(colors.accent)

    const chars = '01{}[]()<>;=+-*/&|!?#$%^~`.,:_'.split('')
    const fontSize = 15
    let columns = 0
    let drops = []

    function resize() {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      columns = Math.floor(canvas.width / fontSize)
      drops = Array.from({ length: columns }, () => Math.random() * -50)
    }
    resize()
    window.addEventListener('resize', resize)

    function draw() {
      ctx.fillStyle = `rgba(${inkRgb.r}, ${inkRgb.g}, ${inkRgb.b}, 0.08)`
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)]
        const x = i * fontSize

        ctx.fillStyle =
          Math.random() > 0.96
            ? `rgba(${accentRgb.r}, ${accentRgb.g}, ${accentRgb.b}, 0.7)`
            : `rgba(${mutedRgb.r}, ${mutedRgb.g}, ${mutedRgb.b}, 0.35)`
        ctx.fillText(char, x, drops[i] * fontSize)

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i] += 0.5
      }
    }

    const intervalId = setInterval(draw, 40)

    return () => {
      clearInterval(intervalId)
      window.removeEventListener('resize', resize)
    }
  }, [theme])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
    />
  )
}