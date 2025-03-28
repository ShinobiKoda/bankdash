import AddCard from '@/components/transactions/AddCard'
import React from 'react'
import Expense from '@/components/transactions/Expense'
import RecentTransactions from '@/components/transactions/RecentTransactions'

export default function page() {
  return (
    <div className='w-full flex flex-col gap-5'>
      <div className='flex flex-col lg:grid lg:grid-cols-[2fr_1fr] gap-6'>
      <AddCard/>
      <Expense />
      </div>
      <div className='w-full'>
        <RecentTransactions />
      </div>
    </div>
  )
}
