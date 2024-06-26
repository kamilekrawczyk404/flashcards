import { useContext, useState } from "react";
import Dropdown from "@/Layouts/Partials/Dropdown.jsx";
import NavLink from "@/Layouts/Partials/NavLink.jsx";
import ResponsiveNavLink from "@/Layouts/Partials/ResponsiveNavLink.jsx";
import { ApplicationLogo } from "@/Layouts/Partials/ApplicationLogo.jsx";
import { getFilePath } from "@/getFilePath.jsx";
import { AnimatedCheckbox } from "@/Components/Form/AnimatedCheckbox.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { ThemeContext } from "@/ThemeContext.jsx";
import Cookies from "js-cookie";
import { ChangeModeButton } from "@/Components/Buttons/ChangeModeButton.jsx";

export default function Authenticated({
  user,
  header,
  children,
  fullScreen = false,
}) {
  const { properties, changeMode } = useContext(ThemeContext);

  const [showingNavigationDropdown, setShowingNavigationDropdown] =
    useState(false);

  return (
    <div
      className={
        properties.background +
        " " +
        (fullScreen ? "h-screen overflow-hidden" : "")
      }
    >
      <nav className={properties.container + " border-b border-gray-100"}>
        <div className="md:max-w-[66rem] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex relative items-center">
              <ApplicationLogo className={"text-3xl"} />

              <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex relative">
                <NavLink
                  href={route("flashcards.showNewSet")}
                  active={route().current("flashcards.showNewSet")}
                >
                  Create Set
                </NavLink>
              </div>
            </div>
            <div className="hidden sm:flex sm:items-center">
              <ChangeModeButton />
              <div className="ml-3 relative">
                <Dropdown>
                  <Dropdown.Trigger>
                    <span className="inline-flex rounded-md">
                      <button
                        type="button"
                        className={
                          properties.text +
                          " space-x-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md hover:brightness-75 focus:outline-none transition ease-in-out duration-150 "
                        }
                      >
                        <span
                          className={
                            "overflow-ellipsis overflow-hidden max-w-xs"
                          }
                        >
                          {user.name}
                        </span>
                        <img
                          className={
                            "max-w-[2.5rem] shadow-lg aspect-square border-2 border-indigo-500 rounded-full"
                          }
                          src={getFilePath(`/users_avatars/${user.avatar}`)}
                          alt={"avatar"}
                        />
                      </button>
                    </span>
                  </Dropdown.Trigger>

                  <Dropdown.Content className={`${properties.text}`}>
                    <Dropdown.Link
                      href={route("profile.edit")}
                      className={properties.container}
                    >
                      Profile
                    </Dropdown.Link>
                    <Dropdown.Link
                      href={route("logout")}
                      method="post"
                      as="button"
                      className={properties.container}
                    >
                      Log Out
                    </Dropdown.Link>
                  </Dropdown.Content>
                </Dropdown>
              </div>
            </div>

            <div className="-mr-2 flex items-center sm:hidden">
              <button
                onClick={() =>
                  setShowingNavigationDropdown(
                    (previousState) => !previousState,
                  )
                }
                className={`${properties.text} inline-flex items-center justify-center p-2 rounded-md focus:outline-none transition duration-150 ease-in-out`}
              >
                <svg
                  className="h-6 w-6"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    className={
                      !showingNavigationDropdown ? "inline-flex" : "hidden"
                    }
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                  <path
                    className={
                      showingNavigationDropdown ? "inline-flex" : "hidden"
                    }
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div
          className={
            (showingNavigationDropdown ? "block" : "hidden") + " sm:hidden"
          }
        >
          <div className="pt-2 pb-3 space-y-1">
            <ResponsiveNavLink
              href={route("flashcards.showNewSet")}
              active={route().current("flashcards.showNewSet")}
            >
              Create set
            </ResponsiveNavLink>
            <ChangeModeButton className={"ml-4"} />
          </div>

          <div className="pt-4 pb-1 border-t border-gray-200">
            <div className="px-4">
              <div className="font-medium text-base text-gray-800">
                {user.name}
              </div>
              <div className="font-medium text-sm text-gray-500">
                {user.email}
              </div>
            </div>

            <div className="mt-3 space-y-1">
              <ResponsiveNavLink href={route("profile.edit")}>
                Profile
              </ResponsiveNavLink>
              <ResponsiveNavLink
                method="post"
                href={route("logout")}
                as="button"
              >
                Log Out
              </ResponsiveNavLink>
            </div>
          </div>
        </div>
      </nav>

      {header && (
        <header className={properties.container + " shadow"}>
          <div className="md:max-w-[66rem] max-w-7xl mx-auto h-10 px-4 sm:px-6 lg:px-8 flex justify-between items-center text-indigo-500 font-bold text-xl">
            {header}
          </div>
        </header>
      )}

      <main className={properties.background}>{children}</main>
    </div>
  );
}