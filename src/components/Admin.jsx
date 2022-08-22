import { Alert, Button, Snackbar } from '@mui/material';
import React from 'react'
import BasicField from './BasicField';
import { apiPOST } from '../generics/APIfunctions'
import Title from './Title';

const styles = {
  container: {
    height: 350
  },
  errMsg: {
    color: "red"
  }
}


export default class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      confPassword: "",
      errMsg: "",
      snackbarOpen: false,
    }
  }

  handleChange = (ev) => {
    this.setState({
      [ev.target.name]: ev.target.value
    })
  }

  handleSubmit = () => {
    let errMsg = ""



    if (this.state.username === "") {
      errMsg = "Username is empty"

    } else if (this.state.password === "") {
      errMsg = "Password is empty"
    } else if (this.state.password !== this.state.confPassword) {
      errMsg = "Passwords do not match"
    }

    if (errMsg !== "") {
      this.handleError(errMsg)
      return
    }

    this.POSTcreateUser()
  }

  handleError = (msg) => {
    this.setState({
      errMsg: msg,
      username: "",
      password: "",
    })

  }

  POSTcreateUser() {
    const url = "user/createuser"
    const body = {
      username: this.state.username,
      password: btoa(this.state.password)
    }

    const callback = data => {
      if (!data.success) {
        this.setState({
          errMsg: data.message
        })
        return
      } else {
        this.setState({
          errMsg: "",
          username: "",
          password: "",
          confPassword: "",
          snackbarOpen: true,
        })

      }
    }
    apiPOST(url, body, callback)
  }

  render() {
    return (
      <article>
        <Title title="Admin" />

        <article className='fg itemsCenter around' style={styles.container}>
          {/*Username*/}
          <BasicField
            name="username"
            label="Username"
            value={this.state.username}
            onChange={this.handleChange}
          />

          {/*Password*/}
          <BasicField
            name="password"
            label="Password"
            type="password"
            value={this.state.password}
            onChange={this.handleChange}
          />

          {/*Password*/}
          <BasicField
            name="confPassword"
            label="Confirm Password"
            type="password"
            value={this.state.confPassword}
            onChange={this.handleChange}
          />

          {/*Submit */}
          <Button
            variant="outlined"
            style={{
              width: 250
            }}
            onClick={this.handleSubmit}
          >
            Create User
          </Button>

          {/*Err Msg */}
          <span style={styles.errMsg}>{this.state.errMsg}</span>

          {/*Success*/}
          <Snackbar
            open={this.state.snackbarOpen}
            autoHideDuration={3000}
            onClose={() => this.setState({ snackbarOpen: false })}
          >
            <Alert severity='success'>
              {`User created!`}
            </Alert>
          </Snackbar>
        </article>

      </article>
    )
  }
}
