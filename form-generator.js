document.addEventListener("DOMContentLoaded", function() {
    const formTitle = "Formulário de Cadastro";

    const formConfig = [
        { type: 'text', label: 'Nome', id: 'nome', placeholder: 'Digite seu nome', class: 'col-md-6' },
        { type: 'email', label: 'Email', id: 'email', placeholder: 'Digite seu email', class: 'col-md-6' },
        { type: 'password', label: 'Senha', id: 'senha', placeholder: 'Digite sua senha', class: 'col-md-6' },
        { type: 'date', label: 'Data nasc.', id: 'data', placeholder: '2000-01-01', class: 'col-3' },
        { type: 'textarea', label: 'Mensagem', id: 'mensagem', placeholder: 'Digite sua mensagem', class: 'col-12' },
        { type: 'select', label: 'Gênero', id: 'genero', options: ['Masculino', 'Feminino', 'Outro'], class: 'col-md-6' },
        { type: 'checkbox', label: 'Interesses', id: 'interesses', options: ['Esportes', 'Música', 'Tecnologia'], class: 'col-md-6' },
        { type: 'radio', label: 'Plano', id: 'plano', options: ['Básico', 'Premium'], class: 'col-md-6' },
        { type: 'button', label: 'Abrir Modal', id: 'modalBtn', class: 'btn btn-primary', modalTarget: 'exampleModal' },


        { type: 'submit', label: 'Enviar', class: 'col-12' }
    ];

    function createInputField(field) {
        let formGroup = document.createElement('div');
        formGroup.className = `form-group ${field.class}`;

        if (field.type !== 'submit' && field.type !== 'checkbox' && field.type !== 'radio' && field.type !== 'button') {
            let label = document.createElement('label');
            label.setAttribute('for', field.id);
            label.textContent = field.label;
            formGroup.appendChild(label);
        }

        let input;

        switch (field.type) {
            case 'text':
            case 'email':
            case 'password':
            case 'date':
                input = document.createElement('input');
                input.type = field.type;
                input.className = 'form-control';
                input.id = field.id;
                input.placeholder = field.placeholder;
                break;
            case 'textarea':
                input = document.createElement('textarea');
                input.className = 'form-control';
                input.id = field.id;
                input.placeholder = field.placeholder;
                break;
                case 'button':
                    input = document.createElement('button');
                    input.type = 'button';
                    input.className = field.class;
                    input.textContent = field.label;
                    input.dataset.toggle = 'modal';
                    input.dataset.target = `#${field.modalTarget}`;
                    input.onclick = function(){alert()};
                    formGroup.appendChild(input);
                    break;
            case 'select':
                input = document.createElement('select');
                input.className = 'form-control';
                input.id = field.id;
                field.options.forEach(option => {
                    let optionElement = document.createElement('option');
                    optionElement.value = option;
                    optionElement.textContent = option;
                    input.appendChild(optionElement);
                });
                break;
            case 'checkbox':
                let checkboxLabel = document.createElement('label');
                checkboxLabel.className = 'form-label';
                checkboxLabel.textContent = field.label;
                formGroup.appendChild(checkboxLabel);

                field.options.forEach(option => {
                    let checkboxWrapper = document.createElement('div');
                    checkboxWrapper.className = 'form-check';

                    let checkboxInput = document.createElement('input');
                    checkboxInput.type = 'checkbox';
                    checkboxInput.className = 'form-check-input';
                    checkboxInput.name = field.id;
                    checkboxInput.id = `${field.id}_${option}`;
                    checkboxInput.value = option;

                    let checkboxOptionLabel = document.createElement('label');
                    checkboxOptionLabel.setAttribute('for', `${field.id}_${option}`);
                    checkboxOptionLabel.className = 'form-check-label';
                    checkboxOptionLabel.textContent = option;

                    checkboxWrapper.appendChild(checkboxInput);
                    checkboxWrapper.appendChild(checkboxOptionLabel);
                    formGroup.appendChild(checkboxWrapper);
                });
                break;
            case 'radio':
                let radioLabel = document.createElement('label');
                radioLabel.className = 'form-label';
                radioLabel.textContent = field.label;
                formGroup.appendChild(radioLabel);

                field.options.forEach(option => {
                    let radioWrapper = document.createElement('div');
                    radioWrapper.className = 'form-check';

                    let radioInput = document.createElement('input');
                    radioInput.type = 'radio';
                    radioInput.className = 'form-check-input';
                    radioInput.name = field.id;
                    radioInput.id = `${field.id}_${option}`;
                    radioInput.value = option;

                    let radioOptionLabel = document.createElement('label');
                    radioOptionLabel.setAttribute('for', `${field.id}_${option}`);
                    radioOptionLabel.className = 'form-check-label';
                    radioOptionLabel.textContent = option;

                    radioWrapper.appendChild(radioInput);
                    radioWrapper.appendChild(radioOptionLabel);
                    formGroup.appendChild(radioWrapper);
                });
                break;
            case 'submit':
                input = document.createElement('button');
                input.type = 'submit';
                input.className = 'btn btn-primary';
                input.textContent = field.label;
                formGroup.appendChild(input);
                return formGroup;
        }

        if (field.type !== 'checkbox' && field.type !== 'radio' && field.type !== 'button') {
            formGroup.appendChild(input);
        }

        return formGroup;
    }

    function generateRandomData() {
        const randomData = [];
        for (let i = 0; i < 5; i++) { // Gerar 5 linhas de dados aleatórios
            randomData.push({
                nome: `Nome${i + 1}`,
                email: `email${i + 1}@example.com`,
                senha: `senha${i + 1}`,
                data: `1986-10-01`,
                mensagem: `Mensagem ${i + 1}`,
                genero: ['Masculino', 'Feminino', 'Outro'][Math.floor(Math.random() * 3)],
                interesses: ['Esportes', 'Música', 'Tecnologia'].filter(() => Math.random() > 0.5).join(', '),
                plano: ['Básico', 'Premium'][Math.floor(Math.random() * 2)]
            });
        }
        return randomData;
    }

    function openModal(modalId) {
        $(`#${modalId}`).modal('show');
    }

    function populateTable(data) {
        const table = document.createElement('table');
        table.className = 'table';
        const tableHead = document.createElement('thead');
        const tableBody = document.createElement('tbody');

        const headerRow = document.createElement('tr');
        formConfig.forEach(field => {
            const th = document.createElement('th');
            th.textContent = field.label;
            headerRow.appendChild(th);
        });
        tableHead.appendChild(headerRow);

        data.forEach(item => {
            const row = document.createElement('tr');
            formConfig.forEach(field => {
                const cell = document.createElement('td');
                cell.textContent = item[field.id];
                row.appendChild(cell);
            });
            row.addEventListener('click', () => fillForm(item));
            tableBody.appendChild(row);
        });

        table.appendChild(tableHead);
        table.appendChild(tableBody);

        const tableContainer = document.getElementById('table-container');
        tableContainer.innerHTML = '';
        tableContainer.appendChild(table);
    }

    function fillForm(data) {
        document.getElementById('nome').value = data.nome;
        document.getElementById('email').value = data.email;
        document.getElementById('senha').value = data.senha;
        document.getElementById('data').value = data.data;
        document.getElementById('mensagem').value = data.mensagem;
        document.getElementById('genero').value = data.genero;

        document.querySelectorAll(`[name='interesses']`).forEach(checkbox => {
            checkbox.checked = data.interesses.split(', ').includes(checkbox.value);
        });

        document.querySelectorAll(`[name='plano']`).forEach(radio => {
            radio.checked = radio.value === data.plano;
        });
    }

    // Ordenação da tabela
    function sortTable(column) {
        const tableBody = document.querySelector("#data-table tbody");
        const rows = Array.from(tableBody.querySelectorAll("tr"));
        const sortedRows = rows.sort((a, b) => {
            const aValue = a.querySelector(`[data-column="${column}"]`).textContent;
            const bValue = b.querySelector(`[data-column="${column}"]`).textContent;
            return aValue.localeCompare(bValue);
        });
        tableBody.innerHTML = '';
        sortedRows.forEach(row => tableBody.appendChild(row));
    }

    // Gerar dados aleatórios para a tabela e preencher o formulário com base nos dados
    const randomData = generateRandomData();
    populateTable(randomData);

    // Gerar formulário
    const formContainer = document.getElementById('form-container');
    const form = document.createElement('form');
    form.classList.add('row');
    formConfig.forEach(field => {
        const inputField = createInputField(field);
        form.appendChild(inputField);
    });
    formContainer.appendChild(form);
    const formTitleElement = document.getElementById('form-title');
    formTitleElement.textContent = formTitle;
});

