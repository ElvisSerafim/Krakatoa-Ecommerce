import React, { useRef } from 'react';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import './ListProducts.css';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded';
import Produto from './Produto';
// list of items

// All items component
// Important! add unique key
export const Menu = (list) => list.map((item) => (
  <div className="menu-item" key={item.nome}>
    <Produto
      produto={item}
      update={() => { }}
      title={item.tipo}
      addItem={() => { }}
    />
  </div>
));

const ListProducts = ({ list }) => {
  const Ref = useRef();
  const menu = Menu(list);
  const data = [];
  return (
    <div style={{ width: '100%' }}>
      <ScrollMenu
        data={menu}
        arrowLeft={<ArrowBackIosRoundedIcon />}
        arrowRight={<ArrowForwardIosRoundedIcon />}
        dragging={false}
        hideSingleArrow
        wheel={false}
        ref={Ref}
        onLastItemVisible={() => {
          if (data.length > 0) {
            clearInterval(data[0]);
          }
          data[0] = setInterval(Ref.current.handleArrowClick, 5000);
        }}
        onFirstItemVisible={() => {
          if (data.length > 0) {
            clearInterval(data[0]);
          }
          data[0] = setInterval(Ref.current.handleArrowClickRight, 5000);
        }}
      />
    </div>
  );
};

export default ListProducts;
