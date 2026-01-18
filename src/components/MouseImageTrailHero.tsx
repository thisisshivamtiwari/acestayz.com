import React, { useRef } from 'react'
import { useAnimate } from 'framer-motion'
import { FiMousePointer } from 'react-icons/fi'

// ACE 55 Images
import ace55_1 from '../assets/images/ACE 55/Copy of IMG_3606 2.JPG'
import ace55_2 from '../assets/images/ACE 55/Copy of IMG_3570.jpg'
import ace55_3 from '../assets/images/ACE 55/Copy of DSC_0254-2.jpg'

// ACE 57 Images
import ace57_1 from '../assets/images/ACE 57/Copy of IMG_5838 2.jpg'
import ace57_2 from '../assets/images/ACE 57/Copy of IMG_5779.jpg'
import ace57_3 from '../assets/images/ACE 57/Copy of DSC_0384.jpg'

// Ace Vasant Kunj Images
import aceVK_1 from '../assets/images/Ace Vasant Kunj/Copy of IMG_8772.jpg'
import aceVK_2 from '../assets/images/Ace Vasant Kunj/Copy of IMG_7451.jpg'
import aceVK_3 from '../assets/images/Ace Vasant Kunj/Copy of IMG_7435.jpg'

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
        ace55_1,
        ace55_2,
        ace55_3,
        ace57_1,
        ace57_2,
        ace57_3,
        aceVK_1,
        aceVK_2,
        aceVK_3
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


