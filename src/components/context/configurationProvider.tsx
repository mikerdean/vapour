import { createContext, useContext } from "solid-js";
import { createStore } from "solid-js/store";

import type {
  ConfigurationContextType,
  ConfigurationMethods,
  ConfigurationProviderComponent,
  ConfigurationStore,
} from "./configurationProvider.types";

const ConfigurationContext = createContext<ConfigurationContextType>([
  {} as ConfigurationStore,
  {} as ConfigurationMethods,
]);

const ConfigurationProvider: ConfigurationProviderComponent = (props) => {
  const [state, setState] = createStore<ConfigurationStore>({
    pageSize: 100,
  });

  const setPageSize = (pageSize: number) => setState("pageSize", pageSize);

  return (
    <ConfigurationContext.Provider value={[state, { setPageSize }]}>
      {props.children}
    </ConfigurationContext.Provider>
  );
};

const useConfiguration = () => useContext(ConfigurationContext);

export default ConfigurationProvider;
export { useConfiguration };
