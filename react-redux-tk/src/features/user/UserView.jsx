import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "./userSlice";

export const UserView = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  return (
    <div>
      <h2>List of Users</h2>
      {/* If loading is true, show Loading.. */}
      {user.loading && <div>Loading..</div>}
      {/* If not loading and Errored, show Error */}
      {!user.loading && user.error ? <div>Error: {user.error}</div> : null}
      {/* If not loading and users array length is greater than zero, show list of users */}
      {!user.loading && user.users.length ? (
        <ul>
          {user.users.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};
