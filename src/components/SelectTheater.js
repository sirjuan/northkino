import React from 'react';
import { connect } from 'react-redux'
import { addArea } from '../redux/actionCreators';
import { Input } from 'reactstrap'

const SelectTheater = (props) => {

  const handleChange = (e) => {
    const area = props.areas.find(a => a.ID === e.target.value);
    props.dispatch(addArea({payload: area}));
  }

  return (
    <Input
      type="select"
      className='select-theater'
      onChange={handleChange}
      selected={props.area.ID}
      value={props.area.ID}
      >
      {props.areas.map(area => <option key={area.ID} value={area.ID}>{area.Name}</option>)}
    </Input>
  )
}

const mapStateToProps = state => {
  const { areas = [], area = {} } = state;
  return { areas, area };
}

export default connect(mapStateToProps)(SelectTheater);
