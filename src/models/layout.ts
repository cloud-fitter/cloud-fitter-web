import { useState } from 'react';
// import { useRequest } from 'umi';
// import { queryData } from '@/services/layout';

export default () => {
  const [breadcrumb, setBreadcrumb] = useState({
    isBack: false,
    title: '',
  });

  return {
    breadcrumb,
    setBreadcrumb,
  };
};
