document.addEventListener("DOMContentLoaded", function() {
  const formConfig = [
      { type: 'text', label: 'Nome', id: 'nome', placeholder: 'Digite seu nome', class: 'col-md-6' },
      { type: 'email', label: 'Email', id: 'email', placeholder: 'Digite seu email', class: 'col-md-6' },
      { type: 'password', label: 'Senha', id: 'senha', placeholder: 'Digite sua senha', class: 'col-md-6' },
      { type: 'textarea', label: 'Mensagem', id: 'mensagem', placeholder: 'Digite sua mensagem', class: 'col-12' },
      { type: 'select', label: 'Gênero', id: 'genero', options: ['Masculino', 'Feminino', 'Outro'], class: 'col-md-6' },
      { type: 'checkbox', label: 'Interesses', id: 'interesses', options: ['Esportes', 'Música', 'Tecnologia'], class: 'col-md-6' },
      { type: 'radio', label: 'Plano', id: 'plano', options: ['Básico', 'Premium'], class: 'col-md-6' },
      { type: 'submit', label: 'Enviar', class: 'col-12' }
  ];

  function createInputField(field) {
      let formGroup = document.createElement('div');
      formGroup.className = `form-group ${field.class}`;

      if (field.type !== 'submit' && field.type !== 'checkbox' && field.type !== 'radio') {
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

      if (field.type !== 'checkbox' && field.type !== 'radio') {
          formGroup.appendChild(input);
      }

      return formGroup;
  }

  const formContainer = document.getElementById('form-container');
  const form = document.createElement('form');
  let row;
  let currentColWidth = 0;

  formConfig.forEach(field => {
      const inputField = createInputField(field);
      const colClass = field.class.match(/col-\w+-(\d+)/);
      const colWidth = colClass ? parseInt(colClass[1]) : 12;

      if (currentColWidth + colWidth > 12) {
          formContainer.appendChild(row);
          row = document.createElement('div');
          row.className = 'row';
          currentColWidth = 0;
      }

      if (!row) {
          row = document.createElement('div');
          row.className = 'row';
      }

      currentColWidth += colWidth;
      row.appendChild(inputField);
  });

  if (row) {
      formContainer.appendChild(row);
  }

  formContainer.appendChild(form);
});
