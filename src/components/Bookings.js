import React from 'react';
import { Button } from 'reactstrap';
import { connect } from 'react-redux'
import BookingsTable from './BookingsTable';

class Bookings extends React.Component {

  state = { isOpen: false };

  toggle = () => this.setState(prevState => ({isOpen: !prevState.isOpen}))

  render() {

    const { bookings } = this.props;
    return (
      <div className='bookings'>
        <Button color='danger' onClick={this.toggle}>
          {`${bookings.length} ${bookings.length === 1 ? 'varaus' : 'varausta'}`}
        </Button>
        <div className={`overlay${this.state.isOpen ? ' open': ''}`}>
          <BookingsTable bookings={bookings} />
        </div>
      </div>

    );
  }
};

const mapStateToProps = state => {
  const { bookings = [] } = state;
  return { bookings };
}

export default connect(mapStateToProps)(Bookings);
