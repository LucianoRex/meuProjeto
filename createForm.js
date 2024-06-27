async function fetchOptions(apiEndpoint) {
    const apiUrls = {
        'generos': 'https://api.example.com/generos',
        'cidades': 'https://api.example.com/cidades',
        'interesses': 'https://jsonplaceholder.typicode.com/users',
     //   'planos': 'https://jsonplaceholder.typicode.com/users',
        'aluno': 'http://localhost:3000/aluno',
    };

    const apiUrl = apiUrls[apiEndpoint];
    if (
        !apiUrl) {
        //alert()
        return []}; // Retorna um array vazio se o endpoint não for reconhecido

    try {
const response = await fetch(apiUrl);
if (!response.ok) {
    throw new Error(`Erro na requisição para ${apiUrl}: ${response.status} - ${response.statusText}`);
}
const data = await response.json();
return data; // Retorna os dados obtidos da API
} catch (error) {
console.error(error.message);
return []; // Retorna um array vazio em caso de erro
}
}

async function createForm(config, exampleData = {}) {
    const formTitle = document.createElement('h1');
    formTitle.textContent = config.formTitle;

    const form = document.createElement('form');
    form.id = 'generatedForm';
    form.className = 'row'; // Adicionando classe para validação do Bootstrap

    const container = document.createElement('div');
    container.className = 'container'; // Adicionando classe container do Bootstrap

    for (const field of config.fields) {
        let formGroup = document.createElement('div');
        formGroup.className = `form-group ${field.class}`;

        let label = document.createElement('label');
        label.setAttribute('for', field.id);
        label.textContent = field.label;

        let input;

        switch (field.type) {
            case 'text':
            case 'email':
            case 'password':
            case 'date':
                input = document.createElement('input');
                input.type = field.type;
                input.className = 'form-control'; // Adicionando classe form-control do Bootstrap
                input.id = field.id;
                input.placeholder = field.placeholder;
                input.required = field.required;
                if (exampleData[field.id]) {
                    input.value = exampleData[field.id];
                }
                break;
            case 'textarea':
                input = document.createElement('textarea');
                input.className = 'form-control'; // Adicionando classe form-control do Bootstrap
                input.id = field.id;
                input.placeholder = field.placeholder;
                input.required = field.required;
                if (exampleData[field.id]) {
                    input.value = exampleData[field.id];
                }
                break;
            case 'select':
                input = document.createElement('select');
                input.className = 'form-control'; // Adicionando classe form-control do Bootstrap
                input.id = field.id;
                input.required = field.required;
                if (field.options && field.options.length > 0) {
                    field.options.forEach(option => {
                        let opt = document.createElement('option');
                        opt.value = option;
                        opt.textContent = option;
                        if (exampleData[field.id] && exampleData[field.id] === option) {
                            opt.selected = true;
                        }
                        input.appendChild(opt);
                    });
                } else if (field.fetchOptionsFunction) {
                    try {
                        const options = await field.fetchOptionsFunction();
                        options.forEach(option => {
                            let opt = document.createElement('option');
                            opt.value = option[field.value];
                            opt.textContent = option[field.textContent];
                            if (exampleData[field.id] && exampleData[field.id] === option[field.value]) {
                                opt.selected = true;
                            }
                            input.appendChild(opt);
                        });
                    } catch (error) {
                        console.error('Erro ao carregar opções:', error);
                    }
                }
                break;
            case 'checkbox':
                input = document.createElement('div');
                input.className = 'form-check'; // Adicionando classe form-check do Bootstrap
                if (field.options && field.options.length > 0) {
                    field.options.forEach(option => {
                        let checkboxDiv = document.createElement('div');
                        checkboxDiv.className = 'form-check';

                        let checkbox = document.createElement('input');
                        checkbox.type = 'checkbox';
                        checkbox.className = 'form-check-input'; // Adicionando classe form-check-input do Bootstrap
                        checkbox.id = `${field.id}-${option}`;
                        checkbox.name = field.id;
                        checkbox.value = option;
                        if (exampleData[field.id] && exampleData[field.id].includes(option)) {
                            checkbox.checked = true;
                        }

                        let checkboxLabel = document.createElement('label');
                        checkboxLabel.className = 'form-check-label';
                        checkboxLabel.setAttribute('for', `${field.id}-${option}`);
                        checkboxLabel.textContent = option;

                        checkboxDiv.appendChild(checkbox);
                        checkboxDiv.appendChild(checkboxLabel);
                        input.appendChild(checkboxDiv);
                    });
                } else if (field.fetchOptionsFunction) {
                    try {
                        const options = await field.fetchOptionsFunction();
                        options.forEach(option => {
                            console.log(option)
                            let checkboxDiv = document.createElement('div');
                            checkboxDiv.className = 'form-check';

                            let checkbox = document.createElement('input');
                            checkbox.type = 'checkbox';
                            checkbox.className = 'form-check-input'; // Adicionando classe form-check-input do Bootstrap
                            checkbox.id = `${field.id}-${option.id}`;
                            checkbox.name = field.id;
                            checkbox.value = option[field.value];
                            checkbox.setAttribute('value',option[field.value])
                           // console.log(field)
                            if (exampleData[field.id] && exampleData[field.id].includes(option[field.value])) {
                                checkbox.checked = true;
                            }

                            let checkboxLabel = document.createElement('label');
                            checkboxLabel.className = 'form-check-label';
                            checkboxLabel.setAttribute('for', `${field.id}-${option}`);
                            checkboxLabel.textContent = option[field.textContent];

                            checkboxDiv.appendChild(checkbox);
                            checkboxDiv.appendChild(checkboxLabel);
                            input.appendChild(checkboxDiv);
                        });
                    } catch (error) {
                        console.error('Erro ao carregar opções:', error);
                    }
                }
                break;
            case 'radio':
                input = document.createElement('div');
                input.className = 'form-check'; // Adicionando classe form-check do Bootstrap
                if (field.options && field.options.length > 0) {
                    field.options.forEach(option => {
                        let radioDiv = document.createElement('div');
                        radioDiv.className = 'form-check';

                        let radio = document.createElement('input');
                        radio.type = 'radio';
                        radio.className = 'form-check-input'; // Adicionando classe form-check-input do Bootstrap
                        radio.id = `${field.id}-${option}`;
                        radio.name = field.id;
                        radio.value = option;
                        if (exampleData[field.id] && exampleData[field.id] === option) {
                            radio.checked = true;
                        }

                        let radioLabel = document.createElement('label');
                        radioLabel.className = 'form-check-label';
                        radioLabel.setAttribute('for', `${field.id}-${option}`);
                        radioLabel.textContent = option;

                        radioDiv.appendChild(radio);
                        radioDiv.appendChild(radioLabel);
                        input.appendChild(radioDiv);
                    });
                } else if (field.fetchOptionsFunction) {
                    try {
                        const options = await field.fetchOptionsFunction();
                        options.forEach(option => {
                            let radioDiv = document.createElement('div');
                            radioDiv.className = 'form-check';

                            let radio = document.createElement('input');
                            radio.type = 'radio';
                            radio.className = 'form-check-input'; // Adicionando classe form-check-input do Bootstrap
                            radio.id = `${field.id}-${option}`;
                            radio.name = field.id;
                            radio.value = option[field.value];
                            if (exampleData[field.id] && exampleData[field.id] === option[field.value]) {
                                radio.checked = true;
                            }

                            let radioLabel = document.createElement('label');
                            radioLabel.className = 'form-check-label';
                            radioLabel.setAttribute('for', `${field.id}-${option}`);
                            radioLabel.textContent = option[field.textContent];

                            radioDiv.appendChild(radio);
                            radioDiv.appendChild(radioLabel);
                            input.appendChild(radioDiv);
                        });
                    } catch (error) {
                        console.error('Erro ao carregar opções:', error);
                    }
                }
                break;
        }

        formGroup.appendChild(label);
        if (input) formGroup.appendChild(input);
        form.appendChild(formGroup);
    }

    let submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.className = 'btn btn-success mt-3'; // Adicionando classes btn e btn-success do Bootstrap
    submitButton.textContent = 'Enviar';
    form.appendChild(submitButton);

    form.addEventListener('submit', async function(event) {
        event.preventDefault();
        let formData = {};
        for (const field of config.fields) {
            if (field.type === 'checkbox') {
                formData[field.id] = [];
                form.querySelectorAll(`input[name="${field.id}"]:checked`).forEach(checkbox => {
                    formData[field.id].push(checkbox.value);
                });
            } else if (field.type === 'radio') {
                let selectedRadio = form.querySelector(`input[name="${field.id}"]:checked`);
                if (selectedRadio) {
                    formData[field.id] = selectedRadio.value;
                }
            } else {
                formData[field.id] = form.querySelector(`#${field.id}`).value;
            }
        }
        console.log(formData);

        try {
            const response = await fetch('http://localhost:3000/create-document/Cliente', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error(`Erro ao fazer POST para ${response.url}: ${response.status} - ${response.statusText}`);
            }

            const data = await response.json();
            console.log('Resposta do servidor:', data);
            alert('Formulário enviado com sucesso!');
            // Aqui você pode adicionar lógica adicional após enviar o formulário com sucesso
        } catch (error) {
            console.error('Erro ao enviar formulário:', error);
            alert('Ocorreu um erro ao enviar o formulário. Por favor, tente novamente.');
        }
    });

    container.appendChild(form);
    return container;
}

