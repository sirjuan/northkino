import React, { Component } from 'react';
import { connect } from 'react-redux';
import ScheduleCard from './ScheduleCard'
import MovieModal from './MovieModal'
import { CardColumns } from 'reactstrap';
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { Card, CardBody, Button, CardTitle, CardText, CardImg, CardImgOverlay, Table, Row, Col } from 'reactstrap';
import moment from 'moment'

class Schedule extends Component {

  state = { movie: undefined}

  toggleModal = (movie) => {
    this.setState({modalMovie: movie && movie.Title ? movie : undefined })
  };

  render = () => {
    const { schedule } = this.props;
    
    const scheduleByMovie = schedule.reduce((acc, cur) => {
      const {
        EventID: eventId,
        dttmShowStart: showStart,
        dttmShowEnd: showEnd,
        ID: id,
        Theatre:
        theatre,
        TheatreId:theatreId,
        TheatreAuditriumID: auditoriumId,
        TheatreAuditorium: auditorium,
        ...movieDetails } = cur;
      const show = { id, showStart, showEnd, theatre, theatreId, auditorium, auditoriumId };
      return acc[eventId] ? {
        ...acc,
        [eventId]: { ...acc[eventId], shows: [...acc[eventId].shows, show]}
      } : {
        ...acc,
        [eventId]: {...movieDetails, shows: [show]}}
    },{})

    return (
        <TransitionGroup>
            {Object.values(scheduleByMovie).map(movie => (
              <CSSTransition
                classNames='fade'
                timeout={{ enter: 1000, exit: 400 }}
              >

                <Card inverse className='schedule-card'>
                  <CardImg top className='schedule-card-image' width="100%" src={movie.Images.EventLargeImageLandscape} alt="Card image cap" />
                  <CardImgOverlay>
                    <Row>
                      <Col sm='auto'>
                        <img src={movie.Images.EventMediumImagePortrait} height={300}></img>
                      </Col>
                      <Col>
                        <CardTitle>{movie.Title}</CardTitle>
                        <CardText>{movie.ShortSynopsis}</CardText>
                        <CardText>
                          <small className="text-muted">Last updated 3 mins ago</small>
                        </CardText>
                        <Table striped>
                          <thead>
                            <tr>
                              <th>Teatteri</th>
                              <th>Sali</th>
                              <th>Päivämäärä</th>
                              <th colSpan={2}>Kellonaika</th>
                            </tr>
                          </thead>
                          <tbody>
                            {movie.shows.map(show => (
                              <tr>
                                <td>{show.theatre}</td>
                                <td>{show.auditorium}</td>
                                <td>{moment(show.showStart).format('D.M.YYYY')}</td>
                                <td>{moment(show.showStart).format('H:mm')} - {moment(show.showEnd).format('H:mm')}</td>
                                <td><a>Varaa</a></td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>

                      </Col>
                    </Row>

                  </CardImgOverlay>
                </Card>
              </CSSTransition>
            ))}
        </TransitionGroup>
    );
  }
}

const mapStateToProps = state => {
  const { schedule = [] } = state;
  return { schedule };
}

export default connect(mapStateToProps)(Schedule);
