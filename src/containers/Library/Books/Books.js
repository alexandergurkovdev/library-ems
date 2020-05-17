import React, { Component, Fragment } from 'react';
import { withAlert } from 'react-alert';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase';
import { Scrollbars } from 'react-custom-scrollbars';
import BookItem from './BookItem/BookItem';
import BooksFilter from './BooksFilter/BooksFilter';
import {booksFilter} from '../../../utils';
import styled from 'styled-components';
import Loader from '../../../components/UI/Loader/Loader';

const Row = styled.div `
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 2.2rem;
`;

class Books extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: booksFilter[0].value,
      search: ''
    };
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchItem = this.onSearchItem.bind(this);
    this.onFilterChange = this.onFilterChange.bind(this);
    this.filterItems = this.filterItems.bind(this);
  }

  onSearchChange(search) {
    this.setState({
      search
    });
  }

  onSearchItem(items, search) {
    if (search.length === 0) {
      return items;
    }

    return items.filter((item) => {
      return item.bookName.toLowerCase().indexOf(search.toLowerCase()) > -1;
    });
  }

  onFilterChange(filter) {
    this.setState({
      filter
    });
  }

  filterItems(items, filter) {
    if (filter === 'all') {
      return items;
    }
    return items.filter(item => item.category === filter);
  }

  render() {
    const {books, doc, userId, alert} = this.props;
    const {search, filter} = this.state;

    let content;

    if (!books) {
      content = (
        <Loader isAbsolute />
      );
    } else if (!books[doc] || !books[doc].books || books[doc].books.length === 0) {
      content = (
        null
      );
      alert.error('Не удалось загрузить список книг, пожалуйста перезагрузите страницу.');
    } else {
      content = (
        <Fragment>
          {
            books === null ? null :
            this.onSearchItem(this.filterItems(books[doc].books, filter), search).map((item) => {
              return(
                <BookItem userId={userId} key={item.id} book={item} />
              );
            })
          }
        </Fragment>
      )
    }
    
    return (
      <Fragment>
        <BooksFilter
          onSearchChange={this.onSearchChange}
          onFilterChange={this.onFilterChange}
          filter={filter}
        />
        <Scrollbars style={{height: 600,  width: '100%',}}>
          <Row>
            {content}
          </Row>
        </Scrollbars>
      </Fragment>
    )
  }
}

const mapStateToProps = ({firestore}) => ({
  doc: 'HcDMDWiNBUTVf5Urkid6',
  books: firestore.data.books,
});

export default withAlert()(compose(
  connect(mapStateToProps),
  firestoreConnect(props => [
    `books/${props.doc}`
  ])
)(Books));
