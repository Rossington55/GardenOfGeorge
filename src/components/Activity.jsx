import { Alert, Button, List, ListItem, ListItemButton, ListItemText, Snackbar } from '@mui/material';
import { toUnitless } from '@mui/material/styles/cssUtils';
import moment from 'moment';
import React from 'react'
import { apiGET } from '../generics/APIfunctions';
import Title from './Title';

const styles = {
  container: {
    marginTop: "1%"
  }
}


export default class Activity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      snackbarOpen: false,
      games: [],
      disputedId: 0,
    }
  }

  handleDispute = (game) => {
    this.setState({
      snackbarOpen: true,
      disputedId: game.id
    })
  }


  GETGames = () => {
    const url = "game/getgames"
    const callback = data => {
      if (!data.success) { return }


      this.setState({
        games: data.games
      })
    }

    apiGET(url, callback)
  }

  componentDidMount() {
    this.GETGames()
  }

  render() {
    const user = localStorage.getItem("user")

    return (
      <article>
        <Title title="Activity" />

        <article className='fg' style={styles.container}>
          <List>
            {this.state.games.map((game, i) => (
              <ListItem
                key={i}
              // secondaryAction={
              //   game.loser.username === user &&
              //   <Button
              //     variant="outlined"
              //     color="error"
              //     onClick={() => this.handleDispute(game)}
              //   >
              //     Dispute
              //   </Button>
              // }
              >
                <ListItemText primary={moment(game.timestamp).format("DD/MM/yy HH:mm")} />
                <ListItemText primary={`${game.winner.username} Outgrew ${game.loser.username}`} />
              </ListItem>
            ))}
          </List>

          {/*Snackbar */}
          <Snackbar
            open={this.state.snackbarOpen}
            autoHideDuration={3000}
            onClose={() => this.setState({ snackbarOpen: false })}
          >
            <Alert severity='success'>
              {`Game ${this.state.disputedId} dispute filed`}
            </Alert>
          </Snackbar>
        </article>
      </article>
    )
  }
}

const tempData = [
  { id: 1, winner: "Harrison", loser: "Jesse" },
  { id: 2, winner: "Connor", loser: "Harrison" },
  { id: 3, winner: "Finn", loser: "Liam" },
  { id: 4, winner: "Liam", loser: "Finn" },
]
