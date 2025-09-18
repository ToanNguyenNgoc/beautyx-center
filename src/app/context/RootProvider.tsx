/* eslint-disable react-refresh/only-export-components */
import { InitAlert } from "app/components";
import { PLAT_FORM } from "app/util";
import { createContext, FC, ReactNode, useState } from "react";

export const SITE = {
  BEAUTYX: PLAT_FORM.BEAUTYX,
  GMUP: PLAT_FORM.GMUP,
} as const;

type RootContextType = {
  rootSite: typeof SITE[keyof typeof SITE];
  setRootSite: React.Dispatch<React.SetStateAction<string>>;
  onChangeSite: (site: string) => void;
};

export const RootContext = createContext<RootContextType>({
  rootSite: SITE.GMUP,
  setRootSite: () => { },
  onChangeSite: () => { }
});

export const RootProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [rootSite, setRootSite] = useState(localStorage.getItem('site') || SITE.BEAUTYX);
  const onChangeSite = (e: string) => {
    setRootSite(e);
    localStorage.setItem('site', e);
    InitAlert.open({ title: `Switched to site: ${e}`, type: 'success' })
  }
  const value: RootContextType = {
    rootSite,
    setRootSite,
    onChangeSite,
  }
  return (
    <RootContext.Provider value={value}>
      {children}
    </RootContext.Provider>
  )
}