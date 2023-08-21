import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import { connect } from "react-redux";

const styles = {
  root: {
    width: "200px",
  },
  slider: {
    padding: "22px 0px",
  },
};

class ContrastSlider extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div>
        {this.props.showSlider ? (
          <div className={classes.root}>
            <Typography id="label" style={{ color: "#f1f1f1" }}>
              Contraste: {Math.floor(this.props.value)}
            </Typography>
            <Slider
              classes={{ container: classes.slider }}
              value={this.props.value}
              aria-labelledby="label"
              onChange={this.props.handleChange}
            />
          </div>
        ) : null}
      </div>
    );
  }
}

ContrastSlider.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    value: state.contrastSliderValue,
    showSlider: state.showSlider,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleChange: (event, value) => {
      dispatch({
        type: "HANDLE_CONTRAST_CHANGE",
        payload: value,
      });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ContrastSlider));
