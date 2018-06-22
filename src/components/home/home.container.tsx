import { connect } from "react-redux";
import { IState } from "../../reducers";
import { HomeComponent } from "./home.component";
import { getRecent, updateUrl } from "../../actions/product/product.actions";

const mapStateToProps = (state: IState) => state.product;

export const mapDispatchToProps = {
  getRecent,
  updateUrl
};

export const HomeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeComponent);
