import React from 'react';

class Loader extends React.Component {

  render() {
    return (
      <div className={`loader-container ${this.props.loader ? 'loader-open' : 'loader-closed'}`}>
        <div className='loader' />
      </div>
    )
  }
}

export default Loader;
