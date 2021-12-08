"use strict";

const {
  getAllFromStorage,
  getOneFromStorage,
  addToStorage,
  updateStorage,
  removeFromStorage,
} = require("./jsonStorage/storageLayer");

// getAllFromStorage().then(console.log).catch(console.log);

// getOneFromStorage(5000).then(console.log).catch(console.log);

const customer = {
  customerId: "9999",
  firstname: "Adele",
  lastname: "Jones",
  address: "5 Forest Walk",
  favouriteIcecream: "pistachio"
};

addToStorage(customer).then(console.log).catch(console.log);

// // const empToUpdate = {
// //   id: 5,
// //   firstname: "Simon",
// //   lastname: "Jones",
// //   department: "Designer",
// //   salary: 5000,
// // };

// // updateStorage(empToUpdate).then(console.log).catch(console.log);

// // removeFromStorage(5).then(console.log).catch(console.log);

// updateStorage(emp).then(console.log).catch(console.log);
