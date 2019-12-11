const initState = {
    error: null
}

const staffReducer = (state = initState, action) => {
    switch(action.type){
        case 'CREATE_DEPARTMENT_SUCCESS':
            console.log('create department success');
            return {
                ...state,
                error: null
            }

        case 'CREATE_DEPARTMENT_ERROR':
            console.log('create department error');
            return {
                ...state,
                error: action.err
            }

        case 'DELETE_DEPARTMENT_SUCCESS':
            console.log('delete department success');
            return {
                ...state,
                error: null
            }

        case 'DELETE_DEPARTMENT_ERROR':
            console.log('delete department error');
            return {
                ...state,
                error: action.err
            }

        default:
            return state
    }
};

export default staffReducer;