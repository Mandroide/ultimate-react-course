import { Link, useNavigate } from "react-router";

function LinkButton({ children, to }) {
  const className = "hover:text-blue-600 text-sm text-blue-500 hover:underline";
  const navigate = useNavigate();
  if (to === "-1") {
    return <button className={className} onClick={() => navigate(-1)}>{children}</button>;
  }
  return (
    <Link to={to}
          className={className}>{children}</Link>
  );
}

export default LinkButton;