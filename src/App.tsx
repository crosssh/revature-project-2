import * as React from 'react';

import { NavComponent } from './components/nav.component';
import './include/bootstrap';
import './App.css';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './Store';
import { SignInContainer } from './components/sign-in/sign-in.container';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { BidsComponent } from './components/bids/bids.component';
import { BoughtComponent } from './components/bought/bought.component';
import { SellingComponent } from './components/selling/selling.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { BrowseComponent } from './components/browse/browse.component';
import { HomeComponent } from './components/home/home.component';
import { ItemComponent } from './components/item/item.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { NewPopContainer } from './components/new-pop/new-pop.container';

class App extends React.Component<any, any> {

  public render() {
    return (
      <Provider store={store}>
        <HashRouter>
          <div>
            <NavComponent />
            <Switch>
              <Route path="/sign-in" component={SignInContainer} />
              <Route path="/browse" component={BrowseComponent} />
              <Route path="/home" component={HomeComponent} />
              <Route path="/checkout" component={CheckoutComponent} />
              <Route path="/item" component={ItemComponent} />
              <Route path="/new-pop" component={NewPopContainer} />
              <Route path="/create-user" component={CreateUserComponent} />
              <Route path="/bids" component={BidsComponent} />
              <Route path="/bought" component={BoughtComponent} />
              <Route path="/selling" component={SellingComponent} />
              <Route path="/user-info" component={UserInfoComponent} />
              <Route path="/" component={HomeComponent} />
            </Switch>

          </div>
        </HashRouter>
      </Provider>
    );
  }
}

export default App;
