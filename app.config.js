import 'dotenv/config';

export default ({ config }) => {
  return {
    ...config,
    extra: {
      X_API_KEY: process.env.X_API_KEY,
      LOGFLARE_SOURCE: process.env.LOGFLARE_SOURCE,
    },
  };
};
