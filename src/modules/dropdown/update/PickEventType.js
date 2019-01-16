import React from 'react'
import { connect } from 'react-redux'
import * as proptool from '../../logic/proptool'

import { modalType } from '../../modal/types';
import { screenType } from '../../strings/types'

import { showModal } from '../../modal/ModalReducer'
import { stringNavigate } from '../../strings/StringReducer'

class PickEventType extends React.Component{
    _onAdd = () => {
        const { tagKey } = this.props
        this.props.stringNavigate(screenType.update, tagKey)
        this.props.updatePage()
        this.props.showDropdown()
    }

    _onEdit = () => {
        const { tagKey } = this.props
        this.props.stringNavigate(screenType.edit, tagKey)
        this.props.showDropdown()
    }

    render() {
        return (
            <div>
                <div
                    className="drop-down-menu-option"
                    onClick={this._onAdd}
                >
                    <i className="drop-down-menu-icon mdi mdi-calendar-plus"/>
                    add event to update
                </div>
                <div
                    className="drop-down-menu-option"
                    onClick={this._onEdit}
                >
                    <i className="drop-down-menu-icon mdi mdi-calendar-text"/>
                    edit event
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({
        updateRef: proptool.addPlayerRef(state.template),
    }),
    {
        showModal,
        stringNavigate,
    }
)(PickEventType)