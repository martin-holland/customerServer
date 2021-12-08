"use strict";

const http = require("http");
const path = require("path");

const express = require("express");
const app = express();

const { port, host, storage } = require("./serverConfig.json");

const Datastorage = require(path.join(
  __dirname,
  storage.storageFolder,
  storage.dataLayer
));

const dataStorage = new Datastorage();

const server = http.createServer(app);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "pageviews"));

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

const menuPath = path.join(__dirname, "menu.html");

app.get("/", (req, res) => res.sendFile(menuPath));

app.get("/all", (req, res) =>
  dataStorage
    .getAll()
    .then((data) => res.render("allCustomers", { result: data }))
);

app.get("/getCustomer", (req, res) =>
  res.render("getCustomer", { title: "Get a Customer", header: "Get a Customer", action: "/getCustomer" })
);

app.post("/getCustomer", (req, res) => {
  if (!req.body) res.sendStatus(500);

  const customerId = req.body.customerId;
  dataStorage
    .getOne(customerId)
    .then((customer) => res.render("customerPage", { result: customer }))
    .catch((error) => sendErrorPage(res, error));
});

app.get("/removeCustomer", (req, res) =>
  res.render("getCustomer", {
    title: "Remove",
    header: "Remove a Customer",
    action: "/removeCustomer",
  })
);

app.post("/removecustomer", (req, res) => {
  if (!req.body) res.sendStatus(500);
  const customerId = req.body.customerId;
  dataStorage
    .remove(customerId)
    .then((status) => sendStatusPage(res, status))
    .catch((error) => sendErrorPage(res, error));
});

app.get("/inputform", (req, res) => res.render("form", {
  title: 'Add Customer',
  header: 'Add a new Customer',
  action: '/insert',
  customerId: {value: '', readonly: ''},
  firstname: {value: '', readonly: ''},
  lastname: {value: '', readonly: ''},
  address: {value: '', readonly: ''},
  favouriteIcecream: {value: '', readonly: ''},

}))

app.post("/insert", (req, res) => {
  if(!req.body) res.sendStatus(500);
  dataStorage.insert(req.body)
    .then(status => sendStatusPage(res, status, ))
    .catch(error => sendErrorPage(res,error))
})

app.get("/updateform", (req, res) => res.render("form", {
  title: 'Update Customer',
  header: 'Update Customer',
  action: '/updatedata',
  customerId: {value: '', readonly: ''},
  firstname: {value: '', readonly: 'readonly'},
  lastname: {value: '', readonly: 'readonly'},
  address: {value: '', readonly: 'readonly'},
  favouriteIcecream: {value: '', readonly: 'readonly'},

}))

app.post("/updatedata", (req,res) => {
  if(!req.body) res.sendStatus(500);
  dataStorage.getOne(req.body.customerId)
    .then(person => res.render('form', {
      title: 'Update Customer',
      header: 'Update Customer Data',
      action: "/update",
      customerId: {value: person.customerId, readonly: 'readonly'},
      firstname: {value: person.firstname, readonly: ''},
      lastname: {value: person.lastname, readonly: ''},
      address: {value: person.address, readonly: ''},
      favouriteIcecream: {value: person.favouriteIcecream, readonly: ''},
    }))
    .catch(error => sendErrorPage(res, error));
})

app.post("/update", (req, res) => {
  if(!req.body) res.sendStatus(500);
  dataStorage.update(req.body)
    .then(status => sendStatusPage(res, status, ))
    .catch(error => sendErrorPage(res,error))
})



server.listen(port, host, () =>
  console.log(`Server listening on: ${host}:${port}...`)
);

function sendErrorPage(res, error, title = "Error", header = "Error") {
  sendStatusPage(res, error, title, header);
}

function sendStatusPage(res, status, title = "Status", header = "Status") {
  return res.render("statusPage", { title, header, status });
}
