// Node JS (common JS) way of importing modules
const redux = require("redux");
// ES6 way of importing modules
// import redux from 'redux';
const createStore = redux.createStore;

// JS App --> Dispatch Action --> reducer --> redux store (state) --> App
// JS App is subscribed to the store, so whenever the store changes, the app will re-render

// Action: an object that describes what happened
// Are plain JS objects
// Have a type property that indicates the type of action being performed
// The type property is typically defined as string constants (e.g. 'ADD_TODO')

const CAKE_ORDERED = "CAKE_ORDERED";
const CAKE_RESTOCKED = "CAKE_RESTOCKED";

// Action creator: a function that returns an action
const orderCake = (qty = 1) => {
  return {
    type: CAKE_ORDERED,
    payload: qty,
  };
};

// qty = 1 is the default value for the quantity parameter, you can put whatever number you want in when it's called and it will override the default value, otherwise it will increase the quantity by 1 if no value is passed in
const restockCake = (qty = 1) => {
  return {
    type: CAKE_RESTOCKED,
    payload: qty,
  };
};

// Reducer: a function that accepts state and action as arguments, and returns the next state of the application
// A function that accepts state and action as arguments, and returns the next state of the application
// (previousState, action) => newState

const initialState = {
  numOfCakes: 10,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CAKE_ORDERED:
      return {
        // The ...state is the spread operator, it spreads the state object (copying it) so we don't mutate the original state and then we can change the numOfCakes property
        ...state,
        numOfCakes: state.numOfCakes - action.payload,
      };
    case CAKE_RESTOCKED:
      return {
        ...state,
        // The action.quantity is the payload, it's the data that we send along with the action
        numOfCakes: state.numOfCakes + action.payload,
      };
    default:
      return state;
  }
};

// Store: an object that holds the application's state tree
// There should only be a single store in a Redux app
// getState(): returns the current state of the application
// dispatch(action): dispatches an action
// subscribe(listener): registers a function to be called on state change

const store = createStore(reducer);
console.log("Initial state: ", store.getState());

const unsubscribe = store.subscribe(() =>
  console.log("Updated state: ", store.getState())
);

// Dispatching actions, remove a cake from inventory
store.dispatch(orderCake()); //numOfCakes: 9
store.dispatch(orderCake(2)); //numOfCakes: 7
store.dispatch(orderCake(4)); //numOfCakes: 3

// Restock the inventory
store.dispatch(restockCake(7)); //numOfCakes: 10

unsubscribe();

store.dispatch(orderCake()); // won't change the state because we unsbscribed from the store
