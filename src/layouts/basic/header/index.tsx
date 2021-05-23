import React from 'react';
import { Layout } from 'antd';
import styles from './index.less';

const { Header } = Layout;

const BasicHeader: React.FC<{}> = () => {
  return (
    <Header className={styles.basicHeader}>
      <div className={styles.basicHeaderTitle}>Cloud-Fitter</div>
    </Header>
  );
};

export default BasicHeader;
