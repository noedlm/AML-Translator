var translateModule = process.argv[2],
    AMLTranslator = require(translateModule);

var testStrings = [
    ["Hello, World!",
    "Hello, World!"],
    ["Hello, ^%World!^!%",
    "Hello, <STRONG>World!</STRONG>"],
    ["Greetings ^%from ^~Glornix^!% Beta-Nine^!~.",
    "Greetings <STRONG>from <EM>Glornix</EM></STRONG><EM> Beta-Nine</EM>."],
    ["^%Hello, ^~World!^!% Greetings ^~^%from^!~ Glornix Beta-Nine!^!%",
    "<STRONG>Hello, <EM>World!</EM></STRONG> Greetings <EM><STRONG>from</STRONG></EM><STRONG> Glornix Beta-Nine!</STRONG>"],
    ["^%Hello, ^~World!^!% Greetings ^%from Glornix^!%^!~ Beta-Nine!",
    "<STRONG>Hello, <EM>World!</EM></STRONG><EM> Greetings <STRONG>from Glornix</STRONG></EM> Beta-Nine!"],
    ["^%Hello, ^~World!^!% Greetings ^%from Glornix^!%^!~ Beta-Nine!^%Hello, ^~World!^!% Greetings ^%from Glornix^!%^!~ Beta-Nine!",
    "<STRONG>Hello, <EM>World!</EM></STRONG><EM> Greetings <STRONG>from Glornix</STRONG></EM> Beta-Nine!<STRONG>Hello, <EM>World!</EM></STRONG><EM> Greetings <STRONG>from Glornix</STRONG></EM> Beta-Nine!"],
];

testStrings.forEach(function (testString, idx) {
  translated = AMLTranslator.translate(testString[0]);
  if (translated.toLowerCase() === testString[1].toLowerCase()) {
    console.log("Example " + (idx + 1) + " is correct.");
  } else {
    console.log("Example " + (idx + 1) + " is incorrect!");
    console.log('  Input:    ' + testString[0]);
    console.log('  Expected: ' + testString[1]);
    console.log('  Received: ' + translated);
  }
});
