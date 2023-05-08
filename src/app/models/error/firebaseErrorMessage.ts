export enum FirebaseErrorMessage {
  USER_NOT_FOUND = "There is no user with the specified email value.",
  UID_ALREADY_EXISTS = "The specified uidelement is already used by an existing user. Each user must have a unique uid.",
  WRONG_PASSWORD = "The password is incorrect or the user does not exist.",
  EMAIL_ALREADY_EXISTS = "The e-mail address provided is already used by an existing user. Each user must have a unique e-mail address.",
  TOO_MANY_REQUEST = "Access to this account has been temporarily disabled due to multiple failed login attempts. You can restore it immediately by resetting your password or try again later.",
  EMAIL_ALREADY_IN_USE = "The e-mail address provided is already used by an existing user. Each user must have a unique e-mail address.",
}

