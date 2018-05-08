// @flow

import path from 'path'
import {readFile, emptyDir, createWriteStream, copy} from 'fs-extra'
import convexqr from 'convexqr'
import highland from 'highland'
import sitemap from 'sitemap-urls'
import yaml from 'js-yaml'
import typeof Data from '../src/data/content.yml'
import {findByName} from '../src/util/data'

const getThumbnail = item => (item.type === 'image' ? item.src : item.thumb)

const generateQR = (text: string): Promise<stream$Readable> =>
  new Promise(resolve => convexqr({text}, resolve))

const main = async () => {
  const urls: Array<string> = sitemap.extractUrls(
    await readFile('./dist/sitemap.xml')
  )

  const data: Data = yaml.safeLoad(await readFile('./src/data/content.yml'))

  await emptyDir('./qr-codes')

  return Promise.all(
    urls.map(async url => {
      const slug = url
        .replace('https://www.arcpublications.co.uk/orbita', '')
        .replace(/\W/g, '-')
        .slice(1, -1)
        .replace(/^$/, 'home')

      const name = slug
        .split('-')
        .slice(1)
        .join('-')

      const item = findByName(data, name)

      await emptyDir(`./qr-codes/${slug}`)

      await item
        .map(getThumbnail)
        .map(thumb => `./public/assets/images/${thumb}`)
        .map(src => copy(src, `./qr-codes/${slug}/${path.basename(src)}`))
        .orJust(null)

      return highland(await generateQR(url)).pipe(
        createWriteStream(`./qr-codes/${slug}/QR.png`)
      )
    })
  )
}

main().catch((e: Error) => {
  console.error(e)
  process.exit(1)
})
