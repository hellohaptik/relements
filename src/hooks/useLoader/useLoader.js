import React, { useState, useEffect } from "react";
import useActivify from "../useActivify";
import SpinningLoader from "../../components/UI/Loader";
import styles from "./useLoader.scss";

/**
 * useLoader React Hook
 * Helper hook to add a loader to your component
 * By default it covers the entire component (w100% h100%)
 * @param {bool} isLoading initial value of the loader
 * @returns {obj} {
 *    @param renderLoader {func} Place this inside your component
 *    @param activateLoader {func}  To activate the loader
 *    @param deactivateLoader {func}  To deactivate the loader
 * }
 */
export default function useLoader(isLoading) {
  const [active, setActive] = useState(isLoading);
  const { visible, enabled } = useActivify(active);

  const activateLoader = () => {
    setActive(true);
  };

  const deactivateLoader = () => {
    setActive(false);
  };

  const renderLoader = React.useCallback(() => {
    const activeClassName = visible ? styles.active : "yolo";
    if (!enabled) return null;
    return (
      <div className={`${styles.loadingWrapper} ${activeClassName}`}>
        <SpinningLoader />
      </div>
    );
  }, [visible, enabled]);

  useEffect(() => {
    if (isLoading) activateLoader();
    else deactivateLoader();
  }, [isLoading]);

  return { renderLoader, activateLoader, deactivateLoader };
}
