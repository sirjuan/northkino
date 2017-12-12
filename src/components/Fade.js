import React from 'react'
import Transition from 'react-transition-group/Transition';

const defaultStyle = duration => ({
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
})

const transitionStyles = {
  entering: { opacity: 0 },
  entered:  { opacity: 1 },
  exiting: {opacity: 1 },
  exited: {opacity: 0 }
};

const Fade = ({ in: inProp, children, duration }) => (
  <Transition in={inProp} timeout={duration}>
    {(state) => (
      <div style={{ ...defaultStyle(duration), ...transitionStyles[state] }}>
        {children}
      </div>
    )}
  </Transition>
);

export default Fade;
