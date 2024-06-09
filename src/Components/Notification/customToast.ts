import { toast } from 'react-toastify';
import { ToastOptions } from 'react-toastify';

export interface IToaster {
  name: string;
  configs?: ToastOptions;
  type?: 'success' | 'warning' | 'error';
}

const customToast = ({ name, configs, type = 'warning' }: IToaster) => {
  const baseConfigs: ToastOptions = {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
  };

  const combinedConfigs = { ...baseConfigs, ...configs };

  return toast[type](name, combinedConfigs);
};

export default customToast;
