import React from "react";
import { Container } from "@mantine/core";
type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return <Container>{children}</Container>;
};

export default Layout;
