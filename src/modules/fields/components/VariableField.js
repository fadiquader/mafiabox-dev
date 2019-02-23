import React from 'react'
import _ from 'lodash'

import { updateSourceType } from '../../common/types'
import { variableType } from '../../logic/types'
import { dropdownType } from '../../dropdown/types';

class VariableField extends React.Component{
    render() {
        const { value, fieldKey, path } = this.props
        
        return (
            <div className="row -x-p">
                {_(value)
                    .toArray()
                    .filter(i => i.name)
                    .value()
                    .map((item, index) => (
                        <div key={index} className="row">
                            <i 
                                className={`${variableType[item.variableType || variableType.any.key].icon} logic-label app-onclick`}
                                menu-type={dropdownType.writeVarType}
                                app-onclick-props={JSON.stringify({
                                    fieldKey,
                                    tagKey: item.key,
                                    currentValue: item.variableTypes, //TODO this needs ot be mapped now
                                    path: [...path, item.key],
                                    updateSource: updateSourceType.function,
                                })}
                                style={{
                                    color: '#fff',
                                }}
                            />
                            <div
                                className="property-button app-onclick"
                                menu-type={dropdownType.editVarName}
                                app-onclick-props={JSON.stringify({
                                    fieldKey,
                                    tagKey: item.key,
                                    attachVar: value,
                                    currentValue: item.name,
                                })}
                                style={{
                                    backgroundColor: 'rgba(40, 43, 48,1)',
                                    marginRight: 6,
                                }}
                            >
                                {item.name}
                            </div>
                        </div>
                    )
                )}
                <div
                    className="property-button app-onclick"
                    menu-type={dropdownType.addVar}
                    app-onclick-props={JSON.stringify({
                        fieldKey,
                        attachVar: value,
                        path,
                        updateSource: updateSourceType.function,
                    })}
                    style={{
                        backgroundColor: 'hsla(0,0%,100%,.1)',
                    }}
                >
                    add var
                </div>
            </div>
        )
    }
}

export default VariableField