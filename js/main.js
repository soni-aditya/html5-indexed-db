/**
 * The basic pattern that IndexedDB encourages is the following:

1.  Open a database.
2.  Create an object store in the database.
3.  Start a transaction and make a request to do some database operation, like adding or retrieving data.
4.  Wait for the operation to complete by listening to the right kind of DOM event.
5.  Do something with the results (which can be found on the request object).

Each time we want to update our DB, we have to use a different version number [That's pretty annoying].
 */
$(document).ready(function() {
  // Let us open our database
  var request = indexedDB.open("CustomerManager", 1);
  //Upgrading/Creating DB
  request.onupgradeneeded = function(e) {
    var db = e.target.result;
    //Check if there is one already created
    //For this we just look for names of customers
    if (!db.objectStoreNames.contains("customers")) {
      var objectStore = db.createObjectStore("customers", {
        keypath: "id",
        autoIncrement: true
      });
    }
  };
  //Success in Opening DB
  request.onsuccess = function(e) {
    console.log("BD Connected and Opened Successfully");
    db = e.target.result;
    //Show Customers
    showCustomers();
  };
  //Error
  request.onerror = function(e) {
    console.log("Some Error while Opening DB");
  };
});
