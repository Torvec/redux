import { useSelector, useDispatch } from "react-redux";
import { ordered, restocked } from "./icecreamSlice";
import { useState } from "react";

export const IcecreamView = () => {
  const [value, setValue] = useState(1);
  const numOfIcecreams = useSelector((state) => state.icecream.numOfIcecreams);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Number of Ice creams - {numOfIcecreams}</h2>
      <button onClick={() => dispatch(ordered())}>Order Cake</button>
      <input
        type="number"
        value={value}
        onChange={(e) => setValue(parseInt(e.target.value))}
      />
      <button onClick={() => dispatch(restocked(value))}>
        Restock Ice creams
      </button>
    </div>
  );
};
