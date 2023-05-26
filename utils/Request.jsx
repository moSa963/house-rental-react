import { cookies } from "next/dist/client/components/headers";

export const TOKEN = null; //"Bearer 1|CS8821GgcK5tSCdn9BVxrcN8lYs1EKIBHxz61WzP" ;


const getHeader = () => {
    const headers = {
        'Accept': "application/json",
    };

    TOKEN && (headers['Authorization'] = TOKEN);

    !TOKEN && (headers['X-XSRF-TOKEN'] = cookies().get('XSRF-TOKEN'));

    return headers;
}

const request = (url, method = "GET", data = null) => {
    var body = {};

    body["headers"] = getHeader();
    body["method"] = method;

    if (data && method !== 'GET') {
        var form = data;

        if (typeof (data) === "object") {
            form = new FormData();

            Object.keys(data).forEach(key => {
                if (Array.isArray(data[key])) {
                    data[key].forEach((e) => {
                        form.append(key + "[]", e);
                    });
                } else {
                    form.append(key, data[key]);
                }
            });
        }

        body["body"] = form;
    }

    if (!url.match(/^https?:/s)) {
        url = process.env.api_url + url;
    }

    return fetch(url, body);
}


export default request;