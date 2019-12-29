import { createStore, combineReducers, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import axios from 'axios'


export const LOGOUT = 'LOGOUT'


const userInitialState = {
    user:{}
}

// reducers 
function userReducer(state = userInitialState, action) {
    switch (action.type) {
    case LOGOUT:
        return Object.assign({}, state, {
        user: {},
    })
    default:
        return state
    }
}

const allReducers = combineReducers({
  user: userReducer,
})

// action creatore
export function logout() {
    return dispatch => {
        axios.post('/logout').then(resp => {
            if (resp.status === 200) {
            dispatch({ type: LOGOUT })
            }
        })
    }
}


export default function initializeStore(state) {
    const store = createStore(
        allReducers,
        Object.assign(
        {},
        {
            user: userInitialState
        },
        state,
        ),
        composeWithDevTools(applyMiddleware(ReduxThunk)),
    )

    return store
}
