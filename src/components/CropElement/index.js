import React, { useState } from "react";
import { connect } from "react-redux";
import { useDrag } from "react-dnd";

import "./styles.css";

const cardSource = {
  canDrag(props) {
    return !props.flag;
  },
  isDragging(props, monitor) {
    return monitor.getItem().id === props.id;
  },
  beginDrag(props, monitor, component) {
    const item = { id: props.id, left: props.left, top: props.top };
    return item;
  },
};

function CropElement(props) {
  const [cursor, setCursor] = useState(null);
  const [{ isDragging }, connectDrag] = useDrag({
    type: "crop-div",
    ...cardSource,
  });

  const handleMouseDown = (e) => {
    // Your existing code
  };

  const handleMouseUp = (e) => {
    // Your existing code
  };

  const handleMouseMove = (e) => {
    // Your existing code
  };

  if (isDragging) {
    return <div />;
  }

  return connectDrag(
    <div
      className="crop-div"
      id={props.id}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      style={{
        width: props.cropDivWidth,
        height: props.cropDivHeight,
        cursor: cursor || "move",
        left: props.left,
        top: props.top,
      }}
    />
  );
}

const mapStateToProps = (state) => {
  // Your existing mapStateToProps
};

const mapDispatchToProps = (dispatch) => {
  // Your existing mapDispatchToProps
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CropElement);
