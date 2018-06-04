var nodes = new vis.DataSet([]);
var edges = new vis.DataSet([]);
var computerBtnSubmit,
    routerBtnSubmit,
    iDIR = './images/',
    counter = 0,
    optionSelector,
    routerForm,
    computerForm,
    wapForm,
    wapBtnSubmit;

//populating container
window.addEventListener("load",setup);

function setup(){
    var container = document.getElementById('network');
    var data = {
        nodes: nodes,
        edges: edges
    };
    var options = { groups:{
        routers:{},
        computers:{}
    }};
    var network = new vis.Network(container, data, options);

    computerForm = document.getElementById('node-computer');
    computerBtnSubmit = document.getElementById('computer-btn');
    computerBtnSubmit.addEventListener('click',function(event){
        updateMap('computer');
    });
    routerForm = document.getElementById('node-router');
    routerBtnSubmit = document.getElementById('router-btn');
    routerBtnSubmit.addEventListener('click',function(event){
        updateMap('router');
    });
    wapForm = document.getElementById('node-wap');
    wapBtnSubmit = document.getElementById('wap-submit');
    wapBtnSubmit.addEventListener('click',function(event){
        updateMap('wap');
    });
    optionSelector = document.getElementById('optionSelector');
    optionSelector.addEventListener('change',function(){
        console.log(optionSelector.value);
        if(optionSelector.value === 'computer'){
            const names = getAllNames();
            const compSrcSelector = document.getElementById('computer-src-selector');
            names.forEach(function(element){
               compSrcSelector.options[compSrcSelector.options.length] = new Option(element);
            });
            document.getElementById('node-computer').style.display = 'block';
            document.getElementById('node-router').style.display = 'none';
            document.getElementById('node-wap').style.display = 'none';
        }
        else if(optionSelector.value === 'router'){
            document.getElementById('node-router').style.display = 'block';
            document.getElementById('node-computer').style.display = 'none';
            document.getElementById('node-wap').style.display = 'none';
        }
        else if(optionSelector.value === 'wap'){

            document.getElementById('node-router').style.display = 'none';
            document.getElementById('node-computer').style.display = 'none';
            document.getElementById('node-wap').style.display = 'block';
            const routers = getRouters();
            const wapSrcSelector = document.getElementById('wap-src-selector');
            routers.forEach(function(element){
                wapSrcSelector.options[wapSrcSelector.options.length] = new Option(element);
            });
        }
    });
}

//Returns a list of names of  created nodes
function getAllNames(){
    let names = [];
    const compIds = nodes.getIds({
        filter: function(node){
            return(node.group === 'computers');
        }
    });
    compIds.forEach(function(element){
        names.push(nodes.get(element).label);
    });

    const routerIds = nodes.getIds({
        filter: function(node){
            return(node.group === 'routers');
        }
    });

    routerIds.forEach(function(element){
        names.push(nodes.get(element).label);
    });

    return names;
}

function getRouters(){
    let names = [];
    const routerIds = nodes.getIds({
        filter: function(node){
            return(node.group === 'routers');
        }
    });

    routerIds.forEach(function(element){
        names.push(nodes.get(element).label);
    });

    return names;
}

function updateMap(choice) {

    console.log(choice+' was selected');
    if(choice === 'computer'){
        addComputer();
    }
    else if(choice === 'router'){
        addRouter();
    }
    else if(choice === 'wap'){
        addWap();
    }
    else {
        console.log('Nothing');
    }
}

function addComputer(){

    //retrieve a single node that matches the following filter
    const srcs = nodes.getIds({
        filter: function(node){
            return(node.label === document.getElementById('computer-src-selector').value);
        }
    });
    console.log(srcs);

    const dst = { id: ++counter,
                label: document.getElementById("computer-label-dst").value,
                title: document.getElementById('dst').value};
    console.log(dst);
    
    //If the SRC exists, add it to the DST
    //Else , just add the node
    if(srcs.length != 0){
        const src = nodes.get(srcs[0]);
        nodes.update([{id:dst.id,
                       label: dst.label,
                       title: 'IP: '+dst.title,
                       shape: 'image',
                       image: iDIR+'laptop.png',
                       group: 'computers'}]);
        edges.update({from: src.id, to: dst.id});
    }
    else{
        nodes.update([{id: dst.id,
                       label: dst.label,
                       image: iDIR+'laptop.png',
                       shape:'image',
                       title: 'IP: '+dst.title,
                       group: 'computers'}]);
    }

}

function addRouter(){
    nodes.update([{id: ++counter,
                   label: document.getElementById('router-label').value,
                   title: 'IP: '+document.getElementById('router-src').value,
                   image: iDIR+'router.png',
                   shape: 'image',
                   group: 'routers'
                  }]);
}

function addWap(){
    const routerId = nodes.getIds({
        filter: function(node){
            return(node.label === document.getElementById('wap-src-selector').value);
        }
    });

    console.log(routerId);
    nodes.update([{id: ++counter,
                   label: document.getElementById('wap-label').value,
                   title: 'Router Source: '+document.getElementById('wap-src-selector').value,
                   image: iDIR+'wireless.png',
                   shape: 'image',
                   group: 'routers'
                  }]);
    edges.update({from: nodes.get(routerId[0]).id, to: counter});
}














