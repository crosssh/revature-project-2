import * as React from "react";
import { IProduct } from "../../reducers";
import { setTimeout } from "timers";
// import { TypeOptions } from "./type-options.component";
// import { CategotyOptions } from "./category-options.component";
// import { SortOptions } from "./sorting-options.component";


// I guess we don't NEED the interface
interface IProp extends IProduct {

  getByName: (name: string)=>void;
  getByCategory:(category: string)=>void;
  getByType:(type: string)=>void;
  // updateName: (name: string) => void;
}
 
export class BrowseComponent extends React.Component<IProp, any> {
  constructor(props: any) {
    super(props);
    console.log(props);
    this.state ={
      
      categorySelected:false,
      checkRadio:"none",  
      currentCategory:'',
      currentCategorySortingList:[],
      currentSearchCriteria:'name',
      currentSortingCategory:'',
      currentSortingType:'',
      currentType:'',
      currentTypeSortingList:[],            
      filteredList:[],
      searchText: '',
      selected:true,
      typeSelected:false,
      unfilteredList:[]
      
      
      
      
      
    }

    
  }





 public updateSearch=(e:any) =>{

    this.setState({searchText: e.target.value});
    
  }






  public submitSearch=(e:any)=>{
    e.preventDefault();
    if(  this.state.currentSearchCriteria === 'name'){

      this.props.getByName(this.state.searchText);

    }

    if ( this.state.currentSearchCriteria === 'category'){
        console.log (' entered if category ')
        console.log (this.state.currentCategory)
        this.props.getByCategory(this.state.currentCategory)
        
    }


    if ( this.state.currentSearchCriteria === 'type'){
      console.log (' entered if type ')
      console.log (this.state.currentType)
      this.props.getByType(this.state.currentType)

  }    
    
  setTimeout (this.setFiltered,1500)
   
    this.setState({filteredList:this.props.productList})
    this.setState({searchText: ''})
    
  } // end submit search 






  public updateCriteria = (e:any)=>{

    
     this.setState ({currentSearchCriteria:e.target.value});
      console.log(this.state.currentSearchCriteria);

  } // end update criteria 

  public updateCategory = (e:any)=>{

    
    this.setState ({currentCategory:e.target.value});
      console.log(this.state.currentCategory);

 } // end update criteria 


 public updatetype = (e:any)=>{

    
  this.setState ({currentType:e.target.value});
   console.log(this.state.currentType);

} // end update criteria 






  public sort = (e:any) =>{

  console.log(e.target.value)
  const filtered  = this.state.filteredList.filter((p:any)=>{

    return p.name.indexOf(e.target.value) !== -1;

  }) // end sort
  
  this.setState({filteredList:filtered})

  }




  public setFiltered = ()=>{

  this.setState({filteredList:this.props.productList})
  this.setState({unfiltered:this.props.productList})
  console.log(this.state.filteredList)

  } // end set state

 
  // public updateAndSortCategory = (e:any)=>{

  //   this.setState ({currentCategory:e.target.value});
  //   this.sortCategory(e);

  // } // end update and sort 

  // public sortCategory =(e:any)=>{

  //   const filtered  = this.state.filteredList.filter((p:any)=>{

  //     return p.category.indexOf(e.target.value) !== -1;
  
  //   }) 

  //   this.setState({filteredList:filtered})

  // } // end sort category

// public sortCategory=(e:any)=>{
//    console.log(this.state.selected); 
//    console.log(e.target.value);
//    const checked =  this.state.selected
    
//    // this.setState({selected:!checked});
//   let filtered :any =[]

//     if (this.state.selected){
//       this.setState({unfiltered:this.state.filteredList})
//       filtered  = this.state.filteredList.filter((p:any)=>{

//         return p.category.indexOf(e.target.value) !== -1;
        
//     }) 
//     this.setState({filteredList:filtered})
//     // this.setState({selected:!checked});
//   }  else {

//     this.setState({filteredList:this.state.unfiltered})
       
//     // this.setState({selected:!checked});
//   }
//   this.setState({selected:!checked});

public sortCategoryName=(e:any)=>{
       

        if (this.state.typeSelected){
           


          console.log('type was selected')
          console.log(`type was selected ${this.state.currentType}`)
          const filtered  = this.state.currentTypeSortingList.filter((p:any)=>{

            return p.category.indexOf(e.target.value) !== -1;
            
        })    
          
          this.setState({filteredList:filtered})  



        } else   {
          
        console.log(this.state.selected); 
        console.log(e.target.value);   
        
          const filtered  = this.state.unfiltered.filter((p:any)=>{

            return p.category.indexOf(e.target.value) !== -1;
            
        })    
          
          this.setState({currentCategorySortingList:filtered})  
          this.setState({filteredList:filtered})  
           
      }
      this.setState({categorySelected:true})
      this.setState({currentSortingCategory:e.target.value})
       
} //  end sortCategory 







public sortTypeName=(e:any)=>{

      if (this.state.categorySelected){
        


        console.log(`category was selected ${this.state.currentCategory}`)
        const filtered  = this.state.currentCategorySortingList.filter((p:any)=>{

          return p.type.indexOf(e.target.value) !== -1;
          
      })    
        
        this.setState({filteredList:filtered})  
        




      } else  {
         
      console.log(this.state.selected); 
      console.log(e.target.value);   
      
        const filtered  = this.state.unfiltered.filter((p:any)=>{

          return p.type.indexOf(e.target.value) !== -1;
          
      })    
        this.setState({currentTypeSortingList:filtered})  
        this.setState({filteredList:filtered})  
       
    }
    this.setState({currentSortingType:e.target.value})
    this.setState({typeSelected:true})
  
} //  end sortType 



 











public sortCategory=(e:any)=>{
 
  console.log(this.state.selected); 
  console.log(e.target.value);   
  
    const filtered  = this.state.unfiltered.filter((p:any)=>{

      return p.category.indexOf(e.target.value) !== -1;
      
  })    
    
    this.setState({filteredList:filtered})  
     

 
} //  end sortCategory 


public sortType=(e:any)=>{

   
  console.log(this.state.selected); 
  console.log(e.target.value);   
  
    const filtered  = this.state.unfiltered.filter((p:any)=>{

      return p.type.indexOf(e.target.value) !== -1;
      
  })    
    
    this.setState({filteredList:filtered})  
     

 
} //  end sortCategory 




public  getUnfilteredTypeList =() =>{


  this.setState({filteredList:this.state.unfiltered})
  // this.state.currentSortingCategory
  // this.state.currentSortingType



} // end getUnfilteredTypeList



public  getUnfilteredCategoryList =(e:any) =>{


  this.setState({filteredList:this.state.unfiltered})
  // this.setState({currentSortingType:"pocket"})
  // this.setState({currentSortingCategory:"animation"})
  e.target.value="";

} // end  getUnfilteredCategoryList

public  reset =(e:any) =>{


  this.setState({filteredList:this.state.unfiltered})
  this.setState({checkRadio:"none"})
   
   
   

} // end  getUnfilteredCategoryList



// public sortByName =(e:any) =>{


//   this.setState({searchText: e.target.value});

//   const filtered  = this.state.filteredList.filter((p:any)=>{

//     return p.name.toLowerCase().indexOf(this.state.searchText) !== -1; 

    
// })    

// this.setState({filteredList: filtered});

// }


  public render() {
    return (
     

      <div className="container">
   
        This is the browse Page. It will display searched Pops.
        <br />

        <form onSubmit={this.submitSearch}>
        <select onChange = {this.updateCriteria} >
          <option value="name">Name</option>
          <option value="category">Category</option>
          <option value="type">Type</option>
        </select> 

          {
             this.state.currentSearchCriteria === 'name' &&
            <input type='text' placeholder ='Search POP!' value={this.state.searchText} onChange={this.updateSearch} />
          }

          {

            this.state.currentSearchCriteria === 'category' &&
            <div>
            <select onChange={this.updateCategory}>
            <option value=""></option>
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
          }

          {

            this.state.currentSearchCriteria === 'type' &&
            <div>
            <select onChange={this.updatetype}>
            <option value=""></option>
            <option value="pop">POP!</option>
            <option value="pocket">Pocket</option>
            <option value="vinyl">Vinyl</option>
            <option value="plush">Plush</option>
            </select>
            </div>

          }
         
          
          <button type='submit'>Search Now</button>
        </form>
          
          
      <table className="table ">
               
              <tbody id="product-table-body">
              
                {
                  
                   
                  this.state.filteredList.map((p:any) =>
                    <tr key={p.timePosted}>
                      <td>{p.name}</td> 
                      <td>{p.buyNowPrice }</td>
                      <td>{p.category }</td>
                      <td>{p.condition }</td>
                      <td>{p.type }</td>                    
                    </tr>
                  )
                }
              </tbody>
            </table>

            

             {
      
               this.state.currentSearchCriteria ==='name' &&
              <div> 
                <h3> Sort options </h3>
                <div><input onClick={this.reset} name='categotyChoice' type="button" />Reset Filter</div>
                            <div>
                            <h4>Category</h4>
                            {/* <input checked ={this.state.checkRadio} name='categotyChoice' type="radio" value='none' />none */}
                          <input onChange={this.sortCategoryName} name='categotyChoice' type="radio" value="animation"/>Animation
                          <input onChange={this.sortCategoryName} name='categotyChoice' type="radio"  value="apparel"/>Apparel
                          <input onChange={this.sortCategoryName} name='categotyChoice' type="radio"  value="games"/>Games
                          <input onChange={this.sortCategoryName} name='categotyChoice' type="radio"  value="heroes"/>Heroes
                          <input onChange={this.sortCategoryName} name='categotyChoice' type="radio"  value="home"/>Home
                          <input onChange={this.sortCategoryName} name='categotyChoice' type="radio"  value="movies"/>Movies
                          <input onChange={this.sortCategoryName} name='categotyChoice' type="radio"  value="music"/>Music
                          <input onChange={this.sortCategoryName} name='categotyChoice' type="radio"  value="rides"/>Rides
                          <input onChange={this.sortCategoryName} name='categotyChoice' type="radio"  value="sports"/>Sports
                          <input onChange={this.sortCategoryName} name='categotyChoice' type="radio"  value="television"/>Television
                          <input onChange={this.sortCategoryName} name='categotyChoice' type="radio"  value="star wars"/>Star Wars  
                          </div>    

                        <div> 
                       
                          <h4>Types</h4>    
                          {/* <input   name='typeChoice' type="radio" value='none' />none                     */}
                          <input onChange={this.sortTypeName} name='typeChoice' type="radio"  value="pop"/>POP!
                          <input onChange={this.sortTypeName} name='typeChoice' type="radio"  value="pocket"/>Pocket
                          <input onChange={this.sortTypeName} name='typeChoice' type="radio"  value="vinyl"/>Vinyl
                          <input onChange={this.sortTypeName} name='typeChoice' type="radio"  value="plush"/>Plush
                        </div>


              </div>

              }






               {
      
               this.state.currentSearchCriteria ==='category' &&
              <div> 
                
                  {/* <div>
                      <input type='text' placeholder ='Search POP!' value={this.state.searchText} onChange={this.updateSearch} />
                  </div> */}

                  <div>
                          <h3> Sort options </h3>
                          <h4>Types</h4>
                          <input onChange={this.getUnfilteredTypeList} name='typeChoice' type="radio" value=""/>none
                          <input onChange={this.sortType} name='typeChoice' type="radio"  value="pop"/>POP!
                          <input onChange={this.sortType} name='typeChoice' type="radio"  value="pocket"/>Pocket
                          <input onChange={this.sortType} name='typeChoice' type="radio"  value="vinyl"/>Vinyl
                          <input onChange={this.sortType} name='typeChoice' type="radio"  value="plush"/>Plush
                           
                  
                  </div>

                  {/* <select onChange={this.updatetype}>
                  <option value=""></option>
                  <option value="pop">POP!</option>
                  <option value="pocket">Pocket</option>
                  <option value="vinyl">Vinyl</option>
                  <option value="plush">Plush</option>
                  </select> */}


              </div>

              }
        



               {
      
                this.state.currentSearchCriteria ==='type' &&
              <div> 
                
                      {/* <div>
                          <input type='text' placeholder ='Search POP!' value={this.state.searchText} onChange={this.updateSearch} />
                      </div> */}

                        <div>
                          <h3> Sort options </h3>
                          <h4>Category</h4>
                          <input onChange={this.getUnfilteredCategoryList} name='categotyChoice' type="radio" />none
                          <input onChange={this.sortCategory} name='categotyChoice' type="radio" value="animation"/>Animation
                          <input onChange={this.sortCategory} name='categotyChoice' type="radio"  value="apparel"/>Apparel
                          <input onChange={this.sortCategory} name='categotyChoice' type="radio"  value="games"/>Games
                          <input onChange={this.sortCategory} name='categotyChoice' type="radio"  value="heroes"/>Heroes
                          <input onChange={this.sortCategory} name='categotyChoice' type="radio"  value="home"/>Home
                          <input onChange={this.sortCategory} name='categotyChoice' type="radio"  value="movies"/>Movies
                          <input onChange={this.sortCategory} name='categotyChoice' type="radio"  value="music"/>Music
                          <input onChange={this.sortCategory} name='categotyChoice' type="radio"  value="rides"/>Rides
                          <input onChange={this.sortCategory} name='categotyChoice' type="radio"  value="sports"/>Sports
                          <input onChange={this.sortCategory} name='categotyChoice' type="radio"  value="television"/>Television
                          <input onChange={this.sortCategory} name='categotyChoice' type="radio"  value="star wars"/>Star Wars                            
                           
                        </div>


              </div>

              }






      {/* end block */}
      </div> 
    );
  }
}
