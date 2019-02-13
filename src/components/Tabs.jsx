import React from 'react';
import {factoryBemClass} from 'factory-bem-class';

import {withState} from 'lib';

import './Tabs.less';

const cn = factoryBemClass('it-tabs');

const TabsView = ({children, activeTab, onChangeActiveTab}) => (
  <div className={cn()}>
    <div className={cn('tabs')}>
      {children.map((child, i) => child &&
        <div
            onClick={() => onChangeActiveTab(i)}
            className={cn('tab', {active: activeTab === i})}
            key={i}>
          {child.props.title}
        </div>
      )}
    </div>
    {children.map((child, i) => child &&
      <div
          className={cn('tab-content', {active: activeTab === i})}
          key={i}>
        {child}
      </div>
    )}
  </div>
);

const Tabs = withState(
  'activeTab',
  'onChangeActiveTab',
  props => props.initialTab || 0
)(TabsView);

export default Tabs;
