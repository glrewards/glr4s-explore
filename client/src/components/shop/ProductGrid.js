import React, {Component} from "react";
import {connect} from 'react-redux';
import {fetchProducts} from "../../actions";


class ProductGrid extends Component{


    componentDidMount(){
        this.props.fetchProducts();
    }


    renderProducts(){
        return this.props.products.map(product =>{
            return(
                <div key={product.node.id} className="card lime darken-1 ">
                    <div className="card-content">
                        <span className="card-title">{product.node.title}</span>
                        <p>
                            {product.node.description}
                        </p>


                    </div>
                </div>

            );
        });
    }
    render(){
        return (
            <div>
                {this.renderProducts()}
            </div>
        );
    }
}

function mapStateToProps (state){
    console.log(state.products);
    return {products: state.products};
}

export default connect(mapStateToProps,{fetchProducts})(ProductGrid);
