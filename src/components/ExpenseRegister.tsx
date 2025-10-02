import React, { useState } from 'react';
import { PlusCircle, AlertCircle } from 'lucide-react';
import { useBudget } from '../hooks/useBudget';
import { formatCurrency } from '../utils/currencyUtils';
import { CurrencyInput } from './CurrencyInput';

export function ExpenseRegister() {
  const { addExpense, currentWeekBalance } = useBudget();
  const [expenseType, setExpenseType] = useState<'daily' | 'weekly'>('daily');
  const [amount, setAmount] = useState(0);
  const [showAlert, setShowAlert] = useState(false);

  const placeholder = expenseType === 'daily' ? 'Digite o gasto do dia' : 'Digite o gasto da semana';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const expenseAmount = amount;

    if (expenseAmount <= 0) {
      alert('Por favor, insira um valor válido');
      return;
    }

    if (expenseAmount > currentWeekBalance.balance) {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 5000);
    }

    addExpense(expenseAmount, expenseType);
    setAmount(0);
    alert('Gasto registrado com sucesso!');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Registrar Gasto</h2>

        {showAlert && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
              <p className="text-red-800 font-medium">
                Atenção! Este gasto excede o saldo disponível da semana.
              </p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Tipo de Registro
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setExpenseType('daily')}
                className={`p-4 border-2 rounded-lg transition-all ${
                  expenseType === 'daily'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                }`}
              >
                <div className="text-center">
                  <p className="font-medium">Gasto do Dia</p>
                  <p className="text-sm text-gray-600">Registro diário</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setExpenseType('weekly')}
                className={`p-4 border-2 rounded-lg transition-all ${
                  expenseType === 'weekly'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                }`}
              >
                <div className="text-center">
                  <p className="font-medium">Gasto da Semana</p>
                  <p className="text-sm text-gray-600">Registro semanal</p>
                </div>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Valor do Gasto
            </label>
            <CurrencyInput
              value={amount}
              onChange={setAmount}
              className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder={placeholder}
            />
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-800 mb-2">Saldo Atual</h4>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Saldo da Semana:</span>
                <span className={`font-medium ${currentWeekBalance.balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatCurrency(currentWeekBalance.balance)}
                </span>
              </div>
              {amount > 0 && (
                <div className="flex justify-between font-medium text-blue-600 border-t pt-2">
                  <span>Saldo após registro:</span>
                  <span className={currentWeekBalance.balance - amount >= 0 ? 'text-green-600' : 'text-red-600'}>
                    {formatCurrency(currentWeekBalance.balance - amount)}
                  </span>
                </div>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            <PlusCircle className="h-5 w-5" />
            Registrar Gasto
          </button>
        </form>
      </div>
    </div>
  );
}
