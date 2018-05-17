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
    let src = {id: ++counter, label:document.getElementById("src").value};
    console.log(src);
    let dst = { id: ++counter, label: document.getElementById("dst").value};
    console.log(dst);

    //Check to see if any may exist already that have the exact labels
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
    console.log(ids.src);
    let sid = ids.src;
    console.log(ids.dst);
    let did = ids.dst;

    //If the SRC id already exists but the DST does not
    //else if the SRC and DST ids already exist, update the edge
    //else add 2 new nodes
    if(sid.length != 0 && did.length === 0){
        nodes.update([{id:dst.id, label: dst.label}]);
        edges.update({from: sid[0], to: dst.id});
    }
    else if(did.length != 0 && sid.length != 0){
        edges.update({from: sid[0], to: did[0]});
    }
    else{
        nodes.update([{id: src.id, label: src.label},
                      {id: dst.id, label: dst.label}]);
        edges.update([{from: src.id, to: dst.id}]);
    }
}
