function show_candidates(){
	cands=[];
	

	var ul = document.getElementById("list");
	for (let i=0;i<cands.length;i++){
		var li = document.createElement("li");
		li.appendChild(document.createTextNode(cands[i]));
		ul.appendChild(li);
	}
}

function add_candidate(){
	alert("Added "+document.getElementById("name").value);
	show_candidates();
}
