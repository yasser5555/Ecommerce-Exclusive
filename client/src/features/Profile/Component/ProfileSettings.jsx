import { Outlet } from "react-router-dom";
import ProfileSidebar from "./Profile-SideBar";
import { useEffect } from "react";
import { useProfile } from "../Hooks/useProfile";
import { FetchOnRender } from "../Utils/useFetchProfile";

function ProfileSettings() {
  const { profile, fetchProfile } = useProfile();

  FetchOnRender(() => fetchProfile());
  return (
    <div className="d-flex flex-lg-row flex-column align-items-baseline gap-4">
      {/* Sidebar */}
      <div className="col-12 col-lg-3">
        <ProfileSidebar />
      </div>

      <div className="col-lg col-12 align-self-center">
        <div className="card border-0 shadow-sm">
          <div className="card-body p-4">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileSettings;
