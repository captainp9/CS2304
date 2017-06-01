/*
 * @module count
 * This module contains one function that returns the number of the day.
 */

/*
 * Returns a positive integer between 0 and 20.
 */
function numberOfTheDay() {
  // Return a random number here.
  return Math.round(Math.random()*20);
}

module.exports = {
  numberOfTheDay: numberOfTheDay
};
