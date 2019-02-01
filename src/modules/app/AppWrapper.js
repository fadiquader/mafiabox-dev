import React from 'react'
import { connect } from 'react-redux'
import { DragDropContext } from 'react-beautiful-dnd';
import * as helpers from '../common/helpers'

import { droppableType } from '../common/types';

import { moveStory, movePageWithinMap, movePageToOtherMap } from '../page/PageReducer'
import { moveFunctionStory } from '../functions/FunctionReducer'
import {
    moveLogic,
    moveField,
    moveTagToOtherField,
    moveTagWithinField,
    moveRoleWithinPrio,
    moveRoleToOtherPrio,
    moveRoleToEmpty,
} from '../fields/FieldReducer'
import { showModal } from '../modal/ModalReducer'
import { showDropdown } from '../dropdown/DropdownReducer'

class AppWrapper extends React.Component{
    constructor(props) {
        super(props)
        this.prevClick = ''
        this.originalTarget = {}
    }

    componentDidMount() {
        window.addEventListener('click', this._handleClick)
        window.addEventListener('mousedown', this._handleMouseDown)
        window.addEventListener('contextmenu', this._handleClick)
        window.addEventListener('keyup', this._onKeyPress)
    }

    componentWillUnmount() {
        window.removeEventListener('click', this._handleClick)
        window.removeEventListener('mousedown', this._handleMouseDown)
        window.removeEventListener('contextmenu', this._handleClick)
        window.removeEventListener('keyup', this._onKeyPress)
    }

    _onKeyPress = e => {
        switch(e.key) {
            case 'Enter':
                return
            case 'Escape':
                if (this.props.dropdownKeys.length) {
                    return this.props.showDropdown()
                }
                return this.props.showModal()
            default:
        }
    }

    _handleMouseDown = e => {
        this.originalTarget = e.target || e.srcElement
    }

    _handleClick = (e) => {
        //Handles clicks that originated from different place
        if (e.target !== this.originalTarget) {
            return
        }

        //TODO handling still needs a bit of work
        if (helpers.isAppClickCancelled(e.target)) {
            //return
        }
        
        //check if clicking on a modal background
        if (e.target.classList.contains('modal-appclick')) {
            this.props.showModal()
            this.props.showDropdown()
            return
        }

        //if click is not inside a dropdown element, close any dropdowns
        if (!helpers.isElementDropdown(e.target)) {
            this.props.showDropdown()
        }

        if (e.target.matches('.app-onclick')) {
            const menuClick = e.target.getAttribute('menu-type')
            
            if (this.prevClick === e.target.outerHTML) {
                this.prevClick = ''
                this.props.showDropdown()
                return
            } else {
                this.prevClick = e.target.outerHTML
            }

            if (menuClick) {
                this.props.showDropdown(menuClick, e, {
                    ...JSON.parse(e.target.getAttribute('app-onclick-props')),
                })
            }
        }
    }

    onDragEnd = result => {
        const { source, destination } = result;
        
        //dropped outside the list
        if (!destination) {
            return;
        }

        //if nothing happened
        if (source.index === destination.index && source.droppableId === destination.droppableId) {
            return;
        }

        const sources = source.droppableId.split('.')
        const dests = destination.droppableId.split('.')

        //TODO probably move this into a reducer of some sort
        switch(sources[0]) {
            case droppableType.board:
                this.props.moveStory(sources[1], source.index, destination.index)
                break
            case droppableType.functionBoard:
                this.props.moveFunctionStory(source.index, destination.index)
                break
            case droppableType.logic:
                if (source.droppableId === destination.droppableId) {
                    this.props.moveLogic(
                        sources[1],
                        sources[2],
                        sources[3],
                        source.index,
                        destination.index,
                    )
                } 
                break
            case droppableType.template:
                if (source.droppableId === destination.droppableId) {
                    this.props.moveField(
                        sources[1],
                        source.index,
                        destination.index,
                    )
                }
                break
            case droppableType.tag:
                this.props.moveTagWithinField(
                    sources[1],
                    source.index,
                    destination.index,
                )
                break
            case droppableType.page:
                if (source.droppableId === destination.droppableId) {
                    this.props.movePageWithinMap(
                        sources[1],
                        source.index,
                        destination.index,
                    )
                } else {
                    this.props.movePageToOtherMap(
                        sources[1],
                        dests[1],
                        source.index,
                        destination.index,
                    )
                }
                break
            case droppableType.priority:
                if (dests[0] === droppableType.priorityNew) {
                    this.props.moveRoleToEmpty(
                        parseInt(sources[1]),
                        parseInt(dests[1]),
                        source.index,
                    )
                } else if (sources[1] === dests[1]) {
                    this.props.moveRoleWithinPrio(
                        sources[1],
                        source.index,
                        destination.index,
                    )
                } else {
                    this.props.moveRoleToOtherPrio(
                        sources[1],
                        dests[1],
                        source.index,
                        destination.index,
                    )
                }
                break
            default:
        }
    }

    render() {
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                {this.props.children}
            </DragDropContext>
        )
    }
}

export default connect(
    state => ({
        storyMap: state.page.storyMap,
        dropdownKeys: state.dropdown.dropdownKeys,
    }),
    {
        moveStory,
        moveFunctionStory,
        movePageWithinMap,
        movePageToOtherMap,
        showDropdown,
        showModal,
        moveLogic,
        moveField,
        moveTagToOtherField,
        moveTagWithinField,
        moveRoleWithinPrio,
        moveRoleToOtherPrio,
        moveRoleToEmpty,
    }
)(AppWrapper)