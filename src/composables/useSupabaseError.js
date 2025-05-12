export function useSupabaseError() {
    function getErrorMessage(error) {
        if (!error) return null

        const message = error.message?.toLowerCase() || ''

        if (message.includes('invalid login credentials')) {
            return 'Invalid email or password.'
        }

        if (message.includes('email already registered')) {
            return 'This email is already registered.'
        }

        if (message.includes('password should be at least')) {
            return 'Password must be at least 6 characters.'
        }

        if (message.includes('network error')) {
            return 'Network error. Please try again later.'
        }

        if (message.includes('email not confirmed')) {
            return 'Email not confirmed.'
        }

        return 'An unexpected error occurred. Please try again.'
    }

    return { getErrorMessage }
}
