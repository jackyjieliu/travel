import * as React from 'react';
import { connect } from 'react-redux';
import { State } from '../reducers/state';
import { withRouter } from 'react-router-dom';
import * as H from 'history';
import * as queryString from 'query-string';
import { updateSearchTerm, updateDays, startSearch, loadMoreDetails,
  SearchResult, ResultDetail } from '../actions/search-action';
import Spinner from '../components/Spinner';
import Result from '../components/Result';
import SearchResultTitle from '../components/SearchResultTitle';
import RaisedButton from 'material-ui/RaisedButton';

interface StateProps {
  searching: boolean;
  loadingDetails: boolean;
  results: SearchResult[];
  resultDetail: { [key: string]: ResultDetail };
  travelingFrom: string;
  days: number | undefined;
  query: string;
}

interface RouterProps {
  history: H.History;
}

interface DispatchProps {
  updateSearchTerm: (query: string) => void;
  updateDays: (days?: number) => void;
  loadMore: (idx: number) => void;
  search: () => void;
}

class SearchResultScreen extends React.Component<StateProps & RouterProps & DispatchProps> {
  componentDidMount() {
    const search = this.props.history.location.search;
    const params = queryString.parse(search);
    this.props.updateSearchTerm(params.query);
    this.props.updateDays(params.days);
    this.props.search();
  }

  loadMore(idx: number) {
    this.props.loadMore(idx);
  }

  render() {
    let spinner;
    let smallSpinner;
    let results;
    let title;
    let loadMoreButton;

    if (!this.props.searching) {
      const resultsWithDetails = this.props.results.filter((result) => {
        return !!this.props.resultDetail[result.name];
      });
      results = resultsWithDetails.map((result) => {
        const detail = this.props.resultDetail[result.name];
        return (
          <div key={result.name} style={{ marginBottom: 14 }}>
            <Result result={result} detail={detail}/>
          </div>);
      });
      title = (<SearchResultTitle place={this.props.travelingFrom} days={this.props.days} query={this.props.query}/>);
    }

    if (!results || results.length === 0) {
      spinner = (<Spinner/>);
    } else {
      if (this.props.loadingDetails) {
        smallSpinner = (<Spinner type="small" marginTop={0} />);
      } else if (results.length < this.props.results.length) {
        loadMoreButton = (<RaisedButton onClick={this.loadMore.bind(this, results.length)}>Load More</RaisedButton>);
      }
    }

    return (
      <div style={{ marginLeft: 24, marginRight: 24 }}>
        {spinner}
        {title}
        {results}
        <div style={{ display: 'flex', position: 'relative', justifyContent: 'center', minHeight: 36 }}>
          {loadMoreButton}
          {smallSpinner}
        </div>
      </div>
    );
  }
}

function mapStateToProps(store: State): StateProps {
  return {
    searching: store.searchResults.searching,
    loadingDetails: store.searchResults.loadingDetails,
    results: store.searchResults.results,
    travelingFrom: store.searchResults.travelingFrom,
    resultDetail: store.searchResults.resultDetail,
    days: store.search.days,
    query: store.search.query
  };
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
  return {
    updateSearchTerm: (query: string) => {
      dispatch(updateSearchTerm(query));
    },
    updateDays: (days?: number) => {
      dispatch(updateDays(days));
    },
    search: () => {
      dispatch(startSearch());
    },
    loadMore: (idx: number) => {
      dispatch(loadMoreDetails(idx));
    }
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchResultScreen));
