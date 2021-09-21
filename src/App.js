import "./Styles/App.css";
import Palette from "./Components/Palette";
import seedColors from "./seedColors";
import { generatePalette } from "./colorHelpers";
import { Route, Switch } from "react-router-dom";
import { Component } from "react";
import PaletteList from "./Components/PaletteList";

class App extends Component {
  findPalette(id) {
    return seedColors.find(function (palette) {
      return palette.id === id;
    });
  }
  render() {
    return (
      <>
        <Switch>
          <Route
            exact
            path="/"
            render={() => <PaletteList palettes={seedColors} />}
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
        </Switch>
        {/*     <div>
        <Palette palette={generatePalette(seedColors[1])} />
</div>*/}
      </>
    );
  }
}

export default App;
