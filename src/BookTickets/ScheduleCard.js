import React from 'react';
import { Card, CardTitle, CardText, CardImg, CardImgOverlay, CardFooter, CardBody, Button } from 'reactstrap';

const ScheduleCard = ({movie, toggleModal}) => {
  const seeMore = () => toggleModal(movie);
  return (
      <Card className='moviePoster' inverse>
        <CardImg width="100%" src={movie.Images.EventMediumImagePortrait && movie.Images.EventMediumImagePortrait} alt="Card image cap" />
        <CardImgOverlay>
          <CardBody>
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

export default ScheduleCard;
