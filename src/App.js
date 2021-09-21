import './Styles/App.css';
import Palette from './Components/Palette'
import seedColors from './seedColors'

function App() {
  return (
    <div>
      <Palette {...seedColors[3]}/>
    </div>
  )
}

export default App;
