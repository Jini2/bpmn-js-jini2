import { combineReducers } from 'redux';
import treeSelecter from './treeSelectReducer';
import { 
    newItemToggleReducer as newItemToggle,
    treeToggleReducer as treeToggle,
} from './toggleReducer';

const rootReducer = combineReducers({
    treeSelecter,
    newItemToggle,
    treeToggle
});

export default rootReducer;