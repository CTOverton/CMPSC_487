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

    case 'UPDATEROLES_SUCCESS':
      console.log('update role success', action.result)
      return {
        ...state
      }

    case 'UPDATEROLES_ERROR':
      console.log('update role error')
      return {
        ...state,
        authError: action.err.message
      }


    case 'CREATEUSER_SUCCESS':
      console.log('create user success', action.result)
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
      console.log('delete user success', action.result)
      return {
        ...state
      }

    case 'DELETEUSER_ERROR':
      console.log('delete user error')
      return {
        ...state,
        authError: action.err.message
      }

    case 'SETCLAIMS_SUCCESS':
      console.log('set user claims success', action.result)
      return {
        ...state
      }

    case 'SETCLAIMS_ERROR':
      console.log('set user claims error', action.err.message)
      return {
        ...state,
        authError: action.err.message
      }

    default:
      return state
  }
};

export default authReducer;