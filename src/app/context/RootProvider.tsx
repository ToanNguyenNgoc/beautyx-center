/* eslint-disable react-refresh/only-export-components */
import { PLAT_FORM } from "app/util";
import { createContext, FC, ReactNode, useState } from "react";

export const SITE = {
  BEAUTYX: PLAT_FORM.BEAUTYX,
  GMUP: PLAT_FORM.GMUP,
} as const;

type RootContextType = {
  rootSite: typeof SITE[keyof typeof SITE];
  setRootSite: React.Dispatch<React.SetStateAction<string>>
};

export const RootContext = createContext<RootContextType>({
  rootSite: SITE.GMUP,
  setRootSite: () => { },
});

export const RootProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [rootSite, setRootSite] = useState(SITE.BEAUTYX);
  const value: RootContextType = {
    rootSite,
    setRootSite
  }
  return (
    <RootContext.Provider value={value}>
      {children}
    </RootContext.Provider>
  )
}