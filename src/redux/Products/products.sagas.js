import { takeLatest, put, all, call } from 'redux-saga/effects'
import productsTypes from './products.types'
import { handleAddProduct, handleFetchProducts, handleDeleteProduct } from './products.helpers'
import { auth } from '../../firebase/utils'
import { setProducts, fetchProductsStart } from './products.actions'

export function* addProduct({ payload: {
    productCategory,
    productName,
    productThumbnail,
    productPrice
} }) {
    try {
        const timestamp = new Date()
        yield handleAddProduct({
            productCategory,
            productName,
            productThumbnail,
            productPrice,
            productAdminUserUID: auth.currentUser.uid,
            createDate: timestamp  
        })
        //This piece of code will cause to update the UI after the product has been added
        yield put(
            fetchProductsStart()
        )
    } catch (error) {
        
    }
}

export function* onAddProductStart() {
    yield takeLatest(productsTypes.ADD_NEW_PRODUCT_START, addProduct)
}

export function* fetchProdcts(){
    try {
        const products = yield handleFetchProducts()
        yield put(
            setProducts(products)
        )
    } catch (error) {
        
    }
}

export function* onFetchProdctsStart(){
    yield takeLatest(productsTypes.FETCH_PRODUCTS_START, fetchProdcts)
}

export function* deleteProdct({payload}){
    try {
        yield handleDeleteProduct(payload)
        yield put (
            fetchProductsStart()
        )
    } catch (error) {
        
    }
}

export function* onDeleteProductStart(){
    yield takeLatest(productsTypes.DELETE_PRODUCT_START, deleteProdct)
}


export default function* productsSagas() {
    yield all([
        call(onAddProductStart),
        call(onFetchProdctsStart),
        call(onDeleteProductStart),
    ])
}