/*
  PROPS
  -----
  title
*/

import React from 'react'

const styles = {
  span: {
    fontSize: 50,
    fontWeight: "bold",
    fontFamily: "Brush Script MT",
    margin: "3%"
  }
}


export default class Title extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <span
        style={styles.span}
        className="selfCenter"
      >
        {this.props.title}
      </span>
    )
  }
}
