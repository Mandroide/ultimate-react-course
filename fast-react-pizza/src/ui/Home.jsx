import CreateUser from "../features/user/CreateUser.jsx";
import { useSelector } from "react-redux";
import Button from "./Button.jsx";
import { PATHS } from "../utils/enums.js";

function Home() {
  const username = useSelector((state) => state.user.username);
  return (
    <div className="my-10 px-4 text-center sm:my-16">
      <h1 className="text-xl font-semibold mb-8 md:text-3xl">
        The best pizza.
        <br />
        <span className="text-yellow-500">
        Straight out of the oven, straight to you.
        </span>
      </h1>
      {username ? <Button type="primary" to={PATHS.MENU} >Continue ordering, {username}</Button> : <CreateUser />}
    </div>
  );
}

export default Home;
