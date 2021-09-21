import './Styles/App.css';
import Palette from './Components/Palette'
import seedColors from './seedColors'
import { generatePalette } from './Styles/colorHelpers';

function App() {
  console.log(generatePalette(seedColors[3]))
  return (
    <div>
      <Palette {...seedColors[3]}/>
    </div>
  )
}

export default App;
