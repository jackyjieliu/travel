import * as React from 'react';
import { connect } from 'react-redux';
import { State } from '../reducers';
import SearchBarComponent from '../components/SearchBarComponent';
import { withRouter } from 'react-router-dom';

class LandingScreen extends React.Component {
  render() {
    return (
      <div
        style={{ position: 'fixed', top: 0, right: 0, left: 0, bottom: 0, backgroundColor: 'green' }}
      >
        <div
          style={{ position: 'fixed', right: 0, left: 0, margin: 'auto', maxWidth: 800,
            top: '26%', zIndex: 3 }}
        >
          <div style={{ marginLeft: 16, marginRight: 16 }}>
            <div style={{ fontSize: 56, marginBottom: 36, color: 'white' }}>Find Where to Travel</div>
            <SearchBarComponent/>
          </div>
        </div>
      </div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LandingScreen));
