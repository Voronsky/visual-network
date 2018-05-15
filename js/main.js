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
    btnSubmit.addEventListener('click',updateNodes);
}

function updateNodes() {
    let dst = document.getElementById("dst").value;
    console.log(dst);
    let src = document.getElementById("src").value;
    console.log(src);
    nodes.update([{id: counter++, label: src},
                  {id: counter++, label: dst}]);
    var id = nodes.getIds({
        filter: function(node){
            return(node.label === src);
        }
    });
    if( id > 0 ){
        edges.update([{from: id, to: 2}]);
    }else {
        edges.update([{from: 1, to: 2}]);
    }
    console.log(id);
}
