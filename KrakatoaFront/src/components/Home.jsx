/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import './Home.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import makeStyles from '@material-ui/core/styles/makeStyles';
import withAnimation from '../higherComponents/withAnimation';

const photos = [
  {
    name: 'Photo1',
    url: 'https://testekrakatoa.tk/imgs/carroceu/r_card1.jpg',
  },
  {
    name: 'Photo2',
    url: 'https://testekrakatoa.tk/imgs/carroceu/r_card2.jpg',
  },
  {
    name: 'Photo3',
    url: 'https://testekrakatoa.tk/imgs/carroceu/r_card3.jpg',
  },
];

const useStyles = makeStyles({
  image: {
    height: '50%',
    maxHeight: 500,
    minHeight: 500,
    width: '100%',
    objectFit: 'cover',
    '@media (max-width: 360px)': {
      marginTop: 32,
      maxHeight: 200,
      minHeight: 200,
    },
  },
});

const Home = () => {
  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
    slidesToScrow: 1,
    className: 'slides',
    height: '40%',
    maxHeight: 400,
    width: '100%',
    adaptiveHeight: true,
  };
  const classes = useStyles();
  return (
    <div className="Home">
      <Slider {...settings}>
        {photos.map((photo) => (

          <img className={classes.image} src={photo.url} alt={photo.name} />
        ))}
      </Slider>
    </div>
  );
};
export default withAnimation(Home);
