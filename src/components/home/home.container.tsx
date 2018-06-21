import { connect } from "react-redux";
import { IState } from "../../reducers";
import { HomeComponent } from "./home.component";
import { getRecent } from "../../actions/product/product.actions";

const mapStateToProps = (state: IState) => state.user;

export const mapDispatchToProps = {
  getRecent
};

export const HomeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeComponent);
