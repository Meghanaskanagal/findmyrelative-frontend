import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "@patternfly/react-core/dist/styles/base.css";
import { Page, PageHeader } from "@patternfly/react-core";

import SearchData from "./types";
import SearchForm from "./Search";
import DisplayList from "./Display";

import Homepage from "./Homepage";

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

const OldApplication: React.FC = () => {
  const [victimList, setVictimList] = useState([]);
  const [isDataReady, setIsDataReady] = useState(true);
  const [isResponseOk, setIsResponseOk] = useState(true);

  const fetchDetails = async (data: SearchData) => {
    setIsDataReady(false);
    console.log(
      "sending request to: ",
      process.env.REACT_APP_BACKEND_URL + `/find/victim/byName/${data.name}`
    );
    const response = await fetch(
      process.env.REACT_APP_BACKEND_URL + `/find/victim/byName/${data.name}`
    );

    if (response.ok) {
      const result = await response.json();
      setVictimList(result.map.victims.list);
      setIsResponseOk(true);
    } else if (response.status === 503) {
      setVictimList([]);
      setIsResponseOk(false);
      console.log("service unavailable.");
    }
    setIsDataReady(true);
  };

  return (
    <Page header={Header}>
      <SearchForm onFormSubmit={fetchDetails}></SearchForm>
      <DisplayList
        responseOk={isResponseOk}
        isReady={isDataReady}
        dataArray={victimList}
      ></DisplayList>
    </Page>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" component={OldApplication} exact />
        <Route path="/newfindmyrelative" component={Homepage} />
      </Switch>
    </Router>
  );
};

export default App;
