import { applyMiddleware, createStore} from "redux";
import { createLogger } from 'redux-logger'
import promise from "redux-promise-middleware";
import reducer from "./reducers"

const middleware = applyMiddleware(promise, createLogger());
export default createStore(reducer, middleware);
