import React, { useState } from "react";
import "@patternfly/react-core/dist/styles/base.css";
import {
    Form,
    FormGroup,
    TextInput,
    ActionGroup,
    Button,
    Flex, 
    FlexItem, 
    FlexModifiers
} from '@patternfly/react-core';
import "./search.css";
import { useDispatch } from "react-redux";
import { searchAction } from "../../redux/actions/searchAction";

const Search: React.FC = () => {
    const [name, setName] = useState("");

    const handleNameChange = (value: string) => setName(value);
        const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        if (name === "") {
            // Prevent page reload
            e.preventDefault();
        } else {
            getVictimName(name);
            // Prevent page reload
            e.preventDefault();
        }
    }

    // const result: any =  useSelector((state) => state.searchReducers);

    const dispatch = useDispatch();
    const getVictimName = (name: String) => dispatch(searchAction(name));


    return (
        <Form className="form-style" onSubmit={handleSubmit}>
            <Flex breakpointMods={[{ modifier: FlexModifiers.column }]}>
                <Flex>
                    <FlexItem>
                        <FormGroup
                            isRequired={true}
                            fieldId="simple-form-name"
                            helperText="Please provide Victim's full name">
                            <TextInput
                                type="search"
                                isRequired={true}
                                value={name}
                                aria-label="Search by Name"
                                onChange={handleNameChange}
                            />
                        </FormGroup>
                    </FlexItem>
                    <FlexItem><ActionGroup className="action-group-style">
                        <Button variant="primary" type="submit" aria-label="search" isInline={true}>Search</Button>
                    </ActionGroup></FlexItem>
                </Flex>
            </Flex>
        </Form>
    );
}


export default Search;