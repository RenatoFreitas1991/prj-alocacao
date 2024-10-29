import 'dotenv/config';

export default ({ config }) => {
  return {
    ...config,
    extra: {
      API_URL: process.env.API_URL,
      PORT: process.env.PORT,
      X_API_KEY: process.env.X_API_KEY,
      LOGFLARE_SOURCE: process.env.LOGFLARE_SOURCE,
    },
  };
};
