import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { SelectTheater } from '../../components'
import logo from '../../assets/images/northkino.png';

class SelectTheatreModal extends React.Component {
  render() {

    const { isOpen } = this.props;

    return (
        <Modal isOpen={isOpen} size='md' className='select-theater-modal' >
          <ModalHeader>Tervetuloa!</ModalHeader>
          <ModalBody>
            <img src={logo} alt='logo' height={200} width='auto' />
          </ModalBody>
          <ModalFooter>
            <h6>Valitse teatteri räätälöidäksesi käyttökokemuksesi</h6>
            <SelectTheater />
          </ModalFooter>
        </Modal>
    );
  }
}

export default SelectTheatreModal;
