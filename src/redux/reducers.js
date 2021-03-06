import { combineReducers } from 'redux'

import AppReducer from '../modules/app/AppReducer'
import DropdownReducer from '../modules/dropdown/DropdownReducer'
import FieldReducer from '../modules/fields/FieldReducer'
import FirebaseReducer from '../modules/firebase/FirebaseReducer'
import FunctionReducer from '../modules/functions/FunctionReducer'
import ModalReducer from '../modules/modal/ModalReducer'
import NavReducer from '../modules/navigation/NavReducer'
import PageReducer from '../modules/page/PageReducer'
import TemplateReducer from '../modules/template/TemplateReducer'

const reducers = {
    app: AppReducer,
    dropdown: DropdownReducer,
    field: FieldReducer,
    firebase: FirebaseReducer,
    functions: FunctionReducer,
    modal: ModalReducer,
    nav: NavReducer,
    page: PageReducer,
    template: TemplateReducer,
}

export default combineReducers(reducers)