// How to use IMMER to update nested state

const redux = require("redux");
const produce = require("immer").produce;

// Define the initial state
const initState = {
  name: "John Doe",
  address: {
    street: "248 Main St",
    city: "Anytown",
    state: "California",
    zip: "94801",
    country: "USA",
  },
};

// Define constant for action type
const UPDATE_STREET = "UPDATE_STREET";

// Define action creator
const updateStreet = (street) => ({
  type: UPDATE_STREET,
  payload: street,
});

// Define reducer
const reducer = (state = initState, action) => {
  switch (action.type) {
    case UPDATE_STREET:
    // Without Immer  
    // return {
        // Spread the state so that we don't affect other properties other than the address
        // ...state,
        // address: {
          // Spread the address so that we don't affect other properties other than the street
    //       ...state.address,
    //       street: action.payload,
    //     },
    //   };
    // With Immer
        return produce(state, (draftState) => {
            draftState.address.street = action.payload;
        });
    default:
      return state;
  }
};

// Define store
const store = redux.createStore(reducer);
console.log("Initial state: ", store.getState());

// Subscribe to store
const unsubscribe = store.subscribe(() =>
  console.log("Updated state: ", store.getState())
);

// Dispatch action
store.dispatch(updateStreet("123 Main St"));

// Unsubscribe from store
unsubscribe();