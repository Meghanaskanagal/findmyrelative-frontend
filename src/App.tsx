import React from "react";
import "@patternfly/react-core/dist/styles/base.css";
import Header from "./components/header/header";
import Search from "./components/search/search"
import SearchResult from "./components/searchResult/searchResult";


const App: React.FC = () => {
    // const [victimList, setVictimList] = useState();

    return (
        <div>
            <Header />
            <Search />
            <SearchResult />
        </div>
    );
};

export default App;
