import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addBookingModalShow, changeSelectedDate } from '../redux/actions'
import { dispatch } from '../redux/store'
import { Fade } from '../components';
import { Button, Row, Col } from 'reactstrap'
import ScheduleCard from './ScheduleCard'
import moment from 'moment'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';

const duration = 500;

class Schedule extends Component {

  state = { schedule: [], animated: true }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.schedule)
    if (nextProps.schedule !== this.props.schedule) {
      this.setState({animated: false});
      setTimeout(() => this.setState({schedule: nextProps.schedule, animated: true}), duration*2);
    } else {
      this.setState({schedule: nextProps.schedule, animated: true})
    }
  }

  handleClick = (show) => dispatch(addBookingModalShow(show))

  handleChange = date => {
    dispatch(changeSelectedDate(date.format('DD.MM.YYYY')))
  }

  render = () => {
    const { bookings, dates, selectedDate } = this.props;
    const { schedule = [] } = this.state;
    console.log(dates)

    const scheduleByMovie = Object.values(processSchedule(schedule));

    return (
      <div>
        <Row>
          <Col style={{textAlign: 'center', padding: 20}}>
            Vaihda päivä:
            <DatePicker
              selected={moment(selectedDate, "DD.MM.YYYY")}
              onChange={this.handleChange}
              customInput={<DatePickerButton />}
              dateFormat="DD.MM.YYYY"
              includeDates={dates.map(date => moment(date, "DD.MM.YYYY"))}
            />
          </Col>
        </Row>

        <Fade in={this.state.animated} duration={duration}>
          { scheduleByMovie.map(movie => <ScheduleCard movie={movie} bookings={bookings} handleClick={this.handleClick}/>)}
        </Fade>
      </div>
    );
  }
}

const processSchedule = schedule => schedule.reduce((acc, cur) => {
  const {
    EventID: eventId,
    dttmShowStart: showStart,
    dttmShowEnd: showEnd,
    ID: id,
    Theatre:
    theatre,
    TheatreID:theatreId,
    TheatreAuditriumID: auditoriumId,
    TheatreAuditorium: auditorium,
    capacity,
    seats,
    ...movieDetails } = cur;
  const show = { id, showStart, showEnd, theatre, theatreId, auditorium, auditoriumId, capacity, seats, title: movieDetails.Title };
  return acc[eventId] ? {
    ...acc,
    [eventId]: { ...acc[eventId], shows: [...acc[eventId].shows, show]}
  } : {
    ...acc,
    [eventId]: {...movieDetails, shows: [show]}}
},{})

class DatePickerButton extends React.Component {

  render () {
    return (
      <Button
        color='danger'
        onClick={this.props.onClick}>
        {this.props.value}
      </Button>
    )
  }
}


const mapStateToProps = state => {
  const { schedule: temp = {}, bookings = [], area = {}, selectedDate } = state;
  const { dates = [] } = area;
  const more = temp[area.ID] || {}
  const schedule = more[selectedDate] || []
  return { schedule, bookings, dates, selectedDate };
}

export default connect(mapStateToProps)(Schedule);
