"use strict";

const fs = require("fs").promises;

async function readStorage(storageFile) {
  try {
    const data = await fs.readFile(storageFile, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    // console.log(err.message); used for debugging
    return [];
  }
}

async function writeStorage(storageFile, data) {
  try {
    await fs.writeFile(storageFile, JSON.stringify(data, null, 4), {
      encoding: "utf8",
      flag: "w",
    });
    return true;
  } catch (err) {
    return false;
  }
}

module.exports = { readStorage, writeStorage };
