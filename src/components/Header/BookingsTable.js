import React from 'react'
import { Table, Button } from 'reactstrap'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { deleteBooking } from '../../redux/actions';
import { dispatch } from '../../redux/store'
import { dateToStr, timeToStr } from '../../redux/utils'

class BookingsTable extends React.Component {

  handleClick = (booking) => {
    dispatch(deleteBooking(booking.id))
  }

  render() {
    const { bookings } = this.props;

    return (
        <TransitionGroup>
          <CSSTransition
            classNames='fadeIn'
            timeout={4000}
          >
          <Table className='bookings-table'>
            <thead>
              <tr>
                <th>Elokuva</th>
                <th>Teatteri</th>
                <th>Pvm</th>
                <th>Aika</th>
                <th>Lkm</th>
                <th></th>
              </tr>
            </thead>
            <TransitionGroup component='tbody'>
              {bookings.map(booking => (
                <CSSTransition
                  key={booking.id}
                  classNames='scale'
                  timeout={1000}
                >
                  <tr>
                    <td><div className='r-cell'>{booking.title}</div></td>
                    <td><div className='r-cell'>{booking.theatre}, {booking.auditorium}</div></td>
                    <td><div className='r-cell'>{dateToStr(booking.showStart)}</div></td>
                    <td><div className='r-cell'>{timeToStr(booking.showStart)} - {timeToStr(booking.showEnd)}</div></td>
                    <td><div className='r-cell'>{booking.seats.bookedSeats.length}</div></td>
                    <td><div className='r-cell'><Button size='sm' color='danger' onClick={() => this.handleClick(booking)}>Poista varaus</Button></div></td>
                  </tr>
                </CSSTransition>

              ))}
            </TransitionGroup>
          </Table>
        </CSSTransition>
      </TransitionGroup>
    )
  }
}

export default BookingsTable;
