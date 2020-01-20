import React from "react";
import "@patternfly/react-core/dist/styles/base.css";
import { Flex, FlexItem } from "@patternfly/react-core";
import { Card, CardBody } from '@patternfly/react-core';
import { useSelector } from "react-redux";
import VictimDetail from "../victim-details/victim-details";
import Map from "../map/map";


const SearchResult: React.FC = () => {

    let noDataFound: Boolean = false;
    let initialDisplay: Boolean = true;
    let showMap: Boolean = false;

    const storedState: any = useSelector((state) => state);
    let props = storedState.SearchReducer.name;


    if (storedState.SearchReducer.name === "VICTIM_NAME") {
        initialDisplay = true;
    } else if (Object.keys(storedState.SearchReducer.name).length === 0) {
        // No data display
        noDataFound = false;
        initialDisplay = false;
    } else if (props.name !== undefined && props.status === "ASSIGNED") {
        // To stop re-rendering Map Component once the shelter name is retrived from API.
        showMap = true;
        noDataFound = true;
        initialDisplay = false;
    } else if (props.status === "REPORTED") {
        // To Show map for status REPORTED
        showMap = true;
        noDataFound = true;
        initialDisplay = false;
    } else {
        noDataFound = true;
        initialDisplay = false;
    }

    return (
        <div>
            {
                !initialDisplay ?
                    noDataFound ?
                        <Card isHoverable>
                            <CardBody>
                                <Flex className="search-bar-center">
                                    <FlexItem>
                                        {showMap ? <Map /> : null}
                                    </FlexItem>
                                    <FlexItem>
                                        <VictimDetail />
                                    </FlexItem>
                                </Flex>
                            </CardBody>
                        </Card>

                        :
                        <Flex>
                            {/* Exxecute the below code if the data is empty / For NO DATA response */}
                            <div>No Data. Please check Victim's name and try again!</div>
                        </Flex>
                    : null
            }
        </div>
    );
}


export default SearchResult;