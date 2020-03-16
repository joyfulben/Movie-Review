import React from 'react';


export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
    this.addMovie = this.addMovie.bind(this)
  }
  async addMovie () {
    try{
      let response = await fetch(baseURL + '/movies', {
        method: 'POST',
        body: JSON.stringify({
          title: this.state.movieExternal[i].title,
          released: this.state.movieExternal[i].released,
          rated: this.state.movieExternal[i].rated,
          genre: this.state.movieExternal[i].genre,
          director: this.state.movieExternal[i].director,
          actors: this.state.movieExternal[i].actors,
          plot: this.state.movieExternal[i].plot,
          poster: this.state.movieExternal[i].poster,
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      let data = await response.json()
      const myMovies = [data, ...this.state.myMovieList]
      this.setState({
        myMovieList: myMovies,
        title: '',
        released: '',
        rated: '',
        genre: '',
        director: '',
        actors : [],
        plot: '',
        poster: ''
      })
    }catch(e){
      console.error({'Error': e})
    }
  }
  render() {
    return(
      <>

      </>

    )
  }
}