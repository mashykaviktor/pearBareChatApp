import { Provider } from "react-redux";
import { store } from "./src/redux/store";

import BareProvider from "./src/component/BareProvider";
import HomeScreen from "./src/screen/HomeScreen";
import { rpcHandler } from "./src/lib/rpc";

export default function App() {
  return (
    <Provider store={store}>
      <BareProvider rpcHandler={rpcHandler}>
        <HomeScreen />
      </BareProvider>
    </Provider>
  );
}
