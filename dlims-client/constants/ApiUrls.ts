const Static = process.env.NEXT_PUBLIC_API_URL + '/public'
const Api = process.env.NEXT_PUBLIC_API_URL + '/api'
const auth = Api + '/users'
const license = Api + '/licenses'
const contact = Api + '/contacts'
const ApiUrls = {
  auth: {
    login: auth + '/login',
    register: auth + '/register',
    authenticate: auth + '/authenticate',
  },
  licenses: {
    create: license + '/',
    get: license + '/',
    update: license + '/',
    delete: license + '/',
  },
  contacts: {
    create: contact + '/',
    get: contact + '/',
    delete: contact + '/',
  },
  images: Static + '/images/',
}

export default ApiUrls
