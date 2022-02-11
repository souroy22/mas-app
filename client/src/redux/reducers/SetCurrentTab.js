 const initialState = {currentTab:"MANAGER"}

 export default function CurrentTab(state=initialState, action) {
    switch (action.type) {
        case "SET_CURRENT_TAB":
            return {
                ...state,currentTab:action.payload,
        
            }
        default:
            return state
    }
}