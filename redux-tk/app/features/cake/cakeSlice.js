// Import the createSlice function from the @reduxjs/toolkit package.
const createSlice = require("@reduxjs/toolkit").createSlice;

// Create an initial state object for the cake feature.
const initialState = {
  numOfCakes: 10,
};

// Create a slice of the cake feature.
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