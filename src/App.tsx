import * as React from "react";

import { NavComponent } from "./components/nav.component";
import "./include/bootstrap";
import "./App.css";
import { HashRouter, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./Store";
import { SignInContainer } from "./components/sign-in/sign-in.container";
import { NewPopContainer } from "./components/new-pop/new-pop.container";
import { CheckoutContainer } from "./components/checkout/checkout.container";
import { UserInfoContainer } from "./components/user-info/user-info.container";
import { SellingContainer } from "./components/selling/selling.container";
import { BidsContainer } from "./components/bids/bids.container";
import { BoughtContainer } from "./components/bought/bought.container";
import { ItemContainer } from "./components/item/item.container";
import { HomeContainer } from "./components/home/home.container";
import { CreateUserContainer } from "./components/create-user/create-user.container";
import { BrowseContainer } from "./components/browse/browse.container";

class App extends React.Component<any, any> {
  public render() {
    return (
      <Provider store={store}>
        <HashRouter>
          <div>
            <NavComponent />
            <Switch>
              <Route path="/sign-in" component={SignInContainer} />
              <Route path="/browse" component={BrowseContainer} />
              <Route path="/home" component={HomeContainer} />
              <Route path="/checkout" component={CheckoutContainer} />
              <Route path="/item" component={ItemContainer} />
              <Route path="/new-pop" component={NewPopContainer} />
              <Route path="/create-user" component={CreateUserContainer} />
              <Route path="/bids" component={BidsContainer} />
              <Route path="/bought" component={BoughtContainer} />
              <Route path="/selling" component={SellingContainer} />
              <Route path="/user-info" component={UserInfoContainer} />
              <Route path="/" component={HomeContainer} />
            </Switch>
          </div>
        </HashRouter>
      </Provider>
    );
  }
}

export default App;
