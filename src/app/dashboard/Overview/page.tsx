import CardSection from '@/components/CardSection'
import RecentTransaction from '@/components/RecentTransaction'
import WeelyActivity from '@/components/WeelyActivity'
import React from 'react'

export default function page() {
  return (
    <div className='flex flex-col gap-7'>
      <div className='flex flex-col gap-6 lg:grid lg:grid-cols-[2fr_1fr]'>
      <CardSection />
      <RecentTransaction />
      </div>
      <WeelyActivity />
    </div>
  )
}
