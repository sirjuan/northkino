import React from 'react';
import { Card, CardTitle, CardText, CardImg, CardImgOverlay, CardFooter, CardBody, Button } from 'reactstrap';
import { addModalMovie } from '../redux/actions';
import { dispatch } from '../redux/store'
import { current, dateToStr } from '../redux/utils'

const MovieCard = ({movie}) => {
  const seeMore = () => dispatch(addModalMovie({payload: movie}));
  const upcoming = !current(movie);

  return (
      <Card className='moviePoster' inverse>
        <CardImg width="100%" src={movie.Images.EventMediumImagePortrait} alt="" />
        <CardImgOverlay>
          { upcoming && <p className='upcomingDateBig'>{dateToStr(movie.dtLocalRelease)}</p> }
          <CardBody>
            { upcoming && <p className='upcomingDate'>Tulossa {dateToStr(movie.dtLocalRelease)}</p> }
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
