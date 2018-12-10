import React from 'react'
import FieldTemplateView from '../fields/FieldTemplateView';

class WindowTemplateView extends React.Component {
    render() {
        const { match } = this.props
        const { fieldMapKey } = match.params

        return (
            <div className="story-view">
                <FieldTemplateView fieldMapKey={fieldMapKey}/>
            </div>
        )
    }
}

export default WindowTemplateView