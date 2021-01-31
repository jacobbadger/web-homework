import React, { useState } from 'react'
import { bool } from 'prop-types'
import { deleteTransaction, getTransactions, updateTransaction } from '../../gql/transactions.gql'
import { getUsersQuery } from '../../gql/users.gql'
import { getMerchants } from '../../gql/merchants.gql'
import { useMutation, useQuery } from '@apollo/react-hooks'
import { css } from '@emotion/core'
import { convertToRomanNumeral } from '../../utils/romanNumerals.util'
import { translateText } from '../../utils/translation.util'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import CircularProgress from '@material-ui/core/CircularProgress'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import EditIcon from '@material-ui/icons/Edit'
import SaveIcon from '@material-ui/icons/Save'
import DeleteIcon from '@material-ui/icons/Delete'
import Switch from '@material-ui/core/Switch'

export function TxTable ({ isI18nEnabled }) {
  const [removeTransactionMutation] = useMutation(deleteTransaction, {
    update (cache, { data }) {
      const removedTransaction = data.deleteTransaction
      const { transactions } = cache.readQuery({
        query: getTransactions
      })
      const filteredTransactions = transactions.filter((item) => item.id !== removedTransaction.id)
      cache.writeQuery({
        query: getTransactions,
        data: {
          transactions: [
            ...filteredTransactions
          ]
        }
      })
    }
  })
  const [updateTransactionMutation] = useMutation(updateTransaction, {
    update (cache, { data }) {
      const updatedTransaction = data.updateTransaction
      const { transactions } = cache.readQuery({
        query: getTransactions
      })
      const edittedTransactions = transactions.map((item) => {
        return item.id === updatedTransaction.id ? updatedTransaction : item
      })
      cache.writeQuery({
        query: getTransactions,
        data: {
          transactions: [
            ...edittedTransactions
          ]
        }
      })
      setIsEditting(false)
    }
  })

  const { loading, error, data = {} } = useQuery(getTransactions)
  const { data: usersList } = useQuery(getUsersQuery)
  const { data: merchantsList } = useQuery(getMerchants)

  let usersMap = []
  if (usersList && usersList.users) {
    usersMap = usersList.users.reduce((map, obj) => {
      map[obj.id] = `${obj.firstName} ${obj.lastName}`
      return map
    }, {})
  }

  let merchantsMap = []
  if (merchantsList && merchantsList.merchants) {
    merchantsMap = merchantsList.merchants.reduce((map, obj) => {
      map[obj.id] = obj.name
      return map
    }, {})
  }

  const [isEditting, setIsEditting] = useState(false)
  const [editDescription, setEditDescription] = useState('')
  const [editAmount, setEditAmount] = useState('')
  const [isRoman, setIsRoman] = useState(false)

  const convertLabelText = 'Convert to Roman Numeral'

  if (loading) {
    return (
      <>
        <CircularProgress />
      </>
    )
  }

  if (error) {
    return (
      <>
        Failed to get transactions. Refresh page.
      </>
    )
  }

  return (
    <>
      <TableContainer component={Paper} css={tableStyle} >
        <Table aria-label='a dense table' size='small' >
          <TableHead>
            <TableRow>
              <TableCell>{translateText('User Name', isI18nEnabled)}</TableCell>
              <TableCell>{translateText('Description', isI18nEnabled)}</TableCell>
              <TableCell>{translateText('Merchant', isI18nEnabled)}</TableCell>
              <TableCell>{translateText('Debit/Credit', isI18nEnabled)}</TableCell>
              <TableCell>{translateText('Amount', isI18nEnabled)}</TableCell>
              <TableCell>{translateText('Edit', isI18nEnabled)}</TableCell>
              <TableCell>{translateText('Remove', isI18nEnabled)}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data && data.transactions &&
              data.transactions.map((row) => {
                const { id, user_id: userId, description, merchant_id: merchantId, debit, credit, amount } = row
                return (
                  <TableRow css={rowStyle} key={row.id}>
                    <TableCell component='th' scope='row'>
                      {translateText(usersMap[userId], isI18nEnabled)}
                    </TableCell>
                    <TableCell css={descriptionStyle} >
                      {isEditting === id ? (
                        <TextField onChange={(event) => { setEditDescription(event.target.value) }} value={editDescription} />
                      ) : (
                        <div>{translateText(description, isI18nEnabled) }</div>
                      )}
                    </TableCell>
                    <TableCell>{translateText(merchantsMap[merchantId], isI18nEnabled)}</TableCell>
                    <TableCell>{credit === true ? translateText('Credit', isI18nEnabled) : translateText('Debit', isI18nEnabled)}</TableCell>
                    <TableCell css={amountStyle}>
                      {isEditting === id ? (
                        <TextField onChange={(event) => { setEditAmount(event.target.value) }} value={editAmount} />
                      ) : (
                        <div>{ !isRoman ? amount : convertToRomanNumeral(amount)}</div>
                      )}
                    </TableCell>
                    <TableCell align='right' css={editIconStyle}>
                      {isEditting !== id ? (
                        <EditIcon
                          css={buttonStyle}
                          onClick={() => {
                            setIsEditting(id)
                            setEditDescription(description)
                            setEditAmount(amount)
                          }}
                        >
                          Edit
                        </EditIcon>
                      ) : (
                        <SaveIcon
                          onClick={() => {
                            const transaction = {
                              amount: +editAmount,
                              credit,
                              debit,
                              description: editDescription,
                              id,
                              merchantId: merchantId,
                              userId: userId
                            }
                            updateTransactionMutation({ variables: transaction })
                            setEditAmount('')
                            setEditDescription('')
                          }}
                        >
                          Save
                        </SaveIcon>
                      )}
                    </TableCell>
                    <TableCell>
                      <DeleteIcon
                        css={deleteStyle}
                        onClick={() => {
                          removeTransactionMutation({ variables: { id } })
                        }}
                      >
                        Delete
                      </DeleteIcon>
                    </TableCell>
                  </TableRow>
                )
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <div css={convertStyle}>
        { translateText(convertLabelText, isI18nEnabled) }
        <Switch
          checked={isRoman}
          color='primary'
          inputProps={{ 'aria-label': 'primary checkbox' }}
          name='checkedB'
          onChange={() => { setIsRoman(!isRoman) }}
        />
      </div>
    </>
  )
}

TxTable.propTypes = {
  isI18nEnabled: bool
}

const amountStyle = css`
  width: 80px;
  max-width: 80px;
  overflow: hidden;
`

const buttonStyle = css`
  min-width: 50px;
  max-width: 50px;
`

const deleteStyle = css`
  color: red;
`

const descriptionStyle = css`
  width: 166px;
`

const editIconStyle = css`
  max-width: 60px;
`

const convertStyle = css`
  float: right;
  max-width: 100%;
  padding-top: 15px;
`

const tableStyle = css`
  border: 3px solid black!important;
  border-radius: 15px;
  box-shadow: 5px 5px 10px #888888;
`

const rowStyle = css`
  height: 55px;
`
