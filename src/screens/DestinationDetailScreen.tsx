import * as React from 'react';
import { connect } from 'react-redux';
import { State } from '../reducers';
import { withRouter } from 'react-router-dom';

class DestinationDetailScreen extends React.Component {
  render() {
    return (
      <div/>
    );
  }
}

function mapStateToProps(store: State) {
  return {
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {};
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DestinationDetailScreen));
