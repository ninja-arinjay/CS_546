const peopleRoute = require('./people');
const express = require('express')

const constructorMethod = (app) => {
  app.use('/', peopleRoute);
  app.use('*', (req, res) => {
    res.sendStatus(404);
  });
};

module.exports = constructorMethod;