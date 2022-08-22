/*
PROPS
-----
open
onClose()
*/

import { Button, Dialog, DialogContent, TextField } from '@mui/material';
import React from 'react'
import { apiPOST } from '../generics/APIfunctions';
import BasicField from './BasicField';

const styles = {
  container: {
    height: 200
  },
  errMsg: {
    color: "red"
  }
}


export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      errMsg: "",
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

    }

    if (errMsg !== "") {
      this.handleError(errMsg)
      return
    }

    this.POSTLogin()
  }

  handleError = (msg) => {
    this.setState({
      errMsg: msg,
      username: "",
      password: "",
    })

  }

  handleClose = () => {
    this.setState({
      username: "",
      password: "",
      errMsg: ""
    })
    this.props.onClose()
  }

  POSTLogin() {
    const url = "user/login"
    const body = { username: this.state.username, password: btoa(this.state.password) }
    const callback = data => {
      if (!data.success) {
        this.handleError("Username or password is incorrect")
        return
      }
      localStorage.setItem("user", data.user.username)
      this.handleClose()
    }

    apiPOST(url, body, callback)

  }

  render() {

    return (
      <Dialog
        open={this.props.open}
        onClose={this.handleClose}
      >
        <DialogContent
          className='fg article itemsCenter around'
          style={styles.container}
        >
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

          {/*Submit */}
          <Button
            variant="outlined"
            style={{
              width: 250
            }}
            onClick={this.handleSubmit}
          >
            Login
          </Button>

          {/*Err Msg */}
          <span style={styles.errMsg}>{this.state.errMsg}</span>
        </DialogContent>
      </Dialog>
    )
  }
}
