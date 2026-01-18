import React, { useState } from 'react'
import { FiUsers, FiMaximize2, FiCheck } from 'react-icons/fi'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { RoomType } from '../utils/hotelData'

interface RoomTypesProps {
  roomTypes: RoomType[]
}

const RoomTypes: React.FC<RoomTypesProps> = ({ roomTypes }) => {
  const { elementRef: titleRef, isVisible: titleVisible } = useScrollAnimation()
  const { elementRef: roomsRef, isVisible: roomsVisible } = useScrollAnimation()
  const [selectedRoom, setSelectedRoom] = useState<number | null>(null)
  const [selectedMealPlan, setSelectedMealPlan] = useState<Record<number, number>>({})

  const handleMealPlanSelect = (roomId: number, mealPlanId: number) => {
    setSelectedMealPlan((prev) => ({
      ...prev,
      [roomId]: mealPlanId,
    }))
  }

  const getTotalPrice = (room: RoomType) => {
    const mealPlanId = selectedMealPlan[room.id] || room.mealPlans[0]?.id || 0
    const mealPlan = room.mealPlans.find((mp) => mp.id === mealPlanId)
    return room.basePrice + (mealPlan?.price || 0)
  }

  return (
    <section className="relative py-16 sm:py-20 lg:py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          ref={titleRef}
          className={`text-center mb-12 sm:mb-16 transition-all duration-1000 ${
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-terracotta-dark mb-4">
            <span className="block font-sans">Room Types &</span>
            <span className="block text-gold-dust" style={{ fontFamily: 'Dancing Script, cursive', fontWeight: 700 }}>
              Meal Plans
            </span>
          </h2>
          <p className="mt-6 text-base sm:text-lg md:text-xl text-charcoal/70 max-w-3xl mx-auto leading-relaxed">
            Choose from our carefully curated selection of rooms and meal plans to suit your preferences.
          </p>
        </div>

        {/* Room Types Grid */}
        <div
          ref={roomsRef}
          className={`space-y-8 transition-all duration-1000 ${
            roomsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          {roomTypes.map((room, index) => {
            const isSelected = selectedRoom === room.id
            const currentMealPlan = selectedMealPlan[room.id] || room.mealPlans[0]?.id || 0
            const totalPrice = getTotalPrice(room)

            return (
              <div
                key={room.id}
                className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border-2 ${
                  isSelected ? 'border-gold-dust' : 'border-terracotta/20'
                }`}
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  {/* Room Image */}
                  <div className="relative h-64 sm:h-80 lg:h-full min-h-[300px] overflow-hidden">
                    <img
                      src={room.image}
                      alt={room.name}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-terracotta-dark/60 via-transparent to-transparent"></div>
                    {/* Price Badge */}
                    <div className="absolute top-4 right-4 bg-gold-dust/95 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg">
                      <div className="text-right">
                        <div className="text-xs text-charcoal/70 line-through">₹{room.basePrice.toLocaleString()}</div>
                        <div className="text-lg font-bold text-charcoal">₹{totalPrice.toLocaleString()}</div>
                        <div className="text-xs text-charcoal/70">/night</div>
                      </div>
                    </div>
                  </div>

                  {/* Room Details */}
                  <div className="p-6 sm:p-8 lg:p-10 flex flex-col">
                    <div className="flex-1">
                      <h3 className="text-2xl sm:text-3xl font-bold text-terracotta-dark mb-3 font-serif">
                        {room.name}
                      </h3>
                      <p className="text-charcoal/80 text-sm sm:text-base mb-4 leading-relaxed">
                        {room.description}
                      </p>

                      {/* Room Features */}
                      <div className="flex flex-wrap gap-3 mb-6">
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-terracotta/10 rounded-full">
                          <FiUsers className="w-4 h-4 text-terracotta" />
                          <span className="text-sm font-medium text-terracotta-dark">
                            {room.maxOccupancy} Guests
                          </span>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-terracotta/10 rounded-full">
                          <FiMaximize2 className="w-4 h-4 text-terracotta" />
                          <span className="text-sm font-medium text-terracotta-dark">{room.size}</span>
                        </div>
                      </div>

                      {/* Meal Plans */}
                      <div className="mb-6">
                        <h4 className="text-lg font-semibold text-terracotta-dark mb-3">Meal Plans</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {room.mealPlans.map((plan) => {
                            const isPlanSelected = currentMealPlan === plan.id
                            return (
                              <button
                                key={plan.id}
                                onClick={() => handleMealPlanSelect(room.id, plan.id)}
                                className={`p-3 rounded-lg border-2 text-left transition-all duration-300 ${
                                  isPlanSelected
                                    ? 'border-gold-dust bg-gold-dust/10'
                                    : 'border-terracotta/20 hover:border-terracotta/40'
                                }`}
                              >
                                <div className="flex items-start justify-between mb-2">
                                  <div className="flex-1">
                                    <div className="font-semibold text-terracotta-dark text-sm mb-1">
                                      {plan.name}
                                    </div>
                                    <div className="text-xs text-charcoal/70">{plan.description}</div>
                                  </div>
                                  {isPlanSelected && (
                                    <FiCheck className="w-5 h-5 text-gold-dust flex-shrink-0 ml-2" />
                                  )}
                                </div>
                                {plan.price > 0 && (
                                  <div className="text-sm font-bold text-terracotta-dark mt-2">
                                    +₹{plan.price.toLocaleString()}/night
                                  </div>
                                )}
                                {plan.includes.length > 0 && (
                                  <div className="mt-2 space-y-1">
                                    {plan.includes.map((item, idx) => (
                                      <div key={idx} className="text-xs text-charcoal/60 flex items-center gap-1">
                                        <FiCheck className="w-3 h-3 text-gold-dust" />
                                        {item}
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Select Button */}
                    <button
                      onClick={() => setSelectedRoom(isSelected ? null : room.id)}
                      className={`w-full py-3 rounded-lg font-semibold text-sm transition-all duration-300 ${
                        isSelected
                          ? 'bg-terracotta text-cream hover:bg-terracotta-dark'
                          : 'btn-gold-dust'
                      }`}
                    >
                      {isSelected ? 'Selected' : 'Select Room'}
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default RoomTypes

