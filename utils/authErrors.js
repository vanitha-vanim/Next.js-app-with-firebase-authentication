export const getAuthErrorMessage = (errorCode) => {
    switch (errorCode) {
      case 'auth/email-already-in-use':
        return 'The email address is already in use.';
      case 'auth/invalid-email':
        return 'Invalid email address.';
      case 'auth/user-disabled':
        return 'The user account has been disabled.';
      case 'auth/user-not-found':
        return 'User not found. Please sign up.';
      case 'auth/wrong-password':
        return 'Incorrect password.';
      default:
        return 'An error occurred while signing in/up. Please try again later.';
    }
  };
  