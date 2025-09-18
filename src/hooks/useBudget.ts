import { useState, useEffect, useMemo } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { BudgetConfig, Expense, WeeklyBalance, MonthlyData } from '../types';
import { 
  getCurrentWeek, 
  getCurrentMonth, 
  getCurrentYear,
  getWeekOfMonth,
  calculateWeeklyBalances,
  getExpensesForCurrentWeek,
  getExpensesForToday
} from '../utils/dateUtils';

const initialBudgetConfig: BudgetConfig = {
  monthlyTotal: 0,
  installments: [],
};

export function useBudget() {
  const [budgetConfig, setBudgetConfig] = useLocalStorage<BudgetConfig>('budgetConfig', initialBudgetConfig);
  const [expenses, setExpenses] = useLocalStorage<Expense[]>('expenses', []);
  const [currentView, setCurrentView] = useState<'dashboard' | 'budget' | 'register'>('dashboard');

  const currentMonth = getCurrentMonth();
  const currentYear = getCurrentYear();
  const currentWeek = getWeekOfMonth();

  const monthlyData = useMemo((): MonthlyData => {
    const totalInstallments = budgetConfig.installments.reduce((sum, inst) => sum + inst.amount, 0);
    const netBudget = budgetConfig.monthlyTotal - totalInstallments;
    const weeklyBase = netBudget / 4;

    const monthlyExpenses = expenses.filter(
      expense => expense.month === currentMonth && expense.year === currentYear
    );

    const weeks = calculateWeeklyBalances(weeklyBase, monthlyExpenses);

    return {
      month: currentMonth,
      year: currentYear,
      netBudget,
      weeklyBase,
      weeks,
    };
  }, [budgetConfig, expenses, currentMonth, currentYear]);

  const currentWeekBalance = monthlyData.weeks[currentWeek - 1] || {
    week: currentWeek,
    month: currentMonth,
    year: currentYear,
    baseAmount: monthlyData.weeklyBase,
    spent: 0,
    balance: monthlyData.weeklyBase,
    delta: 0,
  };

  const todayExpenses = getExpensesForToday(expenses);
  const dailySpent = todayExpenses.reduce((sum, exp) => sum + exp.amount, 0);
  const dailyBudget = currentWeekBalance.balance / (7 - new Date().getDay());
  const dailyBalance = dailyBudget - dailySpent;

  const addExpense = (amount: number, type: 'daily' | 'weekly') => {
    const newExpense: Expense = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      type,
      amount,
      week: currentWeek,
      month: currentMonth,
      year: currentYear,
    };

    setExpenses(prev => [...prev, newExpense]);
  };

  const updateBudgetConfig = (config: BudgetConfig) => {
    setBudgetConfig(config);
  };

  return {
    budgetConfig,
    expenses,
    monthlyData,
    currentWeekBalance,
    dailyBalance,
    dailySpent,
    currentView,
    setCurrentView,
    addExpense,
    updateBudgetConfig,
  };
}