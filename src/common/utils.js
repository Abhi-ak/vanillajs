export const removeNode = (id) => {
    var tbl = document.getElementById(id);
    if (tbl) tbl.parentNode.removeChild(tbl);
  };
  
  export const createElement = (element) => {
    let option = document.createElement(element);
    return option;
  };
  