export interface User{
  name: string
  username: string
  email: string
  password: string
  dob: string,
  location: Location
  credit_cards: CreditCard[]
}

export interface Location{
  present_address: string
  permanent_address: string
  city: string
  postal_code: string
  country: string
}

export interface CreditCard{
  number: string
  name: string
  valid_thru: string
  balance: number;
  bank: string
}