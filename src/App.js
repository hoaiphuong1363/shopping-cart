import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';

import { useSelector, useDispatch } from 'react-redux';
import { useEffect, Fragment } from 'react';
import { sendCartData, fetchCardData } from './store/cart-action';

let isInitial = true;

function App() {
    const dispatch = useDispatch();
    const showCard = useSelector((state) => state.ui.cardIsVisible);
    const cart = useSelector((state) => state.cart);
    const notification = useSelector((state) => state.ui.notification);

    useEffect(() => {
        dispatch(fetchCardData());
    }, [dispatch]);

    useEffect(() => {
        if (isInitial) {
            isInitial = false;
            return;
        }
        if (cart.changed) {
            dispatch(sendCartData(cart));
        }
    }, [cart, dispatch]);
    return (
        <Fragment>
            {notification && <Notification {...notification}></Notification>}
            <Layout>
                {showCard && <Cart />}
                <Products />
            </Layout>
        </Fragment>
    );
}

export default App;
