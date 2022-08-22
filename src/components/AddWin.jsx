
import { MenuItem } from '@mui/material';
import React from 'react'
import { apiGET, apiPOST } from '../generics/APIfunctions';
import BasicButton from './BasicButton';
import BasicField from './BasicField';
import Title from './Title';

const styles = {
  container: {
    height: 300
  },
  verification: {
    height: 100
  }
}


export default class AddWin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      adversary: "",
      winnerVerified: false,
      loserVerified: false,
    }
  }

  handleAdversary = (ev) => {
    this.setState({
      adversary: ev.target.value
    })
  }

  handleVerify = (player) => {
    if (player === "winnerVerified") {
      if (this.state.loserVerified) {
        this.POSTsaveWin()
      }
    } else if (this.state.winnerVerified) {
      this.POSTsaveWin()
    }

    this.setState({
      [player]: true
    })
  }

  GETusers = () => {
    const url = `user/getusers?exclude=${localStorage.getItem("user")}`
    const callback = data => {
      let arr = []
      if (!data.success) { return }

      data = data.users
      for (let user of data) {
        arr.push(user.username)
      }

      this.setState({
        users: arr
      })

    }

    apiGET(url, callback)
  }

  POSTsaveWin = () => {
    const url = "game/creategame"
    const body = {
      winner: { username: localStorage.getItem("user") },
      loser: { username: this.state.adversary },
    }
    const callback = data => {
      sessionStorage.setItem("lastPage", "leaderboard")
      window.location.reload()
    }

    apiPOST(url, body, callback)

  }

  componentDidMount() {
    this.GETusers()
  }

  render() {
    const user = localStorage.getItem("user")

    return (
      <article>
        <Title title="Add Win" />

        <article className='fg itemsCenter around' style={styles.container}>
          {/*Adversary*/}
          <BasicField
            label="Adversary"
            select
            onChange={this.handleAdversary}
          >
            {this.state.users.map((user, i) => (
              <MenuItem value={user} key={i}>{user}</MenuItem>
            ))}
          </BasicField>

          {/*Verification*/}
          <article style={styles.verification} className="between">

            <BasicButton
              variant="outlined"
              disabled={this.state.winnerVerified}
              onClick={() => this.handleVerify("winnerVerified")}
            >
              {user} Verify
            </BasicButton>

            <BasicButton
              variant="outlined"
              color="secondary"
              disabled={this.state.adversary === "" || this.state.loserVerified}
              onClick={() => this.handleVerify("loserVerified")}
            >
              {this.state.adversary === "" ? "Enter Adversary" :
                `${this.state.adversary} Verify`
              }
            </BasicButton>
          </article>
        </article>

      </article>
    )
  }
}

const tempUsers = [
  "Harrison",
  "Jesse",
  "Connor",
  "Liam",
  "Finn",
  "Nathan",
]
