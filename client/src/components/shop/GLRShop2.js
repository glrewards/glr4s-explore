import ProductGrid from "./ProductGrid";
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
    onAddToCartClick: (student, productId, productTitle, variantId, quantity,glrpoints,img) => {
      dispatch(addLine(student,productId,productTitle, variantId,quantity,glrpoints,img))
    }
  }
}

const ProductList = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductGrid)

export default connect(mapStateToProps)(ProductList);
