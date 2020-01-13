import React, { useState } from "react";
import "@patternfly/react-core/dist/styles/base.css";
import { Page, PageHeader, Flex, FlexItem } from "@patternfly/react-core";
import Map from "./components/map/map";
import Header from "./components/header/header";
import Search from "./components/search/search"
import VictimDetail from "./components/victim-details/victim-details";
import configureStore from "./redux/store";
import { useSelector } from "react-redux";


const App: React.FC = () => {
    // const [victimList, setVictimList] = useState();
    let noDataFound: Boolean = false;
    let initialDisplay: Boolean = true;

    const storedState:any = useSelector((state) => state);

    if(storedState.SearchReducer.name == "VICTIM_NAME"){
        console.log(storedState.name);
        initialDisplay = true;
    }else if(storedState.SearchReducer.name.map.victims.list.length != 0){
        noDataFound = true;
        initialDisplay = false;

    }else {
        noDataFound = false;
        initialDisplay = false;
    }

    return (
        <div>
            <Header />
            <Search />
            {
    !initialDisplay ? 
                noDataFound ? 
				<Flex className="search-bar-center">
						<FlexItem>
							<Map />
						</FlexItem>
						<FlexItem>
							<VictimDetail />
						</FlexItem>
				</Flex> : 
				<Flex>
                        {/* Exxecute the below code if the data is empty / For NO DATA response */}
                        <div>No Data. Please check Victim's name and try again!</div>
                    </Flex>
            : null 
}
        </div>
    );
};

export default App;
