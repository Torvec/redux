const createSlice = require("@reduxjs/toolkit").createSlice;

const initState = {
  numOfCakes: 10,
};

const cakeSlice = createSlice({
  name: "cake",
  initState,
  reducers: {
    ordered: (state) => {
      state.numOfCakes--;
    },
    restocked: (state, action) => {
      state.numbOfCakes += action.payload;
    },
  },
});

module.exports = cakeSlice.reducer;
module.exports.cakeActions = cakeSlice.actions;