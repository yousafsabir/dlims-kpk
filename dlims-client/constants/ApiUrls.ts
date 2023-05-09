const Api = process.env.NEXT_PUBLIC_API_URL
const auth = Api + "/users"
const license = Api + "/licenses"

const ApiUrls = {
    auth: {
        login: auth + "/login",
        register: auth + "/register"
    },
    licenses: {
        create: license + "/",
        get: license + "/",
        update: license + "/",
        delete: license + "/",
    }
}

export default ApiUrls