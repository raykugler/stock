
function search(){
  var criteria = document.getElementById('window').value;
  var capped = criteria.toUpperCase();
  var b= 0;
  var stockSymbol = new XMLHttpRequest();

  stockSymbol.open('GET','https://raykugler.github.io/stock/symbols.json');
  stockSymbol.onload=function() {
  var ourSymbol = JSON.parse(stockSymbol.responseText);

  var matches = [];
  var symbmatches = [];
  var l = 0;

    for(i = 0; i < ourSymbol.length; i++){

      if (capped.length == 0){
        console.log("empty");
      }

      else if(ourSymbol[i]["Company Name"].includes(capped)){
        matches.push(ourSymbol[i]["Company Name"]);
        symbmatches.push(ourSymbol[i]["Symbol"]);//console.log(matches[l]);
        var resultsRow = document.createElement("TR");
          resultsRow.setAttribute("class","rows");
          resultsTable.appendChild(resultsRow);

        var companyCell = document.createTextNode(matches[l]);
        var symbMatchCell = document.createTextNode(symbmatches[l]);
        var resultsCell = document.createElement("TD");
        var symbolCell = document.createElement("TD");
          resultsCell.appendChild(companyCell);
          symbolCell.appendChild(symbMatchCell);
          resultsRow.appendChild(symbolCell);
          resultsRow.appendChild(resultsCell);

        var buttonCell=document.createElement("TD")
        var x = document.createElement("BUTTON");
          resultsRow.appendChild(buttonCell);

          x.setAttribute("id", i);
          x.setAttribute("class","stockbuttons");
          var t = document.createTextNode("Stock 1");
          x.appendChild(t);
          buttonCell.appendChild(x);

          var y = document.createElement("BUTTON")
          y.setAttribute("class","stockbuttons");
          y.setAttribute("id", i + "B");
          var v = document.createTextNode("Stock 2");
          y.appendChild(v);
          buttonCell.appendChild(y);

        document.getElementById(i).addEventListener("click",placeOne());
        document.getElementById(i + "B").addEventListener("click",placeTwo());
        l++;
      }
      else {
        console.log("nothing here");
      }
    }
 };
      var resultsTable = document.createElement("TABLE");
      resultsTable.setAttribute("id","myTable");
      tableloc = document.getElementById("mainid");
      tableloc.appendChild(resultsTable);
      stockSymbol.send();

};
function placeOne(){
  var firstStock = document.getElementById('companyone').innerHTML;
  var result = document.getElementById("symbolone").value;
//  document.getElementById('placeone').innerHTML = result;
//  document.getElementById('companyone').innerHTML= companyName;
  console.log("Button ONE");
}

function placeTwo(){
  var secondStock = document.getElementById('companytwo').innerHTML;
  var result = document.getElementById("symboltwo").value;
document.getElementById('companyone').innerHTML = "result";
    //  document.getElementById('companytwo').innerHTML= companyName;
console.log("Button TWO");

}
function testrun() {
  console.log("TESTRUN");
}

function compare(){
  var symbOne = document.getElementById('placeone').innerHTML;
  var symbTwo = document.getElementById('placetwo').innerHTML;
  console.log(symbOne,symbTwo);
var symbOnePrice = new XMLHttpRequest();
  symbOnePrice.open('GET','https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=MSFT&apikey=demo');
  symbOnePrice.onload=function() {
    var onePrice = JSON.parse(symbOnePrice.responseText);
    var price = (onePrice["Time Series (Daily)"]["2018-01-26"]["4. close"]);
    console.log(price);
    document.getElementById('currentone').innerHTML = price;

  }
    //for(i = 0; i < onePrice.length; i++){
    /*  if(onePrice.dataset["dataset_code"] == "FB"){
        document.getElementById('currentone').innerHTML = "crazy";//onePrice[i]["data"];

      }
        else {

        }
        }
*/
symbOnePrice.send();
}
function init() {
document.getElementById("window").value = "";
document.getElementById("mainid").value = "";
}
window.onload = init;

/*function table() {
  var testarray = ["Apple", "Oranges", "Bananas", "Cherries"];
  var resultsTable = document.createElement("TABLE");
  var resultsRow = document.createElement("TR")
  var resultsCell = document.createElement("TD")
  var companyCell = document.createTextNode("Company Name Long")
}
*/


var testarray = ["Apple", "Oranges", "Bananas", "Cherries","Date"];

  /*function table() {

      var resultsTable = document.createElement("TABLE");
      resultsTable.setAttribute("id","myTable");
    for (i=0; i < red.length; i++){
      var resultsRow = document.createElement("TR");
      resultsRow.setAttribute("class","rows");
      resultsTable.appendChild(resultsRow);

      var companyCell = document.createTextNode(red[i]);


      var resultsCell = document.createElement("TD");
      resultsCell.appendChild(companyCell);
      resultsRow.appendChild(resultsCell);


      var buttonCell=document.createElement("TD")
      var x = document.createElement("BUTTON");
      resultsRow.appendChild(buttonCell);

      x.setAttribute("id", i);
      x.setAttribute("class","stockbuttons");
      var t = document.createTextNode("Stock 1");
      x.appendChild(t);
      buttonCell.appendChild(x);

      var y = document.createElement("BUTTON")
      y.setAttribute("class","stockbuttons");
      y.setAttribute("id", i + "B");
      var v = document.createTextNode("Stock 2");
      y.appendChild(v);
      buttonCell.appendChild(y);
      }

        tableloc = document.getElementById("mainid");
        tableloc.appendChild(resultsTable);
        console.log(tableloc);
        console.log(matches);
}

/*


*/

/*
var btn = document.getElementById("btn");
  btn.addEventListener("click",function(){
  var criteria = document.getElementById('window').value;
  var capped = criteria.charAt(0).toUpperCase() + criteria.slice(1, criteria.length);
  var b= 0;
  var stockSymbol = new XMLHttpRequest();
  stockSymbol.open('GET','https://learnwebcode.github.io/json-example/animals-1.json');
  stockSymbol.onload=function() {
    var ourSymbol = JSON.parse(stockSymbol.responseText);
    console.log(ourSymbol[0]);

    for(i = 0; i < ourSymbol.length; i++){
      if(ourSymbol[i].name == capped){
        document.getElementById('results').value = ourSymbol[i].species;
        b++
      }
        else {
          console.log("No Match");
          console.log(ourSymbol[i].name);
          console.log(capped);
        }
    }

  /*  function a(){
      var testsymbol = ourSymbol[0].species;
      return testsymbol;
    }
document.getElementById('results').value= a();
};

stockSymbol.send();

});
*/
/*function search(){
  var criteria = document.getElementById('window').innerHTML;
  var b= 0;
  for(i = 0, i < ourSymbol.length, i++){
    if(ourSymbol.species == "dog"){
      document.getElementById('results').value = ourSymbol[i].name;
      b++
    }
      else {
        console.log("No Match");
      }
}
}
*/


/*
function renderHTML(data){
  document.getElementById("results").value = stockSymbol;

}*/
