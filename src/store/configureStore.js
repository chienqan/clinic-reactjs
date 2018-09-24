import {createStore, applyMiddleware } from "react";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

export default function configureStore(initialState) {
    return createStore(
        rootReducer,
        initialState,
        applyMiddleware(thunk)
    );
}
