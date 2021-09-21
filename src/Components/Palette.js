import React, { Component } from "react";
import ColorBox from "./ColorBox";
import NavBar from "./NavBar";
import "../Styles/Palette.css";

export default class Palette extends Component {
  constructor(props) {
    super(props);
    this.state = { level: 500 };
    this.changeLevel = this.changeLevel.bind(this);
  }

  changeLevel(newLevel) {
    this.setState({ level: newLevel });
  }

  render() {
    const { colors } = this.props.palette;
    const { level } = this.state;
    const colorBoxes = colors[level].map((color) => (
      <ColorBox background={color.hex} name={color.name} />
    ));
    return (
      <div className="Palette">
        {/*Navbar goes here */}
        <NavBar level={level} changeLevel={this.changeLevel} />
        <div className="Palette-colors">
          {/*Color box goes here */}
          {colorBoxes}
        </div>
        {/*footer*/}
      </div>
    );
  }
}
