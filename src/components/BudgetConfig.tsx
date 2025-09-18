import React, { useState } from 'react';
import { Plus, Trash2, HelpCircle, X, Repeat, Calendar } from 'lucide-react';
import { useBudget } from '../hooks/useBudget';
import { CurrencyInput } from './CurrencyInput';
import { Installment } from '../types';
import { formatCurrency } from '../utils/currencyUtils';

export function BudgetConfig() {
  const { budgetConfig, updateBudgetConfig } = useBudget();
  const [monthlyTotal, setMonthlyTotal] = useState(budgetConfig.monthlyTotal);
  const [installments, setInstallments] = useState(budgetConfig.installments);
  const [showHelp, setShowHelp] = useState(false);

  // Update local state when budgetConfig changes
  React.useEffect(() => {
    setMonthlyTotal(budgetConfig.monthlyTotal);
    setInstallments(budgetConfig.installments);
  }, [budgetConfig]);

  const handleAddInstallment = () => {
    const newInstallment: Installment = {
      id: Date.now().toString(),
      description: '',
      amount: 0,
      remainingMonths: 1,
      isRecurring: false,
    };
    setInstallments([newInstallment, ...installments]);
  };

  const handleRemoveInstallment = (id: string) => {
    setInstallments(installments.filter(inst => inst.id !== id));
  };

  const handleUpdateInstallment = (id: string, field: keyof Installment, value: string | number | boolean) => {
    setInstallments(installments.map(inst => 
      inst.id === id ? { ...inst, [field]: value } : inst
    ));
  };

  const handleSave = () => {
    updateBudgetConfig({
      monthlyTotal,
      installments,
    });
    alert('Orçamento salvo com sucesso!');
  };

  const totalInstallments = installments.reduce((sum, inst) => sum + inst.amount, 0);
  const netBudget = monthlyTotal - totalInstallments;
  const weeklyBudget = netBudget / 4;

  const recurringInstallments = installments.filter(inst => inst.isRecurring);
  const regularInstallments = installments.filter(inst => !inst.isRecurring);
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-xl font-bold text-gray-800">Configurar Orçamento</h2>
          <button
            onClick={() => setShowHelp(true)}
            className="p-1 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
          >
            <HelpCircle className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Orçamento Mensal Total para Lazer
            </label>
            <CurrencyInput
              value={monthlyTotal}
              onChange={setMonthlyTotal}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="R$ 0,00"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Despesas Fixas</h3>
              <button
                onClick={handleAddInstallment}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="h-4 w-4" />
                Adicionar
              </button>
            </div>

            {installments.length === 0 ? (
              <p className="text-gray-500 text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                Nenhuma despesa fixa cadastrada
              </p>
            ) : (
              <div className="space-y-4">
                {recurringInstallments.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Repeat className="h-4 w-4 text-green-600" />
                      <h4 className="text-md font-medium text-gray-700">Gastos Recorrentes</h4>
                    </div>
                    <div className="space-y-4">
                      {recurringInstallments.map((installment) => (
                        <div key={installment.id} className="p-4 border border-green-200 bg-green-50 rounded-lg">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <label className="block text-xs font-medium text-gray-600 mb-1">
                                Descrição
                              </label>
                              <input
                                type="text"
                                value={installment.description}
                                onChange={(e) => handleUpdateInstallment(installment.id, 'description', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Ex: Netflix, Spotify..."
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-gray-600 mb-1">
                                Valor Mensal
                              </label>
                              <CurrencyInput
                                value={installment.amount}
                                onChange={(value) => handleUpdateInstallment(installment.id, 'amount', value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="R$ 0,00"
                              />
                            </div>
                            <div className="flex items-end gap-2">
                              <div className="flex items-center gap-2 flex-1">
                                <input
                                  type="checkbox"
                                  checked={installment.isRecurring}
                                  onChange={(e) => handleUpdateInstallment(installment.id, 'isRecurring', e.target.checked)}
                                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <label className="text-xs text-gray-600">Recorrente</label>
                              </div>
                              <button
                                onClick={() => handleRemoveInstallment(installment.id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {regularInstallments.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Calendar className="h-4 w-4 text-blue-600" />
                      <h4 className="text-md font-medium text-gray-700">Parcelas Fixas</h4>
                    </div>
                    <div className="space-y-4">
                      {regularInstallments.map((installment) => (
                        <div key={installment.id} className="p-4 border border-blue-200 bg-blue-50 rounded-lg">
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div>
                              <label className="block text-xs font-medium text-gray-600 mb-1">
                                Descrição
                              </label>
                              <input
                                type="text"
                                value={installment.description}
                                onChange={(e) => handleUpdateInstallment(installment.id, 'description', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Ex: Celular, Cartão..."
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-gray-600 mb-1">
                                Valor da Parcela
                              </label>
                              <CurrencyInput
                                value={installment.amount}
                                onChange={(value) => handleUpdateInstallment(installment.id, 'amount', value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="R$ 0,00"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-gray-600 mb-1">
                                Meses Restantes
                              </label>
                              <input
                                type="number"
                                value={installment.remainingMonths}
                                onChange={(e) => handleUpdateInstallment(installment.id, 'remainingMonths', Number(e.target.value))}
                                min="1"
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              />
                            </div>
                            <div className="flex items-end gap-2">
                              <div className="flex items-center gap-2 flex-1">
                                <input
                                  type="checkbox"
                                  checked={installment.isRecurring}
                                  onChange={(e) => handleUpdateInstallment(installment.id, 'isRecurring', e.target.checked)}
                                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <label className="text-xs text-gray-600">Recorrente</label>
                              </div>
                              <button
                                onClick={() => handleRemoveInstallment(installment.id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-800 mb-2">Resumo do Orçamento</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Orçamento Total:</span>
                <span className="font-medium">{formatCurrency(monthlyTotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Total de Despesas Fixas:</span>
                <span className="font-medium text-red-600">-{formatCurrency(totalInstallments)}</span>
              </div>
              <div className="flex justify-between border-t pt-2 font-semibold">
                <span>Orçamento Líquido:</span>
                <span className={netBudget >= 0 ? 'text-green-600' : 'text-red-600'}>
                  {formatCurrency(netBudget)}
                </span>
              </div>
              <div className="flex justify-between text-blue-600">
                <span>Orçamento Semanal:</span>
                <span className="font-medium">{formatCurrency(weeklyBudget)}</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleSave}
            className="w-full py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
          >
            Salvar Configurações
          </button>
        </div>
      </div>

      {/* Help Modal */}
      {showHelp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Sobre o Orçamento Mensal</h3>
              <button
                onClick={() => setShowHelp(false)}
                className="p-1 text-gray-400 hover:text-gray-600 rounded"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="text-gray-600 space-y-3">
              <p>
                Este é o valor que você definiu como disponível apenas para lazer no mês.
              </p>
              <p>
                Ele já deve considerar que suas despesas fixas essenciais (aluguel, contas, alimentação, etc.)
                estão cobertas em outras partes do seu orçamento.
              </p>
              <p>
                O sistema usará esse valor para calcular o quanto você pode gastar por semana
                e ajustar automaticamente seus saldos.
              </p>
            </div>
            <button
              onClick={() => setShowHelp(false)}
              className="w-full mt-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Entendi
            </button>
          </div>
        </div>
      )}
    </div>
  );
}