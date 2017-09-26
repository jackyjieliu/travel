import * as React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import LandingScreen from './screens/LandingScreen';
import SearchResultScreen from './screens/SearchResultScreen';
import DestinationDetailScreen from './screens/DestinationDetailScreen';
import Header from './components/Header';

const bodyWrapper = (Component: React.ComponentClass) => {
  return () => (
    <div style={{ maxWidth: 760, marginLeft: 'auto', marginRight: 'auto', marginTop: 24, marginBottom: 24  }}>
      <Component />
    </div>
  );
};

const App = () => {
  return (
    <div className="App">
      <Header/>
      <Switch>
        <Route exact={true} path="/" component={LandingScreen}/>
        <Route path="/search" component={bodyWrapper(SearchResultScreen)}/>
        <Route path="/place/:id" component={bodyWrapper(DestinationDetailScreen)}/>
      </Switch>
    </div>
  );
};

export default App;
