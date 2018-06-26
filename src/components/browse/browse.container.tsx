import { connect } from "react-redux";
import { IState } from "../../reducers";
import {
  clearList,
  getByCategory,
  getByName,
  getBySellerAndTime,
  getByType,
} from "../../actions/product/product.actions";
import { BrowseComponent } from "./browse.component";

const mapStateToProps = (state: IState) => state.product;

export const mapDispatchToProps = {
  clearList,
  getByCategory,
  getByName,
  getBySellerAndTime,
  getByType,
};

export const BrowseContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(BrowseComponent);
