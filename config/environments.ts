import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();


const environments = {
    app: {        
        nodeEnv: publicRuntimeConfig.NEXT_PUBLIC_NODE_ENV,
    },
    provider: {
        baseUrl: publicRuntimeConfig.NEXT_PUBLIC_BASE_URL,
    },
    mapApiKey: publicRuntimeConfig.NEXT_PUBLIC_MAP_API_KEY
}

export default environments