// import axios from 'axios';
export default function({ route, store, $axios }) {
    return $axios
        .$get(process.env.baseUrl + '/order/printing/verify/' + route.params.id)
        .then(() => {
            store.dispatch('order/setOrderModelingCorrect');
            // redirect(app.localePath('index'));
        })
        .catch(err => {
            console.log('error = ', err);
            store.dispatch('order/setOrderModelingNotCorrect');
            console.log(
                'Mistake = ',
                'store result = ',
                store.getters['order/mSnackbar'],
                ' | ',
                'store error = ',
                store.getters['order/mSnackbarError']
            );
        });
}
