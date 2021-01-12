import './App.css';
import { Route, Switch, withRouter } from 'react-router';
import Navbar from './components/Navbar/Navbar';
import React from 'react';
import MainPage from './components/MainPage/MainPage';
import ProductPage from './components/ProductPage/ProductPage';
import Cart from "./components/Cart/Cart";
const App = props => {
  // const dispatch = useDispatch()
  // useEffect(() => {
  //   fetch('http://localhost:8080/products', { mode: 'cors' }).then((response) => response.json())
  //     .then(data => { console.log(data); dispatch({ type: ActionTypes.INITIALIZE_PRODUCTS, data: data }) })
  // }, [])
  return (
    <>
      <Navbar />
      <div className='m-2'>
        <Switch>
          <Route path='/product/:id' component={ProductPage} />
          <Route path='/cart' component={Cart} />
          <Route path='/' exact component={MainPage} />
        </Switch>
      </div>

    </>
  );

}


export default withRouter(React.memo(App));
