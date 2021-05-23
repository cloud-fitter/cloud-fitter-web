import React from 'react';
import { Layout } from 'antd';
import BasicHeader from './header/index';
import BasicMenu from './menu/index';
import BasicBreadcrumb from './breadcrumb/index';
import styles from './index.less';

const { Header, Content } = Layout;

interface BasicLayoutProps {
  location: any;
}

const BasicLayout: React.FC<BasicLayoutProps> = (props) => {
  return (
    <Layout className={styles.basicLayout}>
      <BasicHeader />
      <Layout className={styles.basicContent}>
        <BasicMenu path={props.location.pathname} />
        <Layout className={styles.basicContentBody}>
          <Header className={styles.basicBreadcrumb}>
            <BasicBreadcrumb />
          </Header>
          <Content className={styles.basicContentInner}>
            {props.children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default BasicLayout;
