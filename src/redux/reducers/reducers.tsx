import {combineReducers} from "redux";
import searchReducer from "../reducers/searchReducer";
import mapReducer from "../reducers/mapReducer";



//combine reducers
//remember you need to export the reducers to use them
const reducers= combineReducers({
    SearchReducer: searchReducer,
    MapReducer: mapReducer
});

export default reducers;