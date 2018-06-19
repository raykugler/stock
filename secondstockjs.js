/*
var input = document.getElementById("wind");
input.addEventListener("keyup", function(event) {
  event.preventDefault();
  if (event.keyCode === 13) {
    document.getElementById("icon").click();
  }
});
*/
document.getElementById("btn").addEventListener("mousedown", compare);

function search(){

      var criteria = document.getElementById('wind').value;
      var capped = criteria.toUpperCase();
      var b= 0;
    fetch('https://raykugler.github.io/stock/symbols.json')
    .then(function(r){
      return r.json();
    })

    .then(function(r){
  console.log('hello');


    var matches = [];
      console.log(r.length);
    for(i = 0; i < r.length; i++){
      if(r[i]["Company Name"].includes(capped) && capped.length > 3) {
        matches.push(r[i]["Company Name"]);
        matches.push(r[i]["Symbol"]);
        }
        else if (r[i]["Symbol"].includes(capped)) {
          matches.push(r[i]["Company Name"]);
          matches.push(r[i]["Symbol"]);

          }
        else {
          console.log("nope");
        }   }

    return matches;
    })
    .then(function (matches){
      p = 0;
      l = 4;
      var resultsTable = document.createElement("TABLE");
      resultsTable.setAttribute("id","myTable");
      for (f = 0; f < matches.length; f+=2){
        var resultsRow = document.createElement("TR");
        var companyCell = document.createTextNode(matches[f]);
        var symbMatchCell = document.createTextNode(matches[f+1]);
        var resultsCell = document.createElement("TD");
        var symbolCell = document.createElement("TD");
        symbolCell.setAttribute("id", p);
        resultsCell.appendChild(companyCell);
        symbolCell.appendChild(symbMatchCell);
        resultsRow.appendChild(resultsCell);
        resultsRow.appendChild(symbolCell);

    //  console.log(matches[f]);
      //console.log(matches[f+1]);
      resultsRow.setAttribute("class","rows");
      resultsTable.appendChild(resultsRow);
      var buttonCell=document.createElement("TD")
      var x = document.createElement("BUTTON");
        resultsRow.appendChild(buttonCell);

        x.setAttribute("id", p);
        x.setAttribute("class","stockbuttons");
        x.addEventListener("click", stock1, false);
        var t = document.createTextNode("Stock 1");
        x.appendChild(t);
        buttonCell.appendChild(x);

        var y = document.createElement("BUTTON")
        y.setAttribute("id", p);
        y.setAttribute("class","stockbuttons");
        y.addEventListener("click", stock2, false);
        var v = document.createTextNode("Stock 2");
        y.appendChild(v);
        buttonCell.appendChild(y);
        p++;
        l++;
    }
    tableloc = document.getElementById("searchresults");
    tableloc.appendChild(resultsTable);
    console.log(matches);

    })
}//<---the search close

function stock1(){

  var buttId = this.id;
  var compId = document.getElementById("myTable").rows[buttId].cells[1].innerHTML;
  var compname = document.getElementById("myTable").rows[buttId].cells[0].innerHTML;
    //    var symbId = document.getElementById("myTable").rows[h].cells[0].id;
  document.getElementById('firstcompany').innerHTML = compname;
  document.getElementById('firstcompany').style.background = "#c8b9cd";
  //    var symbId = document.getElementById("myTable").rows[h].cells[0].id;
  document.getElementById('firstspot').innerHTML = compId;
    console.log(compId);
    var el = document.getElementById('myTable');
    el.remove();
  document.getElementById('myform').reset();
  document.getElementById("wind").focus();

}
function stock2(){
  var buttId = this.id;
  var compId = document.getElementById("myTable").rows[buttId].cells[1].innerHTML;
  var compname = document.getElementById("myTable").rows[buttId].cells[0].innerHTML;
  //    var symbId = document.getElementById("myTable").rows[h].cells[0].id;
  document.getElementById('secondspot').innerHTML = compId;
  document.getElementById('secondcompany').innerHTML = compname;
    document.getElementById('secondcompany').style.background = "#c8b9cd";
  var el = document.getElementById('myTable');
  document.getElementById("btn").focus();
  document.getElementById('myform').reset();
  el.remove();
  //console.log(compId);

}
function  compare(){
        var one = document.getElementById("firstspot").innerHTML
        var two = document.getElementById("secondspot").innerHTML;

        var file = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol='+ one + '&apikey=GSOAOQ0QAG8ZUVGB';
          var file2 = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol='+ two + '&apikey=GSOAOQ0QAG8ZUVGB';

        var stockOne = fetch('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol='+ one + '&apikey=GSOAOQ0QAG8ZUVGB').then(function(response){
                 return response.json()
        });
        var stockTwo = fetch('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol='+ two + '&apikey=GSOAOQ0QAG8ZUVGB').then(function(response){
                 return response.json()
        });
        var combinedData = {"stockOne":{},"stockTwo":{}};
        Promise.all([stockOne,stockTwo]).then(function(values){
            combinedData["stockOne"] = values[0];
            combinedData["stockTwo"] = values[1];
            //console.log(combinedData);
            return combinedData;
        })
      .then(function(combinedData){
      var ti = combinedData["stockOne"]["Time Series (Daily)"];
      var firstrun= []
      for (y = 0; y < 90; y++){
        var kilo = combinedData["stockOne"]["Time Series (Daily)"];
        var micro = Object.values(kilo);
        var mega = micro[y];
        var duper = Object.values(mega);
        var huge = Object.values(duper);
        var bigone = huge[0];
        firstrun.push(bigone);
      }
      var st = combinedData["stockTwo"]["Time Series (Daily)"];
      var secondrun= []
      for (y = 0; y < 90; y++){
        var kilo = combinedData["stockTwo"]["Time Series (Daily)"];
        var micro = Object.values(kilo);
        var mega = micro[y];
        var duper = Object.values(mega);
        var huge = Object.values(duper);
        var bigone = huge[0];
        secondrun.push(bigone);
      }
      var diffarray = [];
      for(y=0; y < 90; y++){
      var diff = firstrun[y]-secondrun[y];
      diffarray.push(Math.abs(diff))
      }
      console.log(diffarray);
      //console.log(diffarray.reduce(getSum));
      var mean = diffarray.reduce(getSum)/diffarray.length;
        var varianceArray = [];

      for(y=0; y < 90; y++){
        var h = (mean - diffarray[y]);
        var n = Math.pow(h,2);
        varianceArray.push(n);

     }
    sd = Math.sqrt(varianceArray.reduce(getSum)/varianceArray.length);
    console.log(mean);
    console.log("High-end: " + (mean + sd));
    console.log("Low-end: " + (mean - sd));
    var onelastclose = firstrun.pop();
    var twolastclose = secondrun.pop();
    var compOne = document.getElementById('firstcompany').innerHTML;
    var compTwo = document.getElementById('secondcompany').innerHTML;
    document.getElementById("instructiontable").style.display = "grid";
    document.getElementById("meanspread").innerHTML= "$" + Math.round(mean*100)/100;
    document.getElementById("deviationcell").innerHTML= "$" + Math.round(sd*100)/100;
    document.getElementById("currentpriceone").innerHTML="Last close: $" + onelastclose
    document.getElementById("currentpricertwo").innerHTML="Last close: $" + twolastclose
    document.getElementById("highspread").innerHTML= "$" + Math.round((mean + sd)*100)/100
    document.getElementById("lowspread").innerHTML= "$" + Math.round((mean - sd)*100)/100
    document.getElementById("spreadrange").innerHTML= "$" + Math.round((mean - sd)*100)/100 + ' and $' + Math.round((mean + sd)*100)/100;

})

}
function getSum(total, num) {
    return total + num;
}

function ford(){
  var fordsymb = "F";
  var ford = "Ford Motor Co";
  var gmsymb = "GM";
  var gm = "General Motors Co"
  document.getElementById('firstspot').innerHTML = fordsymb;
  document.getElementById('firstcompany').innerHTML = ford;
  document.getElementById('secondspot').innerHTML = gmsymb;
  document.getElementById('secondcompany').innerHTML = gm;
  var one = document.getElementById("firstspot").innerHTML;
  document.getElementById("btn").focus();
  console.log(one);
  compare();
}



function delta(){
  var deltasymb = "DAL";
  var delta = "DELTA AIR LINES";
  var swsymb = "LUV";
  var sw = "SOUTHWEST AIRLINES"
  document.getElementById('firstspot').innerHTML = deltasymb;
  document.getElementById('firstcompany').innerHTML = delta;
  document.getElementById('secondspot').innerHTML = swsymb;
  document.getElementById('secondcompany').innerHTML = sw;
  var one = document.getElementById("firstspot").innerHTML;
  document.getElementById("btn").focus();
  console.log(one);
  compare();
}
function lowes(){
  var lowessymb = "LOW";
  var lowes = "LOWES COMPANIES";
  var hdsymb = "HD";
  var hd = "HOME DEPOT INC";
  document.getElementById('firstspot').innerHTML = lowessymb;
  document.getElementById('firstcompany').innerHTML = lowes;
  document.getElementById('secondspot').innerHTML = hdsymb;
  document.getElementById('secondcompany').innerHTML = hd;
  var one = document.getElementById("firstspot").innerHTML;
  document.getElementById("btn").focus();
  console.log(one);
  compare();
}
function apple(){
  var applesymb = "AAPL";
  var apple = "APPLE INC";
  var msftsymb = "MSFT";
  var msft = "MICROSOFT CORP";
  document.getElementById('firstspot').innerHTML = applesymb;
  document.getElementById('firstcompany').innerHTML = apple;
  document.getElementById('secondspot').innerHTML = msftsymb;
  document.getElementById('secondcompany').innerHTML = msft;
  var one = document.getElementById("firstspot").innerHTML;
  document.getElementById("btn").focus();
  console.log(one);
  compare();
}

function walmart(){
  var walsymb = "WMT";
  var wal = "WALMART INC";
  var targsymb = "TGT";
  var targ = "TARGET CP";
  document.getElementById('firstspot').innerHTML = walsymb;
  document.getElementById('firstcompany').innerHTML = wal;
  document.getElementById('secondspot').innerHTML = targsymb;
  document.getElementById('secondcompany').innerHTML = targ;
  var one = document.getElementById("firstspot").innerHTML;
  document.getElementById("btn").focus();
  console.log(one);
  compare();
}








  var examples = ["F", "FORD MOTOR CO", "GM", "GENERAL MOTORS CO", "LUV", "SOUTHWEST AIRLINES", "DAL", "DELTA AIR LINES, INC", "HD","HOME DEPOT INC","LOW","LOWES COMPANIES","MSFT", "MICROSOFT CORP","AAPL","APPLE INC.", "WMT","WALMART INC.","TGT",'TARGET CP' ];





/*To
be specific, when the spread reaches one standard deviation above the mean you will buy
the lower priced stock and sell the higher priced one. Alternatively, when the spread
reaches one standard deviation below the mean, you will buy the expensive stock and
simultaneously sell the cheap one short. You would then refrain from subsequent trading
until the spread returned to the mean. At that point you would close out your positions.
That is, you would sell stocks you owned “long” and buy those you were “short.”
//console.log(`Fifteen is ${a + b}.`);
/*
var numbers = [65, 44, 12, 4];

function myFunction(item) {
    document.getElementById("demo").innerHTML = numbers.reduce(getSum);
}
    fetch(file2)

  .then(function(p){
    return p.json();
  })
  .then(function(d){
    var brad = k.json();
    console.log(brad);
  })
*/




/*  .then(function(k){
    var firstrun = []
    var ti = k["Time Series (Daily)"];
    for (y = 0; y < 90; y++){
      var kilo = k["Time Series (Daily)"];
      var micro = Object.values(kilo);
      var mega = micro[y];
      var duper = Object.values(mega);
      var huge = Object.values(duper);
      var bigone = huge[0];
      firstrun.push(bigone);
}
})



*/
function init() {
document.getElementById("wind").value = "";
//document.getElementById("mainid").value = "";
}
window.onload = init;
