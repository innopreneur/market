import AssetTeaser from '../molecules/AssetTeaser'
import * as React from 'react'
import { DDO } from '@oceanprotocol/lib'
import ddo from '../../../tests/unit/__fixtures__/ddo'

export default {
  title: 'Molecules/Asset Teaser'
}

export const Default = () => (
  <AssetTeaser
    ddo={ddo as DDO}
    metadata={new DDO(ddo).findServiceByType('metadata').attributes as any}
  />
)
