import { useRootContext } from "app/hooks";
import { FC, Fragment, ReactNode } from "react";

interface SiteLayoutProps {
  site: string;
  children: ReactNode
}

export const SiteLayout: FC<SiteLayoutProps> = ({ site, children }) => {
  const { rootSite } = useRootContext();
  if (site !== rootSite) return null;
  return (
    <Fragment>
      {children}
    </Fragment>
  )
}