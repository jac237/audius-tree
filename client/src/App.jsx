import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import '@audius/stems/dist/stems.css';
import '@audius/stems/dist/avenir.css';

import Navbar from './components/Navbar';
import LoadingGrid from './components/LoadingGrid';
const Home = lazy(() => import('./routes/Home'));
const User = lazy(() => import('./routes/User'));

function App() {
  return (
    <Router>
      <Navbar />
      <Suspense fallback={<LoadingGrid />}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/user/:handle" component={User} />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
