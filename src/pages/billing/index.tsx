import React, { useEffect, useState } from 'react';
import { useModel } from '@@/plugin-model/useModel';
import { connect } from 'umi';
import SearchModule from '@/components/search';
import { Table, Spin } from 'antd';
import { billingModelState } from './model';
import { cloudTypes } from '@/assets/appConfig';

interface HomeProps {
  billing: billingModelState;
  update: (params: any) => any;
  fetchBilling: (params: any) => any;
}

const Billing: React.FC<HomeProps> = (props) => {
  const { setBreadcrumb } = useModel('layout');
  const { billing, update, fetchBilling } = props;
  const { tableData, searchParams, loading } = billing;

  useEffect(() => {
    setBreadcrumb({
      isBack: false,
      title: '费用数据',
    });
    fetchBilling(searchParams);
  }, []);

  // 表格上方的搜索操作配置
  const searchOptConfig = [
    {
      type: 'select',
      attr: {
        placeholder: '云类型',
        style: { width: 180 },
        allowClear: false,
        value: searchParams.provider,
        onChange: (value: number) => searchParamChange(value, 'provider'),
      },
      data: cloudTypes,
    },
    {
      type: 'select',
      attr: {
        placeholder: '计费周期',
        style: { width: 180 },
        allowClear: false,
        value: searchParams.billingCycle,
        onChange: (value: number) => searchParamChange(value, 'billingCycle'),
      },
      data: calcBillingCycleList(6),
    },
  ];

  // Table 的列配置
  const columns: any = [
    {
      title: '账户名',
      dataIndex: 'accountName',
      key: 'accountName',
      align: 'center',
    },
    {
      title: '云类型',
      dataIndex: 'provider',
      key: 'provider',
      align: 'center',
      render: (text: any) => {
        return (
          <div>{cloudTypes.filter((item) => item.value === text)[0].label}</div>
        );
      },
    },
    {
      title: '计费周期',
      dataIndex: 'billingCycle',
      key: 'billingCycle',
      align: 'center',
    },
    {
      title: '费用',
      dataIndex: 'fee',
      key: 'fee',
      align: 'center',
    },
    {
      title: '产品编码',
      dataIndex: 'productCode',
      key: 'productCode',
      align: 'center',
    },
    {
      title: '产品类型',
      dataIndex: 'productType',
      key: 'productType',
      align: 'center',
    },
    {
      title: '区域名称',
      dataIndex: 'regionName',
      key: 'regionName',
      align: 'center',
    },
    {
      title: '实例ID',
      dataIndex: 'instanceId',
      key: 'instanceId',
      align: 'center',
    },
    {
      title: '实例名称',
      dataIndex: 'instanceName',
      key: 'instanceName',
      align: 'center',
    },
    {
      title: '付费方式',
      dataIndex: 'subscriptionType',
      key: 'subscriptionType',
      align: 'center',
    },
  ];

  /**
   * 计算计费周期选择列表
   * @param num {number} 显示的月份数量
   */
  function calcBillingCycleList(num: number) {
    let list = [];
    let date = new Date();
    let y = date.getFullYear();
    let m: any = date.getMonth() + 1;
    let j;
    for (let i = 0; i < num; i++) {
      let newMonth = m - i;
      if (newMonth <= 0) {
        j = 12 + newMonth < 10 ? '0' + (12 + newMonth) : 12 + newMonth + '';
        if (newMonth === 0) {
          --y;
        }
      } else {
        j = m - i;
      }
      let n = j < 10 ? '0' + j : j + '';
      const value = y + '-' + n;
      list.push({
        value: value,
        label: value,
      });
    }
    return list;
  }

  /**
   * 搜索条件修改云类型
   */
  function searchParamChange(value: any, name: string) {
    const params = { ...searchParams, [name]: value };
    update({ searchParams: params });
    fetchBilling(params);
  }

  return (
    <div className={'pageContent'}>
      <Spin spinning={loading} delay={500}>
        <SearchModule searchOptConfig={searchOptConfig}></SearchModule>
        <Table
          rowKey={(record) => record.key}
          dataSource={tableData}
          columns={columns}
          pagination={false}
        />
      </Spin>
    </div>
  );
};

export default connect(
  ({ billing }: any) => ({
    billing,
  }),
  {
    fetchBilling: (params: any) => ({
      type: 'billing/fetchBilling',
      params,
    }),
    update: (params: any) => ({
      type: 'billing/update',
      params,
    }),
  },
)(Billing);
