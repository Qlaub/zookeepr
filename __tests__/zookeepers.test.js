const {filterByQuery,
  findById,
  createNewZookeeper,
  validateZookeeper} = require('../lib/zookeepers');
const {zookeepers} = require('../data/zookeepers.json');
const fs = require('fs');

jest.mock('fs');

test('creates a zookeeper object', () => {
  const zookeeper = createNewZookeeper({
    name: 'Oswald',
    id: 'braaaaap'
  },
  zookeepers);

  expect(zookeeper.name).toBe('Oswald');
  expect(zookeeper.id).toBe('braaaaap');
})

test('filters by query', () => {
  const startingZookeepers = [
    {
      id: "3",
      name: "Alex",
      favoriteAnimal: "penguin",
      age: "24",
    },
    {
      id: "4",
      name: "Noel",
      favoriteAnimal: "bear",
      age: "42",
    },
  ];

  const updatedZookeepers = filterByQuery({favoriteAnimal: 'penguin'}, startingZookeepers);

  expect(updatedZookeepers.length).toEqual(1);
})

test('finds by id', () => {
  const startingZookeepers = [
    {
      id: "3",
      name: "Alex",
      favoriteAnimal: "penguin",
      age: "24",
    },
    {
      id: "4",
      name: "Noel",
      favoriteAnimal: "bear",
      age: "42",
    },
  ];

  const result = findById('3', startingZookeepers);

  expect(result.name).toBe('Alex');
})

test('validates personality traits', () => {
  const zookeeper = {
    id: "3",
    name: "Alex",
    favoriteAnimal: "penguin",
    age: 24,
  };

  const invalidZookeeper = {
    id: "4",
    name: "Noel",
    favoriteAnimal: "bear",
  }

  const result = validateZookeeper(zookeeper);
  const result2 = validateZookeeper(invalidZookeeper);

  expect(result).toBe(true);
  expect(result2).toBe(false);
})