import access_token from 'variables/accessTokenVariables';
export default (path) => {
    return `${path}?access_token=${access_token}`;
}
