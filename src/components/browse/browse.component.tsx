import * as React from "react";
import { IProduct } from "../../reducers";
import { setTimeout } from "timers";
import { RouteProps } from "react-router";
// import { TypeOptions } from "./type-options.component";
// import { CategotyOptions } from "./category-options.component";
// import { SortOptions } from "./sorting-options.component";

interface IProp extends IProduct, RouteProps {
  history: any;
  getByName: (name: string) => void;
  getByCategory: (category: string) => void;
  getByType: (type: string) => void;
  getBySellerAndTime: (username: string, timePosted: number) => Promise<any>;
  // updateName: (name: string) => void;
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
    setTimeout(this.setFiltered, 1500)

    this.setState({ filteredList: this.props.productList })
  }

  public submitSearch = (e: any) => {
    e.preventDefault();
    if (this.state.currentSearchCriteria === "name") {
      this.props.getByName(this.state.searchText);
    }

    if (this.state.currentSearchCriteria === "category") {
      console.log(" entered if category ");
      console.log(this.state.currentCategory);
      this.props.getByCategory(this.state.currentCategory);
    }

    if (this.state.currentSearchCriteria === "type") {
      console.log(" entered if type ");
      console.log(this.state.currentType);
      this.props.getByType(this.state.currentType);
    }

    if (this.state.currentSearchCriteria === 'type') {
      console.log(' entered if type ')
      console.log(this.state.currentType)
      this.props.getByType(this.state.currentType)

    }

    setTimeout(this.setFiltered, 1500)

    this.setState({ filteredList: this.props.productList })
    this.setState({ searchText: '' })
    this.reset()

  } // end submit search 






  public updateCriteria = (e: any) => {


    this.setState({ currentSearchCriteria: e.target.value });
    console.log(this.state.currentSearchCriteria);

  } // end update criteria 

  public updateCategory = (e: any) => {


    this.setState({ currentCategory: e.target.value });
    console.log(this.state.currentCategory);

  } // end update criteria 


  public updatetype = (e: any) => {


    this.setState({ currentType: e.target.value });
    console.log(this.state.currentType);

  } // end update criteria 






  public sort = (e: any) => {

    console.log(e.target.value)
    const filtered = this.state.filteredList.filter((p: any) => {

      return p.name.indexOf(e.target.value) !== -1;

    }) // end sort

    this.setState({ filteredList: filtered })

  }




  public setFiltered = () => {

    this.setState({ filteredList: this.props.productList })
    this.setState({ unfiltered: this.props.productList })
    console.log(this.state.filteredList)

  } // end set state




  public sortCategoryName = (e: any) => {


    if (this.state.typeSelected) {



      console.log('type was selected')
      console.log(`type was selected ${this.state.currentType}`)
      const filtered = this.state.currentTypeSortingList.filter((p: any) => {

        return p.category.indexOf(e.target.value) !== -1;

      })

      this.setState({ filteredList: filtered })



    } else {

      console.log(this.state.selected);
      console.log(e.target.value);

      const filtered = this.state.unfiltered.filter((p: any) => {

        return p.category.indexOf(e.target.value) !== -1;

      })

      this.setState({ currentCategorySortingList: filtered })
      this.setState({ filteredList: filtered })

    }
    this.setState({ categorySelected: true })
    this.setState({ currentSortingCategory: e.target.value })

  } //  end sortCategory 

  public sortTypeName = (e: any) => {

    if (this.state.categorySelected) {



      console.log(`category was selected ${this.state.currentCategory}`)
      const filtered = this.state.currentCategorySortingList.filter((p: any) => {

        return p.type.indexOf(e.target.value) !== -1;

      })

      this.setState({ filteredList: filtered })

    } else {

      console.log(this.state.selected);
      console.log(e.target.value);

      const filtered = this.state.unfiltered.filter((p: any) => {

        return p.type.indexOf(e.target.value) !== -1;

      })
      this.setState({ currentTypeSortingList: filtered })
      this.setState({ filteredList: filtered })

    }

    this.setState({ typeSelected: true })
    this.setState({ currentSortingType: e.target.value })

  } //  end sortType 

  public sortCategory = (e: any) => {

    console.log(this.state.selected);
    console.log(e.target.value);

    const filtered = this.state.unfiltered.filter((p: any) => {

      return p.category.indexOf(e.target.value) !== -1;

    })

    this.setState({ filteredList: filtered })



  } //  end sortCategory 


  public sortType = (e: any) => {


    console.log(this.state.selected);
    console.log(e.target.value);

    const filtered = this.state.unfiltered.filter((p: any) => {

      return p.type.indexOf(e.target.value) !== -1;

    })

    this.setState({ filteredList: filtered })



  } //  end sortCategory 




  public getUnfilteredTypeList = () => {


    this.setState({ filteredList: this.state.unfiltered })
    // this.state.currentSortingCategory
    // this.state.currentSortingType



  } // end getUnfilteredTypeList



  public getUnfilteredCategoryList = (e: any) => {


    this.setState({ filteredList: this.state.unfiltered })
    // this.setState({currentSortingType:"pocket"})
    // this.setState({currentSortingCategory:"animation"})
    e.target.value = "";

  } // end  getUnfilteredCategoryList

  public reset = () => {


    this.setState({ filteredList: this.state.unfiltered })
    this.setState({ currentSortingType: '' })
    this.setState({ currentSortingCategory: "" })
    this.setState({ categorySelected: false })
    this.setState({ typeSelected: false })
  } // end  getUnfilteredCategoryList


  public selectItem = (username: string, timePosted: number) => (e: any) => {
    this.props
      .getBySellerAndTime(username, timePosted)
      .then(resp => {
        this.props.history.push("/item");
      })
      .catch(err => console.log(err));
  };



  public render() {
    return (


      // <div className="container">
      <div className="row">
        <div className="col-2">
          {/* Sorting Options starts here  */}
          {
            this.state.currentSearchCriteria === 'name' &&
            <div>
              <h3> Sort options </h3>
              <div><button type="button" className="btn btn-secondary" onClick={this.reset} name='categotyChoice'>Reset Filter</button></div>
              <div>
                <h4>Category</h4>
                {/* <input checked ={this.state.checkRadio} name='categotyChoice' type="radio" value='none' />none */}
                <ul className="list-group">
                         <li className="list-group-item"><input checked={this.state.currentSortingCategory === 'animation'} onChange={this.sortCategoryName} name='categotyChoice' type="radio" value="animation" />Animation</li>
                         <li className="list-group-item"><input checked={this.state.currentSortingCategory === 'apprel'} onChange={this.sortCategoryName} name='categotyChoice' type="radio" value="apparel" />Apparel</li>
                         <li className="list-group-item"><input checked={this.state.currentSortingCategory === 'games'} onChange={this.sortCategoryName} name='categotyChoice' type="radio" value="games" />Games</li>
                         <li className="list-group-item"><input checked={this.state.currentSortingCategory === 'heroes'} onChange={this.sortCategoryName} name='categotyChoice' type="radio" value="heroes" />Heroes</li>
                         <li className="list-group-item"><input checked={this.state.currentSortingCategory === 'home'} onChange={this.sortCategoryName} name='categotyChoice' type="radio" value="home" />Home</li>
                         <li className="list-group-item"><input checked={this.state.currentSortingCategory === 'movies'} onChange={this.sortCategoryName} name='categotyChoice' type="radio" value="movies" />Movies</li>
                         <li className="list-group-item"><input checked={this.state.currentSortingCategory === 'music'} onChange={this.sortCategoryName} name='categotyChoice' type="radio" value="music" />Music</li>
                         <li className="list-group-item"><input checked={this.state.currentSortingCategory === 'rides'} onChange={this.sortCategoryName} name='categotyChoice' type="radio" value="rides" />Rides</li>
                         <li className="list-group-item"><input checked={this.state.currentSortingCategory === 'sports'} onChange={this.sortCategoryName} name='categotyChoice' type="radio" value="sports" />Sports</li>
                         <li className="list-group-item"><input checked={this.state.currentSortingCategory === 'television'} onChange={this.sortCategoryName} name='categotyChoice' type="radio" value="television" />Television</li>
                         <li className="list-group-item"><input checked={this.state.currentSortingCategory === 'star wars'} onChange={this.sortCategoryName} name='categotyChoice' type="radio" value="star wars" />Star Wars</li>
                         </ul>
                         </div>
              <div>
                <h4>Types</h4>
                <ul className="list-group">
                {/* <input   name='typeChoice' type="radio" value='none' />none                     */}
                         <li className="list-group-item"> <input checked={this.state.currentSortingType === 'pop'} onChange={this.sortTypeName} name='typeChoice' type="radio" value="pop" />POP!</li>
                         <li className="list-group-item"> <input checked={this.state.currentSortingType === 'pocket'} onChange={this.sortTypeName} name='typeChoice' type="radio" value="pocket" />Pocket</li>
                         <li className="list-group-item"> <input checked={this.state.currentSortingType === 'vinyl'} onChange={this.sortTypeName} name='typeChoice' type="radio" value="vinyl" />Vinyl</li>
                         <li className="list-group-item"> <input checked={this.state.currentSortingType === 'plush'} onChange={this.sortTypeName} name='typeChoice' type="radio" value="plush" />Plush</li>
                         </ul>
                       </div>
            </div>
          }
          {
            this.state.currentSearchCriteria === 'category' &&
            <div>
              <div>
                <h3> Sort options </h3>
                <h4>Types</h4>
                   <ul className="list-group">
                          <li className="list-group-item"> <input onChange={this.getUnfilteredTypeList} name='typeChoice' type="radio" value="" />none</li>
                          <li className="list-group-item"> <input onChange={this.sortType} name='typeChoice' type="radio" value="pop" />POP!</li>
                          <li className="list-group-item"> <input onChange={this.sortType} name='typeChoice' type="radio" value="pocket" />Pocket</li>
                          <li className="list-group-item"> <input onChange={this.sortType} name='typeChoice' type="radio" value="vinyl" />Vinyl</li>
                          <li className="list-group-item"> <input onChange={this.sortType} name='typeChoice' type="radio" value="plush" />Plush</li>
                    </ul>
                 </div>
            </div>

          }
          {
            this.state.currentSearchCriteria === 'type' &&
            <div>
              <div>
                <h3> Sort options </h3>
                <h4>Category</h4>
                       <ul className="list-group">
                          <li className="list-group-item"><input onChange={this.getUnfilteredCategoryList} name='categotyChoice' type="radio" />none</li>
                          <li className="list-group-item"> <input onChange={this.sortCategory} name='categotyChoice' type="radio" value="animation" />Animation</li>
                          <li className="list-group-item"> <input onChange={this.sortCategory} name='categotyChoice' type="radio" value="apparel" />Apparel</li>
                          <li className="list-group-item"> <input onChange={this.sortCategory} name='categotyChoice' type="radio" value="games" />Games</li>
                          <li className="list-group-item"> <input onChange={this.sortCategory} name='categotyChoice' type="radio" value="heroes" />Heroes</li>
                          <li className="list-group-item"> <input onChange={this.sortCategory} name='categotyChoice' type="radio" value="home" />Home</li>
                          <li className="list-group-item"> <input onChange={this.sortCategory} name='categotyChoice' type="radio" value="movies" />Movies</li>
                          <li className="list-group-item"> <input onChange={this.sortCategory} name='categotyChoice' type="radio" value="music" />Music</li>
                          <li className="list-group-item"> <input onChange={this.sortCategory} name='categotyChoice' type="radio" value="rides" />Rides</li>
                          <li className="list-group-item"> <input onChange={this.sortCategory} name='categotyChoice' type="radio" value="sports" />Sports</li>
                          <li className="list-group-item"> <input onChange={this.sortCategory} name='categotyChoice' type="radio" value="television" />Television</li>
                          <li className="list-group-item"> <input onChange={this.sortCategory} name='categotyChoice' type="radio" value="star wars" />Star Wars</li>
                        </ul>
                       </div>
            </div>
          }
          {/* Sorting Options ends here */}
          {/* end of first column */}
        </div>
        <div className="col-10">
          {/* POP! display Starts here */}
          This is the browse Page. It will display searched Pops.
        <br />
          <form onSubmit={this.submitSearch}>
            <select onChange={this.updateCriteria}>
              <option value="name">Name</option>
              <option value="category">Category</option>
              <option value="type">Type</option>
            </select>
            {this.state.currentSearchCriteria === "name" && (
              <input
                type="text"
                placeholder="Search POP!"
                value={this.state.searchText}
                onChange={this.updateSearch}
              />
            )}
            {this.state.currentSearchCriteria === "category" && (
              <div>
                <select onChange={this.updateCategory}>
                  <option value="" />
                  <option value="animation">Animation</option>
                  <option value="apparel">Apparel</option>
                  <option value="games">Games</option>
                  <option value="heroes">Heroes</option>
                  <option value="home">Home</option>
                  <option value="movies">Movies</option>
                  <option value="music">Music</option>
                  <option value="rides">Rides</option>
                  <option value="sports">Sports</option>
                  <option value="television">Television</option>
                  <option value="Star Wars">Star Wars</option>
                </select>
              </div>
            )}
            {this.state.currentSearchCriteria === "type" && (
              <div>
                <select onChange={this.updatetype}>
                  <option value="" />
                  <option value="pop">POP!</option>
                  <option value="pocket">Pocket</option>
                  <option value="vinyl">Vinyl</option>
                  <option value="plush">Plush</option>
                  <option value="keychain">Keychain</option>
                </select>
              </div>
            )}
            <button type="submit">Search Now</button>
          </form>
          <div className="container">
            <div className="row">
              {this.state.filteredList.length > 0 &&
                this.state.filteredList.map((product: any) => (
                  <div
                    className="card col-3 pop-card browse-pop-card"
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
                      <li className="list-group-item">
                        Category: {product.category}
                      </li>
                      <li className="list-group-item">Type: {product.type}</li>
                      <li className="list-group-item">
                        Condition: {product.condition}
                      </li>
                    </ul>
                  </div>
                ))}
              {/* POP! display ends here */}
              {/* end second column  */}
            </div>
            {/* end row */}
          </div>
          {/* end block */}
        </div>
      </div>
    );
  }
}  // end of component 
