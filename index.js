// Node JS (common JS) way of importing modules
const redux = require("redux");
// ES6 way of importing modules
// import redux from 'redux';
const createStore = redux.createStore;
const bindActionCreators = redux.bindActionCreators;
const combineReducers = redux.combineReducers;

// JS App --> Dispatch Action --> reducer --> redux store (state) --> App
// JS App is subscribed to the store, so whenever the store changes, the app will re-render

// Action: an object that describes what happened
// Are plain JS objects
// Have a type property that indicates the type of action being performed
// The type property is typically defined as string constants (e.g. 'ADD_TODO')

const CAKE_ORDERED = "CAKE_ORDERED";
const CAKE_RESTOCKED = "CAKE_RESTOCKED";
const ICECREAM_ORDERED = "ICECREAM_ORDERED";
const ICECREAM_RESTOCKED = "ICECREAM_RESTOCKED";

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

const orderIceCream = (qty = 1) => {
  return {
    type: ICECREAM_ORDERED,
    payload: qty,
  };
};

const restockIceCream = (qty = 1) => {
  return {
    type: ICECREAM_RESTOCKED,
    payload: qty,
  };
};

// Splitting the initial state into two is better for scalability
// const initialState = {
//   numOfCakes: 10,
//   numOfIceCreams: 20,
// };

const initCakeState = {
    numOfCakes: 10,
}

const initIceCreamState = {
    numOfIceCreams: 20,
}

// Reducer: a function that accepts state and action as arguments, and returns the next state of the application
// A function that accepts state and action as arguments, and returns the next state of the application
// (previousState, action) => newState

// The ...state is the spread operator, it spreads the state object (copying it) so we don't mutate the original state and then we can change the numOfCakes property
// The action.quantity is the payload, it's the data that we send along with the action
// Using a single reducer like this is not ideal, it's better to have multiple reducers and then combine them into a single reducer using the combineReducers function
// const reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case CAKE_ORDERED:
//       return {
//         ...state,
//         numOfCakes: state.numOfCakes - action.payload,
//       };
//     case CAKE_RESTOCKED:
//       return {
//         ...state,
//         numOfCakes: state.numOfCakes + action.payload,
//       };
//     case ICECREAM_ORDERED:
//       return {
//         ...state,
//         numOfIceCreams: state.numOfIceCreams - action.payload,
//       };
//     case ICECREAM_RESTOCKED:
//       return {
//         ...state,
//         numOfIceCreams: state.numOfIceCreams + action.payload,
//       };
//     default:
//       return state;
//   }
// };

const cakeReducer = (state = initCakeState, action) => {
  switch (action.type) {
    case CAKE_ORDERED:
      return {
        ...state,
        numOfCakes: state.numOfCakes - action.payload,
      };
    case CAKE_RESTOCKED:
      return {
        ...state,
        numOfCakes: state.numOfCakes + action.payload,
      };
    default:
      return state;
  }
};

const iceCreamReducer = (state = initIceCreamState, action) => {
  switch (action.type) {
    case ICECREAM_ORDERED:
      return {
        ...state,
        numOfIceCreams: state.numOfIceCreams - action.payload,
      };
    case ICECREAM_RESTOCKED:
      return {
        ...state,
        numOfIceCreams: state.numOfIceCreams + action.payload,
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

const rootReducer = combineReducers({ cake: cakeReducer, iceCream: iceCreamReducer });

const store = createStore(rootReducer);
console.log("Initial state: ", store.getState());

const unsubscribe = store.subscribe(() =>
  console.log("Updated state: ", store.getState())
);

// Dispatching actions, remove a cake from inventory
// store.dispatch(orderCake());
// store.dispatch(orderCake(2));
// store.dispatch(orderCake(4));

// Restock the inventory
// store.dispatch(restockCake(7));

// Bind action creators to dispatch and pass the dispatch function to the actions so they can dispatch the actions themselves, not really necessary for this example but it's good to know
const actions = bindActionCreators({ orderCake, restockCake, orderIceCream, restockIceCream }, store.dispatch);

actions.orderCake(3);
actions.restockCake(3);
actions.orderIceCream(2);
actions.restockIceCream(2);

unsubscribe();

store.dispatch(orderCake()); // won't change the state because we unsbscribed from the store
