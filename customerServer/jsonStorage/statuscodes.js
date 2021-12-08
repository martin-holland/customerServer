"use strict";

const CODES = {
  PROGRAM_ERROR: 0,
  NOT_FOUND: 1,
  INSERT_OK: 2,
  NOT_INSERTED: 3,
  ALREADY_IN_USE: 4,
  REMOVE_OK: 5,
  NOT_REMOVED: 6,
  UPDATE_OK: 7,
  NOT_UPDATED: 8,
};

const MESSAGES = {
  PROGRAM_ERROR: () => ({
    message: "Sorry! Error in the program",
    code: CODE.PROGRAM_ERROR,
    type: "error",
  }),
  NOT_FOUND: (customerId) => ({
    message: `No Customer found with ${customerId}, please return to the menu and try again`,
    code: CODES.NOT_FOUND,
    type: "error",
  }),
  INSERT_OK: (customerId) => ({
    message: `Customer ${customerId} was inserted into the database`,
    code: CODES.INSERT_OK,
    type: "info",
  }),
  NOT_INSERTED: (customerId) => ({
    message: `Customer ${customerId} was NOT inserted, please check and try again`,
    code: CODES.NOT_INSERTED,
    type: "error",
  }),
  ALREADY_IN_USE: (customerId) => ({
    message: `customerId ${customerId} was already in use, please go back and try an alternative ID`,
    code: CODES.ALREADY_IN_USE,
    type: "error",
  }),
  REMOVE_OK: (customerId) => ({
    message: `Customer ${customerId} was removed from the database`,
    code: CODES.NOT_REMOVED,
    type: "info",
  }),
  NOT_REMOVED: (customerId) => ({
    message: `No Customer found with customerId ${customerId}. Nothing removed.`,
    code: CODES.ALREADY_IN_USE,
    type: "error",
  }),
  UPDATE_OK: (customerId) => ({
    message: `Customer ${customerId} was updated.`,
    code: CODES.UPDATE_OK,
    type: "info",
  }),
  NOT_UPDATED: (customerId) => ({
    message: `Data was not updated.`,
    code: CODES.NOT_UPDATED,
    type: "error",
  }),
};

module.exports = { CODES, MESSAGES };
