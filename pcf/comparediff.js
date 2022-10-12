var to8bitStream = function (text, flags) {
    var i, l, sourceEncoding, encodingBlock, outputEncoding, newtext,
        isUnicode, ch, bch;
    flags = flags || {};
    sourceEncoding = flags.sourceEncoding || 'Unicode';
    outputEncoding = flags.outputEncoding;

    if ((flags.autoencode || outputEncoding) &&
        fonts[activeFontKey].metadata &&
        fonts[activeFontKey].metadata[sourceEncoding] &&
        fonts[activeFontKey].metadata[sourceEncoding].encoding) {
        encodingBlock = fonts[activeFontKey].metadata[sourceEncoding].encoding;
        if (!outputEncoding && fonts[activeFontKey].encoding) {
            outputEncoding = fonts[activeFontKey].encoding;
        }
        if (!outputEncoding && encodingBlock.codePages) {
            outputEncoding = encodingBlock.codePages[0];
        }
        if (typeof outputEncoding === 'string') {
            outputEncoding = encodingBlock[outputEncoding];
        }
        if (outputEncoding) {
            isUnicode = false;
            newtext = [];
            for (i = 0, l = text.length; i < l; i++) {
                ch = outputEncoding[text.charCodeAt(i)];
                if (ch) {
                    newtext.push(
                        String.fromCharCode(ch));
                } else {
                    newtext.push(
                        text[i]);
                }

                if (newtext[i].charCodeAt(0) >> 8) {

                    isUnicode = true;
                }
            }
            text = newtext.join('');
        }
    }
    i = text.length;
    while (isUnicode === undefined && i !== 0) {
        if (text.charCodeAt(i - 1) >> 8) {

            isUnicode = true;
        }
        i--;
    }
    if (!isUnicode) {
        return text;
    }
    newtext = flags.noBOM ? [] : [254, 255];
    for (i = 0, l = text.length; i < l; i++) {
        ch = text.charCodeAt(i);
        bch = ch >> 8; // divide by 256
        if (bch >> 8) {
            throw new Error("Character at position " + i + " of string '" +
                text + "' exceeds 16bits. Cannot be encoded into UCS-2 BE");
        }
        newtext.push(bch);
        newtext.push(ch - (bch << 8));
    }
    return String.fromCharCode.apply(undefined, newtext);
};

var to8bitStream = function to8bitStream(text, flags) {
    var i, l, sourceEncoding, encodingBlock, outputEncoding, newtext, isUnicode, ch, bch;
    flags = flags || {};
    sourceEncoding = flags.sourceEncoding || 'Unicode';
    outputEncoding = flags.outputEncoding;
    if ((flags.autoencode || outputEncoding) && fonts[activeFontKey].metadata && fonts[activeFontKey].metadata[sourceEncoding] && fonts[activeFontKey].metadata[sourceEncoding].encoding) {
        encodingBlock = fonts[activeFontKey].metadata[sourceEncoding].encoding;
        if (!outputEncoding && fonts[activeFontKey].encoding) {
            outputEncoding = fonts[activeFontKey].encoding;
        }
        if (!outputEncoding && encodingBlock.codePages) {
            outputEncoding = encodingBlock.codePages[0];
        }

        if (typeof outputEncoding === 'string') {
            outputEncoding = encodingBlock[outputEncoding];
        }
        if (outputEncoding) {
            isUnicode = false;
            newtext = [];
            for (i = 0, l = text.length; i < l; i++) {
                ch = outputEncoding[text.charCodeAt(i)];
                if (ch) {
                    newtext.push(String.fromCharCode(ch));
                } else {
                    newtext.push(text[i]);
                }
                if (newtext[i].charCodeAt(0) >> 8) {
                    /* more than 255 */
                    isUnicode = true;
                }
            }
            text = newtext.join('');
        }
    }

    i = text.length;
    while (isUnicode === undefined && i !== 0) {
        if (text.charCodeAt(i - 1) >> 8) {
            /* more than 255 */
            isUnicode = true;
        }
        i--;
    }
    if (!isUnicode) {
        return text;
    }
    newtext = flags.noBOM ? [] : [254, 255];
    for (i = 0, l = text.length; i < l; i++) {
        ch = text.charCodeAt(i);
        bch = ch >> 8;
        if (bch >> 8) {
            throw new Error("Character at position " + i + " of string '" + text + "' exceeds 16bits. Cannot be encoded into UCS-2 BE");
        }
        newtext.push(bch);
        newtext.push(ch - (bch << 8));
    }
    return String.fromCharCode.apply(undefined, newtext);
};