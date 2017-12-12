import React from 'react';
import { Button } from 'reactstrap';

const MovieCard = ({bookings, toggle}) => {
  return <Button color='danger' onClick={toggle}>{bookings.length} varausta</Button>;
};

export default MovieCard;
