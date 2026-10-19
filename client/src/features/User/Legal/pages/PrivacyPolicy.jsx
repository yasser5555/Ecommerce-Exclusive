import React from "react";
import { Link } from "react-router-dom";
import { useChangeTitle } from "../../../../shared/Utils/useChangeTitle";
import LegalPageShell from "../Components/LegalPageShell";

const sections = [
  {
    title: "Information you provide",
    text: "When you create an account, place an order, or contact support, you may provide details such as your name, email address, delivery address, and the information you include in your message.",
  },
  {
    title: "How we use information",
    text: "We use information to operate your account, process and deliver orders, provide customer support, maintain the security of the store, and improve the shopping experience.",
  },
  {
    title: "Orders and payments",
    text: "Order details are used to manage purchases, fulfillment, and support. Payment information is handled by the payment method or provider presented during checkout; do not send payment card details through our contact form.",
  },
  {
    title: "Cookies and device information",
    text: "The store may use essential browser storage or similar technologies to keep features working, such as sign-in and cart functionality. Your browser settings can help you manage cookies, though disabling them may affect some features.",
  },
  {
    title: "Sharing and retention",
    text: "Information may be shared with service providers where needed to operate the store, fulfill orders, or provide support, and where disclosure is required by law. We retain information only as needed for these purposes and applicable obligations.",
  },
  {
    title: "Your choices and questions",
    text: "You can contact us to ask about, correct, or request deletion of personal information associated with your account, subject to records we are required or permitted to keep. We may need to verify your identity before acting on a request.",
  },
];

export default function PrivacyPolicyPage() {
  useChangeTitle({ title: "Privacy Policy" });

  return (
    <LegalPageShell
      eyebrow="Your privacy matters"
      title="Privacy Policy"
      description="A clear overview of the information used to provide your shopping experience and the choices available to you."
    >
      <p className="text-secondary mb-4">
        This page describes how Exclusive handles information when you use our
        store. By using the site, you understand that information is processed
        as described here and as required by applicable law.
      </p>
      <div className="row g-3">
        {sections.map((section, index) => (
          <section className="col-12 col-md-6" key={section.title}>
            <div className="h-100 border rounded-4 p-4">
              <span className="small text-danger fw-bold">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h2 className="h5 fw-bold mt-2">{section.title}</h2>
              <p className="text-secondary mb-0">{section.text}</p>
            </div>
          </section>
        ))}
      </div>
      <div className="bg-light rounded-4 p-4 mt-4">
        <h2 className="h5 fw-bold">Get in touch</h2>
        <p className="text-secondary mb-0">
          For privacy questions or requests, please use our{" "}
          <Link to="/contact" className="link-danger fw-semibold">
            contact page
          </Link>
          .
        </p>
      </div>
    </LegalPageShell>
  );
}
