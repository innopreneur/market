import {
  SearchQuery,
  QueryResult
} from '@oceanprotocol/lib/dist/node/metadatacache/MetadataCache'
import { MetadataCache, Logger } from '@oceanprotocol/lib'

export function getSearchQuery(
  page?: string | string[],
  offset?: string | string[],
  text?: string | string[],
  tags?: string | string[]
): SearchQuery {
  return {
    page: Number(page) || 1,
    offset: Number(offset) || 20,
    query: {
      text,
      tags: tags ? [tags] : undefined
    },
    sort: {
      created: -1
    }

    // Something in squid-js is weird when using 'tags: [tag]'
    // which is the only way the query actually returns desired results.
    // But it doesn't follow 'SearchQuery' interface so we have to assign
    // it here.
  } as SearchQuery
}

export async function getResults(
  params: { text?: string; tags?: string; page?: string; offset?: string },
  metadataCacheUri: string
): Promise<QueryResult> {
  const { text, tags, page, offset } = params

  const metadataCache = new MetadataCache(metadataCacheUri, Logger)
  const sQuery = getSearchQuery(page, offset, text, tags)
  console.log(sQuery)
  const queryResult = await metadataCache.queryMetadata(
    getSearchQuery(page, offset, text, tags)
  )

  return queryResult
}
