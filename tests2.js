const markup = {
    '^%' : '<strong>',
    '^!%' : '</strong>',
    '^~' : '<em>',
    '^!~' : '</em>'
};
const tagRegex = /<*[/]?[a-zA-Z]*>+/g;

var h = "Greetings <strong>from <em>Glornix</strong> Beta-Nine</em>.";
var globalTags = h.match(tagRegex);
console.log(globalTags);
var tagIndex = {};
var indexedTags = [];

for (var t in globalTags) {
    var index = (globalTags[t] in tagIndex) ? h.indexOf(globalTags[t], tagIndex[t].index) : h.indexOf(globalTags[t]);
    var indexTracker = {};
    indexTracker[globalTags[t]] = index;
    tagIndex[globalTags[t]] = index;
    indexedTags.push(indexTracker);
}

console.log(indexedTags);
//h = h.slice(0,34) + '</em>' + h.slice(34, h.length);
//console.log(h);
var tagsToInsert = [
    {'</em>' : 34},
    {'<em>' : 34 + '</strong>'.length}
];
// console.log(tagsToInsert);
// for (var t in tagsToInsert) {
//     console.log(Object.keys(tagsToInsert[t])[0]);
//     console.log(tagsToInsert[t][Object.keys(tagsToInsert[t])[0]]);
// }
//console.log(Object.keys(tagsToInsert[0])[0]);


var newString = insertTags(h, tagsToInsert);
console.log(newString);

function insertTags(string, tags, indexMod = 0) {
    var tagLength = Object.keys(tags[0])[0].length;
    var key = Object.keys(tags[0])[0];
    string = string.slice(0, tags[0][key]+indexMod) + key + string.slice(tags[0][key]+indexMod, string.length);
    tags.shift();

    return tags.length ? insertTags(string, tags, indexMod+tagLength) : string;
}


function formatHtml(parsedHtml, htmlTags) {
    var newString  = '';

    parsedHtml.forEach(substring => {
        for (var i = 0; i <= htmlTags.length - 1; i++) {
            if (!tagRegex.test(substring)) {
                newString += substring;
                break;
            } else {
                if (htmlTags[i] === substring) {
                    newString += htmlTags[i];
                    htmlTags.shift();
                    break;
                } else {
                    console.log(newString + ":" + substring + ":" + htmlTags[i]);
                    newString += htmlTags[i];
                    console.log(newString + ":" + substring + ":" + htmlTags[i]);
                    htmlTags.shift();
                    console.log(htmlTags);
                    console.log(htmlTags[i]);
                    i--;
                }
            }
        }
    });

    return newString;
}