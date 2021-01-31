import React, { Fragment } from 'react'
import { TxTable } from '../components/transactions/TxTable'
import { CreateTransaction } from '../components/transactions/create-transaction'
import { css } from '@emotion/core'

export function Home () {
  return (
    <Fragment>
      <h1 css={paddingStyle}>
        Transactions
      </h1>
      <h4 css={paddingStyle}>
        View all transactions that we have currently logged.
        You can add a new transaction by filling out the form on the left,
        as well as edit and delete already existing translations.
        You can also convert all existing amount values to roman numerals if desired!
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
