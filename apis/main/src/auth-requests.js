import dotenv from 'dotenv';
dotenv.config({ path: '.env' });
export const requestsInstance = Requests(process.env.AUTH_ORIGIN);

function Requests(authServerDomain) {
  return {
    constructApiServerURL(endpoint) {
      return `${authServerDomain}${endpoint}`;
    },

    async get(endpoint, headers = {}) {
      const result = await fetch(this.constructApiServerURL(endpoint), {
        method: 'GET',
        headers: {
          ...headers,
        },
      });
      return result;
    },

    async post(endpoint, data, headers = {}) {
      const result = await fetch(this.constructApiServerURL(endpoint), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        body: JSON.stringify(data),
      });
      return result;
    },

    async delete(endpoint, data, headers = {}) {
      const result = await fetch(this.constructApiServerURL(endpoint), {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        body: data && JSON.stringify(data),
      });
      return result;
    },

    async put(endpoint, data, headers = {}) {
      const result = await fetch(this.constructApiServerURL(endpoint), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        body: data && JSON.stringify(data),
      });
      return result;
    },
  };
}
