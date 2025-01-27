//function show content when click a button
function FuncShowContent() {
  /**
   * comment
   * multiple
   * line
   */

  //variable const vs var
  const a = 10;
  var b = "Hello";
  b = "a message";

  console.log(a);
  console.log(b);

  var studentCode = "01234";
  var studentcode = "012345";

  //Javascript Block
    var isCorrect = true;
    if(isCorrect) {
        console.log("This is correct massage ");
    }


  //selector div by id
  const content = Selector("content");
  console.log(content);

  //pass value to HTML Element with property .innerHTML
  content.innerHTML = BuildContent()

  //set css class to div with property .classList.add
  content.classList.add("content-font")

}

//function for building a content
function BuildContent() {
    
    var strContent = "<h1>I'm Cool!!</h1>";
        strContent += "<p>We're studying javascript course</p>";
        strContent += "<p>Let me know if you're cool</p>";

        return strContent;
}

function FuncResetStyle() {
    //selector div by id
    const content = Selector("content");
    //reset css class to div with property .classList.remove
    content.classList.remove("content-font")
}

//wrapper function getElementById
function Selector(elementId) {
    return document.getElementById(elementId);
}