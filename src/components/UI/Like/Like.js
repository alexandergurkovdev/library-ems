import React, {Component, Fragment} from 'react';
import './styles.css';

class LikeButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      likesValue: this.props.likesValue,
    };
    this.addLike = this.addLike.bind(this);
    this.deleteLike = this.deleteLike.bind(this);
    this.likeAction = this.likeAction.bind(this);
  }

  addLike() {
    let newCount = this.state.likesValue + 1;
    this.setState({
      likesValue: newCount
    });
    this.props.likeBook(+this.props.bookId);
  }

  deleteLike() {
    let newCount = this.state.likesValue - 1;
    this.setState({
      likesValue: newCount
    });
    this.props.deleteLike(+this.props.bookId);
  }

  likeAction() {
    let likes = this.props.likes;
    let userId = this.props.userId;
    if (likes) {
      let index = likes.find(like => like.userId === userId);
      if (index) {
        this.deleteLike();
      } else {
        this.addLike();
      }
    } else {
      this.addLike();
    }
  }

  render() {
    const {likesValue} = this.state;
    const {likes} = this.props;

    if (likesValue === 0) {
      return (
        <button
          className="like-button"
          onClick={this.likeAction}
        >
          <i className="far fa-heart fa-lg" style={{ color: 'var(--color-textColor)' }}></i>
        </button>
      );
    }
    if (likesValue === 1) {
      return (
        <div className="like">
          <button
            className="like-button"
            onClick={this.likeAction}
          >
            <i className="fas fa-heart fa-lg" style={{ color: 'var(--color-errorRed)' }}></i>
          </button>
          {
            likes && likes.length === 1 ?
            <div className="like-users">
              Понравилось: <br/> <span>{likes[0].firstName} {likes[0].lastName}</span>
            </div> : null
          }
        </div>
      );
    }
    if (likesValue > 1) {
      return (
        <div className="like">
          <button
            className="like-button"
            onClick={this.likeAction}
          >
            <i className="fas fa-heart fa-lg" style={{ color: 'var(--color-errorRed)' }}></i> &nbsp;
            {likesValue}
          </button>
          {
            likes.length > 0 ?
            <div className="like-users">
              Понравилось: <br/>
              {
                likes.map((like, i) => {
                  let divider = i < likes.length - 1 && <Fragment>, </Fragment>;
                  return(
                    <Fragment>
                      <span key={i}>{like.firstName} {like.lastName}</span>
                      {divider}
                    </Fragment>
                  )
                })
              }
            </div> : null
          }
        </div>
      );
    }
  }
}

export default LikeButton;