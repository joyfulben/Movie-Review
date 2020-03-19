import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

import './css/bulma.min.css';
import './css/App.css';
import secret from './secret.js'
import MyMovies from './Components/MyMovies.js'
import UpdateForm from './Components/UpdateForm.js'
import NewForm from './Components/NewForm.js'
import NavBar from './Components/Navbar'

import SearchBar from './Components/SearchBar'
import MovieDisplay from './Components/ExternalMovieDisplay.js'
let baseURL = ''
let extURL = ''
if (process.env.NODE_ENV === 'development'){
  baseURL = secret.apikey
  extURL = secret.extkey
} else {
  baseURL = 'https://movie-critique.herokuapp.com/'
}

 export default class App extends React.Component{

   constructor(props){
     super(props)
     this.state = {
       externalMovies: [],
       storedMovies: []
     }
    this.handleAddExternal = this.handleAddExternal.bind(this)
    this.handleAddInternal = this.handleAddInternal.bind(this)
    this.getSavedMovies = this.getSavedMovies.bind(this)
    this.removeReview = this.removeReview.bind(this)
    this.updateReviewState = this.updateReviewState.bind(this)
    this.updateStarState = this.updateStarState.bind(this)
   }
   componentDidMount(){
     this.getSavedMovies()

   }
   async getSavedMovies(){
     try {
       let response = await fetch(extURL + '/reviews')
       let InternalData = await response.json()
       this.setState({storedMovies: InternalData})
     } catch (e) {
       console.error(e);
     }
   }
   async handleAddExternal(movie){
     try {
       console.log(movie);
       let updatedMovieList = movie
       this.setState({externalMovies: updatedMovieList})
     } catch (e) {
       console.error(e);
     }
   }
   async handleAddInternal(movie){
     console.log(movie);
     let updatedSavedList = [movie, ...this.state.storedMovies]
     this.setState({storedMovies: updatedSavedList})
   }
    async removeReview(id){
      try {
        const foundReview = this.state.storedMovies.findIndex(review =>
        review._id === id)
        const copyReviews = [...this.state.storedMovies]
        copyReviews.splice(foundReview, 1)
        this.setState({storedMovies: copyReviews})
    } catch (error) {
          console.error(error)
      }
    }
    async updateReviewState(updateReview){
      try {
        const foundReviewIndex = this.state.storedMovies.findIndex(foundReview => {
        return foundReview._id === updateReview._id
    })
        const copyReviews = [...this.state.storedMovies]
        let updatedReview = updateReview
        copyReviews[foundReviewIndex] = updatedReview
        this.setState({
            storedMovies: copyReviews
        })
      } catch (e) {
        console.error(e);
      }
    }
    async updateStarState(updateRating){
      try {
        const foundRatingIndex = this.state.storedMovies.findIndex(foundRating => {
        return foundRating._id === updateRating._id
    })
        const copyRatings = [...this.state.storedMovies]
        let updatedRating = updateRating
        copyRatings[foundRatingIndex] = updatedRating
        this.setState({
            storedMovies: copyRatings
        })
      } catch (e) {
        console.error(e);
      }
    }
render(){
  return(
    <>
<Router>
  <div>
    <NavBar />
    <Route exact path='/my_movies' component={() => <MyMovies storedMovies={this.state.storedMovies} extURL={extURL} toggleForm={this.toggleForm} updateReviewState={this.updateReviewState} updateStarState={this.updateStarState} removeReview={this.removeReview}
      />} />
    <Route path='/new' exact component={NewForm} />
    <Route exact path='/' component={() => <><SearchBar handleAddExternal={this.handleAddExternal} baseURL={baseURL} /><MovieDisplay externalMovies={this.state.externalMovies} extURL={extURL} handleAddInternal={this.handleAddInternal} /> </>
          } />
  </div>
    </Router>
   </>
 )}
}
