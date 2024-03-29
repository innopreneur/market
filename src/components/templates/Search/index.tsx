import React, { ReactElement, useState, useEffect } from 'react'
import { QueryResult } from '@oceanprotocol/lib/dist/node/metadatacache/MetadataCache'
import SearchBar from '../../molecules/SearchBar'
import AssetList from '../../organisms/AssetList'
import styles from './index.module.css'
import queryString from 'query-string'
import { getResults } from './utils'
import Loader from '../../atoms/Loader'
import { useOcean } from '@oceanprotocol/react'

export declare type SearchPageProps = {
  text: string | string[]
  tag: string | string[]
  queryResult: QueryResult
}

export default function SearchPage({
  location
}: {
  location: Location
}): ReactElement {
  const { config } = useOcean()
  const parsed = queryString.parse(location.search)
  const { text, tags, page } = parsed
  const [queryResult, setQueryResult] = useState<QueryResult>()
  const [loading, setLoading] = useState<boolean>()

  useEffect(() => {
    async function initSearch() {
      setLoading(true)
      console.log(parsed)
      const queryResult = await getResults(parsed, config.metadataCacheUri)
      setQueryResult(queryResult)
      setLoading(false)
    }
    initSearch()
  }, [text, tags, page, config.metadataCacheUri])

  return (
    <section className={styles.grid}>
      <div className={styles.search}>
        {text && <SearchBar initialValue={text as string} />}
      </div>

      <div className={styles.results}>
        {loading ? <Loader /> : <AssetList queryResult={queryResult} />}
      </div>
    </section>
  )
}
