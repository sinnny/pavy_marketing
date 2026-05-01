const FALLBACK_SIGNUP_URL = 'http://localhost:3000/admin/signup';

export function getSignupUrl(email?: string): string {
    const base = import.meta.env.VITE_ADMIN_SIGNUP_URL || FALLBACK_SIGNUP_URL;
    if (!email) return base;
    const trimmed = email.trim();
    if (!trimmed) return base;
    const separator = base.includes('?') ? '&' : '?';
    return `${base}${separator}email=${encodeURIComponent(trimmed)}`;
}
