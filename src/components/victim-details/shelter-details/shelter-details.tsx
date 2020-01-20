import React from "react";
import "@patternfly/react-core/dist/styles/base.css";
import { Page, PageHeader } from "@patternfly/react-core";

const ShelterDetail: React.FC = () => {
  const logoProps = {
    href: "https://erdemo.io",
    target: "_blank"
  };

  return (
    <PageHeader
      logo="Find My Relative"
      logoProps={logoProps}
      toolbar="Toolbar"
      avatar=" | Avatar"
    />
  );
};

export default ShelterDetail;
