import AccountCard from '@/components/accounts/AccountCard'
import AccountOverview from '@/components/accounts/AccountOverview'
import DebitCreditOverview from '@/components/accounts/DebitCreditOverview'
import InvoiceSent from '@/components/accounts/InvoiceSent'
import LastTransaction from '@/components/accounts/LastTransaction'
import React from 'react'

export default function page() {
  return (
    <div className='flex flex-col gap-7 w-full mb-4'>
      <AccountOverview />
      <div className='w-full flex flex-col gap-4 lg:grid lg:grid-cols-[2fr_1fr] lg:gap-[4rem] items-center'>
        <LastTransaction />
        <AccountCard />
      </div>
      <div className='flex flex-col gap-4 lg:grid lg:grid-cols-[2fr_1fr] lg:gap-[4rem]'>
        <DebitCreditOverview />
        <InvoiceSent />
      </div>
    </div>
  )
}
