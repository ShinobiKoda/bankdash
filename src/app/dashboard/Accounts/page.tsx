import AccountCard from '@/components/accounts/AccountCard'
import AccountOverview from '@/components/accounts/AccountOverview'
import LastTransaction from '@/components/accounts/LastTransaction'
import React from 'react'

export default function page() {
  return (
    <div className='flex flex-col gap-7 w-full mb-4'>
      <AccountOverview />
      <div className='w-full flex flex-col gap-4 lg:grid lg:grid-cols-[2fr_1fr] lg:gap-8 items-center'>
        <LastTransaction />
        <AccountCard />
      </div>
    </div>
  )
}
