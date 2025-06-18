import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import userIcon from "../assets/user.png";
import { IoSearchOutline } from "react-icons/io5";
import { navigation } from "../contants/navigation";
import { useAuth } from "../Context/AuthProvider";
import { toast } from "react-toastify";
import { Typography } from "@mui/material";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const removeSpace = location?.search?.slice(3)?.split("%20")?.join(" ");
  const [searchInput, setSearchInput] = useState(removeSpace || "");
  const [showDropdown, setShowDropdown] = useState(false);

  const [auth, setAuth] = useAuth();

  useEffect(() => {
    if (searchInput) {
      navigate(`/search?q=${searchInput}`);
    }
  }, [searchInput]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleLogout = () => {
    setAuth({
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    navigate("/login");
    setShowDropdown(false);
  };

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  return (
    <header className="fixed top-0 w-full h-16 bg-black bg-opacity-50 z-40">
      <div className="container mx-auto px-3 flex items-center h-full">
        <Link to="/">
          <img src={logo} alt="logo" width={80} />
        </Link>

        <nav className="hidden lg:flex items-center gap-1 ml-5">
          {navigation.map((nav, index) => (
            <NavLink
              key={nav.label + "header" + index}
              to={nav.href}
              className={({ isActive }) =>
                `px-2 hover:text-neutral-100 ${isActive && "text-neutral-100"}`
              }
            >
              {nav.label}
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-5 relative">
          <form className="flex items-center gap-2" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Search here..."
              className="bg-transparent px-4 py-1 outline-none border-none hidden lg:block"
              onChange={(e) => setSearchInput(e.target.value)}
              value={searchInput}
            />
            <button className="text-2xl text-white">
              <IoSearchOutline />
            </button>
          </form>

          {/* Avatar */}
          {auth?.user && (
            <>
              <Typography
                variant="body1"
                sx={{
                  color: "#fff",
                  mr: 1,
                  display: { xs: "none", sm: "block" },
                }}
              >
                Welcome, {auth.user.name || "User"}
              </Typography>
            </>
          )}
          <div
            className="w-8 h-8 rounded-full overflow-hidden cursor-pointer active:scale-95 transition-all"
            onClick={toggleDropdown}
          >
            <img
              src={userIcon}
              alt="user"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Dropdown Menu */}
          {showDropdown && (
            <div className="absolute top-12 right-0 bg-white rounded shadow-lg w-40 py-2 z-50">
              {auth?.user ? (
                <>
                  <Link
                    to="/update-password"
                    className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                    onClick={() => setShowDropdown(false)}
                  >
                    Update Password
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                    onClick={() => setShowDropdown(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                    onClick={() => setShowDropdown(false)}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
