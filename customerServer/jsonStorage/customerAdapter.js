"use strict";

function adapt(object) {
  return {
    customerId: +object.customerId,
    firstname: object.firstname,
    lastname: object.lastname,
    address: object.address,
    favouriteIcecream: object.favouriteIcecream,
  };
}

module.exports = { adapt };