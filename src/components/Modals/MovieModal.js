import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';
import moment from 'moment'
import { current } from '../../redux/utils'
import { addBookingModalShow } from '../../redux/actions'
import { getSchedule } from '../../redux/actionCreators'
import { dispatch } from '../../redux/store'
import { dateToStr, timeToStr } from '../../redux/utils'

const processAreas = (arr, movieId) => arr.reduce((acc, cur) => (
  [...acc, ...processDates(Object.values(cur), movieId)]
), [])

const processDates = (arr, movieId) => arr.reduce((acc, cur) => (
  [...acc, ...processSchedule(Object.values(cur), movieId)]
), [] );

const processSchedule = (arr, movieId) => arr.reduce((acc, cur) => {
  const {
    EventID: eventId,
    dttmShowStart: showStart,
    dttmShowEnd: showEnd,
    ID: id,
    Theatre:
    theatre,
    TheatreID:theatreId,
    TheatreAuditriumID: auditoriumId,
    TheatreAuditorium: auditorium,
    capacity,
    seats,
    ...movieDetails } = cur;
  const show = { id, showStart, showEnd, theatre, theatreId, auditorium, auditoriumId, capacity, seats, title: movieDetails.Title };
  return eventId === movieId ? [...acc, show ] : acc;
}, [] );

class MovieModal extends React.Component {

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.movie !== null && nextProps.movie !== this.props.movie) {
      dispatch(getSchedule({eventID: nextProps.movie.ID, nrOfDays: 31, area: nextProps.area.ID}))
    }
  }

  handleClick = (show) => dispatch(addBookingModalShow(show))

  render() {
    const isOpen = this.props.isOpen !== null ? true : false;
    const { toggle, movie = {}, schedule = {}, bookings = [] } = this.props;
    const processedSchedule = (movie !== null && processAreas(Object.values(schedule), movie.ID)) || []

    return movie === null ? null : (
      <Modal isOpen={isOpen} toggle={toggle} className='movie-modal' size='lg' >
        <ModalHeader toggle={toggle}>
          <img className='rating-image-title' src={movie.RatingImageUrl} alt=''/>
          {`${movie.Title} (${movie.ProductionYear}) `}
          <span>{movie.Genres}</span>
        </ModalHeader>
        <ModalBody>
          {movie.Images && <img src={movie.Images.EventLargeImageLandscape} alt='Movie poster landscape' width='100%' />}
          <p>{movie.Synopsis}</p>
          <Table>
            <tbody>
              { movie.Directors && movie.Directors.Director && Array.isArray(movie.Directors.Director) &&
                <tr>
                  <th>Ohjaajat:</th>
                  <td>
                    { movie.Directors.Director.map(director => (
                      <span key={director.FirstName+director.LastName} className='nameList'>
                        {director.FirstName} {director.LastName}
                      </span>
                    ))}
                  </td>
                </tr>
              }
              { movie.Directors.Director && movie.Directors.Director.FirstName &&
                <tr>
                  <th>Ohjaaja:</th>
                  <td>
                    <span className='nameList'>{movie.Directors.Director.FirstName} {movie.Directors.Director.LastName}</span>
                  </td>
                </tr>
              }
              { movie.Cast &&
                <tr>
                  <th>Pääosissa:</th>
                  <td>{movie.Cast.Actor.map(actor => <span className='nameList'>{actor.FirstName} {actor.LastName}</span>)}</td>
                </tr>
              }
              <tr>
                <th>Pituus:</th>
                <td>{movie.LengthInMinutes} minuuttia</td>
              </tr>
              <tr>
                <th>Ikäraja:</th>
                <td>{movie.RatingLabel}</td>
              </tr>
              <tr>
                <th>{current(movie)? 'Julkaistu' : 'Julkaistaan'}:</th>
                <td>{moment(movie.dtLocalRelease).format('D.M.')}</td>
              </tr>
            </tbody>
          </Table>
          { processedSchedule.length > 0 &&
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
                {processedSchedule.map(show => (
                  <tr>
                    <td>{show.theatre}</td>
                    <td>{show.auditorium}</td>
                    <td>{dateToStr(show.showStart)}</td>
                    <td>{timeToStr(show.showStart)} - {timeToStr(show.showEnd)}</td>
                    <td>
                      {bookings.map(i => i.id).includes(show.id)
                       ? <Button color="success" size='sm'>Varattu</Button>
                       : <Button color="danger" size='sm' onClick={() => this.handleClick(show)}>Varaa</Button>
                     }

                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          }
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={toggle}>Sulje</Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default MovieModal;
