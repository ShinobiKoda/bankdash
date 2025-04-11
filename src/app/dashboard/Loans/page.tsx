import AllLoans from '@/components/loans/AllLoans'
import ActiveLoans from '@/components/loans/ActiveLoans'
import React from 'react'

export default function page() {
  return (
    <div className='w-full flex flex-col gap-12'>
      <AllLoans />
      <ActiveLoans />
    </div>
  )
}
