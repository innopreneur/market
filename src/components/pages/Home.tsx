import React, { ReactElement, useEffect, useState } from 'react'
import SearchBar from '../molecules/SearchBar'
import styles from './Home.module.css'
import { MetadataCache, Logger } from '@oceanprotocol/lib'
import AssetList from '../organisms/AssetList'
import {
  QueryResult,
  SearchQuery
} from '@oceanprotocol/lib/dist/node/metadatacache/MetadataCache'
import Container from '../atoms/Container'
import Loader from '../atoms/Loader'
import { useOcean } from '@oceanprotocol/react'

const queryHighest = {
  page: 1,
  offset: 3,
  query: { 'price.type': ['pool'] },
  sort: { 'price.ocean': -1 }
}

const queryPoolsLatest = {
  page: 1,
  offset: 6,
  query: { 'price.type': ['pool'] },
  sort: { created: -1 }
}

const queryLatest = {
  page: 1,
  offset: 9,
  query: {},
  sort: { created: -1 }
}

async function getAssets(query: SearchQuery, metadataCacheUri: string) {
  try {
    const metadataCache = new MetadataCache(metadataCacheUri, Logger)
    const result = await metadataCache.queryMetadata(query)

    return result
  } catch (error) {
    Logger.error(error.message)
  }
}

export default function HomePage(): ReactElement {
  const { config } = useOcean()
  const [queryResultLatest, setQueryResultLatest] = useState<QueryResult>()
  const [queryResultPoolsLatest, setQueryResultPoolsLatest] = useState<
    QueryResult
  >()
  const [queryResultHighest, setQueryResultHighest] = useState<QueryResult>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function init() {
      const queryResultHighest = await getAssets(
        queryHighest,
        config.metadataCacheUri
      )
      setQueryResultHighest(queryResultHighest)

      const queryResultPoolsLatest = await getAssets(
        queryPoolsLatest,
        config.metadataCacheUri
      )
      setQueryResultPoolsLatest(queryResultPoolsLatest)

      const queryResultLatest = await getAssets(
        queryLatest,
        config.metadataCacheUri
      )
      setQueryResultLatest(queryResultLatest)
      setLoading(false)
    }
    init()
  }, [config.metadataCacheUri])

  return (
    <>
      <Container narrow className={styles.searchWrap}>
        <SearchBar />
      </Container>

      <section className={styles.latest}>
        <h3>Highest Liquidity Pools</h3>
        {loading ? (
          <Loader />
        ) : (
          queryResultHighest && <AssetList queryResult={queryResultHighest} />
        )}
      </section>

      <section className={styles.latest}>
        <h3>New Liquidity Pools</h3>
        {loading ? (
          <Loader />
        ) : (
          queryResultPoolsLatest && (
            <AssetList queryResult={queryResultPoolsLatest} />
          )
        )}
      </section>

      <section className={styles.latest}>
        <h3>New Data Sets</h3>
        {loading ? (
          <Loader />
        ) : (
          queryResultLatest && <AssetList queryResult={queryResultLatest} />
        )}
      </section>
    </>
  )
}
