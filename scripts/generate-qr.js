// @flow

import fs from 'fs'
import {promisify} from 'util'
import convexqr from 'convexqr'
import _ from 'highland'
import sitemap from 'sitemap-urls'

const generateQR = (text: string): Promise<stream$Readable> =>
  new Promise(resolve => convexqr({text}, resolve))

const main = async () => {
  const urls: Array<string> = sitemap.extractUrls(
    await promisify(fs.readFile)('./dist/sitemap.xml')
  )

  return Promise.all(
    urls.map(async url =>
      _(await generateQR(url)).pipe(
        fs.createWriteStream(
          `./qr-codes/${url
            .replace('https://www.arcpublications.co.uk/orbita', '')
            .replace(/\W/g, '-')
            .slice(1, -1)
            .replace(/^$/, 'home')}.png`
        )
      )
    )
  )
}

main().catch(e => {
  throw e
})
