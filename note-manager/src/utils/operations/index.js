export const updateObject = (obj, props) => {
    return {
        ...obj,
        ...props,
    };
};

export const updateArray = (array, selector, newPropsProvider) => {
    const index = array.findIndex(selector);
    return [
        ...array.slice(0, index),
        { ...array[index], ...newPropsProvider(array[index]) },
        ...array.slice(index + 1),
    ];
};

export const toLookup = (array, keySelector, valueSelector) => {
    return array.reduce((prevValue, currValue) => {
        const newValue = valueSelector(currValue);
        const key = keySelector(currValue);

        if (prevValue[key]) {
            prevValue[key].push(newValue);
        } else {
            prevValue[key] = [ newValue ];
        }
        return prevValue;
    }, {});
};

export const firstOrDefault = (array, filter, selector = x => x) => {
    var filteredValues = array.filter(filter);
    return filteredValues.length > 0
        ? selector(filteredValues[0])
        : null;
};
