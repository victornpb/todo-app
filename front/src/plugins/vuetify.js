import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import colors from 'vuetify/es5/util/colors';
import 'material-design-icons-iconfont/dist/material-design-icons.css';

Vue.use(Vuetify);

export default new Vuetify({
    themes: {
        light: {
            primary: "#170f4f",
            secondary: "#00bac7",
            accent: colors.deepPurple.base,
            error: colors.red.base,
            warning: colors.orange.base,
            info: colors.blue.base,
            success: colors.green.base,
            muted: colors.grey.base,
        },
        dark: {
            primary: "#170f4f",
            secondary: "#00bac7",
            accent: colors.deepPurple.base,
            error: colors.red.base,
            warning: colors.orange.base,
            info: colors.blue.base,
            success: colors.green.base,
            muted: colors.grey.base,
        },
    },
    options: {
        customProperties: true,
    },
});
