import React from 'react';
import { Navigation } from './components/Navigation';
import { Dashboard } from './components/Dashboard';
import { BudgetConfig } from './components/BudgetConfig';
import { ExpenseRegister } from './components/ExpenseRegister';
import { useBudget } from './hooks/useBudget';
import { InstallButton } from './components/InstallButton'

function App() {
  const { currentView, setCurrentView } = useBudget();

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'budget':
        return <BudgetConfig />;
      case 'register':
        return <ExpenseRegister />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation currentView={currentView} setCurrentView={setCurrentView} />

      <main className="max-w-4xl mx-auto px-4 py-8">
        <InstallButton />
        {renderCurrentView()}
      </main>
    </div>
  );
}

export default App;
