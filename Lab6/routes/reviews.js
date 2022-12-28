//require express and express router as shown in lecture code
const express = require('express');
const { ObjectId } = require('mongodb');
const { movies } = require('../config/mongoCollections');
const router = express.Router();
const data = require('../data');
const reviewsData = data.reviews;
const moviesData = data.movies;

router
  .route('/:movieId')
  .get(async (req, res) => {
    //code here for GET
    try {
    const movieId = req.params.movieId;
    const reviews = await reviewsData.getAllReviews(movieId); 
    if ((!movieId)) {
        return res.status(404).json({error: "ID MUST BE INPUTTED"});
    }
    if (!ObjectId.isValid(movieId)){
        return res.status(400).json({ error: "ID NOT VALID"});
    }
    if ((reviews.length === 0)){
        return res.status(404).json({error: "No reviews for this movie."});
    }
    res.json(reviews);
    res.status(200);
  } catch (e) {
      return res.status(500).json({error: "Review by Id is not found."});
  }
  })
  .post(async (req, res) => {
    //code here for POST
    const Id = req.params.movieId;
    const reviewsInfo = req.body;
    // Input Validation
    if (!reviewsInfo.reviewTitle || !reviewsInfo.reviewerName || !reviewsInfo.review || !reviewsInfo.rating){
      return res.status(400).json({error: "ReviewTitle/ReviewName/Rating MUST BE PROVIDED"})
    }
    if (typeof reviewsInfo.reviewTitle !== 'string' || typeof reviewsInfo.reviewerName !== 'string' || typeof reviewsInfo.review !== 'string') {
      return res.status(400).json({error: "ReviewTitle/ReviewName must be a string"});
    }
    if (reviewsInfo.reviewTitle.trim().length === 0 || typeof reviewsInfo.reviewerName.trim().length === 0 || typeof reviewsInfo.review.trim().length === 0) {
      return res.status(400).json({error: "ReviewTitle/ReviewName must not be an empty string"});
    }
    if (!ObjectId.isValid(Id)){
      return res.status(400).json({error: "ID not valid"});
    }
    if(reviewsInfo.rating<1 || reviewsInfo.rating>5){
      return res.status(400).json({error: "ERROR : Rating should only be in the range 1 to 5"});
    }
    try{//get the review by id --- if there is no review with that id throw
      await moviesData.getMovieById(Id);
    } catch(e) {
      return res.status(404).json({error: "No Movie with that Id found."})
    }
    try{ 
      const cReview = await reviewsData.createReview(Id, 
        reviewsInfo.reviewTitle,
        reviewsInfo.reviewerName,
        reviewsInfo.review,
        reviewsInfo.rating);
      res.json(cReview);
      res.status(200);
    }catch(e){
      return res.status(500).json({error: e});
    }
  });

router
  .route('/review/:reviewId')
  .get(async (req, res) => {
    //code here for GET
    try{
      const reviewId = req.params.reviewId;
      if (!ObjectId.isValid(reviewId)){
        return res.status(400).json({error: "Not valid ID"});
      }
      const getReview = await reviewsData.getReview(reviewId);
      if(getReview.length === 0){
        return res.status(404).json({error: "No Review Found."});
      }
      res.json(getReview);
      res.status(200);
    }catch(e){
      return res.status(500).json({error: e})
    }
  })
  .delete(async (req, res) => {
    //code here for DELETE
    const reviewId = req.params.reviewId;
    if (!ObjectId.isValid(reviewId)) {
      return res.status(400).json({error: "Not Valid ID"});
    }       
    try{ // remove
      await reviewsData.removeReview(reviewId);
      res.json({"reviewId": reviewId, "deleted": true});
      res.status(200)
    }catch(e){
      return res.status(404).json({error: e})
    }
  });

  module.exports = router;
