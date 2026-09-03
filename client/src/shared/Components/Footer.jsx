import React from "react";

export default function Footer() {
  const footerData = [
    {
      type: "brand",
      title: "Exclusive",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      type: "contact",
      title: "Support",
      contacts: [
        {
          icon: "fa fa-home",
          text: "111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.",
        },
        {
          icon: "fas fa-envelope",
          text: "exclusive@gmail.com",
        },
        {
          icon: "fas fa-phone",
          text: "+88015-88888-9999",
        },
      ],
    },
    {
      type: "links",
      title: "Account",
      links: [
        { name: "My Account", href: "#" },
        { name: "Settings", href: "#" },
        { name: "Cart", href: "#" },
        { name: "Wishlist", href: "#" },
        { name: "Shop", href: "#" },
      ],
    },
    {
      type: "links",
      title: "Quick Link",
      links: [
        { name: "Privacy Policy", href: "#" },
        { name: "Terms Of Use", href: "#" },
        { name: "FAQ", href: "#" },
        { name: "Contact", href: "#" },
      ],
    },
  ];

  return (
    <footer className="text-white bg-black border-top border-white pt-5">
      <section>
        <div className="container py-4">
          <div className="row g-4">
            {footerData.map((item, index) => (
              <div key={index} className="col-12 col-sm-6 col-lg-3">
                {/* Brand */}
                {item.type === "brand" && (
                  <>
                    <h6 className="fs-3 fw-bold mb-4 text-white">
                      {item.title}
                    </h6>

                    <p className="text-white lh-lg mb-0">{item.text}</p>
                  </>
                )}

                {/* Links */}
                {item.type === "links" && (
                  <>
                    <h6 className="text-uppercase fw-bold mb-4">
                      {item.title}
                    </h6>

                    {item.links.map((link) => (
                      <p key={link.name} className="mb-3">
                        <a
                          href={link.href}
                          className="text-white text-decoration-none"
                        >
                          {link.name}
                        </a>
                      </p>
                    ))}
                  </>
                )}

                {/* Contact */}
                {item.type === "contact" && (
                  <>
                    <h6 className="text-uppercase fw-bold mb-4">
                      {item.title}
                    </h6>

                    {item.contacts.map((contact) => (
                      <p
                        key={contact.text}
                        className="d-flex align-items-start mb-3"
                      >
                        <i className={`${contact.icon} mt-1`}></i>

                        <span>{contact.text}</span>
                      </p>
                    ))}
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Copyright */}
      <div className="border-top border-secondary text-center py-4">
        @{new Date().getFullYear()} Copyright
      </div>
    </footer>
  );
}
