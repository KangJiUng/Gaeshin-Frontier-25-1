import { registerRootComponent } from "expo";

import App from "./App";
import Fire from "./FireDetected";

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
// 첫화면 조정
registerRootComponent(App);
