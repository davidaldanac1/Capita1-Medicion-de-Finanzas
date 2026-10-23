import { apiFetch } from './api';

const INITIAL_MOCK_ACCOUNTS = [
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
    name: 'Nu Moradita Dual',
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
  {
    id: 'acc_klar',
    bank: 'klar',
    name: 'Klar Rendimiento',
    type: 'DUAL',
    last4: '6731',
    holderName: 'DAVID GONZÁLEZ',
    balance: 25000.0,
    creditLimit: 30000.0,
    dualSupport: true,
  },
];

export const accountService = {
  async getAccounts() {
    try {
      return await apiFetch('/api/v1/accounts');
    } catch {
      return INITIAL_MOCK_ACCOUNTS;
    }
  },

  async createAccount(accountData) {
    try {
      return await apiFetch('/api/v1/accounts', {
        method: 'POST',
        body: JSON.stringify(accountData),
      });
    } catch {
      return {
        id: `acc_${Date.now()}`,
        ...accountData,
      };
    }
  },
};

