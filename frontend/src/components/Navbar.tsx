import { Link } from "react-router-dom";
import { UserAuth } from "../Context/UserAuth";
import { useState } from "react";

const Navbar = () => {
  const [dropDownVisible, setDropDownVisible] = useState<boolean>(false);

  const { user, logout, isLoggedIn } = UserAuth();

  return (
    <>
      <div className="navbar bg-base-100 top-0 left-0 right-0 z-50">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-white rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <a
                  href="/"
                  className="hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Homepage
                </a>
              </li>
              <li>
                <a
                  href="dashboard"
                  className="hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Dashboard
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          <a className="text-4xl font-bold ml-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-purple-600  inline-block">
            CoreOps
          </a>
        </div>
        <div className="navbar-end">
          {isLoggedIn() ? (
            <div className="dropdown">
              <button
                id="dropdownDividerButton"
                data-dropdown-toggle="dropdownDivider"
                className="font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
                type="button"
                onClick={() => setDropDownVisible(!dropDownVisible)}
                onBlur={() => setTimeout(() => setDropDownVisible(false), 200)}
              >
                <span className="font-medium">{user?.userName}</span>
                <svg
                  className="w-2.5 h-2.5 ms-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              <ul
                id="dropdownDivider"
                className={`menu menu-sm dropdown-content bg-white rounded-box z-[1] mt-3 w-52 p-2 shadow ${
                  dropDownVisible ? "" : "hidden"
                }`}
              >
                <li>
                  <a
                    href="tasks"
                    className="hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    My Tasks
                  </a>
                </li>
                <li>
                  <a
                    href="messages"
                    className="hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Messages
                  </a>
                </li>
                <li>
                  <button
                    onClick={logout}
                    className="hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Log Out
                  </button>
                </li>
              </ul>
              <button className="btn btn-ghost btn-circle">
                <div className="indicator">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                  <span className="badge badge-xs badge-primary indicator-item"></span>
                </div>
              </button>
            </div>
          ) : (
            <div className="hidden lg:flex items-center space-x-6 text-back">
              <Link to="/login" className="hover:text-darkBlue">
                Login
              </Link>
              <Link
                to="/register"
                className="bg-blue-500 text-white  
                            dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 
                            text-center me-2 mb-2"
              >
                Sign up
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
