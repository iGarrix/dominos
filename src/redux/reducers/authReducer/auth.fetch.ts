export interface ILoginByEmailRequest {
	email: string;
	password: string;
}

export interface IAuthenticateUserRequest {
	accessToken: string;
	refreshToken: string;
}
