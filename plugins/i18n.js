export default function({ app, store }) {
    // beforeLanguageSwitch called right before setting a new locale
    app.i18n.beforeLanguageSwitch = (oldLocale, newLocale) => {
        // console.log(oldLocale, newLocale);
        // app.i18n.setLocaleCookie(newLocale);
        // console.log(store.getters['menu/getMenus']);
        if (oldLocale !== newLocale || !store.getters['menu/getMenus']) {
            const setMenu = new Promise((resolve, reject) => {
                store.dispatch('menu/getMenu', newLocale);
            });
            setMenu
                .then(resolve =>
                    console.log(
                        'Change Locale: ',
                        store.getters['menu/getMenus']
                    )
                )
                .catch(reject => console.log('Error Change Locale: ', reject));
        }
    };
    // onLanguageSwitched called right after a new locale has been set
    app.i18n.onLanguageSwitched = (oldLocale, newLocale) => {
        // console.log(oldLocale, newLocale);
        // console.log(store.getters['menu/massage'])
    };
}
