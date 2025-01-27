function vietUni(a) {
    if (document.all || document.getElementById) {
        this.method = (a == undefined || a == null) ? 4 : a;
        return this
    }
    alert("Xin loi, trinh duyet web cua ban khong cho phep dung VietTyping.");
    return false
}
vietUni.prototype.setMethod = function (a) {
    this.method = a;
    if (this.typer) this.typer.keyMode = this.initKeys()
};
vietUni.prototype.initKeys = function () {
    switch (this.method) {
        case 1:
            if (!this.telexKeys) this.telexKeys = new vietKeysTelex();
            return this.telexKeys;
        case 2:
            if (!this.vniKeys) this.vniKeys = new vietKeysVni();
            return this.vniKeys;
        case 3:
            if (!this.viqrKeys) this.viqrKeys = new vietKeysViqr();
            return this.viqrKeys;
        case 4:
            if (!this.allKeys) this.allKeys = new vietKeysAll();
            return this.allKeys;
        default:
            if (!this.vkOff) this.vkOff = new vietKeysOff();
            return this.vkOff
    }
};
vietUni.prototype.initTyper = function (b) {

    if (!b) return;
    if (!this.typer) {
        this.typer = new vietTyper();
        this.typer.keyMode = this.initKeys()
    }
    var c = this;
    if (b.attachEvent) {
        b.attachEvent("onkeypress", function (a) {
            return vietUni.vietTyping(a, c, b)
        })
    } else if (b.addEventListener) {
        b.addEventListener("keypress", function (a) {
            return vietUni.vietTyping(a, c, b)
        }, true)
    } else if (b.onkeypress) {
        var d = b.onkeypress;
        if (typeof d !== "function") {
            b.onkeypress = function (a) {
                return vietUni.vietTyping(a, c, b)
            }
        } else {
            b.onkeypress = function (a) {
                return (!d(a)) ? false : vietUni.vietTyping(a, c, b)
            }
        }
    }
};
vietUni.vietTyping = function (a, b, d) {

    if (!b || b.typer.keyMode.off) return true;
    if (!a) a = event;
    var c = document.all ? a.keyCode : (a.which || a.charCode);
    if (c < 49 && c != 16 && c != 20) return true;
    var e, s = b.getCurrentWord(d);
    if (s == null || (e = s.length) < 1 || s.match(/\s+$/)) return true;
    b.typer.value = s;
    if (c > 32 && b.typer.typing(c)) {
        if (((s = b.typer.value).length == e + 1) && c == s.charCodeAt(e)) {
            b.typer.value = s.substr(0, e);
            e = 0
        }
        b.replaceWord(d, b.typer.value);
        if (e > 0) {
            if (typeof a.cancelBubble !== "undefined") {
                a.cancelBubble = true
            }
            if (a.stopPropagation) {
                a.preventDefault();
                a.stopPropagation()
            }
            return false
        }
    }
    return (!a.cancelBubble)
};
vietUni.prototype.getCurrentWord = function (a) {

    if (document.selection && !a.createRange) {
        var b = (!a.selection) ? a.document.selection.createRange() : a.selection.createRange();
        if (b.text) return null;
        var c;
        try {
            c = b.duplicate();
            c.moveStart("word", -1)
        } catch (e) {
            var d = -10;
            do {
                c = b.duplicate();
                c.moveStart("character", d++)
            } while (!c.text && d < 0)
        }
        a.curWord = c.duplicate();
        return c.text
    } else if (a.setSelectionRange) {
        var f = a.selectionStart,
            i = a.selectionEnd;
        if (f != i) return null;
        f = Math.max(0, i - 10);
        a.pos1 = f;
        a.pos2 = i;
        return a.value.substr(f, i - f)
    } else if (window.getSelection) {
        var g = a.defaultView.getSelection();
        var h = g.getRangeAt(g.rangeCount - 1).cloneRange();
        if (h.toString()) return null;
        var i = h.startOffset,
            nod = h.endContainer;
        h.setEnd(nod, i);
        h.setStart(nod, Math.max(0, i - 10));
        a.rng1 = h;
        a.nod1 = nod;
        a.pos1 = h.startOffset;
        a.pos2 = i;
        var j = h.toString();
        h.setStart(nod, i);
        return j
    } else if (typeof a.value !== "undefined") {
        return a.value
    }
    return null
};
vietUni.prototype.replaceWord = function (a, b) {

    if (document.selection && !a.createRange && a.curWord) {
        a.curWord.text = b;
        a.curWord.collapse(false)
    } else if (a.setSelectionRange) {
        var c = a.pos1,
            p2 = a.pos2,
            txt = a.value;
        a.value = txt.substr(0, c) + b + txt.substr(p2);
        a.setSelectionRange(c + b.length, c + b.length)
    } else if (window.getSelection && a.nod1 && a.nod1.insertData) {
        a.rng1.setStart(a.nod1, a.pos1);
        a.nod1.insertData(a.pos1, b);
        a.nod1.deleteData(a.pos1 + b.length, a.pos2 - a.pos1);
        a.rng1.setEnd(a.nod1, a.pos2);
        a.rng1.setStart(a.nod1, a.pos2)
    } else if (typeof a.value !== "undefined") {
        a.value = b
    }
};

function vietTyper() {
    this.value = "";
    this.charMap = new vietUnicodeMap();
    this.ctrlChar = '-';
    this.changed = 0;
    return this
}
vietTyper.prototype.typing = function (a) {
    this.changed = 0;
    this.ctrlChar = String.fromCharCode(a);
    this.keyMode.getAction(this);
    this.correct();
    return this.changed
};
vietTyper.prototype.compose = function (a) {
    if (!this.value) return;
    var b = this.findCharToChange(a);
    if (!b || !b[0]) return;
    var c;
    if (b[0] == '\\') {
        c = [1, this.ctrlChar, 1]
    } else if (a > 6) {
        c = this.charMap.getAEOWD(b[0], a, b[3])
    } else {
        c = this.charMap.getDau(b[0], a)
    }
    if (!(this.changed = c[0])) return;
    this.value = this.value.substr(0, b[1]) + c[1] + this.value.substr(b[1] + b[2]);
    if (!c[2]) this.value += this.ctrlChar
};
vietTyper.prototype.correct = function () {
    var a = this.value;
    if ('nNcC'.indexOf(this.ctrlChar) >= 0) a += this.ctrlChar;
    var b = /[^\x01-\x7f](hn|hc|gn)$/i.exec(a);
    if (b) {
        this.value = a.substr(0, a.length - 2) + b[1].charAt(1) + b[1].charAt(0);
        this.changed = 1
    } else if (!this.changed) {
        return 0
    }
    b = /\w([^\x01-\x7f])(\w*)([^\x01-\x7f])\S*$/.exec(this.value);
    if (!b) return 0;
    var i = this.charMap.isVowel(b[1]);
    var c = (i - 1) % 24 + 1,
        ci = (i - c) / 24;
    var d = this.charMap.isVowel(b[3]);
    if (!ci || !d) return 0;
    var e = (d - 1) % 24 + 1;
    var f = this.charMap.charAt(c) + b[2] + this.charMap.charAt(ci * 24 + e);
    this.value = this.value.replace(new RegExp(b[1] + b[2] + b[3], 'g'), f)
};
vietTyper.prototype.findCharToChange = function (a) {
    var b = this.charMap.lastCharsOf(this.value, 5);
    var i = 0,
        c = b[0][0],
        chr = 0;
    if (c == '\\') return [c, this.value.length - 1, 1];
    if (a == 15) {
        while (!(chr = this.charMap.isVD(c))) {
            if ((c < 'A') || (i >= 4) || !(c = b[++i][0])) return null
        }
    } else {
        while ("cghmnptCGHMNPT".indexOf(c) >= 0) {
            if ((c < 'A') || (i >= 2) || !(c = b[++i][0])) return null
        }
    }
    c = b[0][0].toLowerCase();
    var d = b[1][0].toLowerCase();
    var e = b[2][0].toLowerCase();
    if (i == 0 && a != 15) {
        if ((chr = this.charMap.isVowel(b[1][0])) && ("uyoia".indexOf(c) >= 0) && !this.charMap.isUO(d, c) && !((d == 'o' && c == 'a') || (d == 'u' && c == 'y')) && !((e == 'q' && d == 'u') || (e == 'g' && d == 'i'))) i++;
        if (c == 'a' && (a == 9 || a == 7)) i = 0
    }
    c = b[i][0];
    if ((i == 0 || chr == 0) && a != 15) chr = this.charMap.isVowel(c);
    if (!chr) return null;
    var f = b[i][1],
        isuo = 0;
    if ((i > 0) && (a == 7 || a == 8 || a == 11)) {
        isuo = this.charMap.isUO(b[i + 1][0], c);
        if (isuo) {
            chr = isuo;
            f += b[++i][1];
            isuo = 1
        }
    }
    var g = this.value.length;
    for (var j = 0; j <= i; j++) g -= b[j][1];
    return [chr, g, f, isuo]
};

function vietCharMap() {
    this.vietChars = null;
    this.length = 149;
    this.chrCache = new Array(20);
    this.indCache = new Array(20);
    this.cptr = 0;
    this.caching = function (a, b) {
        this.chrCache[this.cptr] = a;
        this.indCache[this.cptr++] = b;
        this.cptr %= 20
    };
    this.vmap = [
        [7, 7, 7, 8, 8, 8, 9, 10, 11, 15],
        [0, 3, 6, 0, 6, 9, 0, 3, 6, 0],
        [1, 4, 7, 2, 8, 10, 1, 4, 7, 1]
    ];
    return this
}
vietCharMap.prototype.charAt = function (a) {
    var b = this.vietChars[a];
    return b ? String.fromCharCode(b) : null
};
vietCharMap.prototype.isVowel = function (a) {
    var i = 0;
    while ((i < 20) && (a != this.chrCache[i])) i++;
    if (i < 20) return this.indCache[i];
    i = this.length - 5;
    while ((a != this.charAt(i)) && i) i--;
    this.caching(a, i);
    return i
};
vietCharMap.prototype.isVD = function (a) {
    var b = this.length - 5;
    while ((a != this.charAt(b)) && (b < this.length)) b++;
    return (b < this.length) ? b : 0
};
vietCharMap.prototype.isUO = function (a, b) {
    if (!a || !b) return 0;
    var c = this.isVowel(a);
    var d = (c - 1) % 12;
    if ((d != 9) && (d != 10)) return 0;
    var e = this.isVowel(b);
    d = (e - 1) % 12;
    if ((d != 6) && (d != 7) && (d != 8)) return 0;
    return [c, e]
};
vietCharMap.prototype.getDau = function (a, b) {
    var c = (a < 25) ? 0 : 1;
    var d = (a - 1) % 24 + 1;
    var e = (b == 6) ? 0 : b;
    if ((b == 6) && !c) return [0];
    var f = e * 24 + d;
    if (f == a) f = d;
    var g = this.charAt(f);
    if (!g) g = this.lowerCaseOf(0, f);
    return [1, g, f > 24 || b == 6]
};
vietCharMap.prototype.getAEOWD = function (a, b, d) {
    var c = 0,
        i1 = d ? a[0] : a;
    var e = (b == 15) ? (i1 - 1) % 2 : (i1 - 1) % 12;
    if (d) {
        var f = a[1] - (a[1] - 1) % 12;
        if (b == 7 || b == 11) {
            c = this.charAt(i1 - e + 9) + this.charAt(f + 7)
        } else if (b == 8) {
            c = this.charAt(i1 - e + 10) + this.charAt(f + 8)
        }
        return [c != 0, c, 1]
    }
    var i = -1,
        shif = 0,
        del = 0;
    while (shif == 0 && ++i < this.vmap[0].length) {
        if (this.vmap[0][i] == b) {
            if (this.vmap[1][i] == e) {
                shif = this.vmap[2][i] - e
            } else if (this.vmap[2][i] == e) {
                shif = this.vmap[1][i] - e
            }
        }
    }
    if (shif == 0) {
        if (b == 7 && (e == 2 || e == 8)) shif = -1;
        else if ((b == 9 && e == 2) || (b == 11 && e == 8)) shif = -1;
        else if (b == 8 && (e == 1 || e == 7)) shif = 1;
        del = 1
    } else {
        del = (shif > 0)
    }
    i1 += shif;
    var g = this.charAt(i1);
    if (i1 < 145) this.caching(g, i1);
    if (!g) g = this.lowerCaseOf(0, i1);
    return [shif != 0, g, del]
};
vietCharMap.prototype.lastCharsOf = function (a, b) {
    if (!b) return [a.charAt(a.length - 1), 1];
    var c = new Array(b);
    for (var i = 0; i < b; i++) {
        c[i] = [a.charAt(a.length - i - 1), 1]
    }
    return c
};

function vietUnicodeMap() {
    var a = new vietCharMap();
    a.vietChars = new Array("UNICODE", 97, 226, 259, 101, 234, 105, 111, 244, 417, 117, 432, 121, 65, 194, 258, 69, 202, 73, 79, 212, 416, 85, 431, 89, 225, 7845, 7855, 233, 7871, 237, 243, 7889, 7899, 250, 7913, 253, 193, 7844, 7854, 201, 7870, 205, 211, 7888, 7898, 218, 7912, 221, 224, 7847, 7857, 232, 7873, 236, 242, 7891, 7901, 249, 7915, 7923, 192, 7846, 7856, 200, 7872, 204, 210, 7890, 7900, 217, 7914, 7922, 7841, 7853, 7863, 7865, 7879, 7883, 7885, 7897, 7907, 7909, 7921, 7925, 7840, 7852, 7862, 7864, 7878, 7882, 7884, 7896, 7906, 7908, 7920, 7924, 7843, 7849, 7859, 7867, 7875, 7881, 7887, 7893, 7903, 7911, 7917, 7927, 7842, 7848, 7858, 7866, 7874, 7880, 7886, 7892, 7902, 7910, 7916, 7926, 227, 7851, 7861, 7869, 7877, 297, 245, 7895, 7905, 361, 7919, 7929, 195, 7850, 7860, 7868, 7876, 296, 213, 7894, 7904, 360, 7918, 7928, 100, 273, 68, 272);
    return a
}

function vietKeys() {
    this.getAction = function (a) {
        var i = this.keys.indexOf(a.ctrlChar.toLowerCase());
        if (i >= 0) a.compose(this.actions[i])
    };
    return this
}

function vietKeysOff() {
    this.off = true;
    this.getAction = function (a) { };
    return this
}

function vietKeysTelex() {
    var k = new vietKeys();
    k.keys = "sfjrxzaeowd";
    k.actions = [1, 2, 3, 4, 5, 6, 9, 10, 11, 8, 15];
    return k
}

function vietKeysVni() {
    var k = new vietKeys();
    k.keys = "0123456789";
    k.actions = [6, 1, 2, 4, 5, 3, 7, 8, 8, 15];
    return k
}

function vietKeysViqr() {
    var k = new vietKeys();
    k.keys = "\xB4/'\u2019`.?~-^(*+d";
    k.actions = [1, 1, 1, 1, 2, 3, 4, 5, 6, 7, 8, 8, 8, 15];
    return k
}

function vietKeysAll() {
    var k = new vietKeys();
    k.keys = "sfjrxzaeowd0123456789\xB4/'`.?~-^(*+d";
    k.actions = [1, 2, 3, 4, 5, 6, 9, 10, 11, 8, 15, 6, 1, 2, 4, 5, 3, 7, 8, 8, 15, 1, 1, 1, 2, 3, 4, 5, 6, 7, 8, 8, 8, 15];
    return k
}

export { vietUni }