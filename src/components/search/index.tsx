import React from 'react';
import { Input, Select, Button, DatePicker } from 'antd';
import styles from './index.less';
const { Search } = Input;
const { RangePicker } = DatePicker;
import { selectRendList } from '@/components/publicFunction';

interface SearchModulePrpos {
  searchOptConfig: object[]; // 搜索操作输入框配置
  searchButtonConfig?: any; // 搜索按钮配置（不展示搜索按钮可以不配置）
  searchConfig?: object; // 搜索模块配置
}
/* 操作模块渲染 start */
const renderOptModule = (searchOptConfig: object[]) => {
  let renderList: any[] = [];
  searchOptConfig.forEach((configRow: any, index: any) => {
    let type: string = configRow.type || 'input';
    let attr: object = configRow.attr || {};
    // let labelAttr: object = configRow.labelAttr || {}; // label配置属性
    if (type === 'input') {
      renderList.push(
        <div className={styles.row3col} key={'search_opt_' + index}>
          <Input {...attr} allowClear />
        </div>,
      );
    } else if (type === 'search') {
      renderList.push(
        <div className={styles.row3col} key={'search_opt_' + index}>
          <Search {...attr} allowClear />
        </div>,
      );
    } else if (type === 'select') {
      let selectDataList: object[] = configRow.data || [];
      let value: string = configRow.value || 'value';
      let label: string = configRow.label || 'label';
      let optionList = selectRendList(selectDataList, value, label);
      renderList.push(
        <div className={styles.row3col} key={'search_opt_' + index}>
          <Select {...attr}>{optionList}</Select>
        </div>,
      );
    } else if (type === 'rangePicker') {
      renderList.push(
        <div className={styles.row3col} key={'search_opt_' + index}>
          <RangePicker {...attr}></RangePicker>
        </div>,
      );
    }
  });
  return renderList;
};
/* 操作模块渲染 end */

/* 按钮模块渲染 start */
const renderButtonModule = (searchButtonConfig: any) => {
  if (searchButtonConfig.hasOwnProperty('isShowSearchButton')) {
    let isShowSearchButton: any =
      searchButtonConfig.isShowSearchButton || false; // 是否展示搜索按钮
    if (isShowSearchButton) {
      // 展示搜索按钮
      return (
        <div className={styles.row3col}>
          {searchButtonConfig.attr ? (
            <Button {...searchButtonConfig.attr}>
              {searchButtonConfig.buttonDesc
                ? searchButtonConfig.buttonDesc
                : '查询'}
            </Button>
          ) : (
            <Button>
              {searchButtonConfig.buttonDesc
                ? searchButtonConfig.buttonDesc
                : '查询'}
            </Button>
          )}
        </div>
      );
    } else {
      // 不展示搜索按钮
      return null;
    }
  } else {
    // 存在搜索配置
    return null;
  }
};
/* 按钮模块渲染 end */
const SearchModule: React.FC<SearchModulePrpos> = (props) => {
  return (
    <div className={styles.searchmodule}>
      {props.searchOptConfig ? renderOptModule(props.searchOptConfig) : null}
      {props.searchButtonConfig
        ? renderButtonModule(props.searchButtonConfig)
        : null}
    </div>
  );
};

export default SearchModule;
