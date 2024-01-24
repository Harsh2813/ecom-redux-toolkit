import { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';
import { sendCartData, fetchCartData } from './store/cart-actions';

let isInitial = true;// notification automatically show ho rha tha page reload hone me without add in cart so aisa na ho only add to cart krne me notification show to uske liye ye isInitial true liye taki page reload me na chale jaise hi page refresh ho false ho jaye ye fir cart me changed state dale agar wo true hua mtlb add to cart ya remove hua to hi hm sendCartData to call karenge

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);//pura cart jo name h cartSlice ka pura state hi le liye 
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    dispatch(fetchCartData());//jaise hi page reload hoga data fetch ho jayega
  }, [dispatch]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;//false krke return kr gye jb dependecy change hoga tabhi useEffect call hoga bs
      return;
    }

    if (cart.changed) {//jb cart me add ya remove data me hi ye call hoga replace cart wale me ni because cart as dependency h to usme items array and totalCount ke sath changed bhi state h 
      dispatch(sendCartData(cart));
    }
  }, [cart, dispatch]);

  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;