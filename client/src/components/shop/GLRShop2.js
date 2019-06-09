import ProductGrid from "./ProductGrid";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {addLine} from "../../actions/cartActions";


function mapStateToProps(state) {
  return {
    auth: state.auth,
    products: state.products
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onAddToCartClick: (student, productId, variantId, quantity) => {
      dispatch(addLine(student,productId,variantId,quantity))
    }
  }
}

const ProductList = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductGrid)

export default connect(mapStateToProps)(ProductList);
