import React from "react";
import { Link } from "react-router-dom";
import { useChangeTitle } from "../../../../shared/Utils/useChangeTitle";
import LegalPageShell from "../Components/LegalPageShell";

const sections = [
  {
    title: "Using the store",
    text: "Use the store lawfully and provide accurate information when creating an account, placing an order, or contacting support. You are responsible for keeping your sign-in details secure and for activity performed through your account.",
  },
  {
    title: "Products and availability",
    text: "We aim to present product details, images, prices, and availability accurately. Product availability and displayed information may change, and we will contact you if an issue affects an order you placed.",
  },
  {
    title: "Orders and payment",
    text: "Submitting an order is a request to purchase the selected items. Orders are subject to confirmation, availability, and the checkout terms shown at the time of purchase. Applicable taxes, delivery charges, and payment options are shown during checkout where available.",
  },
  {
    title: "Delivery, returns, and cancellations",
    text: "Delivery estimates, cancellation options, and return eligibility depend on the details shown for your order and applicable law. Please review the information provided at checkout or contact support for help with a specific purchase.",
  },
  {
    title: "Site content and availability",
    text: "Store text, graphics, and design are provided for shopping and informational purposes. We may update features or content, and we work to keep the store available but cannot guarantee uninterrupted access.",
  },
  {
    title: "Changes and questions",
    text: "These terms may be updated as the store changes or as required. Continued use after an update means you accept the revised terms to the extent permitted by law. If you have a question about an order or these terms, contact our support team.",
  },
];

export default function TermsOfUsePage() {
  useChangeTitle({ title: "Terms of Use" });

  return (
    <LegalPageShell
      eyebrow="Simple, transparent terms"
      title="Terms of Use"
      description="The basic guidelines for using Exclusive, placing an order, and getting help with your purchase."
    >
      <p className="text-secondary mb-4">
        By accessing or using the Exclusive store, you agree to these terms.
        Additional information presented during checkout may apply to a
        particular order.
      </p>
      <div className="d-flex flex-column gap-3">
        {sections.map((section, index) => (
          <section
            key={section.title}
            className="border rounded-4 p-4 d-flex gap-3"
          >
            <span
              className="bg-danger-subtle text-danger rounded-3 d-flex align-items-center justify-content-center fw-bold flex-shrink-0"
              style={{ width: 42, height: 42 }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <h2 className="h5 fw-bold">{section.title}</h2>
              <p className="text-secondary mb-0">{section.text}</p>
            </div>
          </section>
        ))}
      </div>
      <div className="bg-light rounded-4 p-4 mt-4">
        <p className="text-secondary mb-0">
          Need help? Visit our{" "}
          <Link to="/contact" className="link-danger fw-semibold">
            contact page
          </Link>{" "}
          or browse the{" "}
          <Link to="/faq" className="link-danger fw-semibold">
            FAQs
          </Link>
          .
        </p>
      </div>
    </LegalPageShell>
  );
}
