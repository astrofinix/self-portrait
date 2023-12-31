/*!
 * SplitText 3.12.3
 * https://greensock.com
 *
 * @license Copyright 2023, GreenSock. All rights reserved.
 * *** DO NOT DEPLOY THIS FILE ***
 * This is a trial version that only works locally and on domains like codepen.io and codesandbox.io.
 * Loading it on an unauthorized domain violates the license and will cause a redirect.
 * Get the unrestricted file by joining Club GreenSock at https://greensock.com/club
 * @author: Jack Doyle, jack@greensock.com
 */

!(function (D, u) {
  "object" == typeof exports && "undefined" != typeof module
    ? u(exports)
    : "function" == typeof define && define.amd
    ? define(["exports"], u)
    : u(((D = D || self).window = D.window || {}));
})(this, function (u) {
  "use strict";
  var b =
   function n(D) {
    (U = document),
      (e = window),
      (i =
        i ||
        D ||
        e.gsap ||
        console.warn("Please gsap.registerPlugin(SplitText)")) &&
        ((r = i.utils.toArray),
        (s = i.core.context || function () {}),
        (t = 1));
  }
  function q() {
    return String.fromCharCode.apply(null, arguments);
  }
  function v(D) {
    return e.getComputedStyle(D);
  }
  function w(D) {
    return "absolute" === D.position || !0 === D.absolute;
  }
  function x(D, u) {
    for (var e, t = u.length; -1 < --t; )
      if (((e = u[t]), D.substr(0, e.length) === e)) return e.length;
  }
  function z(D, u) {
    void 0 === D && (D = "");
    var e = ~D.indexOf("++"),
      t = 1;
    return (
      e && (D = D.split("++").join("")),
      function () {
        return (
          "<" +
          u +
          " style='position:relative;display:inline-block;'" +
          (D ? " class='" + D + (e ? t++ : "") + "'>" : ">")
        );
      }
    );
  }
  function A(D, u, e) {
    var t = D.nodeType;
    if (1 === t || 9 === t || 11 === t)
      for (D = D.firstChild; D; D = D.nextSibling) A(D, u, e);
    else (3 !== t && 4 !== t) || (D.nodeValue = D.nodeValue.split(u).join(e));
  }
  function B(D, u) {
    for (var e = u.length; -1 < --e; ) D.push(u[e]);
  }
  function C(D, u, e) {
    for (var t; D && D !== u; ) {
      if ((t = D._next || D.nextSibling)) return t.textContent.charAt(0) === e;
      D = D.parentNode || D._parent;
    }
  }
  function D(u) {
    var e,
      t,
      F = r(u.childNodes),
      i = F.length;
    for (e = 0; e < i; e++)
      (t = F[e])._isSplit
        ? D(t)
        : e && t.previousSibling && 3 === t.previousSibling.nodeType
        ? ((t.previousSibling.nodeValue +=
            3 === t.nodeType ? t.nodeValue : t.firstChild.nodeValue),
          u.removeChild(t))
        : 3 !== t.nodeType &&
          (u.insertBefore(t.firstChild, t), u.removeChild(t));
  }
  function E(D, u) {
    return parseFloat(u[D]) || 0;
  }
  function F(u, e, t, F, i, n, s) {
    var r,
      o,
      l,
      d,
      a,
      p,
      h,
      f,
      c,
      g,
      x,
      y,
      b = v(u),
      S = E("paddingLeft", b),
      _ = -999,
      m = E("borderBottomWidth", b) + E("borderTopWidth", b),
      q = E("borderLeftWidth", b) + E("borderRightWidth", b),
      T = E("paddingTop", b) + E("paddingBottom", b),
      N = E("paddingLeft", b) + E("paddingRight", b),
      L = E("fontSize", b) * (e.lineThreshold || 0.2),
      W = b.textAlign,
      H = [],
      O = [],
      j = [],
      k = e.wordDelimiter || " ",
      V = e.tag ? e.tag : e.span ? "span" : "div",
      M = e.type || e.split || "chars,words,lines",
      R = i && ~M.indexOf("lines") ? [] : null,
      P = ~M.indexOf("words"),
      z = ~M.indexOf("chars"),
      G = w(e),
      $ = e.linesClass,
      I = ~($ || "").indexOf("++"),
      J = [],
      K = "flex" === b.display,
      Q = u.style.display;
    for (
      I && ($ = $.split("++").join("")),
        K && (u.style.display = "block"),
        l = (o = u.getElementsByTagName("*")).length,
        a = [],
        r = 0;
      r < l;
      r++
    )
      a[r] = o[r];
    if (R || G)
      for (r = 0; r < l; r++)
        ((p = (d = a[r]).parentNode === u) || G || (z && !P)) &&
          ((y = d.offsetTop),
          R &&
            p &&
            Math.abs(y - _) > L &&
            ("BR" !== d.nodeName || 0 === r) &&
            ((h = []), R.push(h), (_ = y)),
          G &&
            ((d._x = d.offsetLeft),
            (d._y = y),
            (d._w = d.offsetWidth),
            (d._h = d.offsetHeight)),
          R &&
            (((d._isSplit && p) ||
              (!z && p) ||
              (P && p) ||
              (!P &&
                d.parentNode.parentNode === u &&
                !d.parentNode._isSplit)) &&
              (h.push(d), (d._x -= S), C(d, u, k) && (d._wordEnd = !0)),
            "BR" === d.nodeName &&
              ((d.nextSibling && "BR" === d.nextSibling.nodeName) || 0 === r) &&
              R.push([])));
    for (r = 0; r < l; r++)
      if (((p = (d = a[r]).parentNode === u), "BR" !== d.nodeName))
        if (
          (G &&
            ((c = d.style),
            P || p || ((d._x += d.parentNode._x), (d._y += d.parentNode._y)),
            (c.left = d._x + "px"),
            (c.top = d._y + "px"),
            (c.position = "absolute"),
            (c.display = "block"),
            (c.width = d._w + 1 + "px"),
            (c.height = d._h + "px")),
          !P && z)
        )
          if (d._isSplit)
            for (
              d._next = o = d.nextSibling, d.parentNode.appendChild(d);
              o && 3 === o.nodeType && " " === o.textContent;

            )
              (d._next = o.nextSibling),
                d.parentNode.appendChild(o),
                (o = o.nextSibling);
          else
            d.parentNode._isSplit
              ? ((d._parent = d.parentNode),
                !d.previousSibling &&
                  d.firstChild &&
                  (d.firstChild._isFirst = !0),
                d.nextSibling &&
                  " " === d.nextSibling.textContent &&
                  !d.nextSibling.nextSibling &&
                  J.push(d.nextSibling),
                (d._next =
                  d.nextSibling && d.nextSibling._isFirst
                    ? null
                    : d.nextSibling),
                d.parentNode.removeChild(d),
                a.splice(r--, 1),
                l--)
              : p ||
                ((y = !d.nextSibling && C(d.parentNode, u, k)),
                d.parentNode._parent && d.parentNode._parent.appendChild(d),
                y && d.parentNode.appendChild(U.createTextNode(" ")),
                "span" === V && (d.style.display = "inline"),
                H.push(d));
        else
          d.parentNode._isSplit && !d._isSplit && "" !== d.innerHTML
            ? O.push(d)
            : z &&
              !d._isSplit &&
              ("span" === V && (d.style.display = "inline"), H.push(d));
      else
        R || G
          ? (d.parentNode && d.parentNode.removeChild(d), a.splice(r--, 1), l--)
          : P || u.appendChild(d);
    for (r = J.length; -1 < --r; ) J[r].parentNode.removeChild(J[r]);
    if (R) {
      for (
        G &&
          ((g = U.createElement(V)),
          u.appendChild(g),
          (x = g.offsetWidth + "px"),
          (y = g.offsetParent === u ? 0 : u.offsetLeft),
          u.removeChild(g)),
          c = u.style.cssText,
          u.style.cssText = "display:none;";
        u.firstChild;

      )
        u.removeChild(u.firstChild);
      for (f = " " === k && (!G || (!P && !z)), r = 0; r < R.length; r++) {
        for (
          h = R[r],
            (g = U.createElement(V)).style.cssText =
              "display:block;text-align:" +
              W +
              ";position:" +
              (G ? "absolute;" : "relative;"),
            $ && (g.className = $ + (I ? r + 1 : "")),
            j.push(g),
            l = h.length,
            o = 0;
          o < l;
          o++
        )
          "BR" !== h[o].nodeName &&
            ((d = h[o]),
            g.appendChild(d),
            f && d._wordEnd && g.appendChild(U.createTextNode(" ")),
            G &&
              (0 === o &&
                ((g.style.top = d._y + "px"), (g.style.left = S + y + "px")),
              (d.style.top = "0px"),
              y && (d.style.left = d._x - y + "px")));
        0 === l
          ? (g.innerHTML = "&nbsp;")
          : P || z || (D(g), A(g, String.fromCharCode(160), " ")),
          G && ((g.style.width = x), (g.style.height = d._h + "px")),
          u.appendChild(g);
      }
      u.style.cssText = c;
    }
    G &&
      (s > u.clientHeight &&
        ((u.style.height = s - T + "px"),
        u.clientHeight < s && (u.style.height = s + m + "px")),
      n > u.clientWidth &&
        ((u.style.width = n - N + "px"),
        u.clientWidth < n && (u.style.width = n + q + "px"))),
      K && (Q ? (u.style.display = Q) : u.style.removeProperty("display")),
      B(t, H),
      P && B(F, O),
      B(i, j);
  }
  function G(D, u, e, t) {
    function sb(D) {
      return D === p || (D === m && " " === p);
    }
    var F,
      i,
      n,
      C,
      s,
      E,
      r,
      o,
      l = u.tag ? u.tag : u.span ? "span" : "div",
      d = ~(u.type || u.split || "chars,words,lines").indexOf("chars"),
      a = w(u),
      p = u.wordDelimiter || " ",
      h = " " !== p ? "" : a ? "&#173; " : " ",
      f = "</" + l + ">",
      B = 1,
      c = u.specialChars
        ? "function" == typeof u.specialChars
          ? u.specialChars
          : x
        : null,
      g = U.createElement("div"),
      y = D.parentNode;
    for (
      y.insertBefore(g, D),
        g.textContent = D.nodeValue,
        y.removeChild(D),
        r =
          -1 !==
          (F = (function getText(D) {
            var u = D.nodeType,
              e = "";
            if (1 === u || 9 === u || 11 === u) {
              if ("string" == typeof D.textContent) return D.textContent;
              for (D = D.firstChild; D; D = D.nextSibling) e += getText(D);
            } else if (3 === u || 4 === u) return D.nodeValue;
            return e;
          })((D = g))).indexOf("<"),
        !1 !== u.reduceWhiteSpace && (F = F.replace(_, " ").replace(S, "")),
        r && (F = F.split("<").join("{{LT}}")),
        s = F.length,
        i = (" " === F.charAt(0) ? h : "") + e(),
        n = 0;
      n < s;
      n++
    )
      if (((E = F.charAt(n)), c && (o = c(F.substr(n), u.specialChars))))
        (E = F.substr(n, o || 1)),
          (i += d && " " !== E ? t() + E + "</" + l + ">" : E),
          (n += o - 1);
      else if (sb(E) && !sb(F.charAt(n - 1)) && n) {
        for (i += B ? f : "", B = 0; sb(F.charAt(n + 1)); ) (i += h), n++;
        n === s - 1
          ? (i += h)
          : ")" !== F.charAt(n + 1) && ((i += h + e()), (B = 1));
      } else
        "{" === E && "{{LT}}" === F.substr(n, 6)
          ? ((i += d ? t() + "{{LT}}</" + l + ">" : "{{LT}}"), (n += 5))
          : (55296 <= E.charCodeAt(0) && E.charCodeAt(0) <= 56319) ||
            (65024 <= F.charCodeAt(n + 1) && F.charCodeAt(n + 1) <= 65039)
          ? ((C = ((F.substr(n, 12).split(b) || [])[1] || "").length || 2),
            (i +=
              d && " " !== E
                ? t() + F.substr(n, C) + "</" + l + ">"
                : F.substr(n, C)),
            (n += C - 1))
          : (i += d && " " !== E ? t() + E + "</" + l + ">" : E);
    (D.outerHTML = i + (B ? f : "")), r && A(y, "{{LT}}", "<");
  }
  function H(D, u, e, t) {
    var F,
      i,
      n = r(D.childNodes),
      C = n.length,
      s = w(u);
    if (3 !== D.nodeType || 1 < C) {
      for (u.absolute = !1, F = 0; F < C; F++)
        ((i = n[F])._next = i._isFirst = i._parent = i._wordEnd = null),
          (3 === i.nodeType && !/\S+/.test(i.nodeValue)) ||
            (s &&
              3 !== i.nodeType &&
              "inline" === v(i).display &&
              ((i.style.display = "inline-block"),
              (i.style.position = "relative")),
            (i._isSplit = !0),
            H(i, u, e, t));
      return (u.absolute = s), void (D._isSplit = !0);
    }
    G(D, u, e, t);
  }
  var U,
    e,
    t,
    i,
    s,
    r,
    o,
    S = /(?:\r|\n|\t\t)/g,
    _ = /(?:\s\s+)/g,
    m = String.fromCharCode(160),
    l = "SplitText",
    d = q(103, 114, 101, 101, 110, 115, 111, 99, 107, 46, 99, 111, 109),
    a = q(103, 115, 97, 112, 46, 99, 111, 109),
    p = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}:?\d*$/,
    h = (function (D) {
      var u = "undefined" != typeof window,
        e =
          0 ===
            (u ? window.location.href : "").indexOf(
              q(102, 105, 108, 101, 58, 47, 47)
            ) ||
          -1 !== D.indexOf(q(108, 111, 99, 97, 108, 104, 111, 115, 116)) ||
          p.test(D),
        t = [
          d,
          a,
          q(99, 111, 100, 101, 112, 101, 110, 46, 105, 111),
          q(
            99,
            111,
            100,
            101,
            112,
            101,
            110,
            46,
            112,
            108,
            117,
            109,
            98,
            105,
            110,
            103
          ),
          q(99, 111, 100, 101, 112, 101, 110, 46, 100, 101, 118),
          q(99, 111, 100, 101, 112, 101, 110, 46, 97, 112, 112),
          q(
            99,
            111,
            100,
            101,
            112,
            101,
            110,
            46,
            119,
            101,
            98,
            115,
            105,
            116,
            101
          ),
          q(112, 101, 110, 115, 46, 99, 108, 111, 117, 100),
          q(99, 115, 115, 45, 116, 114, 105, 99, 107, 115, 46, 99, 111, 109),
          q(99, 100, 112, 110, 46, 105, 111),
          q(112, 101, 110, 115, 46, 105, 111),
          q(103, 97, 110, 110, 111, 110, 46, 116, 118),
          q(99, 111, 100, 101, 99, 97, 110, 121, 111, 110, 46, 110, 101, 116),
          q(
            116,
            104,
            101,
            109,
            101,
            102,
            111,
            114,
            101,
            115,
            116,
            46,
            110,
            101,
            116
          ),
          q(99, 101, 114, 101, 98, 114, 97, 120, 46, 99, 111, 46, 117, 107),
          q(116, 121, 109, 112, 97, 110, 117, 115, 46, 110, 101, 116),
          q(116, 119, 101, 101, 110, 109, 97, 120, 46, 99, 111, 109),
          q(112, 108, 110, 107, 114, 46, 99, 111),
          q(104, 111, 116, 106, 97, 114, 46, 99, 111, 109),
          q(119, 101, 98, 112, 97, 99, 107, 98, 105, 110, 46, 99, 111, 109),
          q(97, 114, 99, 104, 105, 118, 101, 46, 111, 114, 103),
          q(99, 111, 100, 101, 115, 97, 110, 100, 98, 111, 120, 46, 105, 111),
          q(99, 115, 98, 46, 97, 112, 112),
          q(115, 116, 97, 99, 107, 98, 108, 105, 116, 122, 46, 99, 111, 109),
          q(115, 116, 97, 99, 107, 98, 108, 105, 116, 122, 46, 105, 111),
          q(99, 111, 100, 105, 101, 114, 46, 105, 111),
          q(
            109,
            111,
            116,
            105,
            111,
            110,
            116,
            114,
            105,
            99,
            107,
            115,
            46,
            99,
            111,
            109
          ),
          q(
            115,
            116,
            97,
            99,
            107,
            111,
            118,
            101,
            114,
            102,
            108,
            111,
            119,
            46,
            99,
            111,
            109
          ),
          q(
            115,
            116,
            97,
            99,
            107,
            101,
            120,
            99,
            104,
            97,
            110,
            103,
            101,
            46,
            99,
            111,
            109
          ),
          q(
            115,
            116,
            117,
            100,
            105,
            111,
            102,
            114,
            101,
            105,
            103,
            104,
            116,
            46,
            99,
            111,
            109
          ),
          q(
            119,
            101,
            98,
            99,
            111,
            110,
            116,
            97,
            105,
            110,
            101,
            114,
            46,
            105,
            111
          ),
          q(106, 115, 102, 105, 100, 100, 108, 101, 46, 110, 101, 116),
        ],
        F = t.length;
      for (
        setTimeout(function checkWarn() {
          if (u)
            if (
              "loading" === document.readyState ||
              "interactive" === document.readyState
            )
              document.addEventListener("readystatechange", checkWarn);
            else {
              document.removeEventListener("readystatechange", checkWarn);
              var D = "object" == typeof i ? i : u && window.gsap;
              u &&
                window.console &&
                !window._gsapWarned &&
                "object" == typeof D &&
                !1 !== D.config().trialWarn &&
                (console.log(
                  q(37, 99, 87, 97, 114, 110, 105, 110, 103),
                  q(
                    102,
                    111,
                    110,
                    116,
                    45,
                    115,
                    105,
                    122,
                    101,
                    58,
                    51,
                    48,
                    112,
                    120,
                    59,
                    99,
                    111,
                    108,
                    111,
                    114,
                    58,
                    114,
                    101,
                    100,
                    59
                  )
                ),
                console.log(
                  q(
                    65,
                    32,
                    116,
                    114,
                    105,
                    97,
                    108,
                    32,
                    118,
                    101,
                    114,
                    115,
                    105,
                    111,
                    110,
                    32,
                    111,
                    102,
                    32
                  ) +
                    l +
                    q(
                      32,
                      105,
                      115,
                      32,
                      108,
                      111,
                      97,
                      100,
                      101,
                      100,
                      32,
                      116,
                      104,
                      97,
                      116,
                      32,
                      111,
                      110,
                      108,
                      121,
                      32,
                      119,
                      111,
                      114,
                      107,
                      115,
                      32,
                      108,
                      111,
                      99,
                      97,
                      108,
                      108,
                      121,
                      32,
                      97,
                      110,
                      100,
                      32,
                      111,
                      110,
                      32,
                      100,
                      111,
                      109,
                      97,
                      105,
                      110,
                      115,
                      32,
                      108,
                      105,
                      107,
                      101,
                      32,
                      99,
                      111,
                      100,
                      101,
                      112,
                      101,
                      110,
                      46,
                      105,
                      111,
                      32,
                      97,
                      110,
                      100,
                      32,
                      99,
                      111,
                      100,
                      101,
                      115,
                      97,
                      110,
                      100,
                      98,
                      111,
                      120,
                      46,
                      105,
                      111,
                      46,
                      32,
                      42,
                      42,
                      42,
                      32,
                      68,
                      79,
                      32,
                      78,
                      79,
                      84,
                      32,
                      68,
                      69,
                      80,
                      76,
                      79,
                      89,
                      32,
                      84,
                      72,
                      73,
                      83,
                      32,
                      70,
                      73,
                      76,
                      69,
                      32,
                      42,
                      42,
                      42,
                      32,
                      76,
                      111,
                      97,
                      100,
                      105,
                      110,
                      103,
                      32,
                      105,
                      116,
                      32,
                      111,
                      110,
                      32,
                      97,
                      110,
                      32,
                      117,
                      110,
                      97,
                      117,
                      116,
                      104,
                      111,
                      114,
                      105,
                      122,
                      101,
                      100,
                      32,
                      115,
                      105,
                      116,
                      101,
                      32,
                      118,
                      105,
                      111,
                      108,
                      97,
                      116,
                      101,
                      115,
                      32,
                      116,
                      104,
                      101,
                      32,
                      108,
                      105,
                      99,
                      101,
                      110,
                      115,
                      101,
                      32,
                      97,
                      110,
                      100,
                      32,
                      119,
                      105,
                      108,
                      108,
                      32,
                      99,
                      97,
                      117,
                      115,
                      101,
                      32,
                      97,
                      32,
                      114,
                      101,
                      100,
                      105,
                      114,
                      101,
                      99,
                      116,
                      46,
                      32,
                      80,
                      108,
                      101,
                      97,
                      115,
                      101,
                      32,
                      106,
                      111,
                      105,
                      110,
                      32,
                      67,
                      108,
                      117,
                      98,
                      32,
                      71,
                      114,
                      101,
                      101,
                      110,
                      83,
                      111,
                      99,
                      107,
                      32,
                      116,
                      111,
                      32,
                      103,
                      101,
                      116,
                      32,
                      102,
                      117,
                      108,
                      108,
                      32,
                      97,
                      99,
                      99,
                      101,
                      115,
                      115,
                      32,
                      116,
                      111,
                      32,
                      116,
                      104,
                      101,
                      32,
                      98,
                      111,
                      110,
                      117,
                      115,
                      32,
                      112,
                      108,
                      117,
                      103,
                      105,
                      110,
                      115,
                      32,
                      116,
                      104,
                      97,
                      116,
                      32,
                      98,
                      111,
                      111,
                      115,
                      116,
                      32,
                      121,
                      111,
                      117,
                      114,
                      32,
                      97,
                      110,
                      105,
                      109,
                      97,
                      116,
                      105,
                      111,
                      110,
                      32,
                      115,
                      117,
                      112,
                      101,
                      114,
                      112,
                      111,
                      119,
                      101,
                      114,
                      115,
                      46,
                      32,
                      68,
                      105,
                      115,
                      97,
                      98,
                      108,
                      101,
                      32,
                      116,
                      104,
                      105,
                      115,
                      32,
                      119,
                      97,
                      114,
                      110,
                      105,
                      110,
                      103,
                      32,
                      119,
                      105,
                      116,
                      104,
                      32,
                      103,
                      115,
                      97,
                      112,
                      46,
                      99,
                      111,
                      110,
                      102,
                      105,
                      103,
                      40,
                      123,
                      116,
                      114,
                      105,
                      97,
                      108,
                      87,
                      97,
                      114,
                      110,
                      58,
                      32,
                      102,
                      97,
                      108,
                      115,
                      101,
                      125,
                      41,
                      59
                    )
                ),
                console.log(
                  q(
                    37,
                    99,
                    71,
                    101,
                    116,
                    32,
                    117,
                    110,
                    114,
                    101,
                    115,
                    116,
                    114,
                    105,
                    99,
                    116,
                    101,
                    100,
                    32,
                    102,
                    105,
                    108,
                    101,
                    115,
                    32,
                    97,
                    116,
                    32,
                    104,
                    116,
                    116,
                    112,
                    115,
                    58,
                    47,
                    47,
                    103,
                    114,
                    101,
                    101,
                    110,
                    115,
                    111,
                    99,
                    107,
                    46,
                    99,
                    111,
                    109,
                    47,
                    99,
                    108,
                    117,
                    98
                  ),
                  q(
                    102,
                    111,
                    110,
                    116,
                    45,
                    115,
                    105,
                    122,
                    101,
                    58,
                    49,
                    54,
                    112,
                    120,
                    59,
                    99,
                    111,
                    108,
                    111,
                    114,
                    58,
                    35,
                    52,
                    101,
                    57,
                    56,
                    49,
                    53
                  )
                ),
                (window._gsapWarned = 1));
            }
        }, 50);
        -1 < --F;

      )
        if (-1 !== D.indexOf(t[F])) return !0;
      return (
        e ||
        !setTimeout(function () {
          u &&
            (window.location.href =
              q(104, 116, 116, 112, 115, 58, 47, 47) +
              d +
              q(
                47,
                114,
                101,
                113,
                117,
                105,
                114,
                101,
                115,
                45,
                109,
                101,
                109,
                98,
                101,
                114,
                115,
                104,
                105,
                112,
                47
              ) +
              "?plugin=" +
              l +
              "&source=trial");
        }, 4e3)
      );
    })("undefined" != typeof window ? window.location.host : ""),
    f =
      (((o = SplitText.prototype).split = function split(D) {
        this.isSplit && this.revert(),
          (this.vars = D = D || this.vars),
          (this._originals.length =
            this.chars.length =
            this.words.length =
            this.lines.length =
              0);
        for (
          var u,
            e,
            t,
            i = this.elements.length,
            n = D.tag ? D.tag : D.span ? "span" : "div",
            C = z(D.wordsClass, n),
            s = z(D.charsClass, n);
          -1 < --i;

        )
          (t = this.elements[i]),
            (this._originals[i] = {
              html: t.innerHTML,
              style: t.getAttribute("style"),
            }),
            (u = t.clientHeight),
            (e = t.clientWidth),
            H(t, D, C, s),
            F(t, D, this.chars, this.words, this.lines, e, u);
        return (
          this.chars.reverse(),
          this.words.reverse(),
          this.lines.reverse(),
          (this.isSplit = !0),
          this
        );
      }),
      (o.revert = function revert() {
        var e = this._originals;
        if (!e) throw "revert() call wasn't scoped properly.";
        return (
          this.elements.forEach(function (D, u) {
            (D.innerHTML = e[u].html), D.setAttribute("style", e[u].style);
          }),
          (this.chars = []),
          (this.words = []),
          (this.lines = []),
          (this.isSplit = !1),
          this
        );
      }),
      (SplitText.create = function create(D, u) {
        return new SplitText(D, u);
      }),
      SplitText);
  function SplitText(D, u) {
    t || n(),
      (this.elements = r(D)),
      (this.chars = []),
      (this.words = []),
      (this.lines = []),
      (this._originals = []),
      (this.vars = u || {}),
      s(this),
      h && this.split(u);
  }
  (f.version = "3.12.3"), (f.register = n), (u.SplitText = f), (u.default = f);
  if (typeof window === "undefined" || window !== u) {
    Object.defineProperty(u, "__esModule", { value: !0 });
  } else {
    delete u.default;
  }
});
