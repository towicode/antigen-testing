const dev = {
  apiGateway: {
    REGION: "us-west-2",
    URL: "https://9bm89pl9ak.execute-api.us-west-2.amazonaws.com/dev"
  },
  cognito: {
    REGION: "us-west-2",
    USER_POOL_ID: "us-west-2_s5072pJC9",
    APP_CLIENT_ID: "14tnphml63ovpdvmq9vo3093pu",
    DOMAIN: "applinnov.auth.us-west-2.amazoncognito.com",
    REDIRECT_SIGNIN: "http://localhost:4200/",
    REDIRECT_SIGNOUT: "https://shibboleth.arizona.edu/cgi-bin/logout.pl"
  }
};

const prod = {
  apiGateway: {
    REGION: "us-gov-west-1",
    URL: "https://7zj1u3rfy9.execute-api.us-gov-west-1.amazonaws.com/prd"
    // URL: "https://9bm89pl9ak.execute-api.us-west-2.amazonaws.com/dev"
  },
  cognito: {
    REGION: "us-gov-west-1",
    USER_POOL_ID: "us-gov-west-1_Yerqo6rUv",
    APP_CLIENT_ID: "4e450ll69pq651l3o3dkjsda5g",
    DOMAIN: "ctrds.auth-fips.us-gov-west-1.amazoncognito.com",
    REDIRECT_SIGNIN: "http://localhost:4200/",
    REDIRECT_SIGNOUT: "https://shibboleth.arizona.edu/cgi-bin/logout.pl"
  }
};

const config = process.env.REACT_APP_STAGE === 'production'
  ? prod
  : dev;

export default {
  apiGateway: config.apiGateway,
  cognito: config.cognito
};