import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import '@audius/stems/dist/stems.css';
import '@audius/stems/dist/avenir.css';
import { MusicProvider } from './components/MusicContext';
import SidebarContainer from './components/SidebarContainer';
import LoadingGrid from './components/LoadingGrid';
import MusicBar from './components/MusicBar';

const Home = lazy(() => import('./routes/Home'));
const User = lazy(() => import('./routes/User'));
const Search = lazy(() => import('./routes/Search'));
const Request = lazy(() => import('./routes/Request'));
const HowItWorks = lazy(() => import('./routes/HowItWorks'));
const Feedback = lazy(() => import('./routes/Feedback'));

function App() {
  return (
    <Router>
      <MusicProvider>
        <SidebarContainer>
          <Suspense fallback={<LoadingGrid />}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/user/:handle" component={User} />
              <Route exact path="/search" component={Search} />
              <Route exact path="/request" component={Request} />
              <Route exact path="/howitworks" component={HowItWorks} />
              <Route exact path="/feedback" component={Feedback} />
            </Switch>
          </Suspense>
        </SidebarContainer>
        <MusicBar />
      </MusicProvider>
    </Router>
  );
}

export default App;
