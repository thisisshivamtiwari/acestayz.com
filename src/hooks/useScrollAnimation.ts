import { useEffect, useRef, useState } from 'react'

/**
 * Hook for scroll-triggered animations
 * Adds 'visible' class when element enters viewport
 */
export const useScrollAnimation = (threshold = 0.1) => {
  const elementRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          // Optionally unobserve after first trigger
          if (elementRef.current) {
            observer.unobserve(elementRef.current)
          }
        }
      },
      {
        threshold,
        rootMargin: '50px',
      }
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current)
      }
    }
  }, [threshold])

  return { elementRef, isVisible }
}

/**
 * Hook for multiple scroll animations
 * Returns array of refs and visibility states
 */
export const useMultipleScrollAnimations = (count: number, threshold = 0.1) => {
  const [visibilityStates, setVisibilityStates] = useState<boolean[]>(
    new Array(count).fill(false)
  )
  const elementRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observers = elementRefs.current.map((element, index) => {
      if (!element) return null

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibilityStates((prev) => {
              const newStates = [...prev]
              newStates[index] = true
              return newStates
            })
            observer.unobserve(element)
          }
        },
        {
          threshold,
          rootMargin: '50px',
        }
      )

      observer.observe(element)
      return observer
    })

    return () => {
      observers.forEach((observer) => observer?.disconnect())
    }
  }, [count, threshold])

  const setRef = (index: number) => (element: HTMLDivElement | null) => {
    elementRefs.current[index] = element
  }

  return { setRef, visibilityStates }
}

/**
 * Hook for detecting scroll direction
 */
export const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null)
  const [prevScrollY, setPrevScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > prevScrollY) {
        setScrollDirection('down')
      } else if (currentScrollY < prevScrollY) {
        setScrollDirection('up')
      }

      setPrevScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [prevScrollY])

  return scrollDirection
}

/**
 * Hook for sticky navigation behavior
 */
export const useStickyNav = (threshold = 100) => {
  const [isSticky, setIsSticky] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > threshold)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Check initial state

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [threshold])

  return isSticky
}

/**
 * Hook for parallax effect
 */
export const useParallax = (speed = 0.5) => {
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.scrollY * speed)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [speed])

  return offset
}


