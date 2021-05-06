'use strict'
const { JSDOM } = require('jsdom')
const fetch = require('node-fetch')
/**
 *
 * @param links
 * @returns {Promise<string[]>}
 */
const scrapeLinks = async links => {
  const res = await fetch(links)
  const txt = await res.text()
  const page = await new JSDOM(txt)

  return Array.from(page.window.document.querySelectorAll('a'), el => el.href)
}

module.exports.scrapeLinks = scrapeLinks
