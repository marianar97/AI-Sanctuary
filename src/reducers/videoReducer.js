export default function videoReducer(state, action){
    switch(action.type){
        case "SET_VIDEOS":
            return {...state, videos: action.payload}
        case "SET_ACTIVE_VIDEO":
            return {...state, activeVideo: action.payload}
        case "SET_SEARCH_TERM":
            return {
                ...state, 
                searchTerm: action.payload,
            }
        case "SET_SELECTED_TAGS":
            return {...state, selectedTags: action.payload}
        case "TOGGLE_TAG":
            return {
                ...state,
                selectedTags: state.selectedTags.includes(action.payload)
                ? state.selectedTags.filter(tag => tag !== action.payload)
                : [...state.selectedTags, action.payload]
            };
        default:
            return state
    }
}