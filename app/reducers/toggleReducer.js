export const newItemToggleReducer = (state = false, {type}) => {
    switch (type) {
        case 'newItemView/show':
            return true;
        case 'newItemView/hide':
            return false;
        default:
            return state;
    }
}

export const treeToggleReducer = (state = true, {type}) => {
    switch (type) {
        case 'treeView/show':
            return true;
        case 'treeView/hide':
            return false;
        default:
            return state;
    }
}