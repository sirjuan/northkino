import React, { Component } from 'react';
import { Carousel, CarouselItem, CarouselControl, CarouselIndicators, CarouselCaption } from 'reactstrap';
import { addModalMovie } from '../../redux/actions'
import { dispatch } from '../../redux/store'
import { current } from '../../redux/utils'
import moment from 'moment'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

class Example extends Component {

  state = { activeIndex: 0 };

  onExiting = () => {
    this.animating = true;
  }

  onExited = () => {
    this.animating = false;
  }

  next = () => {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === this.props.movies.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous = () => {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? this.props.movies.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex = (newIndex) => {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  handleClick = (id) => {
    console.log('click')
    const payload = this.props.movies.find(i => i.ID === id)
    dispatch(addModalMovie({payload}))
  }

  renderImage = (props) => {
    return (
    <img onClick={() => this.handleClick(props.alt)} alt={props.alt} {...props} />
  )}

  render() {
    const { activeIndex } = this.state;
    const { movies = [] } = this.props;

    return movies.length ? (
      <TransitionGroup>
            <CSSTransition
              classNames='fade'
              timeout={2000}
            >
              <Carousel
                activeIndex={activeIndex}
                next={this.next}
                previous={this.previous}
              >
                <CarouselIndicators items={movies.map(i => ({...i, key: i.ID}))} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
                {slides(movies, this.handleClick, this.renderImage, this.onExiting, this.onExited)}
                <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
                <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
              </Carousel>
            </CSSTransition>
      </TransitionGroup>
    ) : null;
  }
}

export default Example;

const slides = (movies, handleClick, renderImage, onExiting, onExited) => movies.map((item) => {
  return (
    <CarouselItem
      onExiting={onExiting}
      onExited={onExited}
      onClick={handleClick}
      key={item.ID}
      src={item.Images.EventLargeImageLandscape}
      tag={renderImage}
      altText={item.ID}
    >
      <div onClick={() => handleClick(item.ID)}>
        <CarouselCaption
          captionText={current(item) ? '' : `Tulossa ${moment(item.dtLocalRelease).format('D.M.')}`}
          captionHeader={item.Title}
        />
      </div>
    </CarouselItem>
  );
});
