import React, { Fragment, useState } from 'react'
import { TxTable } from '../components/transactions/TxTable'
import { CreateTransaction } from '../components/transactions/create-transaction'
import { css } from '@emotion/core'
import { translateText } from '../utils/translation.util'
import { Link } from 'react-router-dom'

export function Home () {
  const [isI18nEnabled, setIsI18nEnabled] = useState(window.location.search.includes('i18n=true'))

  const pageTitle = 'Transactions'
  const pageDescription = 'View all transactions that we have currently logged. You can add a new transaction by filling out the form on the left, as well as edit and delete already existing translations. You can also convert all existing amount values to roman numerals if desired!'
  const translationText = 'Would you like to translate this page?'

  return (
    <Fragment>
      <h1 css={paddingStyle}>
        { translateText(pageTitle, isI18nEnabled) }
      </h1>
      <h4 css={paddingStyle}>
        { translateText(pageDescription, isI18nEnabled) }
      </h4>
      <Link css={paddingStyle} onClick={() => { setIsI18nEnabled(!isI18nEnabled) }} to={`/?i18n=${!isI18nEnabled}`} >
        { translateText(translationText, isI18nEnabled) }
      </Link>
      <div css={mainStyle}>
        <div css={paddingStyle}>
          <CreateTransaction isI18nEnabled={isI18nEnabled}/>
        </div>
        <div css={paddingStyle}>
          <TxTable css={paddingStyle} isI18nEnabled={isI18nEnabled} />
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
