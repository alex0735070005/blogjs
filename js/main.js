const managerApi = {
    apiKey: '6533156864bd641cf09188d9d71eae9a',

    // Get list posts METHOD GET
    getPosts(limit = 10, page = 1) {
        const params = `limit=${limit}&&page=${page}&&api_key=${this.apiKey}`;
        const url = `http://blog.api.axenov-it.com/v1/posts?${params}`;

        return fetch(url)
            .then((response) => {
                return response.json();
            });
    },

    // Create post METHOD POST
    sendPost(post) {

        const params = `api_key=${this.apiKey}`;
        const url = `http://blog.api.axenov-it.com/v1/posts?${params}`;

        const request = {
            method: 'POST',
            body: JSON.stringify(post)
        }

        return fetch(url, request)
            .then((response) => {
                return response.json();
            });
    },
}


// managerApi.addPost({
//     title: 'post 1 title',
//     seo_url: 'post-1-title',
//     full_description: 'post-1-full-description dddddddd ddddddddddddd ddddddddddd ddddddddd',
//     short_description: 'post-1-short-description',
//     status: true,
// })


// managerApi.getPosts().then((data) => console.log(data))


const managerView = {
    title: document.querySelector('#title'),
    seoUrl: document.querySelector('#seo-url'),
    shortDescription: document.querySelector('#short-description'),
    fullDescription: document.querySelector('#full-description'),
    status: document.querySelector('#status'),
    btnSend: document.querySelector('#send-post'),
    postList: document.querySelector('#posts-list'),

    addPost() {
        console.log('POST SENT');
        managerApi.sendPost({
            title: this.title.value,
            seo_url: this.seoUrl.value,
            status: this.status.checked,
            full_description: this.fullDescription.value,
            short_description: this.shortDescription.value,
        }).then(() => {
            managerApi.getPosts(50, 1)
            .then((data) => this.renderPosts(data.posts));
        });
    },

    renderPosts(posts) {
        let html = '';

        for (let post of posts) {
            html += `
                    <tr>
                        <td>${post.title}</td>
                        <td>${post.status}</td>
                        <td>${post.short_description}</td>
                        <td>${post.full_description}</td>
                    </tr>
                `
        }

        this.postList.innerHTML = html;
    },

    init() {
        this.btnSend.onclick = this.addPost.bind(this);

        managerApi.getPosts(50, 1)
            .then((data) => this.renderPosts(data.posts));
    }
}


managerView.init();