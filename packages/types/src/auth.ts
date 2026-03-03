export interface AuthTokens {
  readonly accessToken: string;
  readonly refreshToken: string;
  readonly expiresAt: number;
}

export interface LoginCredentials {
  readonly email: string;
  readonly password: string;
}

export interface SignupPayload {
  readonly email: string;
  readonly password: string;
  readonly name: string;
  readonly tenantName?: string;
}

export interface PasswordResetRequest {
  readonly email: string;
}

export interface PasswordResetConfirm {
  readonly token: string;
  readonly newPassword: string;
}

export type AuthState =
  | 'unauthenticated'
  | 'authenticating'
  | 'authenticated'
  | 'expired';
