document.addEventListener("DOMContentLoaded", function () {
  const menuItems = [
    { text: "Dashboard" },
    {
      text: "Orders",
      submenu: [
        { text: "New Order", link: "new_order" },
        { text: "Pending Orders", link: "new_order3" },
        { text: "Completed Orders", link: "new_order2" },
      ],
    },
    {
      text: "Products",
      link: "#",
      submenu: [
        { text: "New Product", link: "#" },
        { text: "Inventory", link: "#" },
        { text: "Categories", link: "#" },
      ],
    },
    { text: "Customers", link: "#" },
    {
      text: "Reports",
      link: "#",
      submenu: [
        { text: "Sales Report", link: "#" },
        { text: "Customer Report", link: "#" },
      ],
    },
    { text: "Integrations", link: "#" },
  ];

  const menuContainer = document.getElementById("menuItems");

  menuItems.forEach((item, index) => {
    const li = document.createElement("li");
    li.classList.add("nav-item");

    const a = document.createElement("a");
    a.classList.add("nav-link");
    // a.href = item.link;
    a.textContent = item.text;

    li.appendChild(a);

    if (item.submenu && item.submenu.length > 0) {
      const submenuId = `submenu-${index}`;
      console.log(submenuId);
      a.setAttribute("data-toggle", "collapse");
      a.setAttribute("aria-expanded", "false");
      a.setAttribute("aria-controls", submenuId);
      a.href = `#${submenuId}`;

      const submenuDiv = document.createElement("div");
      submenuDiv.classList.add("collapse");
      submenuDiv.id = submenuId;

      const submenuUl = document.createElement("ul");
      submenuUl.classList.add("nav", "flex-column", "ml-3");

      item.submenu.forEach((subitem) => {
        const subLi = document.createElement("li");
        subLi.classList.add("nav-item");

        const subA = document.createElement("a");
        subA.classList.add("submenu");
        subA.classList.add("nav-link");
        subA.href = subitem.link;
        console.log(subitem.link);
        subA.textContent = subitem.text;

        subA.setAttribute("href", subitem.link);
        subA.setAttribute("data-nome", subitem.link);
        subA.setAttribute("link", subitem.link);

        subLi.appendChild(subA);
        submenuUl.appendChild(subLi);
      });

      submenuDiv.appendChild(submenuUl);
      li.appendChild(submenuDiv);
    }
    9;
    menuContainer.appendChild(li);
  });
});

document.addEventListener("DOMContentLoaded", function () {
  //const tabContent = document.querySelector('#tabContent');

  let tabCount = 1;

  //const mainContent = document.querySelector("main");
  //const navTabs = document.querySelector('#navTabs');

  // Função para carregar a página no main
  /*function loadPage(html) {
   //mainContent.innerHTML = html;

  }*/
  const navTabs = document.querySelector("#navTabs");

  function loadPage(id,html) {

    if(document.querySelector(`#navTabs a[data-nome="${id}"]`)){
        
        const existingTab = document.querySelector(`#navTabs a[data-nome="${id}"]`);
            $(existingTab).tab('show');
            return;
    }

    //debugger;
    console.log(html)
    // Criar nova aba
    const tabId = `tab-${tabCount}`;
    const tabContentId = `tabContent-${tabCount}`;
    const newTab = document.createElement("li");
    newTab.classList.add("nav-item");
    newTab.innerHTML = `
        <a class="nav-link" data-nome="${id}" id="${tabId}" data-toggle="tab" 
        href="#${tabContentId}" role="tab" aria-controls="${tabContentId}" 
        aria-selected="true">
            ${id}<button type="button" class="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </a>`;
    navTabs.appendChild(newTab);

    // Adicionar conteúdo da página à nova aba
    const newTabContent = document.createElement("div");
    newTabContent.classList.add("tab-pane", "fade");
    /*if (tabCount === 0) {
      newTabContent.classList.add("show", "active");
    }*/

    //newTabContent.classList.add("show", "success");
    if (navTabs.querySelector('a.nav-link')) {
                $(navTabs.querySelectorAll('a.nav-link:last-child')).tab('show');
            }
    newTabContent.id = tabContentId;
    newTabContent.setAttribute("role", "btn-success");
    newTabContent.innerHTML = html;
    document.getElementById("tabContent").appendChild(newTabContent);

    // Ativar a nova aba
    $(`#${tabId}`).tab("show");
    tabCount++;

    // Adicionar evento de fechar aba

    
    newTab.querySelector(".close").addEventListener("click", function () {
      const tab = document.getElementById(tabContentId);
      tab.parentNode.removeChild(tab);

      newTab.parentNode.removeChild(newTab);
      if (navTabs.querySelector('a.nav-link')) {
        
        $(navTabs.querySelectorAll('a.nav-link:last-child')).tab('show');
    }

      // Se não houver mais abas, carregar uma nova página no main
      if (tabCount === 0) {
        loadRandomPage();
      }
    });
  }

  // Função para adicionar um item de menu e aba correspondente
  /*function addMenuItemAndTab(title, content) {
       // Adiciona o item de menu
       const menuItem = document.createElement('li');
       menuItem.classList.add('nav-item');
       menuItem.innerHTML = `
           <a class="nav-link" href="#tab-${tabCount}" data-toggle="tab" role="tab" aria-controls="tab-${tabCount}" aria-selected="true">${title}</a>
       `;
       menuItems.appendChild(menuItem);

       // Adiciona a aba correspondente
       const tabPane = document.createElement('div');
       tabPane.classList.add('tab-pane', 'fade');
       if (tabCount === 0) {
           tabPane.classList.add('show', 'active');
       }
       tabPane.id = `tab-${tabCount}`;
       tabPane.setAttribute('role', 'tabpanel');
       tabPane.innerHTML = content;
       tabContent.appendChild(tabPane);

       tabCount++;

  }*/

  // Mapeamento dos HTMLs para cada item do submenu
  const pages=[
    {
        id:'new_order',
        content:"<h2>Dashboard</h2><p>This is the Dashboard page.</p>",
    },
    {
        id:'new_order2',
        content:"<h2>Dasjhjjhboard</h2><p>This is the Dashboard page.</p>",
    },
    {
        id:'new_order3',
        content:"<h2>Dasjhjjhboard</h2><p>This is the Dashboard page.</p>",
    }
  ];
  

  // Adiciona o manipulador de evento de clique aos links do submenu
  document.querySelectorAll(".submenu.nav-link").forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault(); // Evita que o link seja seguido normalmente
      // const pageId = link;
      const pageId = link.dataset.nome;
      console.log(link.dataset.nome);
      //loadPage(pages[pageId]);

      //addMenuItemAndTab(pageId, pages[pageId])
      loadPage(pageId,pages.find(e=>e.id == pageId).content);
    });
  });

  // Carrega uma página predefinida ao iniciar
  //const initialPageId = "dashboard"; // Defina a página inicial aqui
  //loadPage(pages[initialPageId]);
});
