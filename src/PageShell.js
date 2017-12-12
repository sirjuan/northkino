import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { TransitionGroup, CSSTransition } from 'react-transition-group'

const PageShell = Page => {
  return props =>
    <div className="page">
      <ReactCSSTransitionGroup
        transitionAppear={true}
        transitionAppearTimeout={600}
        transitionEnterTimeout={600}
        transitionLeaveTimeout={200}
        transitionName='fade'
      >
        <Page {...props} />
      </ReactCSSTransitionGroup>
    </div>;
};
export default PageShell;
