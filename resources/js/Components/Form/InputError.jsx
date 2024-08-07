import { useContext } from "react";
import { ThemeContext } from "@/ThemeContext.jsx";

export default function InputError({ message, className = "", ...props }) {
  return message ? (
    <p
      {...props}
      className={
        "p-2 rounded-md text-red-500 text-md w-fit shadow-lg bg-red-100 font-bold border-2 border-red-600 " +
        className
      }
    >
      {message}
    </p>
  ) : null;
}