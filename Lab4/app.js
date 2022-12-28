/*

1. Create a Movie of your choice.
2. Log the newly created Movie. (Just that movie, not all movies)
3. Create another movie of your choice.
4. Query all movies, and log them all
5. Create the 3rd movie of your choice.
6. Log the newly created 3rd movie. (Just that movie, not all movies)
7. Rename the first movie
8. Log the first movie with the updated name. 
9. Remove the second movie you created.
10. Query all movies, and log them all
11. Try to create a movie with bad input parameters to make sure it throws errors.
12. Try to remove a movie that does not exist to make sure it throws errors.
13. Try to rename a movie that does not exist to make sure it throws errors.
14. Try to rename a movie passing in invalid data for the newName parameter to make sure it throws errors.
15. Try getting a movie by ID that does not exist to make sure it throws errors.

*/


const movies = require('./data/movies');
const connection = require('./config/mongoConnection');

const main = async () => {
    const db = await connection.dbConnection();
    await db.dropDatabase();
    let movie1 = undefined;
    let movie2 = undefined;
    let movie3 = undefined;
    // 1. and 2. Creating a movie and logging it.
    try {
        console.log("Creating a Movie and logging it.")
        movie1 = await movies.createMovie("Hackers", "Hackers are blamed for making a virus that will capsize five oil tankers.", ["Crime", "Drama", "Romance"], "PG-13", "United Artists", "Iain Softley", ["Jonny Miller", "Angelina Jolie", "Matthew Lillard", "Fisher Stevens"], "09/15/1995", "1h 45min");
        console.log(movie1);
      } catch (e) {
        console.log(e);
    }
    // 3. Create another movie.
    try{
        movie2 = await movies.createMovie("Forty Two","In 1947, Jackie Robinson becomes the first African-American to play in Major League Baseball in the modern era when he was signed by the Brooklyn Dodgers and faces considerable racism in the process.",["Biography", "Drama", "Sport"],"PG-13","Warner Brothers","Brian Helgeland",["Chadwick Boseman", "Harrison Ford", "Nicole Beharie", "Christopher Meloni"],"04/09/2013","2h 8min");
    } catch(e){
        console.log(e);
    }
    // 4. Querying all movies and logging them.
    try{
        const list = await movies.getAllMovies();
        console.log(list);
    } catch(e) {
        console.log(e);
    }
    // 5. and 6. Create another movie and logging it.
    try {
        movie3 = await movies.createMovie("The Breakfast Club", "Five high school students meet in Saturday detention and discover how they have a lot more in common than they thought.", ["Comedy", "Drama"], "R", "Universal Pictures", "John Hughes", ["Judd Nelson", "Molly Ringwald", "Ally Sheedy", "Anthony Hall", "Emilio Estevez"], "02/07/1985", "1h 37min");
        console.log(movie3);
      } catch (e) {
        console.log(e);
    }
    // 7. and 8. Rename the first movie and logging it with updated name.
    try {
        const renamedHackers = await movies.renameMovie(movie1._id, "Coders"); 
        console.log(renamedHackers);
    } catch (e) {
        console.log(e);
    }
    // 9. Removing the second movie that was created.
    try {
        const deleteMovie = await movies.removeMovie(movie2._id); 
        console.log(deleteMovie);
    } catch (e) {
        console.log(e);
    }
    // 10. Querying all movies and logging them all.
    try{
        const list = await movies.getAllMovies();
        console.log(list);
    } catch(e) {
        console.log(e);
    }
    // 11. Try to create a movie with bad input parameters to make sure it throws errors.
    try {
        movie3 = await movies.createMovie("The Breakfast Club", "Five high school students meet in Saturday detention and discover how they have a lot more in common than they thought.", ["Comedy", "Drama"], "R", "Universal Pictures", "John Hughes", ["Judd Nelson", "Molly Ringwald", "Ally Sheedy", "Anthony Hall", "Emilio Estevez"], "02/07/1985", "1h 60min");
        console.log(movie3);
      } catch (e) {
        console.log(e);
    }
    // 12. Try to remove a movie that does not exist to make sure it throws errors.
    try {
        const deleteMovie = await movies.removeMovie(movie2._id); 
        console.log(deleteMovie);
    } catch (e) {
        console.log(e);
    }
    // 13. Try to rename a movie that does not exist to make sure it throws errors. 
    try {
        movie2 = await movies.renameMovie(movie2._id,"DDLJ"); 
        console.log(movie2);
    } catch (e) {
        console.log(e);
    }
    // 14. Try to rename a movie passing in invalid data for the newName parameter to make sure it throws errors.
    try {
        const renamedHackers = await movies.renameMovie(movie1._id, "Coders!"); 
        console.log(renamedHackers);
    } catch (e) {
        console.log(e);
    }
    // 15. Try getting a movie by ID that does not exist to make sure it throws errors.
    try {
        const test = await movies.getMovieById('634de8fd4acb4503082aae28'); 
        console.log(test);
    } catch (e) {
        console.log(e);
    }
    await connection.closeConnection();
    console.log('Done!');
};

main();
