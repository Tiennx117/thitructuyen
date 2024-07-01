import React from "react";

import { Avatar } from "primereact/avatar";
import { useFadeEffect } from "../hooks/useFadeEffect";

export const WithUseFadeEffectHook = () => {
  const [hovered, setHovered] = React.useState(false);
  const [_isTransitioning, shouldBeVisible, ref] = useFadeEffect(hovered);

  console.log("is transitioning", _isTransitioning);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const _popoverStyles = {
    position: "relative",
    opacity: 0,
    transitionDuration: "200ms",
    transitionProperty: "opacity",
    transitionTimingFunction: "cubic-bezier(0, 0, 1, 1)",
    zIndex: 1200
  };

  const _popoverVisibleStyles = {
    position: "relative",
    zIndex: 1200,
    opacity: 1,
    transitionDuration: "200ms",
    transitionTimingFunction: "cubic-bezier(0, 0, 1, 1)"
  };

  return (
    <div>
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          width: 50,
          height: 50,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer"
        }}
      >
          <Avatar label="V" className="mr-2" size="large" style={{ backgroundColor: '#2196F3', color: '#ffffff' }} shape="circle" />
      </div>
      {_isTransitioning && (
        <div
          ref={ref}
          style={shouldBeVisible ? _popoverVisibleStyles : _popoverStyles}
        >
          <div
            style={{
              backgroundColor: "#fff",
              border: "1px solid #eee",
              borderRadius: 6,
              position: "absolute",
              top: 0,
              left: 0,
              padding: 16,
              minWidth: 250,
              transform: "translate(-50%, 0px)",
              boxShadow:
                "0 12px 28px 0 rgba(0, 0, 0, 0.2),0 2px 4px 0 rgba(0, 0, 0, 0.1),inset 0 0 0 1px rgba(255, 255, 255, 0.05)"
            }}
          >
            I will appear and disappear with a fade effect!
          </div>
        </div>
      )}
    </div>
  );
};
