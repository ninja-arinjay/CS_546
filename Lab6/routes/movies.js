//require express and express router as shown in lecture code
const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();
const data = require('../data');
const moviesData = data.movies;


router
  .route('/')
  .get(async (req, res) => {// Get All
    //code here for GET
    try {
      const movies = await moviesData.getAllMovies();
      let result = [];
      for (let i = 0; i < movies.length; i++){
        let obj = {
          _id : movies[i]._id,
          title: movies[i].title
        }
        result.push(obj);
      }
      return res.status(200).json(result);
    }catch (e) {
      return res.status(500).json({error: e})}
  })
  .post(async (req, res) => {
    //code here for POST
    // Input Validation 
    let moviesInfo = req.body;
    if ( !moviesInfo.title || !moviesInfo.plot || !moviesInfo.genres || !moviesInfo.rating || !moviesInfo.studio || !moviesInfo.director || !moviesInfo.castMembers || !moviesInfo.dateReleased || !moviesInfo.runtime) {
      return res.status(400).json({error: "Title/Plot/Genres/Rating/Studio/Director/CastMembers/DateReleased/Runtime must have an input."});
    }
    if (typeof moviesInfo.title !== 'string' || typeof moviesInfo.plot !== 'string' || typeof moviesInfo.rating !== 'string' || typeof moviesInfo.studio !== 'string' || typeof moviesInfo.director !== 'string' || typeof moviesInfo.dateReleased !== 'string' || typeof moviesInfo.runtime !== 'string') {
      return res.status(400).json({error: "Title/Plot/Rating/Studio/Director/DateReleased/Runtime must be a string"});
    }
    if (moviesInfo.title.trim().length === 0 || moviesInfo.plot.trim().length === 0 || moviesInfo.rating.trim().length === 0 || moviesInfo.studio.trim().length === 0 || moviesInfo.director.trim().length === 0 || moviesInfo.dateReleased.trim().length === 0 || moviesInfo.runtime.trim().length === 0) {
      return res.status(400).json({error: "Title/Plot/Rating/Studio/Director/DateReleased/Runtime must not be an empty string"});
    }
    if (!Array.isArray(moviesInfo.genres) || moviesInfo.genres.length === 0 || !Array.isArray(moviesInfo.castMembers) || moviesInfo.castMembers.length === 0) {
      return res.status(400).json({error: "genres/castMembers must be stored in arrays and should not be an empty array."});
    }
    let genresInvalidFlag = false;
    for (i in moviesInfo.genres) {
      if (typeof moviesInfo.genres[i] !== 'string' || moviesInfo.genres[i].trim().length === 0) {
        genresInvalidFlag = true;
        break;
      }
    }
    if (genresInvalidFlag){
      return res.status(400).json({error: "Elements stored in genres is not a valid string."});
    }
    let castMembersInvalidFlag = false; 
    for (i in moviesInfo.castMembers) {
      if (typeof moviesInfo.castMembers[i] !== 'string' || moviesInfo.castMembers[i].trim().length === 0) {
        castMembersInvalidFlag = true;
        break;
      }
    }
    if (castMembersInvalidFlag){
      return res.status(400).json({error: "Elements stored in CastMembers is not a valid string."});
    }
    let daysList =[31,28,31,30,31,30,31,31,30,31,30,31];
    let inparr = moviesInfo.dateReleased.split("/");
    let mm = parseInt(inparr[0]);
    if(mm<=0 || mm>12){
      return res.status(400).json({error: "Error : Month can only between 1 to 12."});
    }
    let dd = parseInt(inparr[1]);
    if(dd<=0 || dd>daysList[mm-1]){
      return res.status(400).json({error: "ERROR : Invalid Day format in Date."});
    }
    let lowerLimit = 1900;
    let upperLimit = new Date().getFullYear() +2;
    let yy = parseInt(inparr[2]);
    if(yy<lowerLimit || yy>upperLimit){
      return res.status(400).json({error: "ERROR : Invalid Year format in Date."});
    }
  if(!(Number.isInteger(parseInt(moviesInfo.runtime[0])))){
    return res.status(400).json({error: "ERROR : Runtime can only be a whole number."});
  }
  if(moviesInfo.runtime[0]<=0){
    return res.status(400).json({error: "ERROR : Runtime must be greater than 0h."});
  }
  if(moviesInfo.runtime[1] != 'h'){
    return res.status(400).json({error: "Error : Invalid Runtime format."});
  }
  if(moviesInfo.runtime[2] != ' '){
    return res.status(400).json({error: "Error : Invalid Runtime format."});
  }
  let pos = moviesInfo.runtime.indexOf('m')
  let min = parseInt(moviesInfo.runtime.substring(3,pos));
  if(!(Number.isInteger(min))){
    return res.status(400).json({error: "ERROR : Runtime can only be a whole number."});
  }
  if(min<0){
    return res.status(400).json({error: "ERROR : Runtime can only have positive value of min."});
  }
  if(min>=60){
    return res.status(400).json({error: "ERROR : Runtime can only have value of min less than 60."});
  }
  if(moviesInfo.runtime.substring(pos) != 'min'){
    return res.status(400).json({error: "ERROR : Invalid Runtime format."});
  }
  try { 
    moviesInfo.reviews = []
    moviesInfo.overallRating = 0;
    const movie = await moviesData.createMovie(
      moviesInfo.title, 
      moviesInfo.plot,
      moviesInfo.genres,
      moviesInfo.rating,
      moviesInfo.studio,
      moviesInfo.director,
      moviesInfo.castMembers,
      moviesInfo.dateReleased,
      moviesInfo.runtime
    );
    res.status(200).json(movie);
  } catch (e) {
    return res.status(404).json({error: e});
  }
  });

router
  .route('/:movieId')
  .get(async (req, res) => {
    //code here for GET
    try { 
      let Id = req.params.movieId;
      if (!ObjectId.isValid(Id)){
        return res.status(400).json({error: "ID not valid"});
      }
      const movies = await moviesData.getMovieById(Id);
      res.status(200).json(movies);
    }catch (e) {
      return res.status(404).json({error: e});
    }
  })
  .delete(async (req, res) => {
    //code here for DELETE
    const Id = req.params.movieId;
    if(!ObjectId.isValid(Id)) {
      return res.status(400).json({error: 'Not Valid Id'});
    }
    try{// get the data
      await moviesData.getMovieById(Id);
    }catch(e) {
      return res.status(404).json({error: 'Movie not Found'});
    }

    try { // delete the specific
      await moviesData.removeMovie(Id);
      res.status(200).json({movieId: Id, deleted: true});
    }catch (e) {
      return res.status(500).json({error: e});
    }
  })
  .put(async (req, res) => {
    //code here for PUT
    const Id = req.params.movieId;
    const updatedMovies = req.body;
    try { //get the data of the band
      //Input Validation
      if (!ObjectId.isValid(Id)){
        return res.status(400).json({error: "ID not valid"})
      }
      if (!updatedMovies.title || !updatedMovies.plot || !updatedMovies.genres ||  !updatedMovies.rating || !updatedMovies.studio || !updatedMovies.castMembers || !updatedMovies.dateReleased || !updatedMovies.runtime) {
        return res.status(400).json({error: "All fields must have an input"});
      }
      if (typeof updatedMovies.title !== 'string' || typeof updatedMovies.plot !== 'string' || typeof updatedMovies.rating !== 'string' || typeof updatedMovies.studio !== 'string' || typeof updatedMovies.dateReleased !== 'string' || typeof updatedMovies.runtime !== 'string') {
        return res.status(400).json({error: "Title/Plot/Rating/Studio/Director/DateReleased/Runtime must be a string"});
      }
      if (updatedMovies.title.trim().length === 0 || updatedMovies.plot.trim().length === 0 || updatedMovies.rating.trim().length === 0 || updatedMovies.studio.trim().length === 0 || updatedMovies.dateReleased.trim().length === 0 || updatedMovies.runtime.trim().length === 0) {
        return res.status(400).json({error: "Title/Plot/Rating/Studio/Director/DateReleased/Runtime must not be an empty string"});
      }
      if (!Array.isArray(updatedMovies.genres) || updatedMovies.genres.length === 0 || !Array.isArray(updatedMovies.castMembers) || updatedMovies.castMembers.length === 0) {
        return res.status(400).json({error: "genres/castMembers must be stored in arrays and should not be an empty array."});
      }
      let genresInvalidFlag = false;
      for (i in updatedMovies.genres) {
        if (typeof updatedMovies.genres[i] !== 'string' || updatedMovies.genres[i].trim().length === 0) {
          genresInvalidFlag = true;
          break;
        }
      }
      if (genresInvalidFlag){
        return res.status(400).json({error: "Elements stored in genres is not a valid string."});
      }
      let castMembersInvalidFlag = false; 
      for (i in updatedMovies.castMembers) {
        if (typeof updatedMovies.castMembers[i] !== 'string' || updatedMovies.castMembers[i].trim().length === 0) {
          castMembersInvalidFlag = true;
          break;
        }
      }
      if (castMembersInvalidFlag){
        return res.status(400).json({error: "Elements stored in CastMembers is not a valid string."});
      }
      let daysList =[31,28,31,30,31,30,31,31,30,31,30,31];
      let inparr = updatedMovies.dateReleased.split("/");
      let mm = parseInt(inparr[0]);
      if(mm<=0 || mm>12){
        return res.status(400).json({error: "Error : Month can only between 1 to 12."});
      }
      let dd = parseInt(inparr[1]);
      if(dd<=0 || dd>daysList[mm-1]){
        return res.status(400).json({error: "ERROR : Invalid Day format in Date."});
      }
      let lowerLimit = 1900;
      let upperLimit = new Date().getFullYear() +2;
      let yy = parseInt(inparr[2]);
      if(yy<lowerLimit || yy>upperLimit){
        return res.status(400).json({error: "ERROR : Invalid Year format in Date."});
      }
      if(!(Number.isInteger(parseInt(updatedMovies.runtime[0])))){
        return res.status(400).json({error: "ERROR : Runtime can only be a whole number."});
      }
      if(updatedMovies.runtime[0]<=0){
        return res.status(400).json({error: "ERROR : Runtime must be greater than 0h."});
      }
      if(updatedMovies.runtime[1] != 'h'){
        return res.status(400).json({error: "Error : Invalid Runtime format."});
      }
      if(updatedMovies.runtime[2] != ' '){
        return res.status(400).json({error: "Error : Invalid Runtime format."});
      }
      let pos = updatedMovies.runtime.indexOf('m')
      let min = parseInt(updatedMovies.runtime.substring(3,pos));
      if(!(Number.isInteger(min))){
        return res.status(400).json({error: "ERROR : Runtime can only be a whole number."});
      }
      if(min<0){
        return res.status(400).json({error: "ERROR : Runtime can only have positive value of min."});
      }
      if(min>=60){
        return res.status(400).json({error: "ERROR : Runtime can only have value of min less than 60."});
      }
      if(updatedMovies.runtime.substring(pos) != 'min'){
        return res.status(400).json({error: "ERROR : Invalid Runtime format."});
      }
      await moviesData.getMovieById(Id);
    } catch (e) {
      return res.status(404).json({error: e});
    }
    try { //update the movie
      const uMovie = await moviesData.updateMovie(Id, 
        updatedMovies.title,
        updatedMovies.plot,
        updatedMovies.genres,
        updatedMovies.rating,
        updatedMovies.studio,
        updatedMovies.castMembers,
        updatedMovies.dateReleased,
        updatedMovies.runtime);
      res.json(uMovie);
      res.status(200);
    } catch(e) {
      console.log(e)
      return res.status(500).json({error: e});
    }
  });

  module.exports = router;
