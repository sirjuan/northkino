import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';
import { addBooking, toggleThankYouModal, clearBookingModal, toggleLoader } from '../redux/actions'
import { dispatch } from '../redux/store'

import moment from 'moment'

class ConfirmModal extends React.Component {

  handleSubmit = (show) => {
    dispatch(toggleLoader())
    dispatch(addBooking(this.props.show))
    setTimeout(() => {

      dispatch(toggleLoader())
      setTimeout(() => {
        this.props.toggle()
        dispatch(clearBookingModal())
        dispatch(toggleThankYouModal())
      }, 1000)


    }, 6000)

  }

  render() {
    const isOpen = this.props.isOpen !== null ? true : false;
    const { toggle, className, show } = this.props;
    return !isOpen ? null : (
              <Modal isOpen={isOpen} toggle={toggle} className={className} size='lg' >
                <ModalHeader toggle={toggle}>Varmista lippujen varaus</ModalHeader>
                <ModalBody>
                  <p>Olet varaamassa seuraavia lippuja, ole hyvä ja vahvista:</p>
                  <Table striped>
                    <thead>
                      <tr>
                        <th>Teatteri</th>
                        <th>Sali</th>
                        <th>Päivämäärä</th>
                        <th>Kellonaika</th>
                        <th>Lipputyyppi</th>
                        <th>Hinta</th>
                      </tr>
                    </thead>
                    <tbody>

                        {show.seats.bookedSeats.map(seat => (
                          <tr>
                            <td>{show.theatre}</td>
                            <td>{show.auditorium}</td>
                            <td>{moment(show.showStart).format('D.M.YYYY')}</td>
                            <td>{moment(show.showStart).format('H:mm')} - {moment(show.showEnd).format('H:mm')}</td>
                            <td>{seat.price.name}</td>
                            <td>{seat.price.price} €</td>
                          </tr>
                        ))}
                        <tr>
                          <td colSpan={4}></td>
                          <td>Yhteensä</td>
                          <td>{show.seats.bookedSeats.reduce((sum, seat) => sum + seat.price.price, 0)} €</td>
                        </tr>


                    </tbody>
                  </Table>
                </ModalBody>
                <ModalFooter>
                  <Button type="submit" onClick={this.handleSubmit} color='success'>Varaa</Button>
                  <Button color="danger" onClick={toggle}>Peruuta</Button>
                </ModalFooter>
              </Modal>
          )

  }
}

export default ConfirmModal;
