import React, { Component } from 'react';
import { connect } from 'react-redux'
import MovieModal from './MovieModal'
import BookingModal from './BookingModal'
import ConfirmModal from './ConfirmModal'
import ThankYouModal from './ThankYouModal'
import SelectTheatreModal from './SelectTheatreModal'
import {
  addModalMovie,
  clearModalMovie,
  addBookingModalShow,
  clearBookingModal,
  showConfirmModal,
  clearConfirmModal,
  toggleThankYouModal
} from '../../redux/actions'
import { dispatch } from '../../redux/store'

class Modals extends Component {

  toggleMovieModal = (movie) => movie && movie.Title ? dispatch(addModalMovie(movie)) : dispatch(clearModalMovie())
  toggleBookingModal = (show) => show && !show.target ? dispatch(addBookingModalShow(show)) : dispatch(clearBookingModal())
  toggleConfirmModal = (show) => show && !show.target ? dispatch(showConfirmModal(show)) : dispatch(clearConfirmModal())
  toggleThankYouModal = () => dispatch(toggleThankYouModal())

  render = () => {
    const { movie, booking, confirm, thankYou, area, schedule, bookings } = this.props;
    return (
      <div>
        <MovieModal movie={movie} toggle={this.toggleMovieModal} isOpen={movie} schedule={schedule} bookings={bookings} area={area}/>
        <BookingModal show={booking} toggle={this.toggleBookingModal} isOpen={booking}/>
        <ConfirmModal show={confirm} toggle={this.toggleConfirmModal} isOpen={confirm}/>
        <ThankYouModal toggle={this.toggleThankYouModal} isOpen={thankYou}/>
        <SelectTheatreModal isOpen={!area.ID} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { modals = {}, area = {}, schedule = {}, bookings = [] } = state;
  const { movie, booking, confirm, thankYou } = modals;
  return { movie, booking, confirm, thankYou, area, schedule, bookings };
}

export default connect(mapStateToProps)(Modals);
