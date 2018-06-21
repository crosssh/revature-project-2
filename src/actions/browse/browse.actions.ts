import { browseTypes } from "./browse.types";
// import { productInterceptor } from "../../interceptors/product.interceptor";
// import { environment } from "../../environment";


export const updateBrowseSearchCriteria = (browseCriteria: string) => {
  return {
    payload: {
      browseCriteria
    },
    type: browseTypes.UPDATE_BROWSE_SEARCH_CRITERIA,
  }
}

export const updateBrowseSearchTerm = (browseTerm: string) => {
  return {
    payload: {
      browseTerm
    },
    type: browseTypes.UPDATE_BROWSE_SEARCH_TERM,
  }
}

 

export const updateBrowseResults = (browseCriteria: string, browseTerm : string) => {
  return {
    payload: {     
       
      // browseResults
      // this action will make fetch of products by browseCriteria
      // the data (products) fetch will be filtered by browseTerm 

    },
    type: browseTypes.UPDATE_BROwSE_SEARCH_RESULTS,
  }
}
