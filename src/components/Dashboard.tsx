import React from 'react';
import { TrendingUp, TrendingDown, Calendar, History, DollarSign } from 'lucide-react';
import { useBudget } from '../hooks/useBudget';
import { formatDate } from '../utils/dateUtils';
import { formatCurrency } from '../utils/currencyUtils';

export function Dashboard() {
  const { monthlyData, currentWeekBalance, dailyBalance, dailySpent, expenses } = useBudget();

  const recentExpenses = expenses
    .slice(-5)
    .reverse();

  const remainingDaysInWeek = 7 - new Date().getDay();
  const dailyBudgetRemaining = remainingDaysInWeek > 0 ? currentWeekBalance.balance / remainingDaysInWeek : 0;

  return (
    <div className="space-y-6">
      {/* Main Balances */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Saldo do Dia</p>
              <p className={`text-2xl font-bold ${dailyBalance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatCurrency(dailyBalance)}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Gasto hoje: {formatCurrency(dailySpent)}
              </p>
            </div>
            <div className={`p-3 rounded-full ${dailyBalance >= 0 ? 'bg-green-100' : 'bg-red-100'}`}>
              {dailyBalance >= 0 ? (
                <TrendingUp className="h-6 w-6 text-green-600" />
              ) : (
                <TrendingDown className="h-6 w-6 text-red-600" />
              )}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Saldo da Semana</p>
              <p className={`text-2xl font-bold ${currentWeekBalance.balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatCurrency(currentWeekBalance.balance)}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Semana {currentWeekBalance.week}
              </p>
            </div>
            <div className={`p-3 rounded-full ${currentWeekBalance.balance >= 0 ? 'bg-green-100' : 'bg-red-100'}`}>
              <Calendar className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Summary */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <DollarSign className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-800">Resumo Mensal</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-sm text-gray-600">Orçamento Líquido</p>
            <p className="text-lg font-bold text-gray-800">{formatCurrency(monthlyData.netBudget)}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">Base Semanal</p>
            <p className="text-lg font-bold text-gray-800">{formatCurrency(monthlyData.weeklyBase)}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">Sugestão Diária</p>
            <p className="text-lg font-bold text-blue-600">{formatCurrency(dailyBudgetRemaining)}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">Total Gasto</p>
            <p className="text-lg font-bold text-gray-800">
              {formatCurrency(monthlyData.weeks.reduce((sum, week) => sum + week.spent, 0))}
            </p>
          </div>
        </div>
      </div>

      {/* Recent Expenses */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <History className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-800">Gastos Recentes</h3>
        </div>
        {recentExpenses.length === 0 ? (
          <p className="text-gray-500 text-center py-8">Nenhum gasto registrado ainda</p>
        ) : (
          <div className="space-y-3">
            {recentExpenses.map((expense) => (
              <div key={expense.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {expense.type === 'daily' ? 'Gasto Diário' : 'Gasto Semanal'}
                  </p>
                  <p className="text-xs text-gray-600">{formatDate(expense.date)}</p>
                </div>
                <p className="text-lg font-bold text-red-600">
                  -{formatCurrency(expense.amount)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Weekly Breakdown */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Resumo das Semanas</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {monthlyData.weeks.map((week, index) => (
            <div 
              key={week.week} 
              className={`p-4 rounded-lg border-2 ${
                week.week === currentWeekBalance.week 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 bg-gray-50'
              }`}
            >
              <p className="text-sm font-medium text-gray-600">Semana {week.week}</p>
              <p className={`text-lg font-bold ${week.balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatCurrency(week.balance)}
              </p>
              <p className="text-xs text-gray-500">
                Gasto: {formatCurrency(week.spent)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}