
/**
 * Convert internal users list format, to format expected by React-Select component.
 * 
 * Optionally, function can append values at the end of passed array.
 * 
 * @param {Array} users         Array of users, in internal format [{id:integer, firstName:string, lastName:string}]
 * @param {Array} previous      Previous state. If not empty, "users" will be appended at end of it's clone.
 * 
 * @returns {Array}             New cloned users array, safe for setting React state.
 */
export function convertResponseToSelectOptions(users, previous=[]) {
    let result = previous.map((item)=>{
        return Object.assign({}, item);
    });
    for(let uKey in users) {
        result.push({
            value: users[uKey].id,
            label: users[uKey].lastName+" "+users[uKey].firstName,
        })
    }
    return result;
}