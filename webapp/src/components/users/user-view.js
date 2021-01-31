import React, { Fragment, useState } from 'react'
import { css } from '@emotion/core'
import { UserTable } from './user-table'
import { CreateUser } from './create-user'
import { translateText } from '../../utils/translation.util'
import { Link } from 'react-router-dom'

export function UserView () {
  const [isI18nEnabled, setIsI18nEnabled] = useState(window.location.search.includes('i18n=true'))

  const pageTitle = 'Users'
  const pageDescription = 'Welcome to the Users page! Feel view to view all the users currently stored in the database or create your own, as well as edit their names! You can also delete a user, but only if they are not currently tied to an existing transaction. '
  const translationText = 'Would you like to translate this page?'

  return (
    <Fragment>
      <h1 css={paddingStyle}>
        { translateText(pageTitle, isI18nEnabled) }
      </h1>
      <h4 css={paddingStyle} >
        { translateText(pageDescription, isI18nEnabled) }
      </h4>
      <Link css={paddingStyle} onClick={() => { setIsI18nEnabled(!isI18nEnabled) }} to={`/users?i18n=${!isI18nEnabled}`} >
        {translateText(translationText, isI18nEnabled)}
      </Link>
      <div css={mainStyle} >
        <div css={paddingStyle} >
          <CreateUser isI18nEnabled={isI18nEnabled} />
        </div>
        <div css={paddingStyle} >
          <UserTable isI18nEnabled={isI18nEnabled} />
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
