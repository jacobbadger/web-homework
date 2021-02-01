import { render } from '@testing-library/react'
import { TxTable } from './TxTable'
import { MockedProvider } from '@apollo/client/testing'
import { getTransactions } from '../../gql/transactions.gql'

describe('TxTable', () => {
  it('should render the TxTable ', () => {
    // const mocks = [
    //   {
    //     request: {
    //       query: getTransactions,
    //     },
    //     result: {
    //       data: {
    //         transactions: { id: '1', credit: true, debit: false, amount: 100, user_id: 2, merchant_id: 3, description: 'hello' },
    //       },
    //     },
    //   },
    // ];

    // render(<MockedProvider mocks={mocks}><TxTable isI18nEnabled={false} /></MockedProvider>)
  })
})
