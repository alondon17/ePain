const apiAdress = 'http://localhost:8080'
export const getFromApi = (path) => {
    return fetch(apiAdress + path, { mode: 'cors' }).then(response => response.json())
}
export const postToApi = (path, body) => {
    return fetch(apiAdress + path, {
        mode: 'cors', method: 'post',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' }
    }).then(response => response.json()).catch(err=>err)
}