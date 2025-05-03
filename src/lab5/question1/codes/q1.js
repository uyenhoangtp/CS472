let str = "Greetings, ";
let user = {
    firstname: "John",
    lastname: "Smith",
    display: function() {
        console.log(str, this.firstname);
        show("hi");
    }
};
user.display();
function show(msg) {
    console.log(msg + " " + user.lastname);
}
show.call(user, "hello");
