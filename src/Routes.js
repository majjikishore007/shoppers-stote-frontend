import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { extendTheme, ChakraProvider } from '@chakra-ui/react';

import Home from './core/Home';
import Signup from './user/Signup';
import Signin from './user/Signin';
import UserDashBoard from './user/UserDashBoard';
import AdminDashBoard from './user/AdminDashBoard';
import PrivateRoute from './auth/helper/PrivateRoutes';
import AdminRoute from './auth/helper/AdminRoutes';
import AddCategory from './admin/AddCategory';
import ManageCategories from './admin/ManageCategories';
import addProduct from './admin/AddProduct';
import ManageProducts from './admin/ManageProducts';
import UpdateProduct from './admin/UpdateProduct';
import Orders from './admin/Orders';
import UpdateCategory from './admin/UpdateCategory';

import Cart from './core/Cart';
const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
  font: {
    body: 'Open Sans, sans-serif',
    heading: 'Raleway, sans-serif',
  },
};

const theme = extendTheme({ colors });
const Routes = () => {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/signup' exact component={Signup} />
          <Route path='/signin' exact component={Signin} />
          <Route path='/cart' exact component={Cart} />

          <PrivateRoute
            path='/user/dashboard'
            exact
            component={UserDashBoard}
          />
          <AdminRoute
            path='/admin/dashboard'
            exact
            component={AdminDashBoard}
          />
          <AdminRoute
            path='/admin/create/category'
            exact
            component={AddCategory}
          />
          <AdminRoute
            path='/admin/categories'
            exact
            component={ManageCategories}
          />
          <AdminRoute
            path='/admin/create/product'
            exact
            component={addProduct}
          />
          <AdminRoute path='/admin/products' exact component={ManageProducts} />
          <AdminRoute
            path='/admin/product/update/:productId'
            exact
            component={UpdateProduct}
          />
          <AdminRoute path='/admin/orders' exact component={Orders} />
          <AdminRoute
            path='/admin/category/update/:categoryId'
            exact
            component={UpdateCategory}
          />
        </Switch>
      </Router>
    </ChakraProvider>
  );
};
export default Routes;
