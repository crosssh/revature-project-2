import { connect } from "react-redux";
import { IState } from "../../reducers";
import {
  clearList,
  getByCategory,
  getByName,
  getBySellerAndTime,
  getByType,
  putProduct,
  updateStatus,
} from "../../actions/product/product.actions";
import {
  addToBought,
  getBuyer,
  putNewBid,
} from "../../actions/buyer/buyer.actions";
import { BrowseComponent } from "./browse.component";

const mapStateToProps = (state: IState) => ({product: state.product, buyer: state.buyer});

export const mapDispatchToProps = {
  addToBought,
  clearList,
  getBuyer,
  getByCategory,
  getByName,
  getBySellerAndTime,
  getByType,
  putNewBid,
  putProduct,
  updateStatus,
};

export const BrowseContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(BrowseComponent);
