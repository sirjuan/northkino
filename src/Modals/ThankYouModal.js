import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ThankYouModal extends React.Component {

  render() {

    const { toggle, className, isOpen } = this.props;

    return (
      <Modal isOpen={isOpen} toggle={toggle} className={className} size='sm' >
        <ModalHeader toggle={toggle}>Varaus vahvistettu</ModalHeader>
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
