import { Effect, Reducer } from "./model";

export interface ICounterState {
    num: number;
}

export interface CounterModelType {
    namespace: "counter";
    state: ICounterState;
    effects: {
        add: Reducer<ICounterState>;
        dec: Reducer<ICounterState>;
    },
    reducers: {
        addNum: Effect;
    };
}

const Counter: CounterModelType = {
    namespace: 'counter',
    state: { num: 0 },
    effects: {
        * add({ payload }: { payload: number }, { put, select }) {
            console.log("add")
            yield put({ type: 'addNum', payload: payload })
        },
        * dec({ payload }: { payload: number }, { put, select }) {
            yield put({ type: 'addNum', payload: -payload })
        },
    },
    reducers: {
        addNum(state, { payload: num }) {
            return { ...state, num: state.num + num }
        },
    }
}

export default Counter