import { request } from 'umi';

// 查询所有云的ECS
export async function queryAllEcs() {
  return request('/apis/ecs/all', {
    method: 'POST',
  });
}
