import authReducer from "./authReducer";
import tempProjectReducer from "./tempProjectReducer";

import { combineReducers } from "redux";

const rootReducer = combineReducers({
    auth: authReducer,
    tempProject: tempProjectReducer
})

export default rootReducer