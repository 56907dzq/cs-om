module.exports = {
    async redirects() {
      return [
        {
          source: '/',
          destination: '/CE',
          permanent: true,
        }
      ]
    },
  }