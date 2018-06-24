import { productTypes } from "./product.types";
import { productInterceptor } from "../../interceptors/product.interceptor";
import { environment } from "../../environment";

export const updateBidder = (bidder: string) => {
  return {
    payload: {
      bidder
    },
    type: productTypes.UPDATE_BIDDER
  };
};

export const updateCategory = (category: string) => {
  return {
    payload: {
      category
    },
    type: productTypes.UPDATE_CATEGORY
  };
};

export const updateCondition = (condition: string) => {
  return {
    payload: {
      condition
    },
    type: productTypes.UPDATE_CONDITION
  };
};

export const updateCurrentBid = (currentBid: number) => {
  return {
    payload: {
      currentBid
    },
    type: productTypes.UPDATE_CURRENT_BID
  };
};

export const updateName = (name: string) => {
  return {
    payload: {
      name
    },
    type: productTypes.UPDATE_NAME
  };
};

export const updatePhotos = (file: any, photos: any[]) => {
  return {
    payload: {
      photos: [...photos, file]
    },
    type: productTypes.UPDATE_PHOTOS
  };
};

export const updatePhotoNames = (fileName: string, photoNames: string[]) => {
  return {
    payload: {
      photoNames: [...photoNames, fileName]
    },
    type: productTypes.UPDATE_PHOTO_NAMES
  };
};

export const updateStatus = (status: string) => {
  return {
    payload: {
      status
    },
    type: productTypes.UPDATE_STATUS
  };
};

export const updateType = (type: string) => {
  return {
    payload: {
      type
    },
    type: productTypes.UPDATE_TYPE
  };
};

export const updateProductUsername = (username: string) => {
  return {
    payload: {
      username
    },
    type: productTypes.UPDATE_PRODUCT_USERNAME
  };
};

export const setAuctionEnd = (auctionEnd: number) => {
  return {
    payload: {
      auctionEnd
    },
    type: productTypes.SET_AUCTION_END
  };
};

export const setBuyNow = (buyNowPrice: number) => {
  return {
    payload: {
      buyNowPrice
    },
    type: productTypes.SET_BUY_NOW
  };
};

export const setMinBid = (minBid: number) => {
  return {
    payload: {
      minBid
    },
    type: productTypes.SET_MIN_BID
  };
};

export const setTimePosted = (timePosted: number) => (dispatch: any) => {
  dispatch({
    payload: {
      timePosted
    },
    type: productTypes.SET_TIME_POSTED
  });
};


export const getByCategory = (category: string)=>(dispatch:any) => {


productInterceptor.get(environment.context +'/product')  
.then( resp => {

  const filteredByCategory = resp.data.filter((p:any)=>{

    return p.category.toLowerCase().indexOf(category.toLowerCase()) !== -1;

  })

const filterdByStatus = filteredByCategory.filter((p:any)=>{

  return p.status.toLowerCase().indexOf('available') !== -1;

})

  dispatch({
    payload: {
      productList:  filterdByStatus
    },
    type: productTypes.GET_BY_CATEGORY
  })
})
.catch(err => {
  console.log(err);
});
};

export const getByName =(name: string) => (dispatch:any) => {
  
  
  productInterceptor.get(environment.context +'/product')  
  .then( resp => {

    const filteredByName = resp.data.filter((p:any)=>{
      
      return p.name.toLowerCase().indexOf(name.toLowerCase()) !== -1;
  
    })

    const filterdByStatus = filteredByName.filter((p:any)=>{

      return p.status.toLowerCase().indexOf('available') !== -1;
    
    })
  

    dispatch({
      payload: {
        productList: filterdByStatus
      },
      type: productTypes.GET_BY_NAME

    })
    .catch(err => {
      console.log(err);
    });
};

export const getByType = (type: string) =>(dispatch:any) => {


productInterceptor.get(environment.context +'/product')  
.then( resp => {

  const filteredByType = resp.data.filter((p:any)=>{

    return p.type.toLowerCase().indexOf(type.toLowerCase()) !== -1;

  })

  const filterdByStatus = filteredByType.filter((p:any)=>{

    return p.status.toLowerCase().indexOf('available') !== -1;
  
  })


  productInterceptor
    .get(environment.context + "/product")
    .then(resp => {
      const filteredByType = resp.data.filter((p: any) => {
        return p.type.indexOf(type) !== -1;
      });

  dispatch({
    payload: {
      productList: filterdByStatus
    },
    type: productTypes.GET_BY_TYPE
  })
})
.catch(err => {
  console.log(err);
});
}


export const getRecent = () => (dispatch: any) => {
  productInterceptor
    .get(environment.context + "product/get-last-ten")
    .then(resp => {
      dispatch({
        payload: {
          productList: resp.data
        },
        type: productTypes.GET_RECENT
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const getSeller = (username: string) => (dispatch: any) => {
  productInterceptor
    .get(environment.context + "product/get-seller/" + username)
    .then(resp => {
      dispatch({
        payload: {
          productList: resp.data
        },
        type: productTypes.GET_SELLER
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const getBySellerAndTime = (username: string, timePosted: number) => (
  dispatch: any
) =>
  new Promise(function(resolve, reject) {
    // dispatch({
    //   // some...thing?
    //   type: productTypes.GET_BY_SELLER_AND_TIME
    // });
    productInterceptor
      .get(
        environment.context +
          "product/get-seller/" +
          username +
          "/time/" +
          timePosted
      )
      .then(resp => {
        dispatch({
          payload: {
            chosenItem: resp.data
          },
          type: productTypes.GET_BY_SELLER_AND_TIME
        });
        resolve(resp);
      })
      .catch(err => {
        console.log(err);
        reject(err);
      });
  });

export const updateUrl = (url: string) => {
  return {
    payload: {
      url
    },
    type: productTypes.UPDATE_URL
  };
};

export const addProduct = (currentProduct: any) => (dispatch: any) => {
  currentProduct.timePosted = Date.now();
  console.log(currentProduct);
  productInterceptor
    .post(environment.context + "product/add-pop", currentProduct)
    .then(resp => {
      console.log(resp.statusText);
      dispatch({
        payload: {},
        type: productTypes.ADD_PRODUCT
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const reinitializeProduct = () => {
  return {
    payload: {},
    type: productTypes.REINITIALIZE_PRODUCT
  };
};

export const putProduct = (chosenItem: any) => (dispatch: any) => {
  productInterceptor
  .put(environment.context + 'product/update-product-status/username/'+ chosenItem.username + '/time/' + chosenItem.timePosted, chosenItem)
  .then(resp => {
    console.log(resp);
    dispatch({
      payload: {
  
      },
      type: productTypes.PUT_PRODUCT
    });
  })
  .catch(err => {
    console.log(err);
  });
}