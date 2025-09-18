import React from 'react';
import { Home, Settings, Plus } from 'lucide-react';

interface NavigationProps {
  currentView: 'dashboard' | 'budget' | 'register';
  setCurrentView: (view: 'dashboard' | 'budget' | 'register') => void;
}

export function Navigation({ currentView, setCurrentView }: NavigationProps) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'register', label: 'Registrar', icon: Plus },
    { id: 'budget', label: 'Orçamento', icon: Settings },
  ] as const;

  return (
    <nav className="bg-white shadow-lg border-b">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-800">Orçamento Lazer</h1>
          </div>
          
          <div className="flex space-x-1">
            {navItems.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setCurrentView(id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  currentView === id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}