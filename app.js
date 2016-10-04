/*
  https://www.npmjs.com/package/xml2json
*/
var returnJSONResults = function(baseName, queryName) {
  var XMLPath = "scenario-lucas-bunny-denied.xml";
  var rawJSON = loadXMLDoc(XMLPath);
  function loadXMLDoc(filePath) {
    var fs = require('fs');
    var parser = require('xml2json');
    var json;
    try {
        // Read XML
        var fileData = fs.readFileSync(filePath, 'UTF-8');
        // XML to json
        var options = {
                        sanitize: true,
                        object: true,
                      };
        var json = parser.toJson(fileData, options);

        var response = {};
        response.TransactionNumber = json.ApplicantScreening.Response.TransactionNumber;
        response.ApplicantDecision = json.ApplicantScreening.Response.ApplicantDecision;
        response.ReportDate = json.ApplicantScreening.Response.ReportDate;
        response.Status = json.ApplicantScreening.Response.Status;
        response.RequestID_Returned = json.ApplicantScreening.Response.RequestID_Returned;
        response.BackgroundReport = json.ApplicantScreening.Response.BackgroundReport.toString();
        /*"ApplicantDecision":
        [{
                 "applicantName": "Smith, Edgar", "result": "APPROVED"
               },
               {
                  "applicantName": "Smith, Florence", "result": "APPROVED"
        }
        ],*/
        console.log('response.TransactionNumber: ', response.TransactionNumber);
        console.log('response.ApplicantDecision: ', response.ApplicantDecision);
        console.log('response.ReportDate: ', response.ReportDate);
        console.log('response.Status: ', response.Status);
        console.log('response.RequestID_Returned: ', response.RequestID_Returned);

        console.log('Saving response.BackgroundReport in HTML file');

        fs.writeFile("scenario-lucas-bunny-denied.html", response.BackgroundReport, function(err) {
          if(err) {
             return console.log(err);
          }
          console.log("The file was saved!");
        });

        console.log('Saving in JSON file');

        fs.writeFile("scenario-lucas-bunny-denied.json", JSON.stringify(json), function(err) {
          if(err) {
             return console.log(err);
          }
          console.log("The JSON file was saved!");
        });

        console.log("File '" + filePath + "/ was successfully read.\n");
        return json;
    } catch (ex) {
      console.log(ex)
    }
  }
}();
