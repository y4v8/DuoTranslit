// ==UserScript==
// @name        DuoTranslit
// @namespace   duolingo
// @include     https://www.duolingo.com/*
// @version     1.0.2
// @updateURL   https://raw.githubusercontent.com/y4v8/DuoTranslit/master/duotranslit.user.js
// @downloadURL https://raw.githubusercontent.com/y4v8/DuoTranslit/master/duotranslit.user.js
// @grant       none
// ==/UserScript==

"use strict"

let en = "`qwertyuiop[]asdfghjkl;'zxcvbnm,.~QWERTYUIOP{}ASDFGHJKL:\"ZXCVBNM<>"
let ru = "ёйцукенгшщзхъфывапролджэячсмитьбюЁЙЦУКЕНГШЩЗХЪФЫВАПРОЛДЖЭЯЧСМИТЬБЮ"

window.addEventListener("keydown", e => {
    if (e.target && (e.target.tagName == "TEXTAREA" || e.target.tagName == "INPUT") && 'lang' in e.target) {
        if (e.target.lang == "ru") {
            translit(e, en, ru)
        } else {
            translit(e, ru, en)
        }
    }
}, false)

function translit(e, from, to) {
    let i = from.indexOf(e.key)
    if (i == -1) {
        return
    }
    e.preventDefault()

    let a = e.target
    let start = a.selectionStart
    let end = a.selectionEnd

    a.value = a.value.substr(0, start) + to[i] + a.value.substr(end)

    start++
    a.setSelectionRange(start, start)

    a.blur()
    a.focus()
}