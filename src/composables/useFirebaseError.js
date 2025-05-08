export function useFirebaseError() {
    function getErrorMessage(code) {
        const errors = {
            'auth/email-already-in-use': 'This email is already registered.',
            'auth/invalid-email': 'The email address is not valid.',
            'auth/weak-password': 'Password must be at least 6 characters.',
            'auth/user-not-found': 'No account found with this email.',
            'auth/wrong-password': 'Incorrect password. Please try again.',
            'auth/too-many-requests': 'Too many attempts. Please wait and try again later.',
            'auth/network-request-failed': 'Network error. Please check your connection.',
            'auth/missing-password': 'Please enter your password.',
            'auth/missing-email': 'Please enter your email address.',
            'auth/internal-error': 'Something went wrong. Please try again later.'
        }

        return errors[code] || 'An unexpected error occurred. Please try again.'
    }

    return { getErrorMessage }
}
