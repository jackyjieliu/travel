import * as React from 'react';
import { connect } from 'react-redux';
import { State } from '../reducers/state';
import { updateSearchTerm, updateDays } from '../actions/search-action';
import SearchInput from './parts/SearchInput';
import SearchButton from './parts/SearchButton';
import NumberInput from './parts/NumberInput';
import { withRouter } from 'react-router-dom';
import * as _ from 'lodash';
import * as queryString from 'query-string';
import * as H from 'history';

interface StateProps {
  query: string;
  days?: number;
}

interface DispatchProps {
  updateSearchTerm: (query: string) => void;
  updateDays: (days?: number) => void;
}

interface OwnProps {
  backgroundColor?: string;
  style?: React.CSSProperties;
}

interface RouterProps {
  history: H.History;
}

class SearchBarComponent extends React.Component<StateProps & DispatchProps & OwnProps & RouterProps, {}> {

  constructor() {
    super();
    this.onSearchInputChanged = this.onSearchInputChanged.bind(this);
    this.onRequestSearch = this.onRequestSearch.bind(this);
    this.onDaysUpdate = this.onDaysUpdate.bind(this);
  }

  onSearchInputChanged(value: string) {
    this.props.updateSearchTerm(value);
  }

  onDaysUpdate(days?: number) {
    this.props.updateDays(days);
  }

  onRequestSearch() {
    // this.props.search();
    const query = {
      query: this.props.query,
      days: this.props.days
    };

    this.props.history.push({
      pathname: '/search',
      search: '?' + queryString.stringify(query)
    });
  }

  render() {
    const backgroundColor = this.props.backgroundColor || 'white';
    const dispDays = (this.props.days === undefined) ? '' : String(this.props.days);
    return (
      <div style={_.defaults(this.props.style, { display: 'flex' })}>
        <SearchInput
          style={{ flexGrow: 1, backgroundColor }}
          value={this.props.query}
          onChange={this.onSearchInputChanged}
          onRequestSearch={this.onRequestSearch}
          hintText="What is you starting city?"
        />
        <div style={{ width: 8 }}/>
        <NumberInput
          style={{ width: 150, backgroundColor }}
          value={dispDays}
          onChange={this.onDaysUpdate}
          onRequestSearch={this.onRequestSearch}
          hintText="# of Days"
        />
        <div style={{ width: 8 }}/>
        <SearchButton
          style={{ backgroundColor }}
          onRequestSearch={this.onRequestSearch}
        />
      </div>
    );
  }
}

function mapStateToProps(store: State): StateProps {
  return {
    query: store.search.query,
    days: store.search.days,
  };
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
  return {
    updateSearchTerm: (query: string) => {
      dispatch(updateSearchTerm(query));
    },
    updateDays: (days?: number) => {
      dispatch(updateDays(days));
    }
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SearchBarComponent)
) as React.ComponentType<OwnProps>;
