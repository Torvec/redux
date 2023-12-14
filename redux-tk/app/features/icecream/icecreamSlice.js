const createSlice = require("@reduxjs/toolkit").createSlice;

const initState = {
  numOfIcecreams: 20,
};

const icecreamSlice = createSlice({
    name: "icecream",
    initState,
    reducers: {
        ordered: (state) => {
            state.numOfIcecreams--;
        },
        restocked: (state, action) => {
            state.numOfIcecreams += action.payload;
        },
    },
});

module.exports = icecreamSlice.reducer;
module.exports.icecreamActions = icecreamSlice.actions;