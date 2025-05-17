// import NavLink from "../styling-component/nav-link";
// import { Layers2 } from "lucide-react";
// import { Button } from "../ui/button";
// import {
//   SignedIn,
//   SignedOut,
//   SignIn,
//   SignUpButton,
//   UserButton,
// } from "@clerk/nextjs";

// function Header() {
//   return (
//     <nav className="container flex items-center justify-between py-4 lg:px-8 px-2 mx-auto">
//       <div className="flex lg:flex-1">
//         <NavLink
//           href={"/"}
//           className="flex items-center gap-1 lg:gap-2 shrink-0"
//         >
//           <Layers2 className="w-6 h-6  lg:w-8 lg:h-8  text-gray-950 hover:-translate-y-1  transition-transform duration-500 ease-in-out cursor-pointer" />
//           <span className="font-extrabold lg:text-xl text-gray-950 ">
//             Necto
//           </span>
//         </NavLink>
//       </div>
//       <div className="flex lg:justify-center gap-4 lg:gap-12 lg:items-center">
//         <NavLink href={"/#pricing"}>Pricing</NavLink>
//         <SignedIn>
//           <NavLink href={"/dashboard"}>Your Summaries</NavLink>
//         </SignedIn>
//       </div>
//       <div className="flex lg:justify-end lg:flex-1">
//         <SignedIn>
//           <div className="flex gap-2 items-center">
//             <NavLink href="/upload">Upload a PDF</NavLink>
//             <div>Pro</div>
//             <SignedIn>
//               <UserButton />
//             </SignedIn>
//           </div>
//         </SignedIn>

//         <SignedOut>
//           <NavLink href={"/sign-in"}>Sign In</NavLink>
//         </SignedOut>
//       </div>
//     </nav>
//   );
// }

// export default Header;

"use client";
import NavLink from "../styling-component/nav-link";
import { Layers2, Crown, Upload, FileText } from "lucide-react";
import { Button } from "../ui/button";
import {
  SignedIn,
  SignedOut,
  SignIn,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

function Header() {
  return (
    <nav className="sticky top-0 z-50 w-full">
      <div className="container flex items-center justify-between py-4 lg:px-8 px-4 mx-auto">
        <div className="flex lg:flex-1">
          <NavLink
            href={"/"}
            className="flex items-center gap-2 lg:gap-3 group"
          >
            <Layers2 className="w-6 h-6 lg:w-8 lg:h-8 text-rose-500 animate-bounce" />
            <span className="font-extrabold lg:text-xl bg-gradient-to-r from-rose-500 to-rose-600 bg-clip-text text-transparent">
              Necto
            </span>
          </NavLink>
        </div>

        <div className="flex justify-center gap-4 lg:gap-12 items-center">
          <NavLink
            href={"/#pricing"}
            className="text-gray-600 hover:text-rose-500 transition-colors duration-200 hidden md:block"
          >
            Pricing
          </NavLink>
          <SignedIn>
            <NavLink
              href={"/dashboard"}
              className="text-gray-600 hover:text-rose-500 transition-colors duration-200 hidden md:block"
            >
              Your Summaries
            </NavLink>
          </SignedIn>
        </div>

        <div className="flex lg:justify-end lg:flex-1 items-center gap-4">
          <SignedIn>
            <div className="flex gap-4 items-center">
              <Button
                className="bg-rose-500 hover:bg-rose-600 text-white hover:text-rose-50 px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-rose-200"
                asChild
              >
                <NavLink href="/upload">
                  <Upload className="w-4 h-4" />
                  <span className="hidden sm:inline">Upload a PDF</span>
                  <span className="sm:hidden">Upload</span>
                </NavLink>
              </Button>
              <div className="flex items-center gap-4">
                <Crown className="w-5 h-5 text-rose-500" />
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: "w-10 h-10 ring-2 ring-rose-100",
                    },
                  }}
                />
              </div>
            </div>
          </SignedIn>

          <SignedOut>
            <div className="flex items-center gap-4">
              <NavLink
                href={"/sign-in"}
                className="text-gray-600 hover:text-rose-500 transition-colors duration-200"
              >
                Sign In
              </NavLink>
              <Button
                className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-lg transition-all duration-200 shadow-lg hover:shadow-rose-200"
                asChild
              >
                <SignUpButton />
              </Button>
            </div>
          </SignedOut>
        </div>
      </div>

      {/* Mobile Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-4">
        <div className="flex justify-around items-center">
          <SignedIn>
            <NavLink
              href="/dashboard"
              className="flex flex-col items-center gap-1 text-gray-600 hover:text-rose-500 transition-colors duration-200"
            >
              <div className="relative">
                <FileText className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-rose-500 rounded-full"></span>
              </div>
              <span className="text-xs font-medium">Your Summaries</span>
            </NavLink>
            <NavLink
              href="/upload"
              className="flex flex-col items-center gap-1 text-gray-600 hover:text-rose-500 transition-colors duration-200"
            >
              <Upload className="w-5 h-5" />
              <span className="text-xs">Upload</span>
            </NavLink>
            <NavLink
              href="/#pricing"
              className="flex flex-col items-center gap-1 text-gray-600 hover:text-rose-500 transition-colors duration-200"
            >
              <Crown className="w-5 h-5" />
              <span className="text-xs">Pro</span>
            </NavLink>
          </SignedIn>
          <SignedOut>
            <NavLink
              href="/sign-in"
              className="flex flex-col items-center gap-1 text-gray-600 hover:text-rose-500 transition-colors duration-200"
            >
              <span className="text-xs">Sign In</span>
            </NavLink>
          </SignedOut>
        </div>
      </div>
    </nav>
  );
}

export default Header;
