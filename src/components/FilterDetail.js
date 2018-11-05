import React from "react";
import styled from "styled-components";
import "semantic-ui-css/semantic.min.css";
import {
  Header,
  Button,
  Checkbox,
  Form,
  Input,
  Select,
  Divider,
  Dropdown
} from "semantic-ui-react";
import { DebounceInput } from "react-debounce-input";

const Wrapper = styled.div`
  padding: 30px;
`;
const options = [
  { key: "t", text: "Time", value: "time" },
  { key: "k", text: "KeyWord", value: "textSummary" },
  { key: "c", text: "Type", value: "mainFormat" }
];
const DataTypeList = [
  { key: "t", text: "Text", value: "text" },
  { key: "i", text: "Image", value: "image" },
  { key: "f", text: "File", value: "file" },
  { key: "e", text: "Excel", value: "excel" }
];

const editSortOptions = item => {
  const options = [
    { key: item + "t", text: "Time", value: "time" },
    { key: item + "k", text: "KeyWord", value: "textSummary" },
    { key: item + "c", text: "Type", value: "mainFormat" }
  ];
  return options;
};

const editDataTypeOptions = item => {
  const options = [
    { key: item + "t", text: "Text", value: "text" },
    { key: item + "i", text: "Image", value: "image" },
    { key: item + "f", text: "File", value: "file" },
    { key: item + "e", text: "Excel", value: "excel" }
  ];
  return options;
};

const editSourceAppOptions = (item, options) => {
  const newOptions = [];
  options.forEach(v => {
    const option = {};
    option.key = item + v.key;
    option.text = v.text;
    option.value = v.value;
    newOptions.push(option);
  });
  return newOptions;
};
function getOrderLabel(order) {
  const label = order === false ? "Descending" : "Ascending";
  return label;
}

const FilterDetail = props => {
  return (
    <Wrapper>
      <Form size="tiny">
        <Header as="h3">Sort Options</Header>
        <Form.Group widths="equal">
          <Form.Field>
            <Form.Select
              id={props.item + "SortKey"}
              item={props.item}
              className={props.item}
              onChange={props.updateFilter}
              fluid
              label="Sort Key"
              options={editSortOptions(props.item)}
              // options={options}
              placeholder=""
              defaultValue={props.filter.sortBy}
            />
          </Form.Field>
          <Form.Field>
            <label>Order</label>
            <Checkbox
              id={props.item + "Order"}
              item={props.item}
              className={props.item}
              onChange={props.updateFilter}
              toggle
              checked={props.filter.order}
              label={getOrderLabel(props.filter.order)}
            />
            {/* <input placeholder="First Name" /> */}
          </Form.Field>
        </Form.Group>
        <Divider> </Divider>
        <Header as="h3">Filter Options</Header>
        <Form.Field>
          <label>Type</label>
          <Button
            compact
            size="tiny"
            item={props.item}
            className={props.item}
            id={props.item + "TypeText"}
            toggle
            onClick={props.updateFilter}
            active={props.filter.fileType.text}
          >
            Text
          </Button>
          <Button
            compact
            size="tiny"
            item={props.item}
            className={props.item}
            id={props.item + "TypeImage"}
            toggle
            onClick={props.updateFilter}
            active={props.filter.fileType.image}
          >
            Image
          </Button>
          <Button
            compact
            size="tiny"
            item={props.item}
            className={props.item}
            id={props.item + "TypeFile"}
            toggle
            onClick={props.updateFilter}
            active={props.filter.fileType.file}
          >
            File
          </Button>
          <Button
            compact
            size="tiny"
            item={props.item}
            className={props.item}
            id={props.item + "TypeExcel"}
            toggle
            onClick={props.updateFilter}
            active={props.filter.fileType.excel}
          >
            Excel
          </Button>
        </Form.Field>
        <Form.Group widths="equal">
          <Form.Field>
            <label>Keyword(Includes)</label>
            <DebounceInput
              className={props.item}
              id={props.item + "KeywordsIncludes"}
              onChange={props.updateFilter}
              // onChange={e => console.log(e.target.value)}
              minLength={0}
              debounceTimeout={600}
              value={props.filter.keywordsIncludes}
            />
          </Form.Field>
          <Form.Field>
            <label>Keyword(Excludes)</label>
            <DebounceInput
              className={props.item}
              item={props.item}
              id={props.item + "KeywordsExcludes"}
              onChange={props.updateFilter}
              minLength={1}
              debounceTimeout={600}
              value={props.filter.keywordsExcludes}
            />
          </Form.Field>
        </Form.Group>
        <Form.Field>
          <label>Source App</label>
          <Dropdown
            item={props.item}
            id={props.item + "SourceApp"}
            clearable
            fluid
            multiple
            search
            selection
            options={editSourceAppOptions(props.item, props.sourceAppOption)}
            onChange={props.updateFilter}
            defaultValue={props.filter.apps}
          />
        </Form.Field>
        <Form.Field>
          <label>Tag</label>
          <Dropdown
            item={props.item}
            id={props.item + "Tag"}
            clearable
            fluid
            multiple
            search
            selection
            options={editDataTypeOptions(props.item)}
            onChange={props.updateFilter}
          />
        </Form.Field>
        <Form.Field>
          <label>Hotkey</label>
          <Checkbox toggle label="Unregistered" />
          {/* <input placeholder="First Name" /> */}
        </Form.Field>
        <Divider> </Divider>
        <Header as="h3">Save Options</Header>
        <Form.Field>
          <label>F/S Name</label>
          <Input maxLength="20" />
        </Form.Field>
        <Form.Field>
          <Button compact size="tiny" id="SaveFilterSort" toggle>
            Save to F/S list
          </Button>
        </Form.Field>
      </Form>
    </Wrapper>
  );
};

export default FilterDetail;
