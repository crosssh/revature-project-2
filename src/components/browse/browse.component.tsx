import * as React from "react";
import { IProduct, IBuyer } from "../../reducers";
import { setTimeout } from "timers";
import { RouteProps } from "react-router";
import * as  ReactCSSTransitionGroup from 'react-addons-css-transition-group';
// import '../browse/browse.css'


interface IProp extends IBuyer, IProduct, RouteProps {
  history: any;
  buyer: any;
  product: any;
  addToBought: (newBought: any, boughtItems: any[]) => void;
  clearList: () => void;
  getBuyer: (username: string) => Promise<any>;
  getByName: (name: string) => void;
  getByCategory: (category: string) => void;
  getByType: (type: string) => void;
  getBySellerAndTime: (username: string, timePosted: number) => Promise<any>;
  putNewBid: (currentBuyer: any) => void;
  putProduct: (product: any) => void;
}

export class BrowseComponent extends React.Component<IProp, any> {
  constructor(props: any) {
    super(props);
    console.log(props);
    this.state = {
      categorySelected: false,
      currentCategory: '',
      currentCategorySortingList: [],
      currentSearchCriteria: 'name',
      currentSortingCategory: '',
      currentSortingType: '',
      currentType: '',
      currentTypeSortingList: [],
      filteredList: [],
      searchText: '',
      selected: true,
      selectedOption: '',
      typeSelected: false,
      unfilteredList: []
    }
  }

  public updateSearch = (e: any) => {
    this.setState({ searchText: e.target.value });
  };

  public componentDidMount() {
    this.props.getByName(this.state.searchText);
    setTimeout(this.setFiltered, 1500);
     
  }

  public componentWillUnmount() {
    this.props.clearList();
  }

  public submitSearch = (e: any) => {
    e.preventDefault();
    if (this.state.currentSearchCriteria === "name") {
      this.props.getByName(this.state.searchText);
    }

    if (this.state.currentSearchCriteria === "category") {
      this.props.getByCategory(this.state.currentCategory);
    }

    if (this.state.currentSearchCriteria === "type") {
      this.props.getByType(this.state.currentType);
    }

    if (this.state.currentSearchCriteria === 'type') {
      this.props.getByType(this.state.currentType)

    }
    setTimeout(this.setFiltered, 1500)
    this.setState({ filteredList: this.props.product.productList })
    this.setState({ searchText: '' })
    this.reset()
  }

  public updateCriteria = (e: any) => {
    this.setState({ currentSearchCriteria: e.target.value });
  }

  public updateCategory = (e: any) => {
    this.setState({ currentCategory: e.target.value });
  }


  public updatetype = (e: any) => {
    this.setState({ currentType: e.target.value });
  }

  public sort = (e: any) => {
    const filtered = this.state.filteredList.filter((p: any) => {
      return p.name.indexOf(e.target.value) !== -1;
    })
    this.setState({ filteredList: filtered })
  }

  public setFiltered = () => {
    this.setState({ filteredList: this.props.product.productList })
    this.setState({ unfiltered: this.props.product.productList })
    this.reset();
    this.state.filteredList.forEach((product: any) => {
      if (parseInt(product.auctionEndTime, 10) <= Date.now()) {
        const tempProduct = product;
        if (product.currentBidPrice !== 0) {
          tempProduct.status = 'sold';
          const item = {
            boughtPrice: product.currentBidPrice,
            itemName: product.name,
            seller: product.username,
            timeBought: Date.now(),
            timePosted: product.timePosted
          }

          this.props.getBuyer(product.currentBidder)
            .then(resp => {
              this.props.addToBought(item, this.props.buyer.currentBuyer.boughtItems);
              this.props.putProduct(tempProduct);
              this.forceUpdate(() => {
                this.props.putNewBid(this.props.buyer.currentBuyer);
              })
            })
            .catch(err => {
              console.log(err)
            })
        } else {
          tempProduct.auctionEndTime = product.auctionEndTime + 86400000;
          this.props.putProduct(tempProduct);
        }
      }
    });
  }

  public sortCategoryName = (e: any) => {
    if (this.state.typeSelected) {
      const filtered = this.state.currentTypeSortingList.filter((p: any) => {
        return p.category.toLowerCase().indexOf(e.target.value) !== -1;
      })
      this.setState({ filteredList: filtered })
    } else {
      const filtered = this.state.unfiltered.filter((p: any) => {
        return p.category.toLowerCase().indexOf(e.target.value) !== -1;
      })
      this.setState({ currentCategorySortingList: filtered })
      this.setState({ filteredList: filtered })
    }
    this.setState({ categorySelected: true })
    this.setState({ currentSortingCategory: e.target.value })
  }

  public sortTypeName = (e: any) => {
    if (this.state.categorySelected) {
      const filtered = this.state.currentCategorySortingList.filter((p: any) => {
        return p.type.toLowerCase().indexOf(e.target.value) !== -1;
      })
      this.setState({ filteredList: filtered })
    } else {
      const filtered = this.state.unfiltered.filter((p: any) => {
        return p.type.toLowerCase().indexOf(e.target.value) !== -1;
      })
      this.setState({ currentTypeSortingList: filtered })
      this.setState({ filteredList: filtered })
    }
    this.setState({ typeSelected: true })
    this.setState({ currentSortingType: e.target.value })
  }

  public sortCategory = (e: any) => {
    const filtered = this.state.unfiltered.filter((p: any) => {
      return p.category.toLowerCase().indexOf(e.target.value) !== -1;
    })
    this.setState({ filteredList: filtered })
  }

  public sortType = (e: any) => {
    const filtered = this.state.unfiltered.filter((p: any) => {
      return p.type.toLowerCase().indexOf(e.target.value) !== -1;
    })
    this.setState({ filteredList: filtered })
  }

  public getUnfilteredTypeList = () => {
    this.setState({ filteredList: this.state.unfiltered })
  }


  public getUnfilteredCategoryList = (e: any) => {
    this.setState({ filteredList: this.state.unfiltered })
    e.target.value = "";
  }

  public reset = () => {
    this.setState({ filteredList: this.state.unfiltered })
    this.setState({ currentSortingType: 'none' })
    this.setState({ currentSortingCategory: "none" })
    this.setState({ categorySelected: false })
    this.setState({ typeSelected: false })
  }

  public selectItem = (username: string, timePosted: number) => (e: any) => {
    this.props
      .getBySellerAndTime(username, timePosted)
      .then(resp => {
        this.props.history.push("/item");
      })
      .catch(err => console.log(err));
  };

  public formatTime = (time: any) => {
    const newTime = new Date(time);
    return `on 
    ${newTime.toDateString()}  at ` + newTime.toLocaleTimeString()
  }

  public getUnfilteredTypeListName = (e: any) => {

    if (!this.state.categorySelected) {

      this.setState({ filteredList: this.state.unfiltered })
      this.setState({ typeSelected: false })

    } else {

      const filtered = this.state.unfiltered.filter((p: any) => {
        return p.category.toLowerCase().indexOf(this.state.currentSortingCategory) !== -1;
      })
      this.setState({ currentCategorySortingList: filtered })
      this.setState({ filteredList: filtered })
      // this.setState({ filteredList: this.state.currentCategorySortingList })
      this.setState({ typeSelected: false })

    }
    this.setState({ currentSortingType: e.target.value })

  }


  public getUnfilteredCategoryListName = (e: any) => {

    if (!this.state.typeSelected) {
      this.setState({ filteredList: this.state.unfiltered })
      this.setState({ categorySelected: false })

    }
    else {
      const filtered = this.state.unfiltered.filter((p: any) => {
        return p.type.toLowerCase().indexOf(this.state.currentSortingType) !== -1;
      })
      this.setState({ currentTypeSortingList: filtered })
      this.setState({ filteredList: filtered })
      // this.setState({ filteredList: this.state.currentTypeSortingList })
      this.setState({ categorySelected: false })
    }
    this.setState({ currentSortingCategory: e.target.value })
  }

  public render() {
    return (
      <div className="row">
        <div className="col-2">
          {
            this.state.currentSearchCriteria === 'name' &&                                                                                                                                             
            <div>                                                                                                            
              <h4> Sort options </h4>
              <div><button type="button" className="btn btn-secondary" onClick={this.reset} name='categoryChoice'>Reset Filter</button></div>
              <div>
                <h5>Category</h5>
                <ul className="list-group ">
                  <li className="list-group-item grow"><input checked={this.state.currentSortingCategory === 'none'} onChange={this.getUnfilteredCategoryListName} name='categoryChoice' type="radio" value='none' />none</li>
                  <li className="list-group-item grow"><input checked={this.state.currentSortingCategory === 'animation'} onChange={this.sortCategoryName} name='categoryChoice' type="radio" value="animation" />Animation</li>
                  <li className="list-group-item grow"><input checked={this.state.currentSortingCategory === 'games'} onChange={this.sortCategoryName} name='categoryChoice' type="radio" value="games" />Games</li>
                  <li className="list-group-item grow"><input checked={this.state.currentSortingCategory === 'heroes'} onChange={this.sortCategoryName} name='categoryChoice' type="radio" value="heroes" />Heroes</li>
                  <li className="list-group-item grow"><input checked={this.state.currentSortingCategory === 'movies'} onChange={this.sortCategoryName} name='categoryChoice' type="radio" value="movies" />Movies</li>
                  <li className="list-group-item grow"><input checked={this.state.currentSortingCategory === 'music'} onChange={this.sortCategoryName} name='categoryChoice' type="radio" value="music" />Music</li>
                  <li className="list-group-item grow"><input checked={this.state.currentSortingCategory === 'rides'} onChange={this.sortCategoryName} name='categoryChoice' type="radio" value="rides" />Rides</li>
                  <li className="list-group-item grow"><input checked={this.state.currentSortingCategory === 'sports'} onChange={this.sortCategoryName} name='categoryChoice' type="radio" value="sports" />Sports</li>
                  <li className="list-group-item grow"><input checked={this.state.currentSortingCategory === 'star wars'} onChange={this.sortCategoryName} name='categoryChoice' type="radio" value="star wars" />Star Wars</li>
                  <li className="list-group-item grow"><input checked={this.state.currentSortingCategory === 'television'} onChange={this.sortCategoryName} name='categoryChoice' type="radio" value="television" />Television</li>
                  <li className="list-group-item grow"><input checked={this.state.currentSortingCategory === 'other'} onChange={this.sortCategoryName} name='categoryChoice' type="radio" value="other" />Other</li>
                </ul>
              </div>
              <div>
                <h5>Types</h5>
                <ul className="list-group">
                  <li className="list-group-item grow"> <input checked={this.state.currentSortingType === 'none'} onChange={this.getUnfilteredTypeListName} name='typeChoice' type="radio" value="none" />none</li>
                  <li className="list-group-item grow"> <input checked={this.state.currentSortingType === 'pop'} onChange={this.sortTypeName} name='typeChoice' type="radio" value="pop" />POP!</li>
                  <li className="list-group-item grow"> <input checked={this.state.currentSortingType === 'pocket'} onChange={this.sortTypeName} name='typeChoice' type="radio" value="pocket" />Pocket</li>
                  <li className="list-group-item grow"> <input checked={this.state.currentSortingType === 'vinyl'} onChange={this.sortTypeName} name='typeChoice' type="radio" value="vinyl" />Vinyl</li>
                  <li className="list-group-item grow"> <input checked={this.state.currentSortingType === 'keychain'} onChange={this.sortTypeName} name='typeChoice' type="radio" value="keychain" />Keychain</li>
                  <li className="list-group-item grow"> <input checked={this.state.currentSortingType === 'plush'} onChange={this.sortTypeName} name='typeChoice' type="radio" value="plush" />Plush</li>
                </ul>
              </div>
            </div>
          }
          {
            this.state.currentSearchCriteria === 'category' &&
            <div>
              <div>
                <h3> Sort options </h3>
                <h5>Types</h5>
                <ul className="list-group">
                  <li className="list-group-item grow"> <input onChange={this.getUnfilteredTypeList} name='typeChoice' type="radio" value="" />none</li>
                  <li className="list-group-item grow"> <input onChange={this.sortType} name='typeChoice' type="radio" value="pop" />POP!</li>
                  <li className="list-group-item grow"> <input onChange={this.sortType} name='typeChoice' type="radio" value="keychain" />Keychain</li>
                  <li className="list-group-item grow"> <input onChange={this.sortType} name='typeChoice' type="radio" value="pocket" />Pocket</li>
                  <li className="list-group-item grow"> <input onChange={this.sortType} name='typeChoice' type="radio" value="vinyl" />Vinyl</li>
                  <li className="list-group-item grow"> <input onChange={this.sortType} name='typeChoice' type="radio" value="plush" />Plush</li>
                </ul>
              </div>
            </div>

          }
          {
            this.state.currentSearchCriteria === 'type' &&
            <div>
              <div>
                <h3> Sort options </h3>
                <h5>Category</h5>
                <ul className="list-group">
                  <li className="list-group-item grow"><input onChange={this.getUnfilteredCategoryList} name='categoryChoice' type="radio" />none</li>
                  <li className="list-group-item grow"> <input onChange={this.sortCategory} name='categoryChoice' type="radio" value="animation" />Animation</li>
                  <li className="list-group-item grow"> <input onChange={this.sortCategory} name='categoryChoice' type="radio" value="games" />Games</li>
                  <li className="list-group-item grow"> <input onChange={this.sortCategory} name='categoryChoice' type="radio" value="heroes" />Heroes</li>
                  <li className="list-group-item grow"> <input onChange={this.sortCategory} name='categoryChoice' type="radio" value="movies" />Movies</li>
                  <li className="list-group-item grow"> <input onChange={this.sortCategory} name='categoryChoice' type="radio" value="music" />Music</li>
                  <li className="list-group-item grow"> <input onChange={this.sortCategory} name='categoryChoice' type="radio" value="rides" />Rides</li>
                  <li className="list-group-item grow"> <input onChange={this.sortCategory} name='categoryChoice' type="radio" value="sports" />Sports</li>
                  <li className="list-group-item grow"> <input onChange={this.sortCategory} name='categoryChoice' type="radio" value="star wars" />Star Wars</li>
                  <li className="list-group-item grow"> <input onChange={this.sortCategory} name='categoryChoice' type="radio" value="television" />Television</li>
                  <li className="list-group-item grow"> <input onChange={this.sortCategory} name='categoryChoice' type="radio" value="other" />Other</li>
                </ul>
              </div>
            </div>
          }
        </div>
        <div className="col-10">
          <h1 className="bubble-font">Browse our collection of POPS for sale</h1>
          <br />
          <div className="container">
            <form className="form-group" onSubmit={this.submitSearch}>
              <div className="row">
                <div className="col-2">
                  <select className="form-control" onChange={this.updateCriteria}>
                    <option value="name">Name</option>
                    <option value="category">Category</option>
                    <option value="type">Type</option>
                  </select>
                </div>
                <div className="col-2">
                  {this.state.currentSearchCriteria === "name" && (
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Search POP!"
                      value={this.state.searchText}
                      onChange={this.updateSearch}
                    />
                  )}
                  {this.state.currentSearchCriteria === "category" && (
                    <div>
                      <select className="form-control" onChange={this.updateCategory}>
                        <option value="" />
                        <option value="animation">Animation</option>
                        <option value="games">Games</option>
                        <option value="heroes">Heroes</option>
                        <option value="movies">Movies</option>
                        <option value="music">Music</option>
                        <option value="rides">Rides</option>
                        <option value="sports">Sports</option>
                        <option value="star wars">Star Wars</option>
                        <option value="television">Television</option>
                        <option value="home">Other</option>
                      </select>
                    </div>
                  )}
                  {this.state.currentSearchCriteria === "type" && (
                    <div>
                      <select className="form-control" onChange={this.updatetype}>
                        <option value="" />
                        <option value="pop">POP!</option>
                        <option value="pocket">Pocket</option>
                        <option value="vinyl">Vinyl</option>
                        <option value="plush">Plush</option>
                        <option value="keychain">Keychain</option>
                      </select>
                    </div>
                  )}
                </div>
                <div className="col">
                
                  <button className="btn btn-secondary" type="submit">Search</button>
                </div>
              </div>
            </form>
          </div>
          <div className="container">
            <div className="row">

              {this.state.filteredList.length > 0 &&


                this.state.filteredList.map((product: any) => (

                  <ReactCSSTransitionGroup transitionName="example"
                    transitionAppear={true} transitionAppearTimeout={700}
                    transitionEnter={false} transitionLeave={false}>

                    <div
                      className="card col-3 pop-card browse-pop-card grow"
                      key={product.timePosted}
                      onClick={this.selectItem(product.username, product.timePosted)}
                    >
                      <img
                        className="card-img-top pop-card-img"
                        src={
                          "http://popbay-photo-storage.s3.amazonaws.com/" +
                          product.photoNames[0]
                        }
                        alt="Card image cap"
                      />
                      <div className="card-title">
                        <h5>{product.name}</h5>
                      </div>
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item">Category: {product.category}</li>
                        <li className="list-group-item">Type: {product.type}</li>
                        <li className="list-group-item">Condition: {product.condition}</li>
                        <li className="list-group-item">Auction ends {this.formatTime(product.auctionEndTime)}</li>
                      </ul>
                    </div>
                  </ReactCSSTransitionGroup>
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
} 