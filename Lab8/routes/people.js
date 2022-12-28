//Require express and express router as shown in lecture code and worked in previous labs
const express = require('express');
const data = require('../data');
const peopleData = data.people;
const router = express.Router();
const path = require('path');

router.route("/").get(async (req, res) => {
  //code here for GET
  try {
    res.sendFile(path.resolve('static/homepage.html'));
  } catch (e) {
    return res.status(404).render({error: "Home Page cannot be found!"})
  }
});

router.route("/searchpeople").post(async (req, res) => {
  //code here for POST
  try{
    //console.log(1);
    let searchTerm = req.body.searchPersonName;
    //console.log(searchTerm);     

    if (!searchTerm){
        //console.log(2)
        return res.status(400).render('error', 
        {class: "empty-input",
        title: "Error",
        error: "Input must be inputted"});
    }

    if (searchTerm.trim().length === 0) {
        //console.log(3)
        return res.status(400).render('error',
        {class: "empty-spaces",
        title: "Error",
        error: "Search term must not have empty spaces"});
    }

    const search = await peopleData.searchPeopleByName(searchTerm);
    //console.log(4)
    if (search.length === 0){
        return res.status(404).render('personNotFound', {
            class: "person-not-found",
            title: "Error",
            searchPersonName: searchTerm
        });
    }
    //console.log(5)
    return res.render('peopleFound',{title: "People Found", people: search, searchTerm: searchTerm});
  }
  catch(e){
    //console.log(6);
    return res.status(400).render('error',
    {class: "",
    error: "Unkown Error has occured!"});;
  }
});

router.route("/persondetails/:id").get(async (req, res) => {
  //code here for GET
  let id = req.params.id;
  // console.log(1)
  if (!id) {
    // console.log(2)
    return res.status(400).render('error',
    {class: "no-id",
    title: "Error",
    error: "ID must be inputted"});
  }
  if (isNaN(id)){
    return res.status(400).render('error', {
    class: "not-a-number",
    title: "Error",
    error: "ID must be a number only"
    });
  }
  
  //filter pure string values and still not a number
  if (isNaN(parseInt(id)) || (parseInt(id) < 0)) {
    // console.log(3)
    return res.status(400).render('error',
    {class: "not-a-number",
    title: "Error",
    error: "Id Must be a positive number"});
  }
  try {
    const personById = await peopleData.searchPeopleByID(id);
    res.render('personFoundByID', {title : "Person Found",name : personById.firstName + " " + personById.lastName, person: personById});
  } catch (e) {
    return res.status(404).render({
      class: 'person-not-found',
      error: `We're sorry, but no results were found for ${id}.`
    });
  }
});

module.exports = router;
