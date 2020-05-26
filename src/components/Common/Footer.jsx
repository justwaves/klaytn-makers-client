import React from 'react';
import styled from 'styled-components';
import Responsive from './Responsive';

const ResponsiveWrapper = styled(Responsive)`
  padding-top: 2.25rem;
  padding-bottom: 2.25rem;
  margin-top: 3rem;

  width: 100%;
  height: 8rem;
  background-color: ${props => props.theme.color.gray[0]};
  color: ${props => props.theme.color.primary[3]};

  @media (max-width: 816px) {
    display: none;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-transform: uppercase;
  font-weight: 400;
  font-size: 0.75rem;
  max-width: 1200px;
  margin: 0 auto;
  height: 100%;
`;

const List = styled.ul`
  display: flex;
`;

const ListItem = styled.li`
  &:not(:last-child) {
    margin-right: 1rem;
  }
`;

const Anchor = styled.a`
  color: ${props => props.theme.darkBlueColor};
`;

const Copyright = styled.span`
  color: ${props => props.theme.darkGreyColor};
`;
const Footer = () => (
  <ResponsiveWrapper>
    <Container>
      <List>
        <ListItem>
          <Anchor href="#">about us</Anchor>
        </ListItem>
        <ListItem>
          <Anchor href="#">support</Anchor>
        </ListItem>
        <ListItem>
          <Anchor href="#">press</Anchor>
        </ListItem>
        <ListItem>
          <Anchor href="#">api</Anchor>
        </ListItem>
        <ListItem>
          <Anchor href="#">jobs</Anchor>
        </ListItem>
        <ListItem>
          <Anchor href="#">privacy</Anchor>
        </ListItem>
        <ListItem>
          <Anchor href="#">terms</Anchor>
        </ListItem>
      </List>
      <Copyright>KLAYTN MAKERS {new Date().getFullYear()} &copy;</Copyright>
    </Container>
  </ResponsiveWrapper>
);

export default Footer;
