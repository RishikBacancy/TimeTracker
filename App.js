import React from "react";
import Provider from "./src/navigaion/Provider";
import { LogBox } from "react-native";

LogBox.ignoreLogs(["EventEmitter.removeListener"]);

const App = () =>
{
  return(
    <Provider/>
  );
}

export default App;