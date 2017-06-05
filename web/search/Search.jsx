import React, {Component, PropTypes} from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import CircularProgress from 'material-ui/CircularProgress';
import {autobind} from 'core-decorators';
import '../../helpers/rop';

class Search extends Component {
  @autobind
  handleSearch(searchCriteria) {
    this.props.startSearch(searchCriteria);
  }

  renderSearchBox() {
    return <AutoComplete
      fullWidth={true}
      dataSource={[]}
      hintText="Enter your tags"
      floatingLabelText="Search for..."
      onNewRequest={this.handleSearch} />
  }

  renderResults(searchResults) {
    return searchResults.matchWith({
      Just: ({value: result}) => <div>{result.title}</div>,
      Nothing: () => <div>No results available</div>
    })
  }

  renderSearchResults() {
    const {search} = this.props;

    return (
      <div>
        {
          search.get('searchResults').matchWith({
            Empty: () => <div></div>,
            Loading: () => <div><CircularProgress size={80} thickness={5} /></div>,
            Success: ({data: searchResults}) => this.renderResults(searchResults),
            Failure: ({error}) => <div>{error.message}</div>
          })
        }
      </div>
    )
  }

  render() {
    return (
      <section>
        {this.renderSearchBox()}
        {this.renderSearchResults()}
      </section>
    )
  }
}

export default Search;
