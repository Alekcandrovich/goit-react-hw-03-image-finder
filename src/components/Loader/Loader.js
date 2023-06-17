import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { RotatingLines } from 'react-loader-spinner';


class CustomLoader extends Component {

  render() {
    const {
      strokeColor,
      strokeWidth,
      animationDuration,
      width,
      visible,
    } = this.props;

    return (
      <>
        <RotatingLines
          strokeColor={strokeColor}
          strokeWidth={strokeWidth}
          animationDuration={animationDuration}
          width={width}
          visible={visible}
        />
      </>
    );
  }
}

CustomLoader.propTypes = {
  strokeColor: PropTypes.string,
  strokeWidth: PropTypes.number,
  animationDuration: PropTypes.number,
  width: PropTypes.number,
  visible: PropTypes.bool.isRequired,
};

CustomLoader.defaultProps = {
  strokeColor: 'blue',
  strokeWidth: 2,
  animationDuration: 1000,
  width: 50,
  visible: true ,
};

export default CustomLoader;