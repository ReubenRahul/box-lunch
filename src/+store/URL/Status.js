// https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
const addedResponse = {
    status: 201,
    msg: 'Added'
}
const updatedResponse = {
    status:200,
    msg: "Updated"
}

const deleteResponse = {
    status: 204,// not content
    msg: 'Deletd'
}

export {
    addedResponse,
    deleteResponse,
    updatedResponse
}
