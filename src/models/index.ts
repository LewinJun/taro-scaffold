import user, { UserState } from './user'
import counter, { ICounterState } from './counter'

export interface IConnectState {
    user: UserState;
    counter: ICounterState;
}

export default [user, counter]