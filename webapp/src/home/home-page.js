import React, { Fragment, useState } from 'react'
import { TxTable } from '../components/transactions/TxTable'
import { CreateTransaction } from '../components/transactions/create-transaction'
import { css } from '@emotion/core'
import { translateText } from '../utils/translation.util'

export function Home () {
  const [isI18nEnabled] = useState(window.location.search.includes('i18n=true'))

  const pageTitle = 'Transactions'
  const pageDescription = 'View all transactions that we have currently logged. You can add a new transaction by filling out the form on the left, as well as edit and delete already existing translations. You can also convert all existing amount values to roman numerals if desired!'
  return (
    <Fragment>
      <h1 css={paddingStyle}>
        { translateText(pageTitle, isI18nEnabled) }
      </h1>
      <h4 css={paddingStyle}>
        { translateText(pageDescription, isI18nEnabled) }
      </h4>
      <div css={mainStyle}>
        <div css={paddingStyle}>
          <CreateTransaction />
        </div>
        <div css={paddingStyle}>
          <TxTable css={paddingStyle} />
        </div>
      </div>
    </Fragment>
  )
}

const mainStyle = css`
  display: flex;
`

const paddingStyle = css`
  margin: 20px 50px 20px 50px;
`
