const controls = {
    isSideNavVisible: false
}

const controlsReducer = (state, action) => {
    switch(action.type) {
        case "showNav":
            return {...controls, isSideNavVisible: action.value }
        default: return controls;
    }
}

export { controls, controlsReducer }