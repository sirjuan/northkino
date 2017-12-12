import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group'

class Loader extends React.Component {

  getCLosed = () => {
    setTimeout(() => {

    }, 6000)
  }

  render() {
    return (
            <div className={`loader-container ${this.props.loader ? 'loader-open' : 'loader-closed'}`}>
              <div className='loader' />
            </div>
    )
  }

}

export default Loader;

const Fade = ({ children, ...props }) => (
  <CSSTransition
    {...props}
    timeout={2000}
    classNames="fade"
  >
    {children}
  </CSSTransition>
);
