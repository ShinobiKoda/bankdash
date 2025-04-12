import React from 'react'
import Services from '@/components/services/Services'
import BankServices from '@/components/services/BankServices'

export default function page() {
  return (
    <div className='w-full'>
      <Services />
      <BankServices />
    </div>
  )
}
