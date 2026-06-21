/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
  async redirects() {
    return [
      {
        source: "/savethedate",
        destination: "/#when",
        permanent: false,
      },
      {
        source: "/save-the-date",
        destination: "/#when",
        permanent: false,
      },
    ];
  },
};

export default config;
