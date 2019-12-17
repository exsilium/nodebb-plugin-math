var findEndOfMath = function(delimiter, text, startIndex) {
  'use strict';
  var index = startIndex;

  var delimLength = delimiter.length;

  while (index < text.length) {
    var character = text[index];

    if (text.slice(index, index + delimLength) === delimiter) {
      return index;
    }

    index++;
  }

  return -1;
};

var splitData = function(startData, leftDelim, rightDelim, display) {
  'use strict';
  var finalData = [];

  for (var i = 0; i < startData.length; i++) {
    if (startData[i].type === 'text') {
      var text = startData[i].data;

      var lookingForLeft = true;
      var currIndex = 0;
      var nextIndex;

      nextIndex = text.indexOf(leftDelim);
      if (nextIndex !== -1) {
        currIndex = nextIndex;
        finalData.push({type: 'text', data: text.slice(0, currIndex)});
        lookingForLeft = false;
      }

      while (true) {
        if (lookingForLeft) {
          nextIndex = text.indexOf(leftDelim, currIndex);
          if (nextIndex === -1) {
            break;
          }

          finalData.push({type: 'text', data: text.slice(currIndex, nextIndex)});

          currIndex = nextIndex;
        } else {
          nextIndex = findEndOfMath(rightDelim, text, currIndex + leftDelim.length);
          if (nextIndex === -1) {
            break;
          }

          finalData.push({
            type: 'graph',
            data: text.slice(currIndex + leftDelim.length, nextIndex),
            rawData: text.slice(currIndex, nextIndex + rightDelim.length),
            display: display
          });

          currIndex = nextIndex + rightDelim.length;
        }

        lookingForLeft = !lookingForLeft;
      }

      finalData.push({type: 'text', data: text.slice(currIndex)});
    } else {
      finalData.push(startData[i]);
    }
  }

  return finalData;
};

module.exports = splitData;