import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { Switch, Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';

import { Loader, Header, Modals } from '../components'
import Home from './Home'
import CurrentMovies from './CurrentMovies';
import UpcomingMovies from './UpcomingMovies';
import Schedule from './Schedule'

const App = ({ location, area, loader, ...props }) => (
  <div>
    <Loader loader={loader}/>
    <Modals />
    { area.ID &&
      <div className='content'>
        <Header />
        <TransitionGroup className='main'>
          <CSSTransition
            key={location.pathname.split('/')[1]}
            timeout={2000}
            classNames="fade"
            mountOnEnter={true}
            unmountOnExit={true}
          >
            <Switch location={location}>
              <Route exact path='/' component={Home} />
              <Route exact path='/current' component={CurrentMovies} />
              <Route exact path='/upcoming' component={UpcomingMovies} />
              <Route exact path='/schedule' component={Schedule} />
              <Route component={Home} />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      </div>
    }
  </div>
)

const mapStateToProps = state => {
  const { area, loader } = state;
  return { area, loader };
}

export default withRouter(connect(mapStateToProps)(App))
