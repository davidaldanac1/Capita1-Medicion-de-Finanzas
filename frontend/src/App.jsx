import React, { useState } from 'react';
import { AppLayout } from './components/layout/AppLayout';
import { DecorativeDivider } from './components/layout/DecorativeDivider';
import { AccountSidebar } from './components/layout/AccountSidebar';
import { AccountEmptyState } from './components/accounts/AccountEmptyState';
import { AccountGrid } from './components/accounts/AccountGrid';
import { AccountTypeModal } from './components/accounts/AccountTypeModal';
import { AddBankModal } from './components/accounts/AddBankModal';
import { KpiGroup } from './components/dashboard/KpiGroup';
import { BudgetComparison } from './components/dashboard/BudgetComparison';
import { TransactionsTable } from './components/dashboard/TransactionsTable';
import { LoginForm } from './components/ui/LoginForm';
import { SigninForm } from './components/ui/SigninForm';

// Initial default accounts following Section 3 & 4
const INITIAL_ACCOUNTS = [
  {
    id: 'acc_bbva',
    bank: 'bbva',
    name: 'BBVA Nómina & Ahorro',
    type: 'DEBIT',
    last4: '4892',
    holderName: 'DAVID GONZÁLEZ',
    balance: 38450.0,
    creditLimit: 0,
    dualSupport: false,
  },
  {
    id: 'acc_nu',
    bank: 'nu',
    name: 'Nu',
    type: 'DUAL',
    last4: '9012',
    holderName: 'DAVID GONZÁLEZ',
    balance: 14200.0,
    creditLimit: 65000.0,
    dualSupport: true,
  },
  {
    id: 'acc_plata',
    bank: 'plata',
    name: 'Plata Card Cashback',
    type: 'CREDIT',
    last4: '1044',
    holderName: 'DAVID GONZÁLEZ',
    balance: 0,
    creditLimit: 40000.0,
    dualSupport: false,
  },
];

export default function App() {
  // Navigation State Machine per Section 4.A:
  // 'AUTH' (LOGIN <-> SIGN_IN)
  // 'ACCOUNT_EMPTY_STATE'
  // 'ACCOUNT_LIST'
  // 'DASHBOARD'
  const [user, setUser] = useState({
    id: 'usr_01',
    email: 'david@capita1.com',
    name: 'David Aldana',
    username: 'davidaldanac1',
  });
  const [navState, setNavState] = useState('ACCOUNT_EMPTY_STATE'); // Pantalla inicial de bienvenida per indicación del usuario

  // Accounts state
  const [accounts, setAccounts] = useState(INITIAL_ACCOUNTS);
  const [selectedAccount, setSelectedAccount] = useState(INITIAL_ACCOUNTS[0]);
  const [currentAccountType, setCurrentAccountType] = useState('DEBIT'); // 'DEBIT' | 'CREDIT'

  // Modals state
  const [isDualModalOpen, setIsDualModalOpen] = useState(false);
  const [isAddBankModalOpen, setIsAddBankModalOpen] = useState(false);
  const [pendingDualAccount, setPendingDualAccount] = useState(null);

  // Active Sidebar module tab
  const [activeSidebarTab, setActiveSidebarTab] = useState('budget');

  // Login handler
  const handleLogin = (userData) => {
    setUser(userData);
    if (accounts.length === 0) {
      setNavState('ACCOUNT_EMPTY_STATE');
    } else {
      setNavState('ACCOUNT_LIST');
    }
  };

  // Register handler (Sign in)
  const handleRegister = (data) => {
    setUser({
      id: 'usr_' + Date.now(),
      email: data.email,
      name: data.username,
      username: data.username,
      token: 'capita1_jwt_session_utc',
    });
    if (accounts.length === 0) {
      setNavState('ACCOUNT_EMPTY_STATE');
    } else {
      setNavState('ACCOUNT_LIST');
    }
  };

  // Logout handler
  const handleLogout = () => {
    setUser(null);
    setNavState('LOGIN');
  };

  // Account card click
  const handleSelectAccount = (account) => {
    if (account.dualSupport || account.type === 'DUAL') {
      setPendingDualAccount(account);
      setNavState('ACCOUNT_TYPE_SELECT');
    } else {
      setSelectedAccount(account);
      setCurrentAccountType(account.type);
      setActiveSidebarTab(account.type === 'DEBIT' ? 'budget' : 'statement');
      setNavState('DASHBOARD');
    }
  };

  // Dual modal selection (Crédito vs Débito)
  const handleConfirmDualType = (type) => {
    if (pendingDualAccount) {
      setSelectedAccount(pendingDualAccount);
      setCurrentAccountType(type);
      setActiveSidebarTab(type === 'DEBIT' ? 'budget' : 'statement');
      setIsDualModalOpen(false);
      setPendingDualAccount(null);
      setNavState('DASHBOARD');
    }
  };

  // Toggle account type inside dashboard
  const handleToggleAccountType = () => {
    const nextType = currentAccountType === 'DEBIT' ? 'CREDIT' : 'DEBIT';
    setCurrentAccountType(nextType);
    setActiveSidebarTab(nextType === 'DEBIT' ? 'budget' : 'statement');
  };

  // Add new account
  const handleAddAccount = (newAcc) => {
    setAccounts((prev) => [newAcc, ...prev]);
    setSelectedAccount(newAcc);
    if (newAcc.type === 'DUAL') {
      setCurrentAccountType('DEBIT');
    } else {
      setCurrentAccountType(newAcc.type);
    }
    setNavState('ACCOUNT_LIST');
  };

  // Toggle empty state for testing
  const handleToggleEmptyState = () => {
    if (accounts.length > 0) {
      setAccounts([]);
      setNavState('ACCOUNT_EMPTY_STATE');
    } else {
      setAccounts(INITIAL_ACCOUNTS);
      setNavState('ACCOUNT_LIST');
    }
  };

  // 1. AUTH SCREENS (LOGIN <-> SIGN_IN per rules.md Sección 4.A)
  if (!user || navState === 'LOGIN' || navState === 'SIGN_IN' || navState === 'AUTH') {
    if (navState === 'SIGN_IN') {
      return (
        <SigninForm
          onRegister={handleRegister}
          onNavigateToLogin={() => setNavState('LOGIN')}
        />
      );
    }
    return (
      <LoginForm
        onLogin={handleLogin}
        onNavigateToSignin={() => setNavState('SIGN_IN')}
      />
    );
  }

  // 2. ACCOUNT_EMPTY_STATE (Pantalla de bienvenida inicial per captura de diseño)
  if (navState === 'ACCOUNT_EMPTY_STATE') {
    return (
      <AccountEmptyState
        username={user?.username || user?.name || 'davidaldanac1'}
        onAddBank={() => setNavState('ADD_BANK')}
        onBack={handleLogout}
        onMenuClick={() => alert('Menú de opciones')}
      />
    );
  }

  // 3. REGISTRAR BANCO (Formulario per nueva captura de diseño con tarjetas 2x2)
  if (navState === 'ADD_BANK') {
    return (
      <AddBankModal
        isOpen={true}
        onClose={() => setNavState(accounts.length === 0 ? 'ACCOUNT_EMPTY_STATE' : 'ACCOUNT_LIST')}
        onAddAccount={handleAddAccount}
        user={user}
        onMenuClick={() => alert('Menú de opciones')}
      />
    );
  }

  // 4. ACCOUNT_LIST (Rejilla de bancos registrados per Captura 1)
  if (navState === 'ACCOUNT_LIST') {
    return (
      <AccountGrid
        accounts={accounts}
        username={user?.username || user?.name || 'davidaldanac1'}
        selectedAccountId={selectedAccount?.id}
        onSelectAccount={handleSelectAccount}
        onAddBank={() => setNavState('ADD_BANK')}
        onBack={() => setNavState('ACCOUNT_EMPTY_STATE')}
        onMenuClick={() => alert('Menú de opciones')}
      />
    );
  }

  // 5. ACCOUNT_TYPE_SELECT (Bifurcación Crédito vs Débito con imagen de tarjeta per Captura 2)
  if (navState === 'ACCOUNT_TYPE_SELECT' && pendingDualAccount) {
    return (
      <AccountTypeModal
        isOpen={true}
        account={pendingDualAccount}
        username={user?.username || user?.name || 'davidaldanac1'}
        onSelectType={handleConfirmDualType}
        onClose={() => setNavState('ACCOUNT_LIST')}
        onMenuClick={() => alert('Menú de opciones')}
      />
    );
  }

  // Calculate Net Worth for header
  const totalDebit = accounts
    .filter((a) => a.type === 'DEBIT' || a.dualSupport)
    .reduce((sum, a) => sum + (a.balance || 0), 0);
  const totalDebt = accounts
    .filter((a) => a.type === 'CREDIT' || a.dualSupport)
    .reduce((sum, a) => sum + 12500, 0); // Simulated current debt
  const calculatedNetWorth = totalDebit - totalDebt + 120000; // Including fixed assets/savings

  return (
    <AppLayout
      user={user}
      netWorth={calculatedNetWorth}
      onLogout={handleLogout}
    >
      {/* Dev / Prototype State Switcher Bar */}
      <div className="mb-6 p-2 rounded-2xl bg-zinc-950 border border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2 text-zinc-400 pl-2">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          <span className="font-semibold text-white">Capita1 Prototipo UI</span>
          <span>• Estado actual: <strong className="text-blue-400 font-mono">{navState}</strong></span>
          {navState === 'DASHBOARD' && (
            <span> | Modo: <strong className={currentAccountType === 'DEBIT' ? 'text-emerald-400 font-mono' : 'text-blue-400 font-mono'}>{currentAccountType}</strong></span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setNavState('ADD_BANK')}
            className={`px-3 py-1 rounded-xl font-bold transition-colors cursor-pointer ${
              navState === 'ADD_BANK' ? 'bg-blue-600 text-white' : 'text-zinc-400 hover:text-white'
            }`}
          >
            + Registrar Gasto
          </button>
          <button
            type="button"
            onClick={() => setNavState('ACCOUNT_LIST')}
            className={`px-3 py-1 rounded-xl font-bold transition-colors cursor-pointer ${
              navState === 'ACCOUNT_LIST' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Lista de Bancos
          </button>
        </div>
      </div>

      {/* 6. DASHBOARD */}
      {navState === 'DASHBOARD' && (
        <div className="flex flex-col lg:flex-row items-start gap-6 w-full">
          {/* Sidebar */}
          <AccountSidebar
            currentAccount={selectedAccount}
            accountType={currentAccountType}
            activeTab={activeSidebarTab}
            onSelectTab={setActiveSidebarTab}
            onBackToAccounts={() => setNavState('ACCOUNT_LIST')}
            onToggleAccountType={handleToggleAccountType}
          />

          {/* Decorative vertical lines (red on the left, blue on the right) */}
          <DecorativeDivider />

          {/* Dashboard Main Content Area */}
          <div className="flex-1 w-full space-y-8">
            {/* 3 Top KPIs */}
            <KpiGroup
              accountType={currentAccountType}
              data={
                currentAccountType === 'DEBIT'
                  ? {
                      availableBalance: selectedAccount?.balance || 38450,
                      fixedIncome: 35000,
                      variableIncome: 6500,
                      fixedExpenses: 18200,
                      antExpenses: 3450,
                    }
                  : {
                      accumulatedDebt: 24050,
                      creditLimit: selectedAccount?.creditLimit || 65000,
                      daysUntilCut: 4,
                      daysUntilPayment: 24,
                    }
              }
            />

            {/* Panel Panorámico 1: Budget Comparison or Revolving vs MSI */}
            <BudgetComparison
              accountType={currentAccountType}
              data={
                currentAccountType === 'DEBIT'
                  ? {}
                  : {
                      revolvingDebt: 14250,
                      msiDebt: 9800,
                    }
              }
            />

            {/* Panel Panorámico 2: Transactions Table / Amortization */}
            <TransactionsTable
              accountType={currentAccountType}
            />
          </div>
        </div>
      )}

      {/* Modal de Bifurcación: Crédito vs Débito */}
      <AccountTypeModal
        isOpen={isDualModalOpen}
        onClose={() => {
          setIsDualModalOpen(false);
          setPendingDualAccount(null);
        }}
        account={pendingDualAccount}
        onSelectType={handleConfirmDualType}
      />

      {/* Modal para agregar banco */}
      <AddBankModal
        isOpen={isAddBankModalOpen}
        onClose={() => setIsAddBankModalOpen(false)}
        onAddAccount={handleAddAccount}
      />
    </AppLayout>
  );
}
