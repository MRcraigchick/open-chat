import config from '@/app.config.json';

export const requestsInstance = Requests(config.server_domain);

function Requests(apiServerDomain) {
  return {
    constructApiServerURL(endpoint) {
      return `${apiServerDomain}${endpoint}`;
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

    async search(endpoint, queryObj) {
      const url = new URL(this.constructApiServerURL(endpoint));
      Object.keys(queryObj).forEach((key) => url.searchParams.append(key, queryObj[key]));
      const result = await fetch(url);
      return result;
    },
  };
}
