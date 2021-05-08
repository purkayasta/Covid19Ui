import { FormControl, MenuItem, Select } from "@material-ui/core";
import "./App.css";

function App() {
  return (
    <div className="app">
      <div className="app__header">
        <h1>Covid 10 UI</h1>
        <FormControl className="app__dropdown">
          <Select variant="outlined" value="abc">
            <MenuItem value="worldwide">WorldWide</MenuItem>
            <MenuItem value="worldwide1">WorldWide1</MenuItem>
            <MenuItem value="worldwide2">WorldWide2</MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  );
}

export default App;
