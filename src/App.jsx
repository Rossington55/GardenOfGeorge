import { Container } from '@mui/material'
import React from 'react'
import Activity from './components/Activity'
import AddWin from './components/AddWin'
import Admin from './components/Admin'
import Leaderboard from './components/Leaderboard'
import NavBar from './components/NavBar'

const styles = {
  body: {
    marginTop: 20
  }
}

export default class App extends React.Component {

  constructor(props) {
    super(props)

    //Default leaderboard, if last page selected, use that
    let page = pages["leaderboard"]
    const lastPage = sessionStorage.getItem("lastPage")
    if (lastPage) {
      page = pages[lastPage]
    }

    this.state = {
      page: page
    }
  }

  handleMenuOption = (opt) => {
    sessionStorage.setItem("lastPage", opt)
    this.setState({
      page: pages[opt]
    })
  }

  render() {
    return (
      <article className='full bg'>
        {/*Header*/}
        <NavBar onClick={this.handleMenuOption} />

        {/*Body*/}
        <Container className='center article' style={styles.body}>
          {this.state.page}
        </Container>
      </article>
    )
  }
}

const pages = {
  leaderboard: <Leaderboard />,
  addWin: <AddWin />,
  activity: <Activity />,
  admin: <Admin />

}

