const markup = {
    '^%' : '<strong>',
    '^!%' : '</strong>',
    '^~' : '<em>',
    '^!~' : '</em>'
};
const tagRegex = /<*[/]?[a-zA-Z]*>+/g;

string = '^~Hello, ^%Earth!^!~ You are ^~welcome^!% here.^!~';

for (element in markup) {
    string = string.split(element).join(markup[element]);
}
var match = string.match(tagRegex);
var tmpString = '';
//console.log(string);
arrs = [];
for (var i = 0; i <= match.length-1; i++) {
    var currentTagIndex = string.indexOf(match[i]);
    var currentTagLength = match[i].length;

    // if (currentTagIndex > 0) {
    //     tmpString += string.slice(0, currentTagIndex);
    //     tmpString += string.slice(currentTagIndex, currentTagLength-1)
    //     string = string.slice(currentTagIndex, string.length);
    // }
    
    arrs.push(string.slice(currentTagIndex, currentTagLength));
    string = string.slice(currentTagLength, string.length);
    arrs.push(string.slice(0, string.indexOf(match[i+1])));
    string = string.slice(string.indexOf(match[i+1]), string.length);
    
    // console.log(i);
    // console.log("string:" + string);
    // console.log("temp array:" + arrs);

    //console.log(string.slice(0, string.indexOf(match[i])) + string.slice(string.indexOf(match[i]) + match[i].length, match[i+1]));
}

var teststring = 'Greetings ';

//console.log(tagRegex.test(teststring));


//console.log(string);
//console.log(match[0].replace(/[^a-z]*/g, ''));
var ss = [ '<dfdfdf>', '<rere>', '</erer>', '</dfdfdf>', '<ere>', '</erer>', 'end', 'dfadf', 'adfad' ]
var st = [ '<STRONG>', '<EM>', '</EM>', '</STRONG>', '<EM>', '</EM>' ];

ss.forEach(function(element) {
    for(var i = 0; i <= st.length-1; i++) {
        //console.log(st[i]);
        st.shift();
        i--;
        continue;
    }
});


// st.forEach(function(element) {
//     console.log("before shift:"+element);
//     st.shift();
//     console.log("after shift:"+element);
// });




function parseHtml(htmlString, tagsArray) {
    var parsedHtml = [];
    for (var i = 0; i <= tagsArray.length-1; i++) {
        var currentTagIndex = htmlString.indexOf(tagsArray[i]);
        var currentTagLength = tagsArray[i].length;

        if (currentTagIndex > 0) {
            parsedHtml.push(htmlString.slice(0, currentTagIndex));
            htmlString = htmlString.slice(currentTagIndex, htmlString.length);
            currentTagIndex = htmlString.indexOf(tagsArray[i]);
            currentTagLength = tagsArray[i].length;
        }
        
        parsedHtml.push(htmlString.slice(currentTagIndex, currentTagLength));
        htmlString = htmlString.slice(currentTagLength, htmlString.length);
        
        if (i === tagsArray.length-1 && htmlString.length) {
            parsedHtml.push(htmlString.slice(0, htmlString.length));
        } else {
            parsedHtml.push(htmlString.slice(0, htmlString.indexOf(tagsArray[i+1])));
            htmlString = htmlString.slice(htmlString.indexOf(tagsArray[i+1]), htmlString.length);
        }
    }

    return parsedHtml;
}