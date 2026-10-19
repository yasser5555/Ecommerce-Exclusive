import FAQPage from "../pages/FAQ";
import PrivacyPolicyPage from "../pages/PrivacyPolicy";
import TermsOfUsePage from "../pages/TermsOfUse";

export const LegalRoutes = [
  {
    path: "/privacy-policy",
    element: <PrivacyPolicyPage />,
  },
  {
    path: "/terms-of-use",
    element: <TermsOfUsePage />,
  },
  {
    path: "/faq",
    element: <FAQPage />,
  },
];
