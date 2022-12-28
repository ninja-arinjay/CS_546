/*
Require express and express router as shown in lecture code and worked in previous labs.
Your server this week should not be doing any of the processing! Your server only exists to allow someone to get to the HTML Page and download the associated assets to run the array sort page.

you just need one route to send the static homepage.html file
*/
const express= require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req,res) => {
    try {
        res.sendFile(path.resolve('static/homepage.html'));
      } catch (e) {
        return res.status(404).render({error: "Home Page cannot be found!"});
      }
})

module.exports = router;