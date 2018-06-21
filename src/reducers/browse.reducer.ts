import { IBrowse } from '.';
import { browseTypes } from '../actions/browse/browse.types';

const initialState: IBrowse = {

  browseCategory: 'name',
  browseResults: [],
  browseTerm: '',
  

}

export const browseReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case browseTypes.UPDATE_BROWSE_SEARCH_CRITERIA:
      return {
        ...state,        
          browseCategory: action.payload.browseCategory        
      };
      case browseTypes.UPDATE_BROWSE_SEARCH_TERM:
      return {
        ...state,        
          browseTerm: action.payload.browseCategory        
      };

      case browseTypes.UPDATE_BROwSE_SEARCH_RESULTS:
      return {
        ...state,        
          browseResults: action.payload.browseResults     
      };

     



  }// end switch

  return state;
};
