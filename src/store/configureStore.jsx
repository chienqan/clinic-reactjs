import {createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "store/reducers/index.jsx";
import initialState from "store/initialState.jsx";

export default function configureStore() {
    return createStore(
        rootReducer,
        initialState,
        applyMiddleware(thunk)
    );
}
