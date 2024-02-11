import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Loader = ({ progress, hasMore, sets = [], className = "" }) => {
  const styling =
    "animate-loading transform bg-indigo-500 h-[.75rem] aspect-square rounded-full origin-bottom animate-loading ";

  const delays = [100, 200, 300, 400, 500];

  return (
    //TODO: find a good one animation on web, style entire explore component

    <div className={className}>
      {progress && (
        <div className={"relative flex gap-2 h-[4rem]"}>
          {delays.map((delay, index) => (
            <div
              key={index}
              className={styling + `animation-delay-${delay}`}
            ></div>
          ))}
        </div>
      )}

      {!hasMore && !sets.length && (
        <div
          className={
            "bg-gray-100 rounded-md p-4 text-red-500 font-bold flex items-center gap-2"
          }
        >
          <FontAwesomeIcon icon="fa-solid fa-xmark" className={"text-xl"} />
          No sets found!
        </div>
      )}
    </div>
  );
};