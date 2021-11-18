import LocalStorageService from './LocalStorageService.js';

export default class HistoryService {
  constructor() {
    this.client = new LocalStorageService();
  }

  save(record) {
    return this.client.patch('history', record);
  }

  getAll() {
    return this.client.get('history', []);
  }
}