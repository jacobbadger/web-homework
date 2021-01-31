import React, { Fragment } from 'react'
import { css } from '@emotion/core'
import { UserTable } from './user-table'

export function UserView () {
  // const [isI18nEnabled] = useState(window.location.search.includes('i18n=true'))

  const pageTitle = 'Users'

  return (
    <Fragment>
      <h1 css={paddingStyle}>
        { pageTitle }
        {/* {translateText(pageTitle, isI18nEnabled)} */}
      </h1>
      <div css={paddingStyle} >
        <UserTable isI18nEnabled={false} />
      </div>
    </Fragment>
  )
}

const paddingStyle = css`
  margin: 20px 50px 20px 50px;
`
