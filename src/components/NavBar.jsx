import { Menu, ArrowRight } from "lucide-react";
import { useState } from "react";

const NavBar = () => {
  const menus = [
    {
      id: 1,
      title: "Dashboard",
      url: "/",
    },
    {
      id: 2,
      title: "All Tasks",
      url: "completed",
    },
    {
      id: 3,
      title: "Stats",
      url: "stats",
    },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handelMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };
  return (
    <nav className="rounded-lg bg-white shadow-lg">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img src="todo.svg" alt="" className="w-8 h-8" />
            <span className="text-2xl font-bold text-gray-900">FocusTodo</span>
          </div>
          {/* Navigation Link */}
          <div className="hidden md:flex items-center space-x-8">
            {menus.map((menu) => (
              <a
                key={menu.id}
                href={menu.url}
                className="nav-link relative px-1 font-medium text-gray-500 transition-colors duration-200 
            hover:text-indigo-600 after:absolute after:left-0 after:-bottom-0.5 after:h-0.5 
            after:w-0 after:bg-indigo-600 after:transition-all after:duration-300 
            hover:after:w-full active:text-indigo-600 active:after:w-full"
              >
                {menu.title}
              </a>
            ))}
          </div>
          <div
            className="block md:hidden text-black rounded-full p-2 hover:bg-gray-100 cursor-pointer"
            onClick={handelMenu}
          >
            <Menu size={20} />
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col items-left gap-y-2 py-2">
            {menus.map((menu) => (
              <a
                key={menu.id}
                className={`flex justify-between border-t-2 border-gray-200 p-2 hover:bg-blue-600 hover:text-white cursor-pointer
                transition-colors ${
                  (menu.url === "/" && location.pathname === "/") ||
                  (menu.url !== "/" && location.pathname.includes(menu.url))
                    ? "bg-blue-600 text-white"
                    : ""
                }`}
                href={menu.url}
              >
                <span>{menu.title}</span>
                <span className="opacity-60">
                  <ArrowRight />
                </span>
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
