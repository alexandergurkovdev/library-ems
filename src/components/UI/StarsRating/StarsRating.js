import React, { Component, Fragment } from 'react';
import StarRatingComponent from 'react-star-rating-component-unsafe';
import './styles.css';

class StarsRating extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: this.props.value,
    };
  }
 
  render() {
    let {rating} = this.state;

    return (            
      <Fragment>
        <StarRatingComponent 
          name="rate2" 
          starCount={5}
          editing={false}
          value={+rating}
          starColor='#ffa800'
        />
      </Fragment>
    );
  }
}

export default StarsRating;
