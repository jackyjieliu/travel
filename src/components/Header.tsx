import * as React from 'react';
import { withRouter } from 'react-router-dom';
import * as H from 'history';
import AppBar from 'material-ui/AppBar';
import SearchBarComponent from './SearchBarComponent';
interface RouterProps {
  history: H.History;
}

const Header = (props: RouterProps) => {
  if (!props.history.location.pathname || props.history.location.pathname === '/') {
    return (<div/>);
  } else {
    return (
      <AppBar
        style={{ position: 'sticky', top: 0 }}
        iconStyleRight={{ flex: '1 1 0%', maxWidth: 800 }}
        iconElementLeft={<div/>}
        iconElementRight={<SearchBarComponent style={{ minWidth: 450 }}/>}
        title="BuBu Travel"
      />
    );
  }
};

export default withRouter(Header) as React.ComponentType<{}>;