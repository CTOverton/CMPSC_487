const initState = {
  authError: null
}

const authReducer = (state = initState, action) => {
  switch(action.type){
    case 'LOGIN_ERROR':
      console.log('login error');
      return {
        ...state,
        authError: 'Login failed'
      }

    case 'LOGIN_SUCCESS':
      console.log('login success');
      return {
        ...state,
        authError: null
      }

    case 'SIGNOUT_SUCCESS':
      console.log('signout success');
      return state;

    case 'SIGNUP_SUCCESS':
      console.log('signup success')
      return {
        ...state,
        authError: null
      }

    case 'SIGNUP_ERROR':
      console.log('signup error')
      return {
        ...state,
        authError: action.err.message
      }

    case 'CREATEUSER_SUCCESS':
      console.log('create user success')
      return {
        ...state
      }

    case 'CREATEUSER_ERROR':
      console.log('create user error')
      return {
        ...state,
        authError: action.err.message
      }

    case 'DELETEUSER_SUCCESS':
      console.log('delete user success')
      return {
        ...state
      }

    case 'DELETEUSER_ERROR':
      console.log('delete user error')
      return {
        ...state,
        authError: action.err.message
      }

    case 'DEPARTMENT_UPDATE_SUCCESS':
      console.log('department update success')
      return {
        ...state
      }

    case 'DEPARTMENT_UPDATE_ERROR':
      console.log('department update success')
      return {
        ...state,
        authError: action.err.message
      }

    default:
      return state
  }
};

export default authReducer;