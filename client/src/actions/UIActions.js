export const RELATED_USER_SELECTED = 'RELATED_USER_SELECTED'

export function selectUser(userId){
    return {type: RELATED_USER_SELECTED, userId}
}
