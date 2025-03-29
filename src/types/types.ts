export interface User{
  name: string
  username: string
  email: string
  password: string
  dob: string,
  location: Location
  credit_cards: CreditCard[]
  recent_transactions: Transaction[];
  weekly_activities: Activity[];
  expense_stats: ExpenseItem[];
  money_transfers: Transfer[];
  expenses: Expense[];
  all_transactions: UnitTransaction[] 
  account_overview: Overview;
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

export interface Transaction {
  description: string
  date: string
  amount: number
  type: string
  id: number;
}

export interface Activity{
  day: string
  deposit: number
  withdrawal: number
}

export interface Expenses{
  entertainment: string
  bill_expense: string
  others: string
  investment: string
}

export interface ExpenseItem {
  category: string;
  value: number;
}

export interface Transfer{
  month: string
  amount_transferred: number
}

export interface Expense{
  month: string
  amount: number
}

export interface UnitTransaction{
  description: string;
  date: string;
  time: string;
  amount: number;
  type: string
  category: string;
  status: string;
  credit_card_used: string

}

export interface Overview{
  balance: number
  income: number
  expenses: number
  total_savings: number
}