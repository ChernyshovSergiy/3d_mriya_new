export const state = () => ({
    status: {
        snackbar: false,
        snackbarError: false
    }
});

export const mutations = {
    SET_VALIDATION(state, data) {
        state.status.snackbar = data.snackbar;
        state.status.snackbarError = data.snackbarError;
    }
};

export const actions = {
    setOrderModelingCorrect({ commit }) {
        commit('SET_VALIDATION', {
            snackbar: true,
            snackbarError: false
        });
    },
    setOrderModelingNotCorrect({ commit }) {
        commit('SET_VALIDATION', {
            snackbar: false,
            snackbarError: true
        });
    },
    clearOrderModelingErrors({ commit }) {
        commit('SET_VALIDATION', {
            snackbar: false,
            snackbarError: false
        });
    }
};

export const getters = {
    mSnackbar(state) {
        return state.status.snackbar;
    },
    mSnackbarError(state) {
        return state.status.snackbarError;
    },
    snackbarStatus(state) {
        return state.status;
    }
};
