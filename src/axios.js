import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8080', // 기본 URL 설정
    headers: {
        'Content-Type': 'application/json'
    }
});

const sendPostRequest = (url, data) => {
    return instance.post(url, data)
        .then(response => response.data)
        .catch(error => {
            console.error('Error:', error);
            throw error; // 에러 전파
        });
};

export { sendPostRequest };
