function createMeasuresArray(meals) {
    const measures = [];

    for (let i = 1; i < 20; i++) {
        if (meals["strMeasure" + i]) {
            let trimmedMeasure = meals["strMeasure" + i].trim();
            if (trimmedMeasure) {
                measures.push(trimmedMeasure);
            }
        }
    }

    return measures
}

export default createMeasuresArray;