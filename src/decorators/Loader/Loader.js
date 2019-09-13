import React from "react";
import LoadingComponent from "@src/components/UI/Loader";
import Activify from "@src/decorators/Activify";
import styles from "./Loader.scss";

const Loader = ({ customStyles, zIndex }) => WrappedComponent => {
  return props => {
    const [active, setActive] = React.useState(false);

    const activateLoader = React.useCallback(() => {
      setActive(true);
    });

    const deactivateLoader = React.useCallback(e => {
      if (e) {
        e.preventDefault && e.preventDefault();
        e.stopPropagation && e.stopPropagation();
      }
      setActive(false);
    });

    const Loading = Activify()(
      ({ active, zIndex = 1000000000, customStyles = {} }) => {
        const activeClassName = active ? styles.active : "";
        return (
          <div
            style={{ zIndex, ...customStyles }}
            className={`${styles.loaderWrapper} ${activeClassName}`}
          >
            <LoadingComponent />
          </div>
        );
      },
    );

    return (
      <>
        <WrappedComponent
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...props}
          loaderActive={active}
          activateLoader={activateLoader}
          deactivateLoader={deactivateLoader}
        />
        <Loading active={active} zIndex={zIndex} customStyles={customStyles} />
      </>
    );
  };
};

export default Loader;
