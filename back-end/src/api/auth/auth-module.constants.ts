export const REMOTE_LOGIN_REQUEST_GQL = `
query Login($input: LoginInput!) {
  login(input: $input) {
    loggedIn
    departments
    isSportObject
    sportObjectGroups
    email
    phone
  }
}
`.trim().replace(/\s+/g, ' ');

export const LOGIN_FOR_ALL_QUERY = `
query LoginForAll($input: LoginForAllInput!) {
  loginForAll(input: $input) {
    email
    departments
  }
}
`.trim().replace(/\s+/g, ' ');
