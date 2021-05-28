import { RequestConfig } from 'umi';
import { errorHandler } from '@/utils/errorHandle';

export const request: RequestConfig = {
  timeout: 60000,
  // errorConfig: {
  //   adaptor: (res) => {
  //     return {
  //       success: res,
  //       data: res,
  //       errorCode: res,
  //       errorMessage: res,
  //     };
  //   },
  // },
  errorHandler,
  middlewares: [],
  requestInterceptors: [],
  responseInterceptors: [
    (response) => {
      return response;
    },
  ],
};
