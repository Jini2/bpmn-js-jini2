const initState = {
    key: '',
    title:''
}

const treeSelectReducer = (state = initState, {type, payload}) => {
    switch (type) {
        case 'treeSelect/active':
            return payload;
        default:
            return state;
    }
}

export default treeSelectReducer;