import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MovieCard } from '../components'
import { CardColumns } from 'reactstrap';
import { Fade } from '../components';

const duration = 500;

class CurrentMovies extends Component {

  state = { current: [] }

  componentWillReceiveProps({current}) {
    if (current !== this.props.current) {
      this.setState({animated: false});
      setTimeout(() => this.setState({current, animated: true}), duration*2);
    } else {
      this.setState({current, animated: true})
    }
  }

  render = () => {
    const { current } = this.state;
    return (
      <div>
        <Fade in={this.state.animated} duration={duration}>
          <CardColumns>
              {current.map(item => (
                  <MovieCard movie={item} />
              ))}
          </CardColumns>
        </Fade>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { movies = {} } = state;
  const { current = [] } = movies;
  return { current };
}

export default connect(mapStateToProps)(CurrentMovies);
