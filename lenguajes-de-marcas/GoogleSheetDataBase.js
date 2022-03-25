function GoogleSheetDataBaseOperation(
    idGoogleSheet,
    data,
    operationFinished
) {
    const request = {
        method: "POST",
        body: JSON.stringify(data),
    };

    const url = "https://script.google.com/macros/s/" + idGoogleSheet + "/exec";

    fetch(url, request)
        .then(response => response.json())
        .then(response => operationFinished(response));
}

/**
 * Crea un elemento `div` que contiene a todos los elementos leídos.
 * @param {*} values 
 * @returns 
 */
function createListOfElements(values) {
    // Comprobamos que se puede ejecutar la función.
    if (!values) {
        console.error("No existe el argumento 'values'.");
        return;
    }

    if (values.length <= 0) {
        console.error("El argumento 'values' debe tener al menos una fila.");
        return;
    }

    // Extraemos las columnas de la primera fila
    const columnNames = Object.keys(values[0]);

    // Creamos un `div` cuya clase es "content";
    const divContent = document.createElement("div");
    divContent.className = "content";
    
    // Recorremos todos los objetos que se han leído.
    for (let row = 0; row < values.length; row++) {
        const divForRow = document.createElement("div");
        divForRow.className = "row";

        const h3 = document.createElement("h3");
        h3.innerHTML = "Fila: " + (row+1);
        divForRow.append(h3);

        // Insertamos las celdas que conforman la fila
        for (let col = 0; col < columnNames.length; col++) {
            const strongTitle = document.createElement("strong");
            strongTitle.innerHTML = columnNames[col];

            const spanText = document.createElement("span");
            spanText.innerHTML =  values[row][columnNames[col]];

            const paragraphForColumn = document.createElement("p");
            paragraphForColumn.className = "column";

            paragraphForColumn.append(strongTitle);
            paragraphForColumn.append(": ");
            paragraphForColumn.append(spanText);

            divForRow.append(paragraphForColumn);
        }

        divContent.append(divForRow);
    }

    return divContent;
}

/**
 * Crea un objeto tabla a partir de los valores leídos desde una consulta "select" a la base de datos
 * genérica basada en una hoja de cálculo de Google.
 * 
 * @param values 
 * @returns Un objeto "table" que se puede "append" a cualquier otro objeto de la página web. 
 */
 function createTable(values) {
    // Comprobamos que se puede ejecutar la función.
    if (!values) {
        console.error("No existe el argumento 'values'.");
        return;
    }

    if (values.length <= 0) {
        console.error("El argumento 'values' debe tener al menos una fila.");
        return;
    }

    // Extraemos las columnas de la primera fila
    const columnNames = Object.keys(values[0]);

    // Creamos la tabla
    const table = document.createElement("table");

    // Creamos la primera fila de la tabla utilizando los nombres de las columnas
    let rowForTitle = document.createElement("tr");

    // Una celda para indicar la fila
    const thForRow = document.createElement("th");
    thForRow.innerHTML = "Fila";
    rowForTitle.append(thForRow);

    for (let i = 0; i < columnNames.length; i++) {
        const theader = document.createElement("th");
        theader.innerHTML = columnNames[i];
        rowForTitle.append(theader);
    }

    table.append(rowForTitle);

    // Insertamos el resto de los elementos en la tabla mediante filas

    for (let row = 0; row < values.length; row++) {
        const rowForData = document.createElement("tr");

        const tdForRowNumber = document.createElement("td");
        tdForRowNumber.innerHTML = row+1;
        rowForData.append(tdForRowNumber);

        // Insertamos las celdas que conforman la fila
        for (let col = 0; col < columnNames.length; col++) {
            const td = document.createElement("td");
            td.innerHTML = values[row][columnNames[col]];
            rowForData.append(td);
        }

        table.append(rowForData);
    }

    // Devolvemos la tabla final
    return table;
}

