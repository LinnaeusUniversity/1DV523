'use strict'
const { JSDOM } = require('jsdom')
const fetch = require('node-fetch')
const { scrapeLinks } = require('./scraperLinks')
/**
 * Obtain all of the days that are available from calendars.
 * @param url
 * @returns {Promise<[]>}
 */
const dateHandler = async url => {
  const [links] = await Promise.all([await scrapeLinks(url)])
  const linkArray = Array.from(new Set([...links]))
  const availableDays = []

  for (const link of linkArray) {
    const results = await checkDaysHandler(url + link)

    results.forEach(item1 => {
      availableDays.push(item1)
    })
  }

  console.log('Scraping available days...OK')
  return calendarsHandler(availableDays)
}
/**
 * The calendars of all three users are used to manage available days.
 * @param day
 * @returns {Promise<[]>} Each calendar's available days are listed in an array.
 */
const checkDaysHandler = async day => {
  const res = await fetch(day)
  const text = await res.text()
  const calendar = await new JSDOM(text)

  const days = calendar.window.document.querySelectorAll('table tr th')
  const available = calendar.window.document.querySelectorAll('table tr td')
  const arr = []

  for (let i = 0; i < days.length; i++) {
    const dayStatus = available[i].innerHTML
    if (dayStatus.toUpperCase() === 'OK') arr.push(days[i].innerHTML)
  }
  return arr
}

/**
 * Handles all calendars' available days.
 * @param days To be handled is a days array.
 * @returns {[]} Days that are available.
 */
function calendarsHandler (days) {
  const status = {
    Friday: undefined,
    Saturday: undefined,
    Sunday: undefined
  }
  const available = []

  for (const day of days) {
    status[day] = (status[day] || 0) + 1
  }

  if (status.Friday === 3) available.push('Friday')
  if (status.Saturday === 3) available.push('Saturday')
  if (status.Sunday === 3) available.push('Sunday')

  return available
}

module.exports.dateHandler = dateHandler
