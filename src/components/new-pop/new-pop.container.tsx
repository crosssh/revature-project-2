import { connect } from "react-redux";
import { IState } from "../../reducers";

import {
  addProduct,
  reinitializeProduct,
  setAuctionEnd,
  setBuyNow,
  setMinBid,
  setTimePosted,
  updateBidder,
  updateCategory,
  updateCondition,
  updateName,
  updateProductUsername,
  updatePhotos,
  updatePhotoNames,
  updateStatus,
  updateType
} from "../../actions/product/product.actions";
import { NewPopComponent } from "./new-pop.component";

const mapStateToProps = (state: IState) => ({
  product: state.product,
  user: state.user
});

export const mapDispatchToProps = {
  addProduct,
  reinitializeProduct,
  setAuctionEnd,
  setBuyNow,
  setMinBid,
  setTimePosted,
  updateBidder,
  updateCategory,
  updateCondition,
  updateName,
  updatePhotoNames,
  updatePhotos,
  updateProductUsername,
  updateStatus,
  updateType
};

export const NewPopContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewPopComponent);
