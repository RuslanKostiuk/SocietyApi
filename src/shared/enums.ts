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
    unknown = "Unexpected error"
}

export enum RegistrationTypes {
    nativeRegistration,
    googleRegistration,
    facebookRegistration,
    twitterRegistration
}