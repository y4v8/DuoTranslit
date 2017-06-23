// ==UserScript==
// @name        DuoTranslit
// @namespace   duolingo
// @include     https://www.duolingo.com/*
// @version     1.0.1
// @updateURL   https://raw.githubusercontent.com/y4v8/DuoTranslit/master/duotranslit.user.js
// @downloadURL https://raw.githubusercontent.com/y4v8/DuoTranslit/master/duotranslit.user.js
// @grant       none
// ==/UserScript==

"use strict"

let en = "`qwertyuiop[]asdfghjkl;'zxcvbnm,.~QWERTYUIOP{}ASDFGHJKL:\"ZXCVBNM<>"
let ru = "ёйцукенгшщзхъфывапролджэячсмитьбюЁЙЦУКЕНГШЩЗХЪФЫВАПРОЛДЖЭЯЧСМИТЬБЮ"

window.addEventListener("keydown", e => {
  if (e.target && (e.target.tagName == "TEXTAREA" || e.target.tagName == "INPUT" ) && 'lang' in e.target) {
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

  let a = e.target
  let start = a.selectionStart
  let end = a.selectionEnd

  a.value = a.value.substr(0,start) + to[i] + a.value.substr(end)

  start++
  a.setSelectionRange(start, start)
}

window.addEventListener("input", e => {
  if (e.target && (e.target.tagName == "TEXTAREA" || e.target.tagName == "INPUT" ) && 'lang' in e.target) {
    if (e.target.lang == "ru") {
      removeLastChar(e, en, ru)
    } else {
      removeLastChar(e, ru, en)
    }
  }
}, true)

function removeLastChar(e, from, to) {
  let a = e.target
  let start = a.selectionStart
  let end = a.selectionEnd
  
  if (start != end || start == 0) {
   return
  }
  
  start--
  let key = a.value.substr(start, 1)
  let i = from.indexOf(key)
  if (i == -1) {
    return
  }

  a.value = a.value.substr(0,start) + a.value.substr(end)
  a.setSelectionRange(start, start)
}
