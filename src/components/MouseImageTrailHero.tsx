import React, { useRef } from 'react'
import { useAnimate } from 'framer-motion'
import { FiMousePointer } from 'react-icons/fi'

type MouseImageTrailProps = {
  children: React.ReactNode
  images: string[]
  renderImageBuffer: number
  rotationRange: number
}

const MouseImageTrail: React.FC<MouseImageTrailProps> = ({ children, images, renderImageBuffer, rotationRange }) => {
  const [scope, animate] = useAnimate()
  const lastRenderPosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
  const imageRenderCount = useRef(0)

  const calculateDistance = (x1: number, y1: number, x2: number, y2: number) => {
    const deltaX = x2 - x1
    const deltaY = y2 - y1
    return Math.sqrt(deltaX * deltaX + deltaY * deltaY)
  }

  const renderNextImage = () => {
    const imageIndex = imageRenderCount.current % images.length
    const selector = `[data-mouse-move-index="${imageIndex}"]`
    const el = document.querySelector(selector) as HTMLElement | null
    if (!el) return

    const scopeEl = scope.current as HTMLElement | null
    const bounds = scopeEl?.getBoundingClientRect()
    const relativeX = bounds ? lastRenderPosition.current.x - bounds.left : lastRenderPosition.current.x
    const relativeY = bounds ? lastRenderPosition.current.y - bounds.top : lastRenderPosition.current.y

    el.style.top = `${relativeY}px`
    el.style.left = `${relativeX}px`
    el.style.zIndex = imageRenderCount.current.toString()

    const rotation = Math.random() * rotationRange

    animate(
      selector,
      {
        opacity: [0, 1],
        transform: [
          `translate(-50%, -25%) scale(0.5) ${imageIndex % 2 ? `rotate(${rotation}deg)` : `rotate(-${rotation}deg)`}`,
          `translate(-50%, -50%) scale(1) ${imageIndex % 2 ? `rotate(-${rotation}deg)` : `rotate(${rotation}deg)`}`
        ]
      },
      { type: 'spring', damping: 15, stiffness: 200 }
    )

    animate(
      selector,
      { opacity: [1, 0] },
      { ease: 'linear', duration: 0.5, delay: 5 }
    )

    imageRenderCount.current = imageRenderCount.current + 1
  }

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    const { clientX, clientY } = e
    const distance = calculateDistance(clientX, clientY, lastRenderPosition.current.x, lastRenderPosition.current.y)
    if (distance < renderImageBuffer) return
    lastRenderPosition.current.x = clientX
    lastRenderPosition.current.y = clientY
    renderNextImage()
  }

  return (
    <div ref={scope} className="relative overflow-hidden" onMouseMove={handleMouseMove}>
      {children}
      {images.map((img, index) => (
        <img
          className="pointer-events-none absolute left-0 top-0 h-40 w-auto rounded-xl border border-black/10 bg-white object-cover opacity-0 shadow-md will-change-transform"
          src={img}
          alt={`Mouse move image ${index + 1}`}
          key={index}
          data-mouse-move-index={index}
        />
      ))}
    </div>
  )
}

const MouseImageTrailHero: React.FC = () => {
  return (
    <MouseImageTrail
      renderImageBuffer={20}
      rotationRange={25}
      images={[
        'https://images.unsplash.com/photo-1560185007-5f0bb1866cab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1501117716987-c8e1ecb2101f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
      ]}
    >
      <section className="w-full px-4 sm:px-6 lg:px-8 py-20 bg-gray-100">
        <div className="max-w-6xl mx-auto text-center">
          <p className="flex items-center justify-center gap-2 text-3xl font-bold text-gray-900">
            <FiMousePointer aria-hidden />
            <span>Hover to preview stays</span>
          </p>
          <p className="mt-4 text-gray-700">
            Move your cursor to reveal a trail of beautiful hotel and homestay shots.
          </p>
        </div>
      </section>
    </MouseImageTrail>
  )
}

export default MouseImageTrailHero


