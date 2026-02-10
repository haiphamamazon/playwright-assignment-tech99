export const users = {
  validUser: {
    username: 'tech99test',
    password: '123456'
  },
  inValidUser: {
    username: 'tech99',
    password: '123456'
  },
  nonExistingUser: {
    username: '!@#$%^&*()',
    password: '123456'
  },
};

export const productsByCategory = {
  Phones: {
    productName: 'Nexus 6',
    price: '650'
  },
  Laptops: {
    productName: 'Sony vaio i5',
    price: '790'
  },
  Monitors: {
    productName: 'Apple monitor 24',
    price: '400'
  },
} as const;

export type CategoryType = keyof typeof productsByCategory;

export const customers = {
  information: {
    name: 'tech99test',
    country: '123456',
    city: 'Vietnam',
    creditCard: '00123456789',
    month: 2,
    year: 2026,
    successfulPurchase: 'Thank you for your purchase!'
  }
};

