export type NavLink = {
  label: string;
  href: string;
  hasDropdown?: boolean;
};

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Categories", href: "/shop", hasDropdown: true },
  { label: "Custom Orders", href: "/custom-orders" },
  { label: "Corporate Gifting", href: "/corporate-gifting" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
];
