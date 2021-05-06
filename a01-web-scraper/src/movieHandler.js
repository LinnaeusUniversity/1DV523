'use strict'
// eslint-disable-next-line no-unused-vars
const { JSDOM } = require('jsdom')
const fetch = require('node-fetch')
const cheerio = require('cheerio')

/**
 * Handles the movies that are now available.
 * @param url mvie's links
 * @param days available days
 * @returns {Promise<[]>} array of available movies
 */
async function movieHandler (url, days) {
  try {
    const movies = []

    for (const day of days) {
      switch (day) {
        case 'Friday':
          movies.push(await checkMoviesHandler(url, '05'))
          break
        case 'Saturday':
          movies.push(await checkMoviesHandler(url, '06'))
          break
        case 'Sunday':
          movies.push(await checkMoviesHandler(url, '07'))
          break
      }
    }

    console.log('Scraping showtimes...OK')
    return movies
  } catch (err) {
    console.log('Error:', err)
  }
}

/**
 * Handles available movies by days.
 * @param url
 * @param day
 * @returns {Promise<[]>}
 */
async function checkMoviesHandler (url, day) {
  let data
  const result = []

  for (let count = 1; count < 4; count++) {
    const res = await fetch(url + '/check?day=' + day + '&movie=0' + count)
    data = await res.json()

    const availableMovies = await checkValueHandler(data, 1, url)
    for (const movie of availableMovies) {
      result.push(movie)
    }
  }
  return result
}

/**
 * Returns the available movies after handling the data object's value.
 * @param data
 * @param value
 * @param url
 * @returns {Promise<[]>}
 */
async function checkValueHandler (data, value, url) {
  const movies = []
  const res = await fetch(url)
  const text = await res.text()
  const $ = cheerio.load(text)

  for (const item in data) {
    if (data[item].status === value) {
      const time = data[item]

      $('#movie option').each((index, el) => {
        if ($(el).attr('value') === time.movie) {
          time.movie = $(el).text()
        }
      })

      movies.push(time)
    }
  }
  return movies
}

module.exports.movieHandler = movieHandler
