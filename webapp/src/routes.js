import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { css } from '@emotion/core'
import { Home } from './home'
import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'
import Toolbar from '@material-ui/core/Toolbar'

function AppRouter () {
  return (
    <Router>
      <div css={layoutStyle}>
        <nav css={navStyle}>
          <AppBar css={navStyle} position='static'>
            <Toolbar>
              <Link to='/'>
                <img alt='' css={logoStyle} src='https://getdivvy.com/wp-content/uploads/2019/05/Divvy-Logo-19-White.png' />
              </Link>
              <Typography variant='h6' >
                <Link to='/another'>Another route</Link>
              </Typography>
            </Toolbar>
            {/* <ul >
              <li>
                <Link to='/'>Home</Link>
              </li>
              <li>
                <Link to='/another'>Another route</Link>
              </li>
            </ul> */}
          </AppBar>
        </nav>
        <div className='main-content' css={contentStyle}>
          <Route component={Home} exact path='/' />
          <Route component={() => (<div>Content for /another route</div>)} exact path='/another' />
        </div>
      </div>
    </Router>
  )
}

export default AppRouter

const layoutStyle = css`
    display: grid;
    grid-row-gap: 24px;
`

const logoStyle = css`
  height: 80px;
`

const navStyle = css`
  grid-row: 1;
  background-color: #e6e6e6;

  & > ul {
      display: flex;
      flex-direction: row;
      list-style-type: none;
  }

  & > ul > li:not(:first-of-type) {
    margin-left: 16px;
  }
`

const contentStyle = css`
  grid-row: 2;
`
