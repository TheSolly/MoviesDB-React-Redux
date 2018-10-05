import React from "react";
import _ from "lodash";
import CircularProgress from "@material-ui/core/CircularProgress";

// const styles = {
//   refreshStyle: {
//     position: "relative",
//     display: "block",
//     margin: "0 auto"
//   }
// };

const LoaderComponent = ({ isLoading, children }) => {
  if (isLoading) {
    return (
      <CircularProgress
        // style={{ flex: "1", justifySelf: "center" }}
        size={100}
      />
    );
  }
  // Render nothing if no children present
  return children ? children : null;
};

export default LoaderComponent;
