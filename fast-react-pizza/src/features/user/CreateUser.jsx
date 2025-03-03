import { useState } from 'react';
import Button from "../../ui/Button.jsx";
import { updateName } from "./userSlice.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { PATHS } from "../../utils/enums.js";

function CreateUser() {
  const [username, setUsername] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (username) {
      dispatch(updateName(username.trim()));
      navigate(PATHS.MENU);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className="mb-4 text-sm text-stone-600 md:text-base">👋 Welcome! Please start by telling us your name:</p>

      <input
        type="text"
        placeholder="Your full name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-72 input mb-8"
      />

      {username !== '' && (
        <div>
          <Button type="primary" disabled={false} onClick={handleSubmit}>Start ordering</Button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;
