import React, { useEffect, useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useContactStore } from "../Store/Contact.store";
import { useProfileStore } from "./../../../Profile/Store/profile.store";
import { useChangeTitle } from "./../../../../shared/Utils/useChangeTitle";

export default function ContactPage() {
  const { loading, success, error, sendMessage, resetContactState } =
    useContactStore();
  useChangeTitle({ title: "Contact us" });
  const {
    profile,
    isLoading: profileLoading,
    fetchProfile,
  } = useProfileStore();

  const [formData, setFormData] = useState({
    subject: "",
    message: "",
  });

  useEffect(() => {
    if (!profile) {
      fetchProfile();
    }
  }, [profile, fetchProfile]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (success || error) {
      resetContactState();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!profile) return;

    const contactData = {
      name: `${profile.first_name} ${profile.last_name}`,
      email: profile.email,
      subject: formData.subject,
      message: formData.message,
    };

    const sent = await sendMessage(contactData);

    if (sent) {
      setFormData({
        subject: "",
        message: "",
      });
    }
  };

  const fullName = profile ? `${profile.first_name} ${profile.last_name}` : "";

  return (
    <div className="container py-5">
      <div className="row g-4">
        {/* Contact Information */}
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body p-4">
              <h3 className="fw-bold mb-4">Contact Information</h3>

              {/* Phone */}
              <div className="d-flex gap-3 mb-4">
                <div className="bg-danger text-white rounded-circle p-3 d-flex align-items-center justify-content-center">
                  <Phone size={20} />
                </div>

                <div>
                  <h6 className="fw-bold mb-1">Call Us</h6>

                  <p className="text-muted mb-0">+20 110 1234 5678</p>
                </div>
              </div>

              {/* Email */}
              <div className="d-flex gap-3 mb-4">
                <div className="bg-danger text-white rounded-circle p-3 d-flex align-items-center justify-content-center">
                  <Mail size={20} />
                </div>

                <div>
                  <h6 className="fw-bold mb-1">Email Us</h6>
                  <p className="text-muted mb-0">Support@Exclusive.com</p>
                </div>
              </div>

              {/* Address */}
              <div className="d-flex gap-3">
                <div className="bg-danger text-white rounded-circle p-3 d-flex align-items-center justify-content-center">
                  <MapPin size={20} />
                </div>

                <div>
                  <h6 className="fw-bold mb-1">Address</h6>

                  <p className="text-muted mb-0">Sixth of october , Egypt</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4 p-md-5">
              <h2 className="fw-bold mb-2">Get In Touch</h2>

              <p className="text-muted mb-4">
                Hello {fullName || "there"}, have a question or need help? Send
                us a message and we'll get back to you.
              </p>

              {success && (
                <div className="alert alert-success">
                  Message sent successfully.
                </div>
              )}

              {error && <div className="alert alert-danger">{error}</div>}

              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  {/* Name */}
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Name</label>

                    <input
                      type="text"
                      className="form-control"
                      value={fullName}
                      disabled
                      readOnly
                    />
                  </div>

                  {/* Email */}
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Email</label>

                    <input
                      type="email"
                      className="form-control"
                      value={profile?.email || ""}
                      disabled
                      readOnly
                    />
                  </div>

                  {/* Subject */}
                  <div className="col-12">
                    <label className="form-label fw-semibold">Subject</label>

                    <input
                      type="text"
                      name="subject"
                      className="form-control"
                      placeholder="Enter your subject"
                      value={formData.subject}
                      onChange={handleChange}
                      disabled={profileLoading || loading}
                      required
                    />
                  </div>

                  {/* Message */}
                  <div className="col-12">
                    <label className="form-label fw-semibold">Message</label>

                    <textarea
                      name="message"
                      rows="7"
                      className="form-control"
                      placeholder="Write your message..."
                      value={formData.message}
                      onChange={handleChange}
                      disabled={profileLoading || loading}
                      required
                    />
                  </div>

                  {/* Submit */}
                  <div className="col-12">
                    <button
                      type="submit"
                      className="btn btn-danger px-4 py-3 d-flex align-items-center gap-2"
                      disabled={loading || profileLoading || !profile}
                    >
                      {loading ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm"
                            role="status"
                          />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send size={18} />
                          Send Message
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
