import CardSection from '@/components/CardSection'
import RecentTransaction from '@/components/RecentTransaction'
import React from 'react'

export default function page() {
  return (
    <div className='flex flex-col gap-7'>
      <CardSection />
      <RecentTransaction />
    </div>
  )
}
