import { TextField } from '@mui/material';
import React from 'react'

const styles = {

}


export default class BasicField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <TextField
        style={{
          width: 250
        }}
        {...this.props}
      />
    )
  }
}
