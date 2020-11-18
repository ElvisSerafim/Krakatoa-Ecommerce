import React from 'react';
import { animated, useSpring } from 'react-spring';

const withAnimation = (Component) => {
  const WithAnimation = (props) => {
    const animation = useSpring({ opacity: 1, from: { opacity: 0 } });
    return (
      <animated.div style={(animation, { width: '100%' })}>
        <Component {...props} />
      </animated.div>
    );
  };
  return WithAnimation;
};

export default withAnimation;
