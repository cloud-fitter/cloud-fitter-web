import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import styles from './index.less';

const PageLoading: React.FC<{}> = () => {
  return (
    <div className={styles.loading}>
      <LoadingOutlined />
    </div>
  );
};

export default PageLoading;
