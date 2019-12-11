const initState = {
    applicationError: null
}

const applicationReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CREATE_APPLICATION_SUCCESS':
            console.log('create application success');
            return state;
        case 'CREATE_APPLICATION_ERROR':
            console.log('create application error');
            return {
                ...state,
                applicationError: action.err.message
            }
        case 'ADD_APPLICATION_TO_USER_SUCCESS':
            console.log('add application to user success');
            return state;
        case 'ADD_APPLICATION_TO_USER_ERROR':
            console.log('add application to user error');
            return {
                ...state,
                applicationError: action.err.message
            }
        default:
            return state;
    }
};

export default applicationReducer;