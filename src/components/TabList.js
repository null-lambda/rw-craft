import { NavLink, useMatch } from "react-router-dom";

function NavTab({ to, children, ...props }) {
  const match = useMatch(to);

  return (
    <li
      role="tab"
      className={`tab input-box ${match ? "active" : ""}`}
      {...props}
    >
      <NavLink to={to} className="nav-link">
        {children}
      </NavLink>
    </li>
  );
}

function TabList({ children }) {
  return (
    <ul role="tablist" className="tab-list">
      {children}
    </ul>
  );
}

TabList.NavTab = NavTab;

export { TabList };
