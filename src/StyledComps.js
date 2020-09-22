// import React from 'react';
import styled from 'styled-components';

export const HeaderDiv = styled.div`
  background-color: ${props => props.theme.bgColorHeadFoot};
`;

export const CardButton = styled.button`
  background-color: ${props => props.theme.body};
`;

export const CardBody = styled.div`
  background-color: ${props => props.theme.bgCard};
`;

export const BackgroundBody = styled.div`
  background-image: url(${props => props.theme.backgroundImage});

  p {
    background-color: ${props => props.theme.bgTextImg};
  }
`;

export const ShLikBtn = styled.button`
  background-color: ${props => props.theme.iconBg};
  border-radius: 50%;
  margin-right: 1vw;
  height: 40px;
  text-align: center;
  width: 40px;
`;

export const BgList = styled.div`
  background-color: ${props => props.theme.bgCard};
`;