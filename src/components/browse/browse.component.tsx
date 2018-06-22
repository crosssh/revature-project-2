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
      currentCategory:'',
      currentSearchCriteria:'name',
      currentType:'',
      filteredList:[],
      searchText: '',
      show:false,
      
      
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
    
  setTimeout (this.setFiltered,1000)
   
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
  console.log(this.state.filteredList)

  } // end set state

   

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
                  
                   
                  this.props.productList.map((p:any) =>
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
      
               this.state.filteredList.length !== 0 && this.state.currentSearchCriteria ==='name' &&
              <div> 
                
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

                        <div>
                        <select onChange={this.updatetype}>
                        <option value=""></option>
                        <option value="pop">POP!</option>
                        <option value="pocket">Pocket</option>
                        <option value="vinyl">Vinyl</option>
                        <option value="plush">Plush</option>
                        </select>
                        </div>


              </div>

              }






               {
      
               this.state.filteredList.length !== 0 && this.state.currentSearchCriteria ==='category' &&
              <div> 
                
                  <div>
                      <input type='text' placeholder ='Search POP!' value={this.state.searchText} onChange={this.updateSearch} />
                  </div>

                  <div>
                  <select onChange={this.updatetype}>
                  <option value=""></option>
                  <option value="pop">POP!</option>
                  <option value="pocket">Pocket</option>
                  <option value="vinyl">Vinyl</option>
                  <option value="plush">Plush</option>
                  </select>
                  </div>


              </div>

              }
        



               {
      
                this.state.filteredList.length !== 0 && this.state.currentSearchCriteria ==='type' &&
              <div> 
                
                      <div>
                          <input type='text' placeholder ='Search POP!' value={this.state.searchText} onChange={this.updateSearch} />
                      </div>

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


              </div>

              }






      {/* end block */}
      </div> 
    );
  }
}
