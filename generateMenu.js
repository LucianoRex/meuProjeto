 function generateMenu(a){
    document.querySelector("#spinner").style.display = "none";

  const menuContainer = document.getElementById("menuItems");

  function busca() {   
    var url = "http://localhost:3000/lista-telas";

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data)
           // transformMenuData(data);
            
    const transformedData = transformMenuData(data);
    const sidebar = document.getElementById('sidebar');
    createMenu(transformedData, menuContainer);
            //document.getElementById("response").innerText = JSON.stringify(data, null, 2);
            //loadPage(data.username, JSON.stringify([data.address,data.company]));
        
        })
        .catch(error => console.error('Error:', error));
}

  const menuData = [
    { id: 1, title: 'Home', caminho: '' },
    { id: 2, title: 'Phones', caminho: 'Products/Electronics/Phones' },
    { id: 3, title: 'Laptops', caminho: 'Products/Electronics/Laptops' },
    { id: 3, title: 'Acolhido', caminho: 'Acolhimento/Acolhido2' },
    { id: 4, title: 'Washing Machines', caminho: 'Products/Home Appliances/Washing Machines' },
    { id: 5, title: 'Refrigerators', caminho: 'Products/Home Appliances/Refrigerators' },
    { id: 6, title: 'About', caminho: '' },
    { id: 7, title: 'Contact', caminho: '' }
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
          currentLevel[part]._nome = item.nome;
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
  
      const nome = menuData[key]._nome || key;
      li.textContent = nome;
  
      const hasSubmenus = Object.keys(menuData[key]).some(k => !k.startsWith('_'));
  
      li.addEventListener('click', function(e) {
        e.stopPropagation();
        if (hasSubmenus) {
          const submenu = li.querySelector('.submenu');
          if (submenu) {
            submenu.style.display = submenu.style.display === 'none' ? 'block' : 'none';
          }
        } else {
          //alert(`Clicked on ${title}, ID: ${menuData[key]._id}`);

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
  
  
    busca();
  

}
function makeRequest(_id) {   
    var url = "http://localhost:3000/carrega-tela/"+_id;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            //document.getElementById("response").innerText = JSON.stringify(data, null, 2);
            loadPage(data.nome, data.html,data.css,data.js);
        
        })
        .catch(error => console.error('Error:', error));
}


export {generateMenu}