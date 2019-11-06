const initState = {
    projects: [
        {id: '1', title: 'Title 1', content: 'Body Content'},
        {id: '2', title: 'Title 2', content: 'Body Content'},
        {id: '3', title: 'Title 3', content: 'Body Content'}
    ]
};
const tempProjectReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CREATE_PROJECT':
            console.log('created project', action.project)
    }
    return state
}

export default tempProjectReducer