import { Button } from '@mui/material'
import React from 'react'
export default class BasicButton extends React.Component {

  render() {
    return (
      <Button
        {...this.props}
        style={{
          width: 250
        }}
      />
    )
  }
}
