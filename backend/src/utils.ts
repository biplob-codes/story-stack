export const setBearerToken = (token: string) => "Bearer " + token;
export const getBearerToken = (token: string) => token.split(" ")[1];
