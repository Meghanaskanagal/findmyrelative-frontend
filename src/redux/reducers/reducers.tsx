import {combineReducers} from "redux";
import searchReducer from "../reducers/searchReducer";
import shelterReducer from "./shelterReducer";



//combine reducers
//remember you need to export the reducers to use them
const reducers= combineReducers({
    SearchReducer: searchReducer,
    ShelterReducer: shelterReducer
});

export default reducers;