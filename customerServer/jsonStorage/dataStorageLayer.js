"use strict";

const { CODES, MESSAGES } = require("./statuscodes");

const {
  getAllFromStorage,
  getOneFromStorage,
  addToStorage,
  updateStorage,
  removeFromStorage,
} = require("./storageLayer");

module.exports = class Datastorage {
  get CODES() {
    return CODES;
  }

  getAll() {
    return getAllFromStorage();
  }

  getOne(customerId) {
    return new Promise(async (resolve, reject) => {
      if (!customerId) {
        reject(MESSAGES.NOT_FOUND("ID Not Found"));
      } else {
        const result = await getOneFromStorage(customerId);
        if (result) {
          resolve(result);
        } else {
          reject(MESSAGES.NOT_FOUND(customerId));
        }
      }
    });
  }

  insert(customer) {
    return new Promise(async (resolve, reject) => {
      if (customer) {
        if (!customer.customerId) {
          reject(MESSAGES.NOT_INSERTED());
        } else if (await getOneFromStorage(customer.customerId)) {
          reject(MESSAGES.ALREADY_IN_USE(customer.customerId));
        } else if (await addToStorage(customer)) {
          resolve(MESSAGES.INSERT_OK(customer.customerId));
        } else {
          reject(MESSAGES.NOT_INSERTED());
        }
      } else {
        reject(MESSAGES.NOT_INSERTED());
      }
    });
  }

  update(customer) {
    return new Promise(async (resolve, reject) => {
      if (customer) {
        if (await updateStorage(customer)) {
          resolve(MESSAGES.UPDATE_OK(customer.customerId));
        } else {
          reject(MESSAGES.NOT_UPDATED());
        }
      } else {
        reject(MESSAGES.NOT_UPDATED());
      }
    });
  }

  remove(customerId) {
    return new Promise(async (resolve, reject) => {
      if (!customerId) {
        reject(MESSAGES.NOT_FOUND("ID Not Found"));
      } else if (await removeFromStorage(customerId)) {
        resolve(MESSAGES.REMOVE_OK(customerId));
      } else {
        reject(MESSAGES.NOT_REMOVED(customerId));
      }
    });
  }
};
