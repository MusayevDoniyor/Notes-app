import React, { useState } from "react";
import ProfileInfo from "../Cards/ProfileInfo";
import { useLocation, useNavigate } from "react-router-dom";
import Searchbar from "../Searchbar/Searchbar";

const NavBar = ({ userInfo, onSearchNote, handleClearSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const onLogout = () => {
    navigate("/login");
  };

  const handleSearch = () => {
    if (searchQuery) {
      onSearchNote(searchQuery);
    }
  };

  const onClearSearch = () => {
    setSearchQuery("");
    handleClearSearch();
  };

  const location = useLocation("");

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/signUp";

  return (
    <div className="bg-white flex items-center justify-between px-4 lg:px-6 py-2 drop-shadow">
      <h2 className="text-xl font-medium text-black py-2">Notes</h2>

      {!isAuthPage && (
        <>
          <Searchbar
            value={searchQuery}
            onChange={({ target }) => {
              setSearchQuery(target.value);
            }}
            handleSearch={handleSearch}
            onClearSearch={onClearSearch}
          />

          <ProfileInfo onLogout={onLogout} userInfo={userInfo} />
        </>
      )}
    </div>
  );
};

export default NavBar;
