

function generateMenu(/*a*/) {


  const menuContainer = document.getElementById("menuItems");
  const loadingOverlay = document.getElementById("loadingOverlay");

  //loadingOverlay.style.display = "block"; // Mostra o overlay de loading

  function busca() {
    loadingOverlay.style.display = "block"; // Mostra o overlay de loading


    var url = "http://localhost:3000/menu";

    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        // transformMenuData(data);

        const transformedData = transformMenuData(data);
        const sidebar = document.getElementById('sidebar');
        createMenu(transformedData, menuContainer);
        loadingOverlay.style.display = "none"; // Esconde o overlay de loading após carregar o menu
        //document.getElementById("response").innerText = JSON.stringify(data, null, 2);
        //loadPage(data.username, JSON.stringify([data.address,data.company]));

      })
      .catch(error => console.error('Error:', error));
    loadingOverlay.style.display = "block"; // Esconde o overlay de loading após carregar o menu
  }

  const menuData = [
    { id: 1, nome: 'Home', caminho: '' },
    { id: 2, nome: 'Phones', caminho: 'Products/Electronics/Phones' },
    { id: 3, nome: 'Laptops', caminho: 'Products/Electronics/Laptops' },
    { id: 3, nome: 'Acolhido', caminho: 'Acolhimento/Acolhido2' },
    { id: 4, nome: 'Washing Machines', caminho: 'Products/Home Appliances/Washing Machines' },
    { id: 5, nome: 'Refrigerators', caminho: 'Products/Home Appliances/Refrigerators' },
    { id: 6, nome: 'About', caminho: '' },
    { id: 7, nome: 'Contact', caminho: '' }
  ];

  function transformMenuData(menuData) {
    const transformedData = {};
  
    menuData.forEach(item => {
      const parts = item.caminho.split('/');
      let currentLevel = transformedData;
  
      parts.forEach((part, index) => {
        if (!currentLevel[part]) {
          currentLevel[part] = {};
        }
        if (index === parts.length - 1) {
          currentLevel[part]._title = part || 'Home';
          currentLevel[part]._id = item._id;
        }
        currentLevel = currentLevel[part];
      });
    });
  
    return transformedData;
  }
  
  function createMenu(menuData, parentElement) {
    const ul = document.createElement('ul');
    ul.className = 'list-group list-group-flush';
  
    for (const key in menuData) {
      if (key.startsWith('_')) continue;
  
      const li = document.createElement('li');
      li.className = 'list-group-item';
  
      const title = menuData[key]._title || key;
      li.textContent = title;
  
      const hasSubmenus = Object.keys(menuData[key]).some(k => !k.startsWith('_'));
  
      li.addEventListener('click', function(e) {
        e.stopPropagation();
        if (hasSubmenus) {
          const submenu = li.querySelector('.submenu');
          if (submenu) {
            submenu.style.display = submenu.style.display === 'none' ? 'block' : 'none';
          }
        } else {
          console.log(menuData[key]._id)
          makeRequest(menuData[key]._id)
        }
      });
  
      if (hasSubmenus) {
        const submenu = document.createElement('div');
        submenu.className = 'submenu';
        submenu.style.display = 'none'; // Ensure the submenu starts hidden
        createMenu(menuData[key], submenu);
        li.appendChild(submenu);
      }
  
      ul.appendChild(li);
    }
  
    parentElement.appendChild(ul);
  }

  busca()
}
  
function makeRequest(_id) {
  var url = `http://localhost:3000/carrega-menu/${_id}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      //document.getElementById("response").innerText = JSON.stringify(data, null, 2);
      if(data.tipo == 'tela'){
        loadPage(data.nome, data.html, data.css, data.js);
      }else if(data.tipo == 'lista'){
        console.log(data)
        //loadList(data);
        loadList(data)
      }else if(data.tipo='form'){
        loadForm(data.nome, data.html, data.css, data.js);
      }
      

    })
    .catch(error => console.error('Error:', error));
}


export { generateMenu }