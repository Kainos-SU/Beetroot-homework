const app = {
    data() {
        return {
            links: [
                {
                    title: "Facebook",
                    text: "facebook",
                    link: "https://www.facebook.com"
                },
                {
                    title: "Twitter",
                    text: "twitter",
                    link: "https://twitter.com"
                },
                {
                    title: "GitHub",
                    text: "github",
                    link: "https://www.github.com"
                }
            ]
        }
    }
};

Vue.createApp(app).mount("#app");