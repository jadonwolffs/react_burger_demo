export const updateObject = (oldObject, newValuesObject)=>{
    return {
        ...oldObject,
        ...newValuesObject
    };
};