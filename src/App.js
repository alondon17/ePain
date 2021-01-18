import './App.css';
import { Route, Switch, withRouter } from 'react-router';
import Navbar from './components/Navbar/Navbar';
import React from 'react';
import MainPage from './components/MainPage/MainPage';
import ProductPage from './components/ProductPage/ProductPage';
import Cart from "./components/Cart/Cart";

const App = () => {
  return (
    <React.Fragment>
      <Navbar />
      <div className='m-2'>
        <Switch>
          <Route path='/product/:id' component={ProductPage} />
          <Route path='/cart' component={Cart} />
          <Route path='/' exact component={MainPage} />
        </Switch>
      </div>
    </React.Fragment>
  );
}

export default withRouter(React.memo(App));
