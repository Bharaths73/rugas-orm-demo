const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

export const Customers={
    GET_ALL_CUSTOMERS_API:BASE_URL+'/customers/',
    ADD_CUSTOMER_API:BASE_URL+'/customers/customer',
    DELETE_CUSTOMER_API:BASE_URL+'/customers/customer',
    UPDATE_CUSTOMER_API:BASE_URL+'/customers/customer'
}

export const Products={
    GET_ALL_PRODUCTS_API:BASE_URL+'/products/',
    ADD_PRODUCT_API:BASE_URL+'/products/product',
    DELETE_PRODUCT_API:BASE_URL+'/products/product',
    UPDATE_PRODUCT_API:BASE_URL+'/products/product'
}

export const Orders={
    GET_ALL_ORDERS_API:BASE_URL+'/orders/',
    ADD_ORDER_API:BASE_URL+'/orders/order',
    DELETE_ORDER_API:BASE_URL+'/orders/order',
    UPDATE_ORDER_API:BASE_URL+'/orders/order'
}