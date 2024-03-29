import React from 'react'
import { Link } from 'gatsby'
import shortid from 'shortid'
import slugify from 'slugify'
import styles from './Tags.module.css'

declare type TagsProps = {
  items: string[]
  max?: number
  showMore?: boolean
  className?: string
  noLinks?: boolean
}

const Tag = ({ tag, noLinks }: { tag: string; noLinks?: boolean }) => {
  // TODO: we should slugify all tags upon publish, so only
  // slug-style tags should be allowed.
  const cleanTag = slugify(tag).toLowerCase()

  return noLinks ? (
    <span className={styles.tag}>{cleanTag}</span>
  ) : (
    <Link to={`/search?tags=${tag}`} className={styles.tag} title={cleanTag}>
      {cleanTag}
    </Link>
  )
}

const Tags: React.FC<TagsProps> = ({
  items,
  max,
  showMore,
  className,
  noLinks
}) => {
  max = max || items.length
  const remainder = items.length - max
  const tags = items.slice(0, max)
  const shouldShowMore = showMore && remainder > 0
  const classes = className ? `${styles.tags} ${className}` : styles.tags

  return (
    <div className={classes}>
      {tags?.map((tag) => (
        <Tag tag={tag} noLinks={noLinks} key={shortid.generate()} />
      ))}
      {shouldShowMore && (
        <span className={styles.more}>{`+ ${items.length - max} more`}</span>
      )}
    </div>
  )
}

export default Tags
