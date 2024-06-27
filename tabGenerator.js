//import { createForm } from "./createForm";

const menuItems = document.querySelector('#menuItems');
const navTabs = document.querySelector('#navTabs');
const tabContent = document.querySelector('#tabContent');
let tabCount = 0; // Contador de abas

// Função para carregar página em uma aba
function loadPage(id, html, css, javascript) {
  // Verifica se a aba já existe
  if (document.querySelector(`#navTabs button[data-nome="${id}"]`)) {
    const existingTab = document.querySelector(`#navTabs button[data-nome="${id}"]`);
    $(existingTab).tab('show');
    return;
  }

  // Criar IDs únicos para a aba e o conteúdo da aba
  const tabId = `tab-${tabCount}`;
  const tabContentId = `tabContent-${tabCount}`;

  // Criar nova aba no navbar
  const newTab = document.createElement('li');
  newTab.classList.add('nav-item');
  newTab.innerHTML = `
    <button class="nav-link" data-nome="${id}" id="${tabId}" data-toggle="tab" href="#${tabContentId}" role="tab" aria-controls="${tabContentId}" aria-selected="true">
      ${id}
      <button type="button" class="close" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </button>`;
  navTabs.appendChild(newTab);

  // Criar conteúdo da aba
  const newTabContent = document.createElement('div');
  newTabContent.classList.add('tab-pane', 'fade');
  newTabContent.id = tabContentId;
  newTabContent.innerHTML = html;

  // Adicionar estilo CSS ao conteúdo da aba
  const style = document.createElement('style');
  style.textContent = `#${tabContentId} {${css}}`;
  newTabContent.appendChild(style);

  // Adicionar script JavaScript ao conteúdo da aba
  const script = document.createElement('script');
  script.textContent = javascript;
  newTabContent.appendChild(script);

  // Adicionar conteúdo da aba à área de conteúdo
  tabContent.appendChild(newTabContent);

  // Ativar a nova aba
  $(`#${tabId}`).tab('show');
  tabCount++;

  // Ocultar tela de boas-vindas se houver abas abertas
  hideWelcomeScreen();
}

// Função para ocultar tela de boas-vindas
function hideWelcomeScreen() {
  const welcomeScreen = document.querySelector('#welcomeScreen');
  if (welcomeScreen) {
    welcomeScreen.setAttribute('style', 'display:none !important');
  }
}

// Função para exibir tela de boas-vindas se não houver abas abertas
function showWelcomeScreen() {
  const welcomeScreen = document.querySelector('#welcomeScreen');
  if (welcomeScreen) {
    welcomeScreen.style.display = 'block';
  }
}

// Função para carregar tela de boas-vindas
function loadWelcomeScreen() {
  const welcomeHtml = `
    <div id="welcomeScreen" class="container-fluid d-flex align-items-center justify-content-center vh-100" style="background-image: url('https://via.placeholder.com/1500x1000'); background-size: cover; background-position: center; display: none;">
      <div class="text-center text-white">
        <h1 class="display-4 mb-4">Bem-vindo ao Sistema ERP</h1>
        <p class="lead mb-5">Este é o conteúdo da tela de boas-vindas do Sistema ERP.</p>
        <a href="#" class="btn btn-primary btn-lg">Começar</a>
      </div>
    </div>
  `;
  tabContent.innerHTML = welcomeHtml;
}

// Evento de clique para itens de menu (exemplo)
menuItems.addEventListener('click', function (event) {
  if (event.target.tagName === 'A') {
    const title = event.target.textContent.trim();
    const content = `<h2>Conteúdo do ${title}</h2><p>Este é o conteúdo do ${title.toLowerCase()}.</p>`;
    loadPage(title, content, '', '');
  }
});

// Evento para gerenciar a aba ativa
$('#navTabs').on('shown.bs.tab', 'button[data-toggle="tab"]', function (e) {
  document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
  e.target.classList.add('active');
  hideWelcomeScreen();
});

// Carregar tela de boas-vindas inicialmente se não houver abas abertas
if (tabCount === 0) {
  loadWelcomeScreen();
}

// Adicionar evento de fechar aba
navTabs.addEventListener('click', function (event) {
  if (event.target.closest('.close')) {
    const tabId = event.target.closest('.nav-item').querySelector('.nav-link').id;
    const tabContentId = event.target.closest('.nav-item').querySelector('.nav-link').getAttribute('href').substr(1);
    const tabs = Array.from(navTabs.querySelectorAll('.nav-link'));
    const index = tabs.findIndex(tab => tab.id === tabId);

    const tab = document.getElementById(tabContentId);
    tab.parentNode.removeChild(tab); // Remover conteúdo da aba
    event.target.closest('.nav-item').parentNode.removeChild(event.target.closest('.nav-item')); // Remover aba do navbar

    // Ativar aba anterior se existir
    if (index > 0) {
      const previousTabId = tabs[index - 1].id;
      $(`#${previousTabId}`).tab('show');
    } else if (tabs.length > 0) {
      const lastTabId = tabs[tabs.length - 1].id;
      $(`#${lastTabId}`).tab('show');
      showWelcomeScreen();
    }
  }
});

// Função para buscar os campos da API
async function fetchFields() {
  try {
    const response = await fetch('http://localhost:3000/campo-aluno');
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching fields:', error);
    return [];
  }
}

// Função para buscar os documentos da API com filtro
async function fetchDocumentsWithFilter(filterCriteria) {
  try {
    const response = await fetch(`http://localhost:3000/aluno?campo=${filterCriteria.campo}&operador=${filterCriteria.operador}&valor=${filterCriteria.valor}`);
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching documents with filter:', error);
    return [];
  }
}

// Função para criar e exibir modal de edição
// function createModal(fields) {
//   const modal = document.createElement('div');
//   modal.classList.add('modal', 'fade');
//   modal.id = 'editModal';
//   modal.tabIndex = -1;
//   modal.setAttribute('aria-labelledby', 'editModalLabel');
//   modal.setAttribute('aria-hidden', 'true');

//   const modalContent = document.createElement('div');
//   modalContent.classList.add('modal-dialog');
//   modalContent.innerHTML = `
//     <div class="modal-content">
//       <div class="modal-header">
//         <h5 class="modal-title" id="editModalLabel">Editar Documento</h5>
//         <button type="button" class="close" data-dismiss="modal" aria-label="Close">
//           <span aria-hidden="true">&times;</span>
//         </button>
//       </div>
//       <div class="modal-body">
//         <form id="editForm"></form>
//       </div>
//       <div class="modal-footer">
//         <button type="button" class="btn btn-primary" id="saveChanges">Salvar</button>
//       </div>
//     </div>
//   `;

//   document.body.appendChild(modal);

//   // Adicionar campos ao formulário no modal
//   const form = modalContent.querySelector('#editForm');
//   fields.forEach(field => {
//     const formGroup = document.createElement('div');
//     formGroup.classList.add('form-group');
//     formGroup.innerHTML = `
//       <label for="${field.campo}">${field.alias}</label>
//       <input type="text" class="form-control" id="${field.campo}" name="${field.campo}">
//     `;
//     form.appendChild(formGroup);
//   });

//   // Evento de clique no botão de salvar alterações
//   modalContent.querySelector('#saveChanges').addEventListener('click', () => {
//     // Implementar lógica para salvar as alterações
//     alert('Alterações salvas!');
//     $('#editModal').modal('hide');
//   });

//   modal.appendChild(modalContent);
// }

// Função para gerar tabela de documentos com filtro
async function generateTable(schema, documents) {
  const table = document.createElement('table');
  table.classList.add('table');
  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');



  return table;
}

// Função para aplicar o filtro
function applyFilter(fields) {
  const selectField = document.querySelector('#filterForm select:nth-child(1)').value;
  const selectOperator = document.querySelector('#filterForm select:nth-child(2)').value;
  const value = document.querySelector('#filterForm input').value;

  let filter = {};
  if (selectField && selectOperator && value) {
    if (selectOperator === 'equals') {
      filter[selectField] = value;
    } else if (selectOperator === 'contains') {
      filter[selectField] = { $regex: value, $options: 'i' };
    } else if (selectOperator === 'lt' || selectOperator === 'gt') {
      filter[selectField] = {};
      filter[selectField][`$${selectOperator}`] = parseFloat(value);
    }
  }

  // Chamar a função para buscar documentos com o filtro aplicado
  fetchDocuments(filter).then(documents => {
    const table = document.querySelector('table');
    table.parentNode.removeChild(table); // Remover tabela atual

    // Gerar nova tabela com documentos filtrados
    generateTable(fields, documents).then(newTable => {
      tabContent.appendChild(newTable);
    });
  });
}










async function loadList(data) {
  try {
    // Verifica se a aba já existe
    if (document.querySelector(`#navTabs button[data-nome="${data.nome}"]`)) {
      const existingTab = document.querySelector(`#navTabs button[data-nome="${data.nome}"]`);
      $(existingTab).tab('show');
      return;
    }

    // Criar IDs únicos para a aba e o conteúdo da aba
    const tabId = `tab-${tabCount}`;
    const tabContentId = `tabContent-${tabCount}`;

    // Criar nova aba no navbar
    const newTab = document.createElement('li');
    newTab.classList.add('nav-item');
    newTab.innerHTML = `
      <button class="nav-link" data-nome="${data.nome}" id="${tabId}" data-toggle="tab" href="#${tabContentId}" role="tab" aria-controls="${tabContentId}" aria-selected="true">
        ${data.nome}
        <button type="button" class="close" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </button>`;
    navTabs.appendChild(newTab);

    // Criar conteúdo da aba
    const newTabContent = document.createElement('div');
    newTabContent.classList.add('tab-pane', 'fade');
    newTabContent.id = tabContentId;

    // Criar cabeçalho da tabela (thead) com base nos campos
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    let campos = await fetchCampos(); // Buscar campos da API
    campos = campos || []; // Caso não haja campos, inicializa como array vazio
    campos.forEach(field => {
      const th = document.createElement('th');
      th.textContent = field.alias;
      headerRow.appendChild(th);
    });
    const thActions = document.createElement('th');
    thActions.textContent = 'Ações';
    headerRow.appendChild(thActions);
    thead.appendChild(headerRow);

    // Criar tabela (tbody será adicionado dinamicamente)
    const table = document.createElement('table');
    table.classList.add('table');
    table.appendChild(thead);

    // Criar formulário de filtro
    const filterForm = document.createElement('form');

    // Adicionar classes ao formulário de filtro
    filterForm.classList.add('form-inline', 'my-2');

    // Seleção do campo
    const selectField = document.createElement('select');
    selectField.classList.add('form-control', 'mr-2', 'mb-2');
    selectField.innerHTML = `<option value="">Selecione um campo</option>`;
    campos.forEach(field => {
      const option = document.createElement('option');
      option.value = field.campo;
      option.textContent = field.alias;
      selectField.appendChild(option);
    });

    // Operador de comparação
    const selectOperator = document.createElement('select');
    selectOperator.classList.add('form-control', 'mr-2', 'mb-2');
    selectOperator.innerHTML = `
  <option value="">Selecione um operador</option>
  <option value="equals">=</option>
  <option value="contains">Contém</option>
  <option value="gt">></option>
  <option value="lt"><</option>
`;

    // Campo de entrada
    const inputField = document.createElement('input');
    inputField.classList.add('form-control', 'mr-2', 'mb-2');
    inputField.type = 'text';
    inputField.placeholder = 'Valor para filtro';

    // Botão de OK
    const okButton = document.createElement('button');
    okButton.classList.add('btn', 'btn-primary', 'mb-2');
    okButton.textContent = 'OK';

    // Agrupar os elementos do formulário de filtro
    const filterGroup = document.createElement('div');
    filterGroup.classList.add('form-group', 'd-flex', 'align-items-center');
    filterGroup.appendChild(selectField);
    filterGroup.appendChild(selectOperator);
    filterGroup.appendChild(inputField);
    filterGroup.appendChild(okButton);

    // Adicionar o grupo ao formulário de filtro
    filterForm.appendChild(filterGroup);

    // Adicionar evento para aplicar filtro
    okButton.addEventListener('click', async (e) => {
      e.preventDefault()
      const fieldName = selectField.value;
      const operator = selectOperator.value;
      const value = inputField.value.trim();

      let filter = {};
      if (fieldName && operator && value) {
        switch (operator) {
          case 'equals':
            filter[fieldName] = value;
            break;
          case 'contains':
            filter[fieldName] = { $regex: value, $options: 'i' };
            break;
          case 'gt':
            filter[fieldName] = { $gt: parseFloat(value) };
            break;
          case 'lt':
            filter[fieldName] = { $lt: parseFloat(value) };
            break;
          default:
            break;
        }
      }

      try {
        // Buscar documentos com base no filtro
        const documents = await fetchDocuments(filter);

        // Limpar tabela atual antes de adicionar os novos dados
        const tbody = table.querySelector('tbody');
        if (tbody) {
          tbody.parentNode.removeChild(tbody);
        }

        // Criar novo corpo da tabela com os documentos filtrados
        const newTbody = document.createElement('tbody');
        documents.forEach(d => {
          const row = document.createElement('tr');
          campos.forEach(field => {
            const td = document.createElement('td');
            td.textContent = d[field.campo];
            row.appendChild(td);
          });
          const tdActions = document.createElement('td');
          tdActions.innerHTML = `
            <button class="btn btn-primary btn-sm edit-document" data-id="${d._id}">Editar</button>
            <button class="btn btn-danger btn-sm delete-document" data-id="${d._id}">Excluir</button>
          `;
          row.appendChild(tdActions);
          newTbody.appendChild(row);
        });

        // Adicionar novo corpo à tabela
        table.appendChild(newTbody);

      } catch (error) {
        console.error('Error fetching documents:', error);
      }
    });

    newTabContent.appendChild(filterForm);
    newTabContent.appendChild(table);

    tabContent.appendChild(newTabContent);
    $(`#${tabId}`).tab('show');
    tabCount++;
    hideWelcomeScreen();

  } catch (error) {
    console.error('Error loading list:', error);
  }
}


async function fetchCampos() {
  try {
    const response = await fetch('http://localhost:3000/campo-aluno');
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching campos:', error);
    return [];
  }
}

async function fetchDocuments(field, operator, value) {
  try {
    //const response = await fetch(`http://localhost:3000/aluno?filter=${field},${operator},${value}`);
    const response = await fetch(`http://localhost:3000/aluno`);
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching documents:', error);
    return [];
  }
}

// Evento de clique nos botões "Editar"
document.addEventListener('click', async function (event) {
  console.log(event.target)
  if (event.target.classList.contains('edit-document')) {
    const documentId = event.target.getAttribute('data-id');
    openEditModal(documentId);
  }
});

// Função para abrir o modal de edição
async function openEditModal(documentId) {
  console.log()
  try {
    // Buscar documento pelo ID
    const d = await fetchDocumentById(documentId);

    if (!d) {
      console.error(`Document with ID ${documentId} not found.`);
      return;
    }

    // Verificar se o modal já existe, caso contrário criar
    let modal = document.getElementById('editModal');
    if (!modal) {
      modal = createModal('Aluno');
      document.body.appendChild(modal);
    }

    // Buscar campos para preencher o modal
    const campos = await fetchCampos();

    // Limpar o conteúdo atual do formulário
    const form = modal.querySelector('#editForm');
    if (!form) {
      console.error('Form element not found in modal.');
      return;
    }
    form.innerHTML = '';

    // Adicionar campos ao formulário no modal
    /*campos.forEach(field => {
      console.log(d)
      const formGroup = document.createElement('div');
      formGroup.classList.add('form-group');
      formGroup.innerHTML = `
        <label for="${field.campo}">${field.alias}</label>
        <input type="text" class="form-control" id="${field.campo}" name="${field.campo}" value="${d[field.campo] || ''}">
      `;
      form.appendChild(formGroup);
    })*/

    // Exibir o modal
    createForm({
      formTitle: "Aluno",
      schemaName: "Cadastro",
      caminho:"Caminho/Caminho",
      nome:"nome",
      tipo:"tipo",
      fields: [
          { type: 'text', label: 'Nome', id: 'nome', placeholder: 'Digite seu nome', class: 'col-6', required: true },
          { type: 'text', label: 'Idade', id: 'idade', placeholder: 'Idade', class: 'col-md-6', required: true },
          { type: 'password', label: 'Senha', id: 'senha', placeholder: 'Digite sua senha', class: 'col-md-6', required: true },
          { type: 'text', label: 'CPF', id: 'cpf', placeholder: 'Digite seu CPF', class: 'col-md-6', required: true },
          { type: 'textarea', label: 'Mensagem', id: 'mensagem', placeholder: 'Digite sua mensagem', class: 'col-12', required: false },
          { type: 'select', label: 'Gênero', id: 'genero', options: ['Masculino', 'Feminino', 'Outro'], class: 'col-md-6', required: true, fetchOptionsFunction: () => fetchOptions('generos') },
          { type: 'select', label: 'Cidade', id: 'cidade', options: [], class: 'col-md-6', required: true, fetchOptionsFunction: () => fetchOptions('aluno'),textContent:'nome',value:'_id' },
          { type: 'checkbox', label: 'Interesses', id: 'interesses', options: [], class: 'col-md-6', required: false, fetchOptionsFunction: () => fetchOptions('interesses'),value:'name',textContent:'name' },
          { type: 'radio', label: 'Plano', id: 'plano', options: [], class: 'col-md-6', required: true, fetchOptionsFunction: () => fetchOptions('planos') },
          { type: 'date', label: 'Data de Nascimento', id: 'dataNascimento', class: 'col-md-6', required: true },
      ]
  },
 d).then(e=> form.appendChild(e) )
    
    $('#editModal').modal('show');
  } catch (error) {
    console.error('Error opening edit modal:', error);
  }
}

// Função para buscar documento pelo ID
async function fetchDocumentById(documentId) {
  try {
    const response = await fetch(`http://localhost:3000/aluno/${documentId}`);
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching document with ID ${documentId}:`, error);
    return null;
  }
}

// Função para criar o modal de edição
function createModal(titulo) {
  const modal = document.createElement('div');
  modal.classList.add('modal', 'fade');
  modal.id = 'editModal';
  modal.tabIndex = -1;
  modal.setAttribute('aria-labelledby', 'editModalLabel');
  modal.setAttribute('aria-hidden', 'true');

  modal.innerHTML = `
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="editModalLabel">${titulo}</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form id="editForm" class="row"></form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" id="saveChanges">Salvar</button>
        </div>
      </div>
    </div>
  `;

  // Evento de clique no botão de salvar alterações
  modal.querySelector('#saveChanges').addEventListener('click', () => {
    // Implementar lógica para salvar as alterações
    const form = modal.querySelector('#editForm');
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    console.log('Dados do formulário:', data);

    alert('Alterações salvas!');
    $('#editModal').modal('hide');
  });

  return modal;
}

