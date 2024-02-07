import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export const SocialButton = ({
    activeSocial,
    handleSetActiveSocial,
    handleDeleteSocial,
    usedInForm = false,
    hasRemovingButton = false,
    element,
    isDeleting = false,
    ...props
}) => {
    return usedInForm ? (
        <button
            {...props}
            type={"button"}
            className={
                activeSocial === element.name
                    ? "relative before:absolute before:bg-indigo-500 before:-bottom-2 before:left-1/2 before:transform before:-translate-x-1/2 before:w-3 before:aspect-square before:rounded-full before:transition"
                    : ""
            }
            onClick={() => {
                handleSetActiveSocial(element.name);
            }}
        >
            <FontAwesomeIcon icon={`fa-brands ` + (element.name === 'x' ? "fa-square-x-twitter" : `fa-square-${element.name}`)} className={`aspect-square h-[2.875rem] mt-1 ${element.color}`} />
        </button>
    ) : (
        <>
            <div {...props} className={"relative"}>
                <FontAwesomeIcon  icon={`fa-brands ` + (element.name === 'x' ? "fa-square-x-twitter" : `fa-square-${element.name}`)} className={`aspect-square h-[3.5rem] mt-1 ${element.color}`}/>
                <button
                    disabled={isDeleting}
                    type="button"
                    className={
                        "absolute -top-2 -right-3 rounded-full bg-red-600 w-7 aspect-square"
                    }
                    onClick={(e) => {
                        handleDeleteSocial(e, element.name);
                    }}
                >
                    <FontAwesomeIcon icon="fa-solid fa-xmark" className={'text-gray-100'}/>
                </button>
            </div>
        </>
    );
};