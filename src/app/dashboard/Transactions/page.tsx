import Credit_Card from '@/components/Card'
import React from 'react'

export default function page() {
  return (
    <div className='w-full'>
      <div className='flex flex-col lg:grid lg:grid-cols-[3fr_1fr]'>
      <Credit_Card />
      <div>

      </div>
      </div>
    </div>
  )
}
