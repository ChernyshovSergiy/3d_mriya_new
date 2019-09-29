import axios from 'axios';

export const state = () => ({
    apiUrl: process.env.baseUrl + '/page/menus',
    menu: {
        section1: { title: '', points: '' },
        section2: { title: '', points: '' },
        section3: { title: '', points: '' },
        section4: { title: '', points: '' }
    },
    lang: ''
});

export const mutations = {
    setMenu(state, payload) {
        if (payload) {
            state.menu = Object.assign({}, payload.data);
        } else {
            state.menu = {};
        }
    },
    setLang(state, payload) {
        if (payload) {
            state.Lang = payload;
        } else {
            state.Lang = '';
        }
    }
};

export const actions = {
    async getMenu({ state, commit }, $lang) {
        try {
            await axios
                .get(state.apiUrl + '/' + $lang)
                .then(req => {
                    commit('setMenu', req.data);
                    commit('setLang', $lang);
                })
                .catch(e => {
                    console.log('getMenuByLang: ', e);
                });
        } catch (e) {
            console.log(e);
        }
    }
};

export const getters = {
    getMenus(state) {
        return {
            title1: state.menu.section1.title,
            title2: state.menu.section2.title,
            title3: state.menu.section3.title,
            title4: state.menu.section4.title,
            points1: state.menu.section1.points,
            points2: state.menu.section2.points,
            points3: state.menu.section3.points,
            points4: state.menu.section4.points
        };
    }
};
