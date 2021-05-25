import React from 'react';
import { Select } from 'antd';
const { Option } = Select;

/* 下拉框数据渲染 start */
export function selectRendList(data: object[], valueName: any, labelName: any) {
  let selectRendList: any = [];
  data.forEach((province: any) => {
    selectRendList.push(
      <Option
        key={name + '' + province[valueName]}
        value={province[valueName]}
        label={province[labelName]}
      >
        {province[labelName]}
      </Option>,
    );
  });
  return selectRendList;
}

export function initValidator(rule: any, value: any, callback: any) {
  let max = 2 * Math.pow(10, 32) - 1;
  if (value > max) {
    callback('超过最大');
  }
  callback();
}
export function longValidator(rule: any, value: any, callback: any) {
  let max = 2 * Math.pow(10, 64) - 1;
  if (value > max) {
    callback('超过最大');
  }
  callback();
}
export function doubleValidator(rule: any, value: any, callback: any) {
  let max = 1.79 * Math.pow(10, 308);
  if (value < -max) {
    callback('超过最小值');
  }
  if (value > max) {
    callback('超过最大值');
  }
  callback();
}
export function floatValidator(rule: any, value: any, callback: any) {
  let max = 3.14 * Math.pow(10, 38);
  if (value < -max) {
    callback('超过最小值');
  }
  if (value > max) {
    callback('超过最大值');
  }
  callback();
}
