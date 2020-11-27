import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import '@audius/stems/dist/stems.css';
import '@audius/stems/dist/avenir.css';
import LoadingGrid from './components/LoadingGrid';

// import Main from './components/UserPage';
const HomePage = lazy(() => import('./routes/HomePage'));
const UserPage = lazy(() => import('./routes/UserHomePage'));

function App() {
  return (
    // React Router + Switch:
    <Router>
      <Suspense fallback={<div><LoadingGrid /></div>}>
        <Switch>
          <Route exact path="/" component={HomePage}/>
          <Route path="/:handle" component={UserPage}/>
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
