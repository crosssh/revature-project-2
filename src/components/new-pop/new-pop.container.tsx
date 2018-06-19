import { connect } from 'react-redux';
import { IState } from '../../reducers';

import { addProduct,setAuctionEnd,setBuyNow,setMinBid,setTimePosted,updateBidder,updateCategory,updateCondition,updateCurrentBid
,updateName,updatePhotos,updateStatus,updateType} from '../../actions/product/product.actions';
import { NewPopComponent } from './new-pop.component';

const mapStateToProps = (state: IState) => (state.product);

export const mapDispatchToProps = {
   
  addProduct,
  setAuctionEnd,
  setBuyNow,
  setMinBid,
  setTimePosted,
  updateBidder,
  updateCategory,
  updateCondition,
  updateCurrentBid,
  updateName,
  updatePhotos,
  updateStatus,
  updateType
};

export const NewPopContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewPopComponent);


