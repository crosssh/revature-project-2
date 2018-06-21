import { connect } from "react-redux";
import { IState } from "../../reducers";
import {
  getByCategory,
  getByName,
  getBySellerAndTime,
  getByType,
  getRecent,
  getSeller
} from "../../actions/product/product.actions";
import { BrowseComponent } from "./browse.component";

const mapStateToProps = (state: IState) => state.product;

export const mapDispatchToProps = {
  getByCategory,
  getByName,
  getBySellerAndTime, // to help with the clicking on one, maybe?
  getByType,
  getRecent, // you never know
  getSeller // you never know, we might need it.
};

export const BrowseContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(BrowseComponent);
