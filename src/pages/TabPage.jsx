import React from "react";
import Tabs from "components/Common/Tabs";

const Content1 = () => <div>this is Content1</div>;
const Content2 = () => <div>this is Content2</div>;

export default () => (
  <div>
    <Tabs
      leftTabTitle="Left title"
      rightTabTitle="Right title"
      leftContent={<Content1 />}
      rightContent={<Content2 />}
    />
  </div>
);
