import { Effect, Reducer } from 'umi';
import { queryAllEcs } from './service';

interface searchParamProps {
  current: number;
  size: number;
}

export interface homeModelState {
  tableData: any[];
  loading: boolean;
  searchParams: searchParamProps;
}

export interface homeModelType {
  namespace: 'home';
  state: homeModelState;
  effects: {
    fetchAllEcs: Effect;
  };
  reducers: {
    updateStore: Reducer<homeModelState>;
  };
}

const homeModel: homeModelType = {
  namespace: 'home',
  state: {
    tableData: [],
    loading: false,
    searchParams: {
      current: 1,
      size: 999,
    },
  },
  effects: {
    *fetchAllEcs(params: any, { call, put }) {
      yield put({
        type: 'updateStore',
        params: { loading: true },
      });
      const { ecses } = yield call(queryAllEcs, params);
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
