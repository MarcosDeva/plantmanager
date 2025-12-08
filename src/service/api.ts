import axios from 'axios';
import cors

const api = axios.create({
    baseURL: 'https://192.168.0.164:3333',
});

api.get('/plants_enviroments')
    .then(function (response){
        console.log("CHEGOUU");
    })

export default api;