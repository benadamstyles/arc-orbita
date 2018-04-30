// @flow

import {readFile, emptyDir, createWriteStream} from 'fs-extra'
import convexqr from 'convexqr'
import highland from 'highland'
import sitemap from 'sitemap-urls'

const generateQR = (text: string): Promise<stream$Readable> =>
  new Promise(resolve => convexqr({text}, resolve))

const main = async () => {
  const urls: Array<string> = sitemap.extractUrls(
    await readFile('./dist/sitemap.xml')
  )

  await emptyDir('./qr-codes')

  return Promise.all(
    urls.map(async url =>
      highland(await generateQR(url)).pipe(
        createWriteStream(
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

main().catch((e: Error) => {
  throw e
})
