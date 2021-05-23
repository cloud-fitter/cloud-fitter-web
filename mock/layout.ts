import { Request, Response } from 'express';

const getNotices = {
  resCode: '00000',
  resData: [
    {
      id: 1,
      title: '你有 3 条新消息',
      description: '去消息中心处理',
    },
    {
      id: 2,
      title: '你有 1 台设备报警',
      description: '可至报警管理模块查看报警详情',
    },
  ],
};

export default {
  'get /layout/notices'(req: Request, res: Response) {
    return res.json(getNotices);
  },
};
