import { Link } from "react-router";

function Button({ children, to, type, disabled = false }) {

  const base = `focus:ring disabled:cursor-not-allowed
  focus:ring-yellow-300 focus:ring-offset-2 focus:bg-yellow-300
  focus:outline-none transition-colors duration-300
  hover:bg-yellow-300 tracking-wide rounded-full
  bg-yellow-400 uppercase font-semibold text-stone-800  inline-block`;

  const styles = {
    primary: `${base} px-4 py-3 md:px-6 md:py-4 text-sm`,
    small: `${base} px-4 py-2 md:px-5 md:py-2.5 text-xs`,
    secondary: `text-sm focus:ring disabled:cursor-not-allowed
  focus:ring-stone-200 focus:ring-offset-2 focus:bg-stone-300
  focus:outline-none transition-colors duration-300
  hover:bg-stone-300 tracking-wide rounded-full uppercase font-semibold text-stone-400  inline-block
  border-2 border-stone-300 px-4 py-2.5 md:px-6 md:py-3.5 hover:text-stone-800 focus:text-stone-800`
  }
  if (to) {
    return <Link to={to} className={styles[type]}>{children}</Link>;
  }
  return (
    <button type="button" disabled={disabled} className={styles[type]}>{children}</button>
  );
}

export default Button;