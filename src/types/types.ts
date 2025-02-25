export interface User{
  name: string
  username: string
  email: string
  password: string
  dob: string,
  location: Location
  cards: Card[]
}

export interface Location{
  present_address: string
  permanent_address: string
  city: string
  postal_code: string
  country: string
}

export interface Card{
  number: string
  name: string
  valid_thru: string
  balance: number;
  bank: string
}