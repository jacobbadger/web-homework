import React, { useState } from 'react'
import { bool } from 'prop-types'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { css } from '@emotion/core'
import { getUsersQuery, deleteUser, updateUser } from '../../gql/users.gql'
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

export function UserTable ({ isI18nEnabled }) {
  const { loading, error, data: usersList } = useQuery(getUsersQuery)
  const [deleteUserMutation] = useMutation(deleteUser, {
    update (cache, { data }) {
      const removedUser = data.deleteUser
      const { users } = cache.readQuery({
        query: getUsersQuery
      })
      const filteredUsers = users.filter((item) => item.id !== removedUser.id)
      cache.writeQuery({
        query: getUsersQuery,
        data: {
          users: [
            ...filteredUsers
          ]
        }
      })
    }
  })

  const [updateUserMutation] = useMutation(updateUser, {
    update (cache, { data }) {
      const updatedUser = data.updateUser
      const { users } = cache.readQuery({
        query: getUsersQuery
      })
      const edittedUsers = users.map((item) => {
        return item.id === updatedUser.id ? updatedUser : item
      })
      cache.writeQuery({
        query: getUsersQuery,
        data: {
          users: [
            ...edittedUsers
          ]
        }
      })
      setIsEditting(false)
    }
  })

  const [isEditting, setIsEditting] = useState(false)
  const [editFirstName, setEditFirstName] = useState('')
  const [editLastName, setEditLastName] = useState('')
  const [editDob, setEditDob] = useState('')

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
                    <TableCell css={cellStyle}>
                      {isEditting === id ? (
                        <TextField onChange={(event) => { setEditFirstName(event.target.value) }} value={editFirstName} />
                      ) : (
                        <div>{translateText(firstName, isI18nEnabled)}</div>
                      )}
                    </TableCell>
                    <TableCell css={cellStyle} >
                      {isEditting === id ? (
                        <TextField onChange={(event) => { setEditLastName(event.target.value) }} value={editLastName} />
                      ) : (
                        <div>{translateText(lastName, isI18nEnabled)}</div>
                      )}
                    </TableCell>
                    <TableCell css={cellStyle}>
                      {isEditting === id ? (
                        <TextField onChange={(event) => { setEditDob(event.target.value) }} value={editDob} />
                      ) : (
                        <div>{translateText(dob, isI18nEnabled)}</div>
                      )}
                    </TableCell>
                    <TableCell css={editIconStyle}>
                      {isEditting !== id ? (
                        <EditIcon
                          css={buttonStyle}
                          onClick={() => {
                            setIsEditting(id)
                            setEditFirstName(firstName)
                            setEditLastName(lastName)
                            setEditDob(dob)
                          }}
                        >
                          Edit
                        </EditIcon>
                      ) : (
                        <SaveIcon
                          onClick={() => {
                            const edittedUser = {
                              firstName: editFirstName,
                              lastName: editLastName,
                              id,
                              dob: editDob
                            }
                            updateUserMutation({ variables: edittedUser })
                            setIsEditting(false)
                            setEditFirstName('')
                            setEditLastName('')
                            setEditDob('')
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
                          deleteUserMutation({ variables: { id } })
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

const cellStyle = css`
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
