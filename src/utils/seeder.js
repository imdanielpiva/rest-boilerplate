const Booking = require('../api/bookings/model');
const log = require('debug')('@SEEDER');

log('Seeding the Database');

const users = [
  {username: 'Jimmylo', password: 'test'},
  {username: 'Xoko', password: 'test'},
  {username: 'katamon', password: 'test'}
];

const bookings = [
  {
    customer: {
      firstName: 'daniel',
      secondName: 'piva',
      email: 'imdanielpiva@gmail.com',
      phone: { number: '043999916252', codeCountry: '+55' }
    },
    date: new Date(),
    service: {
      code: 0,
      description: 'I need this service in the next week.',
      type: 'Cleaning'
    },
    address: {
      state: 'Paraná',
      latLng: [0.0, 0.0],
      city: 'Londrina',
      number: '1150 bloco 07 apt 102',
      country: 'Brazil',
      street: 'Gregória de Souza Vacário'
    }
  },

  {
    customer: {
      firstName: 'daniel',
      secondName: 'felicio',
      email: 'danielpiva@gmail.com',
      phone: { number: '043999916252', codeCountry: '+55' }
    },
    date: new Date(),
    service: {
      code: 0,
      description: 'I need this service in the next week.',
      type: 'Painting'
    },
    address: {
      state: 'Paraná',
      latLng: [0.0, 0.0],
      city: 'Londrina',
      number: '1150 bloco 07 apt 102',
      country: 'Brazil',
      street: 'Gregória de Souza Vacário'
    }
  }
];

function createDoc(Model, doc) {
  return new Promise((resolve, reject) => {
    new Model(doc).create((error, success) => {
      if (error) {
        reject(error);

        return;
      }

      resolve(success);
    });
  });
}

function cleanDB() {
  log('Cleaning database');

  const cleanPromises = [Booking]
    .map((model) => model.remove());

  return Promise.all(cleanPromises);
}

function createBookings(data) {
  const promises = data.map(booking => createDoc(Booking, booking));

  return Promise.all(promises);
}

// function createUsers(data) {
//   const promises = users
//     .map(user => createDoc(User, user));

//   return Promise.all(promises)
//     .then(users => merge({ users }, data || {}));
// }

cleanDB()
  .then(createBookings)
  .then(log)
  .catch((e) => log('ERROR: ', e));