let domain;
if(!process.env.REACT_APP_DOMAIN_URL) {
    domain = "http://localhost:3001"
} else {
    domain = process.env.REACT_APP_DOMAIN_URL
};

export { domain };
// export const domain = "http://localhost:3001";
// export const domain = "https://simple-crud-react-mysql.herokuapp.com";
// 