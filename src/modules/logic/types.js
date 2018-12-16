export const logicType = {
    none: 'logicType/none',
    if: 'logicType/if',
    else: 'logicType/else',
    elseif: 'logicType/elseif',
    operator: 'logicType/operator',
    function: 'logicType/function',
    return: 'logicType/return',
    update: 'logicType/update',
}

export const comparisonType = {
    e: {
        key: 'e',
        code: '===',
        title: '===',
    },
    nE: {
        key: 'nE',
        code: '!==',
        title: '!==',
    },
    gT: {
        key: 'gT',
        code: '>',
        title: '>',
    },
    gTOET: {
        key: 'gTOET',
        code: '>=',
        title: '≥',
    },
    lT: {
        key: 'lT',
        code: '<',
        title: '>',
    },
    lTOET: {
        key: 'lTOET',
        code: '<=',
        title: '≤',
    },
}

export const valueType = {
    nC: {
        key: 'nC',
        title: 'no change',
        icon: 'mdi mdi-swap-horizontal-bold',
    },
    null: {
        key: 'null',
        title: 'null',
        label: 'null',
        icon: 'mdi mdi-null',
    },
    i: {
        key: 'i',
        title: 'increment',
        icon: 'mdi mdi-numeric-1-box',
    },
    iB: {
        key: 'iB',
        title: 'increment by',
        icon: 'mdi mdi-alpha-n-box',
    },
    d: {
        key: 'd',
        title: 'decrement',
        icon: 'ion-md-arrow-round-down',
    },
    dB: {
        key: 'dB',
        title: 'decrement by',
        icon: 'ion-md-download',
    },
}

export const logicTypeInfo = {
    [logicType.none]: {
        title: 'none',
        icon: 'ion-md-create',
        color: '#767676',
    },
    [logicType.if]: {
        title: 'if',
        icon: 'ion-md-help',
        color: '#af8c40',
    },
    [logicType.else]: {
        title: 'else',
        icon: 'ion-ios-more',
        color: '#db4757',
    },
    [logicType.elseif]: {
        title: 'else if',
        icon: 'ion-ios-more',
        color: '#0e7db4',
    },
    [logicType.operator]: {
        title: 'operator',
        icon: 'ion-md-code-working',
        color: 'Mediumslateblue'
    },
    [logicType.function]: {
        title: 'function',
        icon: 'ion-md-pulse',
        color: '#3864ab',
    },
    [logicType.return]: {
        title: 'return',
        icon: 'ion-ios-send',
        color: '#1e9939',
    },
    [logicType.update]: {
        title: 'update',
        icon: 'mdi mdi-code-braces',
        color: '#a566b0',
    },
}

export const defaultLogic = {
    START: {
        logicType: logicType.none,
    }
}