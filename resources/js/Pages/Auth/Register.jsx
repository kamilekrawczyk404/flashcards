import { useEffect, useLayoutEffect, useRef, useState } from "react";
import InputError from "@/Components/Form/InputError.jsx";
import TextInput from "@/Components/Form/TextInput.jsx";
import { Head, Link, useForm } from "@inertiajs/react";
import InputLabel from "@/Components/Form/InputLabel.jsx";
import Unauthenticated from "@/Layouts/UnauthenticatedLayout.jsx";
import { SectionWithVerticalMargin } from "@/Components/SectionWithVerticalMargin.jsx";
import { GradientAndLines } from "@/Components/GradientAndLines.jsx";
import { MainButton } from "@/Components/Buttons/MainButton.jsx";
import { ApplicationLogo } from "@/Layouts/Partials/ApplicationLogo.jsx";
import Animation from "@/Pages/Animation.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useUserAvatar } from "@/useUserAvatar.js";
import { getFilePath } from "@/getFilePath.jsx";

export default function Register() {
  let fileInputRef = useRef();
  let imageRef = useRef();
  let logoRef = useRef();
  let formRef = useRef();

  const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    avatar: getFilePath("/users_avatars/default.jpg"),
  });

  const {
    saveAvatar,
    temporaryAvatar,
    avatarErrors,
    userChangedAvatar,
    setUserChangedAvatar,
  } = useUserAvatar(fileInputRef, setData);

  useEffect(() => {
    return () => {
      reset("password", "password_confirmation");
    };
  }, []);

  useLayoutEffect(() => {
    let animation = new Animation([logoRef.current, formRef.current]);
    animation.animateAll("", "", "<+.1");
  }, []);

  const submit = (e) => {
    e.preventDefault();

    post(route("register"));
  };

  return (
    <Unauthenticated fullScreen={true}>
      <Head title="Register" />

      <SectionWithVerticalMargin
        className={"flex items-center justify-center flex-col gap-4 h-auto"}
      >
        <GradientAndLines
          ref={formRef}
          className={
            "relative 2xl:w-1/3 lg:w-1/2 md:w-2/3 w-full p-4 translate-y-12 opacity-0 polygon-start"
          }
          hasLines={true}
          linesColor={"bg-gray-100"}
          from={"from-indigo-600"}
          to={"to-indigo-400"}
        >
          <p className={"text-white text-2xl font-bold mb-4"}>Register</p>
          <form
            onSubmit={submit}
            className={"flex mx-auto flex-col rounded-none md:rounded-md"}
          >
            <div className={"flex sm:flex-row flex-col sm:gap-0 gap-y-4"}>
              <div className={"relative sm:w-2/5 w-full"}>
                <div>
                  <InputLabel htmlFor="name" value="Name" />

                  <TextInput
                    id="name"
                    name="name"
                    value={data.name}
                    className="mt-1 block w-full"
                    autoComplete="name"
                    isFocused={true}
                    onChange={(e) => setData("name", e.target.value)}
                    required
                  />

                  <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-4">
                  <InputLabel htmlFor="email" value="Email" />

                  <TextInput
                    id="email"
                    type="email"
                    name="email"
                    value={data.email}
                    className="mt-1 block w-full"
                    autoComplete="username"
                    onChange={(e) => setData("email", e.target.value)}
                    required
                  />

                  <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                  <InputLabel htmlFor="password" value="Password" />

                  <TextInput
                    id="password"
                    type="password"
                    name="password"
                    value={data.password}
                    className="mt-1 block w-full"
                    autoComplete="new-password"
                    onChange={(e) => setData("password", e.target.value)}
                    required
                  />

                  <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                  <InputLabel
                    htmlFor="password_confirmation"
                    value="Confirm Password"
                  />

                  <TextInput
                    id="password_confirmation"
                    type="password"
                    name="password_confirmation"
                    value={data.password_confirmation}
                    className="mt-1 block w-full"
                    autoComplete="new-password"
                    onChange={(e) =>
                      setData("password_confirmation", e.target.value)
                    }
                    required
                  />

                  <InputError
                    message={errors.password_confirmation}
                    className="mt-2"
                  />
                </div>
              </div>
              <div
                className={
                  "flex flex-col items-start relative h-min self-center sm:mx-auto sm:w-fit w-full"
                }
              >
                <InputLabel value={"Avatar"} />

                <input
                  ref={(element) => (fileInputRef.current = element)}
                  type="file"
                  onChange={() => saveAvatar()}
                  className={"hidden"}
                  accept={"image/*"}
                />

                <div
                  className={
                    "relative border-4 border-white rounded-full shadow-lg w-fit md:mx-0 mx-auto"
                  }
                >
                  <button
                    onClick={() => {
                      fileInputRef.current.click();
                    }}
                    type={"button"}
                    className={
                      "transition cursor-pointer hover:bg-gray-300 absolute flex items-center justify-center w-10 aspect-square bottom-1 right-1 bg-white rounded-full"
                    }
                  >
                    <FontAwesomeIcon
                      icon="fa-solid fa-camera"
                      className={"text-indigo-500 text-md"}
                    />
                  </button>
                  <img
                    ref={(element) => (imageRef.current = element)}
                    src={
                      data.avatar !== getFilePath("/users_avatars/default.jpg")
                        ? getFilePath("/users_avatars/default.jpg")
                        : data.avatar
                    }
                    className={"rounded-full w-[12rem] aspect-square "}
                    alt=""
                  />
                </div>
              </div>
            </div>

            <div className={"mt-2"}>
              {Object.values(avatarErrors).map(
                (element, index) =>
                  element.value && (
                    <InputError className="mt-2" message={element.message} />
                  ),
              )}
            </div>

            <div className="flex items-center md:flex-row flex-col-reverse mt-8 space-x-2 gap-4">
              <MainButton
                className="z-10 bg-white text-indigo-500 hover:bg-gray-300 md:w-fit w-full"
                disabled={processing}
              >
                Register
              </MainButton>
              <Link
                href={route("login")}
                className="underline text-gray-100 hover:text-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Already registered?
              </Link>
            </div>
          </form>
        </GradientAndLines>
      </SectionWithVerticalMargin>
    </Unauthenticated>
  );
}