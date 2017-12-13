import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ThankYouModal extends React.Component {
  render() {

    const { toggle, isOpen } = this.props;

    return (
      <Modal isOpen={isOpen} toggle={toggle} className='thank-you-modal' size='sm' backdropClassName='modal-bd-dark' >
        <ModalHeader toggle={toggle}>Vahvistettu</ModalHeader>
        <ModalBody>
          <h2>Kiitos varauksestasi!</h2>
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={toggle}>Sulje</Button>{' '}
        </ModalFooter>
      </Modal>
    );
  }
}

export default ThankYouModal;
