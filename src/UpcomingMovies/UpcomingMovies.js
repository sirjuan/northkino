import React, { Component } from 'react';
import { connect } from 'react-redux'
import { MovieCard } from '../components'
import { CardColumns } from 'reactstrap';
import { Fade } from '../components';

const duration = 500;

class UpcomingMovies extends Component {

  state = { upcoming: [] }

  componentWillReceiveProps({upcoming}) {
    if (upcoming !== this.props.upcoming) {
      this.setState({animated: false});
      setTimeout(() => this.setState({upcoming, animated: true}), duration*2);
    } else {
      this.setState({upcoming, animated: true})
    }
  }

  render = () => {
    console.log('*****************PROCESS**************',process.env.NODE_ENV)
    //console.log('*****************PROCESS**************',NODE_ENV)
    const { upcoming = [] } = this.state;
    return (
      <div>
        <Fade in={this.state.animated} duration={duration}>
          <CardColumns>
              {upcoming.map(item => (
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
  const { upcoming = [] } = movies;
  return { upcoming };
}

export default connect(mapStateToProps)(UpcomingMovies);
