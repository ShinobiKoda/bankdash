import AccountOverview from '@/components/accounts/AccountOverview'
import LastTransaction from '@/components/accounts/LastTransaction'
import React from 'react'

export default function page() {
  return (
    <div className='flex flex-col gap-7 w-full mb-4'>
      <AccountOverview />
      <div>
        <LastTransaction />
      </div>
    </div>
  )
}
