import React from 'react'
import './modals.css'
import { connect } from 'react-redux'

import { showModalByKey } from './ModalReducer'

import { modalType } from './modalConfig'

import CloseWindow from './keys/CloseWindow'
import DeleteRole from './keys/DeleteRole';

class ModalView extends React.Component {
    _renderModal(key) {
        switch(key) {
            case modalType.closeWindow:
                return <CloseWindow/>
            case modalType.deleteRole:
                return <DeleteRole/>
            default:
                return null
        }
    }

    _onClose = (e) => {
        let origin = e.srcElement || e.target
        if (origin.className === 'modal') {
            this.props.showModalByKey()
        }
    }

    render() {
        const { modalKey } = this.props
        if (!modalKey) return null
        return (
            <div className="modal" onClick={this._onClose}>
                <div className="modal-child">
                    {this._renderModal(modalKey)}
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({
        modalKey: state.modal.modalKey,
    }),
    {
        showModalByKey,
    }
)(ModalView)