import React from 'react'
import { AnimatedInView, Section } from './Base'

function Item({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = React.useState(false)
  return (
    <AnimatedInView>
      <div className="border-b border-gray-200">
        <button className="w-full text-left py-4 flex items-center justify-between" onClick={() => setOpen(!open)}>
          <span className="text-gray-800">{q}</span>
          <span className="text-gray-500">{open ? '–' : '+'}</span>
        </button>
        {open && <div className="pb-4 text-gray-600 text-sm">{a}</div>}
      </div>
    </AnimatedInView>
  )
}

export default function FAQ() {
  const items = [
    'What are the documents required for Check‑in?',
    'What is the cancellation policy?',
    'How can I get to the hotel from the nearest airport?',
    'What is the smoking policy?',
    'Are unmarried couples allowed?',
    'Does the hotel have an on‑site restaurant?'
  ]
  return (
    <Section id="faqs" title="Frequently Asked Questions">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((q, i) => (
          <Item key={i} q={q} a="Policies vary by property. Please check your booking details for specifics." />
        ))}
        </div>
      </div>
    </Section>
  )
}


