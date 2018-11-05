import React from "react";
import styled from "styled-components";
import { Popover, PopoverBody } from "reactstrap";
import "bootstrap/dist/css/bootstrap.css";

const Wrapper = styled.div`
  grid-area: filter;
  overflow-y: scroll;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-rows: 20px 1fr;
  grid-template-columns: 60px 1fr;
  grid-template-areas:
    "img title"
    "img detail";
  user-select: none;
  cursor: default;
  &:hover {
    background-color: #f3f3f7;
  }
`;

const Img = styled.div`
  padding: 5px 0 5px 0;
  grid-area: img;
  text-align: center;
`;
const ImgWrapper1 = styled.div`
  height: 40px;
  width: 40px;
  margin-left: 10px;
`;

const ImgWrapper2 = styled.div`
  width: 100%;
  height: 100%;
  background-color: #92c3cc;
  border-radius: 400px;
`;

const Title = styled.div`
  grid-area: title;
`;

const FilterName = styled.div`
  padding-top: 3px;
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
const MenuSvgWrapper = styled.div`
  width: 25px;
  text-align: center;
`;
const Detail = styled.div`
  grid-area: detail;
`;

const DetailWrapper = styled.div`
  padding-top: 3px;
  display: -webkit-box;
  overflow: hidden;
  word-break: break-word;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  font-size: 14px;
  line-height: 20px;
  font-weight: normal;
`;
const GridPageHeaderLeft = props => {
  if (!props.filter) {
    return null;
  } else {
    return (
      <Wrapper
        data-id={props.filter._id}
        data-detailtype="filter"
        onClick={props.showDetail}
      >
        <GridContainer tabIndex="0">
          <Img>
            <ImgWrapper1>
              <ImgWrapper2>
                <svg
                  className="svg-icon"
                  x="0px"
                  y="0px"
                  width="27px"
                  fill="white"
                  viewBox="0 0 1000 1000"
                >
                  <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)">
                    <path d="M4109.7,5001.8c-447.9-24.9-796.4-55.5-1206-105.3C1265,4689.8,304.1,4270.6,129.9,3681c-34.5-116.8-40.2-283.3-11.5-384.8c13.4-45.9,603-796.3,1837.7-2335.4l1818.6-2266.5v-1475.9v-1474l53.6-105.3c90-180,296.7-298.7,658.5-375.2c199.1-42.1,779.1-47.9,982.1-9.6c344.6,65.1,585.8,189.5,689.1,356.1l57.4,93.8l5.7,1495.1l5.7,1495.1L8043.6,962.7c1225.2,1525.7,1824.3,2289.5,1837.7,2335.4c44,158.9,7.7,407.7-82.3,555.1c-105.3,174.2-354.2,380.9-616.4,511.1c-618.3,310.1-1577.4,511.1-2967.2,620.2C5880.4,5009.5,4490.6,5021,4109.7,5001.8z M6253.7,4370.1c1904.7-139.7,3093.5-490.1,3028.4-894c-34.5-210.6-377.1-398.2-1018.4-557.1c-2287.6-570.5-6703.9-338.8-7442.8,390.5c-321.6,315.9,130.2,627.9,1230.9,849.9c591.5,118.7,1173.5,181.9,2201.4,237.4C4490.6,4410.3,5985.7,4391.2,6253.7,4370.1z" />
                  </g>
                </svg>
              </ImgWrapper2>
            </ImgWrapper1>
          </Img>
          <Title>
            <FilterName>Default S/F</FilterName>
            <Menu>
              <MenuSvgWrapper
                id="Popover-Filter"
                // onClick={props.togglePopup}
                onDoubleClick={e => e.stopPropagation()}
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
              </MenuSvgWrapper>
              <Popover
                placement="bottom"
                // isOpen={props.popoverOpen}
                target="Popover-Filter"
                // toggle={props.togglePopup}
              >
                <PopoverBody style={{ padding: "5px 0 5px 0" }}>
                  {/* <PopoverContent id={props.id} deleteItem={props.deleteItem} /> */}
                </PopoverBody>
              </Popover>
            </Menu>
          </Title>
          <Detail>
            <DetailWrapper>
              SORT BY : time(Asc)
              <br />
              {"　"}
            </DetailWrapper>
          </Detail>
        </GridContainer>
      </Wrapper>
    );
  }
};

export default GridPageHeaderLeft;
