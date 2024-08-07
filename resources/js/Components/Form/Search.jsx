import { forwardRef, useContext, useEffect, useRef } from "react";
import { button } from "@material-tailwind/react";
import Animation from "@/Pages/Animation.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import { ThemeContext } from "@/ThemeContext.jsx";

export const Search = forwardRef(
  (
    {
      searching,
      isSearching,
      searchingRef,
      handleSetSearching,
      handleSetCurrentPage,
      handleSetIsSearching,
      handleDeleteCookie,
      previousSearches = [],
    },
    ref,
  ) => {
    const { properties } = useContext(ThemeContext);
    const TIMEOUT = 100;

    let previousSearchesContainerRef = useRef();
    let previousSearchesRef = useRef([]);

    useEffect(() => {
      if (!searching.length) {
        // reset appearing animation each time when user delete whole content of the search input
        animatePreviousSearches();
      }
    }, [searching.length]);
    const animatePreviousSearches = () => {
      const animation = new Animation([previousSearchesContainerRef.current]);
      animation.animateAll("", "", "");
    };

    return (
      <div
        className={
          "flex flex-col relative transition-width duration-500 " +
          (isSearching ? "xl:w-1/2 lg:w-3/4 w-full" : "w-0")
        }
      >
        <div
          className={
            properties.container +
            " flex relative gap-2 items-center justify-center p-2 " +
            (isSearching ? "rounded-t-md" : "w-fit aspect-square rounded-md")
          }
        >
          <button
            type={"button"}
            className={isSearching ? "hidden" : "inline-block"}
            onClick={() => {
              handleSetIsSearching(true);
              setTimeout(() => {
                ref.current.focus();
                animatePreviousSearches();
              }, TIMEOUT);
            }}
          >
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className={"text-lg text-indigo-500"}
            />
          </button>
          <input
            placeholder={isSearching ? "Search..." : ""}
            ref={ref}
            type="text"
            value={searching}
            onChange={(e) => {
              handleSetCurrentPage(0);
              handleSetSearching(e.target.value);
            }}
            className={
              properties.background +
              " " +
              properties.text +
              " border-none rounded-sm focus:ring-0 " +
              (isSearching ? "block w-full" : "hidden")
            }
          />

          {isSearching && (
            <button
              onClick={() => {
                handleSetSearching("");
                setTimeout(() => {
                  handleSetIsSearching(false);
                }, TIMEOUT);
              }}
              className={
                "text-gray-100 bg-indigo-500 rounded-md flex items-center justify-center"
              }
            >
              <FontAwesomeIcon
                icon={faXmark}
                className={"font-bold text-2xl px-3 py-2"}
              />
            </button>
          )}
        </div>
        <div
          className={
            "relative bg-indigo-500 h-[.25rem] transition-width " +
            (isSearching ? "w-full" : "w-0")
          }
        ></div>
        {previousSearches.length > 0 && isSearching && !searching.length && (
          <div
            ref={previousSearchesContainerRef}
            className={
              properties.container +
              " w-full space-y-2 mx-auto rounded-b-md p-2 polygon-from-top opacity-0"
            }
          >
            <p className={"text-indigo-500"}>Last searches</p>
            <div className={"flex gap-x-2 py-2 overflow-x-scroll"}>
              {previousSearches.reverse().map(
                (previous, index) =>
                  index < 10 && (
                    <div
                      ref={(element) =>
                        (previousSearchesRef.current[index] = element)
                      }
                      key={index}
                      className={
                        "flex items-center justify-center cursor-pointer relative h-[2rem] shadow-md rounded-full"
                      }
                    >
                      <button
                        onClick={() => {
                          handleSetSearching(previous);
                        }}
                        className={
                          properties.background +
                          " " +
                          properties.text +
                          " w-full px-4 text-xl h-full rounded-l-full"
                        }
                      >
                        {previous}
                      </button>
                      <button
                        className={
                          "bg-indigo-500 flex items-center justify-center h-full rounded-r-full"
                        }
                        type={"button"}
                        onClick={() => {
                          handleDeleteCookie(index);
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faXmark}
                          className={
                            "text-md pl-2 pr-3 font-bold text-gray-100"
                          }
                        />
                      </button>
                    </div>
                  ),
              )}
            </div>
          </div>
        )}
      </div>
    );
  },
);