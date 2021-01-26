module.exports = {
    async redirects() {
      return [
        {
          source: '/',
          destination: '/CE',
          permanent: true,
        },
        {
          source: '/config',
          destination: '/config/mgm',
          permanent: true,
        }
      ]
    },
  }