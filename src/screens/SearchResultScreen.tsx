import * as React from 'react';
import { connect } from 'react-redux';
import { State } from '../reducers';
import { withRouter } from 'react-router-dom';
import * as H from 'history';
import * as queryString from 'query-string';
import { updateSearchTerm, updateDays, startSearch, SearchResult } from '../actions/search-action';
import Spinner from '../components/Spinner';
import Result from '../components/Result';

interface StateProps {
  searching: boolean;
  results: SearchResult[];
}

interface RouterProps {
  history: H.History;
}

interface DispatchProps {
  updateSearchTerm: (query: string) => void;
  updateDays: (days?: number) => void;
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
  render() {
    let spinner;
    let results;
    if (this.props.searching) {
      spinner = (<Spinner/>);
    } else {
      results = this.props.results.map((result) => {
        return (
          <div key={result.name} style={{ marginBottom: 14 }}>
            <Result result={result}/>
          </div>);
      });
    }
    return (
      <div style={{ marginLeft: 24, marginRight: 24 }}>
        {spinner}
        {results}
      </div>
    );
  }
}

function mapStateToProps(store: State): StateProps {
  return {
    searching: store.search.searching,
    results: store.search.results
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
    }
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchResultScreen));
