export function token(state = [], action) {
    switch (action.type) {
        case 'TOKEN_SAVE_DATA':
            return action.token;
        default:
            return state;
    }
}
