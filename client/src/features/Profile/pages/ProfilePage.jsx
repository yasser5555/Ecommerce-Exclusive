import AvatarUploader from "../Component/AvatarUploader";
import { fetchStats, useProfile } from "../Hooks/useProfile";
import { useEffect, useState } from "react";
import ProfileSettings from "./../Component/ProfileSettings";
import { FetchOnRender } from "../../../shared/Utils/useFetch";

function ProfilePage() {
  const { profile, profileStats, GetProfileStats } = useProfile();
  FetchOnRender(() => fetchStats(profile, GetProfileStats()));
  document.title = `${profile?.first_name || "john"} ${profile?.last_name || "Doe"} | Execlusive`;
  return (
    <div className="bg-light min-vh-100">
      <div className="container py-5">
        <div className="card border-0 shadow-sm mb-4">
          <div className="card-body p-4 p-md-5">
            <div className="row align-items-center">
              <div className="col-md-3 text-center mb-4 mb-md-0">
                <div className="d-flex justify-content-center">
                  <AvatarUploader />
                </div>
              </div>
              <div className="col-md-9">
                <h1 className="fw-bold mb-2 ">
                  Hi {profile?.first_name} {profile?.last_name}
                </h1>
                <p className="text-muted mb-4">
                  Manage your personal information and account settings
                </p>
                <div className="row g-3 d-flex flex-column flex-md-row">
                  <div className="col col-md-4 ">
                    <div className="border rounded-3 p-3 text-center">
                      <h5 className="fw-bold mb-1 fs-2">
                        {profileStats?.orders}
                      </h5>
                      <h5 className="text-muted fs-2">Orders</h5>
                    </div>
                  </div>
                  <div className="col col-md-4">
                    <div className="border rounded-3 p-3 text-center">
                      <h3 className="fw-bold mb-1  fs-2">
                        {profileStats?.favorites}
                      </h3>
                      <h2 className="text-muted fs-2">Favorites</h2>
                    </div>
                  </div>
                  <div className="col col-md-4">
                    <div className="border rounded-3 p-3 text-center">
                      <h3 className="fw-bold mb-1 fs-2">
                        {profileStats?.comments}
                      </h3>
                      <h2 className="text-muted fs-2">Reviews</h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row d-flex g-4">
          <div className="col-12">
            <ProfileSettings />
          </div>
          <div className="col-lg-8 col-md-7">
            <div className="card border-0 shadow-sm mb-4"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
