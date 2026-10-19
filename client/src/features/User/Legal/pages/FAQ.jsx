import React from "react";
import { Link } from "react-router-dom";
import { useChangeTitle } from "../../../../shared/Utils/useChangeTitle";
import LegalPageShell from "../Components/LegalPageShell";

const questions = [
  {
    question: "How do I place an order?",
    answer:
      "Browse the store, add an available item to your cart, and continue to checkout. Review your delivery details and the order summary before submitting your order.",
  },
  {
    question: "Where can I see my order status?",
    answer:
      "Sign in and open the orders area in your account to review available order details and status updates. If you need help with a specific order, contact support with the order information.",
  },
  {
    question: "What payment methods can I use?",
    answer:
      "Available payment methods are shown during checkout and may vary. Please use only the options presented there, and never send card details through email or the contact form.",
  },
  {
    question: "How much does delivery cost and how long does it take?",
    answer:
      "Delivery options, estimated timing, and any charges are shown during checkout when available. Timing can depend on your location, item availability, and carrier conditions.",
  },
  {
    question: "Can I change or cancel my order?",
    answer:
      "Please contact us as soon as possible with your order details. Whether a change or cancellation is possible depends on the order's fulfillment status and applicable terms.",
  },
  {
    question: "How do returns work?",
    answer:
      "Return eligibility and instructions depend on the item and the terms that apply to your order. Contact support for guidance before sending an item back.",
  },
  {
    question: "I have an issue signing in. What should I do?",
    answer:
      "Use the sign-in and account recovery options on the authentication page. If the issue continues, contact support and include the email address linked to your account.",
  },
  {
    question: "How do I ask a question about my personal information?",
    answer:
      "Please send your request through the contact page. For more details about how information is handled, read our Privacy Policy.",
  },
];

export default function FAQPage() {
  useChangeTitle({ title: "FAQ" });

  return (
    <LegalPageShell
      eyebrow="Here to help"
      title="Frequently Asked Questions"
      description="Quick answers to common questions about orders, delivery, payments, and your account."
    >
      <div className="d-flex flex-column gap-3">
        {questions.map((item, index) => (
          <details className="border rounded-4 p-3 p-md-4" key={item.question}>
            <summary className="fw-bold fs-5 d-flex align-items-center gap-3">
              <span className="text-danger small">
                {String(index + 1).padStart(2, "0")}
              </span>
              {item.question}
            </summary>
            <p className="text-secondary mb-0 mt-3 ps-4">{item.answer}</p>
          </details>
        ))}
      </div>
      <div className="bg-dark text-white rounded-4 p-4 p-md-5 mt-4 d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3">
        <div>
          <h2 className="h4 fw-bold">Still need a hand?</h2>
          <p className="text-white-50 mb-0">
            Our support team can help with questions specific to your order.
          </p>
        </div>
        <Link to="/contact" className="btn btn-danger rounded-3 px-4 py-2">
          Contact support
        </Link>
      </div>
    </LegalPageShell>
  );
}
