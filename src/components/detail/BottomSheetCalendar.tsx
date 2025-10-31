import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { brandBlue, PrimaryButton } from './Base'

type Cell = { day: number; date?: Date }

function MonthView({ year, month, startDate, endDate, onPick, minDate }: {
  year: number
  month: number // 0-based
  startDate?: Date
  endDate?: Date
  onPick: (d: Date) => void
  minDate: Date
}) {
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const startOn = new Date(year, month, 1).getDay()
  const cells: Cell[] = useMemo(() => {
    const padding = Array.from({ length: startOn }).map(() => ({ day: 0 }))
    const monthCells = Array.from({ length: daysInMonth }).map((_, i) => ({ day: i + 1, date: new Date(year, month, i + 1) }))
    return [...padding, ...monthCells]
  }, [startOn, daysInMonth, month, year])

  const isSame = (a?: Date, b?: Date) => !!a && !!b && a.toDateString() === b.toDateString()
  const inRange = (d?: Date) => startDate && endDate && d && d > startDate && d < endDate

  return (
    <div>
      <div className="text-center font-semibold text-gray-800 mb-3">{new Date(year, month, 1).toLocaleString(undefined, { month: 'long', year: 'numeric' })}</div>
      <div className="grid grid-cols-7 gap-2 text-center text-xs text-gray-400 mb-2">
        {['S','M','T','W','T','F','S'].map(s => <div key={s}>{s}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {cells.map((cell, idx) => {
          const d = cell.date
          const isStart = isSame(d, startDate)
          const isEnd = isSame(d, endDate)
          const range = inRange(d)
          const isDisabled = !d || d < minDate
          const base = d ? (isDisabled ? 'bg-gray-50 text-gray-300 border border-gray-100 cursor-not-allowed' : 'bg-white text-gray-700 border border-gray-200 hover:border-blue-200 hover:bg-blue-50') : 'opacity-0 pointer-events-none'
          return (
            <button
              key={idx}
              onClick={() => d && !isDisabled && onPick(d)}
              className={`h-9 rounded-md flex items-center justify-center relative ${base}`}
              aria-disabled={isDisabled}
            >
              {d && (
                <span className={`relative z-10 ${isStart || isEnd ? 'text-white' : 'text-gray-700'}`}>{cell.day}</span>
              )}
              {(isStart || isEnd) && <span className="absolute inset-0 rounded-md" style={{ backgroundColor: brandBlue, opacity: 0.95 }} />}
              {range && <span className="absolute inset-0 rounded-md bg-blue-100" />}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default function BottomSheetCalendar({ open, onClose, initialStart, initialEnd, onConfirm }: { open: boolean; onClose: () => void; initialStart?: Date; initialEnd?: Date; onConfirm?: (start?: Date, end?: Date) => void }) {
  const [startDate, setStartDate] = useState<Date | undefined>(initialStart)
  const [endDate, setEndDate] = useState<Date | undefined>(initialEnd)
  const base = initialStart ?? new Date()
  const [baseYear, setBaseYear] = useState(base.getFullYear())
  const [baseMonth, setBaseMonth] = useState(base.getMonth())
  const today = useMemo(() => { const t = new Date(); t.setHours(0,0,0,0); return t }, [])
  const nights = startDate && endDate ? Math.max(1, Math.round((+endDate - +startDate) / 86400000)) : 0

  const pick = (d: Date) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(d)
      setEndDate(undefined)
    } else if (d < startDate) {
      setEndDate(startDate)
      setStartDate(d)
    } else {
      setEndDate(d)
    }
  }

  const reset = () => { setStartDate(undefined); setEndDate(undefined) }

  useEffect(() => {
    if (open) {
      setStartDate(initialStart)
      setEndDate(initialEnd)
      const b = initialStart ?? new Date()
      setBaseYear(b.getFullYear())
      setBaseMonth(b.getMonth())
    }
  }, [open, initialStart, initialEnd])

  const shiftBase = (deltaMonths: number) => {
    const d = new Date(baseYear, baseMonth + deltaMonths, 1)
    setBaseYear(d.getFullYear())
    setBaseMonth(d.getMonth())
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[100]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-black/50" onClick={onClose} />
          <motion.div
            className="absolute inset-x-0 bottom-0 h-[100vh] bg-white rounded-t-3xl overflow-hidden flex flex-col"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          >
            {/* Header */}
            <div className="px-6 pt-4 pb-3 border-b border-gray-200">
              <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-3" />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button onClick={() => shiftBase(-1)} className="px-2 py-1 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50">Prev</button>
                  <div className="font-semibold text-gray-800">Select Dates</div>
                  <button onClick={() => shiftBase(1)} className="px-2 py-1 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50">Next</button>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  {startDate ? startDate.toDateString() : 'Check‑in'}
                  <span>→</span>
                  {endDate ? endDate.toDateString() : 'Check‑out'}
                  {nights > 0 && <span className="ml-2 px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">{nights} nights</span>}
                </div>
                <button onClick={onClose} className="text-gray-500 hover:text-gray-700">Close</button>
              </div>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-auto p-6">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <MonthView year={baseYear} month={baseMonth} startDate={startDate} endDate={endDate} onPick={pick} minDate={today} />
                  <MonthView year={new Date(baseYear, baseMonth + 1, 1).getFullYear()} month={new Date(baseYear, baseMonth + 1, 1).getMonth()} startDate={startDate} endDate={endDate} onPick={pick} minDate={today} />
                </div>
                {/* Banner with image */}
                <div className="mt-8 rounded-2xl p-6 text-white flex items-center gap-6" style={{ background: 'linear-gradient(135deg, #4B9CD3 0%, #1e66a8 100%)' }}>
                  <div className="flex-1">
                    <div className="text-lg font-semibold mb-1">Book Direct for Lowest Price</div>
                    <div className="text-white/90 text-sm">Unlock exclusive member deals, free early check‑in and late check‑out on select dates.</div>
                  </div>
                  <img src="https://images.unsplash.com/photo-1586611292717-f828b167408c?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=800" alt="Offer" className="w-40 h-24 object-cover rounded-lg shadow-md hidden md:block" />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between gap-3">
              <div className="text-sm text-gray-600">
                <span className="font-medium">{startDate ? startDate.toDateString() : 'Check‑in'}</span>
                <span className="mx-2">→</span>
                <span className="font-medium">{endDate ? endDate.toDateString() : 'Check‑out'}</span>
                {nights > 0 && <span className="ml-2 text-blue-700">• {nights} nights</span>}
              </div>
              <div className="flex gap-3">
                <button onClick={reset} className="px-4 py-2 rounded-xl border border-gray-200 text-gray-600">Reset</button>
                <PrimaryButton onClick={() => { onConfirm && onConfirm(startDate, endDate); onClose(); }}>{endDate ? 'Confirm' : 'Select dates'}</PrimaryButton>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}


