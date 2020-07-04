/**
*
* Export one of your Google My Map files as a KMZ, then unzip the KML from the KMZ file and add it to your Google Drive.
*
* References
* https://developers.google.com/apps-script/reference/drive/file#setsharingaccesstype,-permissiontype
* https://stackoverflow.com/questions/25595507/google-maps-engine-export-kml-curl
* https://stackoverflow.com/questions/45284798/using-google-app-script-unzip-a-file-from-google-drive
* https://www.reddit.com/r/GoogleAppsScript/comments/hgrbap/is_there_a_way_to_import_caption_from_youtube/
*/

function exportMaptoKML() {
  
  //  Insert the ID of your Google MyMap
  var fileID = "INSERT_GOOGLE_DRIVE_ID_HERE";
  
  //  Get this Google Drive file by the ID
  var file = DriveApp.getFileById(fileID);
  
//  Obtain the URL for exporting the Google MyMap
  var url = "https://mapsengine.google.com/map/kml?mid=" + fileID;
  
  /*  I don't think we need any of these options so I'm commenting them out  */
  
  //   Open up the access to export the file
  //  file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  
  //  var options = {
  //      headers: {
  //        Authorization: 'Bearer ' + ScriptApp.getOAuthToken(),
  //        Accept: 'application/json'
  //      },
  //      method: "GET",
  //      muteHttpExceptions: true,
  //      compressed: true,
  //      'Accept-Encoding': 'gzip',
  //      'User-Agent': 'getMapFile (gzip)'
  //    }  
  
//  Get the KMZ file from your request as a blob
  var getContent = UrlFetchApp.fetch(url).getBlob();
  
//  Designate the KMZ blob as a zipped file
  getContent.setContentType("application/zip");
  
//  Unzip the KMZ file
  var unzipContent = Utilities.unzip(getContent);
  
//  Add the unzipped KML file as a new Drive file
  var newDriveFile = DriveApp.createFile(unzipContent[0]);
  
//  Get the text from the KML file
  var KMLString = newDriveFile.getBlob().getDataAsString();
  
//  Print the URL to the KML file to the console
  console.log(newDriveFile.getUrl());
}
