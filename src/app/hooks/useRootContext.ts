import { RootContext, SITE } from "app/context";
import { useContext } from "react";

export function useRootContext() {
  const value = useContext(RootContext);
  return Object.assign(value, {
    sites: Object.values(SITE),
    isBeautyxSite: value.rootSite == SITE.BEAUTYX,
    isGmupSite: value.rootSite == SITE.GMUP,
  })
}