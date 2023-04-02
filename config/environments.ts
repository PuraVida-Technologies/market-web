import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

const environments = {
  provider: {
    baseUrl: publicRuntimeConfig.NEXT_PUBLIC_BASE_URL,
  },
  mapApiKey: publicRuntimeConfig.NEXT_PUBLIC_MAP_API_KEY,
  marketFrontendUrl: publicRuntimeConfig.NEXT_PUBLIC_WEBSITE_URL,
};

export default environments;
