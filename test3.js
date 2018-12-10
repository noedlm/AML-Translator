var tags = [
    { element: '<strong>', index: 10 },
    { element:'<em>', index: 23 },
    { element:'</strong>', index: 34 },
    { element:'</em>', index: 53 } 
];

var tagsToInsert = getNewTags(tags);
console.log(tagsToInsert);

function getNewTags(tags) {
    var newTags = [];
    var openTagsTracker = {};

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

function getTagName(element) {
    return element.replace(/[^a-zA-Z]*/g, '');
}

function createTag(name, type) {
    return (type === "open") ? "<" + name + ">" : "</" + name + ">";
}