const NavBar = () => {
  const menus = [
    {
      id: 1,
      title: "Manage Todo",
      url: "/",
    },
    {
      id: 2,
      title: "Completed",
      url: "completed",
    },
    {
      id: 3,
      title: "Stats",
      url: "stats",
    },
  ];
  return (
    <nav className="rounded-lg bg-white shadow-lg">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img src="todo.svg" alt="" className="w-8 h-8" />
            <span className="text-xl font-bold text-gray-900">FocusTodo</span>
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
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
