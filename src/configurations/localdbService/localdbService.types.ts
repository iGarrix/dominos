export enum LocalStorageVariables {
    access_token = "acs_tkn",
    refresh_token = "refr_tkn",
}

export interface IStorageAuthorize {
    accessToken: string,
    refreshToken: string,
}