//import { applyMiddleware, compose, createStore } from 'redux'
import {createStore} from 'redux';
import rootReducer from './reducers/rootReducer.js'
import { composeWithDevTools } from 'redux-devtools-extension';
import { configureStore, Action, combineReducers } from '@reduxjs/toolkit';




let initialState = 
{
  App: {"LoginStatus":'','UserName':'','Route':'',"id":''}

};



export const store = createStore(rootReducer,initialState,composeWithDevTools());







