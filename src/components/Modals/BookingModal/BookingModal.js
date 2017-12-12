import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';
import { showConfirmModal } from '../../../redux/actions'
import { dispatch } from '../../../redux/store'
import { Form as FinalForm, Field } from 'react-final-form';
import { Form } from 'reactstrap';

import SeatTable from './SeatTable'

import moment from 'moment'

class BookingModal extends React.Component {

  submitForm = (show) => {
    dispatch(showConfirmModal(show))
  }

  render() {
    const isOpen = this.props.isOpen !== null ? true : false;
    const { toggle, className, show = {} } = this.props;
    return show === null ? null : (
      <FinalForm
        onSubmit={this.submitForm}
        initialValues={show}
        render={({ handleSubmit, pristine, reset, submitting, values, ...rest }) => {
          return (
            <Form onSubmit={handleSubmit} ref={form => {this.form = form}}>
              <Modal isOpen={isOpen} toggle={toggle} className={className} size='lg' >
                <ModalHeader toggle={toggle}>Varaa lippuja - {show.title}</ModalHeader>
                <ModalBody>
                  <Table striped>
                    <thead>
                      <tr>
                        <th>Teatteri</th>
                        <th>Sali</th>
                        <th>Päivämäärä</th>
                        <th>Kellonaika</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{show.theatre}</td>
                        <td>{show.auditorium}</td>
                        <td>{moment(show.showStart).format('D.M.YYYY')}</td>
                        <td>{moment(show.showStart).format('H:mm')} - {moment(show.showEnd).format('H:mm')}</td>
                      </tr>
                    </tbody>
                  </Table>
                  <Field
                    name="seats"
                    component={SeatTable}
                    placeholder="Varaa paikat"
                  />
                </ModalBody>
                <ModalFooter>
                  <Button type="submit" onClick={handleSubmit} color='success' disabled={submitting || pristine}>Varaa</Button>
                  <Button color="danger" onClick={toggle}>Peruuta</Button>
                </ModalFooter>
              </Modal>
            </Form>
          )
        }}
      />
    );
  }
}

export default BookingModal;
