import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 11, name: 'Ramen' },
      { id: 12, name: 'Spagetti' },
      { id: 13, name: 'Pizza' },
      { id: 14, name: 'Chicken' },
      { id: 15, name: 'Burgers' },
      { id: 16, name: 'Sushi' },
      { id: 17, name: 'KBBQ' },
      { id: 18, name: 'Indian' },
      { id: 19, name: 'Thai' },
      { id: 20, name: 'Mexican' }
    ];
    return {heroes};
  }
}