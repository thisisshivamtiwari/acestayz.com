import React from 'react'

const GOLD = '#D4AF37'
const BRAND_BLUE = '#4B9CD3'
const CARD_BLUE = '#5ba8e0'

// --- Flippable Membership Card (ACE STAYZ branded) ---
interface FlippableMembershipCardProps extends React.HTMLAttributes<HTMLDivElement> {
  cardholderName?: string
  memberId?: string
}

const FlippableMembershipCard = React.forwardRef<HTMLDivElement, FlippableMembershipCardProps>(
  ({ className = '', cardholderName = 'MEMBER', memberId = '•••• •••• •••• 1939', ...props }, ref) => {
    return (
      <div
        className={`group h-44 w-72 [perspective:1000px] ${className}`}
        ref={ref}
        {...props}
      >
        <div className="relative h-full w-full rounded-xl shadow-xl transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
          {/* --- CARD FRONT --- */}
          <div
            className="absolute h-full w-full rounded-xl [backface-visibility:hidden] text-white overflow-hidden"
            style={{ backgroundColor: CARD_BLUE }}
          >
            <div className="relative flex h-full flex-col justify-between p-4">
              <div className="flex items-start justify-between">
                {/* Gold chip */}
                <div
                  className="h-9 w-12 rounded-md opacity-90"
                  style={{
                    background: `linear-gradient(135deg, ${GOLD} 0%, #b8962e 50%, ${GOLD} 100%)`,
                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3), 0 1px 2px rgba(0,0,0,0.2)',
                  }}
                />
                {/* Logo placeholders (three small rounded rects) */}
                <div className="flex gap-1">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-5 w-8 rounded bg-white/30" />
                  ))}
                </div>
              </div>

              {/* Card number placeholder (dashed) */}
              <div className="flex justify-center gap-2 font-mono text-sm tracking-widest">
                {['••••', '••••', '••••', 'MEM'].map((part, i) => (
                  <span key={i} className="text-white/90">
                    {part}
                  </span>
                ))}
              </div>

              <div className="flex items-end justify-between">
                <div>
                  <p className="text-[10px] font-semibold uppercase opacity-80">Member</p>
                  <p className="font-mono text-xs font-medium tracking-wide">{cardholderName}</p>
                </div>
                {/* Mastercard-style overlapping circles */}
                <div className="relative flex items-center">
                  <div
                    className="h-8 w-8 rounded-full border-2 border-white/50"
                    style={{ backgroundColor: GOLD, marginRight: -6 }}
                  />
                  <div className="h-8 w-8 rounded-full bg-white/90 border-2 border-white/50" />
                </div>
              </div>
            </div>
          </div>

          {/* --- CARD BACK --- */}
          <div
            className="absolute h-full w-full rounded-xl text-white [backface-visibility:hidden] [transform:rotateY(180deg)] overflow-hidden"
            style={{ backgroundColor: CARD_BLUE }}
          >
            <div className="flex h-full flex-col">
              <div className="mt-6 h-10 w-full bg-black/20" />
              <div className="mx-4 mt-4 flex justify-end">
                <div className="flex h-8 w-16 items-center justify-center rounded-md bg-white/20">
                  <p className="font-mono text-xs">•••</p>
                </div>
              </div>
              <p className="self-end pr-4 text-[10px] font-semibold uppercase opacity-80">Security</p>
              <div className="mt-auto p-4 text-center">
                <span className="text-xs font-bold tracking-wider" style={{ color: GOLD }}>
                  ACE STAYZ
                </span>
                <p className="text-[10px] opacity-80 mt-0.5">Membership Card</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
)
FlippableMembershipCard.displayName = 'FlippableMembershipCard'

// --- Membership Card Strip Section ---
const MembershipCardStrip: React.FC = () => {
  return (
    <section className="relative py-16 md:py-20 overflow-hidden bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Title + Description */}
          <div className="space-y-4 order-2 lg:order-1">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              <span className="font-bold" style={{ color: GOLD }}>
                ACE STAYZ
              </span>
              <span className="ml-2" style={{ color: BRAND_BLUE }}>
                Membership Card
              </span>
            </h2>
            <p className="text-gray-600 text-lg max-w-xl leading-relaxed">
              The key to the most exciting offers with us at Ace Stayz coming soon....
            </p>
          </div>

          {/* Right: Interactive Card */}
          <div className="flex justify-center lg:justify-end order-1 lg:order-2">
            <FlippableMembershipCard cardholderName="MEMBER" memberId="•••• •••• •••• 1939" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default MembershipCardStrip
export { FlippableMembershipCard }
