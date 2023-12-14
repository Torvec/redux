// Import the createSlice function from the @reduxjs/toolkit package.
const createSlice = require("@reduxjs/toolkit").createSlice;

// Create an initial state object for the icecream feature.
const initialState = {
  numOfIcecreams: 20,
};

// Create a slice of the icecream feature.
const icecreamSlice = createSlice({
    name: "icecream",
    initialState,
    reducers: {
        ordered: (state) => {
            state.numOfIcecreams--;
        },
        restocked: (state, action) => {
            state.numOfIcecreams += action.payload;
        },
    },
});

// Export the reducer and actions from the slice.
module.exports = icecreamSlice.reducer;
module.exports.icecreamActions = icecreamSlice.actions;