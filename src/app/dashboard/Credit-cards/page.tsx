import React from 'react'
import Credit_Card from '@/components/Card'
import CardExpenseStats from '@/components/credit-cards/CardExpenseStats'
import CardList from '@/components/credit-cards/CardList'
import AddNewCard from '@/components/credit-cards/AddNewCard'
import CardSetting from '@/components/credit-cards/CardSetting'

export default function page() {
  return (
    <div className='flex flex-col gap-7'>
      <Credit_Card />
      <div className='flex flex-col gap-4 lg:gap-[5rem] lg:grid lg:grid-cols-[1fr_2fr]'>
        <CardExpenseStats />
        <CardList />
      </div>
      <div className='flex flex-col gap-4 lg:grid lg:grid-cols-[2fr_1fr]'>
        <AddNewCard />
        <CardSetting />
      </div>
    </div>
  )
}
