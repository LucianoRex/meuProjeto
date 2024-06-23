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

    // Ocultar tela de boas-vindas ao abrir uma aba
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
            showWelcomeScreen()

        }

        // Exibir tela de boas-vindas se não houver mais abas
        /*if (tabs.length === 0) {
            showWelcomeScreen();
        }*/
    }
});


async function loadList(id, html, css, javascript) {
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
   // const posts = await fetchPosts();

     //   newTabContent.appendChild(generateTable(posts));
     generateTable().then(e=>newTabContent.appendChild(e))
  
    //attachEditAndDeleteListeners(posts);    

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




// Função para buscar os posts do JSONPlaceholder
async function fetchPosts() {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  }
  
  // Função para gerar a tabela dinâmica com Bootstrap
  async function generateTable() {
    let posts =  await fetchPosts();
    const container = document.createElement('div');
    container.innerHTML = ''; // Limpa o conteúdo existente da div
  
    const table = document.createElement('table');
    table.classList.add('table', 'table-striped');
  
    const thead = document.createElement('thead');
    thead.innerHTML = `
      <tr>
        <th>ID</th>
        <th>Título</th>
        <th>Corpo</th>
        <th>Ações</th>
      </tr>
    `;
    table.appendChild(thead);
  
    const tbody = document.createElement('tbody');
    posts.forEach(post => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${post.id}</td>
        <td>${post.title}</td>
        <td>${post.body}</td>
        <td>
          <button type="button" class="btn btn-primary btn-sm edit-btn" data-id="${post.id}">Editar</button>
          <button type="button" class="btn btn-danger btn-sm delete-btn" data-id="${post.id}">Excluir</button>
        </td>
      `;
      tbody.appendChild(row);
    });
  
    table.appendChild(tbody);
    container.appendChild(table);
    return container;
  
    //attachEditAndDeleteListeners(posts);
  }
  
  // Função para adicionar listeners aos botões de editar e excluir
  function attachEditAndDeleteListeners(posts) {
    const editButtons = document.querySelectorAll('.edit-btn');
    editButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const postId = parseInt(btn.getAttribute('data-id'));
        const post = posts.find(p => p.id === postId);
        if (post) {
          // Simulate edit action (replace with actual edit logic)
          alert(`Editing post with ID ${postId}: ${post.title}`);
        }
      });
    });
  
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const postId = parseInt(btn.getAttribute('data-id'));
        const index = posts.findIndex(p => p.id === postId);
        if (index !== -1) {
          posts.splice(index, 1);
          generateTable(posts);
          // Simulate delete action (replace with actual delete logic)
          alert(`Deleted post with ID ${postId}`);
        }
      });
    });
  }
  
  // Função principal para inicializar a aplicação
  async function init() {
    try {
      const posts = await fetchPosts();
      generateTable(posts);
    } catch (error) {
      console.error('Error initializing:', error);
    }
  }
  
  // Chamada para inicializar a aplicação quando o DOM estiver pronto
//  document.addEventListener('DOMContentLoaded', init);
  
