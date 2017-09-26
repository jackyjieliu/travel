import * as React from 'react';
import * as ResponsiveCarousel from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

export default class Carousel extends React.Component<{ children: any }> {
  render() {
    return (
      <ResponsiveCarousel.Carousel infiniteLoop={true} showStatus={false} showThumbs={false}>
        {this.props.children}
      </ResponsiveCarousel.Carousel>
    );
  }
}
