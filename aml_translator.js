const markup = {
    '^%' : '<STRONG>',
    '^!%' : '</STRONG>',
    '^~' : '<EM>',
    '^!~' : '</EM>'
};
const tagRegex = /<*[/]?[a-zA-Z]*>+/g;

var AMLTranslator = {
    translate: function(amlString) {
        htmlString = convertMarkup(amlString);
        this.test = convertMarkup(amlString);
        if (amlString !== htmlString) {
            htmlString = translateToHtml(htmlString);
        }
        return htmlString;
    }
};

function convertMarkup(inputString) {
    for(var element in markup) {
        inputString = inputString.split(element).join(markup[element]);
    }

    return inputString;
}

function translateToHtml(htmlString) {
    var tags = htmlString.match(tagRegex);
    tags = indexTags(htmlString, tags);
    var tagsToInsert = getNewTags(tags);
    console.log(tagsToInsert);
    return tagsToInsert.length ? insertTags(htmlString, tagsToInsert) : htmlString;
}

function indexTags(html, tags) {
    var tagIndex = {};
    var indexedTags = [];

    for (var tag in tags) {
        var index = tagIndex.hasOwnProperty(tags[tag]) ? html.indexOf(tags[tag], (tagIndex[tags[tag]] + tags[tag].length)) : html.indexOf(tags[tag]);
        tagIndex[tags[tag]] = index;
        console.log(tagIndex);
        indexedTags.push({
            element: tags[tag],
            index: index
        });
    }

    return indexedTags;
}

function getNewTags(tags) {
    var newTags = [];
    var openTagsTracker = {};
    console.log(tags);
    for (var tag in tags) {
        var tagName = getTagName(tags[tag].element);
        if (tags[tag].element.indexOf('/') === -1) {
            openTagsTracker[tagName] = 1;
        } else {
            if (tag) {
                var previousTagName = getTagName(tags[tag-1].element);
                if (tagName === previousTagName && openTagsTracker[tagName] === 1) {
                    openTagsTracker[tagName] = 0;
                } else if (tagName !== previousTagName && openTagsTracker[tagName] === 1) {
                    newTags.push({
                        element: createTag(previousTagName, "closed"),
                        index: tags[tag].index
                    });
                    openTagsTracker[previousTagName] = 0;
                    openTagsTracker[tagName] = 0;
                } else {
                    newTags.push({
                        element: createTag(tagName, "open"),
                        index: tags[tag-1].index + tags[tag-1].element.length
                    });
                }
            }
        }
    }

    return newTags;
}

function insertTags(string, tags, indexMod = 0) {
    var tagLength = tags[0].element.length;
    string = string.slice(0, tags[0].index+indexMod) + tags[0].element + string.slice(tags[0].index+indexMod, string.length);
    tags.shift();

    return tags.length ? insertTags(string, tags, indexMod+tagLength) : string;
}

function getTagName(element) {
    return element.replace(/[^a-zA-Z]*/g, '');
}

function createTag(name, type) {
    return (type === "open") ? "<" + name + ">" : "</" + name + ">";
}

if (module.exports) {
    module.exports = AMLTranslator;
}