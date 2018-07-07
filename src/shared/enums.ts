export enum RelationshipStatuses {
    single = "Single",
    inRelations = "In Relationship",
    married = "Married",
    itComplicate = "All Complicate",
    like = "Like"
}

export enum FriendIviteStatuses {
    notConfirmed = "Not Confirmed",
    confirmed = "Confirmed",
    subscriber = "Subsriber"
}

export enum ErrorStatuses {
    saveError = "Save Error",
    registrationError = "Registration Error",
    emailError = "Email Error",
    userNotFound = "User not found",
    passwordNotCorrect = "Password not correct",
    unknown = "Unexpected error",
    s3Error = "s3 Error"
}

export enum RegistrationTypes {
    nativeRegistration,
    googleRegistration,
    facebookRegistration,
    twitterRegistration
}