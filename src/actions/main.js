const getHeaders = () => {
    const headers = new Headers();
    //headers.append('Accept', 'application/json');
    //headers.append("Authorization", localStorage.getItem('token'));
    return headers;
}

const checkStatus = (status) => {
    const accessStatus = [200, 201];
    return accessStatus.includes(status);
}

const getForm = params => {
    let formData = new FormData();
    Object.keys(params).forEach(key => formData.append(key, params[key]));
    return formData;
}

const getFormXwww = params => {
    let formData = [];
    for (var property in params) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(params[property]);
        formData.push(encodedKey + "=" + encodedValue);
    }
    return formData.join("&");
}

const buildQueryParams = params => {
    const stringParams = Object.keys(params).filter(key => {
        const value = params[key];
        if ((typeof value === 'object') && (value.length === 0)) {
            return false;
        }
        return Boolean(value) || value === 0;
    }).map(key => `${key}=${params[key]}`).join('&');
    return stringParams.length !== 0 ? `?${stringParams}` : '';
}

export const SERVER_REQUEST_ERROR = 'SERVER_REQUEST_ERROR';

const handlerFailureBackend = log => {
    // const dispatch = useDispatch();
    // dispatch({
    //     type: SERVER_REQUEST_ERROR
    // })
    // window.store.dispatch({
    //     type: SERVER_REQUEST_ERROR
    // })
    //requestFailLog(log);
}

const requestFailLog = log => {
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    fetch('https://failbase.fosteev.ru/project/' + location.hostname, {
        method: 'POST',
        headers: headers,
        body: getFormXwww(log)
    })
}

export const PERMISSION_DENIED = 'PERMISSION_DENIED';
const permissionDenied = () => {
    window.store.dispatch({
        type: PERMISSION_DENIED
    })
}

export const SNACKBAR_RESET = 'SNACKBAR_RESET';

export function request(path, method = 'GET', params) {
    let headers = getHeaders();
    let formData = null;
    const callback = (params && params['callback']) ?  params['callback'] : () => {};
    const failureCallback = params && params['failureCallback'] ?  params['failureCallback']: () => {};

    if (params && params['callback']) {
        delete params['callback'];
    }

    if (params && params['failureCallback']) {
        delete params['failureCallback'];
    }

    if (method === 'PUT') {
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        if (params) {
            formData = getFormXwww(params);
        }
    } else if (method === 'POST') {
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        if (params) {
            formData = getFormXwww(params);
        }
    } else if ((method === 'GET') || (method === 'DELETE')) {
        if (params) {
            path = path + buildQueryParams(params);
        }
    }

    return new Promise((resolve, reject) => {
        const url = path.search('http') !== -1 ? path : `http://localhost:3001/${path}`;

        fetch(url, {
            method: method,
            headers: headers,
            mode: 'cors',
            body: formData
        }).then(response => {
            if (!checkStatus(response.status)) {
                console.warn(`Invalid status: ${response.status}`);

                if (response.status === 403) {
                    permissionDenied();
                }


                if (failureCallback) {
                    failureCallback();
                }

                reject(response);
                return;
            }

            response.json()
                .then(resp => {
                    resolve(resp);

                    const res = resp.res ? resp.res : resp.status;

                    if ([400, 500, 404].includes(res) && failureCallback) {
                        failureCallback(resp);
                    } else {
                        callback(resp);
                    }
                })
                .catch(err => {
                    resolve('');
                    if (failureCallback) {
                        failureCallback();
                    }
                    console.warn(`Error parse json. Path: ${path}. Method: ${method}`, err);
                })

        }).catch(err => {
            reject(err);
            if (failureCallback) {
                failureCallback();
            }
        });
    });
}

export const getFileUrl = hash => `http://api.qlick.pilot-gps.com/media/fileContent/${hash}`
