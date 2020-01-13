import React from "react";
import "@patternfly/react-core/dist/styles/base.css";
import { Page, PageHeader } from '@patternfly/react-core';


const Header: React.FC = () => {
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

    return (

        <Page header={Header} />
    );
}

export default Header;