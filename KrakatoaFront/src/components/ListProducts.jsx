import React, { Component } from 'react';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import './ListProducts.css';
import Produto from '../components/Produto';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded';
// list of items

// All items component
// Important! add unique key
export const Menu = (list) => {
    return (
        list.map((item) => (
            <div className="menu-item" key={item.nome}>
                <Produto
                    produto={item}
                    update={() => { }}
                    title={item.tipo}
                    addItem={() => {

                    }}
                />
            </div>
        ))
    )
}


class ListProducts extends Component {
    constructor(props) {
        super(props);
        // call it again if items count changes
        this.menuItems = Menu(this.props.list);
        this.childRef = React.createRef();
        this.data = [];
    }

    componentDidMount(){
        this.forceUpdate();
    }

    render() {
        const menu = this.menuItems;
        return (

            <div style={{ width: '100%' }}>
                <ScrollMenu
                    data={menu}
                    arrowLeft={<ArrowBackIosRoundedIcon />}
                    arrowRight={<ArrowForwardIosRoundedIcon />}
                    dragging={false}
                    hideSingleArrow={true}
                    wheel={false}
                    ref={this.childRef}
                    onLastItemVisible={() => {
                        if (this.data.length > 0) {
                            clearInterval(this.data[0]);
                        }
                        this.data[0] = setInterval(this.childRef.current.handleArrowClick, 5000);
                    }}
                    onFirstItemVisible={() => {
                        if (this.data.length > 0) {
                            clearInterval(this.data[0]);
                        }
                        this.data[0] = setInterval(this.childRef.current.handleArrowClickRight, 5000);
                    }}
                />
            </div>
        );
    }
}

export default ListProducts;