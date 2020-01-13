import React from "react";
import "@patternfly/react-core/dist/styles/base.css";
import {
    Page,
    PageHeader,
    Card,
    CardHeader,
    CardFooter,
    CardBody,
    Alert,
  PageSection,
  Split,
  SplitItem,
  Flex,
  FlexItem,
  FlexModifiers,
  Title
} from '@patternfly/react-core';
import configureStore from "../../redux/store";
import { useSelector } from "react-redux";


const VictimDetail: React.FC = () => {
    const storedState:any = useSelector((state) => state);
    let props = storedState.SearchReducer.name.map.victims.list;

    const logoProps = {
        href: "https://erdemo.io",
        target: "_blank"
    };

    return (
        <Card isHoverable>
      <CardHeader>
            Victim's Details
      </CardHeader>
      <CardBody>
        <Split gutter="md">
          <SplitItem>
            <Flex>
              <Flex breakpointMods={[{ modifier: FlexModifiers.column }]}>
                <FlexItem>Status:</FlexItem>
                <FlexItem>People:</FlexItem>
                <FlexItem>Phone:</FlexItem>
                <FlexItem>Needs First Aid:</FlexItem>
                <FlexItem>Location:</FlexItem>
                <FlexItem>Timestamp:</FlexItem>
              </Flex>
              <Flex breakpointMods={[{ modifier: FlexModifiers.column }]}>
                <FlexItem>
                  {props[0].map.status === "RESCUED"
                    ? "RESCUED, victim is at shelter"
                    : props[0].map.status}
                </FlexItem>
                <FlexItem>{props[0].map.numberOfPeople}</FlexItem>
                <FlexItem>{props[0].map.victimPhoneNumber}</FlexItem>
                <FlexItem>{String(props[0].map.medicalNeeded) ? "YES": "NO"}</FlexItem>
                <FlexItem>Address from map api</FlexItem>
                
                <FlexItem>
                  {new Date(props[0].map.timeStamp).toDateString()}
                </FlexItem>
              </Flex>
            </Flex>
          </SplitItem>
        </Split>
      </CardBody>
    </Card>
    );
}

export default VictimDetail;