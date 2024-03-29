import { MetadataMarket, MetadataPublishForm } from '../../../@types/MetaData'
import { toStringNoMS } from '../../../utils'
import AssetModel from '../../../models/Asset'

export function transformPublishFormToMetadata(
  data: Partial<MetadataPublishForm>
): MetadataMarket {
  const currentTime = toStringNoMS(new Date())

  const {
    name,
    author,
    license,
    description,
    copyrightHolder,
    tags,
    links,
    termsAndConditions,
    files
  } = data

  const metadata: MetadataMarket = {
    main: {
      ...AssetModel.main,
      name,
      author,
      dateCreated: currentTime,
      datePublished: currentTime,
      files: typeof files !== 'string' && files,
      license
    },
    additionalInformation: {
      ...AssetModel.additionalInformation,
      description,
      copyrightHolder,
      tags: tags?.split(','),
      links: typeof links !== 'string' && links,
      termsAndConditions
    }
  }

  return metadata
}
