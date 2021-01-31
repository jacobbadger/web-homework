import React, { useState } from 'react'
import { bool } from 'prop-types'
import { useQuery } from '@apollo/react-hooks'
import { css } from '@emotion/core'
import { getUsersQuery } from '../../gql/users.gql'
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

// const makeDataTestId = (transactionId, fieldName) => `transaction-${transactionId}-${fieldName}`

export function UserTable ({ isI18nEnabled }) {
  const { loading, error, data: usersList } = useQuery(getUsersQuery)

  // const [removeTransactionMutation] = useMutation(deleteTransaction, {
  //   update (cache, { data }) {
  //     const removedTransaction = data.deleteTransaction
  //     const { transactions } = cache.readQuery({
  //       query: getTransactions
  //     })
  //     const filteredTransactions = transactions.filter((item) => item.id !== removedTransaction.id)
  //     cache.writeQuery({
  //       query: getTransactions,
  //       data: {
  //         transactions: [
  //           ...filteredTransactions
  //         ]
  //       }
  //     })
  //   }
  // })
  // const [updateTransactionMutation] = useMutation(updateTransaction, {
  //   update (cache, { data }) {
  //     const updatedTransaction = data.updateTransaction
  //     const { transactions } = cache.readQuery({
  //       query: getTransactions
  //     })
  //     const edittedTransactions = transactions.map((item) => {
  //       return item.id === updatedTransaction.id ? updatedTransaction : item
  //     })
  //     cache.writeQuery({
  //       query: getTransactions,
  //       data: {
  //         transactions: [
  //           ...edittedTransactions
  //         ]
  //       }
  //     })
  //     setIsEditting(false)
  //   }
  // })

  const [isEditting, setIsEditting] = useState(false)
  const [editDescription, setEditDescription] = useState('')

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
              <TableCell>{translateText('First Name', isI18nEnabled)}</TableCell>
              <TableCell>{translateText('Last Name', isI18nEnabled)}</TableCell>
              <TableCell>{translateText('Birthday', isI18nEnabled)}</TableCell>
              <TableCell>{translateText('Edit', isI18nEnabled)}</TableCell>
              <TableCell>{translateText('Remove', isI18nEnabled)}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usersList && usersList.users &&
              usersList.users.map((row) => {
                const { id, firstName, lastName, dob } = row
                return (
                  <TableRow css={rowStyle} key={row.id}>
                    <TableCell component='th' scope='row'>
                      {firstName}
                    </TableCell>
                    <TableCell css={descriptionStyle} >
                      {isEditting === id ? (
                        <TextField onChange={(event) => { setEditDescription(event.target.value) }} value={editDescription} />
                      ) : (
                        <div>{translateText(lastName, isI18nEnabled)}</div>
                      )}
                    </TableCell>
                    <TableCell>{dob}</TableCell>
                    <TableCell css={editIconStyle}>
                      {isEditting !== id ? (
                        <EditIcon
                          css={buttonStyle}
                          onClick={() => {
                            setIsEditting(id)
                          }}
                        >
                          Edit
                        </EditIcon>
                      ) : (
                        <SaveIcon
                          onClick={() => {}}
                        >
                          Save
                        </SaveIcon>
                      )}
                    </TableCell>
                    <TableCell>
                      <DeleteIcon
                        css={deleteStyle}
                        onClick={() => {
                          // removeTransactionMutation({ variables: { id } })
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
    </>
  )
}

UserTable.propTypes = {
  isI18nEnabled: bool
}

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

const tableStyle = css`
  border: 3px solid black!important;
  border-radius: 15px;
  box-shadow: 5px 5px 10px #888888;
`

const rowStyle = css`
  height: 55px;
`
