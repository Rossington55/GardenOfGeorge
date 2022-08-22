/*
PROPS
-----
onClick(pageName)
*/

import { Menu as MenuIcon } from '@mui/icons-material';
import { Avatar, Button, IconButton, Menu, MenuItem } from '@mui/material';
import React from 'react'
import Login from './Login';

const styles = {
  container: {
    height: 50
  },
  avatar: {
    marginRight: "2%"
  }
}


export default class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false,
      menuAnchor: null,
      loginOpen: false,
      userMenuOpen: false,
      userMenuAnchor: null,
    }
  }

  handleMenuOpen = (ev) => {
    if (!ev) { ev = {} }
    this.setState({
      menuOpen: !this.state.menuOpen,
      menuAnchor: ev.target
    })
  }

  handleLoginOpen = () => {
    this.setState({
      loginOpen: !this.state.loginOpen
    })
  }

  handleUserOpen = (ev) => {
    this.setState({
      userMenuAnchor: ev.target,
      userMenuOpen: !this.state.userMenuOpen
    })
  }

  handleMenuOption = (opt) => {
    this.props.onClick(opt)
    this.handleMenuOpen()
  }

  handleLogout = () => {
    localStorage.removeItem("user")
    this.props.onClick("leaderboard")
    this.setState({
      userMenuOpen: false
    })
  }


  render() {
    const user = localStorage.getItem("user")

    return (
      <section style={styles.container} className="fullWidth fg between itemsCenter">
        {/*Menu open */}
        {user ?
          <IconButton onClick={this.handleMenuOpen}>
            <MenuIcon />
          </IconButton>
          :
          <div />
        }

        {/*Menu options*/}
        <Menu
          open={this.state.menuOpen}
          onClose={this.handleMenuOpen}
          anchorEl={this.state.menuAnchor}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left'
          }}
        >
          <MenuItem onClick={() => this.handleMenuOption("leaderboard")}>Leaderboard</MenuItem>
          <MenuItem onClick={() => this.handleMenuOption("activity")}>Activity</MenuItem>
          {user === "RedLotus" &&
            <MenuItem onClick={() => this.handleMenuOption("admin")}>Admin</MenuItem>
          }
          <MenuItem onClick={() => this.handleMenuOption("addWin")}>Add Win</MenuItem>
        </Menu>




        {/*User open buttons*/}
        {user ?
          <Avatar
            style={styles.avatar}
            onClick={this.handleUserOpen}
          >
            {user[0].toUpperCase()}
          </Avatar>
          :
          <Button onClick={this.handleLoginOpen}>Login</Button>
        }



        {/*User Options*/}
        <Menu
          open={this.state.userMenuOpen}
          anchorEl={this.state.userMenuAnchor}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left'
          }}
          onClose={this.handleUserOpen}
        >
          <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
        </Menu>



        {/*Login*/}
        <Login
          open={this.state.loginOpen}
          onClose={this.handleLoginOpen}
        />
      </section>
    )
  }
}
