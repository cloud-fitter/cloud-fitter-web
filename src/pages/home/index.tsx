import React from 'react';
import { Button } from 'antd';
import { history } from 'umi';
import styles from './index.less';

const Home: React.FC<{}> = () => {
  return (
    <div className={styles.home}>
      <div className={styles.container}>
        <div className={styles.title}>Cloud-Fitter</div>
        <div className={styles.desc}>
          Open Source of Hybrid Cloud Service Interface
        </div>
        <Button
          type={'primary'}
          className={styles.btn}
          size={'large'}
          onClick={() => {
            history.push('/ecs');
          }}
        >
          Quick Start
        </Button>
      </div>
    </div>
  );
};

export default Home;
