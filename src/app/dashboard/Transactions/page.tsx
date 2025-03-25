import Credit_Card from '@/components/Card'
import AddCard from '@/components/transactions/AddCard'
import React from 'react'

export default function page() {
  return (
    <div className='w-full'>
      <div className='flex flex-col lg:grid lg:grid-cols-[3fr_1fr]'>
      <AddCard/>
      <div>

      </div>
      </div>
    </div>
  )
}
