import { connect } from 'react-redux';
import { IState } from '../../reducers';
import {addToBought,getBuyer,putNewBid, updateBoughtPrice,updateBoughtSeller,updateBoughtTime
  ,updateItemNameBought,updatePostTimeBought } from '../../actions/buyer/buyer.actions';
import { CheckoutComponent } from './checkout.component';

const mapStateToProps = (state: IState) => (state.buyer);

export const mapDispatchToProps = {
  addToBought,
  getBuyer,
  putNewBid,
  updateBoughtPrice,
  updateBoughtSeller,
  updateBoughtTime,
  updateItemNameBought,
  updatePostTimeBought

};

export const CheckoutContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CheckoutComponent);
