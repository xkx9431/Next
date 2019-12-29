import { createStore, combineReducers, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'



const userInitialState = {
    user:{}
}

function userReducer(state = userInitialState, action) {
    switch (action.type) {
    default:
        return state
    }
}

const allReducers = combineReducers({
  user: userReducer,
})

// action creatore



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
