import React, { useState } from "react";
import styled from "styled-components";

interface TabProps {
  title: string;
  children: React.ReactNode;
}

const Tab = ({ children }: TabProps) => {
  return <>{children}</>;
};

interface TabsProps {
  children: React.ReactNode;
}

const Tabs = ({ children }: TabsProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabs = React.Children.toArray(
    children
  ) as React.ReactElement<TabProps>[];

  return (
    <TabsStyle>
      <div className="tab-header">
        {tabs.map((tab, i) => (
          <button
            onClick={() => setActiveIndex(i)}
            className={activeIndex === i ? "active" : ""}
            key={i}
          >
            {tab.props.title}
          </button>
        ))}
      </div>
      <div className="tab-content">{tabs[activeIndex]}</div>
    </TabsStyle>
  );
};

const TabsStyle = styled.div`
  .tab-header {
    display: flex;
    gap: 2px;
    border-bottom: 1px solid #ddd;

    button {
      border: none;
      background: #ddd;
      cursor: pointer;
      font-size: 1.25rem;
      font-weight: bold;
      color: ${({ theme }) => theme.color.text};
      border-radius: ${({ theme }) => theme.borderRadius.default}
        ${({ theme }) => theme.borderRadius.default} 0 0;
      padding: 12px 24px;

      &.active {
        color: #fff;
        background: ${({ theme }) => theme.color.primary};
      }
    }
  }

  .tab-content {
    padding: 24px 0;
  }
`;

export { Tabs, Tab };
