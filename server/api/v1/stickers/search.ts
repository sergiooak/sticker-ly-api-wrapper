import { mapSticker } from './utils'
import type { StickerSearchResponse } from './utils'

export default defineCachedEventHandler(async (event) => {
  const query = getQuery(event)
  // Strapi-style pagination
  const page = parseInt(query['pagination[page]'] as string) || 1
  const pageSize = parseInt(query['pagination[pageSize]'] as string) || 10
  const keyword = (query['keyword'] as string) || ''

  if (!keyword) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Keyword is required'
    })
  }

  // Parse keywor like: input => Atenção Pessoal!
  // output: atenção pessoal | atencao pessoal | atencao | pessoal | country:BR
  // is the original keyword but lowercased and removed things that is not a letter or number, tem separate byt pipe the samething but with accents removed, then split this second and put each word separeted by a pipe, and at the end add country:BR
  const lowercasedKeyword = keyword.trim().toLowerCase()
  // const lowercasedKeywordOnlyLettersAndNumbers = lowercasedKeyword.replace(/[^\p{L}\p{N}\s]/gu, '').trim()
  if (lowercasedKeyword.length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Keyword must contain at least one letter or number'
    })
  }
  const lowercasedKeywordWithoutAccents = lowercasedKeyword.normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim()
  const keywordParts = lowercasedKeywordWithoutAccents.split(/\s+/).filter(Boolean)
  const normalizedKeyword = keywordParts.join(' | ')
  const country = 'country:BR' // Default country code, can be changed based on
  const finalKeyword = `${lowercasedKeyword} | ${lowercasedKeywordWithoutAccents} | ${normalizedKeyword} | ${country}`

  // Calculate cursor and limit for sticker.ly API
  const cursor = page
  const limit = pageSize

  const apiBaseUrl = 'https://api.sticker.ly/'
  const version = 'v4'
  const endpoint = 'sticker/searchV2'
  const url = `${apiBaseUrl}${version}/${endpoint}`

  // request to the Sticker.ly API
  const response: StickerSearchResponse = await $fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'androidapp.stickerly/2.16.0 (G011A; U; Android 22; pt-BR; br;)'
    },
    body: {
      keyword: finalKeyword,
      size: pageSize,
      cursor,
      limit
    }
  })

  const stickers = response.result.stickers.map(mapSticker)

  // Calculate meta.pagination
  const total = response.result.size
  const pageCount = Math.ceil(total / pageSize)
  const meta = {
    keyword: {
      original: keyword,
      improved: finalKeyword
    },
    pagination: {
      page,
      pageSize,
      pageCount,
      total
    }
  }

  return useFormatter(true, `Found ${stickers.length} stickers for "${keyword}"`, stickers, { meta: meta })
}, { swr: true, maxAge: 60, staleMaxAge: 60 * 60 })
// 1 minute cache, 1 hour stale cache
