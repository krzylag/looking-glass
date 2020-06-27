
export function isUserValid(user) {
    return (typeof user.firstName === 'string' && user.firstName.trim() !== ''
            && typeof user.lastName === 'string' && user.lastName.trim() !== ''
    )
}
