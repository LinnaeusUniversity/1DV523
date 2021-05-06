'use strict'

const { scrapeLinks } = require('./src/scraperLinks')
const { dateHandler } = require('./src/dateHandler')
const { movieHandler } = require('./src/movieHandler')
const { dinnerHandler } = require('./src/dinnerHandler')

const start = process.argv.slice(2)

if (start.length === 0) {
  console.error('ERROR: Start with No argument(s).')
  process.exit(0)
} else {
  run()
}

/**
 *
 * @returns {Promise<void>}
 */
async function run () {
  try {
    const [links] = await Promise.all([scrapeLinks(start)])
    const arr = Array.from(new Set([...links]))
    // console.log(arr)
    console.log('Scraping links...OK')

    const days = await dateHandler(arr[0])

    const movies = await movieHandler(arr[1], days)

    const dinner = await dinnerHandler(arr[2], movies)

    console.log('\n\nRecommendations\n===============')
    if (days.length < 1) {
      console.log('Could not find any suitable day for everyone involved!')
    } else {
      dinner.forEach((result) => {
        console.log('* On ' + result.day + ' the movie "' + result.movie +
          '" starts at ' + result.time + ' and there is a free table between ' +
          result.dinnerStart + ':00-' + result.dinnerEnd + ':00.')
      })
    }
  } catch (err) {
    console.log('Error: ', err)
  }
}
