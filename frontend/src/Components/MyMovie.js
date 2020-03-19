import React from 'react'
import UpdateForm from './UpdateForm.js'
import StarRatingComponent from 'react-star-rating-component';


export default class MyMovie extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showPlot: false,
      review: '',
      rating: 0,
      showForm: false
    }
    this.toggleForm = this.toggleForm.bind(this)
    this.removeReview = this.removeReview.bind(this)
    this.updateReview = this.updateReview.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.togglePlot = this.togglePlot.bind(this)
    this.saveStar = this.saveStar.bind(this)
    }
    toggleForm(){
     this.setState({showForm: !this.state.showForm})
    }
    handleChange(event){
      this.setState({
          [event.target.name]: event.target.value
      })
    }
    togglePlot () {
      this.setState({showPlot: !this.state.showPlot})
    }
    onStarClick(nextValue, prevValue, name) {
   this.setState({rating: nextValue});
 }
    async saveStar(rating){
        console.log(rating);
    try{
      let response = await fetch(`${this.props.extURL}/reviews/${rating._id}`, {
        body: JSON.stringify(rating),
        method: 'PUT',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        }
      })
      let updatedRating = await response.json()
      this.props.updateStarState(updatedRating)
    } catch(e){
      console.log(e);
    }
  }
    async updateReview(event, review){
      console.log(review);
      event.preventDefault()
      try{
          let response = await fetch(`${this.props.extURL}/reviews/${review.id}`, {
              body: JSON.stringify(review),
              method: 'PUT',
              headers: {
                  'Accept': 'application/json, text/plain, */*',
                  'Content-Type': 'application/json',
                  'Access-Control-Allow-Origin': '*'
              }
          })
          let updateReview = await response.json()
          this.props.updateReviewState(updateReview)
      } catch(error){
          console.log(error);
      }
    }
    async removeReview (id){
      try{
          let response = await fetch(this.props.extURL + '/reviews/' + id, {
             method: 'DELETE'
         })
         let data = await response.json()
         this.props.removeReview(data._id)
         console.log(id);
     } catch(error){
         console.error(error);
     }
    }
  render(){
  const { rating } = this.state;
  console.log(this.props.movie);
    return(
      <>
          <div>
            <img src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${this.props.movie.poster_path}`} alt=""/>
            <div>
              <h2>{this.props.movie.title}</h2>
              <h2>{this.props.movie.review}</h2>
              <StarRatingComponent
               name="rate1"
               starCount={5}
               value={this.state.rating}
               onStarClick={() => {this.onStarClick.bind(this); this.saveStar(this.props.movie)}}/>
               {this.state.showForm ? <UpdateForm storedMovie={this.props.storedMovies[this.props.i]} updateReview={this.updateReview} review={this.state.review} toggleForm={this.toggleForm}/> : <div></div>}
               <h4 onClick={this.toggleForm}>Create Review</h4>
               <button onClick={()=>this.removeReview(this.props.movie._id)}>X</button>
            </div>
          </div>
      </>
    )
  }
 }
