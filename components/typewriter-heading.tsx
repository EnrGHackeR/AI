"use client"

import { useEffect, useRef, useState } from "react"
import Typed from "typed.js"

interface TypewriterHeadingProps {
  text: string
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
  className?: string
  typeSpeed?: number
  startDelay?: number
  showCursor?: boolean
  loop?: boolean
}

export function TypewriterHeading({
  text,
  tag: Tag = "h2",
  className = "",
  typeSpeed = 40,
  startDelay = 200,
  showCursor = true,
  loop = false,
}: TypewriterHeadingProps) {
  const el = useRef<HTMLSpanElement>(null)
  const typed = useRef<Typed | null>(null)
  const [hasStarted, setHasStarted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true)
        }
      },
      { threshold: 0.3 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [hasStarted])

  useEffect(() => {
    if (!hasStarted || !el.current) return

    typed.current = new Typed(el.current, {
      strings: [text],
      typeSpeed,
      startDelay,
      showCursor,
      cursorChar: "|",
      loop,
      onComplete: (self) => {
        // Remove cursor after typing completes (if not looping)
        if (!loop && self.cursor) {
          setTimeout(() => {
            if (self.cursor) {
              self.cursor.style.opacity = "0"
              self.cursor.style.transition = "opacity 0.5s ease"
            }
          }, 1500)
        }
      },
    })

    return () => {
      typed.current?.destroy()
    }
  }, [hasStarted, text, typeSpeed, startDelay, showCursor, loop])

  return (
    <div ref={containerRef}>
      <Tag className={className} style={{ minHeight: "1.2em" }}>
        <span ref={el} />
      </Tag>
    </div>
  )
}
