import React from 'react';
import { Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import styles from './index.less';
import { useModel } from 'umi';

const Breadcrumb: React.FC<{}> = () => {
  const { breadcrumb } = useModel('layout');

  function goBack() {
    history.back();
  }

  return (
    <div className={styles.basicBreadcrumb}>
      {breadcrumb.isBack && (
        <Button className={styles.back} onClick={goBack}>
          <ArrowLeftOutlined />
        </Button>
      )}
      {breadcrumb.title}
    </div>
  );
};

export default Breadcrumb;
