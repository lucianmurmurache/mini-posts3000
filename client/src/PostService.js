import axios from "axios";

const url = 'api/posts/';

class PostService {

    // Get posts
    static getPosts() {
        return new Promise((resolve, reject) => {
            axios.get(url).then((res) => {
                const data = res.data;
                resolve(
                    data.map(post => ({
                        ...post,
                        createdAt: new Date(post.createdAt)
                    }))
                );
            })
                .catch((err) => {
                    reject(err);
                })
        });
    }

    // Create post
    static insertPost(text) {
        return axios.post(url, {
            text
        });
    }

    // Delete post
    static deletePost(id) {
        return axios.delete(`${url}${id}`);
    }
}

export default PostService;
