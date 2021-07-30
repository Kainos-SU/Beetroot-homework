const app = {
    data() {
        return {
            colors: [],
            input: ''
        };
    },

    methods: {
        pushColor() {
            this.colors.push(this.input);
            this.input = "";
        }
    }
};

Vue.createApp(app).mount("#app");