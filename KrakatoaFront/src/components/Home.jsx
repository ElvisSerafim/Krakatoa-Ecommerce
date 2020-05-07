/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from 'react';
import './Home.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import ph1 from '../img/r_card1.jpg';
import ph2 from '../img/r_card2.jpg';
import ph3 from '../img/r_card3.jpg';

const photos = [
  {
    name: 'Photo1',
    url: ph1,
  },
  {
    name: 'Photo2',
    url: ph2,
  },
  {
    name: 'Photo3',
    url: ph3,
  },
];
export default class Home extends Component {
  render() {
    const settings = {
      dots: true,
      fade: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      arrows: true,
      slidesToScrow: 1,
      className: 'slides',
    };
    return (
      <div className="Home">
        <Slider {...settings}>
          {photos.map((photo) => (
            <div styles={{ marginTop: 64 }}>
              <img height="750" width="100%" src={photo.url} alt={photo.name} />
            </div>
          ))}
        </Slider>
      </div>
    );
  }
}
