

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
  debit_credit_overview: TransactionOverview;
  invoices_sent: Invoice[]
  investments_overview: Investment;
  yearly_total_investments: TotalInvestment[];
  monthly_revenue: MonthlyRevenue[];
  user_investments: UserInvestment[];
  trending_stock: TrendingStock[];
  card_expenses: CardExpense[]
  all_loans: Loan[];
  loan_overview: ActiveLoan[]
}

export interface Loan{
  description: string
  amount: number
}

export interface ActiveLoan{
  sl_no: number
  loan_money: number;
  left_to_repay: number;
  interest_rate: string;
  duration: string
  installment: number;
}

export interface CardExpense{
  card_number: string
  total_expense: number
  total_income: number
  total_balance: number
  bank: string
  fill: string
}

export interface Investment{
  total_investment: number
  number_of_investments: number
  rate_of_return: number
}

export interface TotalInvestment{
  year: string
  total_investment: number
}

export interface MonthlyRevenue{
  month: string
  revenue: number
}

export interface UserInvestment{
  name: string
  type: string
  percentage: number
  type_of_percentage: string
  value: number;
}

export interface TrendingStock{
  sl_no: string
  name: string
  price: number
  return_value: number
  return_type: string

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
  type: string
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

export interface TransactionOverview{
  weekly_debit: number
  weekly_credit: number
  daily_transactions: DailyTransaction[]
}

export interface DailyTransaction{
  day: string
  debit: number
  credit: number
}

export interface Invoice{
  description: string
  time: string
  amount: number
}