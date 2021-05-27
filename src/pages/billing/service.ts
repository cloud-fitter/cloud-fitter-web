import { request } from 'umi';

// 查询费用全量 - 根据云类型
export async function queryBilling(params: any) {
  return request('/apis/billing', {
    method: 'POST',
    data: params,
  });
}
