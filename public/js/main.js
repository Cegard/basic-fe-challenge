
var request = new XMLHttpRequest();
request.open("GET", "/data/nav.json", true);


var changeSubMenuDisplay = function(subMenu){
	
	return function(){
		
		if (subMenu.style.display == "block")
			subMenu.style.display = "";
		
		else
			subMenu.style.display = "block";
	};
};




var hideSubMenuDisplay = function(subMenu){
	
	return function(){
		subMenu.style.display = "";
	};
};


var createMenuItem = function(content, entryClass, entryContentClass){
	var menuItem = document.createElement("li");
	var itemContent = document.createElement("a");
	itemContent.innerHTML = content.label;
	itemContent.setAttribute("href", content.url);
	menuItem.appendChild(itemContent);
	menuItem.classList.add(entryClass);
	itemContent.classList.add(entryContentClass);
	
	return menuItem;
};


var createMenu = function(menuEntries, entryClass, entryContentClass){
	var menuList = document.createElement("ul");

	for (let item of menuEntries){
		var menuItem = createMenuItem(item, entryClass, entryContentClass);
		menuList.appendChild(menuItem);
		
		if (item.items != undefined && item.items.length > 0){
			var subMenu = createMenu(item.items, "sub_item", "sub_content");
			subMenu.classList.add("sub_menu");
			menuItem.appendChild(subMenu);
			menuItem.addEventListener("click", changeSubMenuDisplay(subMenu));
			menuItem.addEventListener("focusout", hideSubMenuDisplay(subMenu));
		}
	}
	
	return menuList;
};


request.onreadystatechange = function(aEvt){
	
	if (request.readyState == 4){
		
		if (request.status == 200){
			var navMenu = createMenu(JSON.parse(request.responseText).items, "main_item",
									 "main_content");
			navMenu.classList.add("main_menu");
			document.getElementsByClassName("bar_menu")[0].appendChild(navMenu);
		}
	}
};


request.send(null);