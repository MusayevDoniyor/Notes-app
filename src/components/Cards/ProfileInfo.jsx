import React from "react";
import { getInitials } from "../../utils/helper";

const ProfileInfo = ({ onLogout, userInfo }) => {
  return (
    <div className="flex items-center gap-3">
      <div className="size-10 lg:size-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100 cursor-pointer lg:cursor-auto">
        {getInitials(userInfo?.fullName)}
      </div>

      <div className="hidden lg:block">
        <p className="text-sm font-medium">{userInfo?.fullName}</p>

        <button className="text-sm text-slate-700 underline" onClick={onLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileInfo;
