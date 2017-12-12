import React from 'react';
import { Card, CardTitle, CardText, CardImg, CardImgOverlay, CardFooter, CardBody, Button } from 'reactstrap';
import { addModalMovie } from '../redux/actions';
import { dispatch } from '../redux/store'
import { current } from '../redux/utils'
import moment from 'moment'

const MovieCard = ({movie}) => {
  const seeMore = () => dispatch(addModalMovie({payload: movie}));
  const upcoming = !current(movie);

  return (
      <Card className='moviePoster' inverse>
        <CardImg width="100%" src={movie.Images.EventMediumImagePortrait} alt="Movie poster" />
        <CardImgOverlay>
          { upcoming && <p className='upcomingDateBig'>{moment(movie.dtLocalRelease).format('D.M.')}</p> }
          <CardBody>
            { upcoming && <p className='upcomingDate'>Tulossa {moment(movie.dtLocalRelease).format('D.M.')}</p> }
            <CardTitle>{movie.Title}</CardTitle>
            <CardText>{movie.ShortSynopsis}</CardText>
          </CardBody>
          <CardFooter>
            <Button color='danger' onClick={seeMore}>Katso lisää</Button>
          </CardFooter>
        </CardImgOverlay>
      </Card>
  );
};

export default MovieCard;
