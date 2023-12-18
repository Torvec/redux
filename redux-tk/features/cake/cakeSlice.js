// Import the createSlice function from the @reduxjs/toolkit package.
// NOTE: createSlice uses the immer library to allow us to write immutable code.
const createSlice = require("@reduxjs/toolkit").createSlice;

// Create an initial state object for the cake feature.
const initialState = {
  numOfCakes: 10,
};

// Create a slice of the cake feature.
// NOTE: If the key and value are the same, you can use the shorthand syntax.
// NOTE: createSlice will automatically generate action creators and action types.
const cakeSlice = createSlice({
  name: "cake",
  initialState,
  reducers: {
    ordered: (state) => {
      state.numOfCakes--;
    },
    restocked: (state, action) => {
      state.numOfCakes += action.payload;
    },
  },
});

// Export the reducer and actions from the slice.
module.exports = cakeSlice.reducer;
module.exports.cakeActions = cakeSlice.actions;