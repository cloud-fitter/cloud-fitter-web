import React, { useEffect } from 'react';
import { useModel } from '@@/plugin-model/useModel';
import { connect } from 'umi';
import { Table } from 'antd';
import { homeModelState } from './model';
import styles from './index.less';

interface HomeProps {
  home: homeModelState;
  querying?: boolean;
  fetchAllEcs: (params: any) => any;
}

const Home: React.FC<HomeProps> = (props) => {
  const { setBreadcrumb } = useModel('layout');
  const { home, fetchAllEcs } = props;
  const { tableData, searchParams } = home;

  useEffect(() => {
    setBreadcrumb({
      isBack: false,
      title: '首页',
    });
    fetchAllEcs(searchParams);
  }, []);

  // Table 的列配置
  const columns: any = [
    {
      title: '云类型',
      dataIndex: 'provider',
      key: 'provider',
      align: 'center',
      fixed: 'left',
      filters: [
        {
          text: 'ali',
          value: 'ali',
        },
        {
          text: 'tencent',
          value: 'tencent',
        },
        {
          text: 'huawei',
          value: 'huawei',
        },
        {
          text: 'aws',
          value: 'aws',
        },
      ],
      onFilter: (value: number, record: any) =>
        record.provider.indexOf(value) === 0,
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

  return (
    <div className={'pageContent'}>
      <Table
        rowKey={(record) => record.key}
        dataSource={tableData}
        columns={columns}
        pagination={false}
      />
    </div>
  );
};

export default connect(
  ({ home, loading }: any) => ({
    home,
    querying: loading.effects['home/fetchAllEcs'],
  }),
  {
    fetchAllEcs: (params: any) => ({
      type: 'home/fetchAllEcs',
      params,
    }),
  },
)(Home);
