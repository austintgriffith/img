var fs = require("fs");
var currentBestFile;
var lastCurrentBestFile;
var lastLastCurrentBestFile;
var lastTrashed;
module.exports = {
    port:41800,
    init:function(app){
        console.log("Init Server...");
        app.get('/cam', function (req, res) {

            console.log("reading picam dir");
            var allFiles = fs.readdirSync("build/picam");
            var foundFile;
            for(var key in allFiles){
                if(allFiles[key].indexOf("cam")==0&&allFiles[key]!=currentBestFile&&allFiles[key]!=lastCurrentBestFile&&allFiles[key]!=lastLastCurrentBestFile){
                    foundFile=allFiles[key];
                    break;
                }
            }
            if(foundFile){
                if(foundFile!=currentBestFile){
                    if(lastCurrentBestFile&&lastLastCurrentBestFile!=lastCurrentBestFile) lastLastCurrentBestFile=lastCurrentBestFile;
                    if(currentBestFile&&lastCurrentBestFile!=currentBestFile) lastCurrentBestFile=currentBestFile;
                    currentBestFile=foundFile;
                    console.log("currentBestFile:"+currentBestFile)
                    console.log("lastCurrentBestFile:"+lastCurrentBestFile);
                    console.log("lastLastCurrentBestFile:"+lastLastCurrentBestFile);
                    //fs.renameSync("picam/"+foundFile,"build/"+foundFile);
                }
            }
            if(lastCurrentBestFile) res.send(lastCurrentBestFile)
            else res.send(currentBestFile)

            if(lastLastCurrentBestFile) {
                if(lastTrashed!=lastLastCurrentBestFile){
                    console.log("trashing "+lastLastCurrentBestFile);
                    fs.unlink("build/picam/"+lastLastCurrentBestFile,function(){
                        console.log("done trashing");
                        lastTrashed=lastLastCurrentBestFile;
                    });
                }

            }
        });


        app.get('/clear', function (req, res) {
            console.log("reading picam dir");
            var allFiles = fs.readdirSync("build/picam");
            var foundFile;
            for(var key in allFiles){
                var filename = "build/picam/"+allFiles[key];
                console.log("unlinking "+filename);
                fs.unlink(filename,function(){
                    console.log("done");

                });
            }
            res.redirect("/");
        });
    }
};
