import { request } from 'umi';

export async function queryData() {
  return request('/ecs/all', {
    method: 'POST',
  });
}
