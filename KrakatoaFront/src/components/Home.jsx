/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import './Home.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import makeStyles from '@material-ui/core/styles/makeStyles';

const photos = [
  {
    name: 'Photo1',
    url: 'http://64.227.106.165/api/static/imgs/carroceu/r_card1.jpg',
  },
  {
    name: 'Photo2',
    url: 'http://64.227.106.165/api/static/imgs/carroceu/r_card2.jpg',
  },
  {
    name: 'Photo3',
    url: 'http://64.227.106.165/api/static/imgs/carroceu/r_card3.jpg',
  },
];

const useStyles = makeStyles({
  image: {
    height: '50%',
    maxHeight: '700px',
    width: '100%',
    objectFit: 'cover',
  },
});

const Home = () => {
  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
    slidesToScrow: 1,
    className: 'slides',
    height: '50%',
    maxHeight: '700px',
    width: '100%',
    adaptiveHeight: true,
  };
  const classes = useStyles();
  return (
    <div className="Home">
      <Slider {...settings}>
        {photos.map((photo) => (
          <div styles={{ marginTop: 64 }}>
            <img className={classes.image} src={photo.url} alt={photo.name} />
          </div>
        ))}
      </Slider>
    </div>
  );
};
export default Home;
