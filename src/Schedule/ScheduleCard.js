import React from 'react';
import { Card, CardTitle, CardText, CardImg, CardImgOverlay, Table, Row, Col, Button } from 'reactstrap';
import moment from 'moment'

const ScheduleCard = ({movie = {}, bookings = [], handleClick}) => (
  <Card inverse className='schedule-card'>
    <CardImg top className='schedule-card-image' width="100%" src={movie.Images.EventLargeImageLandscape} alt="Card image cap" />
    <CardImgOverlay>
      <Row>
        <Col sm='auto'>
          <img className='movie-poster' src={movie.Images.EventMediumImagePortrait} height={300} alt='Movie poster'></img>
        </Col>
        <Col>
          <CardTitle><img className='rating-image-title' src={movie.RatingImageUrl} alt=''/> {movie.Title} <small className="text-muted">{movie.Genres}</small></CardTitle>
          <CardText>

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
                  <td>
                    {bookings.map(i => i.id).includes(show.id)
                     ? <Button color="success" size='sm'>Varattu</Button>
                     : <Button color="danger" size='sm' onClick={() => handleClick(show)}>Varaa</Button>
                   }

                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

        </Col>
      </Row>

    </CardImgOverlay>
  </Card>
)

export default ScheduleCard;
