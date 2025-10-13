import { Expense, WeeklyBalance } from '../types';

export function getCurrentWeek(): number {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const dayOfMonth = now.getDate();
  const dayOfWeek = startOfMonth.getDay();

  return Math.ceil((dayOfMonth + dayOfWeek) / 7);
}

export function getCurrentMonth(): number {
  return new Date().getMonth() + 1;
}

export function getCurrentYear(): number {
  return new Date().getFullYear();
}

export function getWeekOfMonth(date: Date = new Date()): number {
  const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const dayOfMonth = date.getDate();
  const dayOfWeek = startOfMonth.getDay();

  return Math.ceil((dayOfMonth + dayOfWeek) / 7);
}

export function calculateWeeklyBalances(weeklyBase: number, monthlyExpenses: Expense[]): WeeklyBalance[] {
  const weeks: WeeklyBalance[] = [];

  for (let week = 1; week <= 4; week++) {
    const weekExpenses = monthlyExpenses.filter(expense => expense.week === week);
    const spent = weekExpenses.reduce((sum, expense) => sum + expense.amount, 0);

    let baseAmount = weeklyBase;

    // Transfer delta from previous week
    if (week > 1) {
      const previousWeek = weeks[week - 2];
      baseAmount += previousWeek.delta;
    }

    const balance = baseAmount - spent;
    const delta = balance;

    weeks.push({
      week,
      month: getCurrentMonth(),
      year: getCurrentYear(),
      baseAmount,
      spent,
      balance,
      delta,
    });
  }

  return weeks;
}

export function getExpensesForCurrentWeek(expenses: Expense[]): Expense[] {
  const currentWeek = getCurrentWeek();
  const currentMonth = getCurrentMonth();
  const currentYear = getCurrentYear();

  return expenses.filter(
    expense =>
      expense.week === currentWeek &&
      expense.month === currentMonth &&
      expense.year === currentYear
  );
}

export function getExpensesForToday(expenses: Expense[]): Expense[] {
  const today = new Date().toDateString();

  return expenses.filter(expense => {
    const expenseDate = new Date(expense.date).toDateString();
    return expenseDate === today;
  });
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('pt-BR');
}

export function getWeekKey(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const week = getWeekOfMonth(now);
  return `${year}-${month}-${week}`;
}
