import React from "react";
import styled from "styled-components";

const List = styled.ul`
  text-align: left;
  list-style: none;
  padding: 0;
  margin: 0;
  width: 270px;
`;
const ItemDelete = styled.li`
  border-bottom: solid #e3f3f7 1px;
  margin: 0;
  padding: 3px 3px 3px 12px;
  user-select: none;
  cursor: default;
  &:hover {
    background-color: #1c2766;
    color: white;
  }
`;

const Description = styled.span`
  display: inline-block;
  width: 100px;
`;
const DescriptionHotKey = styled.span`
  font-size: 10px;
  margin-left: 10px;
  padding: 0 5px 0 5px;
  color: white;
  background-color: #999;
  border-radius: 3px;
`;

const DescriptionHotKey2 = styled.span`
  font-size: 10px;
  padding: 0 5px 0 5px;
  color: white;
  background-color: #999;
  border-radius: 3px;
`;

const PopoverContent = props => {
  return (
    <List>
      <ItemDelete>
        <Description>Add to new list</Description>
        <DescriptionHotKey>Ctrl</DescriptionHotKey>+
        <DescriptionHotKey2>N</DescriptionHotKey2>
      </ItemDelete>
      <ItemDelete data-id={props.id} onClick={props.deleteItem}>
        <Description>Delete item</Description>
        <DescriptionHotKey>Delete</DescriptionHotKey>
      </ItemDelete>
      <ItemDelete>b </ItemDelete>
    </List>
  );
};

export default PopoverContent;
