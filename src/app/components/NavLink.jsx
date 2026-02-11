import Link from "next/link";

const NavLink = ({ href, title }) => {
  return (
    <Link
      href={href}
      className="block py-2 pl-3 pr-4 text-gray-600 dark:text-[#ADB7BE] sm:text-xl rounded md:p-0 hover:text-primary-600 dark:hover:text-white transition-colors duration-300"
    >
      {title}
    </Link>
  );
};

export default NavLink;
