var nodes = new vis.DataSet([]);
var edges = new vis.DataSet([]);
var btnSubmit,
    counter = 0;

//populating container
window.addEventListener("load",setup);

function setup(){
    var container = document.getElementById('network');
    var data = {
        nodes: nodes,
        edges: edges
    };
    var options = {};
    var network = new vis.Network(container, data, options);

    btnSubmit = document.getElementById('btn-submit');
    btnSubmit.addEventListener('click',updateMap);
}

function updateMap() {
    let dst = { id: ++counter, label: document.getElementById("dst").value};
    console.log(dst);
    let src = {id: ++counter, label:document.getElementById("src").value};
    console.log(src);
    var ids = {
        src: nodes.getIds({
            filter: function(node){
                return(node.label === src.label);
            }
        }),
        dst: nodes.getIds({
            filter: function(node){
                return(node.label === dst.label);
            }
        })
    };
    console.log(id);
    if(id[0] > 0 ||  id.length > 0){
        nodes.update([{id:dst.id, label: dst.label}]);
        edges.update({from: id[0], to: dst.id});
    }
    else{
        nodes.update([{id: src.id, label: src.label},
                      {id: dst.id, label: dst.label}]);
        edges.update([{from: src.id, to: dst.id}]);
    }
}
