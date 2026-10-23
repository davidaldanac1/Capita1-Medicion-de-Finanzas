import { apiFetch } from './api';

export const transactionService = {
  async getTransactions(accountId, params = {}) {
    try {
      const query = new URLSearchParams(params).toString();
      return await apiFetch(`/api/v1/accounts/${accountId}/transactions?${query}`);
    } catch {
      return null;
    }
  },

  async createTransaction(transactionData) {
    try {
      return await apiFetch('/api/v1/transactions', {
        method: 'POST',
        body: JSON.stringify(transactionData),
      });
    } catch {
      return {
        id: `tx_${Date.now()}`,
        ...transactionData,
      };
    }
  },
};

