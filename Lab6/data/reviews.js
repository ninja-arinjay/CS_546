const mongoCollections = require('../config/mongoCollections');
const moviesData = require("./movies");
const movies = mongoCollections.movies;
const reviews = mongoCollections.reviews;
const helpers = require('./../helpers')
const { ObjectId } = require('mongodb');


const createReview = async (
  movieId,
  reviewTitle,
  reviewerName,
  review,
  rating
) => {
  //Input Validation of movieId
  if (!movieId) throw 'You must provide an id to search for';
  if (typeof movieId !== 'string') throw 'Id must be a string';
  if (movieId.trim().length === 0)
    throw 'Id cannot be an empty string or just spaces';
  movieId = movieId.trim();
  if (!ObjectId.isValid(movieId)) throw 'invalid object ID';

  //Input Validation of reviewTitle
  helpers.checkInputString(reviewTitle);
  reviewTitle = reviewTitle.trim();

  //Input Validation of reviewerName
  helpers.checkInputString(reviewerName);
  reviewerName = reviewerName.trim();

  //Input Validation of review
  helpers.checkInputString(review);
  review = review.trim();

  //Input Validation of rating
  if(!rating) throw "ERROR: RATING MUST HAVE AN INPUT!";
  if(rating<1 || rating>5){
    throw "ERROR : Rating should only be in the range 1 to 5"
  }
  rating = Math.round(rating * 10) / 10;

  const moviesCollection = await movies();
  let currentDate = new Date();
  let reviewDate = currentDate.getMonth()+'/'+currentDate.getDate()+'/'+currentDate.getFullYear();
  let updateReviews = {
    _id: new ObjectId(),
    reviewtitle: reviewTitle,
    reviewDate : reviewDate,
    reviewerName: reviewerName,
    review : review,
    rating: rating
  };
  let parseid = ObjectId(movieId.trim());
  //temp ratings to store overall rating
  let tempRatings = rating;
  let numRatings = 1;
  //to store Reviews array
  const findMovie = await moviesCollection.findOne({_id: parseid});
  if (!findMovie) {
      throw "ERROR: Id not found for movie!"
  }
  let tempReviews = findMovie.reviews;
  numRatings += tempReviews.length; // to sum up the number of ratings
  for (let i =0 ; i < tempReviews.length; i++) {
      tempRatings += tempReviews[i].rating;
  }
  let newOverallRating = (tempRatings/numRatings).toFixed(1); // find the average and set to 1 decimal place
  let RatingUpdate = {
      overallRating: parseFloat(newOverallRating) 
  }
  await moviesCollection.updateOne(
      {_id: parseid},
      {$set: RatingUpdate}
  )
  const insertInfo = await moviesCollection.updateOne(
      {_id: parseid},
      {$addToSet: {reviews: updateReviews}}
  );
  const newId = insertInfo.insertedId;
  let stringifyId = updateReviews["_id"].toString();
  updateReviews["_id"] = stringifyId;
  return updateReviews;
};

const getAllReviews = async (movieId) => {

  //Input Validation of movieId
  if (!movieId) throw 'You must provide an id to search for';
  if (typeof movieId !== 'string') throw 'Id must be a string';
  if (movieId.trim().length === 0)
    throw 'Id cannot be an empty string or just spaces';
  movieId = movieId.trim();
  if (!ObjectId.isValid(movieId)) throw 'invalid object ID';


  const moviesCollection = await movies();
  const movies_reviews = await moviesCollection.findOne(
    {_id: ObjectId(movieId)}
  );
  if (!movies_reviews) {
    throw "Review doesn't exit!"
  }
  for (let i=0; i < movies_reviews.reviews.length; i++){
      movies_reviews.reviews[i]._id = movies_reviews.reviews[i]._id.toString();
  }
  return movies_reviews.reviews;
};

const getReview = async (reviewId) => {
  
  //Input Validation of reviewId
  if (!reviewId) throw 'You must provide an id to search for';
  if (typeof reviewId !== 'string') throw 'Id must be a string';
  if (reviewId.trim().length === 0)
    throw 'Id cannot be an empty string or just spaces';
  reviewId = reviewId.trim();
  if (!ObjectId.isValid(reviewId)) throw 'invalid object ID';

  const moviesCollection = await movies();
  const getReviews = await moviesCollection.findOne(
    { 'reviews._id' : ObjectId(reviewId)},
  );
  if (!getReviews) { //error check
    throw "ERROR: Review not found!";
  }
  let pos =0;
  for (let i = 0; i < getReviews.reviews.length; i++) {
    if (getReviews.reviews[i]._id.toString() === reviewId.toString()){
        pos=i;
        break;
    }
  }
  return getReviews.reviews[pos];
};

const removeReview = async (reviewId) => {

  //Input Validation of reviewId
  if (!reviewId) throw 'You must provide an id to search for';
  if (typeof reviewId !== 'string') throw 'Id must be a string';
  if (reviewId.trim().length === 0)
    throw 'Id cannot be an empty string or just spaces';
  reviewId = reviewId.trim();
  if (!ObjectId.isValid(reviewId)) throw 'invalid object ID';


  const moviesCollection = await movies();
  const getReviews = await moviesCollection.findOne({'reviews._id' : ObjectId(reviewId)}); 
  if (!getReviews) {
    throw "ERROR: Review not found!"
  }
  let newReviewsList = [];
  for (let i = 0; i < getReviews.reviews.length; i++) {
    // if they don't match, push the doc into a new array
    if (getReviews.reviews[i]._id.toString() !== reviewId.toString()){
        newReviewsList.push(getReviews.reviews[i]);
    }
  }   
  const insertInfo = await moviesCollection.findOneAndUpdate(
    {'reviews._id' : ObjectId(reviewId)},
    { $set: {'reviews' : newReviewsList}},
    {returnNewDocument: true}
  );
  return insertInfo;
};

module.exports = {
  createReview,
  getAllReviews,
  getReview,
  removeReview
};
