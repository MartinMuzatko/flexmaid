! function(e) {
    function t(o) {
        if (l[o]) return l[o].exports;
        var r = l[o] = {
            exports: {},
            id: o,
            loaded: !1
        };
        return e[o].call(r.exports, r, r.exports, t), r.loaded = !0, r.exports
    }
    var l = {};
    return t.m = e, t.c = l, t.p = "", t(0)
}([function(e, t, l) {
    (function(e) {
        "use strict";
        l(12), l(15), l(16), l(17);
        var t = l(22);
        e.mixin("noUiSlider", {
            noUiSlider: t
        }, !0), e.mount("*")
    }).call(t, l(12))
}, , , , , , , , , , , , function(e, t, l) {
    var o, r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
        return typeof e
    } : function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol ? "symbol" : typeof e
    };
    ! function(n, a) {
        "use strict";

        function i(e, t, l) {
            var o = {};
            return o[e.key] = t, e.pos && (o[e.pos] = l), o
        }

        function f(e, t) {
            for (var l, o = t.length, r = e.length; o > r;) l = t[--o], t.splice(o, 1), l.unmount()
        }

        function s(e, t) {
            Object.keys(e.tags).forEach(function(l) {
                var o = e.tags[l];
                H(o) ? w(o, function(e) {
                    M(e, l, t)
                }) : M(o, l, t)
            })
        }

        function m(e, t, l) {
            var o, r = e._root;
            for (e._virts = []; r;) o = r.nextSibling, l ? t.insertBefore(r, l._root) : t.appendChild(r), e._virts.push(r), r = o
        }

        function x(e, t, l, o) {
            for (var r, n = e._root, a = 0; o > a; a++) r = n.nextSibling, t.insertBefore(n, l._root), n = r
        }

        function d(e, t, l) {
            C(e, "each");
            var o, n = r(N(e, "no-reorder")) !== ae || C(e, "no-reorder"),
                a = A(e),
                d = te[a] || {
                    tmpl: v(e)
                },
                u = me.test(a),
                g = e.parentNode,
                h = document.createTextNode(""),
                p = L(e),
                y = "option" === a.toLowerCase(),
                w = [],
                b = [],
                k = "VIRTUAL" == e.tagName;
            l = he.loopKeys(l), g.insertBefore(h, e), t.one("before-mount", function() {
                e.parentNode.removeChild(e), g.stub && (g = t.root)
            }).on("update", function() {
                var v = he(l.val, t),
                    S = document.createDocumentFragment();
                H(v) || (o = v || !1, v = o ? Object.keys(v).map(function(e) {
                    return i(l, e, v[e])
                }) : []);
                for (var U = 0, C = v.length; C > U; U++) {
                    var E = v[U],
                        N = n && ("undefined" == typeof E ? "undefined" : r(E)) == ie && !o,
                        z = b.indexOf(E),
                        L = ~z && N ? z : U,
                        O = w[L];
                    E = !o && l.key ? i(l, E, U) : E, !N && !O || N && !~z || !O ? (O = new c(d, {
                        parent: t,
                        isLoop: !0,
                        hasImpl: !!te[a],
                        root: u ? g : e.cloneNode(),
                        item: E
                    }, e.innerHTML), O.mount(), k && (O._root = O.root.firstChild), U != w.length && w[U] ? (k ? m(O, g, w[U]) : g.insertBefore(O.root, w[U].root), b.splice(U, 0, E)) : k ? m(O, S) : S.appendChild(O.root), w.splice(U, 0, O), L = U) : O.update(E, !0), L !== U && N && w[U] && (k ? x(O, g, w[U], e.childNodes.length) : g.insertBefore(O.root, w[U].root), l.pos && (O[l.pos] = U), w.splice(U, 0, w.splice(L, 1)[0]), b.splice(U, 0, b.splice(L, 1)[0]), !p && O.tags && s(O, U)), O._item = E, j(O, "_parent", t)
                }
                if (f(v, w), y) {
                    if (g.appendChild(S), ge && !g.multiple)
                        for (var M = 0; M < g.length; M++)
                            if (g[M].__riot1374) {
                                g.selectedIndex = M, delete g[M].__riot1374;
                                break
                            }
                } else g.insertBefore(S, h);
                p && (t.tags[a] = w), b = v.slice()
            })
        }

        function u(e, t, l, o) {
            I(e, function(e) {
                if (1 == e.nodeType) {
                    if (e.isLoop = e.isLoop || e.parentNode && e.parentNode.isLoop || N(e, "each") ? 1 : 0, l) {
                        var r = L(e);
                        r && !e.isLoop && l.push(_(r, {
                            root: e,
                            parent: t
                        }, e.innerHTML, t))
                    }
                    e.isLoop && !o || Z(e, t, [])
                }
            })
        }

        function g(e, t, l) {
            function o(e, t, o) {
                he.hasExpr(t) && l.push(P({
                    dom: e,
                    expr: t
                }, o))
            }
            I(e, function(e) {
                var l, r = e.nodeType;
                return 3 == r && "STYLE" != e.parentNode.tagName && o(e, e.nodeValue), 1 == r ? (l = N(e, "each")) ? (d(e, t, l), !1) : (w(e.attributes, function(t) {
                    var l = t.name,
                        r = l.split("__")[1];
                    return o(e, t.value, {
                        attr: r || l,
                        bool: r
                    }), r ? (C(e, l), !1) : void 0
                }), L(e) ? !1 : void 0) : void 0
            })
        }

        function c(e, t, l) {
            function o() {
                var e = p && h ? x : c || x;
                w(N.attributes, function(t) {
                    var l = t.value;
                    d[E(t.name)] = he.hasExpr(l) ? he(l, e) : l
                }), w(Object.keys(O), function(t) {
                    d[E(t)] = he(O[t], e)
                })
            }

            function n(e) {
                for (var t in v) r(x[t]) !== fe && V(x, t) && (x[t] = e[t])
            }

            function i() {
                x.parent && h && w(Object.keys(x.parent), function(e) {
                    var t = !xe.test(e) && R(M, e);
                    (r(x[e]) === fe || t) && (t || M.push(e), x[e] = x.parent[e])
                })
            }

            function f(e) {
                x.update(e, !0)
            }

            function s(e) {
                if (w(S, function(t) {
                        t[e ? "mount" : "unmount"]()
                    }), c) {
                    var t = e ? "on" : "off";
                    h ? c[t]("unmount", x.unmount) : c[t]("update", f)[t]("unmount", x.unmount)
                }
            }
            var m, x = J.observable(this),
                d = G(t.opts) || {},
                c = t.parent,
                h = t.isLoop,
                p = t.hasImpl,
                v = F(t.item),
                k = [],
                S = [],
                N = t.root,
                L = N.tagName.toLowerCase(),
                O = {},
                M = [];
            e.name && N._tag && N._tag.unmount(!0), this.isMounted = !1, N.isLoop = h, N._tag = this, j(this, "_riot_id", ++W), P(this, {
                parent: c,
                root: N,
                opts: d
            }, v), j(this, "tags", {}), w(N.attributes, function(e) {
                var t = e.value;
                he.hasExpr(t) && (O[e.name] = t)
            }), m = pe(e.tmpl, l), j(this, "update", function(e, t) {
                return e = F(e), i(), e && U(v) && (n(e), v = e), P(x, e), o(), x.trigger("update", e), y(k, x), t && x.parent ? x.parent.one("updated", function() {
                    x.trigger("updated")
                }) : we(function() {
                    x.trigger("updated")
                }), this
            }), j(this, "mixin", function() {
                return w(arguments, function(e) {
                    var t;
                    e = ("undefined" == typeof e ? "undefined" : r(e)) === ae ? J.mixin(e) : e, b(e) ? (t = new e, e = e.prototype) : t = e, w(Object.getOwnPropertyNames(e), function(e) {
                        "init" != e && (x[e] = b(t[e]) ? t[e].bind(x) : t[e])
                    }), t.init && t.init.bind(x)()
                }), this
            }), j(this, "mount", function() {
                o();
                var t = J.mixin(le);
                if (t)
                    for (var l in t) t.hasOwnProperty(l) && x.mixin(t[l]);
                if (e.fn && e.fn.call(x, d), g(m, x, k), s(!0), e.attrs && $(e.attrs, function(e, t) {
                        z(N, e, t)
                    }), (e.attrs || p) && g(x.root, x, k), x.parent && !h || x.update(v), x.trigger("before-mount"), h && !p) N = m.firstChild;
                else {
                    for (; m.firstChild;) N.appendChild(m.firstChild);
                    N.stub && (N = c.root)
                }
                j(x, "root", N), h && u(x.root, x.parent, null, !0), !x.parent || x.parent.isMounted ? (x.isMounted = !0, x.trigger("mount")) : x.parent.one("mount", function() {
                    D(x.root) || (x.parent.isMounted = x.isMounted = !0, x.trigger("mount"))
                })
            }), j(this, "unmount", function(e) {
                var t, l = N,
                    o = l.parentNode,
                    r = ee.indexOf(x);
                if (x.trigger("before-unmount"), ~r && ee.splice(r, 1), o) {
                    if (c) t = T(c), H(t.tags[L]) ? w(t.tags[L], function(e, l) {
                        e._riot_id == x._riot_id && t.tags[L].splice(l, 1)
                    }) : t.tags[L] = a;
                    else
                        for (; l.firstChild;) l.removeChild(l.firstChild);
                    e ? (C(o, ne), C(o, re)) : o.removeChild(l)
                }
                this._virts && w(this._virts, function(e) {
                    e.parentNode && e.parentNode.removeChild(e)
                }), x.trigger("unmount"), s(), x.off("*"), x.isMounted = !1, delete N._tag
            }), u(m, this, S)
        }

        function h(e, t, l, o) {
            l[e] = function(e) {
                var r, a = o._parent,
                    i = o._item;
                if (!i)
                    for (; a && !i;) i = a._item, a = a._parent;
                e = e || n.event, V(e, "currentTarget") && (e.currentTarget = l), V(e, "target") && (e.target = e.srcElement), V(e, "which") && (e.which = e.charCode || e.keyCode), e.item = i, t.call(o, e) === !0 || /radio|check/.test(l.type) || (e.preventDefault && e.preventDefault(), e.returnValue = !1), e.preventUpdate || (r = i ? T(a) : o, r.update())
            }
        }

        function p(e, t, l) {
            e && (e.insertBefore(l, t), e.removeChild(t))
        }

        function y(e, t) {
            w(e, function(e, l) {
                var o = e.dom,
                    n = e.attr,
                    a = he(e.expr, t),
                    i = e.dom.parentNode;
                if (e.bool ? a = !!a : null == a && (a = ""), e.value !== a) {
                    if (e.value = a, !n) return a += "", void(i && ("TEXTAREA" === i.tagName ? (i.value = a, ue || (o.nodeValue = a)) : o.nodeValue = a));
                    if ("value" === n) return void(o.value = a);
                    if (C(o, n), b(a)) h(n, a, o, t);
                    else if ("if" == n) {
                        var f = e.stub,
                            s = function() {
                                p(f.parentNode, f, o)
                            },
                            m = function() {
                                p(o.parentNode, o, f)
                            };
                        a ? f && (s(), o.inStub = !1, D(o) || I(o, function(e) {
                            e._tag && !e._tag.isMounted && (e._tag.isMounted = !!e._tag.trigger("mount"))
                        })) : (f = e.stub = f || document.createTextNode(""), o.parentNode ? m() : (t.parent || t).one("updated", m), o.inStub = !0)
                    } else "show" === n ? o.style.display = a ? "" : "none" : "hide" === n ? o.style.display = a ? "none" : "" : e.bool ? (o[n] = a, a && z(o, n, n), ge && "selected" === n && "OPTION" === o.tagName && (o.__riot1374 = a)) : (0 === a || a && ("undefined" == typeof a ? "undefined" : r(a)) !== ie) && (Y(n, oe) && n != re && (n = n.slice(oe.length)), z(o, n, a))
                }
            })
        }

        function w(e, t) {
            for (var l, o = e ? e.length : 0, r = 0; o > r; r++) l = e[r], null != l && t(l, r) === !1 && r--;
            return e
        }

        function b(e) {
            return ("undefined" == typeof e ? "undefined" : r(e)) === se || !1
        }

        function v(e) {
            if (e.outerHTML) return e.outerHTML;
            var t = B("div");
            return t.appendChild(e.cloneNode(!0)), t.innerHTML
        }

        function k(e, t) {
            if (r(e.innerHTML) != fe) e.innerHTML = t;
            else {
                var l = (new DOMParser).parseFromString(t, "application/xml");
                e.appendChild(e.ownerDocument.importNode(l.documentElement, !0))
            }
        }

        function S(e) {
            return ~de.indexOf(e)
        }

        function U(e) {
            return e && ("undefined" == typeof e ? "undefined" : r(e)) === ie
        }

        function C(e, t) {
            e.removeAttribute(t)
        }

        function E(e) {
            return e.replace(/-(\w)/g, function(e, t) {
                return t.toUpperCase()
            })
        }

        function N(e, t) {
            return e.getAttribute(t)
        }

        function z(e, t, l) {
            e.setAttribute(t, l)
        }

        function L(e) {
            return e.tagName && te[N(e, ne) || N(e, re) || e.tagName.toLowerCase()]
        }

        function O(e, t, l) {
            var o = l.tags[t];
            o ? (H(o) || o !== e && (l.tags[t] = [o]), R(l.tags[t], e) || l.tags[t].push(e)) : l.tags[t] = e
        }

        function M(e, t, l) {
            var o, r = e.parent;
            r && (o = r.tags[t], H(o) ? o.splice(l, 0, o.splice(o.indexOf(e), 1)[0]) : O(e, t, r))
        }

        function _(e, t, l, o) {
            var r = new c(e, t, l),
                n = A(t.root),
                a = T(o);
            return r.parent = a, r._parent = o, O(r, n, a), a !== o && O(r, n, o), t.root.innerHTML = "", r
        }

        function T(e) {
            for (var t = e; !L(t.root) && t.parent;) t = t.parent;
            return t
        }

        function j(e, t, l, o) {
            return Object.defineProperty(e, t, P({
                value: l,
                enumerable: !1,
                writable: !1,
                configurable: !0
            }, o)), e
        }

        function A(e) {
            var t = L(e),
                l = N(e, "name"),
                o = l && !he.hasExpr(l) ? l : t ? t.name : e.tagName.toLowerCase();
            return o
        }

        function P(e) {
            for (var t, l = arguments, o = 1; o < l.length; ++o)
                if (t = l[o])
                    for (var r in t) V(e, r) && (e[r] = t[r]);
            return e
        }

        function R(e, t) {
            return ~e.indexOf(t)
        }

        function H(e) {
            return Array.isArray(e) || e instanceof Array
        }

        function V(e, t) {
            var l = Object.getOwnPropertyDescriptor(e, t);
            return r(e[t]) === fe || l && l.writable
        }

        function F(e) {
            if (!(e instanceof c || e && r(e.trigger) == se)) return e;
            var t = {};
            for (var l in e) xe.test(l) || (t[l] = e[l]);
            return t
        }

        function I(e, t) {
            if (e) {
                if (t(e) === !1) return;
                for (e = e.firstChild; e;) I(e, t), e = e.nextSibling
            }
        }

        function $(e, t) {
            for (var l, o = /([-\w]+) ?= ?(?:"([^"]*)|'([^']*)|({[^}]*}))/g; l = o.exec(e);) t(l[1].toLowerCase(), l[2] || l[3] || l[4])
        }

        function D(e) {
            for (; e;) {
                if (e.inStub) return !0;
                e = e.parentNode
            }
            return !1
        }

        function B(e, t) {
            return t ? document.createElementNS("http://www.w3.org/2000/svg", "svg") : document.createElement(e)
        }

        function q(e, t) {
            return (t || document).querySelectorAll(e)
        }

        function K(e, t) {
            return (t || document).querySelector(e)
        }

        function G(e) {
            function t() {}
            return t.prototype = e, new t
        }

        function X(e) {
            return N(e, "id") || N(e, "name")
        }

        function Z(e, t, l) {
            var o, r = X(e),
                n = function(n) {
                    R(l, r) || (o = H(n), n ? (!o || o && !R(n, e)) && (o ? n.push(e) : t[r] = [n, e]) : t[r] = e)
                };
            r && (he.hasExpr(r) ? t.one("mount", function() {
                r = X(e), n(t[r])
            }) : n(t[r]))
        }

        function Y(e, t) {
            return e.slice(0, t.length) === t
        }

        function Q(e, t, l) {
            var o = te[t],
                r = e._innerHTML = e._innerHTML || e.innerHTML;
            return e.innerHTML = "", o && e && (o = new c(o, {
                root: e,
                opts: l
            }, r)), o && o.mount && (o.mount(), R(ee, o) || ee.push(o)), o
        }
        var J = {
                version: "v2.4.1",
                settings: {}
            },
            W = 0,
            ee = [],
            te = {},
            le = "__global_mixin",
            oe = "riot-",
            re = oe + "tag",
            ne = "data-is",
            ae = "string",
            ie = "object",
            fe = "undefined",
            se = "function",
            me = /^(?:t(?:body|head|foot|[rhd])|caption|col(?:group)?|opt(?:ion|group))$/,
            xe = /^(?:_(?:item|id|parent)|update|root|(?:un)?mount|mixin|is(?:Mounted|Loop)|tags|parent|opts|trigger|o(?:n|ff|ne))$/,
            de = ["altGlyph", "animate", "animateColor", "circle", "clipPath", "defs", "ellipse", "feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feFlood", "feGaussianBlur", "feImage", "feMerge", "feMorphology", "feOffset", "feSpecularLighting", "feTile", "feTurbulence", "filter", "font", "foreignObject", "g", "glyph", "glyphRef", "image", "line", "linearGradient", "marker", "mask", "missing-glyph", "path", "pattern", "polygon", "polyline", "radialGradient", "rect", "stop", "svg", "switch", "symbol", "text", "textPath", "tref", "tspan", "use"],
            ue = 0 | (n && n.document || {}).documentMode,
            ge = n && !!n.InstallTrigger;
        J.observable = function(e) {
                function t(e, t) {
                    for (var l, o, r = e.split(" "), n = r.length, a = 0; n > a; a++) l = r[a], o = l.indexOf("."), l && t(~o ? l.substring(0, o) : l, a, ~o ? l.slice(o + 1) : null)
                }
                e = e || {};
                var l = {},
                    o = Array.prototype.slice;
                return Object.defineProperties(e, {
                    on: {
                        value: function(o, r) {
                            return "function" != typeof r ? e : (t(o, function(e, t, o) {
                                (l[e] = l[e] || []).push(r), r.typed = t > 0, r.ns = o
                            }), e)
                        },
                        enumerable: !1,
                        writable: !1,
                        configurable: !1
                    },
                    off: {
                        value: function(o, r) {
                            return "*" != o || r ? t(o, function(e, t, o) {
                                if (r || o)
                                    for (var n, a = l[e], i = 0; n = a && a[i]; ++i)(n == r || o && n.ns == o) && a.splice(i--, 1);
                                else delete l[e]
                            }) : l = {}, e
                        },
                        enumerable: !1,
                        writable: !1,
                        configurable: !1
                    },
                    one: {
                        value: function(t, l) {
                            function o() {
                                e.off(t, o), l.apply(e, arguments)
                            }
                            return e.on(t, o)
                        },
                        enumerable: !1,
                        writable: !1,
                        configurable: !1
                    },
                    trigger: {
                        value: function(r) {
                            for (var n, a = arguments.length - 1, i = new Array(a), f = 0; a > f; f++) i[f] = arguments[f + 1];
                            return t(r, function(t, r, a) {
                                n = o.call(l[t] || [], 0);
                                for (var f, s = 0; f = n[s]; ++s) f.busy || (f.busy = 1, a && f.ns != a || f.apply(e, f.typed ? [t].concat(i) : i), n[s] !== f && s--, f.busy = 0);
                                l["*"] && "*" != t && e.trigger.apply(e, ["*", t].concat(i))
                            }), e
                        },
                        enumerable: !1,
                        writable: !1,
                        configurable: !1
                    }
                }), e
            },
            function(e) {
                function t(e) {
                    return e.split(/[\/?#]/)
                }

                function l(e, t) {
                    var l = new RegExp("^" + t[U](/\*/g, "([^/?#]+?)")[U](/\.\./, ".*") + "$"),
                        o = e.match(l);
                    return o ? o.slice(1) : void 0
                }

                function o(e, t) {
                    var l;
                    return function() {
                        clearTimeout(l), l = setTimeout(e, t)
                    }
                }

                function r(e) {
                    g = o(x, 1), L[k](C, g), L[k](E, g), O[k](j, d), e && x(!0)
                }

                function a() {
                    this.$ = [], e.observable(this), P.on("stop", this.s.bind(this)), P.on("emit", this.e.bind(this))
                }

                function i(e) {
                    return e[U](/^\/|\/$/, "")
                }

                function f(e) {
                    return "string" == typeof e
                }

                function s(e) {
                    return (e || _.href)[U](w, "")
                }

                function m(e) {
                    return "#" == c[0] ? (e || _.href || "").split(c)[1] || "" : (_ ? s(e) : e || "")[U](c, "")
                }

                function x(e) {
                    var t = 0 == V;
                    if (!(V >= z) && (V++, H.push(function() {
                            var t = m();
                            (e || t != h) && (P[N]("emit", t), h = t)
                        }), t)) {
                        for (; H.length;) H[0](), H.shift();
                        V = 0
                    }
                }

                function d(e) {
                    if (!(1 != e.which || e.metaKey || e.ctrlKey || e.shiftKey || e.defaultPrevented)) {
                        for (var t = e.target; t && "A" != t.nodeName;) t = t.parentNode;
                        !t || "A" != t.nodeName || t[S]("download") || !t[S]("href") || t.target && "_self" != t.target || -1 == t.href.indexOf(_.href.match(w)[0]) || (t.href == _.href || t.href.split("#")[0] != _.href.split("#")[0] && ("#" == c || 0 === s(t.href).indexOf(c)) && u(m(t.href), t.title || O.title)) && e.preventDefault()
                    }
                }

                function u(e, t, l) {
                    return M ? (e = c + i(e), t = t || O.title, l ? M.replaceState(null, t, e) : M.pushState(null, t, e), O.title = t, R = !1, x(), R) : P[N]("emit", m(e))
                }
                var g, c, h, p, y, w = /^.+?\/\/+[^\/]+/,
                    b = "EventListener",
                    v = "remove" + b,
                    k = "add" + b,
                    S = "hasAttribute",
                    U = "replace",
                    C = "popstate",
                    E = "hashchange",
                    N = "trigger",
                    z = 3,
                    L = "undefined" != typeof n && n,
                    O = "undefined" != typeof document && document,
                    M = L && history,
                    _ = L && (M.location || L.location),
                    T = a.prototype,
                    j = O && O.ontouchstart ? "touchstart" : "click",
                    A = !1,
                    P = e.observable(),
                    R = !1,
                    H = [],
                    V = 0;
                T.m = function(e, t, l) {
                    !f(e) || t && !f(t) ? t ? this.r(e, t) : this.r("@", e) : u(e, t, l || !1)
                }, T.s = function() {
                    this.off("*"), this.$ = []
                }, T.e = function(e) {
                    this.$.concat("@").some(function(t) {
                        var l = ("@" == t ? p : y)(i(e), i(t));
                        return "undefined" != typeof l ? (this[N].apply(null, [t].concat(l)), R = !0) : void 0
                    }, this)
                }, T.r = function(e, t) {
                    "@" != e && (e = "/" + i(e), this.$.push(e)), this.on(e, t)
                };
                var F = new a,
                    I = F.m.bind(F);
                I.create = function() {
                    var e = new a,
                        t = e.m.bind(e);
                    return t.stop = e.s.bind(e), t
                }, I.base = function(e) {
                    c = e || "#", h = m()
                }, I.exec = function() {
                    x(!0)
                }, I.parser = function(e, o) {
                    e || o || (p = t, y = l), e && (p = e), o && (y = o)
                }, I.query = function() {
                    var e = {},
                        t = _.href || h;
                    return t[U](/[?&](.+?)=([^&]*)/g, function(t, l, o) {
                        e[l] = o
                    }), e
                }, I.stop = function() {
                    A && (L && (L[v](C, g), L[v](E, g), O[v](j, d)), P[N]("stop"), A = !1)
                }, I.start = function(e) {
                    A || (L && ("complete" == document.readyState ? r(e) : L[k]("load", function() {
                        setTimeout(function() {
                            r(e)
                        }, 1)
                    })), A = !0)
                }, I.base(), I.parser(), e.route = I
            }(J);
        var ce = function(e) {
                function t(e) {
                    return e
                }

                function l(e, t) {
                    return t || (t = p), new RegExp(e.source.replace(/{/g, t[2]).replace(/}/g, t[3]), e.global ? s : "")
                }

                function o(e) {
                    if (e === g) return c;
                    var t = e.split(" ");
                    if (2 !== t.length || /[\x00-\x1F<>a-zA-Z0-9'",;\\]/.test(e)) throw new Error('Unsupported brackets "' + e + '"');
                    return t = t.concat(e.replace(/(?=[[\]()*+?.^$|])/g, "\\").split(" ")), t[4] = l(t[1].length > 1 ? /{[\S\s]*?}/ : c[4], t), t[5] = l(e.length > 3 ? /\\({|})/g : c[5], t), t[6] = l(c[6], t), t[7] = RegExp("\\\\(" + t[3] + ")|([[({])|(" + t[3] + ")|" + d, s), t[8] = e, t
                }

                function r(e) {
                    return e instanceof RegExp ? i(e) : p[e]
                }

                function n(e) {
                    (e || (e = g)) !== p[8] && (p = o(e), i = e === g ? t : l, p[9] = i(c[9])), h = e
                }

                function a(e) {
                    var t;
                    e = e || {}, t = e.brackets, Object.defineProperty(e, "brackets", {
                        set: n,
                        get: function() {
                            return h
                        },
                        enumerable: !0
                    }), f = e, n(t)
                }
                var i, f, s = "g",
                    m = /\/\*[^*]*\*+(?:[^*\/][^*]*\*+)*\//g,
                    x = /"[^"\\]*(?:\\[\S\s][^"\\]*)*"|'[^'\\]*(?:\\[\S\s][^'\\]*)*'/g,
                    d = x.source + "|" + /(?:\breturn\s+|(?:[$\w\)\]]|\+\+|--)\s*(\/)(?![*\/]))/.source + "|" + /\/(?=[^*\/])[^[\/\\]*(?:(?:\[(?:\\.|[^\]\\]*)*\]|\\.)[^[\/\\]*)*?(\/)[gim]*/.source,
                    u = {
                        "(": RegExp("([()])|" + d, s),
                        "[": RegExp("([[\\]])|" + d, s),
                        "{": RegExp("([{}])|" + d, s)
                    },
                    g = "{ }",
                    c = ["{", "}", "{", "}", /{[^}]*}/, /\\([{}])/g, /\\({)|{/g, RegExp("\\\\(})|([[({])|(})|" + d, s), g, /^\s*{\^?\s*([$\w]+)(?:\s*,\s*(\S+))?\s+in\s+(\S.*)\s*}/, /(^|[^\\]){=[\S\s]*?}/],
                    h = e,
                    p = [];
                return r.split = function(e, t, l) {
                    function o(e) {
                        t || a ? s.push(e && e.replace(l[5], "$1")) : s.push(e)
                    }

                    function r(e, t, l) {
                        var o, r = u[t];
                        for (r.lastIndex = l, l = 1;
                            (o = r.exec(e)) && (!o[1] || (o[1] === t ? ++l : --l)););
                        return l ? e.length : r.lastIndex
                    }
                    l || (l = p);
                    var n, a, i, f, s = [],
                        m = l[6];
                    for (a = i = m.lastIndex = 0; n = m.exec(e);) {
                        if (f = n.index, a) {
                            if (n[2]) {
                                m.lastIndex = r(e, n[2], m.lastIndex);
                                continue
                            }
                            if (!n[3]) continue
                        }
                        n[1] || (o(e.slice(i, f)), i = m.lastIndex, m = l[6 + (a ^= 1)], m.lastIndex = i)
                    }
                    return e && i < e.length && o(e.slice(i)), s
                }, r.hasExpr = function(e) {
                    return p[4].test(e)
                }, r.loopKeys = function(e) {
                    var t = e.match(p[9]);
                    return t ? {
                        key: t[1],
                        pos: t[2],
                        val: p[0] + t[3].trim() + p[1]
                    } : {
                        val: e.trim()
                    }
                }, r.array = function(e) {
                    return e ? o(e) : p
                }, Object.defineProperty(r, "settings", {
                    set: a,
                    get: function() {
                        return f
                    }
                }), r.settings = "undefined" != typeof J && J.settings || {}, r.set = n, r.R_STRINGS = x, r.R_MLCOMMS = m, r.S_QBLOCKS = d, r
            }(),
            he = function() {
                function e(e, o) {
                    return e ? (f[e] || (f[e] = l(e))).call(o, t) : e
                }

                function t(t, l) {
                    e.errorHandler && (t.riotData = {
                        tagName: l && l.root && l.root.tagName,
                        _riot_id: l && l._riot_id
                    }, e.errorHandler(t))
                }

                function l(e) {
                    var t = o(e);
                    return "try{return " !== t.slice(0, 11) && (t = "return " + t), new Function("E", t + ";")
                }

                function o(e) {
                    var t, l = [],
                        o = ce.split(e.replace(d, '"'), 1);
                    if (o.length > 2 || o[0]) {
                        var r, n, i = [];
                        for (r = n = 0; r < o.length; ++r) t = o[r], t && (t = 1 & r ? a(t, 1, l) : '"' + t.replace(/\\/g, "\\\\").replace(/\r\n?|\n/g, "\\n").replace(/"/g, '\\"') + '"') && (i[n++] = t);
                        t = 2 > n ? i[0] : "[" + i.join(",") + '].join("")'
                    } else t = a(o[1], 0, l);
                    return l[0] && (t = t.replace(u, function(e, t) {
                        return l[t].replace(/\r/g, "\\r").replace(/\n/g, "\\n")
                    })), t
                }

                function a(e, t, l) {
                    function o(t, l) {
                        var o, r = 1,
                            n = g[t];
                        for (n.lastIndex = l.lastIndex; o = n.exec(e);)
                            if (o[0] === t) ++r;
                            else if (!--r) break;
                        l.lastIndex = r ? e.length : n.lastIndex
                    }
                    if (e = e.replace(x, function(e, t) {
                            return e.length > 2 && !t ? s + (l.push(e) - 1) + "~" : e
                        }).replace(/\s+/g, " ").trim().replace(/\ ?([[\({},?\.:])\ ?/g, "$1")) {
                        for (var r, n = [], a = 0; e && (r = e.match(m)) && !r.index;) {
                            var f, d, u = /,|([[{(])|$/g;
                            for (e = RegExp.rightContext, f = r[2] ? l[r[2]].slice(1, -1).trim().replace(/\s+/g, " ") : r[1]; d = (r = u.exec(e))[1];) o(d, u);
                            d = e.slice(0, r.index), e = RegExp.rightContext, n[a++] = i(d, 1, f)
                        }
                        e = a ? a > 1 ? "[" + n.join(",") + '].join(" ").trim()' : n[0] : i(e, t)
                    }
                    return e
                }

                function i(e, t, l) {
                    var o;
                    return e = e.replace(h, function(e, t, l, r, n) {
                        return l && (r = o ? 0 : r + e.length, "this" !== l && "global" !== l && "window" !== l ? (e = t + '("' + l + c + l, r && (o = "." === (n = n[r]) || "(" === n || "[" === n)) : r && (o = !p.test(n.slice(r)))), e
                    }), o && (e = "try{return " + e + "}catch(e){E(e,this)}"), l ? e = (o ? "function(){" + e + "}.call(this)" : "(" + e + ")") + '?"' + l + '":""' : t && (e = "function(v){" + (o ? e.replace("return ", "v=") : "v=(" + e + ")") + ';return v||v===0?v:""}.call(this)'), e
                }
                var f = {};
                e.haveRaw = ce.hasRaw, e.hasExpr = ce.hasExpr, e.loopKeys = ce.loopKeys, e.errorHandler = null;
                var s = "⁗",
                    m = /^(?:(-?[_A-Za-z\xA0-\xFF][-\w\xA0-\xFF]*)|\u2057(\d+)~):/,
                    x = RegExp(ce.S_QBLOCKS, "g"),
                    d = /\u2057/g,
                    u = /\u2057(\d+)~/g,
                    g = {
                        "(": /[()]/g,
                        "[": /[[\]]/g,
                        "{": /[{}]/g
                    },
                    c = '"in this?this:' + ("object" !== ("undefined" == typeof n ? "undefined" : r(n)) ? "global" : "window") + ").",
                    h = /[,{][$\w]+:|(^ *|[^$\w\.])(?!(?:typeof|true|false|null|undefined|in|instanceof|is(?:Finite|NaN)|void|NaN|new|Date|RegExp|Math)(?![$\w]))([$_A-Za-z][$\w]*)/g,
                    p = /^(?=(\.[$\w]+))\1(?:[^.[(]|$)/;
                return e.parse = function(e) {
                    return e
                }, e.version = ce.version = "v2.4.0", e
            }(),
            pe = function be() {
                function be(l, o) {
                    var r = l && l.match(/^\s*<([-\w]+)/),
                        n = r && r[1].toLowerCase(),
                        a = B("div", S(n));
                    return l = t(l, o), i.test(n) ? a = e(a, l, n) : k(a, l), a.stub = !0, a
                }

                function e(e, t, l) {
                    var o = "o" === l[0],
                        r = o ? "select>" : "table>";
                    if (e.innerHTML = "<" + r + t.trim() + "</" + r, r = e.firstChild, o) r.selectedIndex = -1;
                    else {
                        var n = a[l];
                        n && 1 === r.childElementCount && (r = K(n, r))
                    }
                    return r
                }

                function t(e, t) {
                    if (!l.test(e)) return e;
                    var a = {};
                    return t = t && t.replace(r, function(e, t, l) {
                        return a[t] = a[t] || l, ""
                    }).trim(), e.replace(n, function(e, t, l) {
                        return a[t] || l || ""
                    }).replace(o, function(e, l) {
                        return t || l || ""
                    })
                }
                var l = /<yield\b/i,
                    o = /<yield\s*(?:\/>|>([\S\s]*?)<\/yield\s*>|>)/gi,
                    r = /<yield\s+to=['"]([^'">]*)['"]\s*>([\S\s]*?)<\/yield\s*>/gi,
                    n = /<yield\s+from=['"]?([-\w]+)['"]?\s*(?:\/>|>([\S\s]*?)<\/yield\s*>)/gi,
                    a = {
                        tr: "tbody",
                        th: "tr",
                        td: "tr",
                        col: "colgroup"
                    },
                    i = ue && 10 > ue ? me : /^(?:t(?:body|head|foot|[rhd])|caption|col(?:group)?)$/;
                return be
            }(),
            ye = function(e) {
                if (!n) return {
                    add: function() {},
                    inject: function() {}
                };
                var t = function() {
                        var e = B("style");
                        z(e, "type", "text/css");
                        var t = K("style[type=riot]");
                        return t ? (t.id && (e.id = t.id), t.parentNode.replaceChild(e, t)) : document.getElementsByTagName("head")[0].appendChild(e), e
                    }(),
                    l = t.styleSheet,
                    o = "";
                return Object.defineProperty(e, "styleNode", {
                    value: t,
                    writable: !0
                }), {
                    add: function(e) {
                        o += e
                    },
                    inject: function() {
                        o && (l ? l.cssText += o : t.innerHTML += o, o = "")
                    }
                }
            }(J),
            we = function(e) {
                var t = e.requestAnimationFrame || e.mozRequestAnimationFrame || e.webkitRequestAnimationFrame;
                if (!t || /iP(ad|hone|od).*OS 6/.test(e.navigator.userAgent)) {
                    var l = 0;
                    t = function(e) {
                        var t = Date.now(),
                            o = Math.max(16 - (t - l), 0);
                        setTimeout(function() {
                            e(l = t + o)
                        }, o)
                    }
                }
                return t
            }(n || {});
        J.util = {
            brackets: ce,
            tmpl: he
        }, J.mixin = function() {
            var e = {},
                t = e[le] = {},
                l = 0;
            return function(o, n, a) {
                if (U(o)) return void J.mixin("__unnamed_" + l++, o, !0);
                var i = a ? t : e;
                if (!n) {
                    if (r(i[o]) === fe) throw new Error("Unregistered mixin: " + o);
                    return i[o]
                }
                b(n) ? (P(n.prototype, i[o] || {}), i[o] = n) : i[o] = P(i[o] || {}, n)
            }
        }(), J.tag = function(e, t, l, o, r) {
            return b(o) && (r = o, /^[\w\-]+\s?=/.test(l) ? (o = l, l = "") : o = ""), l && (b(l) ? r = l : ye.add(l)), e = e.toLowerCase(), te[e] = {
                name: e,
                tmpl: t,
                attrs: o,
                fn: r
            }, e
        }, J.tag2 = function(e, t, l, o, r) {
            return l && ye.add(l), te[e] = {
                name: e,
                tmpl: t,
                attrs: o,
                fn: r
            }, e
        }, J.mount = function(e, t, l) {
            function o(e) {
                var t = "";
                return w(e, function(e) {
                    /[^-\w]/.test(e) || (e = e.trim().toLowerCase(), t += ",[" + ne + '="' + e + '"],[' + re + '="' + e + '"]')
                }), t
            }

            function n() {
                var e = Object.keys(te);
                return e + o(e)
            }

            function a(e) {
                if (e.tagName) {
                    var o = N(e, ne) || N(e, re);
                    t && o !== t && (o = t, z(e, ne, t), z(e, re, t));
                    var r = Q(e, o || e.tagName.toLowerCase(), l);
                    r && s.push(r)
                } else e.length && w(e, a)
            }
            var i, f, s = [];
            if (ye.inject(), U(t) && (l = t, t = 0), ("undefined" == typeof e ? "undefined" : r(e)) === ae ? ("*" === e ? e = f = n() : e += o(e.split(/, */)), i = e ? q(e) : []) : i = e, "*" === t) {
                if (t = f || n(), i.tagName) i = q(t, i);
                else {
                    var m = [];
                    w(i, function(e) {
                        m.push(q(t, e))
                    }), i = m
                }
                t = 0
            }
            return a(i), s
        }, J.update = function() {
            return w(ee, function(e) {
                e.update()
            })
        }, J.vdom = ee, J.Tag = c, r(t) === ie ? e.exports = J : r(l(13)) === se && r(l(14)) !== fe ? (o = function() {
            return J
        }.call(t, l, t, e), !(o !== a && (e.exports = o))) : n.riot = J
    }("undefined" != typeof window ? window : void 0)
}, function(e, t) {
    e.exports = function() {
        throw new Error("define cannot be used indirect")
    }
}, function(e, t) {
    (function(t) {
        e.exports = t
    }).call(t, {})
}, function(e, t, l) {
    (function(e) {
        "use strict";
        e.tag2("app", '<header> <div layout layout-align="start start"> <img width="175" src="img/flexmaid.png" alt=""> <div> <h1>Flex Maid</h1> <span> At your service </span> </div> </div> </header> <section> <div layout="column" layout-align="center"> <form layout layout-align="space-around start"> <input type="text" onkeyup="{changeName}" name="label" value="{breakpoint.label}"> {breakpoint.pixel}px <input type="submit" onclick="{add}" value="add"> </form> <div class="slider" name="pixelSlider"></div> </div> </section> <section class="breakpoints"> <breakpoint each="{breakpoint, index in breakpoints}" if="{breakpoint.active}" layout="row" layout-align="space-between" onclick="{select}" riot-style="background-color: hsl(330, 50%, {50+(40/breakpoints.length)*index}%)" label="{breakpoint.label}" pixel="{breakpoint.pixel}"> </breakpoint> </section>', "", "", function(e) {
            var t = this;
            this.breakpoints = [{
                label: "sm",
                pixel: 640,
                active: !0
            }, {
                label: "md",
                pixel: 960,
                active: !0
            }, {
                label: "lg",
                pixel: 1280,
                active: !0
            }, {
                label: "xl",
                pixel: 1920,
                active: !1
            }], this.breakpoint = this.breakpoints[3], this.changeName = function(e) {
                this.breakpoint.label = e.target.value
            }.bind(this), this.select = function(e) {
                this.breakpoint = e.item.breakpoint
            }.bind(this), this.add = function(e) {
                var t = this,
                    l = this.breakpoints.filter(function(e) {
                        return e.label === t.breakpoint.value
                    }),
                    o = this.breakpoint.pixel;
                if (!l.length && this.label.value.length) {
                    var r = 0;
                    this.breakpoints.filter(function(e, t) {
                        o >= e.pixel && (r = t + 1)
                    }), console.log(r + " - " + o), this.breakpoint.active = !0, this.breakpoint = {
                        label: this.label.value,
                        pixel: o,
                        active: !0
                    }, this.breakpoints.splice(r, 0, this.breakpoint)
                }
            }.bind(this), this.on("mount", function() {
                t.noUiSlider.create(t.pixelSlider, {
                    start: [t.pixel],
                    range: {
                        min: 320,
                        max: 1920
                    },
                    step: 32,
                    pips: {
                        mode: "count",
                        values: 6,
                        density: 2
                    }
                }), t.pixelSlider.noUiSlider.on("update", function() {
                    t.breakpoint.pixel = 0 | t.pixelSlider.noUiSlider.get(), t.update()
                })
            }), this.on("remove", function(e) {
                t.breakpoints = t.breakpoints.filter(function(t) {
                    return e.opts.label != t.label
                })
            })
        })
    }).call(t, l(12))
}, function(e, t, l) {
    (function(e) {
        "use strict";
        e.tag2("breakpoint", '<div layout layout-align="space-between"> <div> <span onclick="{remove}">&times;</span> </div> <div> <span>{opts.label} - {opts.pixel}</span> </div> </div>', "", "", function(e) {
            this.remove = function() {
                this.parent.trigger("remove", this)
            }.bind(this)
        })
    }).call(t, l(12))
}, function(e, t, l) {
    var o = l(18);
    "string" == typeof o && (o = [
        [e.id, o, ""]
    ]);
    l(21)(o, {});
    o.locals && (e.exports = o.locals)
}, function(e, t, l) {
    t = e.exports = l(19)(), t.i(l(20), ""), t.push([e.id, "@import url(https://fonts.googleapis.com/css?family=Aguafina+Script);", ""]), t.push([e.id, "@import url(https://fonts.googleapis.com/css?family=Oswald:400,300,700);", ""]), t.push([e.id, '[flex-end]{margin-top:auto}[flex-offset="0"]{margin-left:0}[flex-offset="5"]{margin-left:5%}[flex-offset="10"]{margin-left:10%}[flex-offset="15"]{margin-left:15%}[flex-offset="20"]{margin-left:20%}[flex-offset="25"]{margin-left:25%}[flex-offset="30"]{margin-left:30%}[flex-offset="35"]{margin-left:35%}[flex-offset="40"]{margin-left:40%}[flex-offset="45"]{margin-left:45%}[flex-offset="50"]{margin-left:50%}[flex-offset="55"]{margin-left:55%}[flex-offset="60"]{margin-left:60%}[flex-offset="65"]{margin-left:65%}[flex-offset="70"]{margin-left:70%}[flex-offset="75"]{margin-left:75%}[flex-offset="80"]{margin-left:80%}[flex-offset="85"]{margin-left:85%}[flex-offset="90"]{margin-left:90%}[flex-offset="95"]{margin-left:95%}[flex-offset="33"]{margin-left:33.33333%}[flex-offset="66"]{margin-left:66.66667%}[layout-align="start stretch"],[layout-align]{-ms-flex-pack:start;justify-content:flex-start;-ms-flex-line-pack:stretch;align-content:stretch;-ms-flex-align:stretch;-ms-grid-row-align:stretch;align-items:stretch}[layout-align="start center"],[layout-align="start end"],[layout-align="start start"],[layout-align="start stretch"],[layout-align=start]{-ms-flex-pack:start;justify-content:flex-start}[layout-align="center center"],[layout-align="center end"],[layout-align="center start"],[layout-align="center stretch"],[layout-align=center]{-ms-flex-pack:center;justify-content:center}[layout-align="end center"],[layout-align="end end"],[layout-align="end start"],[layout-align="end stretch"],[layout-align=end]{-ms-flex-pack:end;justify-content:flex-end}[layout-align="space-around center"],[layout-align="space-around end"],[layout-align="space-around start"],[layout-align="space-around stretch"],[layout-align=space-around]{-ms-flex-pack:distribute;justify-content:space-around}[layout-align="space-between center"],[layout-align="space-between end"],[layout-align="space-between start"],[layout-align="space-between stretch"],[layout-align=space-between]{-ms-flex-pack:justify;justify-content:space-between}[layout-align="center start"],[layout-align="end start"],[layout-align="space-around start"],[layout-align="space-between start"],[layout-align="start start"]{-ms-flex-align:start;-ms-grid-row-align:flex-start;align-items:flex-start;-ms-flex-line-pack:start;align-content:flex-start}[layout-align="center center"],[layout-align="end center"],[layout-align="space-around center"],[layout-align="space-between center"],[layout-align="start center"]{-ms-flex-align:center;-ms-grid-row-align:center;align-items:center;-ms-flex-line-pack:center;align-content:center;max-width:100%}[layout-align="center center"]>*,[layout-align="end center"]>*,[layout-align="space-around center"]>*,[layout-align="space-between center"]>*,[layout-align="start center"]>*{max-width:100%}[layout-align="center end"],[layout-align="end end"],[layout-align="space-around end"],[layout-align="space-between end"],[layout-align="start end"]{-ms-flex-align:end;-ms-grid-row-align:flex-end;align-items:flex-end;-ms-flex-line-pack:end;align-content:flex-end}[layout-align="center stretch"],[layout-align="end stretch"],[layout-align="space-around stretch"],[layout-align="space-between stretch"],[layout-align="start stretch"]{-ms-flex-align:stretch;-ms-grid-row-align:stretch;align-items:stretch;-ms-flex-line-pack:stretch;align-content:stretch}[layout-padding]>[flex-lt-md],[layout-padding]>[flex-sm]{padding:.5em}[layout-padding],[layout-padding]>[flex-gt-sm],[layout-padding]>[flex-lt-lg],[layout-padding]>[flex-md],[layout-padding]>[flex]{padding:1em}[layout-padding]>[flex-gt-md],[layout-padding]>[flex-lg]{padding:2em}[layout-margin]>[flex-lt-md],[layout-margin]>[flex-sm]{margin:.5em}[layout-margin],[layout-margin]>[flex-gt-sm],[layout-margin]>[flex-lt-lg],[layout-margin]>[flex-md],[layout-margin]>[flex]{margin:1em}[layout-margin]>[flex-gt-md],[layout-margin]>[flex-lg]{margin:2em}[layout-wrap]{-ms-flex-wrap:wrap;flex-wrap:wrap}[layout-nowrap]{-ms-flex-wrap:nowrap;flex-wrap:nowrap}[layout-fill]{margin:0;width:100%;min-height:100%;height:100%}[flex-order="0"]{-ms-flex-order:0;order:0}[flex-order="1"]{-ms-flex-order:1;order:1}[flex-order="2"]{-ms-flex-order:2;order:2}[flex-order="3"]{-ms-flex-order:3;order:3}[flex-order="4"]{-ms-flex-order:4;order:4}[flex-order="5"]{-ms-flex-order:5;order:5}[flex-order="6"]{-ms-flex-order:6;order:6}[flex-order="7"]{-ms-flex-order:7;order:7}[flex-order="8"]{-ms-flex-order:8;order:8}[flex-order="9"]{-ms-flex-order:9;order:9}[flex-order="10"]{-ms-flex-order:10;order:10}[flex-order="11"]{-ms-flex-order:11;order:11}[flex-order="12"]{-ms-flex-order:12;order:12}[flex-order="13"]{-ms-flex-order:13;order:13}[flex-order="14"]{-ms-flex-order:14;order:14}[flex-order="15"]{-ms-flex-order:15;order:15}[flex-order="16"]{-ms-flex-order:16;order:16}[flex-order="17"]{-ms-flex-order:17;order:17}[flex-order="18"]{-ms-flex-order:18;order:18}[flex-order="19"]{-ms-flex-order:19;order:19}[flex-order="20"]{-ms-flex-order:20;order:20}[flex]{-ms-flex:1;flex:1}[flex-grow]{-ms-flex:1 1 100%;flex:1 1 100%;box-sizing:border-box}[flex-initial]{-ms-flex:0 1 auto;flex:0 1 auto;box-sizing:border-box}[flex-auto]{-ms-flex:1 1 auto;flex:1 1 auto;box-sizing:border-box}[flex-none]{-ms-flex:0 0 auto;flex:0 0 auto;box-sizing:border-box}[flex],[layout=row]>[flex]{max-height:100%}[layout=column]>[flex]{max-width:100%}[flex="5"],[layout=row]>[flex="5"]{-ms-flex:1 1 5%;flex:1 1 5%;max-width:5%}[layout=column]>[flex="5"]{-ms-flex:1 1 5%;flex:1 1 5%;max-height:5%}[flex="10"],[layout=row]>[flex="10"]{-ms-flex:1 1 10%;flex:1 1 10%;max-width:10%}[layout=column]>[flex="10"]{-ms-flex:1 1 10%;flex:1 1 10%;max-height:10%}[flex="15"],[layout=row]>[flex="15"]{-ms-flex:1 1 15%;flex:1 1 15%;max-width:15%}[layout=column]>[flex="15"]{-ms-flex:1 1 15%;flex:1 1 15%;max-height:15%}[flex="20"],[layout=row]>[flex="20"]{-ms-flex:1 1 20%;flex:1 1 20%;max-width:20%}[layout=column]>[flex="20"]{-ms-flex:1 1 20%;flex:1 1 20%;max-height:20%}[flex="25"],[layout=row]>[flex="25"]{-ms-flex:1 1 25%;flex:1 1 25%;max-width:25%}[layout=column]>[flex="25"]{-ms-flex:1 1 25%;flex:1 1 25%;max-height:25%}[flex="30"],[layout=row]>[flex="30"]{-ms-flex:1 1 30%;flex:1 1 30%;max-width:30%}[layout=column]>[flex="30"]{-ms-flex:1 1 30%;flex:1 1 30%;max-height:30%}[flex="35"],[layout=row]>[flex="35"]{-ms-flex:1 1 35%;flex:1 1 35%;max-width:35%}[layout=column]>[flex="35"]{-ms-flex:1 1 35%;flex:1 1 35%;max-height:35%}[flex="40"],[layout=row]>[flex="40"]{-ms-flex:1 1 40%;flex:1 1 40%;max-width:40%}[layout=column]>[flex="40"]{-ms-flex:1 1 40%;flex:1 1 40%;max-height:40%}[flex="45"],[layout=row]>[flex="45"]{-ms-flex:1 1 45%;flex:1 1 45%;max-width:45%}[layout=column]>[flex="45"]{-ms-flex:1 1 45%;flex:1 1 45%;max-height:45%}[flex="50"],[layout=row]>[flex="50"]{-ms-flex:1 1 50%;flex:1 1 50%;max-width:50%}[layout=column]>[flex="50"]{-ms-flex:1 1 50%;flex:1 1 50%;max-height:50%}[flex="55"],[layout=row]>[flex="55"]{-ms-flex:1 1 55%;flex:1 1 55%;max-width:55%}[layout=column]>[flex="55"]{-ms-flex:1 1 55%;flex:1 1 55%;max-height:55%}[flex="60"],[layout=row]>[flex="60"]{-ms-flex:1 1 60%;flex:1 1 60%;max-width:60%}[layout=column]>[flex="60"]{-ms-flex:1 1 60%;flex:1 1 60%;max-height:60%}[flex="65"],[layout=row]>[flex="65"]{-ms-flex:1 1 65%;flex:1 1 65%;max-width:65%}[layout=column]>[flex="65"]{-ms-flex:1 1 65%;flex:1 1 65%;max-height:65%}[flex="70"],[layout=row]>[flex="70"]{-ms-flex:1 1 70%;flex:1 1 70%;max-width:70%}[layout=column]>[flex="70"]{-ms-flex:1 1 70%;flex:1 1 70%;max-height:70%}[flex="75"],[layout=row]>[flex="75"]{-ms-flex:1 1 75%;flex:1 1 75%;max-width:75%}[layout=column]>[flex="75"]{-ms-flex:1 1 75%;flex:1 1 75%;max-height:75%}[flex="80"],[layout=row]>[flex="80"]{-ms-flex:1 1 80%;flex:1 1 80%;max-width:80%}[layout=column]>[flex="80"]{-ms-flex:1 1 80%;flex:1 1 80%;max-height:80%}[flex="85"],[layout=row]>[flex="85"]{-ms-flex:1 1 85%;flex:1 1 85%;max-width:85%}[layout=column]>[flex="85"]{-ms-flex:1 1 85%;flex:1 1 85%;max-height:85%}[flex="90"],[layout=row]>[flex="90"]{-ms-flex:1 1 90%;flex:1 1 90%;max-width:90%}[layout=column]>[flex="90"]{-ms-flex:1 1 90%;flex:1 1 90%;max-height:90%}[flex="95"],[layout=row]>[flex="95"]{-ms-flex:1 1 95%;flex:1 1 95%;max-width:95%}[layout=column]>[flex="95"]{-ms-flex:1 1 95%;flex:1 1 95%;max-height:95%}[flex="100"],[layout=row]>[flex="100"]{-ms-flex:1 1 100%;flex:1 1 100%;max-width:100%}[layout=column]>[flex="100"]{-ms-flex:1 1 100%;flex:1 1 100%;max-height:100%}[layout=row]>[flex="33"]{-ms-flex:1 1 33.33%;flex:1 1 33.33%;max-width:33.33%}[layout=row]>[flex="66"]{-ms-flex:1 1 66.66%;flex:1 1 66.66%;max-width:66.66%}[layout=column]>[flex="33"]{-ms-flex:1 1 33.33%;flex:1 1 33.33%;max-height:33.33%}[layout=column]>[flex="66"]{-ms-flex:1 1 66.66%;flex:1 1 66.66%;max-height:66.66%}[layout]{display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap}[layout=column]{-ms-flex-direction:column;flex-direction:column}[layout=row]{-ms-flex-direction:row;flex-direction:row}@media (max-width:599px){[hide-gt-xs]:not([show-gt-xs]):not([show-sm]):not([show]),[hide-sm]:not([show-gt-xs]):not([show-sm]):not([show]),[hide]:not([show-gt-xs]):not([show-sm]):not([show]){display:none}[flex-order-sm="0"]{-ms-flex-order:0;order:0}[flex-order-sm="1"]{-ms-flex-order:1;order:1}[flex-order-sm="2"]{-ms-flex-order:2;order:2}[flex-order-sm="3"]{-ms-flex-order:3;order:3}[flex-order-sm="4"]{-ms-flex-order:4;order:4}[flex-order-sm="5"]{-ms-flex-order:5;order:5}[flex-order-sm="6"]{-ms-flex-order:6;order:6}[flex-order-sm="7"]{-ms-flex-order:7;order:7}[flex-order-sm="8"]{-ms-flex-order:8;order:8}[flex-order-sm="9"]{-ms-flex-order:9;order:9}[flex-order-sm="10"]{-ms-flex-order:10;order:10}[flex-order-sm="11"]{-ms-flex-order:11;order:11}[flex-order-sm="12"]{-ms-flex-order:12;order:12}[flex-order-sm="13"]{-ms-flex-order:13;order:13}[flex-order-sm="14"]{-ms-flex-order:14;order:14}[flex-order-sm="15"]{-ms-flex-order:15;order:15}[flex-order-sm="16"]{-ms-flex-order:16;order:16}[flex-order-sm="17"]{-ms-flex-order:17;order:17}[flex-order-sm="18"]{-ms-flex-order:18;order:18}[flex-order-sm="19"]{-ms-flex-order:19;order:19}[flex-order-sm="20"]{-ms-flex-order:20;order:20}[flex-sm]{-ms-flex:1;flex:1}[flex-sm-grow]{-ms-flex:1 1 100%;flex:1 1 100%;box-sizing:border-box}[flex-sm-initial]{-ms-flex:0 1 auto;flex:0 1 auto;box-sizing:border-box}[flex-sm-auto]{-ms-flex:1 1 auto;flex:1 1 auto;box-sizing:border-box}[flex-sm-none]{-ms-flex:0 0 auto;flex:0 0 auto;box-sizing:border-box}[flex-sm],[layout-sm=row]>[flex-sm],[layout=row]>[flex-sm]{max-height:100%}[layout-sm=column]>[flex-sm],[layout=column]>[flex-sm]{max-width:100%}[flex-sm="5"],[layout-sm=row]>[flex-sm="5"],[layout=row]>[flex-sm="5"]{-ms-flex:1 1 5%;flex:1 1 5%;max-width:5%}[layout-sm=column]>[flex-sm="5"],[layout=column]>[flex-sm="5"]{-ms-flex:1 1 5%;flex:1 1 5%;max-height:5%}[flex-sm="10"],[layout-sm=row]>[flex-sm="10"],[layout=row]>[flex-sm="10"]{-ms-flex:1 1 10%;flex:1 1 10%;max-width:10%}[layout-sm=column]>[flex-sm="10"],[layout=column]>[flex-sm="10"]{-ms-flex:1 1 10%;flex:1 1 10%;max-height:10%}[flex-sm="15"],[layout-sm=row]>[flex-sm="15"],[layout=row]>[flex-sm="15"]{-ms-flex:1 1 15%;flex:1 1 15%;max-width:15%}[layout-sm=column]>[flex-sm="15"],[layout=column]>[flex-sm="15"]{-ms-flex:1 1 15%;flex:1 1 15%;max-height:15%}[flex-sm="20"],[layout-sm=row]>[flex-sm="20"],[layout=row]>[flex-sm="20"]{-ms-flex:1 1 20%;flex:1 1 20%;max-width:20%}[layout-sm=column]>[flex-sm="20"],[layout=column]>[flex-sm="20"]{-ms-flex:1 1 20%;flex:1 1 20%;max-height:20%}[flex-sm="25"],[layout-sm=row]>[flex-sm="25"],[layout=row]>[flex-sm="25"]{-ms-flex:1 1 25%;flex:1 1 25%;max-width:25%}[layout-sm=column]>[flex-sm="25"],[layout=column]>[flex-sm="25"]{-ms-flex:1 1 25%;flex:1 1 25%;max-height:25%}[flex-sm="30"],[layout-sm=row]>[flex-sm="30"],[layout=row]>[flex-sm="30"]{-ms-flex:1 1 30%;flex:1 1 30%;max-width:30%}[layout-sm=column]>[flex-sm="30"],[layout=column]>[flex-sm="30"]{-ms-flex:1 1 30%;flex:1 1 30%;max-height:30%}[flex-sm="35"],[layout-sm=row]>[flex-sm="35"],[layout=row]>[flex-sm="35"]{-ms-flex:1 1 35%;flex:1 1 35%;max-width:35%}[layout-sm=column]>[flex-sm="35"],[layout=column]>[flex-sm="35"]{-ms-flex:1 1 35%;flex:1 1 35%;max-height:35%}[flex-sm="40"],[layout-sm=row]>[flex-sm="40"],[layout=row]>[flex-sm="40"]{-ms-flex:1 1 40%;flex:1 1 40%;max-width:40%}[layout-sm=column]>[flex-sm="40"],[layout=column]>[flex-sm="40"]{-ms-flex:1 1 40%;flex:1 1 40%;max-height:40%}[flex-sm="45"],[layout-sm=row]>[flex-sm="45"],[layout=row]>[flex-sm="45"]{-ms-flex:1 1 45%;flex:1 1 45%;max-width:45%}[layout-sm=column]>[flex-sm="45"],[layout=column]>[flex-sm="45"]{-ms-flex:1 1 45%;flex:1 1 45%;max-height:45%}[flex-sm="50"],[layout-sm=row]>[flex-sm="50"],[layout=row]>[flex-sm="50"]{-ms-flex:1 1 50%;flex:1 1 50%;max-width:50%}[layout-sm=column]>[flex-sm="50"],[layout=column]>[flex-sm="50"]{-ms-flex:1 1 50%;flex:1 1 50%;max-height:50%}[flex-sm="55"],[layout-sm=row]>[flex-sm="55"],[layout=row]>[flex-sm="55"]{-ms-flex:1 1 55%;flex:1 1 55%;max-width:55%}[layout-sm=column]>[flex-sm="55"],[layout=column]>[flex-sm="55"]{-ms-flex:1 1 55%;flex:1 1 55%;max-height:55%}[flex-sm="60"],[layout-sm=row]>[flex-sm="60"],[layout=row]>[flex-sm="60"]{-ms-flex:1 1 60%;flex:1 1 60%;max-width:60%}[layout-sm=column]>[flex-sm="60"],[layout=column]>[flex-sm="60"]{-ms-flex:1 1 60%;flex:1 1 60%;max-height:60%}[flex-sm="65"],[layout-sm=row]>[flex-sm="65"],[layout=row]>[flex-sm="65"]{-ms-flex:1 1 65%;flex:1 1 65%;max-width:65%}[layout-sm=column]>[flex-sm="65"],[layout=column]>[flex-sm="65"]{-ms-flex:1 1 65%;flex:1 1 65%;max-height:65%}[flex-sm="70"],[layout-sm=row]>[flex-sm="70"],[layout=row]>[flex-sm="70"]{-ms-flex:1 1 70%;flex:1 1 70%;max-width:70%}[layout-sm=column]>[flex-sm="70"],[layout=column]>[flex-sm="70"]{-ms-flex:1 1 70%;flex:1 1 70%;max-height:70%}[flex-sm="75"],[layout-sm=row]>[flex-sm="75"],[layout=row]>[flex-sm="75"]{-ms-flex:1 1 75%;flex:1 1 75%;max-width:75%}[layout-sm=column]>[flex-sm="75"],[layout=column]>[flex-sm="75"]{-ms-flex:1 1 75%;flex:1 1 75%;max-height:75%}[flex-sm="80"],[layout-sm=row]>[flex-sm="80"],[layout=row]>[flex-sm="80"]{-ms-flex:1 1 80%;flex:1 1 80%;max-width:80%}[layout-sm=column]>[flex-sm="80"],[layout=column]>[flex-sm="80"]{-ms-flex:1 1 80%;flex:1 1 80%;max-height:80%}[flex-sm="85"],[layout-sm=row]>[flex-sm="85"],[layout=row]>[flex-sm="85"]{-ms-flex:1 1 85%;flex:1 1 85%;max-width:85%}[layout-sm=column]>[flex-sm="85"],[layout=column]>[flex-sm="85"]{-ms-flex:1 1 85%;flex:1 1 85%;max-height:85%}[flex-sm="90"],[layout-sm=row]>[flex-sm="90"],[layout=row]>[flex-sm="90"]{-ms-flex:1 1 90%;flex:1 1 90%;max-width:90%}[layout-sm=column]>[flex-sm="90"],[layout=column]>[flex-sm="90"]{-ms-flex:1 1 90%;flex:1 1 90%;max-height:90%}[flex-sm="95"],[layout-sm=row]>[flex-sm="95"],[layout=row]>[flex-sm="95"]{-ms-flex:1 1 95%;flex:1 1 95%;max-width:95%}[layout-sm=column]>[flex-sm="95"],[layout=column]>[flex-sm="95"]{-ms-flex:1 1 95%;flex:1 1 95%;max-height:95%}[flex-sm="100"],[layout-sm=row]>[flex-sm="100"],[layout=row]>[flex-sm="100"]{-ms-flex:1 1 100%;flex:1 1 100%;max-width:100%}[layout-sm=column]>[flex-sm="100"],[layout=column]>[flex-sm="100"]{-ms-flex:1 1 100%;flex:1 1 100%;max-height:100%}[layout-sm=row]>[flex-sm="33"],[layout=row]>[flex-sm="33"]{-ms-flex:1 1 33.33%;flex:1 1 33.33%;max-width:33.33%}[layout-sm=row]>[flex-sm="66"],[layout=row]>[flex-sm="66"]{-ms-flex:1 1 66.66%;flex:1 1 66.66%;max-width:66.66%}[layout-sm=column]>[flex-sm="33"],[layout=column]>[flex-sm="33"]{-ms-flex:1 1 33.33%;flex:1 1 33.33%;max-height:33.33%}[layout-sm=column]>[flex-sm="66"],[layout=column]>[flex-sm="66"]{-ms-flex:1 1 66.66%;flex:1 1 66.66%;max-height:66.66%}[layout-sm]{display:-ms-flexbox;display:flex}[layout-sm=column]{-ms-flex-direction:column;flex-direction:column}[layout-sm=row]{-ms-flex-direction:row;flex-direction:row}}@media (min-width:600px){[flex-order-gt-sm="0"]{-ms-flex-order:0;order:0}[flex-order-gt-sm="1"]{-ms-flex-order:1;order:1}[flex-order-gt-sm="2"]{-ms-flex-order:2;order:2}[flex-order-gt-sm="3"]{-ms-flex-order:3;order:3}[flex-order-gt-sm="4"]{-ms-flex-order:4;order:4}[flex-order-gt-sm="5"]{-ms-flex-order:5;order:5}[flex-order-gt-sm="6"]{-ms-flex-order:6;order:6}[flex-order-gt-sm="7"]{-ms-flex-order:7;order:7}[flex-order-gt-sm="8"]{-ms-flex-order:8;order:8}[flex-order-gt-sm="9"]{-ms-flex-order:9;order:9}[flex-order-gt-sm="10"]{-ms-flex-order:10;order:10}[flex-order-gt-sm="11"]{-ms-flex-order:11;order:11}[flex-order-gt-sm="12"]{-ms-flex-order:12;order:12}[flex-order-gt-sm="13"]{-ms-flex-order:13;order:13}[flex-order-gt-sm="14"]{-ms-flex-order:14;order:14}[flex-order-gt-sm="15"]{-ms-flex-order:15;order:15}[flex-order-gt-sm="16"]{-ms-flex-order:16;order:16}[flex-order-gt-sm="17"]{-ms-flex-order:17;order:17}[flex-order-gt-sm="18"]{-ms-flex-order:18;order:18}[flex-order-gt-sm="19"]{-ms-flex-order:19;order:19}[flex-order-gt-sm="20"]{-ms-flex-order:20;order:20}[flex-gt-sm]{-ms-flex:1;flex:1}[flex-gt-sm-grow]{-ms-flex:1 1 100%;flex:1 1 100%;box-sizing:border-box}[flex-gt-sm-initial]{-ms-flex:0 1 auto;flex:0 1 auto;box-sizing:border-box}[flex-gt-sm-auto]{-ms-flex:1 1 auto;flex:1 1 auto;box-sizing:border-box}[flex-gt-sm-none]{-ms-flex:0 0 auto;flex:0 0 auto;box-sizing:border-box}[flex-gt-sm],[layout-gt-sm=row]>[flex-gt-sm],[layout=row]>[flex-gt-sm]{max-height:100%}[layout-gt-sm=column]>[flex-gt-sm],[layout=column]>[flex-gt-sm]{max-width:100%}[flex-gt-sm="5"],[layout-gt-sm=row]>[flex-gt-sm="5"],[layout=row]>[flex-gt-sm="5"]{-ms-flex:1 1 5%;flex:1 1 5%;max-width:5%}[layout-gt-sm=column]>[flex-gt-sm="5"],[layout=column]>[flex-gt-sm="5"]{-ms-flex:1 1 5%;flex:1 1 5%;max-height:5%}[flex-gt-sm="10"],[layout-gt-sm=row]>[flex-gt-sm="10"],[layout=row]>[flex-gt-sm="10"]{-ms-flex:1 1 10%;flex:1 1 10%;max-width:10%}[layout-gt-sm=column]>[flex-gt-sm="10"],[layout=column]>[flex-gt-sm="10"]{-ms-flex:1 1 10%;flex:1 1 10%;max-height:10%}[flex-gt-sm="15"],[layout-gt-sm=row]>[flex-gt-sm="15"],[layout=row]>[flex-gt-sm="15"]{-ms-flex:1 1 15%;flex:1 1 15%;max-width:15%}[layout-gt-sm=column]>[flex-gt-sm="15"],[layout=column]>[flex-gt-sm="15"]{-ms-flex:1 1 15%;flex:1 1 15%;max-height:15%}[flex-gt-sm="20"],[layout-gt-sm=row]>[flex-gt-sm="20"],[layout=row]>[flex-gt-sm="20"]{-ms-flex:1 1 20%;flex:1 1 20%;max-width:20%}[layout-gt-sm=column]>[flex-gt-sm="20"],[layout=column]>[flex-gt-sm="20"]{-ms-flex:1 1 20%;flex:1 1 20%;max-height:20%}[flex-gt-sm="25"],[layout-gt-sm=row]>[flex-gt-sm="25"],[layout=row]>[flex-gt-sm="25"]{-ms-flex:1 1 25%;flex:1 1 25%;max-width:25%}[layout-gt-sm=column]>[flex-gt-sm="25"],[layout=column]>[flex-gt-sm="25"]{-ms-flex:1 1 25%;flex:1 1 25%;max-height:25%}[flex-gt-sm="30"],[layout-gt-sm=row]>[flex-gt-sm="30"],[layout=row]>[flex-gt-sm="30"]{-ms-flex:1 1 30%;flex:1 1 30%;max-width:30%}[layout-gt-sm=column]>[flex-gt-sm="30"],[layout=column]>[flex-gt-sm="30"]{-ms-flex:1 1 30%;flex:1 1 30%;max-height:30%}[flex-gt-sm="35"],[layout-gt-sm=row]>[flex-gt-sm="35"],[layout=row]>[flex-gt-sm="35"]{-ms-flex:1 1 35%;flex:1 1 35%;max-width:35%}[layout-gt-sm=column]>[flex-gt-sm="35"],[layout=column]>[flex-gt-sm="35"]{-ms-flex:1 1 35%;flex:1 1 35%;max-height:35%}[flex-gt-sm="40"],[layout-gt-sm=row]>[flex-gt-sm="40"],[layout=row]>[flex-gt-sm="40"]{-ms-flex:1 1 40%;flex:1 1 40%;max-width:40%}[layout-gt-sm=column]>[flex-gt-sm="40"],[layout=column]>[flex-gt-sm="40"]{-ms-flex:1 1 40%;flex:1 1 40%;max-height:40%}[flex-gt-sm="45"],[layout-gt-sm=row]>[flex-gt-sm="45"],[layout=row]>[flex-gt-sm="45"]{-ms-flex:1 1 45%;flex:1 1 45%;max-width:45%}[layout-gt-sm=column]>[flex-gt-sm="45"],[layout=column]>[flex-gt-sm="45"]{-ms-flex:1 1 45%;flex:1 1 45%;max-height:45%}[flex-gt-sm="50"],[layout-gt-sm=row]>[flex-gt-sm="50"],[layout=row]>[flex-gt-sm="50"]{-ms-flex:1 1 50%;flex:1 1 50%;max-width:50%}[layout-gt-sm=column]>[flex-gt-sm="50"],[layout=column]>[flex-gt-sm="50"]{-ms-flex:1 1 50%;flex:1 1 50%;max-height:50%}[flex-gt-sm="55"],[layout-gt-sm=row]>[flex-gt-sm="55"],[layout=row]>[flex-gt-sm="55"]{-ms-flex:1 1 55%;flex:1 1 55%;max-width:55%}[layout-gt-sm=column]>[flex-gt-sm="55"],[layout=column]>[flex-gt-sm="55"]{-ms-flex:1 1 55%;flex:1 1 55%;max-height:55%}[flex-gt-sm="60"],[layout-gt-sm=row]>[flex-gt-sm="60"],[layout=row]>[flex-gt-sm="60"]{-ms-flex:1 1 60%;flex:1 1 60%;max-width:60%}[layout-gt-sm=column]>[flex-gt-sm="60"],[layout=column]>[flex-gt-sm="60"]{-ms-flex:1 1 60%;flex:1 1 60%;max-height:60%}[flex-gt-sm="65"],[layout-gt-sm=row]>[flex-gt-sm="65"],[layout=row]>[flex-gt-sm="65"]{-ms-flex:1 1 65%;flex:1 1 65%;max-width:65%}[layout-gt-sm=column]>[flex-gt-sm="65"],[layout=column]>[flex-gt-sm="65"]{-ms-flex:1 1 65%;flex:1 1 65%;max-height:65%}[flex-gt-sm="70"],[layout-gt-sm=row]>[flex-gt-sm="70"],[layout=row]>[flex-gt-sm="70"]{-ms-flex:1 1 70%;flex:1 1 70%;max-width:70%}[layout-gt-sm=column]>[flex-gt-sm="70"],[layout=column]>[flex-gt-sm="70"]{-ms-flex:1 1 70%;flex:1 1 70%;max-height:70%}[flex-gt-sm="75"],[layout-gt-sm=row]>[flex-gt-sm="75"],[layout=row]>[flex-gt-sm="75"]{-ms-flex:1 1 75%;flex:1 1 75%;max-width:75%}[layout-gt-sm=column]>[flex-gt-sm="75"],[layout=column]>[flex-gt-sm="75"]{-ms-flex:1 1 75%;flex:1 1 75%;max-height:75%}[flex-gt-sm="80"],[layout-gt-sm=row]>[flex-gt-sm="80"],[layout=row]>[flex-gt-sm="80"]{-ms-flex:1 1 80%;flex:1 1 80%;max-width:80%}[layout-gt-sm=column]>[flex-gt-sm="80"],[layout=column]>[flex-gt-sm="80"]{-ms-flex:1 1 80%;flex:1 1 80%;max-height:80%}[flex-gt-sm="85"],[layout-gt-sm=row]>[flex-gt-sm="85"],[layout=row]>[flex-gt-sm="85"]{-ms-flex:1 1 85%;flex:1 1 85%;max-width:85%}[layout-gt-sm=column]>[flex-gt-sm="85"],[layout=column]>[flex-gt-sm="85"]{-ms-flex:1 1 85%;flex:1 1 85%;max-height:85%}[flex-gt-sm="90"],[layout-gt-sm=row]>[flex-gt-sm="90"],[layout=row]>[flex-gt-sm="90"]{-ms-flex:1 1 90%;flex:1 1 90%;max-width:90%}[layout-gt-sm=column]>[flex-gt-sm="90"],[layout=column]>[flex-gt-sm="90"]{-ms-flex:1 1 90%;flex:1 1 90%;max-height:90%}[flex-gt-sm="95"],[layout-gt-sm=row]>[flex-gt-sm="95"],[layout=row]>[flex-gt-sm="95"]{-ms-flex:1 1 95%;flex:1 1 95%;max-width:95%}[layout-gt-sm=column]>[flex-gt-sm="95"],[layout=column]>[flex-gt-sm="95"]{-ms-flex:1 1 95%;flex:1 1 95%;max-height:95%}[flex-gt-sm="100"],[layout-gt-sm=row]>[flex-gt-sm="100"],[layout=row]>[flex-gt-sm="100"]{-ms-flex:1 1 100%;flex:1 1 100%;max-width:100%}[layout-gt-sm=column]>[flex-gt-sm="100"],[layout=column]>[flex-gt-sm="100"]{-ms-flex:1 1 100%;flex:1 1 100%;max-height:100%}[layout-gt-sm=row]>[flex-gt-sm="33"],[layout=row]>[flex-gt-sm="33"]{-ms-flex:1 1 33.33%;flex:1 1 33.33%;max-width:33.33%}[layout-gt-sm=row]>[flex-gt-sm="66"],[layout=row]>[flex-gt-sm="66"]{-ms-flex:1 1 66.66%;flex:1 1 66.66%;max-width:66.66%}[layout-gt-sm=column]>[flex-gt-sm="33"],[layout=column]>[flex-gt-sm="33"]{-ms-flex:1 1 33.33%;flex:1 1 33.33%;max-height:33.33%}[layout-gt-sm=column]>[flex-gt-sm="66"],[layout=column]>[flex-gt-sm="66"]{-ms-flex:1 1 66.66%;flex:1 1 66.66%;max-height:66.66%}[layout-gt-sm]{display:-ms-flexbox;display:flex}[layout-gt-sm=column]{-ms-flex-direction:column;flex-direction:column}[layout-gt-sm=row]{-ms-flex-direction:row;flex-direction:row}}@media (min-width:600px) and (max-width:959px){[hide-gt-sm]:not([show-gt-xs]):not([show-gt-sm]):not([show-md]):not([show]),[hide-gt-xs]:not([show-gt-xs]):not([show-gt-sm]):not([show-md]):not([show]),[hide-md]:not([show-md]):not([show]),[hide]:not([show-gt-xs]):not([show-gt-sm]):not([show-md]):not([show]){display:none}[flex-order-md="0"]{-ms-flex-order:0;order:0}[flex-order-md="1"]{-ms-flex-order:1;order:1}[flex-order-md="2"]{-ms-flex-order:2;order:2}[flex-order-md="3"]{-ms-flex-order:3;order:3}[flex-order-md="4"]{-ms-flex-order:4;order:4}[flex-order-md="5"]{-ms-flex-order:5;order:5}[flex-order-md="6"]{-ms-flex-order:6;order:6}[flex-order-md="7"]{-ms-flex-order:7;order:7}[flex-order-md="8"]{-ms-flex-order:8;order:8}[flex-order-md="9"]{-ms-flex-order:9;order:9}[flex-order-md="10"]{-ms-flex-order:10;order:10}[flex-order-md="11"]{-ms-flex-order:11;order:11}[flex-order-md="12"]{-ms-flex-order:12;order:12}[flex-order-md="13"]{-ms-flex-order:13;order:13}[flex-order-md="14"]{-ms-flex-order:14;order:14}[flex-order-md="15"]{-ms-flex-order:15;order:15}[flex-order-md="16"]{-ms-flex-order:16;order:16}[flex-order-md="17"]{-ms-flex-order:17;order:17}[flex-order-md="18"]{-ms-flex-order:18;order:18}[flex-order-md="19"]{-ms-flex-order:19;order:19}[flex-order-md="20"]{-ms-flex-order:20;order:20}[flex-md]{-ms-flex:1;flex:1}[flex-md-grow]{-ms-flex:1 1 100%;flex:1 1 100%;box-sizing:border-box}[flex-md-initial]{-ms-flex:0 1 auto;flex:0 1 auto;box-sizing:border-box}[flex-md-auto]{-ms-flex:1 1 auto;flex:1 1 auto;box-sizing:border-box}[flex-md-none]{-ms-flex:0 0 auto;flex:0 0 auto;box-sizing:border-box}[flex-md],[layout-md=row]>[flex-md],[layout=row]>[flex-md]{max-height:100%}[layout-md=column]>[flex-md],[layout=column]>[flex-md]{max-width:100%}[flex-md="5"],[layout-md=row]>[flex-md="5"],[layout=row]>[flex-md="5"]{-ms-flex:1 1 5%;flex:1 1 5%;max-width:5%}[layout-md=column]>[flex-md="5"],[layout=column]>[flex-md="5"]{-ms-flex:1 1 5%;flex:1 1 5%;max-height:5%}[flex-md="10"],[layout-md=row]>[flex-md="10"],[layout=row]>[flex-md="10"]{-ms-flex:1 1 10%;flex:1 1 10%;max-width:10%}[layout-md=column]>[flex-md="10"],[layout=column]>[flex-md="10"]{-ms-flex:1 1 10%;flex:1 1 10%;max-height:10%}[flex-md="15"],[layout-md=row]>[flex-md="15"],[layout=row]>[flex-md="15"]{-ms-flex:1 1 15%;flex:1 1 15%;max-width:15%}[layout-md=column]>[flex-md="15"],[layout=column]>[flex-md="15"]{-ms-flex:1 1 15%;flex:1 1 15%;max-height:15%}[flex-md="20"],[layout-md=row]>[flex-md="20"],[layout=row]>[flex-md="20"]{-ms-flex:1 1 20%;flex:1 1 20%;max-width:20%}[layout-md=column]>[flex-md="20"],[layout=column]>[flex-md="20"]{-ms-flex:1 1 20%;flex:1 1 20%;max-height:20%}[flex-md="25"],[layout-md=row]>[flex-md="25"],[layout=row]>[flex-md="25"]{-ms-flex:1 1 25%;flex:1 1 25%;max-width:25%}[layout-md=column]>[flex-md="25"],[layout=column]>[flex-md="25"]{-ms-flex:1 1 25%;flex:1 1 25%;max-height:25%}[flex-md="30"],[layout-md=row]>[flex-md="30"],[layout=row]>[flex-md="30"]{-ms-flex:1 1 30%;flex:1 1 30%;max-width:30%}[layout-md=column]>[flex-md="30"],[layout=column]>[flex-md="30"]{-ms-flex:1 1 30%;flex:1 1 30%;max-height:30%}[flex-md="35"],[layout-md=row]>[flex-md="35"],[layout=row]>[flex-md="35"]{-ms-flex:1 1 35%;flex:1 1 35%;max-width:35%}[layout-md=column]>[flex-md="35"],[layout=column]>[flex-md="35"]{-ms-flex:1 1 35%;flex:1 1 35%;max-height:35%}[flex-md="40"],[layout-md=row]>[flex-md="40"],[layout=row]>[flex-md="40"]{-ms-flex:1 1 40%;flex:1 1 40%;max-width:40%}[layout-md=column]>[flex-md="40"],[layout=column]>[flex-md="40"]{-ms-flex:1 1 40%;flex:1 1 40%;max-height:40%}[flex-md="45"],[layout-md=row]>[flex-md="45"],[layout=row]>[flex-md="45"]{-ms-flex:1 1 45%;flex:1 1 45%;max-width:45%}[layout-md=column]>[flex-md="45"],[layout=column]>[flex-md="45"]{-ms-flex:1 1 45%;flex:1 1 45%;max-height:45%}[flex-md="50"],[layout-md=row]>[flex-md="50"],[layout=row]>[flex-md="50"]{-ms-flex:1 1 50%;flex:1 1 50%;max-width:50%}[layout-md=column]>[flex-md="50"],[layout=column]>[flex-md="50"]{-ms-flex:1 1 50%;flex:1 1 50%;max-height:50%}[flex-md="55"],[layout-md=row]>[flex-md="55"],[layout=row]>[flex-md="55"]{-ms-flex:1 1 55%;flex:1 1 55%;max-width:55%}[layout-md=column]>[flex-md="55"],[layout=column]>[flex-md="55"]{-ms-flex:1 1 55%;flex:1 1 55%;max-height:55%}[flex-md="60"],[layout-md=row]>[flex-md="60"],[layout=row]>[flex-md="60"]{-ms-flex:1 1 60%;flex:1 1 60%;max-width:60%}[layout-md=column]>[flex-md="60"],[layout=column]>[flex-md="60"]{-ms-flex:1 1 60%;flex:1 1 60%;max-height:60%}[flex-md="65"],[layout-md=row]>[flex-md="65"],[layout=row]>[flex-md="65"]{-ms-flex:1 1 65%;flex:1 1 65%;max-width:65%}[layout-md=column]>[flex-md="65"],[layout=column]>[flex-md="65"]{-ms-flex:1 1 65%;flex:1 1 65%;max-height:65%}[flex-md="70"],[layout-md=row]>[flex-md="70"],[layout=row]>[flex-md="70"]{-ms-flex:1 1 70%;flex:1 1 70%;max-width:70%}[layout-md=column]>[flex-md="70"],[layout=column]>[flex-md="70"]{-ms-flex:1 1 70%;flex:1 1 70%;max-height:70%}[flex-md="75"],[layout-md=row]>[flex-md="75"],[layout=row]>[flex-md="75"]{-ms-flex:1 1 75%;flex:1 1 75%;max-width:75%}[layout-md=column]>[flex-md="75"],[layout=column]>[flex-md="75"]{-ms-flex:1 1 75%;flex:1 1 75%;max-height:75%}[flex-md="80"],[layout-md=row]>[flex-md="80"],[layout=row]>[flex-md="80"]{-ms-flex:1 1 80%;flex:1 1 80%;max-width:80%}[layout-md=column]>[flex-md="80"],[layout=column]>[flex-md="80"]{-ms-flex:1 1 80%;flex:1 1 80%;max-height:80%}[flex-md="85"],[layout-md=row]>[flex-md="85"],[layout=row]>[flex-md="85"]{-ms-flex:1 1 85%;flex:1 1 85%;max-width:85%}[layout-md=column]>[flex-md="85"],[layout=column]>[flex-md="85"]{-ms-flex:1 1 85%;flex:1 1 85%;max-height:85%}[flex-md="90"],[layout-md=row]>[flex-md="90"],[layout=row]>[flex-md="90"]{-ms-flex:1 1 90%;flex:1 1 90%;max-width:90%}[layout-md=column]>[flex-md="90"],[layout=column]>[flex-md="90"]{-ms-flex:1 1 90%;flex:1 1 90%;max-height:90%}[flex-md="95"],[layout-md=row]>[flex-md="95"],[layout=row]>[flex-md="95"]{-ms-flex:1 1 95%;flex:1 1 95%;max-width:95%}[layout-md=column]>[flex-md="95"],[layout=column]>[flex-md="95"]{-ms-flex:1 1 95%;flex:1 1 95%;max-height:95%}[flex-md="100"],[layout-md=row]>[flex-md="100"],[layout=row]>[flex-md="100"]{-ms-flex:1 1 100%;flex:1 1 100%;max-width:100%}[layout-md=column]>[flex-md="100"],[layout=column]>[flex-md="100"]{-ms-flex:1 1 100%;flex:1 1 100%;max-height:100%}[layout-md=row]>[flex-md="33"],[layout=row]>[flex-md="33"]{-ms-flex:1 1 33.33%;flex:1 1 33.33%;max-width:33.33%}[layout-md=row]>[flex-md="66"],[layout=row]>[flex-md="66"]{-ms-flex:1 1 66.66%;flex:1 1 66.66%;max-width:66.66%}[layout-md=column]>[flex-md="33"],[layout=column]>[flex-md="33"]{-ms-flex:1 1 33.33%;flex:1 1 33.33%;max-height:33.33%}[layout-md=column]>[flex-md="66"],[layout=column]>[flex-md="66"]{-ms-flex:1 1 66.66%;flex:1 1 66.66%;max-height:66.66%}[layout-md]{display:-ms-flexbox;display:flex}[layout-md=column]{-ms-flex-direction:column;flex-direction:column}[layout-md=row]{-ms-flex-direction:row;flex-direction:row}}@media (min-width:960px){[flex-order-gt-md="0"]{-ms-flex-order:0;order:0}[flex-order-gt-md="1"]{-ms-flex-order:1;order:1}[flex-order-gt-md="2"]{-ms-flex-order:2;order:2}[flex-order-gt-md="3"]{-ms-flex-order:3;order:3}[flex-order-gt-md="4"]{-ms-flex-order:4;order:4}[flex-order-gt-md="5"]{-ms-flex-order:5;order:5}[flex-order-gt-md="6"]{-ms-flex-order:6;order:6}[flex-order-gt-md="7"]{-ms-flex-order:7;order:7}[flex-order-gt-md="8"]{-ms-flex-order:8;order:8}[flex-order-gt-md="9"]{-ms-flex-order:9;order:9}[flex-order-gt-md="10"]{-ms-flex-order:10;order:10}[flex-order-gt-md="11"]{-ms-flex-order:11;order:11}[flex-order-gt-md="12"]{-ms-flex-order:12;order:12}[flex-order-gt-md="13"]{-ms-flex-order:13;order:13}[flex-order-gt-md="14"]{-ms-flex-order:14;order:14}[flex-order-gt-md="15"]{-ms-flex-order:15;order:15}[flex-order-gt-md="16"]{-ms-flex-order:16;order:16}[flex-order-gt-md="17"]{-ms-flex-order:17;order:17}[flex-order-gt-md="18"]{-ms-flex-order:18;order:18}[flex-order-gt-md="19"]{-ms-flex-order:19;order:19}[flex-order-gt-md="20"]{-ms-flex-order:20;order:20}[flex-gt-md]{-ms-flex:1;flex:1}[flex-gt-md-grow]{-ms-flex:1 1 100%;flex:1 1 100%;box-sizing:border-box}[flex-gt-md-initial]{-ms-flex:0 1 auto;flex:0 1 auto;box-sizing:border-box}[flex-gt-md-auto]{-ms-flex:1 1 auto;flex:1 1 auto;box-sizing:border-box}[flex-gt-md-none]{-ms-flex:0 0 auto;flex:0 0 auto;box-sizing:border-box}[flex-gt-md],[layout-gt-md=row]>[flex-gt-md],[layout=row]>[flex-gt-md]{max-height:100%}[layout-gt-md=column]>[flex-gt-md],[layout=column]>[flex-gt-md]{max-width:100%}[flex-gt-md="5"],[layout-gt-md=row]>[flex-gt-md="5"],[layout=row]>[flex-gt-md="5"]{-ms-flex:1 1 5%;flex:1 1 5%;max-width:5%}[layout-gt-md=column]>[flex-gt-md="5"],[layout=column]>[flex-gt-md="5"]{-ms-flex:1 1 5%;flex:1 1 5%;max-height:5%}[flex-gt-md="10"],[layout-gt-md=row]>[flex-gt-md="10"],[layout=row]>[flex-gt-md="10"]{-ms-flex:1 1 10%;flex:1 1 10%;max-width:10%}[layout-gt-md=column]>[flex-gt-md="10"],[layout=column]>[flex-gt-md="10"]{-ms-flex:1 1 10%;flex:1 1 10%;max-height:10%}[flex-gt-md="15"],[layout-gt-md=row]>[flex-gt-md="15"],[layout=row]>[flex-gt-md="15"]{-ms-flex:1 1 15%;flex:1 1 15%;max-width:15%}[layout-gt-md=column]>[flex-gt-md="15"],[layout=column]>[flex-gt-md="15"]{-ms-flex:1 1 15%;flex:1 1 15%;max-height:15%}[flex-gt-md="20"],[layout-gt-md=row]>[flex-gt-md="20"],[layout=row]>[flex-gt-md="20"]{-ms-flex:1 1 20%;flex:1 1 20%;max-width:20%}[layout-gt-md=column]>[flex-gt-md="20"],[layout=column]>[flex-gt-md="20"]{-ms-flex:1 1 20%;flex:1 1 20%;max-height:20%}[flex-gt-md="25"],[layout-gt-md=row]>[flex-gt-md="25"],[layout=row]>[flex-gt-md="25"]{-ms-flex:1 1 25%;flex:1 1 25%;max-width:25%}[layout-gt-md=column]>[flex-gt-md="25"],[layout=column]>[flex-gt-md="25"]{-ms-flex:1 1 25%;flex:1 1 25%;max-height:25%}[flex-gt-md="30"],[layout-gt-md=row]>[flex-gt-md="30"],[layout=row]>[flex-gt-md="30"]{-ms-flex:1 1 30%;flex:1 1 30%;max-width:30%}[layout-gt-md=column]>[flex-gt-md="30"],[layout=column]>[flex-gt-md="30"]{-ms-flex:1 1 30%;flex:1 1 30%;max-height:30%}[flex-gt-md="35"],[layout-gt-md=row]>[flex-gt-md="35"],[layout=row]>[flex-gt-md="35"]{-ms-flex:1 1 35%;flex:1 1 35%;max-width:35%}[layout-gt-md=column]>[flex-gt-md="35"],[layout=column]>[flex-gt-md="35"]{-ms-flex:1 1 35%;flex:1 1 35%;max-height:35%}[flex-gt-md="40"],[layout-gt-md=row]>[flex-gt-md="40"],[layout=row]>[flex-gt-md="40"]{-ms-flex:1 1 40%;flex:1 1 40%;max-width:40%}[layout-gt-md=column]>[flex-gt-md="40"],[layout=column]>[flex-gt-md="40"]{-ms-flex:1 1 40%;flex:1 1 40%;max-height:40%}[flex-gt-md="45"],[layout-gt-md=row]>[flex-gt-md="45"],[layout=row]>[flex-gt-md="45"]{-ms-flex:1 1 45%;flex:1 1 45%;max-width:45%}[layout-gt-md=column]>[flex-gt-md="45"],[layout=column]>[flex-gt-md="45"]{-ms-flex:1 1 45%;flex:1 1 45%;max-height:45%}[flex-gt-md="50"],[layout-gt-md=row]>[flex-gt-md="50"],[layout=row]>[flex-gt-md="50"]{-ms-flex:1 1 50%;flex:1 1 50%;max-width:50%}[layout-gt-md=column]>[flex-gt-md="50"],[layout=column]>[flex-gt-md="50"]{-ms-flex:1 1 50%;flex:1 1 50%;max-height:50%}[flex-gt-md="55"],[layout-gt-md=row]>[flex-gt-md="55"],[layout=row]>[flex-gt-md="55"]{-ms-flex:1 1 55%;flex:1 1 55%;max-width:55%}[layout-gt-md=column]>[flex-gt-md="55"],[layout=column]>[flex-gt-md="55"]{-ms-flex:1 1 55%;flex:1 1 55%;max-height:55%}[flex-gt-md="60"],[layout-gt-md=row]>[flex-gt-md="60"],[layout=row]>[flex-gt-md="60"]{-ms-flex:1 1 60%;flex:1 1 60%;max-width:60%}[layout-gt-md=column]>[flex-gt-md="60"],[layout=column]>[flex-gt-md="60"]{-ms-flex:1 1 60%;flex:1 1 60%;max-height:60%}[flex-gt-md="65"],[layout-gt-md=row]>[flex-gt-md="65"],[layout=row]>[flex-gt-md="65"]{-ms-flex:1 1 65%;flex:1 1 65%;max-width:65%}[layout-gt-md=column]>[flex-gt-md="65"],[layout=column]>[flex-gt-md="65"]{-ms-flex:1 1 65%;flex:1 1 65%;max-height:65%}[flex-gt-md="70"],[layout-gt-md=row]>[flex-gt-md="70"],[layout=row]>[flex-gt-md="70"]{-ms-flex:1 1 70%;flex:1 1 70%;max-width:70%}[layout-gt-md=column]>[flex-gt-md="70"],[layout=column]>[flex-gt-md="70"]{-ms-flex:1 1 70%;flex:1 1 70%;max-height:70%}[flex-gt-md="75"],[layout-gt-md=row]>[flex-gt-md="75"],[layout=row]>[flex-gt-md="75"]{-ms-flex:1 1 75%;flex:1 1 75%;max-width:75%}[layout-gt-md=column]>[flex-gt-md="75"],[layout=column]>[flex-gt-md="75"]{-ms-flex:1 1 75%;flex:1 1 75%;max-height:75%}[flex-gt-md="80"],[layout-gt-md=row]>[flex-gt-md="80"],[layout=row]>[flex-gt-md="80"]{-ms-flex:1 1 80%;flex:1 1 80%;max-width:80%}[layout-gt-md=column]>[flex-gt-md="80"],[layout=column]>[flex-gt-md="80"]{-ms-flex:1 1 80%;flex:1 1 80%;max-height:80%}[flex-gt-md="85"],[layout-gt-md=row]>[flex-gt-md="85"],[layout=row]>[flex-gt-md="85"]{-ms-flex:1 1 85%;flex:1 1 85%;max-width:85%}[layout-gt-md=column]>[flex-gt-md="85"],[layout=column]>[flex-gt-md="85"]{-ms-flex:1 1 85%;flex:1 1 85%;max-height:85%}[flex-gt-md="90"],[layout-gt-md=row]>[flex-gt-md="90"],[layout=row]>[flex-gt-md="90"]{-ms-flex:1 1 90%;flex:1 1 90%;max-width:90%}[layout-gt-md=column]>[flex-gt-md="90"],[layout=column]>[flex-gt-md="90"]{-ms-flex:1 1 90%;flex:1 1 90%;max-height:90%}[flex-gt-md="95"],[layout-gt-md=row]>[flex-gt-md="95"],[layout=row]>[flex-gt-md="95"]{-ms-flex:1 1 95%;flex:1 1 95%;max-width:95%}[layout-gt-md=column]>[flex-gt-md="95"],[layout=column]>[flex-gt-md="95"]{-ms-flex:1 1 95%;flex:1 1 95%;max-height:95%}[flex-gt-md="100"],[layout-gt-md=row]>[flex-gt-md="100"],[layout=row]>[flex-gt-md="100"]{-ms-flex:1 1 100%;flex:1 1 100%;max-width:100%}[layout-gt-md=column]>[flex-gt-md="100"],[layout=column]>[flex-gt-md="100"]{-ms-flex:1 1 100%;flex:1 1 100%;max-height:100%}[layout-gt-md=row]>[flex-gt-md="33"],[layout=row]>[flex-gt-md="33"]{-ms-flex:1 1 33.33%;flex:1 1 33.33%;max-width:33.33%}[layout-gt-md=row]>[flex-gt-md="66"],[layout=row]>[flex-gt-md="66"]{-ms-flex:1 1 66.66%;flex:1 1 66.66%;max-width:66.66%}[layout-gt-md=column]>[flex-gt-md="33"],[layout=column]>[flex-gt-md="33"]{-ms-flex:1 1 33.33%;flex:1 1 33.33%;max-height:33.33%}[layout-gt-md=column]>[flex-gt-md="66"],[layout=column]>[flex-gt-md="66"]{-ms-flex:1 1 66.66%;flex:1 1 66.66%;max-height:66.66%}[layout-gt-md]{display:-ms-flexbox;display:flex}[layout-gt-md=column]{-ms-flex-direction:column;flex-direction:column}[layout-gt-md=row]{-ms-flex-direction:row;flex-direction:row}}@media (min-width:960px) and (max-width:1199px){[hide-gt-md]:not([show-gt-xs]):not([show-gt-sm]):not([show-gt-md]):not([show-lg]):not([show]),[hide-gt-sm]:not([show-gt-xs]):not([show-gt-sm]):not([show-gt-md]):not([show-lg]):not([show]),[hide-gt-xs]:not([show-gt-xs]):not([show-gt-sm]):not([show-gt-md]):not([show-lg]):not([show]),[hide-lg]:not([show-lg]):not([show]),[hide]:not([show-gt-xs]):not([show-gt-sm]):not([show-gt-md]):not([show-lg]):not([show]){display:none}[flex-order-lg="0"]{-ms-flex-order:0;order:0}[flex-order-lg="1"]{-ms-flex-order:1;order:1}[flex-order-lg="2"]{-ms-flex-order:2;order:2}[flex-order-lg="3"]{-ms-flex-order:3;order:3}[flex-order-lg="4"]{-ms-flex-order:4;order:4}[flex-order-lg="5"]{-ms-flex-order:5;order:5}[flex-order-lg="6"]{-ms-flex-order:6;order:6}[flex-order-lg="7"]{-ms-flex-order:7;order:7}[flex-order-lg="8"]{-ms-flex-order:8;order:8}[flex-order-lg="9"]{-ms-flex-order:9;order:9}[flex-order-lg="10"]{-ms-flex-order:10;order:10}[flex-order-lg="11"]{-ms-flex-order:11;order:11}[flex-order-lg="12"]{-ms-flex-order:12;order:12}[flex-order-lg="13"]{-ms-flex-order:13;order:13}[flex-order-lg="14"]{-ms-flex-order:14;order:14}[flex-order-lg="15"]{-ms-flex-order:15;order:15}[flex-order-lg="16"]{-ms-flex-order:16;order:16}[flex-order-lg="17"]{-ms-flex-order:17;order:17}[flex-order-lg="18"]{-ms-flex-order:18;order:18}[flex-order-lg="19"]{-ms-flex-order:19;order:19}[flex-order-lg="20"]{-ms-flex-order:20;order:20}[flex-lg]{-ms-flex:1;flex:1}[flex-lg-grow]{-ms-flex:1 1 100%;flex:1 1 100%;box-sizing:border-box}[flex-lg-initial]{-ms-flex:0 1 auto;flex:0 1 auto;box-sizing:border-box}[flex-lg-auto]{-ms-flex:1 1 auto;flex:1 1 auto;box-sizing:border-box}[flex-lg-none]{-ms-flex:0 0 auto;flex:0 0 auto;box-sizing:border-box}[flex-lg],[layout-lg=row]>[flex-lg],[layout=row]>[flex-lg]{max-height:100%}[layout-lg=column]>[flex-lg],[layout=column]>[flex-lg]{max-width:100%}[flex-lg="5"],[layout-lg=row]>[flex-lg="5"],[layout=row]>[flex-lg="5"]{-ms-flex:1 1 5%;flex:1 1 5%;max-width:5%}[layout-lg=column]>[flex-lg="5"],[layout=column]>[flex-lg="5"]{-ms-flex:1 1 5%;flex:1 1 5%;max-height:5%}[flex-lg="10"],[layout-lg=row]>[flex-lg="10"],[layout=row]>[flex-lg="10"]{-ms-flex:1 1 10%;flex:1 1 10%;max-width:10%}[layout-lg=column]>[flex-lg="10"],[layout=column]>[flex-lg="10"]{-ms-flex:1 1 10%;flex:1 1 10%;max-height:10%}[flex-lg="15"],[layout-lg=row]>[flex-lg="15"],[layout=row]>[flex-lg="15"]{-ms-flex:1 1 15%;flex:1 1 15%;max-width:15%}[layout-lg=column]>[flex-lg="15"],[layout=column]>[flex-lg="15"]{-ms-flex:1 1 15%;flex:1 1 15%;max-height:15%}[flex-lg="20"],[layout-lg=row]>[flex-lg="20"],[layout=row]>[flex-lg="20"]{-ms-flex:1 1 20%;flex:1 1 20%;max-width:20%}[layout-lg=column]>[flex-lg="20"],[layout=column]>[flex-lg="20"]{-ms-flex:1 1 20%;flex:1 1 20%;max-height:20%}[flex-lg="25"],[layout-lg=row]>[flex-lg="25"],[layout=row]>[flex-lg="25"]{-ms-flex:1 1 25%;flex:1 1 25%;max-width:25%}[layout-lg=column]>[flex-lg="25"],[layout=column]>[flex-lg="25"]{-ms-flex:1 1 25%;flex:1 1 25%;max-height:25%}[flex-lg="30"],[layout-lg=row]>[flex-lg="30"],[layout=row]>[flex-lg="30"]{-ms-flex:1 1 30%;flex:1 1 30%;max-width:30%}[layout-lg=column]>[flex-lg="30"],[layout=column]>[flex-lg="30"]{-ms-flex:1 1 30%;flex:1 1 30%;max-height:30%}[flex-lg="35"],[layout-lg=row]>[flex-lg="35"],[layout=row]>[flex-lg="35"]{-ms-flex:1 1 35%;flex:1 1 35%;max-width:35%}[layout-lg=column]>[flex-lg="35"],[layout=column]>[flex-lg="35"]{-ms-flex:1 1 35%;flex:1 1 35%;max-height:35%}[flex-lg="40"],[layout-lg=row]>[flex-lg="40"],[layout=row]>[flex-lg="40"]{-ms-flex:1 1 40%;flex:1 1 40%;max-width:40%}[layout-lg=column]>[flex-lg="40"],[layout=column]>[flex-lg="40"]{-ms-flex:1 1 40%;flex:1 1 40%;max-height:40%}[flex-lg="45"],[layout-lg=row]>[flex-lg="45"],[layout=row]>[flex-lg="45"]{-ms-flex:1 1 45%;flex:1 1 45%;max-width:45%}[layout-lg=column]>[flex-lg="45"],[layout=column]>[flex-lg="45"]{-ms-flex:1 1 45%;flex:1 1 45%;max-height:45%}[flex-lg="50"],[layout-lg=row]>[flex-lg="50"],[layout=row]>[flex-lg="50"]{-ms-flex:1 1 50%;flex:1 1 50%;max-width:50%}[layout-lg=column]>[flex-lg="50"],[layout=column]>[flex-lg="50"]{-ms-flex:1 1 50%;flex:1 1 50%;max-height:50%}[flex-lg="55"],[layout-lg=row]>[flex-lg="55"],[layout=row]>[flex-lg="55"]{-ms-flex:1 1 55%;flex:1 1 55%;max-width:55%}[layout-lg=column]>[flex-lg="55"],[layout=column]>[flex-lg="55"]{-ms-flex:1 1 55%;flex:1 1 55%;max-height:55%}[flex-lg="60"],[layout-lg=row]>[flex-lg="60"],[layout=row]>[flex-lg="60"]{-ms-flex:1 1 60%;flex:1 1 60%;max-width:60%}[layout-lg=column]>[flex-lg="60"],[layout=column]>[flex-lg="60"]{-ms-flex:1 1 60%;flex:1 1 60%;max-height:60%}[flex-lg="65"],[layout-lg=row]>[flex-lg="65"],[layout=row]>[flex-lg="65"]{-ms-flex:1 1 65%;flex:1 1 65%;max-width:65%}[layout-lg=column]>[flex-lg="65"],[layout=column]>[flex-lg="65"]{-ms-flex:1 1 65%;flex:1 1 65%;max-height:65%}[flex-lg="70"],[layout-lg=row]>[flex-lg="70"],[layout=row]>[flex-lg="70"]{-ms-flex:1 1 70%;flex:1 1 70%;max-width:70%}[layout-lg=column]>[flex-lg="70"],[layout=column]>[flex-lg="70"]{-ms-flex:1 1 70%;flex:1 1 70%;max-height:70%}[flex-lg="75"],[layout-lg=row]>[flex-lg="75"],[layout=row]>[flex-lg="75"]{-ms-flex:1 1 75%;flex:1 1 75%;max-width:75%}[layout-lg=column]>[flex-lg="75"],[layout=column]>[flex-lg="75"]{-ms-flex:1 1 75%;flex:1 1 75%;max-height:75%}[flex-lg="80"],[layout-lg=row]>[flex-lg="80"],[layout=row]>[flex-lg="80"]{-ms-flex:1 1 80%;flex:1 1 80%;max-width:80%}[layout-lg=column]>[flex-lg="80"],[layout=column]>[flex-lg="80"]{-ms-flex:1 1 80%;flex:1 1 80%;max-height:80%}[flex-lg="85"],[layout-lg=row]>[flex-lg="85"],[layout=row]>[flex-lg="85"]{-ms-flex:1 1 85%;flex:1 1 85%;max-width:85%}[layout-lg=column]>[flex-lg="85"],[layout=column]>[flex-lg="85"]{-ms-flex:1 1 85%;flex:1 1 85%;max-height:85%}[flex-lg="90"],[layout-lg=row]>[flex-lg="90"],[layout=row]>[flex-lg="90"]{-ms-flex:1 1 90%;flex:1 1 90%;max-width:90%}[layout-lg=column]>[flex-lg="90"],[layout=column]>[flex-lg="90"]{-ms-flex:1 1 90%;flex:1 1 90%;max-height:90%}[flex-lg="95"],[layout-lg=row]>[flex-lg="95"],[layout=row]>[flex-lg="95"]{-ms-flex:1 1 95%;flex:1 1 95%;max-width:95%}[layout-lg=column]>[flex-lg="95"],[layout=column]>[flex-lg="95"]{-ms-flex:1 1 95%;flex:1 1 95%;max-height:95%}[flex-lg="100"],[layout-lg=row]>[flex-lg="100"],[layout=row]>[flex-lg="100"]{-ms-flex:1 1 100%;flex:1 1 100%;max-width:100%}[layout-lg=column]>[flex-lg="100"],[layout=column]>[flex-lg="100"]{-ms-flex:1 1 100%;flex:1 1 100%;max-height:100%}[layout-lg=row]>[flex-lg="33"],[layout=row]>[flex-lg="33"]{-ms-flex:1 1 33.33%;flex:1 1 33.33%;max-width:33.33%}[layout-lg=row]>[flex-lg="66"],[layout=row]>[flex-lg="66"]{-ms-flex:1 1 66.66%;flex:1 1 66.66%;max-width:66.66%}[layout-lg=column]>[flex-lg="33"],[layout=column]>[flex-lg="33"]{-ms-flex:1 1 33.33%;flex:1 1 33.33%;max-height:33.33%}[layout-lg=column]>[flex-lg="66"],[layout=column]>[flex-lg="66"]{-ms-flex:1 1 66.66%;flex:1 1 66.66%;max-height:66.66%}[layout-lg]{display:-ms-flexbox;display:flex}[layout-lg=column]{-ms-flex-direction:column;flex-direction:column}[layout-lg=row]{-ms-flex-direction:row;flex-direction:row}}@media (min-width:1200px){[flex-order-gt-lg="0"]{-ms-flex-order:0;order:0}[flex-order-gt-lg="1"]{-ms-flex-order:1;order:1}[flex-order-gt-lg="2"]{-ms-flex-order:2;order:2}[flex-order-gt-lg="3"]{-ms-flex-order:3;order:3}[flex-order-gt-lg="4"]{-ms-flex-order:4;order:4}[flex-order-gt-lg="5"]{-ms-flex-order:5;order:5}[flex-order-gt-lg="6"]{-ms-flex-order:6;order:6}[flex-order-gt-lg="7"]{-ms-flex-order:7;order:7}[flex-order-gt-lg="8"]{-ms-flex-order:8;order:8}[flex-order-gt-lg="9"]{-ms-flex-order:9;order:9}[flex-order-gt-lg="10"]{-ms-flex-order:10;order:10}[flex-order-gt-lg="11"]{-ms-flex-order:11;order:11}[flex-order-gt-lg="12"]{-ms-flex-order:12;order:12}[flex-order-gt-lg="13"]{-ms-flex-order:13;order:13}[flex-order-gt-lg="14"]{-ms-flex-order:14;order:14}[flex-order-gt-lg="15"]{-ms-flex-order:15;order:15}[flex-order-gt-lg="16"]{-ms-flex-order:16;order:16}[flex-order-gt-lg="17"]{-ms-flex-order:17;order:17}[flex-order-gt-lg="18"]{-ms-flex-order:18;order:18}[flex-order-gt-lg="19"]{-ms-flex-order:19;order:19}[flex-order-gt-lg="20"]{-ms-flex-order:20;order:20}[flex-gt-lg]{-ms-flex:1;flex:1}[flex-gt-lg-grow]{-ms-flex:1 1 100%;flex:1 1 100%;box-sizing:border-box}[flex-gt-lg-initial]{-ms-flex:0 1 auto;flex:0 1 auto;box-sizing:border-box}[flex-gt-lg-auto]{-ms-flex:1 1 auto;flex:1 1 auto;box-sizing:border-box}[flex-gt-lg-none]{-ms-flex:0 0 auto;flex:0 0 auto;box-sizing:border-box}[flex-gt-lg],[layout-gt-lg=row]>[flex-gt-lg],[layout=row]>[flex-gt-lg]{max-height:100%}[layout-gt-lg=column]>[flex-gt-lg],[layout=column]>[flex-gt-lg]{max-width:100%}[flex-gt-lg="5"],[layout-gt-lg=row]>[flex-gt-lg="5"],[layout=row]>[flex-gt-lg="5"]{-ms-flex:1 1 5%;flex:1 1 5%;max-width:5%}[layout-gt-lg=column]>[flex-gt-lg="5"],[layout=column]>[flex-gt-lg="5"]{-ms-flex:1 1 5%;flex:1 1 5%;max-height:5%}[flex-gt-lg="10"],[layout-gt-lg=row]>[flex-gt-lg="10"],[layout=row]>[flex-gt-lg="10"]{-ms-flex:1 1 10%;flex:1 1 10%;max-width:10%}[layout-gt-lg=column]>[flex-gt-lg="10"],[layout=column]>[flex-gt-lg="10"]{-ms-flex:1 1 10%;flex:1 1 10%;max-height:10%}[flex-gt-lg="15"],[layout-gt-lg=row]>[flex-gt-lg="15"],[layout=row]>[flex-gt-lg="15"]{-ms-flex:1 1 15%;flex:1 1 15%;max-width:15%}[layout-gt-lg=column]>[flex-gt-lg="15"],[layout=column]>[flex-gt-lg="15"]{-ms-flex:1 1 15%;flex:1 1 15%;max-height:15%}[flex-gt-lg="20"],[layout-gt-lg=row]>[flex-gt-lg="20"],[layout=row]>[flex-gt-lg="20"]{-ms-flex:1 1 20%;flex:1 1 20%;max-width:20%}[layout-gt-lg=column]>[flex-gt-lg="20"],[layout=column]>[flex-gt-lg="20"]{-ms-flex:1 1 20%;flex:1 1 20%;max-height:20%}[flex-gt-lg="25"],[layout-gt-lg=row]>[flex-gt-lg="25"],[layout=row]>[flex-gt-lg="25"]{-ms-flex:1 1 25%;flex:1 1 25%;max-width:25%}[layout-gt-lg=column]>[flex-gt-lg="25"],[layout=column]>[flex-gt-lg="25"]{-ms-flex:1 1 25%;flex:1 1 25%;max-height:25%}[flex-gt-lg="30"],[layout-gt-lg=row]>[flex-gt-lg="30"],[layout=row]>[flex-gt-lg="30"]{-ms-flex:1 1 30%;flex:1 1 30%;max-width:30%}[layout-gt-lg=column]>[flex-gt-lg="30"],[layout=column]>[flex-gt-lg="30"]{-ms-flex:1 1 30%;flex:1 1 30%;max-height:30%}[flex-gt-lg="35"],[layout-gt-lg=row]>[flex-gt-lg="35"],[layout=row]>[flex-gt-lg="35"]{-ms-flex:1 1 35%;flex:1 1 35%;max-width:35%}[layout-gt-lg=column]>[flex-gt-lg="35"],[layout=column]>[flex-gt-lg="35"]{-ms-flex:1 1 35%;flex:1 1 35%;max-height:35%}[flex-gt-lg="40"],[layout-gt-lg=row]>[flex-gt-lg="40"],[layout=row]>[flex-gt-lg="40"]{-ms-flex:1 1 40%;flex:1 1 40%;max-width:40%}[layout-gt-lg=column]>[flex-gt-lg="40"],[layout=column]>[flex-gt-lg="40"]{-ms-flex:1 1 40%;flex:1 1 40%;max-height:40%}[flex-gt-lg="45"],[layout-gt-lg=row]>[flex-gt-lg="45"],[layout=row]>[flex-gt-lg="45"]{-ms-flex:1 1 45%;flex:1 1 45%;max-width:45%}[layout-gt-lg=column]>[flex-gt-lg="45"],[layout=column]>[flex-gt-lg="45"]{-ms-flex:1 1 45%;flex:1 1 45%;max-height:45%}[flex-gt-lg="50"],[layout-gt-lg=row]>[flex-gt-lg="50"],[layout=row]>[flex-gt-lg="50"]{-ms-flex:1 1 50%;flex:1 1 50%;max-width:50%}[layout-gt-lg=column]>[flex-gt-lg="50"],[layout=column]>[flex-gt-lg="50"]{-ms-flex:1 1 50%;flex:1 1 50%;max-height:50%}[flex-gt-lg="55"],[layout-gt-lg=row]>[flex-gt-lg="55"],[layout=row]>[flex-gt-lg="55"]{-ms-flex:1 1 55%;flex:1 1 55%;max-width:55%}[layout-gt-lg=column]>[flex-gt-lg="55"],[layout=column]>[flex-gt-lg="55"]{-ms-flex:1 1 55%;flex:1 1 55%;max-height:55%}[flex-gt-lg="60"],[layout-gt-lg=row]>[flex-gt-lg="60"],[layout=row]>[flex-gt-lg="60"]{-ms-flex:1 1 60%;flex:1 1 60%;max-width:60%}[layout-gt-lg=column]>[flex-gt-lg="60"],[layout=column]>[flex-gt-lg="60"]{-ms-flex:1 1 60%;flex:1 1 60%;max-height:60%}[flex-gt-lg="65"],[layout-gt-lg=row]>[flex-gt-lg="65"],[layout=row]>[flex-gt-lg="65"]{-ms-flex:1 1 65%;flex:1 1 65%;max-width:65%}[layout-gt-lg=column]>[flex-gt-lg="65"],[layout=column]>[flex-gt-lg="65"]{-ms-flex:1 1 65%;flex:1 1 65%;max-height:65%}[flex-gt-lg="70"],[layout-gt-lg=row]>[flex-gt-lg="70"],[layout=row]>[flex-gt-lg="70"]{-ms-flex:1 1 70%;flex:1 1 70%;max-width:70%}[layout-gt-lg=column]>[flex-gt-lg="70"],[layout=column]>[flex-gt-lg="70"]{-ms-flex:1 1 70%;flex:1 1 70%;max-height:70%}[flex-gt-lg="75"],[layout-gt-lg=row]>[flex-gt-lg="75"],[layout=row]>[flex-gt-lg="75"]{-ms-flex:1 1 75%;flex:1 1 75%;max-width:75%}[layout-gt-lg=column]>[flex-gt-lg="75"],[layout=column]>[flex-gt-lg="75"]{-ms-flex:1 1 75%;flex:1 1 75%;max-height:75%}[flex-gt-lg="80"],[layout-gt-lg=row]>[flex-gt-lg="80"],[layout=row]>[flex-gt-lg="80"]{-ms-flex:1 1 80%;flex:1 1 80%;max-width:80%}[layout-gt-lg=column]>[flex-gt-lg="80"],[layout=column]>[flex-gt-lg="80"]{-ms-flex:1 1 80%;flex:1 1 80%;max-height:80%}[flex-gt-lg="85"],[layout-gt-lg=row]>[flex-gt-lg="85"],[layout=row]>[flex-gt-lg="85"]{-ms-flex:1 1 85%;flex:1 1 85%;max-width:85%}[layout-gt-lg=column]>[flex-gt-lg="85"],[layout=column]>[flex-gt-lg="85"]{-ms-flex:1 1 85%;flex:1 1 85%;max-height:85%}[flex-gt-lg="90"],[layout-gt-lg=row]>[flex-gt-lg="90"],[layout=row]>[flex-gt-lg="90"]{-ms-flex:1 1 90%;flex:1 1 90%;max-width:90%}[layout-gt-lg=column]>[flex-gt-lg="90"],[layout=column]>[flex-gt-lg="90"]{-ms-flex:1 1 90%;flex:1 1 90%;max-height:90%}[flex-gt-lg="95"],[layout-gt-lg=row]>[flex-gt-lg="95"],[layout=row]>[flex-gt-lg="95"]{-ms-flex:1 1 95%;flex:1 1 95%;max-width:95%}[layout-gt-lg=column]>[flex-gt-lg="95"],[layout=column]>[flex-gt-lg="95"]{-ms-flex:1 1 95%;flex:1 1 95%;max-height:95%}[flex-gt-lg="100"],[layout-gt-lg=row]>[flex-gt-lg="100"],[layout=row]>[flex-gt-lg="100"]{-ms-flex:1 1 100%;flex:1 1 100%;max-width:100%}[layout-gt-lg=column]>[flex-gt-lg="100"],[layout=column]>[flex-gt-lg="100"]{-ms-flex:1 1 100%;flex:1 1 100%;max-height:100%}[layout-gt-lg=row]>[flex-gt-lg="33"],[layout=row]>[flex-gt-lg="33"]{-ms-flex:1 1 33.33%;flex:1 1 33.33%;max-width:33.33%}[layout-gt-lg=row]>[flex-gt-lg="66"],[layout=row]>[flex-gt-lg="66"]{-ms-flex:1 1 66.66%;flex:1 1 66.66%;max-width:66.66%}[layout-gt-lg=column]>[flex-gt-lg="33"],[layout=column]>[flex-gt-lg="33"]{-ms-flex:1 1 33.33%;flex:1 1 33.33%;max-height:33.33%}[layout-gt-lg=column]>[flex-gt-lg="66"],[layout=column]>[flex-gt-lg="66"]{-ms-flex:1 1 66.66%;flex:1 1 66.66%;max-height:66.66%}[layout-gt-lg]{display:-ms-flexbox;display:flex}[layout-gt-lg=column]{-ms-flex-direction:column;flex-direction:column}[layout-gt-lg=row]{-ms-flex-direction:row;flex-direction:row}[hide-gt-lg]:not([show-gt-xs]):not([show-gt-sm]):not([show-gt-md]):not([show-gt-lg]):not([show]),[hide-gt-md]:not([show-gt-xs]):not([show-gt-sm]):not([show-gt-md]):not([show-gt-lg]):not([show]),[hide-gt-sm]:not([show-gt-xs]):not([show-gt-sm]):not([show-gt-md]):not([show-gt-lg]):not([show]),[hide-gt-xs]:not([show-gt-xs]):not([show-gt-sm]):not([show-gt-md]):not([show-gt-lg]):not([show]),[hide]:not([show-gt-xs]):not([show-gt-sm]):not([show-gt-md]):not([show-gt-lg]):not([show]){display:none}}.button.outline{display:inline-block;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;width:auto;margin-top:1em;border-radius:.1em;font-size:1em;cursor:pointer;line-height:1;text-transform:uppercase;transition:all .33s ease;font-family:Oswald,cursive;background-color:transparent;color:#fafafa;border:1px solid #fafafa}.button.outline:hover{background-color:#fafafa;color:#c65379}.button.reverse{display:inline-block;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;width:auto;margin-top:1em;border-radius:.1em;font-size:1em;cursor:pointer;line-height:1;text-transform:uppercase;transition:all .33s ease;font-family:Oswald,cursive;background-color:transparent;color:#c65379;border:1px solid #c65379}.button.reverse:hover{color:#fafafa;background-color:#c65379}nav{position:relative}nav .toggle-navigation{display:none}nav ul{list-style:none;margin:0;padding:0;display:block}@media screen and (min-width:960px){nav ul{display:-ms-flexbox;display:flex}}nav li{display:block}nav li a{display:inline-block;font-family:Oswald,cursive;text-transform:uppercase;margin:0 0 0 2em;margin-top:0!important;line-height:3em}nav li a,nav li a:hover{color:#050505}@media screen and (max-width:960px){nav{display:block;width:100%}nav li{border-top:1px solid rgba(5,5,5,.15);width:100%}nav li a{display:block;margin-left:0;line-height:2.5em;width:100%}}@media screen and (max-width:960px){nav ul{display:none}nav.active ul{display:block}nav .toggle-navigation{display:block;position:absolute;right:0;font-size:2.5em;top:-1.25em;cursor:pointer}}*{box-sizing:border-box}::-webkit-scrollbar{width:.5em}::-webkit-scrollbar-thumb{background:hsla(0,0%,98%,.5);border-radius:1em}::-webkit-scrollbar-track{background:rgba(5,5,5,.5);border-radius:1em}body,html{background-color:#fafafa;min-width:320px;font-family:Oswald,cursive;font-weight:300;font-size:16px;line-height:1.5em;color:#050505;margin:0;padding:0;height:100%;width:100%}table{margin:1em 0 2em;border-spacing:0;width:100%}table th,table thead{background:#ededed}table th{font-family:Oswald,cursive;font-weight:400;text-align:left;vertical-align:top}table tr td,table tr th{vertical-align:top;padding:.75em .75em .25em .5em;border-bottom:1px solid #e0e0e0}h1,h2,h3,h4,h5,h6{margin:0;margin:1em 0;line-height:1.25em;text-transform:none;font-family:Aguafina Script,cursive;font-weight:400}h1{color:#fafafa;font-size:2.5em;margin:0}h2{font-size:1.5em}h3,h3 a{font-size:1.15em}h3,h3 a,h4{color:#c65379}h4{font-size:1rem}hr{border:none;width:100%;height:.1rem;background-color:#858585}hr,p{margin:1em 0}p{padding:0;line-height:1.5em;word-wrap:break-word}p:first-child{margin-top:0}p:last-child{margin-bottom:0}a{position:relative;transition:all .33s ease;text-decoration:none;cursor:pointer;outline:0}a,a:hover{color:#66c653}a img{border:none;outline:none}a p,a span{cursor:pointer}img{max-width:100%;height:auto}ul{list-style:square}ol,ul{padding:0 0 0 1em;margin-bottom:0}ol{list-style-type:decimal}ol ol{list-style-type:lower-alpha}b,strong{font-weight:400;font-family:Oswald,cursive}fieldset{margin:0;padding:0;border:0}input[type=submit]{display:inline-block;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;width:auto;margin-top:1em;border-radius:.1em;font-size:1em;cursor:pointer;line-height:1;text-transform:uppercase;transition:all .33s ease;font-family:Oswald,cursive;background-color:transparent;color:#c65379;border:1px solid #c65379;margin:0}input[type=submit]:hover{color:#fafafa;background-color:#c65379}*{box-sizing:border-box;transition:opacity color height width .33s ease}header{padding:2em 0;background-color:#c65379;width:100%;border-bottom:.25em solid rgba(5,5,5,.2);padding-top:small;padding-bottom:small;padding-top:1em;padding-bottom:1em;color:#fafafa;font-size:2em}header>*{margin:0 auto}@media screen and (max-width:600px){header>*{padding-left:5%;padding-right:5%}}@media screen and (min-width:600px){header>*{width:594.66666667px}}@media screen and (min-width:960px){header>*{width:952px}}@media screen and (min-width:1200px){header>*{width:1184px}}header+section{padding:2em 0;background-color:#fafafa;width:100%;border-bottom:.25em solid rgba(5,5,5,.2);padding-top:small;padding-bottom:small;padding-top:1em;padding-bottom:1em}header+section>*{margin:0 auto}@media screen and (max-width:600px){header+section>*{padding-left:5%;padding-right:5%}}@media screen and (min-width:600px){header+section>*{width:594.66666667px}}@media screen and (min-width:960px){header+section>*{width:952px}}@media screen and (min-width:1200px){header+section>*{width:1184px}}section.breakpoints>*{padding:2em 0;background-color:#fafafa;width:100%;border-bottom:.25em solid rgba(5,5,5,.2);padding-top:small;padding-bottom:small;padding-top:1em;padding-bottom:1em}section.breakpoints>*>*{margin:0 auto}@media screen and (max-width:600px){section.breakpoints>*>*{padding-left:5%;padding-right:5%}}@media screen and (min-width:600px){section.breakpoints>*>*{width:594.66666667px}}@media screen and (min-width:960px){section.breakpoints>*>*{width:952px}}@media screen and (min-width:1200px){section.breakpoints>*>*{width:1184px}}breakpoint{display:block}.slider{margin:1em 0 3em}.content{padding:2em 0;background-color:#fafafa;width:100%;border-bottom:.25em solid rgba(5,5,5,.2);padding-top:large;padding-bottom:large;padding-top:4em;padding-bottom:4em}.content>*{margin:0 auto}@media screen and (max-width:600px){.content>*{padding-left:5%;padding-right:5%}}@media screen and (min-width:600px){.content>*{width:599.33333333px}}@media screen and (min-width:960px){.content>*{width:959px}}@media screen and (min-width:1200px){.content>*{width:1198px}}.content footer{margin-top:4em}.content.article article header{margin-bottom:4em}.content.article article>div h1,.content.article article>div h2,.content.article article>div h3,.content.article article>div h4{color:#66c653}.content.article article>div h1 span,.content.article article>div h2 span,.content.article article>div h3 span,.content.article article>div h4 span{display:block;font-family:Oswald,cursive}.content.article article>div h1 span:after,.content.article article>div h2 span:after,.content.article article>div h3 span:after,.content.article article>div h4 span:after{display:none}.content.article article>div ol,.content.article article>div ul{padding-left:1.5em}.content.article article>div ul{list-style:square}.content.article article>div ul.toc-indentation{list-style:square!important}.content.article article>div ol{list-style:decimal}.content.article article>div img:not(.inline-image){margin:1em 0;display:block;border-radius:.25em;box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24);transition:all .33s ease-in-out}.content.article article>div ol img:not(.inline-image),.content.article article>div ul img:not(.inline-image){margin:.75em 0 1.25em}.content.article article>div img{width:auto;display:block}.content.article article>div table img{width:auto;height:auto;margin:0}.content.article article>div img[align=center]{display:block;margin:0 auto}.content.article article>div img[align=left]{float:left;margin:5px 4em 4em 0;max-width:40%}.content.article article>div img[align=right]{float:right;margin:5px 0 4em 4em;max-width:40%}.content.article article>div img.emoticon{margin:0;display:inline-block}.content.article article>div p em{font-style:italic}.content.article article>div blockquote{margin:1em 0 1.8em;padding:0 0 0 2em;border-left:.1em solid #66c653}.content.article article>div blockquote p:first-child,.content.article article>div blockquote p:last-child{padding:0}.content.article article>div p>a.button{display:inline-block;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;width:auto;margin-top:1em;border-radius:.1em;font-size:1em;cursor:pointer;line-height:1;text-transform:uppercase;transition:all .33s ease;font-family:Oswald,cursive;background-color:transparent;color:#c65379;border:1px solid #c65379}.content.article article>div p>a.button:hover{color:#fafafa;background-color:#c65379}.content.article article>div ol.toc-indentation,.content.article article>div ul.toc-indentation{margin-left:2em!important}.content.article article>div .panel{padding:1em 1em 1em 1.5em;margin:0;background-color:#fafafa}.content.article article>div .panel.hs-cta-panel{margin:1.5em 0}.content.article article>div .panel.hs-cta-panel .panelContent{padding:.75em 2em}.content.article article>div .panel .panelContent{padding:2.5em}.content.article article>div .panel .panelContent p>strong:first-child{display:block;font-family:Oswald,cursive;font-weight:400;font-size:1.2em;line-height:1.8em;text-transform:uppercase;color:#66c653}.content.article article>div .panel .panelContent img[align=right]{width:25%}.content.article article>div .panel :after{content:"";display:table;clear:both}.content.article article>div .panel:not(.subtle) a{display:inline-block;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;width:auto;margin-top:1em;border-radius:.1em;font-size:1em;cursor:pointer;line-height:1;text-transform:uppercase;transition:all .33s ease;font-family:Oswald,cursive;background-color:#c65379;color:#050505}.content.article article>div .panel:not(.subtle) a:hover{box-sizing:border-box;animation-name:lsd-background;animation-duration:3s;animation-iteration-count:infinite;color:#050505}.content.article article>div .panel.code{padding:0 0 1em}.content.article article>div .panel.code pre{margin:0;font-size:.8em;line-height:1.2em;overflow:auto;padding:1em;border:1px solid rgba(5,5,5,.5);border-radius:.25em}.content.article article>div ol li .admonition,.content.article article>div ul li .admonition{margin-top:0}.content.article article>div .refresh-issues-bottom,.content.article article>div .refresh-macro{display:none}', ""]);
}, function(e, t) {
    "use strict";
    e.exports = function() {
        var e = [];
        return e.toString = function() {
            for (var e = [], t = 0; t < this.length; t++) {
                var l = this[t];
                l[2] ? e.push("@media " + l[2] + "{" + l[1] + "}") : e.push(l[1])
            }
            return e.join("")
        }, e.i = function(t, l) {
            "string" == typeof t && (t = [
                [null, t, ""]
            ]);
            for (var o = {}, r = 0; r < this.length; r++) {
                var n = this[r][0];
                "number" == typeof n && (o[n] = !0)
            }
            for (r = 0; r < t.length; r++) {
                var a = t[r];
                "number" == typeof a[0] && o[a[0]] || (l && !a[2] ? a[2] = l : l && (a[2] = "(" + a[2] + ") and (" + l + ")"), e.push(a))
            }
        }, e
    }
}, function(e, t, l) {
    t = e.exports = l(19)(), t.push([e.id, '/*! nouislider - 8.5.1 - 2016-04-24 16:00:30 */.noUi-target,.noUi-target *{-webkit-touch-callout:none;-webkit-user-select:none;-ms-touch-action:none;touch-action:none;-ms-user-select:none;-moz-user-select:none;user-select:none;box-sizing:border-box}.noUi-target{position:relative;direction:ltr}.noUi-base{width:100%;height:100%;position:relative;z-index:1}.noUi-origin{position:absolute;right:0;top:0;left:0;bottom:0}.noUi-handle{position:relative;z-index:1}.noUi-stacking .noUi-handle{z-index:10}.noUi-state-tap .noUi-origin{-webkit-transition:left .3s,top .3s;transition:left .3s,top .3s}.noUi-state-drag *{cursor:inherit!important}.noUi-base,.noUi-handle{-webkit-transform:translateZ(0);transform:translateZ(0)}.noUi-horizontal{height:18px}.noUi-horizontal .noUi-handle{width:34px;height:28px;left:-17px;top:-6px}.noUi-vertical{width:18px}.noUi-vertical .noUi-handle{width:28px;height:34px;left:-6px;top:-17px}.noUi-background{background:#fafafa;box-shadow:inset 0 1px 1px #f0f0f0}.noUi-connect{background:#3fb8af;box-shadow:inset 0 0 3px rgba(51,51,51,.45);-webkit-transition:background .45s;transition:background .45s}.noUi-origin{border-radius:2px}.noUi-target{border-radius:4px;border:1px solid #d3d3d3;box-shadow:inset 0 1px 1px #f0f0f0,0 3px 6px -5px #bbb}.noUi-target.noUi-connect{box-shadow:inset 0 0 3px rgba(51,51,51,.45),0 3px 6px -5px #bbb}.noUi-draggable{cursor:w-resize}.noUi-vertical .noUi-draggable{cursor:n-resize}.noUi-handle{border:1px solid #d9d9d9;border-radius:3px;background:#fff;cursor:default;box-shadow:inset 0 0 1px #fff,inset 0 1px 7px #ebebeb,0 3px 6px -3px #bbb}.noUi-active{box-shadow:inset 0 0 1px #fff,inset 0 1px 7px #ddd,0 3px 6px -3px #bbb}.noUi-handle:after,.noUi-handle:before{content:"";display:block;position:absolute;height:14px;width:1px;background:#e8e7e6;left:14px;top:6px}.noUi-handle:after{left:17px}.noUi-vertical .noUi-handle:after,.noUi-vertical .noUi-handle:before{width:14px;height:1px;left:6px;top:14px}.noUi-vertical .noUi-handle:after{top:17px}[disabled].noUi-connect,[disabled] .noUi-connect{background:#b8b8b8}[disabled] .noUi-handle,[disabled].noUi-origin{cursor:not-allowed}.noUi-pips,.noUi-pips *{box-sizing:border-box}.noUi-pips{position:absolute;color:#999}.noUi-value{position:absolute;text-align:center}.noUi-value-sub{color:#ccc;font-size:10px}.noUi-marker{position:absolute;background:#ccc}.noUi-marker-large,.noUi-marker-sub{background:#aaa}.noUi-pips-horizontal{padding:10px 0;height:80px;top:100%;left:0;width:100%}.noUi-value-horizontal{-webkit-transform:translate3d(-50%,50%,0);transform:translate3d(-50%,50%,0)}.noUi-marker-horizontal.noUi-marker{margin-left:-1px;width:2px;height:5px}.noUi-marker-horizontal.noUi-marker-sub{height:10px}.noUi-marker-horizontal.noUi-marker-large{height:15px}.noUi-pips-vertical{padding:0 10px;height:100%;top:0;left:100%}.noUi-value-vertical{-webkit-transform:translate3d(0,-50%,0);transform:translate3d(0,-50%,0);padding-left:25px}.noUi-marker-vertical.noUi-marker{width:5px;height:2px;margin-top:-1px}.noUi-marker-vertical.noUi-marker-sub{width:10px}.noUi-marker-vertical.noUi-marker-large{width:15px}.noUi-tooltip{display:block;position:absolute;border:1px solid #d9d9d9;border-radius:3px;background:#fff;padding:5px;text-align:center}.noUi-horizontal .noUi-handle-lower .noUi-tooltip{top:-32px}.noUi-horizontal .noUi-handle-upper .noUi-tooltip{bottom:-32px}.noUi-vertical .noUi-handle-lower .noUi-tooltip{left:120%}.noUi-vertical .noUi-handle-upper .noUi-tooltip{right:120%}', ""])
}, function(e, t, l) {
    function o(e, t) {
        for (var l = 0; l < e.length; l++) {
            var o = e[l],
                r = u[o.id];
            if (r) {
                r.refs++;
                for (var n = 0; n < r.parts.length; n++) r.parts[n](o.parts[n]);
                for (; n < o.parts.length; n++) r.parts.push(s(o.parts[n], t))
            } else {
                for (var a = [], n = 0; n < o.parts.length; n++) a.push(s(o.parts[n], t));
                u[o.id] = {
                    id: o.id,
                    refs: 1,
                    parts: a
                }
            }
        }
    }

    function r(e) {
        for (var t = [], l = {}, o = 0; o < e.length; o++) {
            var r = e[o],
                n = r[0],
                a = r[1],
                i = r[2],
                f = r[3],
                s = {
                    css: a,
                    media: i,
                    sourceMap: f
                };
            l[n] ? l[n].parts.push(s) : t.push(l[n] = {
                id: n,
                parts: [s]
            })
        }
        return t
    }

    function n(e, t) {
        var l = h(),
            o = w[w.length - 1];
        if ("top" === e.insertAt) o ? o.nextSibling ? l.insertBefore(t, o.nextSibling) : l.appendChild(t) : l.insertBefore(t, l.firstChild), w.push(t);
        else {
            if ("bottom" !== e.insertAt) throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
            l.appendChild(t)
        }
    }

    function a(e) {
        e.parentNode.removeChild(e);
        var t = w.indexOf(e);
        t >= 0 && w.splice(t, 1)
    }

    function i(e) {
        var t = document.createElement("style");
        return t.type = "text/css", n(e, t), t
    }

    function f(e) {
        var t = document.createElement("link");
        return t.rel = "stylesheet", n(e, t), t
    }

    function s(e, t) {
        var l, o, r;
        if (t.singleton) {
            var n = y++;
            l = p || (p = i(t)), o = m.bind(null, l, n, !1), r = m.bind(null, l, n, !0)
        } else e.sourceMap && "function" == typeof URL && "function" == typeof URL.createObjectURL && "function" == typeof URL.revokeObjectURL && "function" == typeof Blob && "function" == typeof btoa ? (l = f(t), o = d.bind(null, l), r = function() {
            a(l), l.href && URL.revokeObjectURL(l.href)
        }) : (l = i(t), o = x.bind(null, l), r = function() {
            a(l)
        });
        return o(e),
            function(t) {
                if (t) {
                    if (t.css === e.css && t.media === e.media && t.sourceMap === e.sourceMap) return;
                    o(e = t)
                } else r()
            }
    }

    function m(e, t, l, o) {
        var r = l ? "" : o.css;
        if (e.styleSheet) e.styleSheet.cssText = b(t, r);
        else {
            var n = document.createTextNode(r),
                a = e.childNodes;
            a[t] && e.removeChild(a[t]), a.length ? e.insertBefore(n, a[t]) : e.appendChild(n)
        }
    }

    function x(e, t) {
        var l = t.css,
            o = t.media;
        if (o && e.setAttribute("media", o), e.styleSheet) e.styleSheet.cssText = l;
        else {
            for (; e.firstChild;) e.removeChild(e.firstChild);
            e.appendChild(document.createTextNode(l))
        }
    }

    function d(e, t) {
        var l = t.css,
            o = t.sourceMap;
        o && (l += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(o)))) + " */");
        var r = new Blob([l], {
                type: "text/css"
            }),
            n = e.href;
        e.href = URL.createObjectURL(r), n && URL.revokeObjectURL(n)
    }
    var u = {},
        g = function(e) {
            var t;
            return function() {
                return "undefined" == typeof t && (t = e.apply(this, arguments)), t
            }
        },
        c = g(function() {
            return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase())
        }),
        h = g(function() {
            return document.head || document.getElementsByTagName("head")[0]
        }),
        p = null,
        y = 0,
        w = [];
    e.exports = function(e, t) {
        t = t || {}, "undefined" == typeof t.singleton && (t.singleton = c()), "undefined" == typeof t.insertAt && (t.insertAt = "bottom");
        var l = r(e);
        return o(l, t),
            function(e) {
                for (var n = [], a = 0; a < l.length; a++) {
                    var i = l[a],
                        f = u[i.id];
                    f.refs--, n.push(f)
                }
                if (e) {
                    var s = r(e);
                    o(s, t)
                }
                for (var a = 0; a < n.length; a++) {
                    var f = n[a];
                    if (0 === f.refs) {
                        for (var m = 0; m < f.parts.length; m++) f.parts[m]();
                        delete u[f.id]
                    }
                }
            }
    };
    var b = function() {
        var e = [];
        return function(t, l) {
            return e[t] = l, e.filter(Boolean).join("\n")
        }
    }()
}, function(e, t, l) {
    var o, r, n, a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
        return typeof e
    } : function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol ? "symbol" : typeof e
    }; /*! nouislider - 8.5.1 - 2016-04-24 16:00:29 */
    ! function(l) {
        r = [], o = l, n = "function" == typeof o ? o.apply(t, r) : o, !(void 0 !== n && (e.exports = n))
    }(function() {
        "use strict";

        function e(e) {
            return e.filter(function(e) {
                return this[e] ? !1 : this[e] = !0
            }, {})
        }

        function t(e, t) {
            return Math.round(e / t) * t
        }

        function l(e) {
            var t = e.getBoundingClientRect(),
                l = e.ownerDocument,
                o = l.documentElement,
                r = d();
            return /webkit.*Chrome.*Mobile/i.test(navigator.userAgent) && (r.x = 0), {
                top: t.top + r.y - o.clientTop,
                left: t.left + r.x - o.clientLeft
            }
        }

        function o(e) {
            return "number" == typeof e && !isNaN(e) && isFinite(e)
        }

        function r(e, t, l) {
            s(e, t), setTimeout(function() {
                m(e, t)
            }, l)
        }

        function n(e) {
            return Math.max(Math.min(e, 100), 0)
        }

        function i(e) {
            return Array.isArray(e) ? e : [e]
        }

        function f(e) {
            var t = e.split(".");
            return t.length > 1 ? t[1].length : 0
        }

        function s(e, t) {
            e.classList ? e.classList.add(t) : e.className += " " + t
        }

        function m(e, t) {
            e.classList ? e.classList.remove(t) : e.className = e.className.replace(new RegExp("(^|\\b)" + t.split(" ").join("|") + "(\\b|$)", "gi"), " ")
        }

        function x(e, t) {
            return e.classList ? e.classList.contains(t) : new RegExp("\\b" + t + "\\b").test(e.className)
        }

        function d() {
            var e = void 0 !== window.pageXOffset,
                t = "CSS1Compat" === (document.compatMode || ""),
                l = e ? window.pageXOffset : t ? document.documentElement.scrollLeft : document.body.scrollLeft,
                o = e ? window.pageYOffset : t ? document.documentElement.scrollTop : document.body.scrollTop;
            return {
                x: l,
                y: o
            }
        }

        function u() {
            return window.navigator.pointerEnabled ? {
                start: "pointerdown",
                move: "pointermove",
                end: "pointerup"
            } : window.navigator.msPointerEnabled ? {
                start: "MSPointerDown",
                move: "MSPointerMove",
                end: "MSPointerUp"
            } : {
                start: "mousedown touchstart",
                move: "mousemove touchmove",
                end: "mouseup touchend"
            }
        }

        function g(e, t) {
            return 100 / (t - e)
        }

        function c(e, t) {
            return 100 * t / (e[1] - e[0])
        }

        function h(e, t) {
            return c(e, e[0] < 0 ? t + Math.abs(e[0]) : t - e[0])
        }

        function p(e, t) {
            return t * (e[1] - e[0]) / 100 + e[0]
        }

        function y(e, t) {
            for (var l = 1; e >= t[l];) l += 1;
            return l
        }

        function w(e, t, l) {
            if (l >= e.slice(-1)[0]) return 100;
            var o, r, n, a, i = y(l, e);
            return o = e[i - 1], r = e[i], n = t[i - 1], a = t[i], n + h([o, r], l) / g(n, a)
        }

        function b(e, t, l) {
            if (l >= 100) return e.slice(-1)[0];
            var o, r, n, a, i = y(l, t);
            return o = e[i - 1], r = e[i], n = t[i - 1], a = t[i], p([o, r], (l - n) * g(n, a))
        }

        function v(e, l, o, r) {
            if (100 === r) return r;
            var n, a, i = y(r, e);
            return o ? (n = e[i - 1], a = e[i], r - n > (a - n) / 2 ? a : n) : l[i - 1] ? e[i - 1] + t(r - e[i - 1], l[i - 1]) : r
        }

        function k(e, t, l) {
            var r;
            if ("number" == typeof t && (t = [t]), "[object Array]" !== Object.prototype.toString.call(t)) throw new Error("noUiSlider: 'range' contains invalid value.");
            if (r = "min" === e ? 0 : "max" === e ? 100 : parseFloat(e), !o(r) || !o(t[0])) throw new Error("noUiSlider: 'range' value isn't numeric.");
            l.xPct.push(r), l.xVal.push(t[0]), r ? l.xSteps.push(isNaN(t[1]) ? !1 : t[1]) : isNaN(t[1]) || (l.xSteps[0] = t[1])
        }

        function S(e, t, l) {
            return t ? void(l.xSteps[e] = c([l.xVal[e], l.xVal[e + 1]], t) / g(l.xPct[e], l.xPct[e + 1])) : !0
        }

        function U(e, t, l, o) {
            this.xPct = [], this.xVal = [], this.xSteps = [o || !1], this.xNumSteps = [!1], this.snap = t, this.direction = l;
            var r, n = [];
            for (r in e) e.hasOwnProperty(r) && n.push([e[r], r]);
            for (n.length && "object" === a(n[0][0]) ? n.sort(function(e, t) {
                    return e[0][0] - t[0][0]
                }) : n.sort(function(e, t) {
                    return e[0] - t[0]
                }), r = 0; r < n.length; r++) k(n[r][1], n[r][0], this);
            for (this.xNumSteps = this.xSteps.slice(0), r = 0; r < this.xNumSteps.length; r++) S(r, this.xNumSteps[r], this)
        }

        function C(e, t) {
            if (!o(t)) throw new Error("noUiSlider: 'step' is not numeric.");
            e.singleStep = t
        }

        function E(e, t) {
            if ("object" !== ("undefined" == typeof t ? "undefined" : a(t)) || Array.isArray(t)) throw new Error("noUiSlider: 'range' is not an object.");
            if (void 0 === t.min || void 0 === t.max) throw new Error("noUiSlider: Missing 'min' or 'max' in 'range'.");
            if (t.min === t.max) throw new Error("noUiSlider: 'range' 'min' and 'max' cannot be equal.");
            e.spectrum = new U(t, e.snap, e.dir, e.singleStep)
        }

        function N(e, t) {
            if (t = i(t), !Array.isArray(t) || !t.length || t.length > 2) throw new Error("noUiSlider: 'start' option is incorrect.");
            e.handles = t.length, e.start = t
        }

        function z(e, t) {
            if (e.snap = t, "boolean" != typeof t) throw new Error("noUiSlider: 'snap' option must be a boolean.")
        }

        function L(e, t) {
            if (e.animate = t, "boolean" != typeof t) throw new Error("noUiSlider: 'animate' option must be a boolean.")
        }

        function O(e, t) {
            if (e.animationDuration = t, "number" != typeof t) throw new Error("noUiSlider: 'animationDuration' option must be a number.")
        }

        function M(e, t) {
            if ("lower" === t && 1 === e.handles) e.connect = 1;
            else if ("upper" === t && 1 === e.handles) e.connect = 2;
            else if (t === !0 && 2 === e.handles) e.connect = 3;
            else {
                if (t !== !1) throw new Error("noUiSlider: 'connect' option doesn't match handle count.");
                e.connect = 0
            }
        }

        function _(e, t) {
            switch (t) {
                case "horizontal":
                    e.ort = 0;
                    break;
                case "vertical":
                    e.ort = 1;
                    break;
                default:
                    throw new Error("noUiSlider: 'orientation' option is invalid.")
            }
        }

        function T(e, t) {
            if (!o(t)) throw new Error("noUiSlider: 'margin' option must be numeric.");
            if (0 !== t && (e.margin = e.spectrum.getMargin(t), !e.margin)) throw new Error("noUiSlider: 'margin' option is only supported on linear sliders.")
        }

        function j(e, t) {
            if (!o(t)) throw new Error("noUiSlider: 'limit' option must be numeric.");
            if (e.limit = e.spectrum.getMargin(t), !e.limit) throw new Error("noUiSlider: 'limit' option is only supported on linear sliders.")
        }

        function A(e, t) {
            switch (t) {
                case "ltr":
                    e.dir = 0;
                    break;
                case "rtl":
                    e.dir = 1, e.connect = [0, 2, 1, 3][e.connect];
                    break;
                default:
                    throw new Error("noUiSlider: 'direction' option was not recognized.")
            }
        }

        function P(e, t) {
            if ("string" != typeof t) throw new Error("noUiSlider: 'behaviour' must be a string containing options.");
            var l = t.indexOf("tap") >= 0,
                o = t.indexOf("drag") >= 0,
                r = t.indexOf("fixed") >= 0,
                n = t.indexOf("snap") >= 0,
                a = t.indexOf("hover") >= 0;
            if (o && !e.connect) throw new Error("noUiSlider: 'drag' behaviour must be used with 'connect': true.");
            e.events = {
                tap: l || n,
                drag: o,
                fixed: r,
                snap: n,
                hover: a
            }
        }

        function R(e, t) {
            var l;
            if (t !== !1)
                if (t === !0)
                    for (e.tooltips = [], l = 0; l < e.handles; l++) e.tooltips.push(!0);
                else {
                    if (e.tooltips = i(t), e.tooltips.length !== e.handles) throw new Error("noUiSlider: must pass a formatter for all handles.");
                    e.tooltips.forEach(function(e) {
                        if ("boolean" != typeof e && ("object" !== ("undefined" == typeof e ? "undefined" : a(e)) || "function" != typeof e.to)) throw new Error("noUiSlider: 'tooltips' must be passed a formatter or 'false'.")
                    })
                }
        }

        function H(e, t) {
            if (e.format = t, "function" == typeof t.to && "function" == typeof t.from) return !0;
            throw new Error("noUiSlider: 'format' requires 'to' and 'from' methods.")
        }

        function V(e, t) {
            if (void 0 !== t && "string" != typeof t && t !== !1) throw new Error("noUiSlider: 'cssPrefix' must be a string or `false`.");
            e.cssPrefix = t
        }

        function F(e, t) {
            if (void 0 !== t && "object" !== ("undefined" == typeof t ? "undefined" : a(t))) throw new Error("noUiSlider: 'cssClasses' must be an object.");
            if ("string" == typeof e.cssPrefix) {
                e.cssClasses = {};
                for (var l in t) t.hasOwnProperty(l) && (e.cssClasses[l] = e.cssPrefix + t[l])
            } else e.cssClasses = t
        }

        function I(e) {
            var t, l = {
                margin: 0,
                limit: 0,
                animate: !0,
                animationDuration: 300,
                format: B
            };
            t = {
                step: {
                    r: !1,
                    t: C
                },
                start: {
                    r: !0,
                    t: N
                },
                connect: {
                    r: !0,
                    t: M
                },
                direction: {
                    r: !0,
                    t: A
                },
                snap: {
                    r: !1,
                    t: z
                },
                animate: {
                    r: !1,
                    t: L
                },
                animationDuration: {
                    r: !1,
                    t: O
                },
                range: {
                    r: !0,
                    t: E
                },
                orientation: {
                    r: !1,
                    t: _
                },
                margin: {
                    r: !1,
                    t: T
                },
                limit: {
                    r: !1,
                    t: j
                },
                behaviour: {
                    r: !0,
                    t: P
                },
                format: {
                    r: !1,
                    t: H
                },
                tooltips: {
                    r: !1,
                    t: R
                },
                cssPrefix: {
                    r: !1,
                    t: V
                },
                cssClasses: {
                    r: !1,
                    t: F
                }
            };
            var o = {
                connect: !1,
                direction: "ltr",
                behaviour: "tap",
                orientation: "horizontal",
                cssPrefix: "noUi-",
                cssClasses: {
                    target: "target",
                    base: "base",
                    origin: "origin",
                    handle: "handle",
                    handleLower: "handle-lower",
                    handleUpper: "handle-upper",
                    horizontal: "horizontal",
                    vertical: "vertical",
                    background: "background",
                    connect: "connect",
                    ltr: "ltr",
                    rtl: "rtl",
                    draggable: "draggable",
                    drag: "state-drag",
                    tap: "state-tap",
                    active: "active",
                    stacking: "stacking",
                    tooltip: "tooltip",
                    pips: "pips",
                    pipsHorizontal: "pips-horizontal",
                    pipsVertical: "pips-vertical",
                    marker: "marker",
                    markerHorizontal: "marker-horizontal",
                    markerVertical: "marker-vertical",
                    markerNormal: "marker-normal",
                    markerLarge: "marker-large",
                    markerSub: "marker-sub",
                    value: "value",
                    valueHorizontal: "value-horizontal",
                    valueVertical: "value-vertical",
                    valueNormal: "value-normal",
                    valueLarge: "value-large",
                    valueSub: "value-sub"
                }
            };
            return Object.keys(t).forEach(function(r) {
                if (void 0 === e[r] && void 0 === o[r]) {
                    if (t[r].r) throw new Error("noUiSlider: '" + r + "' is required.");
                    return !0
                }
                t[r].t(l, void 0 === e[r] ? o[r] : e[r])
            }), l.pips = e.pips, l.style = l.ort ? "top" : "left", l
        }

        function $(t, o, a) {
            function g(e, t, l) {
                var o = e + t[0],
                    r = e + t[1];
                return l ? (0 > o && (r += Math.abs(o)), r > 100 && (o -= r - 100), [n(o), n(r)]) : [o, r]
            }

            function c(e, t) {
                e.preventDefault();
                var l, o, r = 0 === e.type.indexOf("touch"),
                    n = 0 === e.type.indexOf("mouse"),
                    a = 0 === e.type.indexOf("pointer"),
                    i = e;
                return 0 === e.type.indexOf("MSPointer") && (a = !0), r && (l = e.changedTouches[0].pageX, o = e.changedTouches[0].pageY), t = t || d(), (n || a) && (l = e.clientX + t.x, o = e.clientY + t.y), i.pageOffset = t, i.points = [l, o], i.cursor = n || a, i
            }

            function h(e, t) {
                var l = document.createElement("div"),
                    r = document.createElement("div"),
                    n = [o.cssClasses.handleLower, o.cssClasses.handleUpper];
                return e && n.reverse(), s(r, o.cssClasses.handle), s(r, n[t]), s(l, o.cssClasses.origin), l.appendChild(r), l
            }

            function p(e, t, l) {
                switch (e) {
                    case 1:
                        s(t, o.cssClasses.connect), s(l[0], o.cssClasses.background);
                        break;
                    case 3:
                        s(l[1], o.cssClasses.background);
                    case 2:
                        s(l[0], o.cssClasses.connect);
                    case 0:
                        s(t, o.cssClasses.background)
                }
            }

            function y(e, t, l) {
                var o, r = [];
                for (o = 0; e > o; o += 1) r.push(l.appendChild(h(t, o)));
                return r
            }

            function w(e, t, l) {
                s(l, o.cssClasses.target), 0 === e ? s(l, o.cssClasses.ltr) : s(l, o.cssClasses.rtl), 0 === t ? s(l, o.cssClasses.horizontal) : s(l, o.cssClasses.vertical);
                var r = document.createElement("div");
                return s(r, o.cssClasses.base), l.appendChild(r), r
            }

            function b(e, t) {
                if (!o.tooltips[t]) return !1;
                var l = document.createElement("div");
                return l.className = o.cssClasses.tooltip, e.firstChild.appendChild(l)
            }

            function v() {
                o.dir && o.tooltips.reverse();
                var e = X.map(b);
                o.dir && (e.reverse(), o.tooltips.reverse()), B("update", function(t, l, r) {
                    e[l] && (e[l].innerHTML = o.tooltips[l] === !0 ? t[l] : o.tooltips[l].to(r[l]))
                })
            }

            function k(e, t, l) {
                if ("range" === e || "steps" === e) return W.xVal;
                if ("count" === e) {
                    var o, r = 100 / (t - 1),
                        n = 0;
                    for (t = [];
                        (o = n++ * r) <= 100;) t.push(o);
                    e = "positions"
                }
                return "positions" === e ? t.map(function(e) {
                    return W.fromStepping(l ? W.getStep(e) : e)
                }) : "values" === e ? l ? t.map(function(e) {
                    return W.fromStepping(W.getStep(W.toStepping(e)))
                }) : t : void 0
            }

            function S(t, l, o) {
                function r(e, t) {
                    return (e + t).toFixed(7) / 1
                }
                var n = W.direction,
                    a = {},
                    i = W.xVal[0],
                    f = W.xVal[W.xVal.length - 1],
                    s = !1,
                    m = !1,
                    x = 0;
                return W.direction = 0, o = e(o.slice().sort(function(e, t) {
                    return e - t
                })), o[0] !== i && (o.unshift(i), s = !0), o[o.length - 1] !== f && (o.push(f), m = !0), o.forEach(function(e, n) {
                    var i, f, d, u, g, c, h, p, y, w, b = e,
                        v = o[n + 1];
                    if ("steps" === l && (i = W.xNumSteps[n]), i || (i = v - b), b !== !1 && void 0 !== v)
                        for (f = b; v >= f; f = r(f, i)) {
                            for (u = W.toStepping(f), g = u - x, p = g / t, y = Math.round(p), w = g / y, d = 1; y >= d; d += 1) c = x + d * w, a[c.toFixed(5)] = ["x", 0];
                            h = o.indexOf(f) > -1 ? 1 : "steps" === l ? 2 : 0, !n && s && (h = 0), f === v && m || (a[u.toFixed(5)] = [f, h]), x = u
                        }
                }), W.direction = n, a
            }

            function U(e, t, l) {
                function r(e, t) {
                    var l = t === o.cssClasses.value,
                        r = l ? d : u,
                        n = l ? m : x;
                    return t + " " + r[o.ort] + " " + n[e]
                }

                function n(e, t, l) {
                    return 'class="' + r(l[1], t) + '" style="' + o.style + ": " + e + '%"'
                }

                function a(e, r) {
                    W.direction && (e = 100 - e), r[1] = r[1] && t ? t(r[0], r[1]) : r[1], f += "<div " + n(e, o.cssClasses.marker, r) + "></div>", r[1] && (f += "<div " + n(e, o.cssClasses.value, r) + ">" + l.to(r[0]) + "</div>")
                }
                var i = document.createElement("div"),
                    f = "",
                    m = [o.cssClasses.valueNormal, o.cssClasses.valueLarge, o.cssClasses.valueSub],
                    x = [o.cssClasses.markerNormal, o.cssClasses.markerLarge, o.cssClasses.markerSub],
                    d = [o.cssClasses.valueHorizontal, o.cssClasses.valueVertical],
                    u = [o.cssClasses.markerHorizontal, o.cssClasses.markerVertical];
                return s(i, o.cssClasses.pips), s(i, 0 === o.ort ? o.cssClasses.pipsHorizontal : o.cssClasses.pipsVertical), Object.keys(e).forEach(function(t) {
                    a(t, e[t])
                }), i.innerHTML = f, i
            }

            function C(e) {
                var t = e.mode,
                    l = e.density || 1,
                    o = e.filter || !1,
                    r = e.values || !1,
                    n = e.stepped || !1,
                    a = k(t, r, n),
                    i = S(l, t, a),
                    f = e.format || {
                        to: Math.round
                    };
                return Q.appendChild(U(i, o, f))
            }

            function E() {
                var e = G.getBoundingClientRect(),
                    t = "offset" + ["Width", "Height"][o.ort];
                return 0 === o.ort ? e.width || G[t] : e.height || G[t]
            }

            function N(e, t, l) {
                var r;
                for (r = 0; r < o.handles; r++)
                    if (-1 === J[r]) return;
                void 0 !== t && 1 !== o.handles && (t = Math.abs(t - o.dir)), Object.keys(te).forEach(function(o) {
                    var r = o.split(".")[0];
                    e === r && te[o].forEach(function(e) {
                        e.call(Z, i(F()), t, i(z(Array.prototype.slice.call(ee))), l || !1, J)
                    })
                })
            }

            function z(e) {
                return 1 === e.length ? e[0] : o.dir ? e.reverse() : e
            }

            function L(e, t, l, r) {
                var n = function(t) {
                        return Q.hasAttribute("disabled") ? !1 : x(Q, o.cssClasses.tap) ? !1 : (t = c(t, r.pageOffset), e === Y.start && void 0 !== t.buttons && t.buttons > 1 ? !1 : r.hover && t.buttons ? !1 : (t.calcPoint = t.points[o.ort], void l(t, r)))
                    },
                    a = [];
                return e.split(" ").forEach(function(e) {
                    t.addEventListener(e, n, !1), a.push([e, n])
                }), a
            }

            function O(e, t) {
                if (-1 === navigator.appVersion.indexOf("MSIE 9") && 0 === e.buttons && 0 !== t.buttonsProperty) return M(e, t);
                var l, o, r = t.handles || X,
                    n = !1,
                    a = 100 * (e.calcPoint - t.start) / t.baseSize,
                    i = r[0] === X[0] ? 0 : 1;
                if (l = g(a, t.positions, r.length > 1), n = R(r[0], l[i], 1 === r.length), r.length > 1) {
                    if (n = R(r[1], l[i ? 0 : 1], !1) || n)
                        for (o = 0; o < t.handles.length; o++) N("slide", o)
                } else n && N("slide", i)
            }

            function M(e, t) {
                var l = G.querySelector("." + o.cssClasses.active),
                    r = t.handles[0] === X[0] ? 0 : 1;
                null !== l && m(l, o.cssClasses.active), e.cursor && (document.body.style.cursor = "", document.body.removeEventListener("selectstart", document.body.noUiListener));
                var n = document.documentElement;
                n.noUiListeners.forEach(function(e) {
                    n.removeEventListener(e[0], e[1])
                }), m(Q, o.cssClasses.drag), N("set", r), N("change", r), void 0 !== t.handleNumber && N("end", t.handleNumber)
            }

            function _(e, t) {
                "mouseout" === e.type && "HTML" === e.target.nodeName && null === e.relatedTarget && M(e, t)
            }

            function T(e, t) {
                var l = document.documentElement;
                if (1 === t.handles.length) {
                    if (t.handles[0].hasAttribute("disabled")) return !1;
                    s(t.handles[0].children[0], o.cssClasses.active)
                }
                e.preventDefault(), e.stopPropagation();
                var r = L(Y.move, l, O, {
                        start: e.calcPoint,
                        baseSize: E(),
                        pageOffset: e.pageOffset,
                        handles: t.handles,
                        handleNumber: t.handleNumber,
                        buttonsProperty: e.buttons,
                        positions: [J[0], J[X.length - 1]]
                    }),
                    n = L(Y.end, l, M, {
                        handles: t.handles,
                        handleNumber: t.handleNumber
                    }),
                    a = L("mouseout", l, _, {
                        handles: t.handles,
                        handleNumber: t.handleNumber
                    });
                if (l.noUiListeners = r.concat(n, a), e.cursor) {
                    document.body.style.cursor = getComputedStyle(e.target).cursor, X.length > 1 && s(Q, o.cssClasses.drag);
                    var i = function() {
                        return !1
                    };
                    document.body.noUiListener = i, document.body.addEventListener("selectstart", i, !1)
                }
                void 0 !== t.handleNumber && N("start", t.handleNumber)
            }

            function j(e) {
                var t, n, a = e.calcPoint,
                    i = 0;
                return e.stopPropagation(), X.forEach(function(e) {
                    i += l(e)[o.style]
                }), t = i / 2 > a || 1 === X.length ? 0 : 1, X[t].hasAttribute("disabled") && (t = t ? 0 : 1), a -= l(G)[o.style], n = 100 * a / E(), o.events.snap || r(Q, o.cssClasses.tap, o.animationDuration), X[t].hasAttribute("disabled") ? !1 : (R(X[t], n), N("slide", t, !0), N("set", t, !0), N("change", t, !0), void(o.events.snap && T(e, {
                    handles: [X[t]]
                })))
            }

            function A(e) {
                var t = e.calcPoint - l(G)[o.style],
                    r = W.getStep(100 * t / E()),
                    n = W.fromStepping(r);
                Object.keys(te).forEach(function(e) {
                    "hover" === e.split(".")[0] && te[e].forEach(function(e) {
                        e.call(Z, n)
                    })
                })
            }

            function P(e) {
                if (e.fixed || X.forEach(function(e, t) {
                        L(Y.start, e.children[0], T, {
                            handles: [e],
                            handleNumber: t
                        })
                    }), e.tap && L(Y.start, G, j, {
                        handles: X
                    }), e.hover && L(Y.move, G, A, {
                        hover: !0
                    }), e.drag) {
                    var t = [G.querySelector("." + o.cssClasses.connect)];
                    s(t[0], o.cssClasses.draggable), e.fixed && t.push(X[t[0] === X[0] ? 1 : 0].children[0]), t.forEach(function(e) {
                        L(Y.start, e, T, {
                            handles: X
                        })
                    })
                }
            }

            function R(e, t, l) {
                var r = e !== X[0] ? 1 : 0,
                    a = J[0] + o.margin,
                    i = J[1] - o.margin,
                    f = J[0] + o.limit,
                    x = J[1] - o.limit;
                return X.length > 1 && (t = r ? Math.max(t, a) : Math.min(t, i)), l !== !1 && o.limit && X.length > 1 && (t = r ? Math.min(t, f) : Math.max(t, x)), t = W.getStep(t), t = n(t), t === J[r] ? !1 : (window.requestAnimationFrame ? window.requestAnimationFrame(function() {
                    e.style[o.style] = t + "%"
                }) : e.style[o.style] = t + "%", e.previousSibling || (m(e, o.cssClasses.stacking), t > 50 && s(e, o.cssClasses.stacking)), J[r] = t, ee[r] = W.fromStepping(t), N("update", r), !0)
            }

            function H(e, t) {
                var l, r, n;
                for (o.limit && (e += 1), l = 0; e > l; l += 1) r = l % 2, n = t[r], null !== n && n !== !1 && ("number" == typeof n && (n = String(n)), n = o.format.from(n), (n === !1 || isNaN(n) || R(X[r], W.toStepping(n), l === 3 - o.dir) === !1) && N("update", r))
            }

            function V(e, t) {
                var l, n, a = i(e);
                for (t = void 0 === t ? !0 : !!t, o.dir && o.handles > 1 && a.reverse(), o.animate && -1 !== J[0] && r(Q, o.cssClasses.tap, o.animationDuration), l = X.length > 1 ? 3 : 1, 1 === a.length && (l = 1), H(l, a), n = 0; n < X.length; n++) null !== a[n] && t && N("set", n)
            }

            function F() {
                var e, t = [];
                for (e = 0; e < o.handles; e += 1) t[e] = o.format.to(ee[e]);
                return z(t)
            }

            function $() {
                for (var e in o.cssClasses) o.cssClasses.hasOwnProperty(e) && m(Q, o.cssClasses[e]);
                for (; Q.firstChild;) Q.removeChild(Q.firstChild);
                delete Q.noUiSlider
            }

            function D() {
                var e = J.map(function(e, t) {
                    var l = W.getApplicableStep(e),
                        o = f(String(l[2])),
                        r = ee[t],
                        n = 100 === e ? null : l[2],
                        a = Number((r - l[2]).toFixed(o)),
                        i = 0 === e ? null : a >= l[1] ? l[2] : l[0] || !1;
                    return [i, n]
                });
                return z(e)
            }

            function B(e, t) {
                te[e] = te[e] || [], te[e].push(t), "update" === e.split(".")[0] && X.forEach(function(e, t) {
                    N("update", t)
                })
            }

            function q(e) {
                var t = e && e.split(".")[0],
                    l = t && e.substring(t.length);
                Object.keys(te).forEach(function(e) {
                    var o = e.split(".")[0],
                        r = e.substring(o.length);
                    t && t !== o || l && l !== r || delete te[e]
                })
            }

            function K(e, t) {
                var l = F(),
                    r = I({
                        start: [0, 0],
                        margin: e.margin,
                        limit: e.limit,
                        step: void 0 === e.step ? o.singleStep : e.step,
                        range: e.range,
                        animate: e.animate,
                        snap: void 0 === e.snap ? o.snap : e.snap
                    });
                ["margin", "limit", "range", "animate"].forEach(function(t) {
                    void 0 !== e[t] && (o[t] = e[t])
                }), r.spectrum.direction = W.direction, W = r.spectrum, J = [-1, -1], V(e.start || l, t)
            }
            var G, X, Z, Y = u(),
                Q = t,
                J = [-1, -1],
                W = o.spectrum,
                ee = [],
                te = {};
            if (Q.noUiSlider) throw new Error("Slider was already initialized.");
            return G = w(o.dir, o.ort, Q), X = y(o.handles, o.dir, G), p(o.connect, Q, X), o.pips && C(o.pips), o.tooltips && v(), Z = {
                destroy: $,
                steps: D,
                on: B,
                off: q,
                get: F,
                set: V,
                updateOptions: K,
                options: a,
                target: Q,
                pips: C
            }, P(o.events), Z
        }

        function D(e, t) {
            if (!e.nodeName) throw new Error("noUiSlider.create requires a single element.");
            var l = I(t, e),
                o = $(e, l, t);
            return o.set(l.start), e.noUiSlider = o, o
        }
        U.prototype.getMargin = function(e) {
            return 2 === this.xPct.length ? c(this.xVal, e) : !1
        }, U.prototype.toStepping = function(e) {
            return e = w(this.xVal, this.xPct, e), this.direction && (e = 100 - e), e
        }, U.prototype.fromStepping = function(e) {
            return this.direction && (e = 100 - e), b(this.xVal, this.xPct, e)
        }, U.prototype.getStep = function(e) {
            return this.direction && (e = 100 - e), e = v(this.xPct, this.xSteps, this.snap, e), this.direction && (e = 100 - e), e
        }, U.prototype.getApplicableStep = function(e) {
            var t = y(e, this.xPct),
                l = 100 === e ? 2 : 1;
            return [this.xNumSteps[t - 2], this.xVal[t - l], this.xNumSteps[t - l]]
        }, U.prototype.convert = function(e) {
            return this.getStep(this.toStepping(e))
        };
        var B = {
            to: function(e) {
                return void 0 !== e && e.toFixed(2)
            },
            from: Number
        };
        return {
            create: D
        }
    })
}]);
