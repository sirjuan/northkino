import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Row, Col, Container } from 'reactstrap';
import Carousel from './Carousel'
import { Fade } from '../components';

const duration = 500;

class Home extends Component {

  state = { schedule: [], animated: true }

  componentWillReceiveProps({upcoming, current}) {
    if (upcoming !== this.props.upcoming || current !== this.props.current) {
      this.setState({animated: false});
      setTimeout(() => this.setState({upcoming, current, animated: true}), duration*2);
    } else {
      this.setState({upcoming, current, animated: true})
    }
  }

  render = () => {
    const { upcoming = [], current = [] } = this.state;

    return  (
      <div>
        <Fade in={this.state.animated} duration={duration}>
          <Container style={{maxWidth: '800px'}}>

              { current.length > 0 &&
                <div>
                <Row style={{marginTop: '30px', marginBottom: '15px'}}>
                  <Col>
                    <h1>Ohjelmistossa nyt</h1>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Carousel movies={current}/>
                  </Col>

                </Row>
              </div>
              }


              { upcoming.length > 0 &&
                <div>
                <Row style={{marginTop: '30px', marginBottom: '15px'}}>
                  <Col>
                    <h1>Tulossa</h1>
                  </Col>

                </Row>
                <Row>
                  <Col>
                    <Carousel movies={upcoming}/>
                  </Col>

                </Row>
              </div>
              }


          </Container>
        </Fade>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { movies = {}, schedule = [] } = state;
  const { upcoming = [], current = [] } = movies;
  return { upcoming, current, schedule };
}

export default connect(mapStateToProps)(Home);
