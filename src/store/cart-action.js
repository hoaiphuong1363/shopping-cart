import { uiActions } from './ui-slice';
import { cartActions } from './cart';

export const fetchCardData = () => {
    return async (dispatch) => {
        const fetchData = async () => {
            const response = await fetch(
                'https://redux1-21d43-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json'
            );
            if (!response.ok) {
                throw new Error('Fetching data failed');
            }
            const data = response.json();
            return data;
        };
        try {
            const cartData = await fetchData();
            dispatch(
                cartActions.replaceCart({
                    items: cartData.items || [],
                    totalQuantity: cartData.totalQuantity,
                })
            );
        } catch (err) {
            dispatch(
                uiActions.showNotification({
                    status: 'error',
                    title: 'Error!',
                    message: err.message || 'Sending card data unsuccessfully',
                })
            );
        }
    };
};

export const sendCartData = (cart) => {
    return async (dispatch) => {
        dispatch(
            uiActions.showNotification({
                status: 'pending',
                title: 'Sending',
                message: 'Sending Card Data',
            })
        );
        const sendRequest = async () => {
            const response = await fetch(
                'https://redux1-21d43-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json',
                {
                    method: 'PUT',
                    body: JSON.stringify({ items: cart.items, totalQuantity: cart.totalQuantity }),
                }
            );
            if (!response.ok) {
                throw new Error('Sending card data failed!');
            }
        };
        try {
            await sendRequest();
            dispatch(
                uiActions.showNotification({
                    status: 'success',
                    title: 'Success!',
                    message: 'Sent card data successfully',
                })
            );
        } catch (err) {
            dispatch(
                uiActions.showNotification({
                    status: 'error',
                    title: 'Error!',
                    message: err.message || 'Sending card data unsuccessfully',
                })
            );
        }
    };
};
