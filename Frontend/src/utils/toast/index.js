import { toast } from 'react-toastify';

export const errorToast = ({ message, position = 'top-center', autoClose = 2000 }) => {
  toast.error(message, {
    position: position,
    autoClose: autoClose,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light'
  });
};
