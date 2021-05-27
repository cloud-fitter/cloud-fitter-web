import { Effect, Reducer } from 'umi';
import { queryBilling } from './service';
takeMonth();

function takeMonth() {
  let date = new Date();
  let y = date.getFullYear();
  let m: any = date.getMonth() + 1;
  m = m < 10 ? '0' + m : m + '';
  return y + '-' + m;
}

interface feSearchParamProps {
  billingCycle?: string;
  provider?: string;
}

export interface homeModelState {
  tableData: any[];
  loading: boolean;
  searchParams: feSearchParamProps;
}

export interface homeModelType {
  namespace: 'billing';
  state: homeModelState;
  effects: {
    update: Effect;
    fetchBilling: Effect;
  };
  reducers: {
    updateStore: Reducer<homeModelState>;
  };
}

const homeModel: homeModelType = {
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
      const { ecses } = yield call(queryBilling, params);
      const tableData = ecses.map((item: any, index: number) =>
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

export default homeModel;
