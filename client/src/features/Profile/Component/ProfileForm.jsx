import useProfileForm from "../Hooks/useProfileForm";

function ProfileForm() {
  const {
    formData,
    isEditing,
    setIsEditing,
    handleChange,
    handleSubmit,
    handleCancel,
    logout,
  } = useProfileForm();

  return (
    <div className="container">
      <div className="bg-white border-0">
        <h4 className="fw-bold mb-1">Profile Information</h4>
        <p className="text-muted mb-0">
          Manage and update your personal information
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="my-2 gap-5 d-flex">
          <div className="col">
            <label className="form-label">Created At</label>
            <input
              type="text"
              name="created_at"
              disabled
              value={formData.created_at?.split("T")[0] || ""}
              className="form-control"
            />
          </div>

          <div className="col">
            <label className="form-label">Gender</label>

            <input
              type="text"
              name="gender"
              disabled
              value={formData.gender}
              className="form-control"
            />
          </div>
        </div>

        {/* Phone */}
        <div className="my-2">
          <label className="form-label">Phone Number</label>

          <input
            type="text"
            name="phone_number"
            disabled={!isEditing}
            value={formData.phone_number}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        {/* First Name */}
        <div className="my-2">
          <label className="form-label">First Name</label>

          <input
            type="text"
            name="first_name"
            disabled={!isEditing}
            value={formData.first_name}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        {/* Last Name */}
        <div className="my-2">
          <label className="form-label">Last Name</label>

          <input
            type="text"
            name="last_name"
            disabled={!isEditing}
            value={formData.last_name}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        {/* Email */}
        <div className="my-2 w-100">
          <label className="form-label">Email</label>

          <input
            type="email"
            name="email"
            disabled={!isEditing}
            value={formData.email}
            onChange={handleChange}
            className="form-control w-100"
          />
        </div>

        {/* Buttons */}
        <div className="d-flex gap-2">
          {!isEditing ? (
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </button>
          ) : (
            <>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleCancel}
              >
                Cancel
              </button>

              <button type="submit" className="btn btn-success">
                Save Changes
              </button>
            </>
          )}

          <button type="button" onClick={logout} className="btn btn-danger">
            Logout
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProfileForm;
