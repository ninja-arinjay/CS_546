const helpers = require('./../helpers')
const mongoCollections = require('./../config/mongoCollections');
const movies = mongoCollections.movies;
const {ObjectId} = require('mongodb');

const createMovie = async (
  title,
  plot,
  genres,
  rating,
  studio,
  director,
  castMembers,
  dateReleased,
  runtime
) => {

  let genresInvalidFlag = false;
  let castMembersInvalidFlag = false;

  // Input Validation of Title 
  helpers.checkInputString(title);
  title = title.trim();
  helpers.checkTitle(title);

  // Input Validation of Plot 
  helpers.checkInputString(plot);
  plot = plot.trim();

  // Input Validation of Genres 
  helpers.checkInputArray(genres);
  for (i in genres) {
    if (typeof genres[i] !== 'string' || genres[i].trim().length === 0) {
      genresInvalidFlag = true;
      break;
    }
    genres[i] = genres[i].trim();
    helpers.checkGenres(genres[i]);
  }
  if (genresInvalidFlag)
    throw 'One or more genres is not a string or is an empty string';

  // Input Validation of Rating. 
  helpers.checkInputString(rating);
  rating = rating.trim();
  helpers.checkRating(rating);

  // Input Validation of Studio
  helpers.checkInputString(studio);
  studio = studio.trim();
  helpers.checkStudio(studio);

  // Input Validation of Director 
  helpers.checkInputString(director);
  director = director.trim();
  helpers.checkDirector(director);

  // Input Validation of Cast Members
  helpers.checkInputArray(castMembers);
  for (i in castMembers) {
    if (typeof castMembers[i] !== 'string' || castMembers[i].trim().length === 0) {
      castMembersInvalidFlag = true;
      break;
    }
    castMembers[i] = castMembers[i].trim();
    helpers.checkDirector(castMembers[i]);
  }
  if (castMembersInvalidFlag)
    throw 'One or more cast members is not a string or is an empty string';

    // Input Validation of Date 
  helpers.checkInputString(dateReleased);
  dateReleased = dateReleased.trim();
  helpers.checkDate(dateReleased);

  // Input Validation of RunTime
  helpers.checkInputString(runtime);
  runtime = runtime.trim();
  helpers.checkRuntime(runtime);

  const moviesCollection = await movies();

  let newMovie = {
    title : title,
    plot : plot,
    genres : genres,
    rating : rating,
    studio : studio,
    director : director,
    castMembers : castMembers,
    dateReleased : dateReleased,
    runtime : runtime
  };

  // Adding to the database
  const insertInfo = await moviesCollection.insertOne(newMovie);
    if (!insertInfo.acknowledged || !insertInfo.insertedId)
      throw 'Could not add movie';

    const newId = insertInfo.insertedId.toString();

    const movie = await getMovieById(newId);
    return movie;

};

const getAllMovies = async () => {
  const moviesCollection = await movies();
  // Getting all the movies from database.
    const movieList = await moviesCollection.find({}).toArray();
    if (!movieList) throw 'Could not get all movies';
    for (let i = 0; i < movieList.length; i++) {
      movieList[i]["_id"] = movieList[i]["_id"].toString();
    }
    return movieList;
};

const getMovieById = async (id) => {
  //input validation of ID.
  if (!id) throw 'You must provide an id to search for';
    if (typeof id !== 'string') throw 'Id must be a string';
    if (id.trim().length === 0)
      throw 'Id cannot be an empty string or just spaces';
    id = id.trim();
    if (!ObjectId.isValid(id)) throw 'invalid object ID';
    const moviesCollection = await movies();
    const idMovie = await moviesCollection.findOne({_id: ObjectId(id)});
    if (idMovie === null) throw 'No Movie with that id';
    for (let i = 0; i < idMovie.length; i++) {
      idMovie[i]["_id"] = idMovie[i]["_id"].toString();
    }
    idMovie._id = idMovie._id.toString();
    return idMovie;
};

const removeMovie = async (id) => {
  // input validation of ID
  if (!id) throw 'You must provide an id to search for';
  if (typeof id !== 'string') throw 'Id must be a string';
  if (id.trim().length === 0)
    throw 'id cannot be an empty string or just spaces';
  id = id.trim();
  if (!ObjectId.isValid(id)) throw 'invalid object ID';

  const moviesCollection = await movies();
  const movie = await getMovieById(id);
  const deletionInfo = await moviesCollection.deleteOne({_id: ObjectId(id)});

  if (deletionInfo.deletedCount === 0) {
    throw `Could not delete Movie with id of ${id}`;
  }
  return movie.title + " has been successfully deleted!";
};

const renameMovie = async (id, newName) => {
  //Input validation of ID
  if (!id) throw 'You must provide an id to search for';

  if (typeof id !== 'string') throw 'Id must be a string';

  if (id.trim().length === 0)
    throw 'Id cannot be an empty string or just spaces';

  id = id.trim();
  if (!ObjectId.isValid(id)) throw 'invalid object ID';

  //input validation of new name
  helpers.checkInputString(newName);
  newName = newName.trim();
  helpers.checkTitle(newName);
  const moviesCollection = await movies();
  const movie = await getMovieById(id);
  if(movie.title === newName){
    throw "ERROR : New name is the same as stored in the current database."
  }
  const updatedMovie = {
    title: newName,
  };

  const updatedInfo = await moviesCollection.updateOne(
    {_id: ObjectId(id)},
    {$set: updatedMovie}
  );
  if (updatedInfo.modifiedCount === 0) {
    throw 'could not update movie successfully';
  }

  return await getMovieById(id);
};

module.exports = {
  createMovie,
  getAllMovies,
  getMovieById,
  removeMovie,
  renameMovie
};
