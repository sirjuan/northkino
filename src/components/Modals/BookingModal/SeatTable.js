import React from 'react'
import PriceSelector from './PriceSelector'
import { Table } from 'reactstrap'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

class SeatTable extends React.Component {

  handleClick = (seat, rows) => {

    if (seat.status === 'reserved') return;

    const isBooking = seat.status === 'free'

    const { bookedSeats } = rows;
    const { allSeats } = rows;

    const newSeat = {
      ...seat,
      status: isBooking ? 'booked' : 'free'
    }

    const newRows = [...allSeats];

    const newBooked = isBooking
      ? [...bookedSeats, newSeat]
      : bookedSeats.filter(i => i.number !== seat.number)

    newRows[seat.row][seat.seat] = newSeat;

    this.props.input.onChange({ allSeats: newRows, bookedSeats: newBooked });
  }

  handlePriceChange = (seat, price) => {

    const seats = this.props.input.value;
    const index = seats.bookedSeats.findIndex(i => i.number === seat.number)

    const bookedSeats = seats.bookedSeats.map((item, i) => i === index ? {...item, price} : item )

    seats.allSeats[seat.row][seat.seat].price = price

    const booking = { ...seats, bookedSeats }

    this.props.input.onChange(booking)
  }

  render() {
    const { input } = this.props;
    const { value: rows } = input;

    return rows ? (
      <div>
        <div className='seat-table'>
          {rows.allSeats.map((row, i) => (
            <ul>
              <li>{i+1}</li>
              {row.map(seat => <li className={seat.status} onClick={() => this.handleClick(seat, rows)}>{seat.number}</li>)}
            </ul>
          ))}
        </div>
        <TransitionGroup>
        { rows.bookedSeats && rows.bookedSeats.length > 0 &&
          <CSSTransition
            classNames='fadeIn'
            timeout={4000}
          >
          <Table className='reservation-table'>
            <thead>
              <tr>
                <th>Paikkanumero</th>
                <th>Rivi</th>
                <th>Paikka</th>
                <th>Lipputyyppi</th>
              </tr>
            </thead>
              <TransitionGroup component='tbody'>
                {rows.bookedSeats.map(seat => (
                  <CSSTransition
                    key={seat.number}
                    classNames='scale'
                    timeout={1000}
                  >
                    <tr>
                      <td><div className='r-cell'>{seat.number}</div></td>
                      <td><div className='r-cell'>{seat.row+1}</div></td>
                      <td><div className='r-cell'>{seat.seat+1}</div></td>
                      <td><div className='r-cell'><PriceSelector seats={rows} seat={seat} handleChange={this.handlePriceChange}/></div></td>
                    </tr>
                  </CSSTransition>
                ))}
              </TransitionGroup>
          </Table>
        </CSSTransition>
        }
      </TransitionGroup>
      </div>
    ) : null
  }
}

export default SeatTable
