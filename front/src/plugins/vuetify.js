import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import colors from 'vuetify/es5/util/colors';
import 'material-design-icons-iconfont/dist/material-design-icons.css';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        dark: false,
        themes: {
            light: {
                primary: "#170f4f",
                secondary: "#00bac7",
                accent: '#00bac7',
                error: '#f56565',
                warning: colors.orange.base,
                info: colors.blue.base,
                success: '#e3d900',
                muted: colors.grey.base,
                
                bg: '#f3f3f6',
                deletehover: '##fed7d7',
            },
            dark: {
                primary: "#170f4f",
                secondary: "#00bac7",
                accent: '#00bac7',
                error: '#f56565',
                warning: colors.orange.base,
                info: colors.blue.base,
                success: '#e3d900',
                muted: colors.grey.base,
                
                bg: colors.grey.darken2,
                deletehover: '##fed7d7',
            },
        },
    },
    options: {
        customProperties: true,
    },
});
