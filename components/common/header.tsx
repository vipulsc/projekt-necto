import NavLink from "../styling-component/nav-link";
import { Layers2 } from "lucide-react";
import { Button } from "../ui/button";

function Header() {
  const isLoggedIn = false;
  return (
    <nav className="container flex items-center justify-between py-4 lg:px-8 px-2 mx-auto">
      <div className="flex lg:flex-1">
        <NavLink
          href={"/"}
          className="flex items-center gap-1 lg:gap-2 shrink-0"
        >
          <Layers2 className="w-6 h-6  lg:w-8 lg:h-8  text-gray-950 hover:-translate-y-1  transition-transform duration-500 ease-in-out cursor-pointer" />
          <span className="font-extrabold lg:text-xl text-gray-950 ">
            Necto
          </span>
        </NavLink>
      </div>
      <div className="flex lg:justify-center gap-4 lg:gap-12 lg:items-center">
        <NavLink href={"/#pricing"}>pricing</NavLink>
        {isLoggedIn && <NavLink href={"/dashboard"}>Your Summaries</NavLink>}
      </div>
      <div className="flex lg:justify-end lg:flex-1">
        {isLoggedIn ? (
          <div className="flex gap-2 items-center">
            <NavLink href="/upload">Upload a PDF</NavLink>
            <div>Pro</div>
            <Button>user</Button>
          </div>
        ) : (
          <div>
            <NavLink href={"/sign-in"}>Sign In</NavLink>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Header;
