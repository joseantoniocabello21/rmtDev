import toast from "react-hot-toast";

export const handleError = (error: unknown) => {
  let message;
  //Error validaion because of unknown type
  if (error instanceof Error) {
    message = error.message;
  } else if (typeof error === "string") {
    message = error;
  } else {
    message = "An error occurred while fetching job items";
  }

  toast.error(message);
};
