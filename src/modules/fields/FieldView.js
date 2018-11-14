import React from 'react'
import './field.css'
import { connect } from 'react-redux';

import { fieldType } from './defaults'

import { updatePage } from '../page/PageReducer'

import InputField from './components/InputField'
import TagField from './components/TagField';
import PhaseTriggerField from './components/PhaseTriggerField';

class FieldView extends React.Component {
    _renderItem = (item) => {
        const { pageInfo, fieldRepo, updatePage } = this.props
        const fieldInfo = fieldRepo[item]
        const { fieldKey, data } = fieldInfo

        const props = {
            key: fieldKey,
            field: fieldKey,
            value: pageInfo[fieldKey],
            data,
            pageInfo,
            fieldInfo,
            updatePage,
        }
        
        switch(fieldInfo.fieldType) {
            case fieldType.text:
                return <InputField {...props}/>
            case fieldType.tag:
                return <TagField {...props}/>
            case fieldType.phaseTrigger:
                return <PhaseTriggerField {...props}/>
            default:
                return null
        }

    }

    render() {
        const { pageInfo } = this.props
        const { boardType } = pageInfo
        if (!boardType) return null
        
        const fields = this.props.fieldMap[boardType]

        return (
            <div>
                {fields.map(this._renderItem)}
            </div>
        )
    }
}

export default connect(
    state => ({
        fieldMap: state.field.fieldMap,
        fieldRepo: state.field.fieldRepo,
    }),
    {
        updatePage,
    }
)(FieldView)