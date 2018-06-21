import * as React from "react";
import { IBrowse } from "../../reducers";


interface IProp extends IBrowse {

  updateBrowseSearchCriteria: (browseCriteria: string) => void
  updateBrowseSearchTerm: (browseTerm: string) => void
  updateBrowseResults: (browseCriteria: string, browseTerm: string) => void

}



export class BrowseComponent extends React.Component<IProp, any> {
  constructor(props: any) {
    super(props);
    console.log(props);
  }

  public updateBrowseSearchCriteria = (e: any) => {
    const browseCriteria = e.target.value;
    this.props.updateBrowseSearchCriteria(browseCriteria);

  }

  public updateBrowseTerm = (e: any) => {
    const browseTerm = e.target.value;
    this.props.updateBrowseSearchTerm(browseTerm)

  }

  public submit = (e: any) => {
    // const browseTerm = e.target.value;
    e.preventDefault();
    console.log('Searching .....................!!!!!!!!!!!!!!!!!!!!!!')
    this.props.updateBrowseResults(this.props.browseCategory, this.props.browseTerm)

  }


  public render() {
    return (
      <div className="container">
        This is the browse Page. It will display searched Pops.

         <form className="browseForm" onSubmit={this.submit}>

          {/* Dropdown Starts */}

          <select  onSelect={this.updateBrowseSearchCriteria}>

            <option value="name">Name</option>
            <option value="category">Category</option>
            
          </select>

          
          {/* Dropdown Ends */}

          <input onChange={(e: any) => this.updateBrowseTerm}
            value={this.props.browseTerm}
            type="text"
            placeholder="search POP!" />
          <button type="submit" className="btn btn-primary" >Search NOW!</button>



        </form>















      </div>
    );
  }
}
