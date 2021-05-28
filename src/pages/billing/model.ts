import { Effect, Reducer } from 'umi';
import { queryBilling } from './service';

function takeMonth() {
  let date = new Date();
  let y = date.getFullYear();
  let m: any = date.getMonth() + 1;
  m = m < 10 ? '0' + m : m + '';
  return y + '-' + m;
}
takeMonth();

interface feSearchParamProps {
  billingCycle?: string;
  provider?: string;
}

export interface billingModelState {
  tableData: any[];
  loading: boolean;
  searchParams: feSearchParamProps;
}

export interface billingModelType {
  namespace: 'billing';
  state: billingModelState;
  effects: {
    update: Effect;
    fetchBilling: Effect;
  };
  reducers: {
    updateStore: Reducer<billingModelState>;
  };
}

const billingModel: billingModelType = {
  namespace: 'billing',
  state: {
    tableData: [],
    loading: false,
    searchParams: {
      billingCycle: takeMonth(),
      provider: 'ali',
    },
  },
  effects: {
    // 更新数据
    *update({ params }, { put }) {
      yield put({
        type: 'updateStore',
        params,
      });
    },
    *fetchBilling({ params }, { call, put }) {
      yield put({
        type: 'updateStore',
        params: { loading: true },
      });
      const { billings } = yield call(queryBilling, params);
      const tableData = billings.map((item: any, index: number) =>
        Object.assign({}, item, { key: index }),
      );
      yield put({
        type: 'updateStore',
        params: {
          tableData,
          loading: false,
        },
      });
    },
  },
  reducers: {
    updateStore(state, { params }) {
      return {
        ...state,
        ...params,
      };
    },
  },
};

export default billingModel;
