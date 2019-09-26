export default function({ store, app }) {
    store.dispatch('menu/getMenu', app.i18n.locale);
}
