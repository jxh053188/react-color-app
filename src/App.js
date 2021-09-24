import "./Styles/App.css";
import Palette from "./Components/Palette";
import seedColors from "./seedColors";
import { generatePalette } from "./colorHelpers";
import { Route, Switch } from "react-router-dom";
import { Component } from "react";
import PaletteList from "./Components/PaletteList";
import SingleColorPalette from "./Components/SingleColorPalette";
import NewPaletteForm from "./Components/NewPaletteForm";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { palettes: seedColors };
    this.savePalette = this.savePalette.bind(this);
    this.findPalette = this.findPalette.bind(this);
  }
  findPalette(id) {
    return this.state.palettes.find(function (palette) {
      return palette.id === id;
    });
  }
  savePalette(newPalette) {
    this.setState({ palettes: [...this.state.palettes, newPalette] });
  }
  render() {
    return (
      <>
        <Switch>
          <Route
            exact
            path="/palette/new"
            render={() => <NewPaletteForm savePalette={this.savePalette} />}
          />
          <Route
            exact
            path="/"
            render={(routeProps) => (
              <PaletteList palettes={this.state.palettes} {...routeProps} />
            )}
          />
          <Route
            exact
            path="/palette/:id"
            render={(routeProps) => (
              <Palette
                palette={generatePalette(
                  this.findPalette(routeProps.match.params.id)
                )}
              />
            )}
          />
          <Route
            exact
            path="/palette/:paletteId/:colorId"
            render={(routeProps) => (
              <SingleColorPalette
                colorId={routeProps.match.params.colorId}
                palette={generatePalette(
                  this.findPalette(routeProps.match.params.paletteId)
                )}
              />
            )}
          />
        </Switch>
        {/*     <div>
        <Palette palette={generatePalette(seedColors[1])} />
</div>*/}
      </>
    );
  }
}

export default App;
