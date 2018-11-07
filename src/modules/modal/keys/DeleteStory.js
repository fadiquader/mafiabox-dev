import React from 'react'
import { connect } from 'react-redux'

import { deleteStory } from '../../story/StoryReducer'
import { showModalByKey } from '../ModalReducer'
import { navigate } from '../../navigation/NavReducer'

class DeleteStory extends React.Component {
    _onCancel = () => {
        this.props.showModalByKey()
    }

    _onDelete = () => {
        this.props.deleteStory(this.props.modalParams.storyIndex)
        this.props.showModalByKey()
        this.props.navigate('/board')
    }

    render() {
        const { modalParams, stories } = this.props
        const { storyIndex } = modalParams
        
        return (
            <div>
                <div style={{ padding: 16 }}>
                    <div className="modal-title">
                        {`Delete "${stories[storyIndex].title}"?`}
                    </div>
                    <div className="modal-subtitle">
                        {`Are you sure you want to delete ${stories[storyIndex].title}?`}
                    </div>
                </div>
                <div className="row dark-grey modal-options">
                    <div className="underline-button" style={{ marginLeft: 'auto' }} onClick={this._onCancel}>
                        {`Cancel`}
                    </div>
                    <div className="delete-button" onClick={this._onDelete}>
                        {`Delete Story`}
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({
        modalParams: state.modal.modalParams,
        stories: state.story.stories,
    }),
    {
        deleteStory,
        showModalByKey,
        navigate,
    }
)(DeleteStory)