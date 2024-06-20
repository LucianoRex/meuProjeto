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
            
            welcomeScreen.setAttribute('style','display:none !important');
            
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
    menuItems.addEventListener('click', function(event) {
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
    navTabs.addEventListener('click', function(event) {
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