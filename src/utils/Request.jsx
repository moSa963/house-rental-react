export const APP_URL = "/"; // "http://127.0.0.1:8000/";
export const TOKEN = null; // "Bearer 1|6D9jzknk51rxFtE9A0y7GJN1LXr5ta8IrmigawpI";


function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');

    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

const getHeader = () => {
    const headers = {
        'Accept': "application/json",
    };

    TOKEN && (headers['Authorization'] = TOKEN);
    !TOKEN && (headers['X-XSRF-TOKEN'] = getCookie('XSRF-TOKEN'));

    return headers;
}

const sendRequest = (url = APP_URL, method = "GET", data = null) => {
    var body = {};

    if (data && method !== 'GET') {
        var form = new FormData();

        if (typeof(data) === "object"){
            Object.keys(data).forEach(key => {
                if (Array.isArray(data[key])){
                    data[key].forEach(e=>{
                        form.append(key + "[]", e);
                    });
                }else {
                    form.append(key, data[key]);
                }
            });
        } else {
            form = data;
        }

        body["body"] = form;
    }

    body["headers"] = getHeader();
    body["method"] = method;
    body["credentials"] = 'include';

    if (!url.match(/^https?:/s)) {
        url = APP_URL + url;
    }

    return fetch(url, body);
}


export default sendRequest;