import {Bounce, Id, toast} from "react-toastify";

export const showToast = (message: string, type: 'success' | 'error' | 'info' | 'warning', onClose?: () => void): Id => {
  const toastFunction = toast[type] || toast;
  return toastFunction(message, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
    onClose: onClose
  });
};
