const initState = {}

const programReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CREATE_PROGRAM_SUCCESS':
      console.log('create program success');
      return state;
    case 'CREATE_PROGRAM_ERROR':
      console.log('create program error');
      return state;
    default:
      return state;
  }
};

export default programReducer;