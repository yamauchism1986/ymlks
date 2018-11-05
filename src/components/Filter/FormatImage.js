import React from "react";
import styled from "styled-components";

const TextWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: #8da5a0
  border-radius: 400px;
`;
const ExcelWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: #6b9c70;
  border-radius: 400px;
`;
const FileWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: #c49e8b;
  border-radius: 400px;
`;
const ImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: #b7a7c8;
  border-radius: 400px;
`;

const FormatImage = props => {
  switch (props.format) {
    case "TEXT":
      return (
        <TextWrapper>
          <svg
            className="svg-icon"
            x="0px"
            y="0px"
            width="27px"
            fill="white"
            viewBox="0 0 1000 1000"
          >
            <g>
              <path d="M591.9,285.8V71.4H193.8v367.5h612.5V285.8H591.9z" />
              <path d="M806.3,255.2H622.5V71.4L806.3,255.2z" />
              <path d="M10,499.8v428.7h980V499.8H10z M331.9,648h-78.3v205H197V648h-78.3v-52.2h213.1V648z M542.2,853l-57.7-88.2L426.4,853h-64.3l89.7-130.8l-86-126.4H432l54,83.4l54.4-83.4h64.3l-86,125.7L608.4,853L542.2,853L542.2,853z M851.7,648h-78.2v205h-56.6V648h-78.3v-52.2h213.1V648z" />
            </g>
          </svg>
        </TextWrapper>
      );
    case "EXCEL":
      return (
        <ExcelWrapper>
          <svg
            className="svg-icon"
            x="0px"
            y="0px"
            width="27px"
            fill="white"
            viewBox="0 0 1000 1000"
          >
            <g>
              <path d="M569.3,149.8V79.3L10,152.7v696l559.3,71.9v-71.6H990v-69.7v-0.1v-140v-69.8V429.3v-69.8V219.2v-5.5v-63.9L569.3,149.8L569.3,149.8z M392.2,650.1h-71.8l-50.1-116.8L217,650.1h-66.8l87.2-154.8L163.6,343H232l44.6,102.6L315.5,343h76.8l-81.8,146.9L392.2,650.1z M709.9,779.3H569.3v-140h140.6L709.9,779.3L709.9,779.3z M709.9,569.5H569.3V429.3h140.6L709.9,569.5L709.9,569.5z M709.9,359.6H569.3V219.2h140.6L709.9,359.6L709.9,359.6z M920.4,779.3H779.5v-140h140.9V779.3z M920.4,569.5H779.5V429.3h140.9V569.5z M920.4,359.6H779.5V219.2h140.9V359.6z" />
            </g>
          </svg>
        </ExcelWrapper>
      );
    case "FILE":
      return (
        <FileWrapper>
          <svg
            className="svg-icon"
            x="0px"
            y="0px"
            width="27px"
            fill="white"
            viewBox="0 0 1000 1000"
          >
            <g>
              <path d="M887.6,357.9V134.6c0-13.3-10.8-24.1-24.1-24.1h-226c-10.1,0-19.2,6.3-22.7,15.9l-18.2,50.2H34.1c-6.4,0-12.5,2.5-17,7.1c-4.5,4.5-7.1,10.6-7.1,17l0.2,665c0,12,8.9,21.9,20.5,23.7l808.7,0.2L990,357.9L887.6,357.9L887.6,357.9z M839.3,357.9H180.9L58.4,791.2l-0.2-566.5h555.2c10.1,0,19.2-6.3,22.7-15.9l18.2-50.2h185V357.9L839.3,357.9z" />
            </g>
          </svg>
        </FileWrapper>
      );
    case "IMAGE":
      return (
        <ImageWrapper>
          <svg
            className="svg-icon"
            x="0px"
            y="0px"
            width="27px"
            fill="white"
            viewBox="0 0 1000 1000"
          >
            <g transform="matrix(1 0 0 -1 0 1008)">
              <path d="M10,875.5h980v-735H10V875.5z M867.5,263v91.9L714.4,508l-91.9-91.9L346.9,691.8L132.5,477.4V263H867.5z M775.6,569.3c25.5,0,47.2,8.9,65.1,26.8c17.9,17.9,26.8,39.6,26.8,65.1s-8.9,47.2-26.8,65.1S801.1,753,775.6,753s-47.2-8.9-65.1-26.8s-26.8-39.6-26.8-65.1s8.9-47.2,26.8-65.1C728.4,578.2,750.1,569.3,775.6,569.3z" />
            </g>
          </svg>
        </ImageWrapper>
      );
    default:
      return null;
  }
};

export default FormatImage;
