(function () {
    var myConnector = tableau.makeConnector();

    myConnector.getSchema = function (schemaCallback) {
        var cols = [{
                id: "case_number",
                dataType: tableau.dataTypeEnum.string
            }, {
                id: "reported_date",
                dataType: tableau.dataTypeEnum.datetime
            }, {
                id: "offense_desc",
                dataType: tableau.dataTypeEnum.string
            }, {
                id: "address",
                dataType: tableau.dataTypeEnum.string
            }, {
                id: "common_name",
                dataType: tableau.dataTypeEnum.string
            }, {
                id: "case_occured_from",
                dataType: tableau.dataTypeEnum.datetime
            }, {
                id: "case_occured_through",
                dataType: tableau.dataTypeEnum.datetime
            }, {
                id: "case_disposition",
                dataType: tableau.dataTypeEnum.string
            }, {
                id: "geo_latitude",
                dataType: tableau.dataTypeEnum.float
            }, {
                id: "geo_longitude",
                dataType: tableau.dataTypeEnum.float
            }, {
                id: "campus_region",
                dataType: tableau.dataTypeEnum.string
            }
        ];
    
        var tableSchema = {
            id: "uwpdData",
            alias: "University of Washington's Crime Data",
            columns: cols
        };
    
        schemaCallback([tableSchema]);
    };

    myConnector.getData = function (table, doneCallback) {
        $.getJSON("http://localhost:8889/128.208.173.241/?api_key=REPLACE_KEY_HERE", function(resp) {

            var feat = resp,
                tableData = [];
    
            //Iterate over the JSON object
            for (var i = 0, len = feat.length; i < len; i++) {
                tableData.push({
                    "case_number": feat[i].case_number,
                    "reported_date": feat[i].reported_date,
                    "offense_desc": feat[i].offense_desc,
                    "address": feat[i].address,
                    "common_name": feat[i].common_name,
                    "case_occured_from": feat[i].case_occured_from,
                    "case_occured_through": feat[i].case_occured_through,
                    "case_disposition": feat[i].case_disposition,
                    "geo_latitude": feat[i].geo_latitude,
                    "geo_longitude": feat[i].geo_longitude,
                    "campus_region": feat[i].campus_region
                });
            }
    
            table.appendRows(tableData);
            doneCallback();
        });
    };

    tableau.registerConnector(myConnector);

    $(document).ready(function () {
        $("#submitButton").click(function () {
            tableau.connectionName = "UWPD Crime Data";
            tableau.submit();
        });
    });
})();