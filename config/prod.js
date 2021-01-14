module.exports = {
    expressSessionSecret: process.env.EXPRESS_SESSION_SECRET,
    slackClientID: process.env.SLACK_CLIENT_ID,
    slackClientSecret: process.env.SLACK_CLIENT_SECRET,
    googleClientID: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    mongoURI: process.env.MONGO_URI,
    //cookieKey: process.env.COOKIE_KEY,
    stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    stripeSecretKey:process.env.STRIPE_SECRET_KEY,
    sendgridKey:process.env.SENDGRID_KEY,
    redirectDomain:process.env.REDIRECT_DOMAIN,
    shopifyAPIKey:process.env.SHOPIFY_API_KEY,
    shopifyAPIPassword:process.env.SHOPIFY_API_PASSWORD,
    shopifySharedSecret:process.env.SHOPIFY_SHARED_SECRET,
    shopifyStoreName:process.env.SHOPIFY_STORE_NAME,
    shopifyAPIVersion:process.env.SHOPIFY_API_VERSION,
    shopifyCollectionId: process.env.SHOPIFY_COLLECTION_ID,
    shopifyMetaNamespace: process.env.SHOPIFY_META_NAMESPACE,
    shopifyMetaKey: process.env.SHOPIFY_META_KEY,
    glrAPIGateway: process.env.GLR_API_GATEWAY,
    glrAPIGatewayKey: process.env.GLR_API_GATEWAY_KEY,
    glrAPIProduct: process.env.GLR_API_PRODUCT,
    glrAPICabinet: process.env.GLR_API_CABINET,
    glrAPIUser: process.env.GLR_API_USER,
    glrAPIOrder: process.env.GLR_API_ORDER,
    glrAPIAdmin: process.env.GLR_API_ADMIN,
    glrLogLevel: process.env.GLR_LOG_LEVEL,
    secureSession: process.env.SECURE_SESSION,
    webhookSecret: process.env.WEBHOOK_SECRET
};
