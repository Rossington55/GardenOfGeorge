import { DataGrid } from '@mui/x-data-grid';
import React from 'react'
import { apiGET } from '../generics/APIfunctions';
import Title from './Title';

const styles = {
  container: {
    height: 400,
  }
}


export default class Leaderboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }

  GETleaderboard = () => {
    const url = "leaderboard/getleaderboard"
    const callback = data => {
      //Error
      if (!data.success) {
        this.setState({
          data: []
        })
        return
      }

      //Add the id column
      this.setState({
        data: data.leaderboard
      })

    }

    apiGET(url, callback, { dataKey: "leaderboard", idKey: "rank" })
  }

  componentDidMount() {
    this.GETleaderboard();
  }

  render() {
    return (
      <article>

        <Title title="Leaderboard" />
        <article className='center fg' style={styles.container}>
          <DataGrid
            rows={this.state.data}
            columns={format}
            style={{
              color: "White"
            }}
          />

        </article>
      </article>
    )
  }
}


const format = [
  { field: "rank", headerName: "Rank" },
  { field: "username", headerName: "Username", flex: 1 },
  { field: "xp", headerName: "XP" },
]
