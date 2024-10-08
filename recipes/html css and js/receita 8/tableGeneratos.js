export function generateTable(dataArray, elementId = 'dataDiv', headers = {}) {
    const container = document.getElementById(elementId);

    if (!dataArray.length) {
        container.innerHTML = "<div>Nenhum dado disponível.</div>";
        return;
    }

    const keys = Object.keys(headers).length ? Object.keys(headers) : Object.keys(dataArray[0]);
    const headerHtml = keys.map(key => `<th>${headers[key] || key}</th>`).join('');

    const rowsHtml = dataArray.map(item => {
        const row = keys.map(key => `<td>${item[key]}</td>`).join('');
        return `<tr>${row}</tr>`;
    }).join('');

    container.innerHTML = `
        <table>
            <thead>
                <tr>${headerHtml}</tr>
            </thead>
            <tbody>
                ${rowsHtml}
            </tbody>
        </table>`;
}

async function carregarDados() {
    try {
        const response = await fetch("https://random-data-api.com/api/v2/users?size=5");

        if (!response.ok) {
            throw new Error('Erro ao carregar os dados da API');
        }

        const users = await response.json();

        const headers = {
            first_name: "Nome",
            last_name: "Sobrenome",
            email: "E-mail",
            username: "Usuário"
        };

        generateTable(users, 'dataDiv', headers);
    } catch (error) {
        console.error(error);
        document.getElementById("dataDiv").innerHTML = "<div>Erro ao carregar os dados...</div>";
    }
}

document.getElementById("loadDataButton").addEventListener("click", carregarDados);
