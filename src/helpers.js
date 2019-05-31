function checkStatus(response) {
    if (response.ok) {
        return Promise.resolve(response);
    } else {
        console.log(response)
        return Promise.reject(new Error(response.statusText));
    }
}

function parseJSON(response) {
    return response.json();
}

export { checkStatus, parseJSON }