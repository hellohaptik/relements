import { useState, useEffect } from "react";

/**
 * useActivify React Hook
 * Enables/Disables elements with timeouts to allow animations to
 * take place
 * @param {bool} active whether to enable to disable the element
 * @returns {obj} {
 *    @param visible {bool}  whether the element should be showed (animated in/out)
 *    @param enabled {bool}  whether the element should render (return null if false)
 * }
 */
export default function useActivify(active) {
  const [visible, setVisible] = useState(active);
  const [enabled, setEnabled] = useState(active);

  let _enableTimeout = null;
  let _disableTimeout = null;

  const show = () => {
    if (_disableTimeout) clearTimeout(_disableTimeout);
    setEnabled(true);
    _enableTimeout = setTimeout(() => {
      setVisible(true);
    }, 50);
  };

  const hide = () => {
    if (_enableTimeout) clearTimeout(_enableTimeout);
    setVisible(false);
    _disableTimeout = setTimeout(() => {
      setEnabled(false);
    }, 400);
  };

  useEffect(() => {
    if (active) show();
    else hide();
  }, [active]);

  return { visible, enabled };
}
