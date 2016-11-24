var ageWiseLiterateDistribution = new Object();
var gradPopStateAndGradeWise = new Object();
var eduCategWise = new Object();

function dataFormat (objObj) {
  var arrObj =  new Array();
  for(key in objObj) {
    arrObj.push(objObj[key]);
  }
  return arrObj;
}

function textArray(text) {
  var headerLine = new Array();
  text.split("\n").map(function(strLine, lineNum){
      if(strLine !== '') {
        var arrLine = strLine.split(",");
        if (lineNum != 0) {
          arrLine[4] = arrLine[4].trim();
          ageKey = arrLine[5].trim();
          if (arrLine[4] == "Total" ) {
            if (arrLine[5] != "All ages") {
              //For Age wise Total Literate Population
              arrLine[12] = parseInt(arrLine[12]);
              if(ageKey in ageWiseLiterateDistribution){
                ageWiseLiterateDistribution[ageKey].TotalLiteratePop += arrLine[12];
              }
              else {
                ageWiseLiterateDistribution[ageKey] = new Object();
                ageWiseLiterateDistribution[ageKey].ageGroup = ageKey;
                ageWiseLiterateDistribution[ageKey].TotalLiteratePop = arrLine[12];

              }
            }
            else {
              //For Statewise and gender wise Graduate Population
              var areaKey = arrLine[3].trim();
              var gradM = parseInt(arrLine[40]);
              var gradF = parseInt(arrLine[41]);

              if (areaKey in gradPopStateAndGradeWise) {
                gradPopStateAndGradeWise[areaKey].gradMales += gradM;
                gradPopStateAndGradeWise[areaKey].gradFemales += gradF;
              }
              else {
                gradPopStateAndGradeWise[areaKey] = {area: areaKey, gradMales: gradM, gradFemales: gradF};

              }

              //For Education Category wise - all India
              for(eduCatIndex=15;eduCatIndex<44;eduCatIndex+=3) {
                // console.log(headerLine);
                var eduCatValue = headerLine[eduCatIndex].trim().match(/.*- (.*) -.*/)[1];
                //console.log(eduCatValue);
                var totalPopValue = parseInt(arrLine[eduCatIndex]);
                if (eduCatValue in eduCategWise) {
                  eduCategWise[eduCatValue].totalPop += totalPopValue;
                }
                else {
                    eduCategWise[eduCatValue] = {eduCateg: eduCatValue, totalPop:totalPopValue };

                }
              }
            }

          }
        }

        else {
            // console.log(lineNum);
            headerLine = arrLine;
        }
    }

  });
}

function fileReader(fileNames) {
    fileNames.map(function(fileName){
      // console.log("***Keys After File Read"+ Object.keys(ageWiseLiterateDistribution));
      var fs = require('fs');
      var data = fs.readFileSync(fileName).toString();
      //console.log("For File: "+fileName);
      textArray(data);
    });
    ageWiseLiterateDistribution = dataFormat(ageWiseLiterateDistribution);
    // console.log(ageWiseLiterateDistribution);
    gradPopStateAndGradeWise = dataFormat(gradPopStateAndGradeWise);
    // console.log(gradPopStateAndGradeWise);
    eduCategWise = dataFormat(eduCategWise);
// console.log(eduCategWise);
}


function dataDumper(){
    var fs = require('fs');
    fs.writeFile("output/ageWiseLiterateDistribution.json",JSON.stringify(ageWiseLiterateDistribution),function(err) {
      if (err) throw err;
      console.log('Age wise Literate data file is saved!');
    });

    fs.writeFile("output/gradPopStateAndGradeWise.json", JSON.stringify(gradPopStateAndGradeWise), function(err) {
      if (err) throw err;
      console.log('State and grade file is saved!');
    });
    fs.writeFile("output/eduCategWise.json",JSON.stringify(eduCategWise), function(err) {
      if (err) throw err;
      console.log('education category file is saved!');
    });
}

var fileNames = ["includes/csv/India2011.csv","includes/csv/IndiaSC2011.csv","includes/csv/IndiaST2011.csv"];

fileReader(fileNames);
dataDumper();
