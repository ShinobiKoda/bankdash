import AddCard from '@/components/transactions/AddCard'
import React from 'react'
import Expense from '@/components/transactions/Expense'

export default function page() {
  return (
    <div className='w-full flex flex-col gap-7'>
      <div className='flex flex-col lg:grid lg:grid-cols-[3fr_1fr] gap-6'>
      <AddCard/>
      <Expense />
      </div>
    </div>
  )
}
