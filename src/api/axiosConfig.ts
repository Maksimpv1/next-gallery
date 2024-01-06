import axios from "axios";

export const axiosApiConfig = axios.create({
    baseURL:"https://api.unsplash.com/photos/",
    headers:{ 
        "Authorization":"Client-ID jUrMyfcTVIpgMOslYd5IYTCua3HVokhpaGP6UKWKVJo",
        'Content-Type': 'application/json', 
},
});