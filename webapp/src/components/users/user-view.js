import React, { Fragment } from 'react'
import { css } from '@emotion/core'
import { UserTable } from './user-table'
import { CreateUser } from './create-user'

export function UserView () {
  // const [isI18nEnabled] = useState(window.location.search.includes('i18n=true'))

  const pageTitle = 'Users'
  const pageDescription = 'Welcome to the Users page! Feel view to view all the users currently stored in the database or create your own, as well as edit their names! You can also delete a user, but only if they are not currently tied to an existing transaction. '

  return (
    <Fragment>
      <h1 css={paddingStyle}>
        { pageTitle }
        {/* {translateText(pageTitle, isI18nEnabled)} */}
      </h1>
      <h4 css={paddingStyle} >
        { pageDescription }
      </h4>
      <div css={mainStyle} >
        <div css={paddingStyle} >
          <CreateUser isI18nEnabled={false} />
        </div>
        <div css={paddingStyle} >
          <UserTable isI18nEnabled={false} />
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
