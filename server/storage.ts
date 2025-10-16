// Storage interface for future expansion
// Currently, chat messages are ephemeral and stored client-side
// This can be extended to persist conversations if needed

export interface IStorage {
  // Future: Add methods for persisting chat history, transactions, etc.
}

export class MemStorage implements IStorage {
  constructor() {}
}

export const storage = new MemStorage();

# Auto commit simulation 29 - 11/09/2025 22:41:32
