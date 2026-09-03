import { useAvatarUploader } from "../Hooks/useAvatarUploader";

function AvatarUploader() {
  const { profile, uploadAvatar, file, handleSubmit, handleFileChange } =
    useAvatarUploader();
  return (
    <div className="d-flex flex-column align-items-center">
      {/* Avatar */}
      <img
        src={
          profile?.avatar
            ? `http://localhost:5000/${profile.avatar}`
            : "https://i.imgur.com/HeIi0wU.png"
        }
        alt="Profile Avatar"
        className="rounded-circle border img-fluid"
        style={{
          width: "150px",
          height: "150px",
          objectFit: "cover",
        }}
      />

      {/* File Input */}
      <div className="w-100 mt-3">
        <div className="w-100 mt-3">
          <input
            id="avatar"
            type="file"
            accept="image/*"
            className="d-none"
            onChange={handleFileChange}
          />

          <label htmlFor="avatar" className="btn btn-outline-danger w-100">
            <i className="fas fa-image me-2"></i>
            Choose Avatar
          </label>
        </div>
      </div>

      {/* Upload Button */}
      <button
        type="button"
        className="btn btn-danger w-100 mt-3"
        onClick={handleSubmit}
        disabled={!file}
      >
        Upload Avatar
      </button>
    </div>
  );
}

export default AvatarUploader;
