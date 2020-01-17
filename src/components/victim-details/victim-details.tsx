import React from "react";
import "@patternfly/react-core/dist/styles/base.css";
import {
  Card,
  CardHeader,
  CardBody,
  Split,
  SplitItem,
  Flex,
  FlexItem,
  FlexModifiers,
} from '@patternfly/react-core';
import { useSelector } from "react-redux";
import ShelterDetail from "./shelter-details/shelter-details";


const VictimDetail: React.FC = () => {
  let props = [];
  const storedState: any = useSelector((state) => state);
  if (Object.keys(storedState.SearchReducer.name).length === 0) {
    props = [];
  } else {
    props = storedState.SearchReducer.name;
  }

  let status = {
    assigned: "ASSIGNED",
    reported: "REPORTED",
    rescued: "RESCUED"
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
                {props.status === status.reported ||
                  props.status === status.assigned ? (
                    <FlexItem>Neighboring Location:</FlexItem>
                  ) : null}
                {props.status !== status.reported ? (
                  <FlexItem>Shelter:</FlexItem>
                ) : null}
                <FlexItem>Timestamp:</FlexItem>
              </Flex>
              <Flex breakpointMods={[{ modifier: FlexModifiers.column }]}>
                <FlexItem>
                  {props.status === "RESCUED"
                    ? "RESCUED, victim is at shelter"
                    : props.status}
                </FlexItem>
                <FlexItem>{props.numberOfPeople}</FlexItem>
                <FlexItem>{props.victimPhoneNumber}</FlexItem>
                <FlexItem>{String(props.medicalNeeded) ? "YES" : "NO"}</FlexItem>
                <FlexItem>{props.features[0].place_name}</FlexItem>
                <FlexItem>{props.features[1].place_name}</FlexItem>
                {props.status !== status.reported ? (
                  <ShelterDetail />
                ) : null}
                <FlexItem>
                  {new Date(props.timeStamp).toDateString()}
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