import { connect } from 'react-redux';
import { IState } from '../../reducers';

import {updateBrowseSearchCriteria ,updateBrowseSearchTerm ,updateBrowseResults} from '../../actions/browse/browse.actions';
import { BrowseComponent } from './browse.component';

const mapStateToProps = (state: IState) => (state.product);

export const mapDispatchToProps = {
   
  updateBrowseResults,
  updateBrowseSearchCriteria ,
  updateBrowseSearchTerm ,
  
};

export const BrowseContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(BrowseComponent);


