export interface BudgetConfig {
  monthlyTotal: number;
  installments: Installment[];
}

export interface Installment {
  id: string;
  description: string;
  amount: number;
  remainingMonths: number;
  isRecurring: boolean;
}

export interface Expense {
  id: string;
  date: string;
  type: 'daily' | 'weekly';
  amount: number;
  week: number;
  month: number;
  year: number;
}

export interface WeeklyBalance {
  week: number;
  month: number;
  year: number;
  baseAmount: number;
  spent: number;
  balance: number;
  delta: number;
}

export interface MonthlyData {
  month: number;
  year: number;
  netBudget: number;
  weeklyBase: number;
  weeks: WeeklyBalance[];
}