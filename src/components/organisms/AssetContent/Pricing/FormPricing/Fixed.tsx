import React, { ReactElement } from 'react'
import stylesIndex from './index.module.css'
import styles from './Fixed.module.css'
import FormHelp from '../../../../atoms/Input/Help'
import Conversion from '../../../../atoms/Price/Conversion'
import { useField } from 'formik'
import Input from '../../../../atoms/Input'
import Error from './Error'
import { DDO } from '@oceanprotocol/lib'
import { usePricing } from '@oceanprotocol/react'

export default function Fixed({
  ddo,
  content
}: {
  ddo: DDO
  content: any
}): ReactElement {
  const [field, meta] = useField('price')
  const { dtName, dtSymbol } = usePricing(ddo)

  return (
    <div className={styles.fixed}>
      <FormHelp className={stylesIndex.help}>{content.info}</FormHelp>

      <div className={styles.grid}>
        <div className={styles.form}>
          <Input
            label="Ocean Token"
            value={field.value}
            name="price"
            type="number"
            prefix="OCEAN"
            min="1"
            {...field}
            additionalComponent={
              <Conversion
                price={field.value}
                className={stylesIndex.conversion}
              />
            }
          />
          <Error meta={meta} />
        </div>
        <div className={styles.datatoken}>
          <h4>
            = <strong>1</strong> {dtName} — {dtSymbol}
          </h4>
        </div>
      </div>
    </div>
  )
}
