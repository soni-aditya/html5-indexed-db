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
  var request = indexedDB.open("CustomerManager", 3);
  //Upgrading/Creating DB
  request.onupgradeneeded = function(e) {
    var db = e.target.result;
    //Check if there is one already created
    //For this we just look for names of people
    if (!db.objectStoreNames.contains("customer")) {
      var objectStore = db.createObjectStore("customer", {
        keypath: "id",
        autoIncrement: true
      });
    }
  };
  //Success in Opening DB
  request.onsuccess = function(e) {
    console.log("BD Connected and Opened Successfully");
    db = e.target.result;
    //Show people
    // showpeople();
  };
  //Error
  request.onerror = function(e) {
    console.log("Some Error while Opening DB");
  };
});

function addCustomer() {
  //Fetching info from the form
  var name = $("#customer-name").val();
  var email = $("#customer-email").val();
  //Enter Name of objectStore in transaction
  var transaction = db.transaction(["customer"], "readwrite");
  //Ask for the objectStore
  var store = transaction.objectStore("customer");
  //Define a customer that we want to enter
  var customer = {
    name: name,
    email: email
  };
  //Perform the add
  var request = store.add(customer);
  //Success-Error callbacks
  request.onsuccess = function(e) {
    console.log("Customer Saved Successfully");
    window.location.href = "index.html";
  };
  request.onerror = function(e) {
    alert("User isn't added\n Sorry !");
    console.log("Error", e.target.error.name);
  };
}
