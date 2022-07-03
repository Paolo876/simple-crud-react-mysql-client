let domain;
if(!process.env.REACT_APP_DOMAIN_URL) {
    domain = "http://localhost:3001"
} else {
    domain = process.env.REACT_APP_DOMAIN_URL
};

export { domain };
