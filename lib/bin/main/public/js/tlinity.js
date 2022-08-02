//var host = "http://192.168.100.160:7000/";
//var host = "http://os3-368-17375.vs.sakura.ne.jp:7000/";
var host = "http://localhost:7000/";
var queryType = "selectPGQL"
var user = "CAGLA"
var strgraph = "TLINITY"

/*
 * 
 *      index html 
 * 
 */
function PGQLQuery(){
    $('#output').text("");
    var txtarea = document.getElementById("txtareaPGQLQuery").value
    var txtareasplit = txtarea.split('\n')
    var txtareaSingleLine = txtareasplit.join(' ')
    var myObj

    if ($("#select1 > span").text() == "Insert Data Node"){
        queryType = "insertNode"
        myObj = {
            ID        	: document.getElementById("name").value,
            PROPERTIES  : document.getElementById("property").value,
            LABEL       : "Data",
            CREATEDBY   : user
        }
    } else if($("#select1 > span").text() == "Insert Dataset Node"){
        queryType = "insertNode"
        myObj = {
            ID        	: document.getElementById("name").value,
            PROPERTIES  : document.getElementById("property").value,
            LABEL       : "dataset",
            CREATEDBY   : user
        }
    } else if($("#select1 > span").text() == "Delete"){
        queryType = "delete"
        myObj = {
            ID	        : document.getElementById("deleteName").value,
            LABEL       : $("#deletenodetype > span").text()
        }
        document.getElementById("deleteName").value = ""
    } else if($("#select1 > span").text() == "Update Node"){
        queryType = "updateNode"
        myObj = {
            ID    	    : $("#displayAllNode > span").text().split(": ")[1],
            PROPERTIES  : document.getElementById("updateProperty").value,
            LABEL       : $("#displayAllNode > span").text().split(": ")[0]
        }
        $("#displayAllNode > span").text("Select Node")
    } else if($("#select1 > span").text() == "Insert Edges"){
        queryType = "insertEdge"
        if ($("#cb").is(':checked')) {
            queryType = "insertEdgeUpdateProperty"
        }
        myObj = {
            IDSRC    	: $("#displayAllNodeDoc > span").text().split(": ")[1],
            IDDST    	: $("#displayAllNodeData > span").text().split(": ")[1],
            ID       	: document.getElementById("edgeName").value,
            PROPERTIES  : document.getElementById("edgeProperty").value,
            CREATEDBY 	: user,
            LABEL       : document.getElementById("selectEdge").value
        }
        $("#displayAllNodeDoc > span").text("Select Source")
        $("#displayAllNodeData > span").text("Select Destination")
    } else if($("#select1 > span").text() ==  "Display As Graph"){
        queryType = "retrieveChild"
        myObj = {
            ID: $("#displayAllNodeGraph > span").text().split(": ")[1]
        }
        if($("#displayAllNodeGraph > span").text().split(": ")[0] == "EDGE"){
            queryType = "retrieveEdge"
        }
    } else if($("#select1 > span").text() ==  "Query"){
        queryType = "queryPGQL"
        myObj = {
            PGQL: txtareaSingleLine
        }
    } else{
        queryType = "selectPGQL"
        myObj = {
            PGQL: txtareaSingleLine
        }
    }
    // if(queryType=="nil"){
        
    // } else{
        var strUrl = host + queryType
        $.ajax({
            type: "POST",
            url:  strUrl,
            // contentType: "application/json",
            dataType: "JSON",
            data: JSON.stringify(myObj),
            success: function (data) {
                document.querySelectorAll(".txtbox").forEach(a=>a.value = "");
                var jsonStr = JSON.stringify(data, null, '\t');
                $('#output').text(jsonStr);
            }
        });
    // }
}

function nodeOnly(){
    document.getElementById("txtareaPGQLQuery").value = "SELECT v.id, v.properties, v.createdby, v.createddatetime, label(v) FROM MATCH (v) on " + strgraph
}

function deleteAll(){
    document.getElementById("txtareaPGQLQuery").value = "delete v from match (v) on " + strgraph
}

function getAll(){
    document.getElementById("txtareaPGQLQuery").value = "SELECT src.id as s_id, src.properties as s_properties, label(src) as s_label, e.id as e_id, label(e) as e_label, dst.id as id, dst.properties as d_properties, label(dst) as d_label FROM MATCH (src)-[e]->(dst) ON " + strgraph
}

function setSelectStatement(inputType){
    if (inputType == "Select"){
        document.querySelectorAll(".queryOption").forEach(a=>a.style.display = "none");
    } else{
        document.querySelectorAll(".queryOption").forEach(a=>a.style.display = "block");
    }
    document.getElementById("txtareaPGQLQuery").value = "SELECT src.id as s_id, src.properties as s_properties, label(src) as s_label, e.id as e_id, label(e) as e_label, dst.id as d_id, dst.properties as d_properties, label(dst) as d_label FROM MATCH (src)-[e]->(dst) ON " + strgraph
    document.getElementById("container1").style.display = "block"
    document.getElementById("container2").style.display = "none"
    document.getElementById("container3").style.display = "none"
    document.getElementById("container4").style.display = "none"
    document.getElementById("container5").style.display = "none"
    document.getElementById("container6").style.display = "none"
}

function setInsertDocStatement(){
    document.getElementById("container1").style.display = "none"
    document.getElementById("container2").style.display = "block"
    document.getElementById("container3").style.display = "none"
    document.getElementById("container4").style.display = "none"
    document.getElementById("container5").style.display = "none"
    document.getElementById("container6").style.display = "none"
}

function setInsertDataStatement(){
    document.getElementById("container1").style.display = "none"
    document.getElementById("container2").style.display = "block"
    document.getElementById("container3").style.display = "none"
    document.getElementById("container4").style.display = "none"
    document.getElementById("container5").style.display = "none"
    document.getElementById("container6").style.display = "none"
}

function setDeleteStatement(){
    document.getElementById("container1").style.display = "none"
    document.getElementById("container2").style.display = "none"
    document.getElementById("container3").style.display = "block"
    document.getElementById("container4").style.display = "none"
    document.getElementById("container5").style.display = "none"
    document.getElementById("container6").style.display = "none"
}

function setUpdateNodeStatement(){
    document.getElementById("container1").style.display = "none"
    document.getElementById("container2").style.display = "none"
    document.getElementById("container3").style.display = "none"
    document.getElementById("container4").style.display = "block"
    document.getElementById("container5").style.display = "none"
    document.getElementById("container6").style.display = "none"
}

function setInsertEdgesStatement(){
    document.getElementById("container1").style.display = "none"
    document.getElementById("container2").style.display = "none"
    document.getElementById("container3").style.display = "none"
    document.getElementById("container4").style.display = "none"
    document.getElementById("container5").style.display = "block"
    document.getElementById("container6").style.display = "none"
}

function setGraph(){
    document.getElementById("container1").style.display = "none"
    document.getElementById("container2").style.display = "none"
    document.getElementById("container3").style.display = "none"
    document.getElementById("container4").style.display = "none"
    document.getElementById("container5").style.display = "none"
    document.getElementById("container6").style.display = "block"
}

function listAllNode(ulID, label, changeSpanID){
    $("#" + ulID).empty()
    var ul = document.getElementById(ulID);
    var myObj = {
        "LABEL": label
    }
    if(ulID == "listAllNodeGraph"){
        const edgesLabel = ["CONTAINS", "LINEAGE"]
        for (var i=0; i<2; i++){
            var li = document.createElement("li");
            li.appendChild(document.createTextNode("EDGE: " + edgesLabel[i]));
            li.setAttribute("onClick", "getVal(this.innerText,'"+changeSpanID+"');");
            ul.appendChild(li);
        }
    }
    $.ajax({
        type: "POST",
        url:  host + "getAllNode",
        dataType: "JSON",
        data: JSON.stringify(myObj),
        success: function (data) {
            for(var i=0; i<data.length; i++){
                var li = document.createElement("li");
                var strDis = data[i].LABEL + ": " + data[i].ID
                li.appendChild(document.createTextNode(strDis));
                li.setAttribute("onClick", "getVal(this.innerText,'"+changeSpanID+"');");
                ul.appendChild(li);
            }
        }
    });
}

function getVal(name,spanID){
    if (spanID == "changeSpan"){
        document.getElementById(spanID).innerHTML = name
        var arr = name.split(": ");
        var myObj = {
            NAME    : arr[1],
            LABEL   : arr[0]
        }
        $.ajax({
            type: "POST",
            url:  host + "getOneNode",
            dataType: "JSON",
            data: JSON.stringify(myObj),
            success: function (data) {
                document.getElementById("updateProperty").value = data[0].PROPERTIES
            }
        });
    } else{
        document.getElementById(spanID).innerHTML = name
    }
}

/**
 * 
 *      Graph Maintenance
 * 
 **/
function query(){
    $('#output').text("");
    var txtarea = document.getElementById("txtareaPGQLQuery").value
    var txtareasplit = txtarea.split('\n')
    var txtareaSingleLine = txtareasplit.join(' ')
    var myObj
    if ($("#selectType > span").text() == "Create"){
        queryType = "createNewGraph"
        myObj = {
            CREATE : txtareaSingleLine
        }
    } else if($("#selectType > span").text() == "Drop"){
        queryType = "dropGraph"
        myObj = {
            GRAPHNAME: document.getElementById("dropGraph").value
        }
    }

    var strUrl = host + queryType
    $.ajax({
        type: "POST",
        url:  strUrl,
        dataType: "JSON",
        data: JSON.stringify(myObj),
        success: function (data) {
            document.querySelectorAll(".txtbox").forEach(a=>a.value = "");
            var jsonStr = JSON.stringify(data, null, '\t');
            $('#output').text(jsonStr);
        }
    });
}

function setCreate(){
    document.getElementById("container1").style.display = "block"
    document.getElementById("container2").style.display = "none"
}

function setDrop(){
    document.getElementById("container1").style.display = "none"
    document.getElementById("container2").style.display = "block"
}

function dropGraph(){
    var strGraphName = document.getElementById("dropGraph").value;
    document.getElementById("dropGraph").value = ""
}