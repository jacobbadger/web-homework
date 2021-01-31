import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import { bool } from 'prop-types'
import Button from '@material-ui/core/Button'
import InputLabel from '@material-ui/core/InputLabel'
import { css } from '@emotion/core'
import { useMutation } from '@apollo/react-hooks'
import { createUser, getUsersQuery } from '../../gql/users.gql'
import { translateText } from '../../utils/translation.util'

export function CreateUser ({ isI18nEnabled }) {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [dob, setDob] = useState('')

  const [createUserMutation] = useMutation(createUser, {
    update (cache, { data }) {
      const createdUser = data.createUser
      const { users } = cache.readQuery({
        query: getUsersQuery
      })
      cache.writeQuery({
        query: getUsersQuery,
        data: {
          users: [
            ...users,
            createdUser
          ]
        }
      })
    }
  })

  const isButtonDisabled = firstName !== '' && lastName !== '' && dob !== ''

  return (
    <>
      <div css={containerStyle}>
        <div css={titleStyle} >
          {translateText('NEW USER', isI18nEnabled)}
        </div>
        <div>
          <InputLabel css={inputLabelStyle}>{translateText('First Name', isI18nEnabled)}</InputLabel>
          <TextField
            css={widthStyle}
            onChange={(event) => {
              setFirstName(event.target.value)
            }}
            value={firstName}
            variant='filled'
          />
          <InputLabel css={inputLabelStyle}>{translateText('Last Name', isI18nEnabled)}</InputLabel>
          <TextField
            css={widthStyle}
            id='lastName-field'
            multiline
            onChange={(event) => {
              setLastName(event.target.value)
            }}
            value={lastName}
            variant='filled'
          />
          <InputLabel css={inputLabelStyle}>{translateText('Birthday', isI18nEnabled)}</InputLabel>
          <TextField
            css={widthStyle}
            id='birthday-field'
            multiline
            onChange={(event) => {
              setDob(event.target.value)
            }}
            value={dob}
            variant='filled'
          />
        </div>
        <div css={buttonStyle} >
          <Button
            disabled={!isButtonDisabled}
            onClick={() => {
              const newUser = {
                firstName,
                lastName,
                dob
              }
              createUserMutation({ variables: newUser })
              setFirstName('')
              setLastName('')
              setDob('')
            }}
            variant='outlined'
          >
            {translateText('ADD USER', isI18nEnabled)}
          </Button>
        </div>
      </div>
    </>
  )
}

CreateUser.propTypes = {
  isI18nEnabled: bool
}

const containerStyle = css`
  border: 3px solid black!important;
  border-radius: 15px;
  box-shadow: 5px 5px 10px #888888;
  max-width: 300px;
  min-width: 300px;
  padding: 15px;
`

const buttonStyle = css`
  background-color: white;
  color: black;
  padding-left: 5px;
  padding-top: 30px;
`

const inputLabelStyle = css`
  margin-left: 5px;
  padding-top: 13px;
  color: black;
`
const titleStyle = css`
  padding: 15px 10px 15px 5px;
  font-weight: bold;
`

const widthStyle = css`
  margin-left: 5px;
  padding-right:5px;
  width: 100%;
`
