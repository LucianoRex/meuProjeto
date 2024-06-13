let tabCount = 1;

const navTabs = document.querySelector("#navTabs");

function loadPage(id, html,javascript) {
  if (document.querySelector(`#navTabs button[data-nome="${id}"]`)) {
    const existingTab = document.querySelector(
      `#navTabs button[data-nome="${id}"]`
    );
    $(existingTab).tab("show");
    return;
  }

  // Criar nova aba
  const tabId = `tab-${tabCount}`;
  const tabContentId = `tabContent-${tabCount}`;
  const newTab = document.createElement("li");
  newTab.classList.add("nav-item");
  newTab.innerHTML = `
          <button class="nav-link" data-nome="${id}" id="${tabId}" data-toggle="tab" 
          href="#${tabContentId}" role="tab" aria-controls="${tabContentId}" 
          aria-selected="true">
              ${id}<button type="button" class="close" aria-label="Close">
              <span aria-hidden="true" style="margin-left: 10px;">&times;</span>
            </button>
          </button>`;
  navTabs.appendChild(newTab);

  // Adicionar conteúdo da página à nova aba
  const newTabContent = document.createElement("div");
  newTabContent.classList.add("tab-pane", "fade");

  //newTabContent.classList.add("active");
  if (navTabs.querySelector("a.nav-link")) {
    $(navTabs.querySelectorAll("a.nav-link:last-child")).tab("show");
  }
  newTabContent.id = tabContentId;
  //newTabContent.setAttribute("role", "btn-success");
  newTabContent.innerHTML = html;
console.log(javascript)
  var newScript = document.createElement("script");
  var inlineScript = document.createTextNode(javascript);
  newScript.appendChild(inlineScript);
  document.body.appendChild(newScript);

  //document.body.appendChild(script);
  document.getElementById("tabContent").appendChild(newTabContent);

  // Ativar a nova aba
  $(`#${tabId}`).tab("show");
  tabCount++;

  // Adicionar evento de fechar aba

  newTab.querySelector(".close").addEventListener("click", function () {
    const tab = document.getElementById(tabContentId);
    tab.parentNode.removeChild(tab);

    newTab.parentNode.removeChild(newTab);
    console.log(newTab.parentNode);
    if (navTabs.querySelector("button.nav-link")) {
      $(navTabs.querySelector("button.nav-link:last-child")).tab("show");
      //$(navTabs.lastElementChild.querySelector('.nav-link')).tab('show')
    }

    // Se não houver mais abas, carregar uma nova página no main
    if (tabCount === 0) {
      // alert()
      //document.getElementById("mainContent").innerHTML='<h1>lsdjsnf</h1>'
    }
  });
}

// Mapeamento dos HTMLs para cada item do submenu
const pages = [
  {
    id: "new_order",
    content: "<h2>Dashboard</h2><p>This is the Dashboard page.</p>",
  },
  {
    id: "new_order2",
    content: "<h2>order 2</h2><p>This is the Dashboard page.</p>",
  },
  {
    id: "new_order3",
    content: "<h2>Order 3</h2><p>This is the Dashboard page.</p>",
  },
  {
    id: "new_order4",
    content: "<h2>Order 3</h2><p>This is the Dashboard page.</p>",
  },
  {
    id: "new_order5",
    content: "<h2>Order 3</h2><p>This is the Dashboard page.</p>",
  },
  {
    id: "new_order6",
    content: "<h2>Order 3</h2><p>This is the Dashboard page.</p>",
  },
];
