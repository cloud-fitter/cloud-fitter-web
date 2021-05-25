import React, { useEffect, useState } from 'react';
import { useModel } from '@@/plugin-model/useModel';
import { connect } from 'umi';
import SearchModule from '@/components/search';
import { Table, Spin } from 'antd';
import { homeModelState } from './model';

const cloudTypes = [
  {
    label: 'ali',
    value: 'ali',
  },
  {
    label: 'tencent',
    value: 'tencent',
  },
  {
    label: 'huawei',
    value: 'huawei',
  },
  {
    label: 'aws',
    value: 'aws',
  },
];

interface HomeProps {
  home: homeModelState;
  update: (params: any) => any;
  fetchAllEcs: (params: any) => any;
}

const Home: React.FC<HomeProps> = (props) => {
  const { setBreadcrumb } = useModel('layout');
  const { home, update, fetchAllEcs } = props;
  const { tableData, searchParams, feSearchParams, loading } = home;
  const [newTableData, setNewTableData] = useState<any>([]);
  console.log(newTableData);

  useEffect(() => {
    setBreadcrumb({
      isBack: false,
      title: '首页',
    });
    fetchAllEcs(searchParams);
  }, []);

  useEffect(() => {
    setNewTableData(tableData);
  }, [tableData]);

  // 表格上方的搜索操作配置
  const searchOptConfig = [
    {
      type: 'select',
      attr: {
        placeholder: '云类型',
        style: { width: 180 },
        allowClear: true,
        value: feSearchParams.cloudType,
        onChange: (value: number) => cloueTypeChange(value),
      },
      data: cloudTypes,
    },
    {
      type: 'search',
      attr: {
        placeholder: '搜索实例ID、实例名称、公网IP',
        maxLength: 200,
        enterButton: '查询',
        style: { width: 360 },
        defaultValue: feSearchParams.queryValue,
        onChange: (e: any) => {
          queryValueChange(e.target.value);
        },
        onSearch: (value: any) => {
          let params = {
            ...feSearchParams,
            queryValue: value,
          };
          update({ feSearchParams: params });
          feSearchFunc(params);
        },
      },
    },
  ];

  // Table 的列配置
  const columns: any = [
    {
      title: '云类型',
      dataIndex: 'provider',
      key: 'provider',
      align: 'center',
    },
    {
      title: '账户名',
      dataIndex: 'accountName',
      key: 'accountName',
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
      title: '实例规格',
      dataIndex: 'instanceType',
      key: 'instanceType',
      align: 'center',
    },
    {
      title: '公网IP',
      dataIndex: 'publicIps',
      key: 'publicIps',
      align: 'center',
      render: (text: any) => {
        return (
          <div>
            {(text || []).map((item: any, i: number) => {
              return <div key={i}>{item}</div>;
            })}
          </div>
        );
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
    },
  ];

  /**
   * 搜索条件关键字输入框修改
   */
  function queryValueChange(value: any) {
    const params = {
      ...feSearchParams,
      queryValue: value,
    };
    update({ feSearchParams: params });
  }

  /**
   * 搜索条件修改云类型
   */
  function cloueTypeChange(cloudType: number) {
    feSearchFunc({ cloudType });
  }

  /**
   * 表格筛选
   */
  function feSearchFunc(params: any) {
    const data = tableData.filter((item: any) => {
      return (
        (!params.cloudType || item.provider === params.cloudType) &&
        (!params.queryValue ||
          item.instanceId.includes(params.queryValue) ||
          item.instanceName.includes(params.queryValue) ||
          item.publicIps.join('').includes(params.queryValue))
      );
    });
    setNewTableData(data);
  }

  return (
    <div className={'pageContent'}>
      <Spin spinning={loading} delay={500}>
        <SearchModule searchOptConfig={searchOptConfig}></SearchModule>
        <Table
          rowKey={(record) => record.key}
          dataSource={newTableData}
          columns={columns}
          pagination={false}
        />
      </Spin>
    </div>
  );
};

export default connect(
  ({ home }: any) => ({
    home,
  }),
  {
    fetchAllEcs: (params: any) => ({
      type: 'home/fetchAllEcs',
      params,
    }),
    update: (params: any) => ({
      type: 'home/update',
      params,
    }),
  },
)(Home);
