import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// 假定我们有一个可以返回 Promise 的
import { fetchItem } from '../api/index'

export function createStore() {
    return new Vuex.Store({
        state: {
            items: []
        },
        actions: {
            fetchItem({ commit }, key) {
                // `store.dispatch()` 会返回 Promise，
                // 以便我们能够知道数据在何时更新
                return fetchItem(key).then(list => {
                    console.log('list1', list)
                    commit('setItem', list)
                });
            }
        },
        mutations: {
            setItem(state, list) {
                console.log('list2', list)
                state.items = list
                // Vue.set(state.items, list)
            }
        }
    });
}