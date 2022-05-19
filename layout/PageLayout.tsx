import { AppShell } from "@mantine/core";
import { ReactElement } from "react";

const PageLayout = ({ children }: { children: ReactElement }) => {
  return <AppShell>{children}</AppShell>;
};

export default PageLayout;
