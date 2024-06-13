
function buscaMenu(menu) {
    return new Promise((resolve) =>{
  switch (menu){
  case '01':
      setTimeout(() => {
          return resolve([
            { text: "Dashboard" },
            {
              text: "Orders",
              submenu: [
                { text: "New Order", link: "1" },
                { text: "Pending Orders", link: "2" },
                { text: "Completed Orders", link: "3" },
                { text: "New Order", link: "4" },
                { text: "Pending Orders", link: "5" },
                { text: "Completed Orders", link: "6" },
                { text: "New Order", link: "7" },
                { text: "Pending Orders", link: "8" },
                { text: "Completed Orders", link: "9" },
                { text: "New Order", link: "10" },
                { text: "Pending Orders", link: "11" },
                { text: "Completed Orders", link: "12" },
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
          ]);
        }, 100);
        break;
        case '02':
          setTimeout(() => {
              return resolve([
                { text: "Dashdsfdsfsboard" },
                {
                  text: "Orsdfdsfsdfders",
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
              ]);
            }, 100)
  }
  
  
      }
    );
  }

  export{buscaMenu}