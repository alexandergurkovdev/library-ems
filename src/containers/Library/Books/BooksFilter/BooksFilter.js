import React, { Component } from 'react';
import {StyledInput} from '../../../../hoc/layout/elements';
import {booksFilter} from '../../../../utils';
import {FilterWrapper, Filter, FilterBtn} from './styles';

class BooksFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: ''
    };
    this.onTermChange = this.onTermChange.bind(this);
  }

  onTermChange = (e) => {
    const {onSearchChange = () => {}} = this.props;

    this.setState({
      term: e.target.value
    });

    onSearchChange(e.target.value);
  }

  render() {
    const {filter, onFilterChange} = this.props;

    return (
      <FilterWrapper>
        <Filter>
          {
            booksFilter.map((button) => {
              return(
                <FilterBtn
                  key={button.value}
                  className={filter === `${button.value}` ? 'active' : ''}
                  onClick={() => onFilterChange(button.value)}
                >
                  {button.label}
                </FilterBtn>
              )
            })
          }
        </Filter>
        <StyledInput
          onChange={(e) => this.onTermChange(e)}
          placeholder="Начните вводить название книги"
          value={this.state.term}
        />
      </FilterWrapper>
    )
  }
}

export default BooksFilter;
