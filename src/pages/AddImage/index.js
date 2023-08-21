import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useDrop } from "react-dnd";
import Spinner from "react-bootstrap/Spinner";
import { NativeTypes } from "react-dnd-html5-backend"; // Make sure to import NativeTypes

import Splash from "../Splash";
import "./styles.css";

const nativeFileTarget = {
  hover(props, monitor, component) {
    monitor.isOver({ shallow: true });
  },
  drop(props, monitor, component) {
    component.handleDroppedFiles(monitor);
  },
};

function WelcomeScreen(props) {
  const [showSpinner, setShowSpinner] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  const handleDroppedFiles = (monitor) => {
    setShowSpinner(true);
    onImageChange({ target: { files: monitor.getItem().files } });
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      const file = event.target.files[0];
      reader.fileName = file.name;

      reader.onloadend = (upload) => {
        props.handleUploadedFile(upload.target);
      };
      reader.readAsDataURL(file);
    }
  };

  if (loading) {
    return <Splash />;
  }

  return (
    <div
      style={{ height: "100%" }}
      className="animate__animated animate__bounceIn"
    >
      <div className="wrapper">
        <div className="lower-wrapper">
          <img
            src="./static/img/logo-white.png"
            style={{ marginTop: -100, marginBottom: 50, width: 350 }}
          />
          {/* Adjust the rest of your JSX */}
        </div>
      </div>
    </div>
  );
}

const mapDispachToProps = (dispatch) => ({
  handleUploadedFile: (file) => {
    dispatch({ type: "HANDLE_FILE_UPLOAD", payload: file });
  },
  setImage: (image, name) => {
    dispatch({
      type: "SET_IMAGE_FROM_WELCOME_SCREEN",
      payload: { result: image, fileName: name },
    });
  },
});

const mapStateToProps = (state) => ({ image: state.image });

export default connect(
  mapStateToProps,
  mapDispachToProps
)(WelcomeScreen);
