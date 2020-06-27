
export function isCommentValid(comment) {
    return (typeof comment.body === 'string' && comment.body.trim() !== ''
            && typeof comment.name === 'string' && comment.name.trim() !== ''
            && typeof comment.email === 'string' && _validateEmail(comment.email.trim())
    )
}

/**
 * e-mail validation with regexp
 * 
 * Source from https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
 * 
 * @param {string} email    E-Mail to check
 * @returns {boolean}       true if email valid
 */
function _validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}