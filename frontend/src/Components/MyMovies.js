import React from 'react'
import MyMovie from './MyMovie'

  export default class MyMovies extends React.Component {
    render(){
      return(
        <>
        {this.props.storedMovies.length === 0 ?
          <div><h2>You don't have any reviewed movies yet!</h2></div>
          :
          <div className="my-index">
          {this.props.storedMovies.map((movie, i)=> {
            return (
            <MyMovie movie={movie} i={i} storedMovies={this.props.storedMovies} extURL={this.props.extURL} toggleForm={this.props.toggleForm} updateReviewState={this.props.updateReviewState} updateStarState={this.props.updateStarState} removeReview={this.props.removeReview}/>
        )
      })}
      </div>
    }
        </>
      )
    }
  }
