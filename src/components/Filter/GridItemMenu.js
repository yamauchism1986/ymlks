import React from "react";
import styled from "styled-components";
import moment from "moment";
import PopoverContent from "./PopoverContent";
import { Popover, PopoverBody } from "reactstrap";
import "bootstrap/dist/css/bootstrap.css";

const Container = styled.div`
  grid-area: item-summary;
`;
const Time = styled.div`
  float: left;
  width: 150px;
  color: #000;
  font-size: 13px;
  font-weight: bold;
`;

const Menu = styled.div`
  float: right;
  margin-right: 7px;
`;
const SvgWrapper = styled.div`
  width: 25px;
  text-align: center;
`;
const GridItemMenu = props => {
  return (
    <Container>
      <Time> {moment(props.time).format("YYYY-MM-DD HH:mm:ss")}</Time>
      <Menu>
        <SvgWrapper
          id={"Popover-" + props.id}
          onClick={props.togglePopup}
          onDoubleClick={e => e.stopPropagation()}
          data-id={props.id}
        >
          <svg
            x="0px"
            y="0px"
            viewBox="0 0 1000 1000"
            width="13px"
            fill="#657786"
          >
            <g>
              <path d="M908.3,214.2L500,622.5L91.7,214.2L10,295.8l408.3,408.3l81.7,81.7l81.7-81.7L990,295.8L908.3,214.2z" />
            </g>
          </svg>
        </SvgWrapper>
        <Popover
          placement="bottom"
          isOpen={props.popoverOpen}
          target={"Popover-" + props.id}
          toggle={props.togglePopup}
        >
          {/* <PopoverHeader>{props.id}</PopoverHeader> */}
          <PopoverBody style={{ padding: "5px 0 5px 0" }}>
            <PopoverContent id={props.id} deleteItem={props.deleteItem} />
          </PopoverBody>
        </Popover>
      </Menu>
    </Container>
  );
};

export default GridItemMenu;
