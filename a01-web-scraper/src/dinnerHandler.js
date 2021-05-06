'use strict'
// eslint-disable-next-line no-unused-vars
const { JSDOM } = require('jsdom')
const fetch = require('node-fetch')
const cheerio = require('cheerio')
const fetchCookie = require('fetch-cookie/node-fetch')(fetch)

/**
 * Takes care of the dinner reservation.
 * @param url
 * @param availableTimes
 * @returns {Promise<[]>}
 */
async function dinnerHandler (url, availableTimes) {
  try {
    const res = await fetchCookie(`${url}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'username=zeke&password=coys'
    })

    const text = await res.text()
    const $ = cheerio.load(text)
    const time = []
    const result = []

    $('.MsoNormal input').each((index, element) => {
      if ($(element).attr('value')) time.push($(element).attr('value'))
    })
    for (const movieTime of availableTimes) {
      movieTime.forEach(movieDay => {
        for (let i = 0; i < time.length; i++) {
          const dinnerTime = time[i]
          const day = dinnerTime.slice(0, 3)
          const startTime = parseInt(dinnerTime.slice(3, 5))
          const finishTime = dinnerTime.slice(5, 7)

          if (movieDay.day === '05' && day === 'fri' && parseInt(movieDay.time) + 2 === startTime) {
            result.push({
              day: 'Friday',
              movie: movieDay.movie,
              time: movieDay.time,
              dinnerStart: startTime,
              dinnerEnd: finishTime
            })
          } else if (movieDay.day === '06' && day === 'sat' && parseInt(movieDay.time) + 2 === startTime) {
            result.push({
              day: 'Saturday',
              movie: movieDay.movie,
              time: movieDay.time,
              dinnerStart: startTime,
              dinnerEnd: finishTime
            })
          } else if (movieDay.day === '07' && day === 'sun' && parseInt(movieDay.time) + 2 === startTime) {
            result.push({
              day: 'Sunday',
              movie: movieDay.movie,
              time: movieDay.time,
              dinnerStart: startTime,
              dinnerEnd: finishTime
            })
          }
        }
      })
    }

    console.log('Scraping possible reservations...OK')

    return result
  } catch (err) {
    console.log('Error:', err)
  }
}

module.exports.dinnerHandler = dinnerHandler
