import AllLoans from '@/components/loans/AllLoans'
import ActiveLoans from '@/components/loans/ActiveLoans'
import React from 'react'

export default function page() {
  return (
    <div>
      <AllLoans />
      <ActiveLoans />
    </div>
  )
}
