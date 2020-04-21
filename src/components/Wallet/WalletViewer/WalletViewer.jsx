import React from "react";
import styled from "styled-components";
import Responsive from "components/Common/Responsive";

const TabPanel = props => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
};

const a11yProps = index => {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
};

const AppBar = styled.div`
  width: 500px;
  height: 50px;
  border: 1px solid gray;
`;

const Tabs = styled.div`
  width: 500px;
  height: 50px;
  border: 1px solid gray;
  display: flex;
`;

const Tab = styled.div`
  width: 33.3%;
  height: 50px;
  border: 1px solid green;
  font-size: 1rem;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const SwipeableViews = styled.div`
  width: 500px;
  height: 50px;
  border: 1px solid blue;
`;

const Wrapper = styled(Responsive)``;

const Box = styled.div``;

const WalletViewer = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = index => {
    setValue(index);
  };

  return (
    <Wrapper>
      <div className="root">
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label="Item One" {...a11yProps(0)}>
              Item One
            </Tab>
            <Tab label="Item Two" {...a11yProps(1)}>
              Item Two
            </Tab>
            <Tab label="Item Three" {...a11yProps(2)}>
              Item Three
            </Tab>
          </Tabs>
        </AppBar>
        <SwipeableViews
          // axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          axis="x-reverse"
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          {/* <TabPanel value={value} index={0} dir={theme.direction}> */}
          <TabPanel value={value} index={0}>
            Item One Panel
          </TabPanel>
          <TabPanel value={value} index={1}>
            Item Two Panel
          </TabPanel>
          <TabPanel value={value} index={2}>
            Item Three Panel
          </TabPanel>
        </SwipeableViews>
      </div>
    </Wrapper>
  );
};

export default WalletViewer;
