import { toast } from 'react-toastify';

/**
 *
 * @param {string} msg message to display
 * @param {string} className css to style the toast
 * @param {string} position toast position
 */
const notify = (msg, className, position) => {
  toast(msg, {
    position: position || 'top-center',
    className,
    progressClassName: 'toast-progress',
    autoClose: 2000
  });
};

export default notify;
