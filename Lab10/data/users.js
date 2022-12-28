const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.user_collection;
const { ObjectId } = require('mongodb');
const bcrypt = require("bcrypt");
const { query } = require('express');
const helpers = require('../helpers')

const createUser = async (
  username, password
) => {
  const usersCollection = await users();
  //Input Validation
  helpers.inputCheck(username, password);
  username = username.toLowerCase();
  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);
  try{
    let duplicateUser;
    duplicateUser = await usersCollection.findOne({username: username});
    if(duplicateUser === null) {
      let insertData;
      insertData = await usersCollection.insertOne({
        username: username,
        password: hash
      });
      return {insertedUser: true};
    }else{
      throw "ERROR: DUPLICATE USER FOUND";
    }
  }catch (e){
    throw e;
  }
 };

const checkUser = async (username, password) => {
  const usersCollection = await users();
  // Input validation.
  helpers.inputCheck(username, password);
  username = username.toLowerCase();
  let query; // query the db
  let compareFoundUser;
  try {
    query = await usersCollection.findOne(
      {username: username}
    );
    if(Object.keys(query).length === 0) {
      throw "Either the username or password is invalid";
    }
    else {
      compareFoundUser = await bcrypt.compare(password, query.password);
      if (!compareFoundUser){
        throw "Either the username or password is invalid"; 
      } else{
        return {authenticatedUser: true};
      }
    }
  }catch(e){
    throw e;
  }
};

module.exports = { createUser, checkUser};
