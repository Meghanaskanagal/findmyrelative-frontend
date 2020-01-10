import React from "react";

import "@patternfly/react-core/dist/styles/base.css";
import { Page, PageHeader } from "@patternfly/react-core";

const logoProps = {
  href: "https://erdemo.io",
  target: "_blank"
};

const Header = (
  <PageHeader
    logo="Find My Relative"
    logoProps={logoProps}
    toolbar="Toolbar"
    avatar=" | Avatar"
  />
);

const Homepage: React.FC = () => {
  return <Page header={Header}></Page>;
};

export default Homepage;
