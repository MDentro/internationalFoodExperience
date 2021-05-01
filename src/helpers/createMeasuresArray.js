function createMeasuresArray (meals) {
    const measures = [];

    for (let i = 1; i < 20; i++) {
        if(meals["strMeasure" + i]) {
            measures.push(meals["strMeasure" + i]);
        }
    }

    return measures
}

export default createMeasuresArray;