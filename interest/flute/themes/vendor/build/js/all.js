var firstloadcomplete = false;
function layoutSettings() {
    wW = window.innerWidth, wH = $(window).height(), $(".intro-header").height(wW >= 1024 || 640 >= wW ? wH : ""), 1024 > wW && $("[data-parallax-ratio]").css({
        transform: ""
    }), fixedHeaderThreshold = wW >= 1024 ? wH : $(".intro-header").height(), "admin-index" !== currentPage && "login" !== currentPage
}

function preloadImages(e) {
    function t() {
        n++, n === e.length && r(i)
    }
    for (var i = [], n = 0, r = function() {}, e = "object" != typeof e ? [e] : e, s = 0; s < e.length; s++) i[s] = new Image, i[s].src = e[s], i[s].onload = function() {
        t()
    }, i[s].onerror = function() {
        t()
    }, trIMG[s] = i[s];
    return {
        done: function(e) {
            r = e || r
        }
    }
}

function setupHeader() {
    scrollBlocked || (scrollTop >= fixedHeaderThreshold ? $(".page-container").addClass("sticky-header") : $(".page-container").removeClass("sticky-header"));
	if($(".page-container").hasClass("sticky-header"))
	{
		$(".sub-nav").addClass("select_sub");
	}
	else
	{
		$(".sub-nav").removeClass("select_sub");
	}
	
}

function setDarkenerOpacity() {
    if (!scrollBlocked && fixedHeaderThreshold >= scrollTop) {
        var e = scrollTop / fixedHeaderThreshold;
        TweenMax.to(".current-page .bg-darkener", 0, {
            opacity: .8 * e
        }), TweenMax.to(".current-page .intro-header-bg div", 0, {
            z: 100 * e,
            force3D: !0
        })
    }
}

function ReedParallax(e) {
    var t = this;
    t.DOMel = $(e), t.baseOffsetTop = t.DOMel.offset().top, t.parallaxRatio = t.DOMel.data("parallax-ratio"), t.directionRatio = "down" === t.DOMel.data("direction") ? -1 : 1, t.DOMheight = t.DOMel.outerHeight(), t.update = function(e) {
        if (wW >= 1024 && !scrollBlocked) {
            var i = Math.round((t.baseOffsetTop - e) * -(1 - t.parallaxRatio)) * t.directionRatio;
            TweenMax.to(t.DOMel, .8, {
                y: i,
                force3D: !0,
                ease: Quad.easeOut
            })
        }
    }
}

function initParallax() {
    $(".current-page [data-parallax-ratio]").each(function(e) {
        parallaxElements[e] = new ReedParallax($(this))
    })
}

function setupFooter() {
    scrollTop >= footerOffsetTop - wH / 3.5 ? $("#footer").addClass("sunny") : $("#footer").removeClass("sunny")
}

function initSlider() {
    $(".current-page .slider-bullets a").eq(0).addClass("current"), slider = $(".current-page .swiper-container").swiper({
        direction: "horizontal",
        speed: 700,
        autoResize: !0,
        simulateTouch: !1,
        loop: !0,
        resistanceRatio: 0,
        spaceBetween: 1024 > wW ? 25 : 50,
        prevButton: ".slider-arrow-previous",
        nextButton: ".slider-arrow-next",
        onSlideChangeStart: function(e) {
            $(".current-page .slider-bullets a").removeClass("current"), $(".current-page .slider-bullets a").eq(e.activeIndex - 1).addClass("current")
        },
        onSlideChangeEnd: function(e) {
            e.params.speed = 700
        }
    })
}

function changePage(e, t) {
	//alert("calling");
	$('.sub-nav').removeClass("select_sub");
    transitioning = !0, scrollBlocked = !0, $(".main-nav a").removeClass("current"), $('[data-goto="' + e + '"]').addClass("current"), $("body").addClass(scrollTop >= fixedHeaderThreshold ? "transitioning from-bottom" : "transitioning from-top"), $(".current-page").removeClass("current-page").addClass("old-page").css("top", "-" + scrollTop + "px");
    var i = $('<div class="page-container current-page appearing ' + e + '">');
    track(t), $("title").load(t + " title", "", function() {
        document.title = $(this).text()
    }), i.load(t + " .current-page>*", function() {
        $("#content").append(i), history.pushState(e, "", t), setupIntroTimeline(e, t), setTimeout(function() {
            currentPage = e, onDocumentReady(currentPage), onPageLoaded(currentPage)
        }, 1300)
    })
}

function setupIntroTimeline(e) {
    var t = $("#header .fade-out").sort(function() {
            return Math.round(Math.random()) - .5
        }),
        i = new TimelineMax({
            onComplete: function() {
                $(".old-page").remove(), transitioning = !1, scrollBlocked = !1, $("body").removeClass("transitioning from-top from-bottom"), $(".current-page").removeClass("appearing"), t.css("opacity", "")
            }
        });
    if (setTimeout(function() {
            $(".current-page .dash").addClass("long")
        }, 1600), "home" !== e && !(mobile && 640 >= wW)) {
        var n = new SplitText(".current-page .intro-header h2", {
                type: "words,chars"
            }),
            r = n.chars;
        i.staggerTo(r, .6, {
            opacity: 1,
            ease: Cubic.easeIn
        }, 1.1 / n.chars.length, .6), i.to(".current-page h1", 1, {
            opacity: 1,
            force3D: !0,
            ease: Quad.easeInOut
        }, 1.1)
    }
    i.to(".current-page .intro-header-bg div", 2.3, {
        z: 0,
        force3D: !0,
        ease: Quad.easeOut
    }, 0), i.to(".current-page .border.hor", 1.9, {
        scaleX: 1,
        force3D: !0,
        ease: Quart.easeInOut
    }, .4), i.to(".current-page .border.vert", 1.9, {
        scaleY: 1,
        force3D: !0,
        ease: Quart.easeInOut
    }, .4), i.to(".current-page .intro-header-scroll-btn", .7, {
        height: 60,
        opacity: 1,
        force3D: !0,
        ease: Quad.easeInOut
    }, 1.6), mobile && 640 >= wW || i.staggerTo(t, .5, {
        opacity: 1,
        force3D: !0,
        ease: Quad.easeIn
    }, .06, 1.8)
}

function CustomMarker(e, t, i) {
    this.latlng = e, this.args = i, this.setMap(t)
}

function initMap() {
    {
        var e = new google.maps.LatLng(50.832468, 4.3666),
            t = new google.maps.LatLng(50.8310542, 4.3706676),
            i = {
                center: t,
                zoom: 15,
                styles: mapStyles,
                panControl: !1,
                scrollwheel: !1,
                mapTypeControl: !1,
                scaleControl: !1,
                streetViewControl: !1,
                overviewMapControl: !1,
                zoomControlOptions: {
                    style: google.maps.ZoomControlStyle.SMALL
                }
            },
            n = new google.maps.Map(document.getElementById("map-container"), i);
        new CustomMarker(e, n, {})
    }
}

function setDefaultDate() {
    var e = new Date;
    $("#day").val(e.getDate()), $("#month").val(e.getMonth() + 1), $("#year").val(e.getFullYear())
}

function track(e) {
    //void 0 !== ga && (ga("send", "pageview", e), console.log(e + " tracked"))
}

function onDocumentReady(e) {
	//currentPage = e;
	//alert(e);
    switch (initParallax(), e) {
        case "home":
		    $( "div.FaceBookfeedHolder" ).html($( ".facebook_feed" ).html());
			initsubmenu();
			initScriller();
			checkAudio();
			remveBlanktag();
			//currentPage = "home";
			//$("script[src='//connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v2.4']").remove();
            break;
        case "cocktails":
			$( "div.FaceBookfeedHolder" ).html($( ".facebook_feed" ).html());
            initsubmenu();
			initSlider();
			initScriller();
			checkAudio();
			//currentPage = "cocktails";
			//$("script[src='//connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v2.4']").remove();
            break;
        case "burgers":
		    $( "div.FaceBookfeedHolder" ).html($( ".facebook_feed" ).html());
			initsubmenu();
            initSlider();
			console.log("media");
			initmediaScript();
			checkAudio();
			//currentPage = "burgers";
			//$("script[src='//connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v2.4']").remove();
            break;
        case "brunch":
			$( "div.FaceBookfeedHolder" ).html($( ".facebook_feed" ).html());
			initsubmenu();
            initSlider();
			checkAudio();
			remveBlanktag();
			//currentPage = "brunch";
			//$("script[src='//connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v2.4']").remove();
            break;
        case "contact":
		    //$('#fb-root').html("");
			//initFacebook();
			//currentPage = "contact";
			initsubmenu();
            setDefaultDate();
			checkAudio();
    }
}

function onPageLoaded(e) {
	//alert(e);
    switch (e) {
        case "contact":
            //initFacebook();
    }
}! function(e, t) {
    "object" == typeof module && "object" == typeof module.exports ? module.exports = e.document ? t(e, !0) : function(e) {
        if (!e.document) throw new Error("jQuery requires a window with a document");
        return t(e)
    } : t(e)
}("undefined" != typeof window ? window : this, function(e, t) {
    function i(e) {
        var t = e.length,
            i = J.type(e);
        return "function" === i || J.isWindow(e) ? !1 : 1 === e.nodeType && t ? !0 : "array" === i || 0 === t || "number" == typeof t && t > 0 && t - 1 in e
    }

    function n(e, t, i) {
        if (J.isFunction(t)) return J.grep(e, function(e, n) {
            return !!t.call(e, n, e) !== i
        });
        if (t.nodeType) return J.grep(e, function(e) {
            return e === t !== i
        });
        if ("string" == typeof t) {
            if (ot.test(t)) return J.filter(t, e, i);
            t = J.filter(t, e)
        }
        return J.grep(e, function(e) {
            return Y.call(t, e) >= 0 !== i
        })
    }

    function r(e, t) {
        for (;
            (e = e[t]) && 1 !== e.nodeType;);
        return e
    }

    function s(e) {
        var t = ft[e] = {};
        return J.each(e.match(dt) || [], function(e, i) {
            t[i] = !0
        }), t
    }

    function a() {
        K.removeEventListener("DOMContentLoaded", a, !1), e.removeEventListener("load", a, !1), J.ready()
    }

    function o() {
        Object.defineProperty(this.cache = {}, 0, {
            get: function() {
                return {}
            }
        }), this.expando = J.expando + Math.random()
    }

    function l(e, t, i) {
        var n;
        if (void 0 === i && 1 === e.nodeType)
            if (n = "data-" + t.replace(wt, "-$1").toLowerCase(), i = e.getAttribute(n), "string" == typeof i) {
                try {
                    i = "true" === i ? !0 : "false" === i ? !1 : "null" === i ? null : +i + "" === i ? +i : yt.test(i) ? J.parseJSON(i) : i
                } catch (r) {}
                _t.set(e, t, i)
            } else i = void 0;
        return i
    }

    function u() {
        return !0
    }

    function p() {
        return !1
    }

    function c() {
        try {
            return K.activeElement
        } catch (e) {}
    }

    function h(e, t) {
        return J.nodeName(e, "table") && J.nodeName(11 !== t.nodeType ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e
    }

    function d(e) {
        return e.type = (null !== e.getAttribute("type")) + "/" + e.type, e
    }

    function f(e) {
        var t = It.exec(e.type);
        return t ? e.type = t[1] : e.removeAttribute("type"), e
    }

    function m(e, t) {
        for (var i = 0, n = e.length; n > i; i++) vt.set(e[i], "globalEval", !t || vt.get(t[i], "globalEval"))
    }

    function g(e, t) {
        var i, n, r, s, a, o, l, u;
        if (1 === t.nodeType) {
            if (vt.hasData(e) && (s = vt.access(e), a = vt.set(t, s), u = s.events)) {
                delete a.handle, a.events = {};
                for (r in u)
                    for (i = 0, n = u[r].length; n > i; i++) J.event.add(t, r, u[r][i])
            }
            _t.hasData(e) && (o = _t.access(e), l = J.extend({}, o), _t.set(t, l))
        }
    }

    function v(e, t) {
        var i = e.getElementsByTagName ? e.getElementsByTagName(t || "*") : e.querySelectorAll ? e.querySelectorAll(t || "*") : [];
        return void 0 === t || t && J.nodeName(e, t) ? J.merge([e], i) : i
    }

    function _(e, t) {
        var i = t.nodeName.toLowerCase();
        "input" === i && St.test(e.type) ? t.checked = e.checked : ("input" === i || "textarea" === i) && (t.defaultValue = e.defaultValue)
    }

    function y(t, i) {
        var n, r = J(i.createElement(t)).appendTo(i.body),
            s = e.getDefaultComputedStyle && (n = e.getDefaultComputedStyle(r[0])) ? n.display : J.css(r[0], "display");
        return r.detach(), s
    }

    function w(e) {
        var t = K,
            i = Bt[e];
        return i || (i = y(e, t), "none" !== i && i || (Ft = (Ft || J("<iframe frameborder='0' width='0' height='0'/>")).appendTo(t.documentElement), t = Ft[0].contentDocument, t.write(), t.close(), i = y(e, t), Ft.detach()), Bt[e] = i), i
    }

    function x(e, t, i) {
        var n, r, s, a, o = e.style;
        return i = i || Xt(e), i && (a = i.getPropertyValue(t) || i[t]), i && ("" !== a || J.contains(e.ownerDocument, e) || (a = J.style(e, t)), $t.test(a) && Wt.test(t) && (n = o.width, r = o.minWidth, s = o.maxWidth, o.minWidth = o.maxWidth = o.width = a, a = i.width, o.width = n, o.minWidth = r, o.maxWidth = s)), void 0 !== a ? a + "" : a
    }

    function T(e, t) {
        return {
            get: function() {
                return e() ? void delete this.get : (this.get = t).apply(this, arguments)
            }
        }
    }

    function b(e, t) {
        if (t in e) return t;
        for (var i = t[0].toUpperCase() + t.slice(1), n = t, r = Ut.length; r--;)
            if (t = Ut[r] + i, t in e) return t;
        return n
    }

    function S(e, t, i) {
        var n = qt.exec(t);
        return n ? Math.max(0, n[1] - (i || 0)) + (n[2] || "px") : t
    }

    function C(e, t, i, n, r) {
        for (var s = i === (n ? "border" : "content") ? 4 : "width" === t ? 1 : 0, a = 0; 4 > s; s += 2) "margin" === i && (a += J.css(e, i + Tt[s], !0, r)), n ? ("content" === i && (a -= J.css(e, "padding" + Tt[s], !0, r)), "margin" !== i && (a -= J.css(e, "border" + Tt[s] + "Width", !0, r))) : (a += J.css(e, "padding" + Tt[s], !0, r), "padding" !== i && (a += J.css(e, "border" + Tt[s] + "Width", !0, r)));
        return a
    }

    function P(e, t, i) {
        var n = !0,
            r = "width" === t ? e.offsetWidth : e.offsetHeight,
            s = Xt(e),
            a = "border-box" === J.css(e, "boxSizing", !1, s);
        if (0 >= r || null == r) {
            if (r = x(e, t, s), (0 > r || null == r) && (r = e.style[t]), $t.test(r)) return r;
            n = a && (Q.boxSizingReliable() || r === e.style[t]), r = parseFloat(r) || 0
        }
        return r + C(e, t, i || (a ? "border" : "content"), n, s) + "px"
    }

    function k(e, t) {
        for (var i, n, r, s = [], a = 0, o = e.length; o > a; a++) n = e[a], n.style && (s[a] = vt.get(n, "olddisplay"), i = n.style.display, t ? (s[a] || "none" !== i || (n.style.display = ""), "" === n.style.display && bt(n) && (s[a] = vt.access(n, "olddisplay", w(n.nodeName)))) : (r = bt(n), "none" === i && r || vt.set(n, "olddisplay", r ? i : J.css(n, "display"))));
        for (a = 0; o > a; a++) n = e[a], n.style && (t && "none" !== n.style.display && "" !== n.style.display || (n.style.display = t ? s[a] || "" : "none"));
        return e
    }

    function M(e, t, i, n, r) {
        return new M.prototype.init(e, t, i, n, r)
    }

    function D() {
        return setTimeout(function() {
            Qt = void 0
        }), Qt = J.now()
    }

    function E(e, t) {
        var i, n = 0,
            r = {
                height: e
            };
        for (t = t ? 1 : 0; 4 > n; n += 2 - t) i = Tt[n], r["margin" + i] = r["padding" + i] = e;
        return t && (r.opacity = r.width = e), r
    }

    function A(e, t, i) {
        for (var n, r = (ii[t] || []).concat(ii["*"]), s = 0, a = r.length; a > s; s++)
            if (n = r[s].call(i, t, e)) return n
    }

    function O(e, t, i) {
        var n, r, s, a, o, l, u, p, c = this,
            h = {},
            d = e.style,
            f = e.nodeType && bt(e),
            m = vt.get(e, "fxshow");
        i.queue || (o = J._queueHooks(e, "fx"), null == o.unqueued && (o.unqueued = 0, l = o.empty.fire, o.empty.fire = function() {
            o.unqueued || l()
        }), o.unqueued++, c.always(function() {
            c.always(function() {
                o.unqueued--, J.queue(e, "fx").length || o.empty.fire()
            })
        })), 1 === e.nodeType && ("height" in t || "width" in t) && (i.overflow = [d.overflow, d.overflowX, d.overflowY], u = J.css(e, "display"), p = "none" === u ? vt.get(e, "olddisplay") || w(e.nodeName) : u, "inline" === p && "none" === J.css(e, "float") && (d.display = "inline-block")), i.overflow && (d.overflow = "hidden", c.always(function() {
            d.overflow = i.overflow[0], d.overflowX = i.overflow[1], d.overflowY = i.overflow[2]
        }));
        for (n in t)
            if (r = t[n], Zt.exec(r)) {
                if (delete t[n], s = s || "toggle" === r, r === (f ? "hide" : "show")) {
                    if ("show" !== r || !m || void 0 === m[n]) continue;
                    f = !0
                }
                h[n] = m && m[n] || J.style(e, n)
            } else u = void 0;
        if (J.isEmptyObject(h)) "inline" === ("none" === u ? w(e.nodeName) : u) && (d.display = u);
        else {
            m ? "hidden" in m && (f = m.hidden) : m = vt.access(e, "fxshow", {}), s && (m.hidden = !f), f ? J(e).show() : c.done(function() {
                J(e).hide()
            }), c.done(function() {
                var t;
                vt.remove(e, "fxshow");
                for (t in h) J.style(e, t, h[t])
            });
            for (n in h) a = A(f ? m[n] : 0, n, c), n in m || (m[n] = a.start, f && (a.end = a.start, a.start = "width" === n || "height" === n ? 1 : 0))
        }
    }

    function R(e, t) {
        var i, n, r, s, a;
        for (i in e)
            if (n = J.camelCase(i), r = t[n], s = e[i], J.isArray(s) && (r = s[1], s = e[i] = s[0]), i !== n && (e[n] = s, delete e[i]), a = J.cssHooks[n], a && "expand" in a) {
                s = a.expand(s), delete e[n];
                for (i in s) i in e || (e[i] = s[i], t[i] = r)
            } else t[n] = r
    }

    function L(e, t, i) {
        var n, r, s = 0,
            a = ti.length,
            o = J.Deferred().always(function() {
                delete l.elem
            }),
            l = function() {
                if (r) return !1;
                for (var t = Qt || D(), i = Math.max(0, u.startTime + u.duration - t), n = i / u.duration || 0, s = 1 - n, a = 0, l = u.tweens.length; l > a; a++) u.tweens[a].run(s);
                return o.notifyWith(e, [u, s, i]), 1 > s && l ? i : (o.resolveWith(e, [u]), !1)
            },
            u = o.promise({
                elem: e,
                props: J.extend({}, t),
                opts: J.extend(!0, {
                    specialEasing: {}
                }, i),
                originalProperties: t,
                originalOptions: i,
                startTime: Qt || D(),
                duration: i.duration,
                tweens: [],
                createTween: function(t, i) {
                    var n = J.Tween(e, u.opts, t, i, u.opts.specialEasing[t] || u.opts.easing);
                    return u.tweens.push(n), n
                },
                stop: function(t) {
                    var i = 0,
                        n = t ? u.tweens.length : 0;
                    if (r) return this;
                    for (r = !0; n > i; i++) u.tweens[i].run(1);
                    return t ? o.resolveWith(e, [u, t]) : o.rejectWith(e, [u, t]), this
                }
            }),
            p = u.props;
        for (R(p, u.opts.specialEasing); a > s; s++)
            if (n = ti[s].call(u, e, p, u.opts)) return n;
        return J.map(p, A, u), J.isFunction(u.opts.start) && u.opts.start.call(e, u), J.fx.timer(J.extend(l, {
            elem: e,
            anim: u,
            queue: u.opts.queue
        })), u.progress(u.opts.progress).done(u.opts.done, u.opts.complete).fail(u.opts.fail).always(u.opts.always)
    }

    function N(e) {
        return function(t, i) {
            "string" != typeof t && (i = t, t = "*");
            var n, r = 0,
                s = t.toLowerCase().match(dt) || [];
            if (J.isFunction(i))
                for (; n = s[r++];) "+" === n[0] ? (n = n.slice(1) || "*", (e[n] = e[n] || []).unshift(i)) : (e[n] = e[n] || []).push(i)
        }
    }

    function I(e, t, i, n) {
        function r(o) {
            var l;
            return s[o] = !0, J.each(e[o] || [], function(e, o) {
                var u = o(t, i, n);
                return "string" != typeof u || a || s[u] ? a ? !(l = u) : void 0 : (t.dataTypes.unshift(u), r(u), !1)
            }), l
        }
        var s = {},
            a = e === xi;
        return r(t.dataTypes[0]) || !s["*"] && r("*")
    }

    function z(e, t) {
        var i, n, r = J.ajaxSettings.flatOptions || {};
        for (i in t) void 0 !== t[i] && ((r[i] ? e : n || (n = {}))[i] = t[i]);
        return n && J.extend(!0, e, n), e
    }

    function j(e, t, i) {
        for (var n, r, s, a, o = e.contents, l = e.dataTypes;
            "*" === l[0];) l.shift(), void 0 === n && (n = e.mimeType || t.getResponseHeader("Content-Type"));
        if (n)
            for (r in o)
                if (o[r] && o[r].test(n)) {
                    l.unshift(r);
                    break
                }
        if (l[0] in i) s = l[0];
        else {
            for (r in i) {
                if (!l[0] || e.converters[r + " " + l[0]]) {
                    s = r;
                    break
                }
                a || (a = r)
            }
            s = s || a
        }
        return s ? (s !== l[0] && l.unshift(s), i[s]) : void 0
    }

    function F(e, t, i, n) {
        var r, s, a, o, l, u = {},
            p = e.dataTypes.slice();
        if (p[1])
            for (a in e.converters) u[a.toLowerCase()] = e.converters[a];
        for (s = p.shift(); s;)
            if (e.responseFields[s] && (i[e.responseFields[s]] = t), !l && n && e.dataFilter && (t = e.dataFilter(t, e.dataType)), l = s, s = p.shift())
                if ("*" === s) s = l;
                else if ("*" !== l && l !== s) {
            if (a = u[l + " " + s] || u["* " + s], !a)
                for (r in u)
                    if (o = r.split(" "), o[1] === s && (a = u[l + " " + o[0]] || u["* " + o[0]])) {
                        a === !0 ? a = u[r] : u[r] !== !0 && (s = o[0], p.unshift(o[1]));
                        break
                    }
            if (a !== !0)
                if (a && e["throws"]) t = a(t);
                else try {
                    t = a(t)
                } catch (c) {
                    return {
                        state: "parsererror",
                        error: a ? c : "No conversion from " + l + " to " + s
                    }
                }
        }
        return {
            state: "success",
            data: t
        }
    }

    function B(e, t, i, n) {
        var r;
        if (J.isArray(t)) J.each(t, function(t, r) {
            i || Ci.test(e) ? n(e, r) : B(e + "[" + ("object" == typeof r ? t : "") + "]", r, i, n)
        });
        else if (i || "object" !== J.type(t)) n(e, t);
        else
            for (r in t) B(e + "[" + r + "]", t[r], i, n)
    }

    function W(e) {
        return J.isWindow(e) ? e : 9 === e.nodeType && e.defaultView
    }
    var $ = [],
        X = $.slice,
        H = $.concat,
        q = $.push,
        Y = $.indexOf,
        G = {},
        V = G.toString,
        U = G.hasOwnProperty,
        Q = {},
        K = e.document,
        Z = "2.1.1",
        J = function(e, t) {
            return new J.fn.init(e, t)
        },
        et = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
        tt = /^-ms-/,
        it = /-([\da-z])/gi,
        nt = function(e, t) {
            return t.toUpperCase()
        };
    J.fn = J.prototype = {
        jquery: Z,
        constructor: J,
        selector: "",
        length: 0,
        toArray: function() {
            return X.call(this)
        },
        get: function(e) {
            return null != e ? 0 > e ? this[e + this.length] : this[e] : X.call(this)
        },
        pushStack: function(e) {
            var t = J.merge(this.constructor(), e);
            return t.prevObject = this, t.context = this.context, t
        },
        each: function(e, t) {
            return J.each(this, e, t)
        },
        map: function(e) {
            return this.pushStack(J.map(this, function(t, i) {
                return e.call(t, i, t)
            }))
        },
        slice: function() {
            return this.pushStack(X.apply(this, arguments))
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq(-1)
        },
        eq: function(e) {
            var t = this.length,
                i = +e + (0 > e ? t : 0);
            return this.pushStack(i >= 0 && t > i ? [this[i]] : [])
        },
        end: function() {
            return this.prevObject || this.constructor(null)
        },
        push: q,
        sort: $.sort,
        splice: $.splice
    }, J.extend = J.fn.extend = function() {
        var e, t, i, n, r, s, a = arguments[0] || {},
            o = 1,
            l = arguments.length,
            u = !1;
        for ("boolean" == typeof a && (u = a, a = arguments[o] || {}, o++), "object" == typeof a || J.isFunction(a) || (a = {}), o === l && (a = this, o--); l > o; o++)
            if (null != (e = arguments[o]))
                for (t in e) i = a[t], n = e[t], a !== n && (u && n && (J.isPlainObject(n) || (r = J.isArray(n))) ? (r ? (r = !1, s = i && J.isArray(i) ? i : []) : s = i && J.isPlainObject(i) ? i : {}, a[t] = J.extend(u, s, n)) : void 0 !== n && (a[t] = n));
        return a
    }, J.extend({
        expando: "jQuery" + (Z + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function(e) {
            throw new Error(e)
        },
        noop: function() {},
        isFunction: function(e) {
            return "function" === J.type(e)
        },
        isArray: Array.isArray,
        isWindow: function(e) {
            return null != e && e === e.window
        },
        isNumeric: function(e) {
            return !J.isArray(e) && e - parseFloat(e) >= 0
        },
        isPlainObject: function(e) {
            return "object" !== J.type(e) || e.nodeType || J.isWindow(e) ? !1 : e.constructor && !U.call(e.constructor.prototype, "isPrototypeOf") ? !1 : !0
        },
        isEmptyObject: function(e) {
            var t;
            for (t in e) return !1;
            return !0
        },
        type: function(e) {
            return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? G[V.call(e)] || "object" : typeof e
        },
        globalEval: function(e) {
            var t, i = eval;
            e = J.trim(e), e && (1 === e.indexOf("use strict") ? (t = K.createElement("script"), t.text = e, K.head.appendChild(t).parentNode.removeChild(t)) : i(e))
        },
        camelCase: function(e) {
            return e.replace(tt, "ms-").replace(it, nt)
        },
        nodeName: function(e, t) {
            return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
        },
        each: function(e, t, n) {
            var r, s = 0,
                a = e.length,
                o = i(e);
            if (n) {
                if (o)
                    for (; a > s && (r = t.apply(e[s], n), r !== !1); s++);
                else
                    for (s in e)
                        if (r = t.apply(e[s], n), r === !1) break
            } else if (o)
                for (; a > s && (r = t.call(e[s], s, e[s]), r !== !1); s++);
            else
                for (s in e)
                    if (r = t.call(e[s], s, e[s]), r === !1) break; return e
        },
        trim: function(e) {
            return null == e ? "" : (e + "").replace(et, "")
        },
        makeArray: function(e, t) {
            var n = t || [];
            return null != e && (i(Object(e)) ? J.merge(n, "string" == typeof e ? [e] : e) : q.call(n, e)), n
        },
        inArray: function(e, t, i) {
            return null == t ? -1 : Y.call(t, e, i)
        },
        merge: function(e, t) {
            for (var i = +t.length, n = 0, r = e.length; i > n; n++) e[r++] = t[n];
            return e.length = r, e
        },
        grep: function(e, t, i) {
            for (var n, r = [], s = 0, a = e.length, o = !i; a > s; s++) n = !t(e[s], s), n !== o && r.push(e[s]);
            return r
        },
        map: function(e, t, n) {
            var r, s = 0,
                a = e.length,
                o = i(e),
                l = [];
            if (o)
                for (; a > s; s++) r = t(e[s], s, n), null != r && l.push(r);
            else
                for (s in e) r = t(e[s], s, n), null != r && l.push(r);
            return H.apply([], l)
        },
        guid: 1,
        proxy: function(e, t) {
            var i, n, r;

            return "string" == typeof t && (i = e[t], t = e, e = i), J.isFunction(e) ? (n = X.call(arguments, 2), r = function() {
                return e.apply(t || this, n.concat(X.call(arguments)))
            }, r.guid = e.guid = e.guid || J.guid++, r) : void 0
        },
        now: Date.now,
        support: Q
    }), J.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(e, t) {
        G["[object " + t + "]"] = t.toLowerCase()
    });
    var rt = function(e) {
        function t(e, t, i, n) {
            var r, s, a, o, l, u, c, d, f, m;
            if ((t ? t.ownerDocument || t : B) !== O && A(t), t = t || O, i = i || [], !e || "string" != typeof e) return i;
            if (1 !== (o = t.nodeType) && 9 !== o) return [];
            if (L && !n) {
                if (r = _t.exec(e))
                    if (a = r[1]) {
                        if (9 === o) {
                            if (s = t.getElementById(a), !s || !s.parentNode) return i;
                            if (s.id === a) return i.push(s), i
                        } else if (t.ownerDocument && (s = t.ownerDocument.getElementById(a)) && j(t, s) && s.id === a) return i.push(s), i
                    } else {
                        if (r[2]) return J.apply(i, t.getElementsByTagName(e)), i;
                        if ((a = r[3]) && x.getElementsByClassName && t.getElementsByClassName) return J.apply(i, t.getElementsByClassName(a)), i
                    }
                if (x.qsa && (!N || !N.test(e))) {
                    if (d = c = F, f = t, m = 9 === o && e, 1 === o && "object" !== t.nodeName.toLowerCase()) {
                        for (u = C(e), (c = t.getAttribute("id")) ? d = c.replace(wt, "\\$&") : t.setAttribute("id", d), d = "[id='" + d + "'] ", l = u.length; l--;) u[l] = d + h(u[l]);
                        f = yt.test(e) && p(t.parentNode) || t, m = u.join(",")
                    }
                    if (m) try {
                        return J.apply(i, f.querySelectorAll(m)), i
                    } catch (g) {} finally {
                        c || t.removeAttribute("id")
                    }
                }
            }
            return k(e.replace(lt, "$1"), t, i, n)
        }

        function i() {
            function e(i, n) {
                return t.push(i + " ") > T.cacheLength && delete e[t.shift()], e[i + " "] = n
            }
            var t = [];
            return e
        }

        function n(e) {
            return e[F] = !0, e
        }

        function r(e) {
            var t = O.createElement("div");
            try {
                return !!e(t)
            } catch (i) {
                return !1
            } finally {
                t.parentNode && t.parentNode.removeChild(t), t = null
            }
        }

        function s(e, t) {
            for (var i = e.split("|"), n = e.length; n--;) T.attrHandle[i[n]] = t
        }

        function a(e, t) {
            var i = t && e,
                n = i && 1 === e.nodeType && 1 === t.nodeType && (~t.sourceIndex || V) - (~e.sourceIndex || V);
            if (n) return n;
            if (i)
                for (; i = i.nextSibling;)
                    if (i === t) return -1;
            return e ? 1 : -1
        }

        function o(e) {
            return function(t) {
                var i = t.nodeName.toLowerCase();
                return "input" === i && t.type === e
            }
        }

        function l(e) {
            return function(t) {
                var i = t.nodeName.toLowerCase();
                return ("input" === i || "button" === i) && t.type === e
            }
        }

        function u(e) {
            return n(function(t) {
                return t = +t, n(function(i, n) {
                    for (var r, s = e([], i.length, t), a = s.length; a--;) i[r = s[a]] && (i[r] = !(n[r] = i[r]))
                })
            })
        }

        function p(e) {
            return e && typeof e.getElementsByTagName !== G && e
        }

        function c() {}

        function h(e) {
            for (var t = 0, i = e.length, n = ""; i > t; t++) n += e[t].value;
            return n
        }

        function d(e, t, i) {
            var n = t.dir,
                r = i && "parentNode" === n,
                s = $++;
            return t.first ? function(t, i, s) {
                for (; t = t[n];)
                    if (1 === t.nodeType || r) return e(t, i, s)
            } : function(t, i, a) {
                var o, l, u = [W, s];
                if (a) {
                    for (; t = t[n];)
                        if ((1 === t.nodeType || r) && e(t, i, a)) return !0
                } else
                    for (; t = t[n];)
                        if (1 === t.nodeType || r) {
                            if (l = t[F] || (t[F] = {}), (o = l[n]) && o[0] === W && o[1] === s) return u[2] = o[2];
                            if (l[n] = u, u[2] = e(t, i, a)) return !0
                        }
            }
        }

        function f(e) {
            return e.length > 1 ? function(t, i, n) {
                for (var r = e.length; r--;)
                    if (!e[r](t, i, n)) return !1;
                return !0
            } : e[0]
        }

        function m(e, i, n) {
            for (var r = 0, s = i.length; s > r; r++) t(e, i[r], n);
            return n
        }

        function g(e, t, i, n, r) {
            for (var s, a = [], o = 0, l = e.length, u = null != t; l > o; o++)(s = e[o]) && (!i || i(s, n, r)) && (a.push(s), u && t.push(o));
            return a
        }

        function v(e, t, i, r, s, a) {
            return r && !r[F] && (r = v(r)), s && !s[F] && (s = v(s, a)), n(function(n, a, o, l) {
                var u, p, c, h = [],
                    d = [],
                    f = a.length,
                    v = n || m(t || "*", o.nodeType ? [o] : o, []),
                    _ = !e || !n && t ? v : g(v, h, e, o, l),
                    y = i ? s || (n ? e : f || r) ? [] : a : _;
                if (i && i(_, y, o, l), r)
                    for (u = g(y, d), r(u, [], o, l), p = u.length; p--;)(c = u[p]) && (y[d[p]] = !(_[d[p]] = c));
                if (n) {
                    if (s || e) {
                        if (s) {
                            for (u = [], p = y.length; p--;)(c = y[p]) && u.push(_[p] = c);
                            s(null, y = [], u, l)
                        }
                        for (p = y.length; p--;)(c = y[p]) && (u = s ? tt.call(n, c) : h[p]) > -1 && (n[u] = !(a[u] = c))
                    }
                } else y = g(y === a ? y.splice(f, y.length) : y), s ? s(null, a, y, l) : J.apply(a, y)
            })
        }

        function _(e) {
            for (var t, i, n, r = e.length, s = T.relative[e[0].type], a = s || T.relative[" "], o = s ? 1 : 0, l = d(function(e) {
                    return e === t
                }, a, !0), u = d(function(e) {
                    return tt.call(t, e) > -1
                }, a, !0), p = [function(e, i, n) {
                    return !s && (n || i !== M) || ((t = i).nodeType ? l(e, i, n) : u(e, i, n))
                }]; r > o; o++)
                if (i = T.relative[e[o].type]) p = [d(f(p), i)];
                else {
                    if (i = T.filter[e[o].type].apply(null, e[o].matches), i[F]) {
                        for (n = ++o; r > n && !T.relative[e[n].type]; n++);
                        return v(o > 1 && f(p), o > 1 && h(e.slice(0, o - 1).concat({
                            value: " " === e[o - 2].type ? "*" : ""
                        })).replace(lt, "$1"), i, n > o && _(e.slice(o, n)), r > n && _(e = e.slice(n)), r > n && h(e))
                    }
                    p.push(i)
                }
            return f(p)
        }

        function y(e, i) {
            var r = i.length > 0,
                s = e.length > 0,
                a = function(n, a, o, l, u) {
                    var p, c, h, d = 0,
                        f = "0",
                        m = n && [],
                        v = [],
                        _ = M,
                        y = n || s && T.find.TAG("*", u),
                        w = W += null == _ ? 1 : Math.random() || .1,
                        x = y.length;
                    for (u && (M = a !== O && a); f !== x && null != (p = y[f]); f++) {
                        if (s && p) {
                            for (c = 0; h = e[c++];)
                                if (h(p, a, o)) {
                                    l.push(p);
                                    break
                                }
                            u && (W = w)
                        }
                        r && ((p = !h && p) && d--, n && m.push(p))
                    }
                    if (d += f, r && f !== d) {
                        for (c = 0; h = i[c++];) h(m, v, a, o);
                        if (n) {
                            if (d > 0)
                                for (; f--;) m[f] || v[f] || (v[f] = K.call(l));
                            v = g(v)
                        }
                        J.apply(l, v), u && !n && v.length > 0 && d + i.length > 1 && t.uniqueSort(l)
                    }
                    return u && (W = w, M = _), m
                };
            return r ? n(a) : a
        }
        var w, x, T, b, S, C, P, k, M, D, E, A, O, R, L, N, I, z, j, F = "sizzle" + -new Date,
            B = e.document,
            W = 0,
            $ = 0,
            X = i(),
            H = i(),
            q = i(),
            Y = function(e, t) {
                return e === t && (E = !0), 0
            },
            G = "undefined",
            V = 1 << 31,
            U = {}.hasOwnProperty,
            Q = [],
            K = Q.pop,
            Z = Q.push,
            J = Q.push,
            et = Q.slice,
            tt = Q.indexOf || function(e) {
                for (var t = 0, i = this.length; i > t; t++)
                    if (this[t] === e) return t;
                return -1
            },
            it = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
            nt = "[\\x20\\t\\r\\n\\f]",
            rt = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
            st = rt.replace("w", "w#"),
            at = "\\[" + nt + "*(" + rt + ")(?:" + nt + "*([*^$|!~]?=)" + nt + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + st + "))|)" + nt + "*\\]",
            ot = ":(" + rt + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + at + ")*)|.*)\\)|)",
            lt = new RegExp("^" + nt + "+|((?:^|[^\\\\])(?:\\\\.)*)" + nt + "+$", "g"),
            ut = new RegExp("^" + nt + "*," + nt + "*"),
            pt = new RegExp("^" + nt + "*([>+~]|" + nt + ")" + nt + "*"),
            ct = new RegExp("=" + nt + "*([^\\]'\"]*?)" + nt + "*\\]", "g"),
            ht = new RegExp(ot),
            dt = new RegExp("^" + st + "$"),
            ft = {
                ID: new RegExp("^#(" + rt + ")"),
                CLASS: new RegExp("^\\.(" + rt + ")"),
                TAG: new RegExp("^(" + rt.replace("w", "w*") + ")"),
                ATTR: new RegExp("^" + at),
                PSEUDO: new RegExp("^" + ot),
                CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + nt + "*(even|odd|(([+-]|)(\\d*)n|)" + nt + "*(?:([+-]|)" + nt + "*(\\d+)|))" + nt + "*\\)|)", "i"),
                bool: new RegExp("^(?:" + it + ")$", "i"),
                needsContext: new RegExp("^" + nt + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + nt + "*((?:-\\d)?\\d*)" + nt + "*\\)|)(?=[^-]|$)", "i")
            },
            mt = /^(?:input|select|textarea|button)$/i,
            gt = /^h\d$/i,
            vt = /^[^{]+\{\s*\[native \w/,
            _t = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
            yt = /[+~]/,
            wt = /'|\\/g,

            xt = new RegExp("\\\\([\\da-f]{1,6}" + nt + "?|(" + nt + ")|.)", "ig"),
            Tt = function(e, t, i) {
                var n = "0x" + t - 65536;
                return n !== n || i ? t : 0 > n ? String.fromCharCode(n + 65536) : String.fromCharCode(n >> 10 | 55296, 1023 & n | 56320)
            };
        try {
            J.apply(Q = et.call(B.childNodes), B.childNodes), Q[B.childNodes.length].nodeType
        } catch (bt) {
            J = {
                apply: Q.length ? function(e, t) {
                    Z.apply(e, et.call(t))
                } : function(e, t) {
                    for (var i = e.length, n = 0; e[i++] = t[n++];);
                    e.length = i - 1
                }
            }
        }
        x = t.support = {}, S = t.isXML = function(e) {
            var t = e && (e.ownerDocument || e).documentElement;
            return t ? "HTML" !== t.nodeName : !1
        }, A = t.setDocument = function(e) {
            var t, i = e ? e.ownerDocument || e : B,
                n = i.defaultView;
            return i !== O && 9 === i.nodeType && i.documentElement ? (O = i, R = i.documentElement, L = !S(i), n && n !== n.top && (n.addEventListener ? n.addEventListener("unload", function() {
                A()
            }, !1) : n.attachEvent && n.attachEvent("onunload", function() {
                A()
            })), x.attributes = r(function(e) {
                return e.className = "i", !e.getAttribute("className")
            }), x.getElementsByTagName = r(function(e) {
                return e.appendChild(i.createComment("")), !e.getElementsByTagName("*").length
            }), x.getElementsByClassName = vt.test(i.getElementsByClassName) && r(function(e) {
                return e.innerHTML = "<div class='a'></div><div class='a i'></div>", e.firstChild.className = "i", 2 === e.getElementsByClassName("i").length
            }), x.getById = r(function(e) {
                return R.appendChild(e).id = F, !i.getElementsByName || !i.getElementsByName(F).length
            }), x.getById ? (T.find.ID = function(e, t) {
                if (typeof t.getElementById !== G && L) {
                    var i = t.getElementById(e);
                    return i && i.parentNode ? [i] : []
                }
            }, T.filter.ID = function(e) {
                var t = e.replace(xt, Tt);
                return function(e) {
                    return e.getAttribute("id") === t
                }
            }) : (delete T.find.ID, T.filter.ID = function(e) {
                var t = e.replace(xt, Tt);
                return function(e) {
                    var i = typeof e.getAttributeNode !== G && e.getAttributeNode("id");
                    return i && i.value === t
                }
            }), T.find.TAG = x.getElementsByTagName ? function(e, t) {
                return typeof t.getElementsByTagName !== G ? t.getElementsByTagName(e) : void 0
            } : function(e, t) {
                var i, n = [],
                    r = 0,
                    s = t.getElementsByTagName(e);
                if ("*" === e) {
                    for (; i = s[r++];) 1 === i.nodeType && n.push(i);
                    return n
                }
                return s
            }, T.find.CLASS = x.getElementsByClassName && function(e, t) {
                return typeof t.getElementsByClassName !== G && L ? t.getElementsByClassName(e) : void 0
            }, I = [], N = [], (x.qsa = vt.test(i.querySelectorAll)) && (r(function(e) {
                e.innerHTML = "<select msallowclip=''><option selected=''></option></select>", e.querySelectorAll("[msallowclip^='']").length && N.push("[*^$]=" + nt + "*(?:''|\"\")"), e.querySelectorAll("[selected]").length || N.push("\\[" + nt + "*(?:value|" + it + ")"), e.querySelectorAll(":checked").length || N.push(":checked")
            }), r(function(e) {
                var t = i.createElement("input");
                t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && N.push("name" + nt + "*[*^$|!~]?="), e.querySelectorAll(":enabled").length || N.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), N.push(",.*:")
            })), (x.matchesSelector = vt.test(z = R.matches || R.webkitMatchesSelector || R.mozMatchesSelector || R.oMatchesSelector || R.msMatchesSelector)) && r(function(e) {
                x.disconnectedMatch = z.call(e, "div"), z.call(e, "[s!='']:x"), I.push("!=", ot)
            }), N = N.length && new RegExp(N.join("|")), I = I.length && new RegExp(I.join("|")), t = vt.test(R.compareDocumentPosition), j = t || vt.test(R.contains) ? function(e, t) {
                var i = 9 === e.nodeType ? e.documentElement : e,
                    n = t && t.parentNode;
                return e === n || !(!n || 1 !== n.nodeType || !(i.contains ? i.contains(n) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(n)))
            } : function(e, t) {
                if (t)
                    for (; t = t.parentNode;)
                        if (t === e) return !0;
                return !1
            }, Y = t ? function(e, t) {
                if (e === t) return E = !0, 0;
                var n = !e.compareDocumentPosition - !t.compareDocumentPosition;
                return n ? n : (n = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1, 1 & n || !x.sortDetached && t.compareDocumentPosition(e) === n ? e === i || e.ownerDocument === B && j(B, e) ? -1 : t === i || t.ownerDocument === B && j(B, t) ? 1 : D ? tt.call(D, e) - tt.call(D, t) : 0 : 4 & n ? -1 : 1)
            } : function(e, t) {
                if (e === t) return E = !0, 0;
                var n, r = 0,
                    s = e.parentNode,
                    o = t.parentNode,
                    l = [e],
                    u = [t];
                if (!s || !o) return e === i ? -1 : t === i ? 1 : s ? -1 : o ? 1 : D ? tt.call(D, e) - tt.call(D, t) : 0;
                if (s === o) return a(e, t);
                for (n = e; n = n.parentNode;) l.unshift(n);
                for (n = t; n = n.parentNode;) u.unshift(n);
                for (; l[r] === u[r];) r++;
                return r ? a(l[r], u[r]) : l[r] === B ? -1 : u[r] === B ? 1 : 0
            }, i) : O
        }, t.matches = function(e, i) {
            return t(e, null, null, i)
        }, t.matchesSelector = function(e, i) {
            if ((e.ownerDocument || e) !== O && A(e), i = i.replace(ct, "='$1']"), !(!x.matchesSelector || !L || I && I.test(i) || N && N.test(i))) try {
                var n = z.call(e, i);
                if (n || x.disconnectedMatch || e.document && 11 !== e.document.nodeType) return n
            } catch (r) {}
            return t(i, O, null, [e]).length > 0
        }, t.contains = function(e, t) {
            return (e.ownerDocument || e) !== O && A(e), j(e, t)
        }, t.attr = function(e, t) {
            (e.ownerDocument || e) !== O && A(e);
            var i = T.attrHandle[t.toLowerCase()],
                n = i && U.call(T.attrHandle, t.toLowerCase()) ? i(e, t, !L) : void 0;
            return void 0 !== n ? n : x.attributes || !L ? e.getAttribute(t) : (n = e.getAttributeNode(t)) && n.specified ? n.value : null
        }, t.error = function(e) {
            throw new Error("Syntax error, unrecognized expression: " + e)
        }, t.uniqueSort = function(e) {
            var t, i = [],
                n = 0,
                r = 0;
            if (E = !x.detectDuplicates, D = !x.sortStable && e.slice(0), e.sort(Y), E) {
                for (; t = e[r++];) t === e[r] && (n = i.push(r));
                for (; n--;) e.splice(i[n], 1)
            }
            return D = null, e
        }, b = t.getText = function(e) {
            var t, i = "",
                n = 0,
                r = e.nodeType;
            if (r) {
                if (1 === r || 9 === r || 11 === r) {
                    if ("string" == typeof e.textContent) return e.textContent;
                    for (e = e.firstChild; e; e = e.nextSibling) i += b(e)
                } else if (3 === r || 4 === r) return e.nodeValue
            } else
                for (; t = e[n++];) i += b(t);
            return i
        }, T = t.selectors = {
            cacheLength: 50,
            createPseudo: n,
            match: ft,
            attrHandle: {},
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(e) {
                    return e[1] = e[1].replace(xt, Tt), e[3] = (e[3] || e[4] || e[5] || "").replace(xt, Tt), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
                },
                CHILD: function(e) {
                    return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || t.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && t.error(e[0]), e
                },
                PSEUDO: function(e) {
                    var t, i = !e[6] && e[2];
                    return ft.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : i && ht.test(i) && (t = C(i, !0)) && (t = i.indexOf(")", i.length - t) - i.length) && (e[0] = e[0].slice(0, t), e[2] = i.slice(0, t)), e.slice(0, 3))
                }
            },
            filter: {
                TAG: function(e) {
                    var t = e.replace(xt, Tt).toLowerCase();
                    return "*" === e ? function() {
                        return !0
                    } : function(e) {
                        return e.nodeName && e.nodeName.toLowerCase() === t
                    }
                },
                CLASS: function(e) {
                    var t = X[e + " "];
                    return t || (t = new RegExp("(^|" + nt + ")" + e + "(" + nt + "|$)")) && X(e, function(e) {
                        return t.test("string" == typeof e.className && e.className || typeof e.getAttribute !== G && e.getAttribute("class") || "")
                    })
                },
                ATTR: function(e, i, n) {
                    return function(r) {
                        var s = t.attr(r, e);
                        return null == s ? "!=" === i : i ? (s += "", "=" === i ? s === n : "!=" === i ? s !== n : "^=" === i ? n && 0 === s.indexOf(n) : "*=" === i ? n && s.indexOf(n) > -1 : "$=" === i ? n && s.slice(-n.length) === n : "~=" === i ? (" " + s + " ").indexOf(n) > -1 : "|=" === i ? s === n || s.slice(0, n.length + 1) === n + "-" : !1) : !0
                    }
                },
                CHILD: function(e, t, i, n, r) {
                    var s = "nth" !== e.slice(0, 3),
                        a = "last" !== e.slice(-4),
                        o = "of-type" === t;
                    return 1 === n && 0 === r ? function(e) {
                        return !!e.parentNode
                    } : function(t, i, l) {
                        var u, p, c, h, d, f, m = s !== a ? "nextSibling" : "previousSibling",
                            g = t.parentNode,
                            v = o && t.nodeName.toLowerCase(),
                            _ = !l && !o;
                        if (g) {
                            if (s) {
                                for (; m;) {
                                    for (c = t; c = c[m];)
                                        if (o ? c.nodeName.toLowerCase() === v : 1 === c.nodeType) return !1;
                                    f = m = "only" === e && !f && "nextSibling"
                                }
                                return !0
                            }
                            if (f = [a ? g.firstChild : g.lastChild], a && _) {
                                for (p = g[F] || (g[F] = {}), u = p[e] || [], d = u[0] === W && u[1], h = u[0] === W && u[2], c = d && g.childNodes[d]; c = ++d && c && c[m] || (h = d = 0) || f.pop();)
                                    if (1 === c.nodeType && ++h && c === t) {
                                        p[e] = [W, d, h];
                                        break
                                    }
                            } else if (_ && (u = (t[F] || (t[F] = {}))[e]) && u[0] === W) h = u[1];
                            else
                                for (;
                                    (c = ++d && c && c[m] || (h = d = 0) || f.pop()) && ((o ? c.nodeName.toLowerCase() !== v : 1 !== c.nodeType) || !++h || (_ && ((c[F] || (c[F] = {}))[e] = [W, h]), c !== t)););
                            return h -= r, h === n || h % n === 0 && h / n >= 0
                        }
                    }
                },
                PSEUDO: function(e, i) {
                    var r, s = T.pseudos[e] || T.setFilters[e.toLowerCase()] || t.error("unsupported pseudo: " + e);
                    return s[F] ? s(i) : s.length > 1 ? (r = [e, e, "", i], T.setFilters.hasOwnProperty(e.toLowerCase()) ? n(function(e, t) {
                        for (var n, r = s(e, i), a = r.length; a--;) n = tt.call(e, r[a]), e[n] = !(t[n] = r[a])
                    }) : function(e) {
                        return s(e, 0, r)
                    }) : s
                }
            },
            pseudos: {
                not: n(function(e) {
                    var t = [],
                        i = [],
                        r = P(e.replace(lt, "$1"));
                    return r[F] ? n(function(e, t, i, n) {
                        for (var s, a = r(e, null, n, []), o = e.length; o--;)(s = a[o]) && (e[o] = !(t[o] = s))
                    }) : function(e, n, s) {
                        return t[0] = e, r(t, null, s, i), !i.pop()
                    }
                }),
                has: n(function(e) {
                    return function(i) {
                        return t(e, i).length > 0
                    }
                }),
                contains: n(function(e) {
                    return function(t) {
                        return (t.textContent || t.innerText || b(t)).indexOf(e) > -1
                    }
                }),
                lang: n(function(e) {
                    return dt.test(e || "") || t.error("unsupported lang: " + e), e = e.replace(xt, Tt).toLowerCase(),
                        function(t) {
                            var i;
                            do
                                if (i = L ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang")) return i = i.toLowerCase(), i === e || 0 === i.indexOf(e + "-");
                            while ((t = t.parentNode) && 1 === t.nodeType);
                            return !1
                        }
                }),
                target: function(t) {
                    var i = e.location && e.location.hash;
                    return i && i.slice(1) === t.id
                },
                root: function(e) {
                    return e === R
                },
                focus: function(e) {
                    return e === O.activeElement && (!O.hasFocus || O.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                },
                enabled: function(e) {
                    return e.disabled === !1
                },
                disabled: function(e) {
                    return e.disabled === !0
                },
                checked: function(e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && !!e.checked || "option" === t && !!e.selected
                },
                selected: function(e) {
                    return e.parentNode && e.parentNode.selectedIndex, e.selected === !0
                },
                empty: function(e) {
                    for (e = e.firstChild; e; e = e.nextSibling)
                        if (e.nodeType < 6) return !1;
                    return !0
                },
                parent: function(e) {
                    return !T.pseudos.empty(e)
                },
                header: function(e) {
                    return gt.test(e.nodeName)
                },
                input: function(e) {
                    return mt.test(e.nodeName)
                },
                button: function(e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && "button" === e.type || "button" === t
                },
                text: function(e) {
                    var t;
                    return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase())
                },
                first: u(function() {
                    return [0]
                }),
                last: u(function(e, t) {
                    return [t - 1]
                }),
                eq: u(function(e, t, i) {
                    return [0 > i ? i + t : i]
                }),
                even: u(function(e, t) {
                    for (var i = 0; t > i; i += 2) e.push(i);
                    return e
                }),
                odd: u(function(e, t) {
                    for (var i = 1; t > i; i += 2) e.push(i);
                    return e
                }),
                lt: u(function(e, t, i) {
                    for (var n = 0 > i ? i + t : i; --n >= 0;) e.push(n);
                    return e
                }),
                gt: u(function(e, t, i) {
                    for (var n = 0 > i ? i + t : i; ++n < t;) e.push(n);
                    return e
                })
            }
        }, T.pseudos.nth = T.pseudos.eq;
        for (w in {
                radio: !0,
                checkbox: !0,
                file: !0,
                password: !0,
                image: !0
            }) T.pseudos[w] = o(w);
        for (w in {
                submit: !0,
                reset: !0
            }) T.pseudos[w] = l(w);
        return c.prototype = T.filters = T.pseudos, T.setFilters = new c, C = t.tokenize = function(e, i) {
            var n, r, s, a, o, l, u, p = H[e + " "];
            if (p) return i ? 0 : p.slice(0);
            for (o = e, l = [], u = T.preFilter; o;) {
                (!n || (r = ut.exec(o))) && (r && (o = o.slice(r[0].length) || o), l.push(s = [])), n = !1, (r = pt.exec(o)) && (n = r.shift(), s.push({
                    value: n,
                    type: r[0].replace(lt, " ")
                }), o = o.slice(n.length));
                for (a in T.filter) !(r = ft[a].exec(o)) || u[a] && !(r = u[a](r)) || (n = r.shift(), s.push({
                    value: n,
                    type: a,
                    matches: r
                }), o = o.slice(n.length));
                if (!n) break
            }
            return i ? o.length : o ? t.error(e) : H(e, l).slice(0)
        }, P = t.compile = function(e, t) {
            var i, n = [],
                r = [],
                s = q[e + " "];
            if (!s) {
                for (t || (t = C(e)), i = t.length; i--;) s = _(t[i]), s[F] ? n.push(s) : r.push(s);
                s = q(e, y(r, n)), s.selector = e
            }
            return s
        }, k = t.select = function(e, t, i, n) {
            var r, s, a, o, l, u = "function" == typeof e && e,
                c = !n && C(e = u.selector || e);
            if (i = i || [], 1 === c.length) {
                if (s = c[0] = c[0].slice(0), s.length > 2 && "ID" === (a = s[0]).type && x.getById && 9 === t.nodeType && L && T.relative[s[1].type]) {
                    if (t = (T.find.ID(a.matches[0].replace(xt, Tt), t) || [])[0], !t) return i;
                    u && (t = t.parentNode), e = e.slice(s.shift().value.length)
                }
                for (r = ft.needsContext.test(e) ? 0 : s.length; r-- && (a = s[r], !T.relative[o = a.type]);)
                    if ((l = T.find[o]) && (n = l(a.matches[0].replace(xt, Tt), yt.test(s[0].type) && p(t.parentNode) || t))) {
                        if (s.splice(r, 1), e = n.length && h(s), !e) return J.apply(i, n), i;
                        break
                    }
            }
            return (u || P(e, c))(n, t, !L, i, yt.test(e) && p(t.parentNode) || t), i
        }, x.sortStable = F.split("").sort(Y).join("") === F, x.detectDuplicates = !!E, A(), x.sortDetached = r(function(e) {
            return 1 & e.compareDocumentPosition(O.createElement("div"))
        }), r(function(e) {
            return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href")
        }) || s("type|href|height|width", function(e, t, i) {
            return i ? void 0 : e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
        }), x.attributes && r(function(e) {
            return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value")
        }) || s("value", function(e, t, i) {
            return i || "input" !== e.nodeName.toLowerCase() ? void 0 : e.defaultValue
        }), r(function(e) {
            return null == e.getAttribute("disabled")
        }) || s(it, function(e, t, i) {
            var n;
            return i ? void 0 : e[t] === !0 ? t.toLowerCase() : (n = e.getAttributeNode(t)) && n.specified ? n.value : null
        }), t
    }(e);
    J.find = rt, J.expr = rt.selectors, J.expr[":"] = J.expr.pseudos, J.unique = rt.uniqueSort, J.text = rt.getText, J.isXMLDoc = rt.isXML, J.contains = rt.contains;
    var st = J.expr.match.needsContext,
        at = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
        ot = /^.[^:#\[\.,]*$/;
    J.filter = function(e, t, i) {
        var n = t[0];
        return i && (e = ":not(" + e + ")"), 1 === t.length && 1 === n.nodeType ? J.find.matchesSelector(n, e) ? [n] : [] : J.find.matches(e, J.grep(t, function(e) {
            return 1 === e.nodeType
        }))
    }, J.fn.extend({
        find: function(e) {
            var t, i = this.length,
                n = [],
                r = this;
            if ("string" != typeof e) return this.pushStack(J(e).filter(function() {
                for (t = 0; i > t; t++)
                    if (J.contains(r[t], this)) return !0
            }));
            for (t = 0; i > t; t++) J.find(e, r[t], n);
            return n = this.pushStack(i > 1 ? J.unique(n) : n), n.selector = this.selector ? this.selector + " " + e : e, n
        },
        filter: function(e) {
            return this.pushStack(n(this, e || [], !1))
        },
        not: function(e) {
            return this.pushStack(n(this, e || [], !0))
        },
        is: function(e) {
            return !!n(this, "string" == typeof e && st.test(e) ? J(e) : e || [], !1).length
        }
    });
    var lt, ut = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
        pt = J.fn.init = function(e, t) {
            var i, n;
            if (!e) return this;
            if ("string" == typeof e) {
                if (i = "<" === e[0] && ">" === e[e.length - 1] && e.length >= 3 ? [null, e, null] : ut.exec(e), !i || !i[1] && t) return !t || t.jquery ? (t || lt).find(e) : this.constructor(t).find(e);
                if (i[1]) {
                    if (t = t instanceof J ? t[0] : t, J.merge(this, J.parseHTML(i[1], t && t.nodeType ? t.ownerDocument || t : K, !0)), at.test(i[1]) && J.isPlainObject(t))
                        for (i in t) J.isFunction(this[i]) ? this[i](t[i]) : this.attr(i, t[i]);
                    return this
                }
                return n = K.getElementById(i[2]), n && n.parentNode && (this.length = 1, this[0] = n), this.context = K, this.selector = e, this
            }
            return e.nodeType ? (this.context = this[0] = e, this.length = 1, this) : J.isFunction(e) ? "undefined" != typeof lt.ready ? lt.ready(e) : e(J) : (void 0 !== e.selector && (this.selector = e.selector, this.context = e.context), J.makeArray(e, this))
        };
    pt.prototype = J.fn, lt = J(K);
    var ct = /^(?:parents|prev(?:Until|All))/,
        ht = {
            children: !0,
            contents: !0,
            next: !0,
            prev: !0
        };
    J.extend({
        dir: function(e, t, i) {
            for (var n = [], r = void 0 !== i;
                (e = e[t]) && 9 !== e.nodeType;)
                if (1 === e.nodeType) {
                    if (r && J(e).is(i)) break;
                    n.push(e)
                }
            return n
        },
        sibling: function(e, t) {
            for (var i = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && i.push(e);
            return i
        }
    }), J.fn.extend({
        has: function(e) {
            var t = J(e, this),
                i = t.length;
            return this.filter(function() {
                for (var e = 0; i > e; e++)
                    if (J.contains(this, t[e])) return !0
            })
        },
        closest: function(e, t) {
            for (var i, n = 0, r = this.length, s = [], a = st.test(e) || "string" != typeof e ? J(e, t || this.context) : 0; r > n; n++)
                for (i = this[n]; i && i !== t; i = i.parentNode)
                    if (i.nodeType < 11 && (a ? a.index(i) > -1 : 1 === i.nodeType && J.find.matchesSelector(i, e))) {
                        s.push(i);
                        break
                    }
            return this.pushStack(s.length > 1 ? J.unique(s) : s)
        },
        index: function(e) {
            return e ? "string" == typeof e ? Y.call(J(e), this[0]) : Y.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        },
        add: function(e, t) {
            return this.pushStack(J.unique(J.merge(this.get(), J(e, t))))
        },
        addBack: function(e) {
            return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
        }
    }), J.each({
        parent: function(e) {
            var t = e.parentNode;
            return t && 11 !== t.nodeType ? t : null
        },
        parents: function(e) {
            return J.dir(e, "parentNode")
        },
        parentsUntil: function(e, t, i) {
            return J.dir(e, "parentNode", i)
        },
        next: function(e) {
            return r(e, "nextSibling")
        },
        prev: function(e) {
            return r(e, "previousSibling")
        },
        nextAll: function(e) {
            return J.dir(e, "nextSibling")
        },
        prevAll: function(e) {
            return J.dir(e, "previousSibling")
        },
        nextUntil: function(e, t, i) {
            return J.dir(e, "nextSibling", i)
        },
        prevUntil: function(e, t, i) {
            return J.dir(e, "previousSibling", i)
        },
        siblings: function(e) {
            return J.sibling((e.parentNode || {}).firstChild, e)
        },
        children: function(e) {
            return J.sibling(e.firstChild)
        },
        contents: function(e) {
            return e.contentDocument || J.merge([], e.childNodes)
        }
    }, function(e, t) {
        J.fn[e] = function(i, n) {
            var r = J.map(this, t, i);
            return "Until" !== e.slice(-5) && (n = i), n && "string" == typeof n && (r = J.filter(n, r)), this.length > 1 && (ht[e] || J.unique(r), ct.test(e) && r.reverse()), this.pushStack(r)
        }
    });
    var dt = /\S+/g,
        ft = {};
    J.Callbacks = function(e) {
        e = "string" == typeof e ? ft[e] || s(e) : J.extend({}, e);
        var t, i, n, r, a, o, l = [],
            u = !e.once && [],
            p = function(s) {
                for (t = e.memory && s, i = !0, o = r || 0, r = 0, a = l.length, n = !0; l && a > o; o++)
                    if (l[o].apply(s[0], s[1]) === !1 && e.stopOnFalse) {
                        t = !1;
                        break
                    }
                n = !1, l && (u ? u.length && p(u.shift()) : t ? l = [] : c.disable())
            },
            c = {
                add: function() {
                    if (l) {
                        var i = l.length;
                        ! function s(t) {
                            J.each(t, function(t, i) {
                                var n = J.type(i);
                                "function" === n ? e.unique && c.has(i) || l.push(i) : i && i.length && "string" !== n && s(i)
                            })
                        }(arguments), n ? a = l.length : t && (r = i, p(t))
                    }
                    return this
                },
                remove: function() {
                    return l && J.each(arguments, function(e, t) {
                        for (var i;
                            (i = J.inArray(t, l, i)) > -1;) l.splice(i, 1), n && (a >= i && a--, o >= i && o--)
                    }), this
                },
                has: function(e) {
                    return e ? J.inArray(e, l) > -1 : !(!l || !l.length)
                },
                empty: function() {
                    return l = [], a = 0, this
                },
                disable: function() {
                    return l = u = t = void 0, this
                },
                disabled: function() {
                    return !l
                },
                lock: function() {
                    return u = void 0, t || c.disable(), this
                },
                locked: function() {
                    return !u
                },
                fireWith: function(e, t) {
                    return !l || i && !u || (t = t || [], t = [e, t.slice ? t.slice() : t], n ? u.push(t) : p(t)), this
                },
                fire: function() {
                    return c.fireWith(this, arguments), this
                },
                fired: function() {
                    return !!i
                }
            };
        return c
    }, J.extend({
        Deferred: function(e) {
            var t = [
                    ["resolve", "done", J.Callbacks("once memory"), "resolved"],
                    ["reject", "fail", J.Callbacks("once memory"), "rejected"],
                    ["notify", "progress", J.Callbacks("memory")]
                ],
                i = "pending",
                n = {
                    state: function() {
                        return i
                    },
                    always: function() {
                        return r.done(arguments).fail(arguments), this
                    },
                    then: function() {
                        var e = arguments;
                        return J.Deferred(function(i) {
                            J.each(t, function(t, s) {
                                var a = J.isFunction(e[t]) && e[t];
                                r[s[1]](function() {
                                    var e = a && a.apply(this, arguments);
                                    e && J.isFunction(e.promise) ? e.promise().done(i.resolve).fail(i.reject).progress(i.notify) : i[s[0] + "With"](this === n ? i.promise() : this, a ? [e] : arguments)
                                })
                            }), e = null
                        }).promise()
                    },
                    promise: function(e) {
                        return null != e ? J.extend(e, n) : n
                    }
                },
                r = {};
            return n.pipe = n.then, J.each(t, function(e, s) {
                var a = s[2],
                    o = s[3];
                n[s[1]] = a.add, o && a.add(function() {
                    i = o
                }, t[1 ^ e][2].disable, t[2][2].lock), r[s[0]] = function() {
                    return r[s[0] + "With"](this === r ? n : this, arguments), this
                }, r[s[0] + "With"] = a.fireWith
            }), n.promise(r), e && e.call(r, r), r
        },
        when: function(e) {
            var t, i, n, r = 0,
                s = X.call(arguments),
                a = s.length,
                o = 1 !== a || e && J.isFunction(e.promise) ? a : 0,
                l = 1 === o ? e : J.Deferred(),
                u = function(e, i, n) {
                    return function(r) {
                        i[e] = this, n[e] = arguments.length > 1 ? X.call(arguments) : r, n === t ? l.notifyWith(i, n) : --o || l.resolveWith(i, n)
                    }
                };
            if (a > 1)
                for (t = new Array(a), i = new Array(a), n = new Array(a); a > r; r++) s[r] && J.isFunction(s[r].promise) ? s[r].promise().done(u(r, n, s)).fail(l.reject).progress(u(r, i, t)) : --o;
            return o || l.resolveWith(n, s), l.promise()
        }
    });
    var mt;
    J.fn.ready = function(e) {
        return J.ready.promise().done(e), this
    }, J.extend({
        isReady: !1,
        readyWait: 1,
        holdReady: function(e) {
            e ? J.readyWait++ : J.ready(!0)
        },
        ready: function(e) {
            (e === !0 ? --J.readyWait : J.isReady) || (J.isReady = !0, e !== !0 && --J.readyWait > 0 || (mt.resolveWith(K, [J]), J.fn.triggerHandler && (J(K).triggerHandler("ready"), J(K).off("ready"))))
        }
    }), J.ready.promise = function(t) {
        return mt || (mt = J.Deferred(), "complete" === K.readyState ? setTimeout(J.ready) : (K.addEventListener("DOMContentLoaded", a, !1), e.addEventListener("load", a, !1))), mt.promise(t)
    }, J.ready.promise();
    var gt = J.access = function(e, t, i, n, r, s, a) {
        var o = 0,
            l = e.length,
            u = null == i;
        if ("object" === J.type(i)) {
            r = !0;
            for (o in i) J.access(e, t, o, i[o], !0, s, a)
        } else if (void 0 !== n && (r = !0, J.isFunction(n) || (a = !0), u && (a ? (t.call(e, n), t = null) : (u = t, t = function(e, t, i) {
                return u.call(J(e), i)
            })), t))
            for (; l > o; o++) t(e[o], i, a ? n : n.call(e[o], o, t(e[o], i)));
        return r ? e : u ? t.call(e) : l ? t(e[0], i) : s
    };
    J.acceptData = function(e) {
        return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType
    }, o.uid = 1, o.accepts = J.acceptData, o.prototype = {
        key: function(e) {
            if (!o.accepts(e)) return 0;
            var t = {},
                i = e[this.expando];
            if (!i) {
                i = o.uid++;
                try {
                    t[this.expando] = {
                        value: i
                    }, Object.defineProperties(e, t)
                } catch (n) {
                    t[this.expando] = i, J.extend(e, t)
                }
            }
            return this.cache[i] || (this.cache[i] = {}), i
        },
        set: function(e, t, i) {
            var n, r = this.key(e),
                s = this.cache[r];
            if ("string" == typeof t) s[t] = i;
            else if (J.isEmptyObject(s)) J.extend(this.cache[r], t);
            else
                for (n in t) s[n] = t[n];
            return s
        },
        get: function(e, t) {
            var i = this.cache[this.key(e)];
            return void 0 === t ? i : i[t]
        },
        access: function(e, t, i) {
            var n;
            return void 0 === t || t && "string" == typeof t && void 0 === i ? (n = this.get(e, t), void 0 !== n ? n : this.get(e, J.camelCase(t))) : (this.set(e, t, i), void 0 !== i ? i : t)
        },
        remove: function(e, t) {
            var i, n, r, s = this.key(e),
                a = this.cache[s];
            if (void 0 === t) this.cache[s] = {};
            else {
                J.isArray(t) ? n = t.concat(t.map(J.camelCase)) : (r = J.camelCase(t), t in a ? n = [t, r] : (n = r, n = n in a ? [n] : n.match(dt) || [])), i = n.length;
                for (; i--;) delete a[n[i]]
            }
        },
        hasData: function(e) {
            return !J.isEmptyObject(this.cache[e[this.expando]] || {})
        },
        discard: function(e) {
            e[this.expando] && delete this.cache[e[this.expando]]
        }
    };
    var vt = new o,
        _t = new o,
        yt = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
        wt = /([A-Z])/g;
    J.extend({
        hasData: function(e) {
            return _t.hasData(e) || vt.hasData(e)
        },
        data: function(e, t, i) {
            return _t.access(e, t, i)
        },
        removeData: function(e, t) {
            _t.remove(e, t)
        },
        _data: function(e, t, i) {
            return vt.access(e, t, i)
        },
        _removeData: function(e, t) {
            vt.remove(e, t)
        }
    }), J.fn.extend({
        data: function(e, t) {
            var i, n, r, s = this[0],
                a = s && s.attributes;
            if (void 0 === e) {
                if (this.length && (r = _t.get(s), 1 === s.nodeType && !vt.get(s, "hasDataAttrs"))) {
                    for (i = a.length; i--;) a[i] && (n = a[i].name, 0 === n.indexOf("data-") && (n = J.camelCase(n.slice(5)), l(s, n, r[n])));
                    vt.set(s, "hasDataAttrs", !0)
                }
                return r
            }
            return "object" == typeof e ? this.each(function() {
                _t.set(this, e)
            }) : gt(this, function(t) {
                var i, n = J.camelCase(e);
                if (s && void 0 === t) {
                    if (i = _t.get(s, e), void 0 !== i) return i;
                    if (i = _t.get(s, n), void 0 !== i) return i;
                    if (i = l(s, n, void 0), void 0 !== i) return i
                } else this.each(function() {
                    var i = _t.get(this, n);
                    _t.set(this, n, t), -1 !== e.indexOf("-") && void 0 !== i && _t.set(this, e, t)
                })
            }, null, t, arguments.length > 1, null, !0)
        },
        removeData: function(e) {
            return this.each(function() {
                _t.remove(this, e)
            })
        }
    }), J.extend({
        queue: function(e, t, i) {
            var n;
            return e ? (t = (t || "fx") + "queue", n = vt.get(e, t), i && (!n || J.isArray(i) ? n = vt.access(e, t, J.makeArray(i)) : n.push(i)), n || []) : void 0
        },
        dequeue: function(e, t) {
            t = t || "fx";
            var i = J.queue(e, t),
                n = i.length,
                r = i.shift(),
                s = J._queueHooks(e, t),
                a = function() {
                    J.dequeue(e, t)
                };
            "inprogress" === r && (r = i.shift(), n--), r && ("fx" === t && i.unshift("inprogress"), delete s.stop, r.call(e, a, s)), !n && s && s.empty.fire()
        },
        _queueHooks: function(e, t) {
            var i = t + "queueHooks";
            return vt.get(e, i) || vt.access(e, i, {
                empty: J.Callbacks("once memory").add(function() {
                    vt.remove(e, [t + "queue", i])
                })
            })
        }
    }), J.fn.extend({
        queue: function(e, t) {
            var i = 2;
            return "string" != typeof e && (t = e, e = "fx", i--), arguments.length < i ? J.queue(this[0], e) : void 0 === t ? this : this.each(function() {
                var i = J.queue(this, e, t);
                J._queueHooks(this, e), "fx" === e && "inprogress" !== i[0] && J.dequeue(this, e)
            })
        },
        dequeue: function(e) {
            return this.each(function() {
                J.dequeue(this, e)
            })
        },
        clearQueue: function(e) {
            return this.queue(e || "fx", [])
        },
        promise: function(e, t) {
            var i, n = 1,
                r = J.Deferred(),
                s = this,
                a = this.length,
                o = function() {
                    --n || r.resolveWith(s, [s])
                };
            for ("string" != typeof e && (t = e, e = void 0), e = e || "fx"; a--;) i = vt.get(s[a], e + "queueHooks"), i && i.empty && (n++, i.empty.add(o));
            return o(), r.promise(t)
        }
    });
    var xt = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
        Tt = ["Top", "Right", "Bottom", "Left"],
        bt = function(e, t) {
            return e = t || e, "none" === J.css(e, "display") || !J.contains(e.ownerDocument, e)
        },
        St = /^(?:checkbox|radio)$/i;
    ! function() {
        var e = K.createDocumentFragment(),
            t = e.appendChild(K.createElement("div")),
            i = K.createElement("input");
        i.setAttribute("type", "radio"), i.setAttribute("checked", "checked"), i.setAttribute("name", "t"), t.appendChild(i), Q.checkClone = t.cloneNode(!0).cloneNode(!0).lastChild.checked, t.innerHTML = "<textarea>x</textarea>", Q.noCloneChecked = !!t.cloneNode(!0).lastChild.defaultValue
    }();
    var Ct = "undefined";
    Q.focusinBubbles = "onfocusin" in e;
    var Pt = /^key/,
        kt = /^(?:mouse|pointer|contextmenu)|click/,
        Mt = /^(?:focusinfocus|focusoutblur)$/,
        Dt = /^([^.]*)(?:\.(.+)|)$/;
    J.event = {
        global: {},
        add: function(e, t, i, n, r) {
            var s, a, o, l, u, p, c, h, d, f, m, g = vt.get(e);
            if (g)
                for (i.handler && (s = i, i = s.handler, r = s.selector), i.guid || (i.guid = J.guid++), (l = g.events) || (l = g.events = {}), (a = g.handle) || (a = g.handle = function(t) {
                        return typeof J !== Ct && J.event.triggered !== t.type ? J.event.dispatch.apply(e, arguments) : void 0
                    }), t = (t || "").match(dt) || [""], u = t.length; u--;) o = Dt.exec(t[u]) || [], d = m = o[1], f = (o[2] || "").split(".").sort(), d && (c = J.event.special[d] || {}, d = (r ? c.delegateType : c.bindType) || d, c = J.event.special[d] || {}, p = J.extend({
                    type: d,
                    origType: m,
                    data: n,
                    handler: i,
                    guid: i.guid,
                    selector: r,
                    needsContext: r && J.expr.match.needsContext.test(r),
                    namespace: f.join(".")
                }, s), (h = l[d]) || (h = l[d] = [], h.delegateCount = 0, c.setup && c.setup.call(e, n, f, a) !== !1 || e.addEventListener && e.addEventListener(d, a, !1)), c.add && (c.add.call(e, p), p.handler.guid || (p.handler.guid = i.guid)), r ? h.splice(h.delegateCount++, 0, p) : h.push(p), J.event.global[d] = !0)
        },
        remove: function(e, t, i, n, r) {
            var s, a, o, l, u, p, c, h, d, f, m, g = vt.hasData(e) && vt.get(e);
            if (g && (l = g.events)) {
                for (t = (t || "").match(dt) || [""], u = t.length; u--;)
                    if (o = Dt.exec(t[u]) || [], d = m = o[1], f = (o[2] || "").split(".").sort(), d) {
                        for (c = J.event.special[d] || {}, d = (n ? c.delegateType : c.bindType) || d, h = l[d] || [], o = o[2] && new RegExp("(^|\\.)" + f.join("\\.(?:.*\\.|)") + "(\\.|$)"), a = s = h.length; s--;) p = h[s], !r && m !== p.origType || i && i.guid !== p.guid || o && !o.test(p.namespace) || n && n !== p.selector && ("**" !== n || !p.selector) || (h.splice(s, 1), p.selector && h.delegateCount--, c.remove && c.remove.call(e, p));
                        a && !h.length && (c.teardown && c.teardown.call(e, f, g.handle) !== !1 || J.removeEvent(e, d, g.handle), delete l[d])
                    } else
                        for (d in l) J.event.remove(e, d + t[u], i, n, !0);
                J.isEmptyObject(l) && (delete g.handle, vt.remove(e, "events"))
            }
        },
        trigger: function(t, i, n, r) {
            var s, a, o, l, u, p, c, h = [n || K],
                d = U.call(t, "type") ? t.type : t,
                f = U.call(t, "namespace") ? t.namespace.split(".") : [];
            if (a = o = n = n || K, 3 !== n.nodeType && 8 !== n.nodeType && !Mt.test(d + J.event.triggered) && (d.indexOf(".") >= 0 && (f = d.split("."), d = f.shift(), f.sort()), u = d.indexOf(":") < 0 && "on" + d, t = t[J.expando] ? t : new J.Event(d, "object" == typeof t && t), t.isTrigger = r ? 2 : 3, t.namespace = f.join("."), t.namespace_re = t.namespace ? new RegExp("(^|\\.)" + f.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, t.result = void 0, t.target || (t.target = n), i = null == i ? [t] : J.makeArray(i, [t]), c = J.event.special[d] || {}, r || !c.trigger || c.trigger.apply(n, i) !== !1)) {
                if (!r && !c.noBubble && !J.isWindow(n)) {
                    for (l = c.delegateType || d, Mt.test(l + d) || (a = a.parentNode); a; a = a.parentNode) h.push(a), o = a;
                    o === (n.ownerDocument || K) && h.push(o.defaultView || o.parentWindow || e)
                }
                for (s = 0;
                    (a = h[s++]) && !t.isPropagationStopped();) t.type = s > 1 ? l : c.bindType || d, p = (vt.get(a, "events") || {})[t.type] && vt.get(a, "handle"), p && p.apply(a, i), p = u && a[u], p && p.apply && J.acceptData(a) && (t.result = p.apply(a, i), t.result === !1 && t.preventDefault());
                return t.type = d, r || t.isDefaultPrevented() || c._default && c._default.apply(h.pop(), i) !== !1 || !J.acceptData(n) || u && J.isFunction(n[d]) && !J.isWindow(n) && (o = n[u], o && (n[u] = null), J.event.triggered = d, n[d](), J.event.triggered = void 0, o && (n[u] = o)), t.result
            }
        },
        dispatch: function(e) {
            e = J.event.fix(e);
            var t, i, n, r, s, a = [],
                o = X.call(arguments),
                l = (vt.get(this, "events") || {})[e.type] || [],
                u = J.event.special[e.type] || {};
            if (o[0] = e, e.delegateTarget = this, !u.preDispatch || u.preDispatch.call(this, e) !== !1) {
                for (a = J.event.handlers.call(this, e, l), t = 0;
                    (r = a[t++]) && !e.isPropagationStopped();)
                    for (e.currentTarget = r.elem, i = 0;
                        (s = r.handlers[i++]) && !e.isImmediatePropagationStopped();)(!e.namespace_re || e.namespace_re.test(s.namespace)) && (e.handleObj = s, e.data = s.data, n = ((J.event.special[s.origType] || {}).handle || s.handler).apply(r.elem, o), void 0 !== n && (e.result = n) === !1 && (e.preventDefault(), e.stopPropagation()));
                return u.postDispatch && u.postDispatch.call(this, e), e.result
            }
        },
        handlers: function(e, t) {
            var i, n, r, s, a = [],
                o = t.delegateCount,
                l = e.target;
            if (o && l.nodeType && (!e.button || "click" !== e.type))
                for (; l !== this; l = l.parentNode || this)
                    if (l.disabled !== !0 || "click" !== e.type) {
                        for (n = [], i = 0; o > i; i++) s = t[i], r = s.selector + " ", void 0 === n[r] && (n[r] = s.needsContext ? J(r, this).index(l) >= 0 : J.find(r, this, null, [l]).length), n[r] && n.push(s);
                        n.length && a.push({
                            elem: l,
                            handlers: n
                        })
                    }
            return o < t.length && a.push({
                elem: this,
                handlers: t.slice(o)
            }), a
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(e, t) {
                return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode), e
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(e, t) {
                var i, n, r, s = t.button;
                return null == e.pageX && null != t.clientX && (i = e.target.ownerDocument || K, n = i.documentElement, r = i.body, e.pageX = t.clientX + (n && n.scrollLeft || r && r.scrollLeft || 0) - (n && n.clientLeft || r && r.clientLeft || 0), e.pageY = t.clientY + (n && n.scrollTop || r && r.scrollTop || 0) - (n && n.clientTop || r && r.clientTop || 0)), e.which || void 0 === s || (e.which = 1 & s ? 1 : 2 & s ? 3 : 4 & s ? 2 : 0), e
            }
        },
        fix: function(e) {
            if (e[J.expando]) return e;
            var t, i, n, r = e.type,
                s = e,
                a = this.fixHooks[r];
            for (a || (this.fixHooks[r] = a = kt.test(r) ? this.mouseHooks : Pt.test(r) ? this.keyHooks : {}), n = a.props ? this.props.concat(a.props) : this.props, e = new J.Event(s), t = n.length; t--;) i = n[t], e[i] = s[i];
            return e.target || (e.target = K), 3 === e.target.nodeType && (e.target = e.target.parentNode), a.filter ? a.filter(e, s) : e
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function() {
                    return this !== c() && this.focus ? (this.focus(), !1) : void 0
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    return this === c() && this.blur ? (this.blur(), !1) : void 0
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function() {
                    return "checkbox" === this.type && this.click && J.nodeName(this, "input") ? (this.click(), !1) : void 0
                },
                _default: function(e) {
                    return J.nodeName(e.target, "a")
                }
            },
            beforeunload: {
                postDispatch: function(e) {
                    void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result)
                }
            }
        },
        simulate: function(e, t, i, n) {
            var r = J.extend(new J.Event, i, {
                type: e,
                isSimulated: !0,
                originalEvent: {}
            });
            n ? J.event.trigger(r, null, t) : J.event.dispatch.call(t, r), r.isDefaultPrevented() && i.preventDefault()
        }
    }, J.removeEvent = function(e, t, i) {
        e.removeEventListener && e.removeEventListener(t, i, !1)
    }, J.Event = function(e, t) {
        return this instanceof J.Event ? (e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && e.returnValue === !1 ? u : p) : this.type = e, t && J.extend(this, t), this.timeStamp = e && e.timeStamp || J.now(), void(this[J.expando] = !0)) : new J.Event(e, t)
    }, J.Event.prototype = {
        isDefaultPrevented: p,
        isPropagationStopped: p,
        isImmediatePropagationStopped: p,
        preventDefault: function() {
            var e = this.originalEvent;
            this.isDefaultPrevented = u, e && e.preventDefault && e.preventDefault()
        },
        stopPropagation: function() {
            var e = this.originalEvent;
            this.isPropagationStopped = u, e && e.stopPropagation && e.stopPropagation()
        },
        stopImmediatePropagation: function() {
            var e = this.originalEvent;
            this.isImmediatePropagationStopped = u, e && e.stopImmediatePropagation && e.stopImmediatePropagation(), this.stopPropagation()
        }
    }, J.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function(e, t) {
        J.event.special[e] = {
            delegateType: t,
            bindType: t,
            handle: function(e) {
                var i, n = this,
                    r = e.relatedTarget,
                    s = e.handleObj;
                return (!r || r !== n && !J.contains(n, r)) && (e.type = s.origType, i = s.handler.apply(this, arguments), e.type = t), i
            }
        }
    }), Q.focusinBubbles || J.each({
        focus: "focusin",
        blur: "focusout"
    }, function(e, t) {
        var i = function(e) {
            J.event.simulate(t, e.target, J.event.fix(e), !0)
        };
        J.event.special[t] = {
            setup: function() {
                var n = this.ownerDocument || this,
                    r = vt.access(n, t);
                r || n.addEventListener(e, i, !0), vt.access(n, t, (r || 0) + 1)
            },
            teardown: function() {
                var n = this.ownerDocument || this,
                    r = vt.access(n, t) - 1;
                r ? vt.access(n, t, r) : (n.removeEventListener(e, i, !0), vt.remove(n, t))
            }
        }
    }), J.fn.extend({
        on: function(e, t, i, n, r) {
            var s, a;
            if ("object" == typeof e) {
                "string" != typeof t && (i = i || t, t = void 0);
                for (a in e) this.on(a, t, i, e[a], r);
                return this
            }
            if (null == i && null == n ? (n = t, i = t = void 0) : null == n && ("string" == typeof t ? (n = i, i = void 0) : (n = i, i = t, t = void 0)), n === !1) n = p;
            else if (!n) return this;
            return 1 === r && (s = n, n = function(e) {
                return J().off(e), s.apply(this, arguments)
            }, n.guid = s.guid || (s.guid = J.guid++)), this.each(function() {
                J.event.add(this, e, n, i, t)
            })
        },
        one: function(e, t, i, n) {
            return this.on(e, t, i, n, 1)
        },
        off: function(e, t, i) {
            var n, r;
            if (e && e.preventDefault && e.handleObj) return n = e.handleObj, J(e.delegateTarget).off(n.namespace ? n.origType + "." + n.namespace : n.origType, n.selector, n.handler), this;
            if ("object" == typeof e) {
                for (r in e) this.off(r, t, e[r]);
                return this
            }
            return (t === !1 || "function" == typeof t) && (i = t, t = void 0), i === !1 && (i = p), this.each(function() {
                J.event.remove(this, e, i, t)
            })
        },
        trigger: function(e, t) {
            return this.each(function() {
                J.event.trigger(e, t, this)
            })
        },
        triggerHandler: function(e, t) {
            var i = this[0];
            return i ? J.event.trigger(e, t, i, !0) : void 0
        }
    });
    var Et = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
        At = /<([\w:]+)/,
        Ot = /<|&#?\w+;/,
        Rt = /<(?:script|style|link)/i,
        Lt = /checked\s*(?:[^=]|=\s*.checked.)/i,
        Nt = /^$|\/(?:java|ecma)script/i,
        It = /^true\/(.*)/,
        zt = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
        jt = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            thead: [1, "<table>", "</table>"],
            col: [2, "<table><colgroup>", "</colgroup></table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: [0, "", ""]
        };
    jt.optgroup = jt.option, jt.tbody = jt.tfoot = jt.colgroup = jt.caption = jt.thead, jt.th = jt.td, J.extend({
        clone: function(e, t, i) {
            var n, r, s, a, o = e.cloneNode(!0),
                l = J.contains(e.ownerDocument, e);
            if (!(Q.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || J.isXMLDoc(e)))
                for (a = v(o), s = v(e), n = 0, r = s.length; r > n; n++) _(s[n], a[n]);
            if (t)
                if (i)
                    for (s = s || v(e), a = a || v(o), n = 0, r = s.length; r > n; n++) g(s[n], a[n]);
                else g(e, o);
            return a = v(o, "script"), a.length > 0 && m(a, !l && v(e, "script")), o
        },
        buildFragment: function(e, t, i, n) {
            for (var r, s, a, o, l, u, p = t.createDocumentFragment(), c = [], h = 0, d = e.length; d > h; h++)
                if (r = e[h], r || 0 === r)
                    if ("object" === J.type(r)) J.merge(c, r.nodeType ? [r] : r);
                    else if (Ot.test(r)) {
                for (s = s || p.appendChild(t.createElement("div")), a = (At.exec(r) || ["", ""])[1].toLowerCase(), o = jt[a] || jt._default, s.innerHTML = o[1] + r.replace(Et, "<$1></$2>") + o[2], u = o[0]; u--;) s = s.lastChild;
                J.merge(c, s.childNodes), s = p.firstChild, s.textContent = ""
            } else c.push(t.createTextNode(r));
            for (p.textContent = "", h = 0; r = c[h++];)
                if ((!n || -1 === J.inArray(r, n)) && (l = J.contains(r.ownerDocument, r), s = v(p.appendChild(r), "script"), l && m(s), i))
                    for (u = 0; r = s[u++];) Nt.test(r.type || "") && i.push(r);
            return p
        },
        cleanData: function(e) {
            for (var t, i, n, r, s = J.event.special, a = 0; void 0 !== (i = e[a]); a++) {
                if (J.acceptData(i) && (r = i[vt.expando], r && (t = vt.cache[r]))) {
                    if (t.events)
                        for (n in t.events) s[n] ? J.event.remove(i, n) : J.removeEvent(i, n, t.handle);
                    vt.cache[r] && delete vt.cache[r]
                }
                delete _t.cache[i[_t.expando]]
            }
        }
    }), J.fn.extend({
        text: function(e) {
            return gt(this, function(e) {
                return void 0 === e ? J.text(this) : this.empty().each(function() {
                    (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) && (this.textContent = e)
                })
            }, null, e, arguments.length)
        },
        append: function() {
            return this.domManip(arguments, function(e) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = h(this, e);
                    t.appendChild(e)
                }
            })
        },
        prepend: function() {
            return this.domManip(arguments, function(e) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = h(this, e);
                    t.insertBefore(e, t.firstChild)
                }
            })
        },
        before: function() {
            return this.domManip(arguments, function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this)
            })
        },
        after: function() {
            return this.domManip(arguments, function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
            })
        },
        remove: function(e, t) {
            for (var i, n = e ? J.filter(e, this) : this, r = 0; null != (i = n[r]); r++) t || 1 !== i.nodeType || J.cleanData(v(i)), i.parentNode && (t && J.contains(i.ownerDocument, i) && m(v(i, "script")), i.parentNode.removeChild(i));
            return this
        },
        empty: function() {
            for (var e, t = 0; null != (e = this[t]); t++) 1 === e.nodeType && (J.cleanData(v(e, !1)), e.textContent = "");
            return this
        },
        clone: function(e, t) {
            return e = null == e ? !1 : e, t = null == t ? e : t, this.map(function() {
                return J.clone(this, e, t)
            })
        },
        html: function(e) {
            return gt(this, function(e) {
                var t = this[0] || {},
                    i = 0,
                    n = this.length;
                if (void 0 === e && 1 === t.nodeType) return t.innerHTML;
                if ("string" == typeof e && !Rt.test(e) && !jt[(At.exec(e) || ["", ""])[1].toLowerCase()]) {
                    e = e.replace(Et, "<$1></$2>");
                    try {
                        for (; n > i; i++) t = this[i] || {}, 1 === t.nodeType && (J.cleanData(v(t, !1)), t.innerHTML = e);
                        t = 0
                    } catch (r) {}
                }
                t && this.empty().append(e)
            }, null, e, arguments.length)
        },
        replaceWith: function() {
            var e = arguments[0];
            return this.domManip(arguments, function(t) {
                e = this.parentNode, J.cleanData(v(this)), e && e.replaceChild(t, this)
            }), e && (e.length || e.nodeType) ? this : this.remove()
        },
        detach: function(e) {
            return this.remove(e, !0)
        },
        domManip: function(e, t) {
            e = H.apply([], e);
            var i, n, r, s, a, o, l = 0,
                u = this.length,
                p = this,
                c = u - 1,
                h = e[0],
                m = J.isFunction(h);
            if (m || u > 1 && "string" == typeof h && !Q.checkClone && Lt.test(h)) return this.each(function(i) {
                var n = p.eq(i);
                m && (e[0] = h.call(this, i, n.html())), n.domManip(e, t)
            });
            if (u && (i = J.buildFragment(e, this[0].ownerDocument, !1, this), n = i.firstChild, 1 === i.childNodes.length && (i = n), n)) {
                for (r = J.map(v(i, "script"), d), s = r.length; u > l; l++) a = i, l !== c && (a = J.clone(a, !0, !0), s && J.merge(r, v(a, "script"))), t.call(this[l], a, l);
                if (s)
                    for (o = r[r.length - 1].ownerDocument, J.map(r, f), l = 0; s > l; l++) a = r[l], Nt.test(a.type || "") && !vt.access(a, "globalEval") && J.contains(o, a) && (a.src ? J._evalUrl && J._evalUrl(a.src) : J.globalEval(a.textContent.replace(zt, "")))
            }
            return this
        }
    }), J.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(e, t) {
        J.fn[e] = function(e) {
            for (var i, n = [], r = J(e), s = r.length - 1, a = 0; s >= a; a++) i = a === s ? this : this.clone(!0), J(r[a])[t](i), q.apply(n, i.get());
            return this.pushStack(n)
        }
    });
    var Ft, Bt = {},
        Wt = /^margin/,
        $t = new RegExp("^(" + xt + ")(?!px)[a-z%]+$", "i"),
        Xt = function(e) {
            return e.ownerDocument.defaultView.getComputedStyle(e, null)
        };
    ! function() {
        function t() {
            a.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute", a.innerHTML = "", r.appendChild(s);
            var t = e.getComputedStyle(a, null);
            i = "1%" !== t.top, n = "4px" === t.width, r.removeChild(s)
        }
        var i, n, r = K.documentElement,
            s = K.createElement("div"),
            a = K.createElement("div");
        a.style && (a.style.backgroundClip = "content-box", a.cloneNode(!0).style.backgroundClip = "", Q.clearCloneStyle = "content-box" === a.style.backgroundClip, s.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;position:absolute", s.appendChild(a), e.getComputedStyle && J.extend(Q, {
            pixelPosition: function() {
                return t(), i
            },
            boxSizingReliable: function() {
                return null == n && t(), n
            },
            reliableMarginRight: function() {
                var t, i = a.appendChild(K.createElement("div"));
                return i.style.cssText = a.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", i.style.marginRight = i.style.width = "0", a.style.width = "1px", r.appendChild(s), t = !parseFloat(e.getComputedStyle(i, null).marginRight), r.removeChild(s), t
            }
        }))
    }(), J.swap = function(e, t, i, n) {
        var r, s, a = {};
        for (s in t) a[s] = e.style[s], e.style[s] = t[s];
        r = i.apply(e, n || []);
        for (s in t) e.style[s] = a[s];
        return r
    };
    var Ht = /^(none|table(?!-c[ea]).+)/,
        qt = new RegExp("^(" + xt + ")(.*)$", "i"),
        Yt = new RegExp("^([+-])=(" + xt + ")", "i"),
        Gt = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        },
        Vt = {
            letterSpacing: "0",
            fontWeight: "400"
        },
        Ut = ["Webkit", "O", "Moz", "ms"];
    J.extend({
        cssHooks: {
            opacity: {
                get: function(e, t) {
                    if (t) {
                        var i = x(e, "opacity");
                        return "" === i ? "1" : i
                    }
                }
            }
        },
        cssNumber: {
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": "cssFloat"
        },
        style: function(e, t, i, n) {
            if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                var r, s, a, o = J.camelCase(t),
                    l = e.style;
                return t = J.cssProps[o] || (J.cssProps[o] = b(l, o)), a = J.cssHooks[t] || J.cssHooks[o], void 0 === i ? a && "get" in a && void 0 !== (r = a.get(e, !1, n)) ? r : l[t] : (s = typeof i, "string" === s && (r = Yt.exec(i)) && (i = (r[1] + 1) * r[2] + parseFloat(J.css(e, t)), s = "number"), void(null != i && i === i && ("number" !== s || J.cssNumber[o] || (i += "px"), Q.clearCloneStyle || "" !== i || 0 !== t.indexOf("background") || (l[t] = "inherit"), a && "set" in a && void 0 === (i = a.set(e, i, n)) || (l[t] = i))))
            }
        },
        css: function(e, t, i, n) {
            var r, s, a, o = J.camelCase(t);
            return t = J.cssProps[o] || (J.cssProps[o] = b(e.style, o)), a = J.cssHooks[t] || J.cssHooks[o], a && "get" in a && (r = a.get(e, !0, i)), void 0 === r && (r = x(e, t, n)), "normal" === r && t in Vt && (r = Vt[t]), "" === i || i ? (s = parseFloat(r), i === !0 || J.isNumeric(s) ? s || 0 : r) : r
        }
    }), J.each(["height", "width"], function(e, t) {
        J.cssHooks[t] = {
            get: function(e, i, n) {
                return i ? Ht.test(J.css(e, "display")) && 0 === e.offsetWidth ? J.swap(e, Gt, function() {
                    return P(e, t, n)
                }) : P(e, t, n) : void 0
            },
            set: function(e, i, n) {
                var r = n && Xt(e);
                return S(e, i, n ? C(e, t, n, "border-box" === J.css(e, "boxSizing", !1, r), r) : 0)
            }
        }
    }), J.cssHooks.marginRight = T(Q.reliableMarginRight, function(e, t) {
        return t ? J.swap(e, {
            display: "inline-block"
        }, x, [e, "marginRight"]) : void 0
    }), J.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(e, t) {
        J.cssHooks[e + t] = {
            expand: function(i) {
                for (var n = 0, r = {}, s = "string" == typeof i ? i.split(" ") : [i]; 4 > n; n++) r[e + Tt[n] + t] = s[n] || s[n - 2] || s[0];
                return r
            }
        }, Wt.test(e) || (J.cssHooks[e + t].set = S)
    }), J.fn.extend({
        css: function(e, t) {
            return gt(this, function(e, t, i) {
                var n, r, s = {},
                    a = 0;
                if (J.isArray(t)) {
                    for (n = Xt(e), r = t.length; r > a; a++) s[t[a]] = J.css(e, t[a], !1, n);
                    return s
                }
                return void 0 !== i ? J.style(e, t, i) : J.css(e, t)
            }, e, t, arguments.length > 1)
        },
        show: function() {
            return k(this, !0)
        },
        hide: function() {
            return k(this)
        },
        toggle: function(e) {
            return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function() {
                bt(this) ? J(this).show() : J(this).hide()
            })
        }
    }), J.Tween = M, M.prototype = {
        constructor: M,
        init: function(e, t, i, n, r, s) {
            this.elem = e, this.prop = i, this.easing = r || "swing", this.options = t, this.start = this.now = this.cur(), this.end = n, this.unit = s || (J.cssNumber[i] ? "" : "px")
        },
        cur: function() {
            var e = M.propHooks[this.prop];
            return e && e.get ? e.get(this) : M.propHooks._default.get(this)
        },
        run: function(e) {
            var t, i = M.propHooks[this.prop];
            return this.pos = t = this.options.duration ? J.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), i && i.set ? i.set(this) : M.propHooks._default.set(this), this
        }
    }, M.prototype.init.prototype = M.prototype, M.propHooks = {
        _default: {
            get: function(e) {
                var t;
                return null == e.elem[e.prop] || e.elem.style && null != e.elem.style[e.prop] ? (t = J.css(e.elem, e.prop, ""), t && "auto" !== t ? t : 0) : e.elem[e.prop]
            },
            set: function(e) {
                J.fx.step[e.prop] ? J.fx.step[e.prop](e) : e.elem.style && (null != e.elem.style[J.cssProps[e.prop]] || J.cssHooks[e.prop]) ? J.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now
            }
        }
    }, M.propHooks.scrollTop = M.propHooks.scrollLeft = {
        set: function(e) {
            e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
        }
    }, J.easing = {
        linear: function(e) {
            return e
        },
        swing: function(e) {
            return .5 - Math.cos(e * Math.PI) / 2
        }
    }, J.fx = M.prototype.init, J.fx.step = {};
    var Qt, Kt, Zt = /^(?:toggle|show|hide)$/,
        Jt = new RegExp("^(?:([+-])=|)(" + xt + ")([a-z%]*)$", "i"),
        ei = /queueHooks$/,
        ti = [O],
        ii = {
            "*": [function(e, t) {
                var i = this.createTween(e, t),
                    n = i.cur(),
                    r = Jt.exec(t),
                    s = r && r[3] || (J.cssNumber[e] ? "" : "px"),
                    a = (J.cssNumber[e] || "px" !== s && +n) && Jt.exec(J.css(i.elem, e)),
                    o = 1,
                    l = 20;
                if (a && a[3] !== s) {
                    s = s || a[3], r = r || [], a = +n || 1;
                    do o = o || ".5", a /= o, J.style(i.elem, e, a + s); while (o !== (o = i.cur() / n) && 1 !== o && --l)
                }
                return r && (a = i.start = +a || +n || 0, i.unit = s, i.end = r[1] ? a + (r[1] + 1) * r[2] : +r[2]), i
            }]
        };
    J.Animation = J.extend(L, {
            tweener: function(e, t) {
                J.isFunction(e) ? (t = e, e = ["*"]) : e = e.split(" ");
                for (var i, n = 0, r = e.length; r > n; n++) i = e[n], ii[i] = ii[i] || [], ii[i].unshift(t)
            },
            prefilter: function(e, t) {
                t ? ti.unshift(e) : ti.push(e)
            }
        }), J.speed = function(e, t, i) {
            var n = e && "object" == typeof e ? J.extend({}, e) : {
                complete: i || !i && t || J.isFunction(e) && e,
                duration: e,
                easing: i && t || t && !J.isFunction(t) && t
            };
            return n.duration = J.fx.off ? 0 : "number" == typeof n.duration ? n.duration : n.duration in J.fx.speeds ? J.fx.speeds[n.duration] : J.fx.speeds._default, (null == n.queue || n.queue === !0) && (n.queue = "fx"), n.old = n.complete, n.complete = function() {
                J.isFunction(n.old) && n.old.call(this), n.queue && J.dequeue(this, n.queue)
            }, n
        }, J.fn.extend({
            fadeTo: function(e, t, i, n) {
                return this.filter(bt).css("opacity", 0).show().end().animate({
                    opacity: t
                }, e, i, n)
            },
            animate: function(e, t, i, n) {
                var r = J.isEmptyObject(e),
                    s = J.speed(t, i, n),
                    a = function() {
                        var t = L(this, J.extend({}, e), s);
                        (r || vt.get(this, "finish")) && t.stop(!0)
                    };
                return a.finish = a, r || s.queue === !1 ? this.each(a) : this.queue(s.queue, a)
            },
            stop: function(e, t, i) {
                var n = function(e) {
                    var t = e.stop;
                    delete e.stop, t(i)
                };
                return "string" != typeof e && (i = t, t = e, e = void 0), t && e !== !1 && this.queue(e || "fx", []), this.each(function() {
                    var t = !0,
                        r = null != e && e + "queueHooks",
                        s = J.timers,
                        a = vt.get(this);
                    if (r) a[r] && a[r].stop && n(a[r]);
                    else
                        for (r in a) a[r] && a[r].stop && ei.test(r) && n(a[r]);
                    for (r = s.length; r--;) s[r].elem !== this || null != e && s[r].queue !== e || (s[r].anim.stop(i), t = !1, s.splice(r, 1));
                    (t || !i) && J.dequeue(this, e)
                })
            },
            finish: function(e) {
                return e !== !1 && (e = e || "fx"), this.each(function() {
                    var t, i = vt.get(this),
                        n = i[e + "queue"],
                        r = i[e + "queueHooks"],
                        s = J.timers,
                        a = n ? n.length : 0;
                    for (i.finish = !0, J.queue(this, e, []), r && r.stop && r.stop.call(this, !0), t = s.length; t--;) s[t].elem === this && s[t].queue === e && (s[t].anim.stop(!0), s.splice(t, 1));
                    for (t = 0; a > t; t++) n[t] && n[t].finish && n[t].finish.call(this);
                    delete i.finish
                })
            }
        }), J.each(["toggle", "show", "hide"], function(e, t) {
            var i = J.fn[t];
            J.fn[t] = function(e, n, r) {
                return null == e || "boolean" == typeof e ? i.apply(this, arguments) : this.animate(E(t, !0), e, n, r)
            }
        }), J.each({
            slideDown: E("show"),
            slideUp: E("hide"),
            slideToggle: E("toggle"),
            fadeIn: {
                opacity: "show"
            },
            fadeOut: {
                opacity: "hide"
            },
            fadeToggle: {
                opacity: "toggle"
            }
        }, function(e, t) {
            J.fn[e] = function(e, i, n) {
                return this.animate(t, e, i, n)
            }
        }), J.timers = [], J.fx.tick = function() {
            var e, t = 0,
                i = J.timers;
            for (Qt = J.now(); t < i.length; t++) e = i[t], e() || i[t] !== e || i.splice(t--, 1);
            i.length || J.fx.stop(), Qt = void 0
        }, J.fx.timer = function(e) {
            J.timers.push(e), e() ? J.fx.start() : J.timers.pop()
        }, J.fx.interval = 13, J.fx.start = function() {
            Kt || (Kt = setInterval(J.fx.tick, J.fx.interval))
        }, J.fx.stop = function() {
            clearInterval(Kt), Kt = null
        }, J.fx.speeds = {
            slow: 600,
            fast: 200,
            _default: 400
        }, J.fn.delay = function(e, t) {
            return e = J.fx ? J.fx.speeds[e] || e : e, t = t || "fx", this.queue(t, function(t, i) {
                var n = setTimeout(t, e);
                i.stop = function() {
                    clearTimeout(n)
                }
            })
        },
        function() {
            var e = K.createElement("input"),
                t = K.createElement("select"),
                i = t.appendChild(K.createElement("option"));
            e.type = "checkbox", Q.checkOn = "" !== e.value, Q.optSelected = i.selected, t.disabled = !0, Q.optDisabled = !i.disabled, e = K.createElement("input"), e.value = "t", e.type = "radio", Q.radioValue = "t" === e.value
        }();
    var ni, ri, si = J.expr.attrHandle;
    J.fn.extend({
        attr: function(e, t) {
            return gt(this, J.attr, e, t, arguments.length > 1)
        },
        removeAttr: function(e) {
            return this.each(function() {
                J.removeAttr(this, e)
            })
        }
    }), J.extend({
        attr: function(e, t, i) {
            var n, r, s = e.nodeType;
            return e && 3 !== s && 8 !== s && 2 !== s ? typeof e.getAttribute === Ct ? J.prop(e, t, i) : (1 === s && J.isXMLDoc(e) || (t = t.toLowerCase(), n = J.attrHooks[t] || (J.expr.match.bool.test(t) ? ri : ni)), void 0 === i ? n && "get" in n && null !== (r = n.get(e, t)) ? r : (r = J.find.attr(e, t), null == r ? void 0 : r) : null !== i ? n && "set" in n && void 0 !== (r = n.set(e, i, t)) ? r : (e.setAttribute(t, i + ""), i) : void J.removeAttr(e, t)) : void 0
        },
        removeAttr: function(e, t) {
            var i, n, r = 0,
                s = t && t.match(dt);
            if (s && 1 === e.nodeType)
                for (; i = s[r++];) n = J.propFix[i] || i, J.expr.match.bool.test(i) && (e[n] = !1), e.removeAttribute(i)
        },
        attrHooks: {
            type: {
                set: function(e, t) {
                    if (!Q.radioValue && "radio" === t && J.nodeName(e, "input")) {
                        var i = e.value;
                        return e.setAttribute("type", t), i && (e.value = i), t
                    }
                }
            }
        }
    }), ri = {
        set: function(e, t, i) {
            return t === !1 ? J.removeAttr(e, i) : e.setAttribute(i, i), i
        }
    }, J.each(J.expr.match.bool.source.match(/\w+/g), function(e, t) {
        var i = si[t] || J.find.attr;
        si[t] = function(e, t, n) {
            var r, s;
            return n || (s = si[t], si[t] = r, r = null != i(e, t, n) ? t.toLowerCase() : null, si[t] = s), r
        }
    });
    var ai = /^(?:input|select|textarea|button)$/i;
    J.fn.extend({
        prop: function(e, t) {
            return gt(this, J.prop, e, t, arguments.length > 1)
        },
        removeProp: function(e) {
            return this.each(function() {
                delete this[J.propFix[e] || e]
            })
        }
    }), J.extend({
        propFix: {
            "for": "htmlFor",
            "class": "className"
        },
        prop: function(e, t, i) {
            var n, r, s, a = e.nodeType;
            return e && 3 !== a && 8 !== a && 2 !== a ? (s = 1 !== a || !J.isXMLDoc(e), s && (t = J.propFix[t] || t, r = J.propHooks[t]), void 0 !== i ? r && "set" in r && void 0 !== (n = r.set(e, i, t)) ? n : e[t] = i : r && "get" in r && null !== (n = r.get(e, t)) ? n : e[t]) : void 0
        },
        propHooks: {
            tabIndex: {
                get: function(e) {
                    return e.hasAttribute("tabindex") || ai.test(e.nodeName) || e.href ? e.tabIndex : -1
                }
            }
        }
    }), Q.optSelected || (J.propHooks.selected = {
        get: function(e) {
            var t = e.parentNode;
            return t && t.parentNode && t.parentNode.selectedIndex, null
        }
    }), J.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
        J.propFix[this.toLowerCase()] = this
    });
    var oi = /[\t\r\n\f]/g;
    J.fn.extend({
        addClass: function(e) {
            var t, i, n, r, s, a, o = "string" == typeof e && e,
                l = 0,
                u = this.length;
            if (J.isFunction(e)) return this.each(function(t) {
                J(this).addClass(e.call(this, t, this.className))
            });
            if (o)
                for (t = (e || "").match(dt) || []; u > l; l++)
                    if (i = this[l], n = 1 === i.nodeType && (i.className ? (" " + i.className + " ").replace(oi, " ") : " ")) {
                        for (s = 0; r = t[s++];) n.indexOf(" " + r + " ") < 0 && (n += r + " ");
                        a = J.trim(n), i.className !== a && (i.className = a)
                    }
            return this
        },
        removeClass: function(e) {
            var t, i, n, r, s, a, o = 0 === arguments.length || "string" == typeof e && e,
                l = 0,
                u = this.length;
            if (J.isFunction(e)) return this.each(function(t) {
                J(this).removeClass(e.call(this, t, this.className))
            });
            if (o)
                for (t = (e || "").match(dt) || []; u > l; l++)
                    if (i = this[l], n = 1 === i.nodeType && (i.className ? (" " + i.className + " ").replace(oi, " ") : "")) {
                        for (s = 0; r = t[s++];)
                            for (; n.indexOf(" " + r + " ") >= 0;) n = n.replace(" " + r + " ", " ");
                        a = e ? J.trim(n) : "", i.className !== a && (i.className = a)
                    }
            return this
        },
        toggleClass: function(e, t) {
            var i = typeof e;
            return "boolean" == typeof t && "string" === i ? t ? this.addClass(e) : this.removeClass(e) : this.each(J.isFunction(e) ? function(i) {
                J(this).toggleClass(e.call(this, i, this.className, t), t)
            } : function() {
                if ("string" === i)
                    for (var t, n = 0, r = J(this), s = e.match(dt) || []; t = s[n++];) r.hasClass(t) ? r.removeClass(t) : r.addClass(t);
                else(i === Ct || "boolean" === i) && (this.className && vt.set(this, "__className__", this.className), this.className = this.className || e === !1 ? "" : vt.get(this, "__className__") || "")
            })
        },
        hasClass: function(e) {
            for (var t = " " + e + " ", i = 0, n = this.length; n > i; i++)
                if (1 === this[i].nodeType && (" " + this[i].className + " ").replace(oi, " ").indexOf(t) >= 0) return !0;
            return !1
        }
    });
    var li = /\r/g;
    J.fn.extend({
        val: function(e) {
            var t, i, n, r = this[0];
            return arguments.length ? (n = J.isFunction(e), this.each(function(i) {
                var r;
                1 === this.nodeType && (r = n ? e.call(this, i, J(this).val()) : e, null == r ? r = "" : "number" == typeof r ? r += "" : J.isArray(r) && (r = J.map(r, function(e) {
                    return null == e ? "" : e + ""
                })), t = J.valHooks[this.type] || J.valHooks[this.nodeName.toLowerCase()], t && "set" in t && void 0 !== t.set(this, r, "value") || (this.value = r))
            })) : r ? (t = J.valHooks[r.type] || J.valHooks[r.nodeName.toLowerCase()], t && "get" in t && void 0 !== (i = t.get(r, "value")) ? i : (i = r.value, "string" == typeof i ? i.replace(li, "") : null == i ? "" : i)) : void 0
        }
    }), J.extend({
        valHooks: {
            option: {
                get: function(e) {
                    var t = J.find.attr(e, "value");
                    return null != t ? t : J.trim(J.text(e))
                }
            },
            select: {
                get: function(e) {
                    for (var t, i, n = e.options, r = e.selectedIndex, s = "select-one" === e.type || 0 > r, a = s ? null : [], o = s ? r + 1 : n.length, l = 0 > r ? o : s ? r : 0; o > l; l++)
                        if (i = n[l], !(!i.selected && l !== r || (Q.optDisabled ? i.disabled : null !== i.getAttribute("disabled")) || i.parentNode.disabled && J.nodeName(i.parentNode, "optgroup"))) {
                            if (t = J(i).val(), s) return t;
                            a.push(t)
                        }
                    return a
                },
                set: function(e, t) {
                    for (var i, n, r = e.options, s = J.makeArray(t), a = r.length; a--;) n = r[a], (n.selected = J.inArray(n.value, s) >= 0) && (i = !0);
                    return i || (e.selectedIndex = -1), s
                }
            }
        }
    }), J.each(["radio", "checkbox"], function() {
        J.valHooks[this] = {
            set: function(e, t) {
                return J.isArray(t) ? e.checked = J.inArray(J(e).val(), t) >= 0 : void 0
            }
        }, Q.checkOn || (J.valHooks[this].get = function(e) {
            return null === e.getAttribute("value") ? "on" : e.value
        })
    }), J.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(e, t) {
        J.fn[t] = function(e, i) {
            return arguments.length > 0 ? this.on(t, null, e, i) : this.trigger(t)
        }
    }), J.fn.extend({
        hover: function(e, t) {
            return this.mouseenter(e).mouseleave(t || e)
        },
        bind: function(e, t, i) {
            return this.on(e, null, t, i)
        },
        unbind: function(e, t) {
            return this.off(e, null, t)
        },
        delegate: function(e, t, i, n) {
            return this.on(t, e, i, n)
        },
        undelegate: function(e, t, i) {
            return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", i)
        }
    });
    var ui = J.now(),
        pi = /\?/;
    J.parseJSON = function(e) {
        return JSON.parse(e + "")
    }, J.parseXML = function(e) {
        var t, i;
        if (!e || "string" != typeof e) return null;
        try {
            i = new DOMParser, t = i.parseFromString(e, "text/xml")
        } catch (n) {
            t = void 0
        }
        return (!t || t.getElementsByTagName("parsererror").length) && J.error("Invalid XML: " + e), t
    };
    var ci, hi, di = /#.*$/,
        fi = /([?&])_=[^&]*/,
        mi = /^(.*?):[ \t]*([^\r\n]*)$/gm,
        gi = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
        vi = /^(?:GET|HEAD)$/,
        _i = /^\/\//,
        yi = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
        wi = {},
        xi = {},
        Ti = "*/".concat("*");
    try {
        hi = location.href
    } catch (bi) {
        hi = K.createElement("a"), hi.href = "", hi = hi.href
    }
    ci = yi.exec(hi.toLowerCase()) || [], J.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: hi,
            type: "GET",
            isLocal: gi.test(ci[1]),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": Ti,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": J.parseJSON,
                "text xml": J.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(e, t) {
            return t ? z(z(e, J.ajaxSettings), t) : z(J.ajaxSettings, e)
        },
        ajaxPrefilter: N(wi),
        ajaxTransport: N(xi),
        ajax: function(e, t) {
            function i(e, t, i, a) {
                var l, p, v, _, w, T = t;
                2 !== y && (y = 2, o && clearTimeout(o), n = void 0, s = a || "", x.readyState = e > 0 ? 4 : 0, l = e >= 200 && 300 > e || 304 === e, i && (_ = j(c, x, i)), _ = F(c, _, x, l), l ? (c.ifModified && (w = x.getResponseHeader("Last-Modified"), w && (J.lastModified[r] = w), w = x.getResponseHeader("etag"), w && (J.etag[r] = w)), 204 === e || "HEAD" === c.type ? T = "nocontent" : 304 === e ? T = "notmodified" : (T = _.state, p = _.data, v = _.error, l = !v)) : (v = T, (e || !T) && (T = "error", 0 > e && (e = 0))), x.status = e, x.statusText = (t || T) + "", l ? f.resolveWith(h, [p, T, x]) : f.rejectWith(h, [x, T, v]), x.statusCode(g), g = void 0, u && d.trigger(l ? "ajaxSuccess" : "ajaxError", [x, c, l ? p : v]), m.fireWith(h, [x, T]), u && (d.trigger("ajaxComplete", [x, c]), --J.active || J.event.trigger("ajaxStop")))
            }
            "object" == typeof e && (t = e, e = void 0), t = t || {};
            var n, r, s, a, o, l, u, p, c = J.ajaxSetup({}, t),
                h = c.context || c,
                d = c.context && (h.nodeType || h.jquery) ? J(h) : J.event,
                f = J.Deferred(),
                m = J.Callbacks("once memory"),
                g = c.statusCode || {},
                v = {},
                _ = {},
                y = 0,
                w = "canceled",
                x = {
                    readyState: 0,
                    getResponseHeader: function(e) {
                        var t;
                        if (2 === y) {
                            if (!a)
                                for (a = {}; t = mi.exec(s);) a[t[1].toLowerCase()] = t[2];
                            t = a[e.toLowerCase()]
                        }
                        return null == t ? null : t
                    },
                    getAllResponseHeaders: function() {
                        return 2 === y ? s : null
                    },
                    setRequestHeader: function(e, t) {
                        var i = e.toLowerCase();
                        return y || (e = _[i] = _[i] || e, v[e] = t), this
                    },
                    overrideMimeType: function(e) {
                        return y || (c.mimeType = e), this
                    },
                    statusCode: function(e) {
                        var t;
                        if (e)
                            if (2 > y)
                                for (t in e) g[t] = [g[t], e[t]];
                            else x.always(e[x.status]);
                        return this
                    },
                    abort: function(e) {
                        var t = e || w;
                        return n && n.abort(t), i(0, t), this
                    }
                };
            if (f.promise(x).complete = m.add, x.success = x.done, x.error = x.fail, c.url = ((e || c.url || hi) + "").replace(di, "").replace(_i, ci[1] + "//"), c.type = t.method || t.type || c.method || c.type, c.dataTypes = J.trim(c.dataType || "*").toLowerCase().match(dt) || [""], null == c.crossDomain && (l = yi.exec(c.url.toLowerCase()), c.crossDomain = !(!l || l[1] === ci[1] && l[2] === ci[2] && (l[3] || ("http:" === l[1] ? "80" : "443")) === (ci[3] || ("http:" === ci[1] ? "80" : "443")))), c.data && c.processData && "string" != typeof c.data && (c.data = J.param(c.data, c.traditional)), I(wi, c, t, x), 2 === y) return x;
            u = c.global, u && 0 === J.active++ && J.event.trigger("ajaxStart"), c.type = c.type.toUpperCase(), c.hasContent = !vi.test(c.type), r = c.url, c.hasContent || (c.data && (r = c.url += (pi.test(r) ? "&" : "?") + c.data, delete c.data), c.cache === !1 && (c.url = fi.test(r) ? r.replace(fi, "$1_=" + ui++) : r + (pi.test(r) ? "&" : "?") + "_=" + ui++)), c.ifModified && (J.lastModified[r] && x.setRequestHeader("If-Modified-Since", J.lastModified[r]), J.etag[r] && x.setRequestHeader("If-None-Match", J.etag[r])), (c.data && c.hasContent && c.contentType !== !1 || t.contentType) && x.setRequestHeader("Content-Type", c.contentType), x.setRequestHeader("Accept", c.dataTypes[0] && c.accepts[c.dataTypes[0]] ? c.accepts[c.dataTypes[0]] + ("*" !== c.dataTypes[0] ? ", " + Ti + "; q=0.01" : "") : c.accepts["*"]);
            for (p in c.headers) x.setRequestHeader(p, c.headers[p]);
            if (c.beforeSend && (c.beforeSend.call(h, x, c) === !1 || 2 === y)) return x.abort();
            w = "abort";
            for (p in {
                    success: 1,
                    error: 1,
                    complete: 1
                }) x[p](c[p]);
            if (n = I(xi, c, t, x)) {
                x.readyState = 1, u && d.trigger("ajaxSend", [x, c]), c.async && c.timeout > 0 && (o = setTimeout(function() {
                    x.abort("timeout")
                }, c.timeout));
                try {
                    y = 1, n.send(v, i)
                } catch (T) {
                    if (!(2 > y)) throw T;
                    i(-1, T)
                }
            } else i(-1, "No Transport");
            return x
        },
        getJSON: function(e, t, i) {
            return J.get(e, t, i, "json")
        },
        getScript: function(e, t) {
            return J.get(e, void 0, t, "script")
        }
    }), J.each(["get", "post"], function(e, t) {
        J[t] = function(e, i, n, r) {
            return J.isFunction(i) && (r = r || n, n = i, i = void 0), J.ajax({
                url: e,
                type: t,
                dataType: r,
                data: i,
                success: n
            })
        }
    }), J.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(e, t) {
        J.fn[t] = function(e) {
            return this.on(t, e)
        }
    }), J._evalUrl = function(e) {
        return J.ajax({
            url: e,
            type: "GET",
            dataType: "script",
            async: !1,
            global: !1,
            "throws": !0
        })
    }, J.fn.extend({
        wrapAll: function(e) {
            var t;
            return J.isFunction(e) ? this.each(function(t) {
                J(this).wrapAll(e.call(this, t))
            }) : (this[0] && (t = J(e, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && t.insertBefore(this[0]), t.map(function() {
                for (var e = this; e.firstElementChild;) e = e.firstElementChild;
                return e
            }).append(this)), this)
        },
        wrapInner: function(e) {
            return this.each(J.isFunction(e) ? function(t) {
                J(this).wrapInner(e.call(this, t))
            } : function() {
                var t = J(this),
                    i = t.contents();
                i.length ? i.wrapAll(e) : t.append(e)
            })
        },
        wrap: function(e) {
            var t = J.isFunction(e);
            return this.each(function(i) {
                J(this).wrapAll(t ? e.call(this, i) : e)
            })
        },
        unwrap: function() {
            return this.parent().each(function() {
                J.nodeName(this, "body") || J(this).replaceWith(this.childNodes)
            }).end()
        }
    }), J.expr.filters.hidden = function(e) {
        return e.offsetWidth <= 0 && e.offsetHeight <= 0
    }, J.expr.filters.visible = function(e) {
        return !J.expr.filters.hidden(e)
    };
    var Si = /%20/g,
        Ci = /\[\]$/,
        Pi = /\r?\n/g,
        ki = /^(?:submit|button|image|reset|file)$/i,
        Mi = /^(?:input|select|textarea|keygen)/i;
    J.param = function(e, t) {
        var i, n = [],
            r = function(e, t) {
                t = J.isFunction(t) ? t() : null == t ? "" : t, n[n.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
            };
        if (void 0 === t && (t = J.ajaxSettings && J.ajaxSettings.traditional), J.isArray(e) || e.jquery && !J.isPlainObject(e)) J.each(e, function() {
            r(this.name, this.value)
        });
        else
            for (i in e) B(i, e[i], t, r);
        return n.join("&").replace(Si, "+")
    }, J.fn.extend({
        serialize: function() {
            return J.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                var e = J.prop(this, "elements");
                return e ? J.makeArray(e) : this
            }).filter(function() {
                var e = this.type;
                return this.name && !J(this).is(":disabled") && Mi.test(this.nodeName) && !ki.test(e) && (this.checked || !St.test(e))
            }).map(function(e, t) {
                var i = J(this).val();
                return null == i ? null : J.isArray(i) ? J.map(i, function(e) {
                    return {
                        name: t.name,
                        value: e.replace(Pi, "\r\n")
                    }
                }) : {
                    name: t.name,
                    value: i.replace(Pi, "\r\n")
                }
            }).get()
        }
    }), J.ajaxSettings.xhr = function() {
        try {
            return new XMLHttpRequest
        } catch (e) {}
    };
    var Di = 0,
        Ei = {},
        Ai = {
            0: 200,
            1223: 204
        },
        Oi = J.ajaxSettings.xhr();
    e.ActiveXObject && J(e).on("unload", function() {
        for (var e in Ei) Ei[e]()
    }), Q.cors = !!Oi && "withCredentials" in Oi, Q.ajax = Oi = !!Oi, J.ajaxTransport(function(e) {
        var t;
        return Q.cors || Oi && !e.crossDomain ? {
            send: function(i, n) {
                var r, s = e.xhr(),
                    a = ++Di;
                if (s.open(e.type, e.url, e.async, e.username, e.password), e.xhrFields)
                    for (r in e.xhrFields) s[r] = e.xhrFields[r];
                e.mimeType && s.overrideMimeType && s.overrideMimeType(e.mimeType), e.crossDomain || i["X-Requested-With"] || (i["X-Requested-With"] = "XMLHttpRequest");
                for (r in i) s.setRequestHeader(r, i[r]);
                t = function(e) {
                    return function() {
                        t && (delete Ei[a], t = s.onload = s.onerror = null, "abort" === e ? s.abort() : "error" === e ? n(s.status, s.statusText) : n(Ai[s.status] || s.status, s.statusText, "string" == typeof s.responseText ? {
                            text: s.responseText
                        } : void 0, s.getAllResponseHeaders()))
                    }
                }, s.onload = t(), s.onerror = t("error"), t = Ei[a] = t("abort");
                try {
                    s.send(e.hasContent && e.data || null)
                } catch (o) {
                    if (t) throw o
                }
            },
            abort: function() {
                t && t()
            }
        } : void 0
    }), J.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /(?:java|ecma)script/
        },
        converters: {
            "text script": function(e) {
                return J.globalEval(e), e
            }
        }
    }), J.ajaxPrefilter("script", function(e) {
        void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET")
    }), J.ajaxTransport("script", function(e) {
        if (e.crossDomain) {
            var t, i;
            return {
                send: function(n, r) {
                    t = J("<script>").prop({
                        async: !0,
                        charset: e.scriptCharset,
                        src: e.url
                    }).on("load error", i = function(e) {
                        t.remove(), i = null, e && r("error" === e.type ? 404 : 200, e.type)
                    }), K.head.appendChild(t[0])
                },
                abort: function() {
                    i && i()
                }
            }
        }
    });
    var Ri = [],
        Li = /(=)\?(?=&|$)|\?\?/;
    J.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var e = Ri.pop() || J.expando + "_" + ui++;
            return this[e] = !0, e
        }
    }), J.ajaxPrefilter("json jsonp", function(t, i, n) {
        var r, s, a, o = t.jsonp !== !1 && (Li.test(t.url) ? "url" : "string" == typeof t.data && !(t.contentType || "").indexOf("application/x-www-form-urlencoded") && Li.test(t.data) && "data");
        return o || "jsonp" === t.dataTypes[0] ? (r = t.jsonpCallback = J.isFunction(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback, o ? t[o] = t[o].replace(Li, "$1" + r) : t.jsonp !== !1 && (t.url += (pi.test(t.url) ? "&" : "?") + t.jsonp + "=" + r), t.converters["script json"] = function() {
            return a || J.error(r + " was not called"), a[0]
        }, t.dataTypes[0] = "json", s = e[r], e[r] = function() {
            a = arguments
        }, n.always(function() {
            e[r] = s, t[r] && (t.jsonpCallback = i.jsonpCallback, Ri.push(r)), a && J.isFunction(s) && s(a[0]), a = s = void 0
        }), "script") : void 0
    }), J.parseHTML = function(e, t, i) {
        if (!e || "string" != typeof e) return null;
        "boolean" == typeof t && (i = t, t = !1), t = t || K;
        var n = at.exec(e),
            r = !i && [];
        return n ? [t.createElement(n[1])] : (n = J.buildFragment([e], t, r), r && r.length && J(r).remove(), J.merge([], n.childNodes))
    };
    var Ni = J.fn.load;
    J.fn.load = function(e, t, i) {
        if ("string" != typeof e && Ni) return Ni.apply(this, arguments);
        var n, r, s, a = this,
            o = e.indexOf(" ");
        return o >= 0 && (n = J.trim(e.slice(o)), e = e.slice(0, o)), J.isFunction(t) ? (i = t, t = void 0) : t && "object" == typeof t && (r = "POST"), a.length > 0 && J.ajax({
            url: e,
            type: r,
            dataType: "html",
            data: t
        }).done(function(e) {
            s = arguments, a.html(n ? J("<div>").append(J.parseHTML(e)).find(n) : e)
        }).complete(i && function(e, t) {
            a.each(i, s || [e.responseText, t, e])
        }), this
    }, J.expr.filters.animated = function(e) {
        return J.grep(J.timers, function(t) {
            return e === t.elem
        }).length
    };
    var Ii = e.document.documentElement;
    J.offset = {
        setOffset: function(e, t, i) {
            var n, r, s, a, o, l, u, p = J.css(e, "position"),
                c = J(e),
                h = {};
            "static" === p && (e.style.position = "relative"), o = c.offset(), s = J.css(e, "top"), l = J.css(e, "left"), u = ("absolute" === p || "fixed" === p) && (s + l).indexOf("auto") > -1, u ? (n = c.position(), a = n.top, r = n.left) : (a = parseFloat(s) || 0, r = parseFloat(l) || 0), J.isFunction(t) && (t = t.call(e, i, o)), null != t.top && (h.top = t.top - o.top + a), null != t.left && (h.left = t.left - o.left + r), "using" in t ? t.using.call(e, h) : c.css(h)
        }
    }, J.fn.extend({
        offset: function(e) {
            if (arguments.length) return void 0 === e ? this : this.each(function(t) {
                J.offset.setOffset(this, e, t)
            });
            var t, i, n = this[0],
                r = {
                    top: 0,
                    left: 0
                },
                s = n && n.ownerDocument;
            return s ? (t = s.documentElement, J.contains(t, n) ? (typeof n.getBoundingClientRect !== Ct && (r = n.getBoundingClientRect()), i = W(s), {
                top: r.top + i.pageYOffset - t.clientTop,
                left: r.left + i.pageXOffset - t.clientLeft
            }) : r) : void 0
        },
        position: function() {
            if (this[0]) {
                var e, t, i = this[0],
                    n = {
                        top: 0,
                        left: 0
                    };
                return "fixed" === J.css(i, "position") ? t = i.getBoundingClientRect() : (e = this.offsetParent(), t = this.offset(), J.nodeName(e[0], "html") || (n = e.offset()), n.top += J.css(e[0], "borderTopWidth", !0), n.left += J.css(e[0], "borderLeftWidth", !0)), {
                    top: t.top - n.top - J.css(i, "marginTop", !0),
                    left: t.left - n.left - J.css(i, "marginLeft", !0)
                }
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var e = this.offsetParent || Ii; e && !J.nodeName(e, "html") && "static" === J.css(e, "position");) e = e.offsetParent;
                return e || Ii
            })
        }
    }), J.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(t, i) {
        var n = "pageYOffset" === i;
        J.fn[t] = function(r) {
            return gt(this, function(t, r, s) {
                var a = W(t);
                return void 0 === s ? a ? a[i] : t[r] : void(a ? a.scrollTo(n ? e.pageXOffset : s, n ? s : e.pageYOffset) : t[r] = s)
            }, t, r, arguments.length, null)
        }
    }), J.each(["top", "left"], function(e, t) {
        J.cssHooks[t] = T(Q.pixelPosition, function(e, i) {
            return i ? (i = x(e, t), $t.test(i) ? J(e).position()[t] + "px" : i) : void 0
        })
    }), J.each({
        Height: "height",
        Width: "width"
    }, function(e, t) {
        J.each({
            padding: "inner" + e,
            content: t,
            "": "outer" + e
        }, function(i, n) {
            J.fn[n] = function(n, r) {
                var s = arguments.length && (i || "boolean" != typeof n),
                    a = i || (n === !0 || r === !0 ? "margin" : "border");
                return gt(this, function(t, i, n) {
                    var r;
                    return J.isWindow(t) ? t.document.documentElement["client" + e] : 9 === t.nodeType ? (r = t.documentElement, Math.max(t.body["scroll" + e], r["scroll" + e], t.body["offset" + e], r["offset" + e], r["client" + e])) : void 0 === n ? J.css(t, i, a) : J.style(t, i, n, a)
                }, t, s ? n : void 0, s, null)
            }
        })
    }), J.fn.size = function() {
        return this.length
    }, J.fn.andSelf = J.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function() {
        return J
    });
    var zi = e.jQuery,
        ji = e.$;
    return J.noConflict = function(t) {
        return e.$ === J && (e.$ = ji), t && e.jQuery === J && (e.jQuery = zi), J
    }, typeof t === Ct && (e.jQuery = e.$ = J), J
});
var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;
! function(e) {
    "use strict";
    var t = e.GreenSockGlobals || e,
        i = function(e) {
            var i, n = e.split("."),
                r = t;
            for (i = 0; n.length > i; i++) r[n[i]] = r = r[n[i]] || {};
            return r
        },
        n = i("com.greensock.utils"),
        r = function(e) {
            var t = e.nodeType,
                i = "";
            if (1 === t || 9 === t || 11 === t) {
                if ("string" == typeof e.textContent) return e.textContent;
                for (e = e.firstChild; e; e = e.nextSibling) i += r(e)
            } else if (3 === t || 4 === t) return e.nodeValue;
            return i
        },
        s = document,
        a = s.defaultView ? s.defaultView.getComputedStyle : function() {},
        o = /([A-Z])/g,
        l = function(e, t, i, n) {
            var r;
            return (i = i || a(e, null)) ? (e = i.getPropertyValue(t.replace(o, "-$1").toLowerCase()), r = e || i.length ? e : i[t]) : e.currentStyle && (i = e.currentStyle, r = i[t]), n ? r : parseInt(r, 10) || 0
        },
        u = function(e) {
            return e.length && e[0] && (e[0].nodeType && e[0].style && !e.nodeType || e[0].length && e[0][0]) ? !0 : !1
        },
        p = function(e) {
            var t, i, n, r = [],
                s = e.length;
            for (t = 0; s > t; t++)
                if (i = e[t], u(i))
                    for (n = i.length, n = 0; i.length > n; n++) r.push(i[n]);
                else r.push(i);
            return r
        },
        c = ")eefec303079ad17405c",
        h = /(?:<br>|<br\/>|<br \/>)/gi,
        d = s.all && !s.addEventListener,
        f = "<div style='position:relative;display:inline-block;" + (d ? "*display:inline;*zoom:1;'" : "'"),
        m = function(e) {
            e = e || "";
            var t = -1 !== e.indexOf("++"),
                i = 1;
            return t && (e = e.split("++").join("")),
                function() {
                    return f + (e ? " class='" + e + (t ? i++ : "") + "'>" : ">")
                }
        },
        g = n.SplitText = t.SplitText = function(e, t) {
            if ("string" == typeof e && (e = g.selector(e)), !e) throw "cannot split a null element.";
            this.elements = u(e) ? p(e) : [e], this.chars = [], this.words = [], this.lines = [], this._originals = [], this.vars = t || {}, this.split(t)
        },
        v = function(e, t, i) {
            var n = e.nodeType;
            if (1 === n || 9 === n || 11 === n)
                for (e = e.firstChild; e; e = e.nextSibling) v(e, t, i);
            else(3 === n || 4 === n) && (e.nodeValue = e.nodeValue.split(t).join(i))
        },
        _ = function(e, t) {
            for (var i = t.length; --i > -1;) e.push(t[i])
        },
        y = function(e, t, i, n, o) {
            h.test(e.innerHTML) && (e.innerHTML = e.innerHTML.replace(h, c));
            var u, p, d, f, g, y, w, x, T, b, S, C, P, k, M = r(e),
                D = t.type || t.split || "chars,words,lines",
                E = -1 !== D.indexOf("lines") ? [] : null,
                A = -1 !== D.indexOf("words"),
                O = -1 !== D.indexOf("chars"),
                R = "absolute" === t.position || t.absolute === !0,
                L = R ? "&#173; " : " ",
                N = -999,
                I = a(e),
                z = l(e, "paddingLeft", I),
                j = l(e, "borderBottomWidth", I) + l(e, "borderTopWidth", I),
                F = l(e, "borderLeftWidth", I) + l(e, "borderRightWidth", I),
                B = l(e, "paddingTop", I) + l(e, "paddingBottom", I),
                W = l(e, "paddingLeft", I) + l(e, "paddingRight", I),
                $ = l(e, "textAlign", I, !0),
                X = e.clientHeight,
                H = e.clientWidth,
                q = "</div>",
                Y = m(t.wordsClass),
                G = m(t.charsClass),
                V = -1 !== (t.linesClass || "").indexOf("++"),
                U = t.linesClass,
                Q = -1 !== M.indexOf("<"),
                K = !0,
                Z = [],
                J = [],
                et = [];
            for (V && (U = U.split("++").join("")), Q && (M = M.split("<").join("{{LT}}")), u = M.length, f = Y(), g = 0; u > g; g++)
                if (w = M.charAt(g), ")" === w && M.substr(g, 20) === c) f += (K ? q : "") + "<BR/>", K = !1, g !== u - 20 && M.substr(g + 20, 20) !== c && (f += " " + Y(), K = !0), g += 19;
                else if (" " === w && " " !== M.charAt(g - 1) && g !== u - 1 && M.substr(g - 20, 20) !== c) {
                for (f += K ? q : "", K = !1;
                    " " === M.charAt(g + 1);) f += L, g++;
                (")" !== M.charAt(g + 1) || M.substr(g + 1, 20) !== c) && (f += L + Y(), K = !0)
            } else f += O && " " !== w ? G() + w + "</div>" : w;
            for (e.innerHTML = f + (K ? q : ""), Q && v(e, "{{LT}}", "<"), y = e.getElementsByTagName("*"), u = y.length, x = [], g = 0; u > g; g++) x[g] = y[g];
            if (E || R)
                for (g = 0; u > g; g++) T = x[g], d = T.parentNode === e, (d || R || O && !A) && (b = T.offsetTop, E && d && b !== N && "BR" !== T.nodeName && (p = [], E.push(p), N = b), R && (T._x = T.offsetLeft, T._y = b, T._w = T.offsetWidth, T._h = T.offsetHeight), E && (A !== d && O || (p.push(T), T._x -= z), d && g && (x[g - 1]._wordEnd = !0), "BR" === T.nodeName && T.nextSibling && "BR" === T.nextSibling.nodeName && E.push([])));
            for (g = 0; u > g; g++) T = x[g], d = T.parentNode === e, "BR" !== T.nodeName ? (R && (C = T.style, A || d || (T._x += T.parentNode._x, T._y += T.parentNode._y), C.left = T._x + "px", C.top = T._y + "px", C.position = "absolute", C.display = "block", C.width = T._w + 1 + "px", C.height = T._h + "px"), A ? d && "" !== T.innerHTML ? J.push(T) : O && Z.push(T) : d ? (e.removeChild(T), x.splice(g--, 1), u--) : !d && O && (b = !E && !R && T.nextSibling, e.appendChild(T), b || e.appendChild(s.createTextNode(" ")), Z.push(T))) : E || R ? (e.removeChild(T), x.splice(g--, 1), u--) : A || e.appendChild(T);
            if (E) {
                for (R && (S = s.createElement("div"), e.appendChild(S), P = S.offsetWidth + "px", b = S.offsetParent === e ? 0 : e.offsetLeft, e.removeChild(S)), C = e.style.cssText, e.style.cssText = "display:none;"; e.firstChild;) e.removeChild(e.firstChild);
                for (k = !R || !A && !O, g = 0; E.length > g; g++) {
                    for (p = E[g], S = s.createElement("div"), S.style.cssText = "display:block;text-align:" + $ + ";position:" + (R ? "absolute;" : "relative;"), U && (S.className = U + (V ? g + 1 : "")), et.push(S), u = p.length, y = 0; u > y; y++) "BR" !== p[y].nodeName && (T = p[y], S.appendChild(T), k && (T._wordEnd || A) && S.appendChild(s.createTextNode(" ")), R && (0 === y && (S.style.top = T._y + "px", S.style.left = z + b + "px"), T.style.top = "0px", b && (T.style.left = T._x - b + "px")));
                    0 === u && (S.innerHTML = "&nbsp;"), A || O || (S.innerHTML = r(S).split(String.fromCharCode(160)).join(" ")), R && (S.style.width = P, S.style.height = T._h + "px"), e.appendChild(S)
                }
                e.style.cssText = C
            }
            R && (X > e.clientHeight && (e.style.height = X - B + "px", X > e.clientHeight && (e.style.height = X + j + "px")), H > e.clientWidth && (e.style.width = H - W + "px", H > e.clientWidth && (e.style.width = H + F + "px"))), _(i, Z), _(n, J), _(o, et)
        },
        w = g.prototype;
    w.split = function(e) {
        this.isSplit && this.revert(), this.vars = e || this.vars, this._originals.length = this.chars.length = this.words.length = this.lines.length = 0;
        for (var t = this.elements.length; --t > -1;) this._originals[t] = this.elements[t].innerHTML, y(this.elements[t], this.vars, this.chars, this.words, this.lines);
        return this.chars.reverse(), this.words.reverse(), this.lines.reverse(), this.isSplit = !0, this
    }, w.revert = function() {
        if (!this._originals) throw "revert() call wasn't scoped properly.";
        for (var e = this._originals.length; --e > -1;) this.elements[e].innerHTML = this._originals[e];
        return this.chars = [], this.words = [], this.lines = [], this.isSplit = !1, this
    }, g.selector = e.$ || e.jQuery || function(t) {
        var i = e.$ || e.jQuery;
        return i ? (g.selector = i, i(t)) : "undefined" == typeof document ? t : document.querySelectorAll ? document.querySelectorAll(t) : document.getElementById("#" === t.charAt(0) ? t.substr(1) : t)
    }, g.version = "0.3.3"
}(_gsScope),
function(e) {
    "use strict";
    var t = function() {
        return (_gsScope.GreenSockGlobals || _gsScope)[e]
    };
    "function" == typeof define && define.amd ? define(["TweenLite"], t) : "undefined" != typeof module && module.exports && (module.exports = t())
}("SplitText");
var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function() {
        "use strict";
        _gsScope._gsDefine("TweenMax", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function(e, t, i) {
                var n = function(e) {
                        var t, i = [],
                            n = e.length;
                        for (t = 0; t !== n; i.push(e[t++]));
                        return i
                    },
                    r = function(e, t, n) {
                        i.call(this, e, t, n), this._cycle = 0, this._yoyo = this.vars.yoyo === !0, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._dirty = !0, this.render = r.prototype.render
                    },
                    s = 1e-10,
                    a = i._internals,
                    o = a.isSelector,
                    l = a.isArray,
                    u = r.prototype = i.to({}, .1, {}),
                    p = [];
                r.version = "1.13.2", u.constructor = r, u.kill()._gc = !1, r.killTweensOf = r.killDelayedCallsTo = i.killTweensOf, r.getTweensOf = i.getTweensOf, r.lagSmoothing = i.lagSmoothing, r.ticker = i.ticker, r.render = i.render, u.invalidate = function() {
                    return this._yoyo = this.vars.yoyo === !0, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._uncache(!0), i.prototype.invalidate.call(this)
                }, u.updateTo = function(e, t) {
                    var n, r = this.ratio;
                    t && this._startTime < this._timeline._time && (this._startTime = this._timeline._time, this._uncache(!1), this._gc ? this._enabled(!0, !1) : this._timeline.insert(this, this._startTime - this._delay));
                    for (n in e) this.vars[n] = e[n];
                    if (this._initted)
                        if (t) this._initted = !1;
                        else if (this._gc && this._enabled(!0, !1), this._notifyPluginsOfEnabled && this._firstPT && i._onPluginEvent("_onDisable", this), this._time / this._duration > .998) {
                        var s = this._time;
                        this.render(0, !0, !1), this._initted = !1, this.render(s, !0, !1)
                    } else if (this._time > 0) {
                        this._initted = !1, this._init();
                        for (var a, o = 1 / (1 - r), l = this._firstPT; l;) a = l.s + l.c, l.c *= o, l.s = a - l.c, l = l._next
                    }
                    return this
                }, u.render = function(e, t, i) {
                    this._initted || 0 === this._duration && this.vars.repeat && this.invalidate();
                    var n, r, o, l, u, c, h, d, f = this._dirty ? this.totalDuration() : this._totalDuration,
                        m = this._time,
                        g = this._totalTime,
                        v = this._cycle,
                        _ = this._duration,
                        y = this._rawPrevTime;
                    if (e >= f ? (this._totalTime = f, this._cycle = this._repeat, this._yoyo && 0 !== (1 & this._cycle) ? (this._time = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0) : (this._time = _, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1), this._reversed || (n = !0, r = "onComplete"), 0 === _ && (this._initted || !this.vars.lazy || i) && (this._startTime === this._timeline._duration && (e = 0), (0 === e || 0 > y || y === s) && y !== e && (i = !0, y > s && (r = "onReverseComplete")), this._rawPrevTime = d = !t || e || y === e ? e : s)) : 1e-7 > e ? (this._totalTime = this._time = this._cycle = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0, (0 !== g || 0 === _ && y > 0 && y !== s) && (r = "onReverseComplete", n = this._reversed), 0 > e && (this._active = !1, 0 === _ && (this._initted || !this.vars.lazy || i) && (y >= 0 && (i = !0), this._rawPrevTime = d = !t || e || y === e ? e : s)), this._initted || (i = !0)) : (this._totalTime = this._time = e, 0 !== this._repeat && (l = _ + this._repeatDelay, this._cycle = this._totalTime / l >> 0, 0 !== this._cycle && this._cycle === this._totalTime / l && this._cycle--, this._time = this._totalTime - this._cycle * l, this._yoyo && 0 !== (1 & this._cycle) && (this._time = _ - this._time), this._time > _ ? this._time = _ : 0 > this._time && (this._time = 0)), this._easeType ? (u = this._time / _, c = this._easeType, h = this._easePower, (1 === c || 3 === c && u >= .5) && (u = 1 - u), 3 === c && (u *= 2), 1 === h ? u *= u : 2 === h ? u *= u * u : 3 === h ? u *= u * u * u : 4 === h && (u *= u * u * u * u), this.ratio = 1 === c ? 1 - u : 2 === c ? u : .5 > this._time / _ ? u / 2 : 1 - u / 2) : this.ratio = this._ease.getRatio(this._time / _)), m === this._time && !i && v === this._cycle) return void(g !== this._totalTime && this._onUpdate && (t || this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || p)));
                    if (!this._initted) {
                        if (this._init(), !this._initted || this._gc) return;
                        if (!i && this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration)) return this._time = m, this._totalTime = g, this._rawPrevTime = y, this._cycle = v, a.lazyTweens.push(this), void(this._lazy = [e, t]);
                        this._time && !n ? this.ratio = this._ease.getRatio(this._time / _) : n && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1))
                    }
                    for (this._lazy !== !1 && (this._lazy = !1), this._active || !this._paused && this._time !== m && e >= 0 && (this._active = !0), 0 === g && (2 === this._initted && e > 0 && this._init(), this._startAt && (e >= 0 ? this._startAt.render(e, t, i) : r || (r = "_dummyGS")), this.vars.onStart && (0 !== this._totalTime || 0 === _) && (t || this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || p))), o = this._firstPT; o;) o.f ? o.t[o.p](o.c * this.ratio + o.s) : o.t[o.p] = o.c * this.ratio + o.s, o = o._next;
                    this._onUpdate && (0 > e && this._startAt && this._startTime && this._startAt.render(e, t, i), t || (this._totalTime !== g || n) && this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || p)), this._cycle !== v && (t || this._gc || this.vars.onRepeat && this.vars.onRepeat.apply(this.vars.onRepeatScope || this, this.vars.onRepeatParams || p)), r && (!this._gc || i) && (0 > e && this._startAt && !this._onUpdate && this._startTime && this._startAt.render(e, t, i), n && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !t && this.vars[r] && this.vars[r].apply(this.vars[r + "Scope"] || this, this.vars[r + "Params"] || p), 0 === _ && this._rawPrevTime === s && d !== s && (this._rawPrevTime = 0))
                }, r.to = function(e, t, i) {
                    return new r(e, t, i)
                }, r.from = function(e, t, i) {
                    return i.runBackwards = !0, i.immediateRender = 0 != i.immediateRender, new r(e, t, i)
                }, r.fromTo = function(e, t, i, n) {
                    return n.startAt = i, n.immediateRender = 0 != n.immediateRender && 0 != i.immediateRender, new r(e, t, n)
                }, r.staggerTo = r.allTo = function(e, t, s, a, u, c, h) {
                    a = a || 0;
                    var d, f, m, g, v = s.delay || 0,
                        _ = [],
                        y = function() {
                            s.onComplete && s.onComplete.apply(s.onCompleteScope || this, arguments), u.apply(h || this, c || p)
                        };
                    for (l(e) || ("string" == typeof e && (e = i.selector(e) || e), o(e) && (e = n(e))), d = e.length, m = 0; d > m; m++) {
                        f = {};
                        for (g in s) f[g] = s[g];
                        f.delay = v, m === d - 1 && u && (f.onComplete = y), _[m] = new r(e[m], t, f), v += a
                    }
                    return _
                }, r.staggerFrom = r.allFrom = function(e, t, i, n, s, a, o) {
                    return i.runBackwards = !0, i.immediateRender = 0 != i.immediateRender, r.staggerTo(e, t, i, n, s, a, o)
                }, r.staggerFromTo = r.allFromTo = function(e, t, i, n, s, a, o, l) {
                    return n.startAt = i, n.immediateRender = 0 != n.immediateRender && 0 != i.immediateRender, r.staggerTo(e, t, n, s, a, o, l)
                }, r.delayedCall = function(e, t, i, n, s) {
                    return new r(t, 0, {
                        delay: e,
                        onComplete: t,
                        onCompleteParams: i,
                        onCompleteScope: n,
                        onReverseComplete: t,
                        onReverseCompleteParams: i,
                        onReverseCompleteScope: n,
                        immediateRender: !1,
                        useFrames: s,
                        overwrite: 0
                    })
                }, r.set = function(e, t) {
                    return new r(e, 0, t)
                }, r.isTweening = function(e) {
                    return i.getTweensOf(e, !0).length > 0
                };
                var c = function(e, t) {
                        for (var n = [], r = 0, s = e._first; s;) s instanceof i ? n[r++] = s : (t && (n[r++] = s), n = n.concat(c(s, t)), r = n.length), s = s._next;
                        return n
                    },
                    h = r.getAllTweens = function(t) {
                        return c(e._rootTimeline, t).concat(c(e._rootFramesTimeline, t))
                    };
                r.killAll = function(e, i, n, r) {
                    null == i && (i = !0), null == n && (n = !0);
                    var s, a, o, l = h(0 != r),
                        u = l.length,
                        p = i && n && r;
                    for (o = 0; u > o; o++) a = l[o], (p || a instanceof t || (s = a.target === a.vars.onComplete) && n || i && !s) && (e ? a.totalTime(a._reversed ? 0 : a.totalDuration()) : a._enabled(!1, !1))
                }, r.killChildTweensOf = function(e, t) {
                    if (null != e) {
                        var s, u, p, c, h, d = a.tweenLookup;
                        if ("string" == typeof e && (e = i.selector(e) || e), o(e) && (e = n(e)), l(e))
                            for (c = e.length; --c > -1;) r.killChildTweensOf(e[c], t);
                        else {
                            s = [];
                            for (p in d)
                                for (u = d[p].target.parentNode; u;) u === e && (s = s.concat(d[p].tweens)), u = u.parentNode;
                            for (h = s.length, c = 0; h > c; c++) t && s[c].totalTime(s[c].totalDuration()), s[c]._enabled(!1, !1)
                        }
                    }
                };
                var d = function(e, i, n, r) {
                    i = i !== !1, n = n !== !1, r = r !== !1;
                    for (var s, a, o = h(r), l = i && n && r, u = o.length; --u > -1;) a = o[u], (l || a instanceof t || (s = a.target === a.vars.onComplete) && n || i && !s) && a.paused(e)
                };
                return r.pauseAll = function(e, t, i) {
                    d(!0, e, t, i)
                }, r.resumeAll = function(e, t, i) {
                    d(!1, e, t, i)
                }, r.globalTimeScale = function(t) {
                    var n = e._rootTimeline,
                        r = i.ticker.time;
                    return arguments.length ? (t = t || s, n._startTime = r - (r - n._startTime) * n._timeScale / t, n = e._rootFramesTimeline, r = i.ticker.frame, n._startTime = r - (r - n._startTime) * n._timeScale / t, n._timeScale = e._rootTimeline._timeScale = t, t) : n._timeScale
                }, u.progress = function(e) {
                    return arguments.length ? this.totalTime(this.duration() * (this._yoyo && 0 !== (1 & this._cycle) ? 1 - e : e) + this._cycle * (this._duration + this._repeatDelay), !1) : this._time / this.duration()
                }, u.totalProgress = function(e) {
                    return arguments.length ? this.totalTime(this.totalDuration() * e, !1) : this._totalTime / this.totalDuration()
                }, u.time = function(e, t) {
                    return arguments.length ? (this._dirty && this.totalDuration(), e > this._duration && (e = this._duration), this._yoyo && 0 !== (1 & this._cycle) ? e = this._duration - e + this._cycle * (this._duration + this._repeatDelay) : 0 !== this._repeat && (e += this._cycle * (this._duration + this._repeatDelay)), this.totalTime(e, t)) : this._time
                }, u.duration = function(t) {
                    return arguments.length ? e.prototype.duration.call(this, t) : this._duration
                }, u.totalDuration = function(e) {
                    return arguments.length ? -1 === this._repeat ? this : this.duration((e - this._repeat * this._repeatDelay) / (this._repeat + 1)) : (this._dirty && (this._totalDuration = -1 === this._repeat ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat, this._dirty = !1), this._totalDuration)
                }, u.repeat = function(e) {
                    return arguments.length ? (this._repeat = e, this._uncache(!0)) : this._repeat
                }, u.repeatDelay = function(e) {
                    return arguments.length ? (this._repeatDelay = e, this._uncache(!0)) : this._repeatDelay
                }, u.yoyo = function(e) {
                    return arguments.length ? (this._yoyo = e, this) : this._yoyo
                }, r
            }, !0), _gsScope._gsDefine("TimelineLite", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function(e, t, i) {
                var n = function(e) {
                        t.call(this, e), this._labels = {}, this.autoRemoveChildren = this.vars.autoRemoveChildren === !0, this.smoothChildTiming = this.vars.smoothChildTiming === !0, this._sortChildren = !0, this._onUpdate = this.vars.onUpdate;
                        var i, n, r = this.vars;
                        for (n in r) i = r[n], o(i) && -1 !== i.join("").indexOf("{self}") && (r[n] = this._swapSelfInParams(i));
                        o(r.tweens) && this.add(r.tweens, 0, r.align, r.stagger)
                    },
                    r = 1e-10,
                    s = i._internals,
                    a = s.isSelector,
                    o = s.isArray,
                    l = s.lazyTweens,
                    u = s.lazyRender,
                    p = [],
                    c = _gsScope._gsDefine.globals,
                    h = function(e) {
                        var t, i = {};
                        for (t in e) i[t] = e[t];
                        return i
                    },
                    d = function(e, t, i, n) {
                        var r = e._timeline._totalTime;
                        (t || !this._forcingPlayhead) && (e._timeline.pause(e._startTime), t && t.apply(n || e._timeline, i || p), this._forcingPlayhead && e._timeline.seek(r))
                    },
                    f = function(e) {
                        var t, i = [],
                            n = e.length;
                        for (t = 0; t !== n; i.push(e[t++]));
                        return i
                    },
                    m = n.prototype = new t;
                return n.version = "1.13.2", m.constructor = n, m.kill()._gc = m._forcingPlayhead = !1, m.to = function(e, t, n, r) {
                    var s = n.repeat && c.TweenMax || i;
                    return t ? this.add(new s(e, t, n), r) : this.set(e, n, r)
                }, m.from = function(e, t, n, r) {
                    return this.add((n.repeat && c.TweenMax || i).from(e, t, n), r)
                }, m.fromTo = function(e, t, n, r, s) {
                    var a = r.repeat && c.TweenMax || i;
                    return t ? this.add(a.fromTo(e, t, n, r), s) : this.set(e, r, s)
                }, m.staggerTo = function(e, t, r, s, o, l, u, p) {
                    var c, d = new n({
                        onComplete: l,
                        onCompleteParams: u,
                        onCompleteScope: p,
                        smoothChildTiming: this.smoothChildTiming
                    });
                    for ("string" == typeof e && (e = i.selector(e) || e), a(e) && (e = f(e)), s = s || 0, c = 0; e.length > c; c++) r.startAt && (r.startAt = h(r.startAt)), d.to(e[c], t, h(r), c * s);
                    return this.add(d, o)
                }, m.staggerFrom = function(e, t, i, n, r, s, a, o) {
                    return i.immediateRender = 0 != i.immediateRender, i.runBackwards = !0, this.staggerTo(e, t, i, n, r, s, a, o)
                }, m.staggerFromTo = function(e, t, i, n, r, s, a, o, l) {
                    return n.startAt = i, n.immediateRender = 0 != n.immediateRender && 0 != i.immediateRender, this.staggerTo(e, t, n, r, s, a, o, l)
                }, m.call = function(e, t, n, r) {
                    return this.add(i.delayedCall(0, e, t, n), r)
                }, m.set = function(e, t, n) {
                    return n = this._parseTimeOrLabel(n, 0, !0), null == t.immediateRender && (t.immediateRender = n === this._time && !this._paused), this.add(new i(e, 0, t), n)
                }, n.exportRoot = function(e, t) {
                    e = e || {}, null == e.smoothChildTiming && (e.smoothChildTiming = !0);
                    var r, s, a = new n(e),
                        o = a._timeline;
                    for (null == t && (t = !0), o._remove(a, !0), a._startTime = 0, a._rawPrevTime = a._time = a._totalTime = o._time, r = o._first; r;) s = r._next, t && r instanceof i && r.target === r.vars.onComplete || a.add(r, r._startTime - r._delay), r = s;
                    return o.add(a, 0), a
                }, m.add = function(r, s, a, l) {
                    var u, p, c, h, d, f;
                    if ("number" != typeof s && (s = this._parseTimeOrLabel(s, 0, !0, r)), !(r instanceof e)) {
                        if (r instanceof Array || r && r.push && o(r)) {
                            for (a = a || "normal", l = l || 0, u = s, p = r.length, c = 0; p > c; c++) o(h = r[c]) && (h = new n({
                                tweens: h
                            })), this.add(h, u), "string" != typeof h && "function" != typeof h && ("sequence" === a ? u = h._startTime + h.totalDuration() / h._timeScale : "start" === a && (h._startTime -= h.delay())), u += l;
                            return this._uncache(!0)
                        }
                        if ("string" == typeof r) return this.addLabel(r, s);
                        if ("function" != typeof r) throw "Cannot add " + r + " into the timeline; it is not a tween, timeline, function, or string.";
                        r = i.delayedCall(0, r)
                    }
                    if (t.prototype.add.call(this, r, s), (this._gc || this._time === this._duration) && !this._paused && this._duration < this.duration())
                        for (d = this, f = d.rawTime() > r._startTime; d._timeline;) f && d._timeline.smoothChildTiming ? d.totalTime(d._totalTime, !0) : d._gc && d._enabled(!0, !1), d = d._timeline;
                    return this
                }, m.remove = function(t) {
                    if (t instanceof e) return this._remove(t, !1);
                    if (t instanceof Array || t && t.push && o(t)) {
                        for (var i = t.length; --i > -1;) this.remove(t[i]);
                        return this
                    }
                    return "string" == typeof t ? this.removeLabel(t) : this.kill(null, t)
                }, m._remove = function(e, i) {
                    t.prototype._remove.call(this, e, i);
                    var n = this._last;
                    return n ? this._time > n._startTime + n._totalDuration / n._timeScale && (this._time = this.duration(), this._totalTime = this._totalDuration) : this._time = this._totalTime = this._duration = this._totalDuration = 0, this
                }, m.append = function(e, t) {
                    return this.add(e, this._parseTimeOrLabel(null, t, !0, e))
                }, m.insert = m.insertMultiple = function(e, t, i, n) {
                    return this.add(e, t || 0, i, n)
                }, m.appendMultiple = function(e, t, i, n) {
                    return this.add(e, this._parseTimeOrLabel(null, t, !0, e), i, n)
                }, m.addLabel = function(e, t) {
                    return this._labels[e] = this._parseTimeOrLabel(t), this
                }, m.addPause = function(e, t, i, n) {
                    return this.call(d, ["{self}", t, i, n], this, e)
                }, m.removeLabel = function(e) {
                    return delete this._labels[e], this
                }, m.getLabelTime = function(e) {
                    return null != this._labels[e] ? this._labels[e] : -1
                }, m._parseTimeOrLabel = function(t, i, n, r) {
                    var s;
                    if (r instanceof e && r.timeline === this) this.remove(r);
                    else if (r && (r instanceof Array || r.push && o(r)))
                        for (s = r.length; --s > -1;) r[s] instanceof e && r[s].timeline === this && this.remove(r[s]);
                    if ("string" == typeof i) return this._parseTimeOrLabel(i, n && "number" == typeof t && null == this._labels[i] ? t - this.duration() : 0, n);
                    if (i = i || 0, "string" != typeof t || !isNaN(t) && null == this._labels[t]) null == t && (t = this.duration());
                    else {
                        if (s = t.indexOf("="), -1 === s) return null == this._labels[t] ? n ? this._labels[t] = this.duration() + i : i : this._labels[t] + i;
                        i = parseInt(t.charAt(s - 1) + "1", 10) * Number(t.substr(s + 1)), t = s > 1 ? this._parseTimeOrLabel(t.substr(0, s - 1), 0, n) : this.duration()
                    }
                    return Number(t) + i
                }, m.seek = function(e, t) {
                    return this.totalTime("number" == typeof e ? e : this._parseTimeOrLabel(e), t !== !1)
                }, m.stop = function() {
                    return this.paused(!0)
                }, m.gotoAndPlay = function(e, t) {
                    return this.play(e, t)
                }, m.gotoAndStop = function(e, t) {
                    return this.pause(e, t)
                }, m.render = function(e, t, i) {
                    this._gc && this._enabled(!0, !1);
                    var n, s, a, o, c, h = this._dirty ? this.totalDuration() : this._totalDuration,
                        d = this._time,
                        f = this._startTime,
                        m = this._timeScale,
                        g = this._paused;
                    if (e >= h ? (this._totalTime = this._time = h, this._reversed || this._hasPausedChild() || (s = !0, o = "onComplete", 0 === this._duration && (0 === e || 0 > this._rawPrevTime || this._rawPrevTime === r) && this._rawPrevTime !== e && this._first && (c = !0, this._rawPrevTime > r && (o = "onReverseComplete"))), this._rawPrevTime = this._duration || !t || e || this._rawPrevTime === e ? e : r, e = h + 1e-4) : 1e-7 > e ? (this._totalTime = this._time = 0, (0 !== d || 0 === this._duration && this._rawPrevTime !== r && (this._rawPrevTime > 0 || 0 > e && this._rawPrevTime >= 0)) && (o = "onReverseComplete", s = this._reversed), 0 > e ? (this._active = !1, this._rawPrevTime >= 0 && this._first && (c = !0), this._rawPrevTime = e) : (this._rawPrevTime = this._duration || !t || e || this._rawPrevTime === e ? e : r, e = 0, this._initted || (c = !0))) : this._totalTime = this._time = this._rawPrevTime = e, this._time !== d && this._first || i || c) {
                        if (this._initted || (this._initted = !0), this._active || !this._paused && this._time !== d && e > 0 && (this._active = !0), 0 === d && this.vars.onStart && 0 !== this._time && (t || this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || p)), this._time >= d)
                            for (n = this._first; n && (a = n._next, !this._paused || g);)(n._active || n._startTime <= this._time && !n._paused && !n._gc) && (n._reversed ? n.render((n._dirty ? n.totalDuration() : n._totalDuration) - (e - n._startTime) * n._timeScale, t, i) : n.render((e - n._startTime) * n._timeScale, t, i)), n = a;
                        else
                            for (n = this._last; n && (a = n._prev, !this._paused || g);)(n._active || d >= n._startTime && !n._paused && !n._gc) && (n._reversed ? n.render((n._dirty ? n.totalDuration() : n._totalDuration) - (e - n._startTime) * n._timeScale, t, i) : n.render((e - n._startTime) * n._timeScale, t, i)), n = a;
                        this._onUpdate && (t || (l.length && u(), this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || p))), o && (this._gc || (f === this._startTime || m !== this._timeScale) && (0 === this._time || h >= this.totalDuration()) && (s && (l.length && u(), this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !t && this.vars[o] && this.vars[o].apply(this.vars[o + "Scope"] || this, this.vars[o + "Params"] || p)))
                    }
                }, m._hasPausedChild = function() {
                    for (var e = this._first; e;) {
                        if (e._paused || e instanceof n && e._hasPausedChild()) return !0;
                        e = e._next
                    }
                    return !1
                }, m.getChildren = function(e, t, n, r) {
                    r = r || -9999999999;
                    for (var s = [], a = this._first, o = 0; a;) r > a._startTime || (a instanceof i ? t !== !1 && (s[o++] = a) : (n !== !1 && (s[o++] = a), e !== !1 && (s = s.concat(a.getChildren(!0, t, n)), o = s.length))), a = a._next;
                    return s
                }, m.getTweensOf = function(e, t) {
                    var n, r, s = this._gc,
                        a = [],
                        o = 0;
                    for (s && this._enabled(!0, !0), n = i.getTweensOf(e), r = n.length; --r > -1;)(n[r].timeline === this || t && this._contains(n[r])) && (a[o++] = n[r]);
                    return s && this._enabled(!1, !0), a
                }, m._contains = function(e) {
                    for (var t = e.timeline; t;) {
                        if (t === this) return !0;
                        t = t.timeline
                    }
                    return !1
                }, m.shiftChildren = function(e, t, i) {
                    i = i || 0;
                    for (var n, r = this._first, s = this._labels; r;) r._startTime >= i && (r._startTime += e), r = r._next;
                    if (t)
                        for (n in s) s[n] >= i && (s[n] += e);
                    return this._uncache(!0)
                }, m._kill = function(e, t) {
                    if (!e && !t) return this._enabled(!1, !1);
                    for (var i = t ? this.getTweensOf(t) : this.getChildren(!0, !0, !1), n = i.length, r = !1; --n > -1;) i[n]._kill(e, t) && (r = !0);
                    return r
                }, m.clear = function(e) {
                    var t = this.getChildren(!1, !0, !0),
                        i = t.length;
                    for (this._time = this._totalTime = 0; --i > -1;) t[i]._enabled(!1, !1);
                    return e !== !1 && (this._labels = {}), this._uncache(!0)
                }, m.invalidate = function() {
                    for (var t = this._first; t;) t.invalidate(), t = t._next;
                    return e.prototype.invalidate.call(this)
                }, m._enabled = function(e, i) {
                    if (e === this._gc)
                        for (var n = this._first; n;) n._enabled(e, !0), n = n._next;
                    return t.prototype._enabled.call(this, e, i)
                }, m.totalTime = function() {
                    this._forcingPlayhead = !0;
                    var t = e.prototype.totalTime.apply(this, arguments);
                    return this._forcingPlayhead = !1, t
                }, m.duration = function(e) {
                    return arguments.length ? (0 !== this.duration() && 0 !== e && this.timeScale(this._duration / e), this) : (this._dirty && this.totalDuration(), this._duration)
                }, m.totalDuration = function(e) {
                    if (!arguments.length) {
                        if (this._dirty) {
                            for (var t, i, n = 0, r = this._last, s = 999999999999; r;) t = r._prev, r._dirty && r.totalDuration(), r._startTime > s && this._sortChildren && !r._paused ? this.add(r, r._startTime - r._delay) : s = r._startTime, 0 > r._startTime && !r._paused && (n -= r._startTime, this._timeline.smoothChildTiming && (this._startTime += r._startTime / this._timeScale), this.shiftChildren(-r._startTime, !1, -9999999999), s = 0), i = r._startTime + r._totalDuration / r._timeScale, i > n && (n = i), r = t;
                            this._duration = this._totalDuration = n, this._dirty = !1
                        }
                        return this._totalDuration
                    }
                    return 0 !== this.totalDuration() && 0 !== e && this.timeScale(this._totalDuration / e), this
                }, m.usesFrames = function() {
                    for (var t = this._timeline; t._timeline;) t = t._timeline;
                    return t === e._rootFramesTimeline
                }, m.rawTime = function() {
                    return this._paused ? this._totalTime : (this._timeline.rawTime() - this._startTime) * this._timeScale
                }, n
            }, !0), _gsScope._gsDefine("TimelineMax", ["TimelineLite", "TweenLite", "easing.Ease"], function(e, t, i) {
                var n = function(t) {
                        e.call(this, t), this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._cycle = 0, this._yoyo = this.vars.yoyo === !0, this._dirty = !0
                    },
                    r = 1e-10,
                    s = [],
                    a = t._internals,
                    o = a.lazyTweens,
                    l = a.lazyRender,
                    u = new i(null, null, 1, 0),
                    p = n.prototype = new e;
                return p.constructor = n, p.kill()._gc = !1, n.version = "1.13.2", p.invalidate = function() {
                    return this._yoyo = this.vars.yoyo === !0, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._uncache(!0), e.prototype.invalidate.call(this)
                }, p.addCallback = function(e, i, n, r) {
                    return this.add(t.delayedCall(0, e, n, r), i)
                }, p.removeCallback = function(e, t) {
                    if (e)
                        if (null == t) this._kill(null, e);
                        else
                            for (var i = this.getTweensOf(e, !1), n = i.length, r = this._parseTimeOrLabel(t); --n > -1;) i[n]._startTime === r && i[n]._enabled(!1, !1);
                    return this
                }, p.tweenTo = function(e, i) {
                    i = i || {};
                    var n, r, a, o = {
                        ease: u,
                        overwrite: i.delay ? 2 : 1,
                        useFrames: this.usesFrames(),
                        immediateRender: !1
                    };
                    for (r in i) o[r] = i[r];
                    return o.time = this._parseTimeOrLabel(e), n = Math.abs(Number(o.time) - this._time) / this._timeScale || .001, a = new t(this, n, o), o.onStart = function() {
                        a.target.paused(!0), a.vars.time !== a.target.time() && n === a.duration() && a.duration(Math.abs(a.vars.time - a.target.time()) / a.target._timeScale), i.onStart && i.onStart.apply(i.onStartScope || a, i.onStartParams || s)
                    }, a
                }, p.tweenFromTo = function(e, t, i) {
                    i = i || {}, e = this._parseTimeOrLabel(e), i.startAt = {
                        onComplete: this.seek,
                        onCompleteParams: [e],
                        onCompleteScope: this
                    }, i.immediateRender = i.immediateRender !== !1;
                    var n = this.tweenTo(t, i);
                    return n.duration(Math.abs(n.vars.time - e) / this._timeScale || .001)
                }, p.render = function(e, t, i) {
                    this._gc && this._enabled(!0, !1);
                    var n, a, u, p, c, h, d = this._dirty ? this.totalDuration() : this._totalDuration,
                        f = this._duration,
                        m = this._time,
                        g = this._totalTime,
                        v = this._startTime,
                        _ = this._timeScale,
                        y = this._rawPrevTime,
                        w = this._paused,
                        x = this._cycle;
                    if (e >= d ? (this._locked || (this._totalTime = d, this._cycle = this._repeat), this._reversed || this._hasPausedChild() || (a = !0, p = "onComplete", 0 === this._duration && (0 === e || 0 > y || y === r) && y !== e && this._first && (c = !0, y > r && (p = "onReverseComplete"))), this._rawPrevTime = this._duration || !t || e || this._rawPrevTime === e ? e : r, this._yoyo && 0 !== (1 & this._cycle) ? this._time = e = 0 : (this._time = f, e = f + 1e-4)) : 1e-7 > e ? (this._locked || (this._totalTime = this._cycle = 0), this._time = 0, (0 !== m || 0 === f && y !== r && (y > 0 || 0 > e && y >= 0) && !this._locked) && (p = "onReverseComplete", a = this._reversed), 0 > e ? (this._active = !1, y >= 0 && this._first && (c = !0), this._rawPrevTime = e) : (this._rawPrevTime = f || !t || e || this._rawPrevTime === e ? e : r, e = 0, this._initted || (c = !0))) : (0 === f && 0 > y && (c = !0), this._time = this._rawPrevTime = e, this._locked || (this._totalTime = e, 0 !== this._repeat && (h = f + this._repeatDelay, this._cycle = this._totalTime / h >> 0, 0 !== this._cycle && this._cycle === this._totalTime / h && this._cycle--, this._time = this._totalTime - this._cycle * h, this._yoyo && 0 !== (1 & this._cycle) && (this._time = f - this._time), this._time > f ? (this._time = f, e = f + 1e-4) : 0 > this._time ? this._time = e = 0 : e = this._time))), this._cycle !== x && !this._locked) {
                        var T = this._yoyo && 0 !== (1 & x),
                            b = T === (this._yoyo && 0 !== (1 & this._cycle)),
                            S = this._totalTime,
                            C = this._cycle,
                            P = this._rawPrevTime,
                            k = this._time;
                        if (this._totalTime = x * f, x > this._cycle ? T = !T : this._totalTime += f, this._time = m, this._rawPrevTime = 0 === f ? y - 1e-4 : y, this._cycle = x, this._locked = !0, m = T ? 0 : f, this.render(m, t, 0 === f), t || this._gc || this.vars.onRepeat && this.vars.onRepeat.apply(this.vars.onRepeatScope || this, this.vars.onRepeatParams || s), b && (m = T ? f + 1e-4 : -1e-4, this.render(m, !0, !1)), this._locked = !1, this._paused && !w) return;
                        this._time = k, this._totalTime = S, this._cycle = C, this._rawPrevTime = P
                    }
                    if (!(this._time !== m && this._first || i || c)) return void(g !== this._totalTime && this._onUpdate && (t || this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || s)));
                    if (this._initted || (this._initted = !0), this._active || !this._paused && this._totalTime !== g && e > 0 && (this._active = !0), 0 === g && this.vars.onStart && 0 !== this._totalTime && (t || this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || s)), this._time >= m)
                        for (n = this._first; n && (u = n._next, !this._paused || w);)(n._active || n._startTime <= this._time && !n._paused && !n._gc) && (n._reversed ? n.render((n._dirty ? n.totalDuration() : n._totalDuration) - (e - n._startTime) * n._timeScale, t, i) : n.render((e - n._startTime) * n._timeScale, t, i)), n = u;
                    else
                        for (n = this._last; n && (u = n._prev, !this._paused || w);)(n._active || m >= n._startTime && !n._paused && !n._gc) && (n._reversed ? n.render((n._dirty ? n.totalDuration() : n._totalDuration) - (e - n._startTime) * n._timeScale, t, i) : n.render((e - n._startTime) * n._timeScale, t, i)), n = u;
                    this._onUpdate && (t || (o.length && l(), this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || s))), p && (this._locked || this._gc || (v === this._startTime || _ !== this._timeScale) && (0 === this._time || d >= this.totalDuration()) && (a && (o.length && l(), this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !t && this.vars[p] && this.vars[p].apply(this.vars[p + "Scope"] || this, this.vars[p + "Params"] || s)))
                }, p.getActive = function(e, t, i) {
                    null == e && (e = !0), null == t && (t = !0), null == i && (i = !1);
                    var n, r, s = [],
                        a = this.getChildren(e, t, i),
                        o = 0,
                        l = a.length;
                    for (n = 0; l > n; n++) r = a[n], r.isActive() && (s[o++] = r);
                    return s
                }, p.getLabelAfter = function(e) {
                    e || 0 !== e && (e = this._time);
                    var t, i = this.getLabelsArray(),
                        n = i.length;
                    for (t = 0; n > t; t++)
                        if (i[t].time > e) return i[t].name;
                    return null
                }, p.getLabelBefore = function(e) {
                    null == e && (e = this._time);
                    for (var t = this.getLabelsArray(), i = t.length; --i > -1;)
                        if (e > t[i].time) return t[i].name;
                    return null
                }, p.getLabelsArray = function() {
                    var e, t = [],
                        i = 0;
                    for (e in this._labels) t[i++] = {
                        time: this._labels[e],
                        name: e
                    };
                    return t.sort(function(e, t) {
                        return e.time - t.time
                    }), t
                }, p.progress = function(e, t) {
                    return arguments.length ? this.totalTime(this.duration() * (this._yoyo && 0 !== (1 & this._cycle) ? 1 - e : e) + this._cycle * (this._duration + this._repeatDelay), t) : this._time / this.duration()
                }, p.totalProgress = function(e, t) {
                    return arguments.length ? this.totalTime(this.totalDuration() * e, t) : this._totalTime / this.totalDuration()
                }, p.totalDuration = function(t) {
                    return arguments.length ? -1 === this._repeat ? this : this.duration((t - this._repeat * this._repeatDelay) / (this._repeat + 1)) : (this._dirty && (e.prototype.totalDuration.call(this), this._totalDuration = -1 === this._repeat ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat), this._totalDuration)
                }, p.time = function(e, t) {
                    return arguments.length ? (this._dirty && this.totalDuration(), e > this._duration && (e = this._duration), this._yoyo && 0 !== (1 & this._cycle) ? e = this._duration - e + this._cycle * (this._duration + this._repeatDelay) : 0 !== this._repeat && (e += this._cycle * (this._duration + this._repeatDelay)), this.totalTime(e, t)) : this._time
                }, p.repeat = function(e) {
                    return arguments.length ? (this._repeat = e, this._uncache(!0)) : this._repeat
                }, p.repeatDelay = function(e) {
                    return arguments.length ? (this._repeatDelay = e, this._uncache(!0)) : this._repeatDelay
                }, p.yoyo = function(e) {
                    return arguments.length ? (this._yoyo = e, this) : this._yoyo
                }, p.currentLabel = function(e) {
                    return arguments.length ? this.seek(e, !0) : this.getLabelBefore(this._time + 1e-8)
                }, n
            }, !0),
            function() {
                var e = 180 / Math.PI,
                    t = [],
                    i = [],
                    n = [],
                    r = {},
                    s = function(e, t, i, n) {
                        this.a = e, this.b = t, this.c = i, this.d = n, this.da = n - e, this.ca = i - e, this.ba = t - e
                    },
                    a = ",x,y,z,left,top,right,bottom,marginTop,marginLeft,marginRight,marginBottom,paddingLeft,paddingTop,paddingRight,paddingBottom,backgroundPosition,backgroundPosition_y,",
                    o = function(e, t, i, n) {
                        var r = {
                                a: e
                            },
                            s = {},
                            a = {},
                            o = {
                                c: n
                            },
                            l = (e + t) / 2,
                            u = (t + i) / 2,
                            p = (i + n) / 2,
                            c = (l + u) / 2,
                            h = (u + p) / 2,
                            d = (h - c) / 8;
                        return r.b = l + (e - l) / 4, s.b = c + d, r.c = s.a = (r.b + s.b) / 2, s.c = a.a = (c + h) / 2, a.b = h - d, o.b = p + (n - p) / 4, a.c = o.a = (a.b + o.b) / 2, [r, s, a, o]
                    },
                    l = function(e, r, s, a, l) {
                        var u, p, c, h, d, f, m, g, v, _, y, w, x, T = e.length - 1,
                            b = 0,
                            S = e[0].a;
                        for (u = 0; T > u; u++) d = e[b], p = d.a, c = d.d, h = e[b + 1].d, l ? (y = t[u], w = i[u], x = .25 * (w + y) * r / (a ? .5 : n[u] || .5), f = c - (c - p) * (a ? .5 * r : 0 !== y ? x / y : 0), m = c + (h - c) * (a ? .5 * r : 0 !== w ? x / w : 0), g = c - (f + ((m - f) * (3 * y / (y + w) + .5) / 4 || 0))) : (f = c - .5 * (c - p) * r, m = c + .5 * (h - c) * r, g = c - (f + m) / 2), f += g, m += g, d.c = v = f, d.b = 0 !== u ? S : S = d.a + .6 * (d.c - d.a), d.da = c - p, d.ca = v - p, d.ba = S - p, s ? (_ = o(p, S, v, c), e.splice(b, 1, _[0], _[1], _[2], _[3]), b += 4) : b++, S = m;
                        d = e[b], d.b = S, d.c = S + .4 * (d.d - S), d.da = d.d - d.a, d.ca = d.c - d.a, d.ba = S - d.a, s && (_ = o(d.a, S, d.c, d.d), e.splice(b, 1, _[0], _[1], _[2], _[3]))
                    },
                    u = function(e, n, r, a) {
                        var o, l, u, p, c, h, d = [];
                        if (a)
                            for (e = [a].concat(e), l = e.length; --l > -1;) "string" == typeof(h = e[l][n]) && "=" === h.charAt(1) && (e[l][n] = a[n] + Number(h.charAt(0) + h.substr(2)));
                        if (o = e.length - 2, 0 > o) return d[0] = new s(e[0][n], 0, 0, e[-1 > o ? 0 : 1][n]), d;
                        for (l = 0; o > l; l++) u = e[l][n], p = e[l + 1][n], d[l] = new s(u, 0, 0, p), r && (c = e[l + 2][n], t[l] = (t[l] || 0) + (p - u) * (p - u), i[l] = (i[l] || 0) + (c - p) * (c - p));
                        return d[l] = new s(e[l][n], 0, 0, e[l + 1][n]), d
                    },
                    p = function(e, s, o, p, c, h) {
                        var d, f, m, g, v, _, y, w, x = {},
                            T = [],
                            b = h || e[0];
                        c = "string" == typeof c ? "," + c + "," : a, null == s && (s = 1);
                        for (f in e[0]) T.push(f);
                        if (e.length > 1) {
                            for (w = e[e.length - 1], y = !0, d = T.length; --d > -1;)
                                if (f = T[d], Math.abs(b[f] - w[f]) > .05) {
                                    y = !1;
                                    break
                                }
                            y && (e = e.concat(), h && e.unshift(h), e.push(e[1]), h = e[e.length - 3])
                        }
                        for (t.length = i.length = n.length = 0, d = T.length; --d > -1;) f = T[d], r[f] = -1 !== c.indexOf("," + f + ","), x[f] = u(e, f, r[f], h);
                        for (d = t.length; --d > -1;) t[d] = Math.sqrt(t[d]), i[d] = Math.sqrt(i[d]);
                        if (!p) {
                            for (d = T.length; --d > -1;)
                                if (r[f])
                                    for (m = x[T[d]], _ = m.length - 1, g = 0; _ > g; g++) v = m[g + 1].da / i[g] + m[g].da / t[g], n[g] = (n[g] || 0) + v * v;
                            for (d = n.length; --d > -1;) n[d] = Math.sqrt(n[d])
                        }
                        for (d = T.length, g = o ? 4 : 1; --d > -1;) f = T[d], m = x[f], l(m, s, o, p, r[f]), y && (m.splice(0, g), m.splice(m.length - g, g));
                        return x
                    },
                    c = function(e, t, i) {
                        t = t || "soft";
                        var n, r, a, o, l, u, p, c, h, d, f, m = {},
                            g = "cubic" === t ? 3 : 2,
                            v = "soft" === t,
                            _ = [];
                        if (v && i && (e = [i].concat(e)), null == e || g + 1 > e.length) throw "invalid Bezier data";
                        for (h in e[0]) _.push(h);
                        for (u = _.length; --u > -1;) {
                            for (h = _[u], m[h] = l = [], d = 0, c = e.length, p = 0; c > p; p++) n = null == i ? e[p][h] : "string" == typeof(f = e[p][h]) && "=" === f.charAt(1) ? i[h] + Number(f.charAt(0) + f.substr(2)) : Number(f), v && p > 1 && c - 1 > p && (l[d++] = (n + l[d - 2]) / 2), l[d++] = n;
                            for (c = d - g + 1, d = 0, p = 0; c > p; p += g) n = l[p], r = l[p + 1], a = l[p + 2], o = 2 === g ? 0 : l[p + 3], l[d++] = f = 3 === g ? new s(n, r, a, o) : new s(n, (2 * r + n) / 3, (2 * r + a) / 3, a);
                            l.length = d
                        }
                        return m
                    },
                    h = function(e, t, i) {
                        for (var n, r, s, a, o, l, u, p, c, h, d, f = 1 / i, m = e.length; --m > -1;)
                            for (h = e[m], s = h.a, a = h.d - s, o = h.c - s, l = h.b - s, n = r = 0, p = 1; i >= p; p++) u = f * p, c = 1 - u, n = r - (r = (u * u * a + 3 * c * (u * o + c * l)) * u), d = m * i + p - 1, t[d] = (t[d] || 0) + n * n
                    },
                    d = function(e, t) {
                        t = t >> 0 || 6;
                        var i, n, r, s, a = [],
                            o = [],
                            l = 0,
                            u = 0,
                            p = t - 1,
                            c = [],
                            d = [];
                        for (i in e) h(e[i], a, t);
                        for (r = a.length, n = 0; r > n; n++) l += Math.sqrt(a[n]), s = n % t, d[s] = l, s === p && (u += l, s = n / t >> 0, c[s] = d, o[s] = u, l = 0, d = []);
                        return {
                            length: u,
                            lengths: o,
                            segments: c
                        }
                    },
                    f = _gsScope._gsDefine.plugin({
                        propName: "bezier",
                        priority: -1,
                        version: "1.3.3",
                        API: 2,
                        global: !0,
                        init: function(e, t, i) {
                            this._target = e, t instanceof Array && (t = {
                                values: t
                            }), this._func = {}, this._round = {}, this._props = [], this._timeRes = null == t.timeResolution ? 6 : parseInt(t.timeResolution, 10);
                            var n, r, s, a, o, l = t.values || [],
                                u = {},
                                h = l[0],
                                f = t.autoRotate || i.vars.orientToBezier;
                            this._autoRotate = f ? f instanceof Array ? f : [
                                ["x", "y", "rotation", f === !0 ? 0 : Number(f) || 0]
                            ] : null;
                            for (n in h) this._props.push(n);
                            for (s = this._props.length; --s > -1;) n = this._props[s], this._overwriteProps.push(n), r = this._func[n] = "function" == typeof e[n], u[n] = r ? e[n.indexOf("set") || "function" != typeof e["get" + n.substr(3)] ? n : "get" + n.substr(3)]() : parseFloat(e[n]), o || u[n] !== l[0][n] && (o = u);
                            if (this._beziers = "cubic" !== t.type && "quadratic" !== t.type && "soft" !== t.type ? p(l, isNaN(t.curviness) ? 1 : t.curviness, !1, "thruBasic" === t.type, t.correlate, o) : c(l, t.type, u), this._segCount = this._beziers[n].length, this._timeRes) {
                                var m = d(this._beziers, this._timeRes);
                                this._length = m.length, this._lengths = m.lengths, this._segments = m.segments, this._l1 = this._li = this._s1 = this._si = 0, this._l2 = this._lengths[0], this._curSeg = this._segments[0], this._s2 = this._curSeg[0], this._prec = 1 / this._curSeg.length
                            }
                            if (f = this._autoRotate)
                                for (this._initialRotations = [], f[0] instanceof Array || (this._autoRotate = f = [f]), s = f.length; --s > -1;) {
                                    for (a = 0; 3 > a; a++) n = f[s][a], this._func[n] = "function" == typeof e[n] ? e[n.indexOf("set") || "function" != typeof e["get" + n.substr(3)] ? n : "get" + n.substr(3)] : !1;
                                    n = f[s][2], this._initialRotations[s] = this._func[n] ? this._func[n].call(this._target) : this._target[n]
                                }
                            return this._startRatio = i.vars.runBackwards ? 1 : 0, !0
                        },
                        set: function(t) {
                            var i, n, r, s, a, o, l, u, p, c, h = this._segCount,
                                d = this._func,
                                f = this._target,
                                m = t !== this._startRatio;
                            if (this._timeRes) {
                                if (p = this._lengths, c = this._curSeg, t *= this._length, r = this._li, t > this._l2 && h - 1 > r) {
                                    for (u = h - 1; u > r && t >= (this._l2 = p[++r]););
                                    this._l1 = p[r - 1], this._li = r, this._curSeg = c = this._segments[r], this._s2 = c[this._s1 = this._si = 0]
                                } else if (this._l1 > t && r > 0) {
                                    for (; r > 0 && (this._l1 = p[--r]) >= t;);
                                    0 === r && this._l1 > t ? this._l1 = 0 : r++, this._l2 = p[r], this._li = r, this._curSeg = c = this._segments[r], this._s1 = c[(this._si = c.length - 1) - 1] || 0, this._s2 = c[this._si]
                                }
                                if (i = r, t -= this._l1, r = this._si, t > this._s2 && c.length - 1 > r) {
                                    for (u = c.length - 1; u > r && t >= (this._s2 = c[++r]););
                                    this._s1 = c[r - 1], this._si = r
                                } else if (this._s1 > t && r > 0) {
                                    for (; r > 0 && (this._s1 = c[--r]) >= t;);
                                    0 === r && this._s1 > t ? this._s1 = 0 : r++, this._s2 = c[r], this._si = r
                                }
                                o = (r + (t - this._s1) / (this._s2 - this._s1)) * this._prec
                            } else i = 0 > t ? 0 : t >= 1 ? h - 1 : h * t >> 0, o = (t - i * (1 / h)) * h;
                            for (n = 1 - o, r = this._props.length; --r > -1;) s = this._props[r], a = this._beziers[s][i], l = (o * o * a.da + 3 * n * (o * a.ca + n * a.ba)) * o + a.a, this._round[s] && (l = Math.round(l)), d[s] ? f[s](l) : f[s] = l;
                            if (this._autoRotate) {
                                var g, v, _, y, w, x, T, b = this._autoRotate;
                                for (r = b.length; --r > -1;) s = b[r][2], x = b[r][3] || 0, T = b[r][4] === !0 ? 1 : e, a = this._beziers[b[r][0]], g = this._beziers[b[r][1]], a && g && (a = a[i], g = g[i], v = a.a + (a.b - a.a) * o, y = a.b + (a.c - a.b) * o, v += (y - v) * o, y += (a.c + (a.d - a.c) * o - y) * o, _ = g.a + (g.b - g.a) * o, w = g.b + (g.c - g.b) * o, _ += (w - _) * o, w += (g.c + (g.d - g.c) * o - w) * o, l = m ? Math.atan2(w - _, y - v) * T + x : this._initialRotations[r], d[s] ? f[s](l) : f[s] = l)
                            }
                        }
                    }),
                    m = f.prototype;
                f.bezierThrough = p, f.cubicToQuadratic = o, f._autoCSS = !0, f.quadraticToCubic = function(e, t, i) {
                    return new s(e, (2 * t + e) / 3, (2 * t + i) / 3, i)
                }, f._cssRegister = function() {
                    var e = _gsScope._gsDefine.globals.CSSPlugin;
                    if (e) {
                        var t = e._internals,
                            i = t._parseToProxy,
                            n = t._setPluginRatio,
                            r = t.CSSPropTween;
                        t._registerComplexSpecialProp("bezier", {
                            parser: function(e, t, s, a, o, l) {
                                t instanceof Array && (t = {
                                    values: t
                                }), l = new f;
                                var u, p, c, h = t.values,
                                    d = h.length - 1,
                                    m = [],
                                    g = {};
                                if (0 > d) return o;
                                for (u = 0; d >= u; u++) c = i(e, h[u], a, o, l, d !== u), m[u] = c.end;
                                for (p in t) g[p] = t[p];
                                return g.values = m, o = new r(e, "bezier", 0, 0, c.pt, 2), o.data = c, o.plugin = l, o.setRatio = n, 0 === g.autoRotate && (g.autoRotate = !0), !g.autoRotate || g.autoRotate instanceof Array || (u = g.autoRotate === !0 ? 0 : Number(g.autoRotate), g.autoRotate = null != c.end.left ? [
                                    ["left", "top", "rotation", u, !1]
                                ] : null != c.end.x ? [
                                    ["x", "y", "rotation", u, !1]
                                ] : !1), g.autoRotate && (a._transform || a._enableTransforms(!1), c.autoRotate = a._target._gsTransform), l._onInitTween(c.proxy, g, a._tween), o
                            }
                        })
                    }
                }, m._roundProps = function(e, t) {
                    for (var i = this._overwriteProps, n = i.length; --n > -1;)(e[i[n]] || e.bezier || e.bezierThrough) && (this._round[i[n]] = t)
                }, m._kill = function(e) {
                    var t, i, n = this._props;
                    for (t in this._beziers)
                        if (t in e)
                            for (delete this._beziers[t], delete this._func[t], i = n.length; --i > -1;) n[i] === t && n.splice(i, 1);
                    return this._super._kill.call(this, e)
                }
            }(), _gsScope._gsDefine("plugins.CSSPlugin", ["plugins.TweenPlugin", "TweenLite"], function(e, t) {
                var i, n, r, s, a = function() {
                        e.call(this, "css"), this._overwriteProps.length = 0, this.setRatio = a.prototype.setRatio
                    },
                    o = {},
                    l = a.prototype = new e("css");
                l.constructor = a, a.version = "1.13.2", a.API = 2, a.defaultTransformPerspective = 0, a.defaultSkewType = "compensated", l = "px", a.suffixMap = {
                    top: l,
                    right: l,
                    bottom: l,
                    left: l,
                    width: l,
                    height: l,
                    fontSize: l,
                    padding: l,
                    margin: l,
                    perspective: l,
                    lineHeight: ""
                };
                var u, p, c, h, d, f, m = /(?:\d|\-\d|\.\d|\-\.\d)+/g,
                    g = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,
                    v = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi,
                    _ = /[^\d\-\.]/g,
                    y = /(?:\d|\-|\+|=|#|\.)*/g,
                    w = /opacity *= *([^)]*)/i,
                    x = /opacity:([^;]*)/i,
                    T = /alpha\(opacity *=.+?\)/i,
                    b = /^(rgb|hsl)/,
                    S = /([A-Z])/g,
                    C = /-([a-z])/gi,
                    P = /(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi,
                    k = function(e, t) {
                        return t.toUpperCase()
                    },
                    M = /(?:Left|Right|Width)/i,
                    D = /(M11|M12|M21|M22)=[\d\-\.e]+/gi,
                    E = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,
                    A = /,(?=[^\)]*(?:\(|$))/gi,
                    O = Math.PI / 180,
                    R = 180 / Math.PI,
                    L = {},
                    N = document,
                    I = N.createElement("div"),
                    z = N.createElement("img"),
                    j = a._internals = {
                        _specialProps: o
                    },
                    F = navigator.userAgent,
                    B = function() {
                        var e, t = F.indexOf("Android"),
                            i = N.createElement("div");
                        return c = -1 !== F.indexOf("Safari") && -1 === F.indexOf("Chrome") && (-1 === t || Number(F.substr(t + 8, 1)) > 3), d = c && 6 > Number(F.substr(F.indexOf("Version/") + 8, 1)), h = -1 !== F.indexOf("Firefox"), /MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(F) && (f = parseFloat(RegExp.$1)), i.innerHTML = "<a style='top:1px;opacity:.55;'>a</a>", e = i.getElementsByTagName("a")[0], e ? /^0.55/.test(e.style.opacity) : !1
                    }(),
                    W = function(e) {
                        return w.test("string" == typeof e ? e : (e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? parseFloat(RegExp.$1) / 100 : 1
                    },
                    $ = function(e) {
                        window.console && console.log(e)
                    },
                    X = "",
                    H = "",
                    q = function(e, t) {
                        t = t || I;
                        var i, n, r = t.style;
                        if (void 0 !== r[e]) return e;
                        for (e = e.charAt(0).toUpperCase() + e.substr(1), i = ["O", "Moz", "ms", "Ms", "Webkit"], n = 5; --n > -1 && void 0 === r[i[n] + e];);
                        return n >= 0 ? (H = 3 === n ? "ms" : i[n], X = "-" + H.toLowerCase() + "-", H + e) : null
                    },
                    Y = N.defaultView ? N.defaultView.getComputedStyle : function() {},
                    G = a.getStyle = function(e, t, i, n, r) {
                        var s;
                        return B || "opacity" !== t ? (!n && e.style[t] ? s = e.style[t] : (i = i || Y(e)) ? s = i[t] || i.getPropertyValue(t) || i.getPropertyValue(t.replace(S, "-$1").toLowerCase()) : e.currentStyle && (s = e.currentStyle[t]), null == r || s && "none" !== s && "auto" !== s && "auto auto" !== s ? s : r) : W(e)
                    },
                    V = j.convertToPixels = function(e, i, n, r, s) {
                        if ("px" === r || !r) return n;
                        if ("auto" === r || !n) return 0;
                        var o, l, u, p = M.test(i),
                            c = e,
                            h = I.style,
                            d = 0 > n;
                        if (d && (n = -n), "%" === r && -1 !== i.indexOf("border")) o = n / 100 * (p ? e.clientWidth : e.clientHeight);
                        else {
                            if (h.cssText = "border:0 solid red;position:" + G(e, "position") + ";line-height:0;", "%" !== r && c.appendChild) h[p ? "borderLeftWidth" : "borderTopWidth"] = n + r;
                            else {
                                if (c = e.parentNode || N.body, l = c._gsCache, u = t.ticker.frame, l && p && l.time === u) return l.width * n / 100;
                                h[p ? "width" : "height"] = n + r
                            }
                            c.appendChild(I), o = parseFloat(I[p ? "offsetWidth" : "offsetHeight"]), c.removeChild(I), p && "%" === r && a.cacheWidths !== !1 && (l = c._gsCache = c._gsCache || {}, l.time = u, l.width = 100 * (o / n)), 0 !== o || s || (o = V(e, i, n, r, !0))
                        }
                        return d ? -o : o
                    },
                    U = j.calculateOffset = function(e, t, i) {
                        if ("absolute" !== G(e, "position", i)) return 0;
                        var n = "left" === t ? "Left" : "Top",
                            r = G(e, "margin" + n, i);
                        return e["offset" + n] - (V(e, t, parseFloat(r), r.replace(y, "")) || 0)
                    },
                    Q = function(e, t) {
                        var i, n, r = {};
                        if (t = t || Y(e, null))
                            if (i = t.length)
                                for (; --i > -1;) r[t[i].replace(C, k)] = t.getPropertyValue(t[i]);
                            else
                                for (i in t) r[i] = t[i];
                        else if (t = e.currentStyle || e.style)
                            for (i in t) "string" == typeof i && void 0 === r[i] && (r[i.replace(C, k)] = t[i]);
                        return B || (r.opacity = W(e)), n = St(e, t, !1), r.rotation = n.rotation, r.skewX = n.skewX, r.scaleX = n.scaleX, r.scaleY = n.scaleY, r.x = n.x, r.y = n.y, Tt && (r.z = n.z, r.rotationX = n.rotationX, r.rotationY = n.rotationY, r.scaleZ = n.scaleZ), r.filters && delete r.filters, r
                    },
                    K = function(e, t, i, n, r) {
                        var s, a, o, l = {},
                            u = e.style;
                        for (a in i) "cssText" !== a && "length" !== a && isNaN(a) && (t[a] !== (s = i[a]) || r && r[a]) && -1 === a.indexOf("Origin") && ("number" == typeof s || "string" == typeof s) && (l[a] = "auto" !== s || "left" !== a && "top" !== a ? "" !== s && "auto" !== s && "none" !== s || "string" != typeof t[a] || "" === t[a].replace(_, "") ? s : 0 : U(e, a), void 0 !== u[a] && (o = new ct(u, a, u[a], o)));
                        if (n)
                            for (a in n) "className" !== a && (l[a] = n[a]);
                        return {
                            difs: l,
                            firstMPT: o
                        }
                    },
                    Z = {
                        width: ["Left", "Right"],
                        height: ["Top", "Bottom"]
                    },
                    J = ["marginLeft", "marginRight", "marginTop", "marginBottom"],
                    et = function(e, t, i) {
                        var n = parseFloat("width" === t ? e.offsetWidth : e.offsetHeight),
                            r = Z[t],
                            s = r.length;
                        for (i = i || Y(e, null); --s > -1;) n -= parseFloat(G(e, "padding" + r[s], i, !0)) || 0, n -= parseFloat(G(e, "border" + r[s] + "Width", i, !0)) || 0;
                        return n
                    },
                    tt = function(e, t) {
                        (null == e || "" === e || "auto" === e || "auto auto" === e) && (e = "0 0");
                        var i = e.split(" "),
                            n = -1 !== e.indexOf("left") ? "0%" : -1 !== e.indexOf("right") ? "100%" : i[0],
                            r = -1 !== e.indexOf("top") ? "0%" : -1 !== e.indexOf("bottom") ? "100%" : i[1];
                        return null == r ? r = "0" : "center" === r && (r = "50%"), ("center" === n || isNaN(parseFloat(n)) && -1 === (n + "").indexOf("=")) && (n = "50%"), t && (t.oxp = -1 !== n.indexOf("%"), t.oyp = -1 !== r.indexOf("%"), t.oxr = "=" === n.charAt(1), t.oyr = "=" === r.charAt(1), t.ox = parseFloat(n.replace(_, "")), t.oy = parseFloat(r.replace(_, ""))), n + " " + r + (i.length > 2 ? " " + i[2] : "")
                    },
                    it = function(e, t) {
                        return "string" == typeof e && "=" === e.charAt(1) ? parseInt(e.charAt(0) + "1", 10) * parseFloat(e.substr(2)) : parseFloat(e) - parseFloat(t)
                    },
                    nt = function(e, t) {
                        return null == e ? t : "string" == typeof e && "=" === e.charAt(1) ? parseInt(e.charAt(0) + "1", 10) * Number(e.substr(2)) + t : parseFloat(e)
                    },
                    rt = function(e, t, i, n) {
                        var r, s, a, o, l = 1e-6;
                        return null == e ? o = t : "number" == typeof e ? o = e : (r = 360, s = e.split("_"), a = Number(s[0].replace(_, "")) * (-1 === e.indexOf("rad") ? 1 : R) - ("=" === e.charAt(1) ? 0 : t), s.length && (n && (n[i] = t + a), -1 !== e.indexOf("short") && (a %= r, a !== a % (r / 2) && (a = 0 > a ? a + r : a - r)), -1 !== e.indexOf("_cw") && 0 > a ? a = (a + 9999999999 * r) % r - (0 | a / r) * r : -1 !== e.indexOf("ccw") && a > 0 && (a = (a - 9999999999 * r) % r - (0 | a / r) * r)), o = t + a), l > o && o > -l && (o = 0), o
                    },
                    st = {
                        aqua: [0, 255, 255],
                        lime: [0, 255, 0],
                        silver: [192, 192, 192],
                        black: [0, 0, 0],
                        maroon: [128, 0, 0],
                        teal: [0, 128, 128],
                        blue: [0, 0, 255],
                        navy: [0, 0, 128],
                        white: [255, 255, 255],
                        fuchsia: [255, 0, 255],
                        olive: [128, 128, 0],
                        yellow: [255, 255, 0],
                        orange: [255, 165, 0],
                        gray: [128, 128, 128],
                        purple: [128, 0, 128],
                        green: [0, 128, 0],
                        red: [255, 0, 0],
                        pink: [255, 192, 203],
                        cyan: [0, 255, 255],
                        transparent: [255, 255, 255, 0]
                    },
                    at = function(e, t, i) {
                        return e = 0 > e ? e + 1 : e > 1 ? e - 1 : e, 0 | 255 * (1 > 6 * e ? t + 6 * (i - t) * e : .5 > e ? i : 2 > 3 * e ? t + 6 * (i - t) * (2 / 3 - e) : t) + .5
                    },
                    ot = function(e) {
                        var t, i, n, r, s, a;
                        return e && "" !== e ? "number" == typeof e ? [e >> 16, 255 & e >> 8, 255 & e] : ("," === e.charAt(e.length - 1) && (e = e.substr(0, e.length - 1)), st[e] ? st[e] : "#" === e.charAt(0) ? (4 === e.length && (t = e.charAt(1), i = e.charAt(2), n = e.charAt(3), e = "#" + t + t + i + i + n + n), e = parseInt(e.substr(1), 16), [e >> 16, 255 & e >> 8, 255 & e]) : "hsl" === e.substr(0, 3) ? (e = e.match(m), r = Number(e[0]) % 360 / 360, s = Number(e[1]) / 100, a = Number(e[2]) / 100, i = .5 >= a ? a * (s + 1) : a + s - a * s, t = 2 * a - i, e.length > 3 && (e[3] = Number(e[3])), e[0] = at(r + 1 / 3, t, i), e[1] = at(r, t, i), e[2] = at(r - 1 / 3, t, i), e) : (e = e.match(m) || st.transparent, e[0] = Number(e[0]), e[1] = Number(e[1]), e[2] = Number(e[2]), e.length > 3 && (e[3] = Number(e[3])), e)) : st.black
                    },
                    lt = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#.+?\\b";
                for (l in st) lt += "|" + l + "\\b";
                lt = RegExp(lt + ")", "gi");
                var ut = function(e, t, i, n) {
                        if (null == e) return function(e) {
                            return e
                        };
                        var r, s = t ? (e.match(lt) || [""])[0] : "",
                            a = e.split(s).join("").match(v) || [],
                            o = e.substr(0, e.indexOf(a[0])),
                            l = ")" === e.charAt(e.length - 1) ? ")" : "",
                            u = -1 !== e.indexOf(" ") ? " " : ",",
                            p = a.length,
                            c = p > 0 ? a[0].replace(m, "") : "";
                        return p ? r = t ? function(e) {
                            var t, h, d, f;
                            if ("number" == typeof e) e += c;
                            else if (n && A.test(e)) {
                                for (f = e.replace(A, "|").split("|"), d = 0; f.length > d; d++) f[d] = r(f[d]);
                                return f.join(",")
                            }
                            if (t = (e.match(lt) || [s])[0], h = e.split(t).join("").match(v) || [], d = h.length, p > d--)
                                for (; p > ++d;) h[d] = i ? h[0 | (d - 1) / 2] : a[d];
                            return o + h.join(u) + u + t + l + (-1 !== e.indexOf("inset") ? " inset" : "")
                        } : function(e) {
                            var t, s, h;
                            if ("number" == typeof e) e += c;
                            else if (n && A.test(e)) {
                                for (s = e.replace(A, "|").split("|"), h = 0; s.length > h; h++) s[h] = r(s[h]);
                                return s.join(",")
                            }
                            if (t = e.match(v) || [], h = t.length, p > h--)
                                for (; p > ++h;) t[h] = i ? t[0 | (h - 1) / 2] : a[h];
                            return o + t.join(u) + l
                        } : function(e) {
                            return e
                        }
                    },
                    pt = function(e) {
                        return e = e.split(","),
                            function(t, i, n, r, s, a, o) {
                                var l, u = (i + "").split(" ");
                                for (o = {}, l = 0; 4 > l; l++) o[e[l]] = u[l] = u[l] || u[(l - 1) / 2 >> 0];
                                return r.parse(t, o, s, a)
                            }
                    },
                    ct = (j._setPluginRatio = function(e) {
                        this.plugin.setRatio(e);
                        for (var t, i, n, r, s = this.data, a = s.proxy, o = s.firstMPT, l = 1e-6; o;) t = a[o.v], o.r ? t = Math.round(t) : l > t && t > -l && (t = 0), o.t[o.p] = t, o = o._next;
                        if (s.autoRotate && (s.autoRotate.rotation = a.rotation), 1 === e)
                            for (o = s.firstMPT; o;) {
                                if (i = o.t, i.type) {
                                    if (1 === i.type) {
                                        for (r = i.xs0 + i.s + i.xs1, n = 1; i.l > n; n++) r += i["xn" + n] + i["xs" + (n + 1)];
                                        i.e = r
                                    }
                                } else i.e = i.s + i.xs0;
                                o = o._next
                            }
                    }, function(e, t, i, n, r) {
                        this.t = e, this.p = t, this.v = i, this.r = r, n && (n._prev = this, this._next = n)
                    }),
                    ht = (j._parseToProxy = function(e, t, i, n, r, s) {
                        var a, o, l, u, p, c = n,
                            h = {},
                            d = {},
                            f = i._transform,
                            m = L;
                        for (i._transform = null, L = t, n = p = i.parse(e, t, n, r), L = m, s && (i._transform = f, c && (c._prev = null, c._prev && (c._prev._next = null))); n && n !== c;) {
                            if (1 >= n.type && (o = n.p, d[o] = n.s + n.c, h[o] = n.s, s || (u = new ct(n, "s", o, u, n.r), n.c = 0), 1 === n.type))
                                for (a = n.l; --a > 0;) l = "xn" + a, o = n.p + "_" + l, d[o] = n.data[l], h[o] = n[l], s || (u = new ct(n, l, o, u, n.rxp[l]));
                            n = n._next
                        }
                        return {
                            proxy: h,
                            end: d,
                            firstMPT: u,
                            pt: p
                        }
                    }, j.CSSPropTween = function(e, t, n, r, a, o, l, u, p, c, h) {
                        this.t = e, this.p = t, this.s = n, this.c = r, this.n = l || t, e instanceof ht || s.push(this.n), this.r = u, this.type = o || 0, p && (this.pr = p, i = !0), this.b = void 0 === c ? n : c, this.e = void 0 === h ? n + r : h, a && (this._next = a, a._prev = this)
                    }),
                    dt = a.parseComplex = function(e, t, i, n, r, s, a, o, l, p) {
                        i = i || s || "", a = new ht(e, t, 0, 0, a, p ? 2 : 1, null, !1, o, i, n), n += "";
                        var c, h, d, f, v, _, y, w, x, T, S, C, P = i.split(", ").join(",").split(" "),
                            k = n.split(", ").join(",").split(" "),
                            M = P.length,
                            D = u !== !1;
                        for ((-1 !== n.indexOf(",") || -1 !== i.indexOf(",")) && (P = P.join(" ").replace(A, ", ").split(" "), k = k.join(" ").replace(A, ", ").split(" "), M = P.length), M !== k.length && (P = (s || "").split(" "), M = P.length), a.plugin = l, a.setRatio = p, c = 0; M > c; c++)
                            if (f = P[c], v = k[c], w = parseFloat(f), w || 0 === w) a.appendXtra("", w, it(v, w), v.replace(g, ""), D && -1 !== v.indexOf("px"), !0);
                            else if (r && ("#" === f.charAt(0) || st[f] || b.test(f))) C = "," === v.charAt(v.length - 1) ? ")," : ")", f = ot(f), v = ot(v), x = f.length + v.length > 6, x && !B && 0 === v[3] ? (a["xs" + a.l] += a.l ? " transparent" : "transparent", a.e = a.e.split(k[c]).join("transparent")) : (B || (x = !1), a.appendXtra(x ? "rgba(" : "rgb(", f[0], v[0] - f[0], ",", !0, !0).appendXtra("", f[1], v[1] - f[1], ",", !0).appendXtra("", f[2], v[2] - f[2], x ? "," : C, !0), x && (f = 4 > f.length ? 1 : f[3], a.appendXtra("", f, (4 > v.length ? 1 : v[3]) - f, C, !1)));
                        else if (_ = f.match(m)) {
                            if (y = v.match(g), !y || y.length !== _.length) return a;
                            for (d = 0, h = 0; _.length > h; h++) S = _[h], T = f.indexOf(S, d), a.appendXtra(f.substr(d, T - d), Number(S), it(y[h], S), "", D && "px" === f.substr(T + S.length, 2), 0 === h), d = T + S.length;
                            a["xs" + a.l] += f.substr(d)
                        } else a["xs" + a.l] += a.l ? " " + f : f;
                        if (-1 !== n.indexOf("=") && a.data) {
                            for (C = a.xs0 + a.data.s, c = 1; a.l > c; c++) C += a["xs" + c] + a.data["xn" + c];
                            a.e = C + a["xs" + c]
                        }
                        return a.l || (a.type = -1, a.xs0 = a.e), a.xfirst || a
                    },
                    ft = 9;
                for (l = ht.prototype, l.l = l.pr = 0; --ft > 0;) l["xn" + ft] = 0, l["xs" + ft] = "";
                l.xs0 = "", l._next = l._prev = l.xfirst = l.data = l.plugin = l.setRatio = l.rxp = null, l.appendXtra = function(e, t, i, n, r, s) {
                    var a = this,
                        o = a.l;
                    return a["xs" + o] += s && o ? " " + e : e || "", i || 0 === o || a.plugin ? (a.l++, a.type = a.setRatio ? 2 : 1, a["xs" + a.l] = n || "", o > 0 ? (a.data["xn" + o] = t + i, a.rxp["xn" + o] = r, a["xn" + o] = t, a.plugin || (a.xfirst = new ht(a, "xn" + o, t, i, a.xfirst || a, 0, a.n, r, a.pr), a.xfirst.xs0 = 0), a) : (a.data = {
                        s: t + i
                    }, a.rxp = {}, a.s = t, a.c = i, a.r = r, a)) : (a["xs" + o] += t + (n || ""), a)
                };
                var mt = function(e, t) {
                        t = t || {}, this.p = t.prefix ? q(e) || e : e, o[e] = o[this.p] = this, this.format = t.formatter || ut(t.defaultValue, t.color, t.collapsible, t.multi), t.parser && (this.parse = t.parser), this.clrs = t.color, this.multi = t.multi, this.keyword = t.keyword, this.dflt = t.defaultValue, this.pr = t.priority || 0
                    },
                    gt = j._registerComplexSpecialProp = function(e, t, i) {
                        "object" != typeof t && (t = {
                            parser: i
                        });
                        var n, r, s = e.split(","),
                            a = t.defaultValue;
                        for (i = i || [a], n = 0; s.length > n; n++) t.prefix = 0 === n && t.prefix, t.defaultValue = i[n] || a, r = new mt(s[n], t)
                    },
                    vt = function(e) {
                        if (!o[e]) {
                            var t = e.charAt(0).toUpperCase() + e.substr(1) + "Plugin";
                            gt(e, {
                                parser: function(e, i, n, r, s, a, l) {
                                    var u = (_gsScope.GreenSockGlobals || _gsScope).com.greensock.plugins[t];
                                    return u ? (u._cssRegister(), o[n].parse(e, i, n, r, s, a, l)) : ($("Error: " + t + " js file not loaded."), s)
                                }
                            })
                        }
                    };
                l = mt.prototype, l.parseComplex = function(e, t, i, n, r, s) {
                    var a, o, l, u, p, c, h = this.keyword;
                    if (this.multi && (A.test(i) || A.test(t) ? (o = t.replace(A, "|").split("|"), l = i.replace(A, "|").split("|")) : h && (o = [t], l = [i])), l) {
                        for (u = l.length > o.length ? l.length : o.length, a = 0; u > a; a++) t = o[a] = o[a] || this.dflt, i = l[a] = l[a] || this.dflt, h && (p = t.indexOf(h), c = i.indexOf(h), p !== c && (i = -1 === c ? l : o, i[a] += " " + h));
                        t = o.join(", "), i = l.join(", ")
                    }
                    return dt(e, this.p, t, i, this.clrs, this.dflt, n, this.pr, r, s)
                }, l.parse = function(e, t, i, n, s, a) {
                    return this.parseComplex(e.style, this.format(G(e, this.p, r, !1, this.dflt)), this.format(t), s, a)
                }, a.registerSpecialProp = function(e, t, i) {
                    gt(e, {
                        parser: function(e, n, r, s, a, o) {
                            var l = new ht(e, r, 0, 0, a, 2, r, !1, i);
                            return l.plugin = o, l.setRatio = t(e, n, s._tween, r), l
                        },
                        priority: i
                    })
                };
                var _t = "scaleX,scaleY,scaleZ,x,y,z,skewX,skewY,rotation,rotationX,rotationY,perspective,xPercent,yPercent".split(","),
                    yt = q("transform"),
                    wt = X + "transform",
                    xt = q("transformOrigin"),
                    Tt = null !== q("perspective"),
                    bt = j.Transform = function() {
                        this.skewY = 0
                    },
                    St = j.getTransform = function(e, t, i, n) {
                        if (e._gsTransform && i && !n) return e._gsTransform;
                        var r, s, o, l, u, p, c, h, d, f, m, g, v, _ = i ? e._gsTransform || new bt : new bt,
                            y = 0 > _.scaleX,
                            w = 2e-5,
                            x = 1e5,
                            T = 179.99,
                            b = T * O,
                            S = Tt ? parseFloat(G(e, xt, t, !1, "0 0 0").split(" ")[2]) || _.zOrigin || 0 : 0,
                            C = parseFloat(a.defaultTransformPerspective) || 0;
                        if (yt ? r = G(e, wt, t, !0) : e.currentStyle && (r = e.currentStyle.filter.match(D), r = r && 4 === r.length ? [r[0].substr(4), Number(r[2].substr(4)), Number(r[1].substr(4)), r[3].substr(4), _.x || 0, _.y || 0].join(",") : ""), r && "none" !== r && "matrix(1, 0, 0, 1, 0, 0)" !== r) {
                            for (s = (r || "").match(/(?:\-|\b)[\d\-\.e]+\b/gi) || [], o = s.length; --o > -1;) l = Number(s[o]), s[o] = (u = l - (l |= 0)) ? (0 | u * x + (0 > u ? -.5 : .5)) / x + l : l;
                            if (16 === s.length) {
                                var P = s[8],
                                    k = s[9],
                                    M = s[10],
                                    E = s[12],
                                    A = s[13],
                                    L = s[14];
                                if (_.zOrigin && (L = -_.zOrigin, E = P * L - s[12], A = k * L - s[13], L = M * L + _.zOrigin - s[14]), !i || n || null == _.rotationX) {
                                    var N, I, z, j, F, B, W, $ = s[0],
                                        X = s[1],
                                        H = s[2],
                                        q = s[3],
                                        Y = s[4],
                                        V = s[5],
                                        U = s[6],
                                        Q = s[7],
                                        K = s[11],
                                        Z = Math.atan2(U, M),
                                        J = -b > Z || Z > b;
                                    _.rotationX = Z * R, Z && (j = Math.cos(-Z), F = Math.sin(-Z), N = Y * j + P * F, I = V * j + k * F, z = U * j + M * F, P = Y * -F + P * j, k = V * -F + k * j, M = U * -F + M * j, K = Q * -F + K * j, Y = N, V = I, U = z), Z = Math.atan2(P, $), _.rotationY = Z * R, Z && (B = -b > Z || Z > b, j = Math.cos(-Z), F = Math.sin(-Z), N = $ * j - P * F, I = X * j - k * F, z = H * j - M * F, k = X * F + k * j, M = H * F + M * j, K = q * F + K * j, $ = N, X = I, H = z), Z = Math.atan2(X, V), _.rotation = Z * R, Z && (W = -b > Z || Z > b, j = Math.cos(-Z), F = Math.sin(-Z), $ = $ * j + Y * F, I = X * j + V * F, V = X * -F + V * j, U = H * -F + U * j, X = I), W && J ? _.rotation = _.rotationX = 0 : W && B ? _.rotation = _.rotationY = 0 : B && J && (_.rotationY = _.rotationX = 0), _.scaleX = (0 | Math.sqrt($ * $ + X * X) * x + .5) / x, _.scaleY = (0 | Math.sqrt(V * V + k * k) * x + .5) / x, _.scaleZ = (0 | Math.sqrt(U * U + M * M) * x + .5) / x, _.skewX = 0, _.perspective = K ? 1 / (0 > K ? -K : K) : 0, _.x = E, _.y = A, _.z = L
                                }
                            } else if (!(Tt && !n && s.length && _.x === s[4] && _.y === s[5] && (_.rotationX || _.rotationY) || void 0 !== _.x && "none" === G(e, "display", t))) {
                                var et = s.length >= 6,
                                    tt = et ? s[0] : 1,
                                    it = s[1] || 0,
                                    nt = s[2] || 0,
                                    rt = et ? s[3] : 1;
                                _.x = s[4] || 0, _.y = s[5] || 0, p = Math.sqrt(tt * tt + it * it), c = Math.sqrt(rt * rt + nt * nt), h = tt || it ? Math.atan2(it, tt) * R : _.rotation || 0, d = nt || rt ? Math.atan2(nt, rt) * R + h : _.skewX || 0, f = p - Math.abs(_.scaleX || 0), m = c - Math.abs(_.scaleY || 0), Math.abs(d) > 90 && 270 > Math.abs(d) && (y ? (p *= -1, d += 0 >= h ? 180 : -180, h += 0 >= h ? 180 : -180) : (c *= -1, d += 0 >= d ? 180 : -180)), g = (h - _.rotation) % 180, v = (d - _.skewX) % 180, (void 0 === _.skewX || f > w || -w > f || m > w || -w > m || g > -T && T > g && !1 | g * x || v > -T && T > v && !1 | v * x) && (_.scaleX = p, _.scaleY = c, _.rotation = h, _.skewX = d), Tt && (_.rotationX = _.rotationY = _.z = 0, _.perspective = C, _.scaleZ = 1)
                            }
                            _.zOrigin = S;
                            for (o in _) w > _[o] && _[o] > -w && (_[o] = 0)
                        } else _ = {
                            x: 0,
                            y: 0,
                            z: 0,
                            scaleX: 1,
                            scaleY: 1,
                            scaleZ: 1,
                            skewX: 0,
                            perspective: C,
                            rotation: 0,
                            rotationX: 0,
                            rotationY: 0,
                            zOrigin: 0
                        };
                        return i && (e._gsTransform = _), _.xPercent = _.yPercent = 0, _
                    },
                    Ct = function(e) {
                        var t, i, n = this.data,
                            r = -n.rotation * O,
                            s = r + n.skewX * O,
                            a = 1e5,
                            o = (0 | Math.cos(r) * n.scaleX * a) / a,
                            l = (0 | Math.sin(r) * n.scaleX * a) / a,
                            u = (0 | Math.sin(s) * -n.scaleY * a) / a,
                            p = (0 | Math.cos(s) * n.scaleY * a) / a,
                            c = this.t.style,
                            h = this.t.currentStyle;
                        if (h) {
                            i = l, l = -u, u = -i, t = h.filter, c.filter = "";
                            var d, m, g = this.t.offsetWidth,
                                v = this.t.offsetHeight,
                                _ = "absolute" !== h.position,
                                x = "progid:DXImageTransform.Microsoft.Matrix(M11=" + o + ", M12=" + l + ", M21=" + u + ", M22=" + p,
                                T = n.x + g * n.xPercent / 100,
                                b = n.y + v * n.yPercent / 100;
                            if (null != n.ox && (d = (n.oxp ? .01 * g * n.ox : n.ox) - g / 2, m = (n.oyp ? .01 * v * n.oy : n.oy) - v / 2, T += d - (d * o + m * l), b += m - (d * u + m * p)), _ ? (d = g / 2, m = v / 2, x += ", Dx=" + (d - (d * o + m * l) + T) + ", Dy=" + (m - (d * u + m * p) + b) + ")") : x += ", sizingMethod='auto expand')", c.filter = -1 !== t.indexOf("DXImageTransform.Microsoft.Matrix(") ? t.replace(E, x) : x + " " + t, (0 === e || 1 === e) && 1 === o && 0 === l && 0 === u && 1 === p && (_ && -1 === x.indexOf("Dx=0, Dy=0") || w.test(t) && 100 !== parseFloat(RegExp.$1) || -1 === t.indexOf(t.indexOf("Alpha")) && c.removeAttribute("filter")), !_) {
                                var S, C, P, k = 8 > f ? 1 : -1;
                                for (d = n.ieOffsetX || 0, m = n.ieOffsetY || 0, n.ieOffsetX = Math.round((g - ((0 > o ? -o : o) * g + (0 > l ? -l : l) * v)) / 2 + T), n.ieOffsetY = Math.round((v - ((0 > p ? -p : p) * v + (0 > u ? -u : u) * g)) / 2 + b), ft = 0; 4 > ft; ft++) C = J[ft], S = h[C], i = -1 !== S.indexOf("px") ? parseFloat(S) : V(this.t, C, parseFloat(S), S.replace(y, "")) || 0, P = i !== n[C] ? 2 > ft ? -n.ieOffsetX : -n.ieOffsetY : 2 > ft ? d - n.ieOffsetX : m - n.ieOffsetY, c[C] = (n[C] = Math.round(i - P * (0 === ft || 2 === ft ? 1 : k))) + "px"
                            }
                        }
                    },
                    Pt = j.set3DTransformRatio = function(e) {
                        var t, i, n, r, s, a, o, l, u, p, c, d, f, m, g, v, _, y, w, x, T, b, S, C = this.data,
                            P = this.t.style,
                            k = C.rotation * O,
                            M = C.scaleX,
                            D = C.scaleY,
                            E = C.scaleZ,
                            A = C.x,
                            R = C.y,
                            L = C.z,
                            N = C.perspective;
                        if (!(1 !== e && 0 !== e || "auto" !== C.force3D || C.rotationY || C.rotationX || 1 !== E || N || L)) return void kt.call(this, e);
                        if (h) {
                            var I = 1e-4;
                            I > M && M > -I && (M = E = 2e-5), I > D && D > -I && (D = E = 2e-5), !N || C.z || C.rotationX || C.rotationY || (N = 0)
                        }
                        if (k || C.skewX) y = Math.cos(k), w = Math.sin(k), t = y, s = w, C.skewX && (k -= C.skewX * O, y = Math.cos(k), w = Math.sin(k), "simple" === C.skewType && (x = Math.tan(C.skewX * O), x = Math.sqrt(1 + x * x), y *= x, w *= x)), i = -w, a = y;
                        else {
                            if (!(C.rotationY || C.rotationX || 1 !== E || N)) return void(P[yt] = (C.xPercent || C.yPercent ? "translate(" + C.xPercent + "%," + C.yPercent + "%) translate3d(" : "translate3d(") + A + "px," + R + "px," + L + "px)" + (1 !== M || 1 !== D ? " scale(" + M + "," + D + ")" : ""));
                            t = a = 1, i = s = 0
                        }
                        c = 1, n = r = o = l = u = p = d = f = m = 0, g = N ? -1 / N : 0, v = C.zOrigin, _ = 1e5, k = C.rotationY * O, k && (y = Math.cos(k), w = Math.sin(k), u = c * -w, f = g * -w, n = t * w, o = s * w, c *= y, g *= y, t *= y, s *= y), k = C.rotationX * O, k && (y = Math.cos(k), w = Math.sin(k), x = i * y + n * w, T = a * y + o * w, b = p * y + c * w, S = m * y + g * w, n = i * -w + n * y, o = a * -w + o * y, c = p * -w + c * y, g = m * -w + g * y, i = x, a = T, p = b, m = S), 1 !== E && (n *= E, o *= E, c *= E, g *= E), 1 !== D && (i *= D, a *= D, p *= D, m *= D), 1 !== M && (t *= M, s *= M, u *= M, f *= M), v && (d -= v, r = n * d, l = o * d, d = c * d + v), r = (x = (r += A) - (r |= 0)) ? (0 | x * _ + (0 > x ? -.5 : .5)) / _ + r : r, l = (x = (l += R) - (l |= 0)) ? (0 | x * _ + (0 > x ? -.5 : .5)) / _ + l : l, d = (x = (d += L) - (d |= 0)) ? (0 | x * _ + (0 > x ? -.5 : .5)) / _ + d : d, P[yt] = (C.xPercent || C.yPercent ? "translate(" + C.xPercent + "%," + C.yPercent + "%) matrix3d(" : "matrix3d(") + [(0 | t * _) / _, (0 | s * _) / _, (0 | u * _) / _, (0 | f * _) / _, (0 | i * _) / _, (0 | a * _) / _, (0 | p * _) / _, (0 | m * _) / _, (0 | n * _) / _, (0 | o * _) / _, (0 | c * _) / _, (0 | g * _) / _, r, l, d, N ? 1 + -d / N : 1].join(",") + ")"
                    },
                    kt = j.set2DTransformRatio = function(e) {
                        var t, i, n, r, s, a = this.data,
                            o = this.t,
                            l = o.style,
                            u = a.x,
                            p = a.y;
                        return a.rotationX || a.rotationY || a.z || a.force3D === !0 || "auto" === a.force3D && 1 !== e && 0 !== e ? (this.setRatio = Pt, void Pt.call(this, e)) : void(a.rotation || a.skewX ? (t = a.rotation * O, i = t - a.skewX * O, n = 1e5, r = a.scaleX * n, s = a.scaleY * n, l[yt] = (a.xPercent || a.yPercent ? "translate(" + a.xPercent + "%," + a.yPercent + "%) matrix(" : "matrix(") + (0 | Math.cos(t) * r) / n + "," + (0 | Math.sin(t) * r) / n + "," + (0 | Math.sin(i) * -s) / n + "," + (0 | Math.cos(i) * s) / n + "," + u + "," + p + ")") : l[yt] = (a.xPercent || a.yPercent ? "translate(" + a.xPercent + "%," + a.yPercent + "%) matrix(" : "matrix(") + a.scaleX + ",0,0," + a.scaleY + "," + u + "," + p + ")")
                    };
                gt("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,transformPerspective,directionalRotation,parseTransform,force3D,skewType,xPercent,yPercent", {
                    parser: function(e, t, i, n, s, o, l) {
                        if (n._transform) return s;
                        var u, p, c, h, d, f, m, g = n._transform = St(e, r, !0, l.parseTransform),
                            v = e.style,
                            _ = 1e-6,
                            y = _t.length,
                            w = l,
                            x = {};
                        if ("string" == typeof w.transform && yt) c = I.style, c[yt] = w.transform, c.display = "block", c.position = "absolute", N.body.appendChild(I), u = St(I, null, !1), N.body.removeChild(I);
                        else if ("object" == typeof w) {
                            if (u = {
                                    scaleX: nt(null != w.scaleX ? w.scaleX : w.scale, g.scaleX),
                                    scaleY: nt(null != w.scaleY ? w.scaleY : w.scale, g.scaleY),
                                    scaleZ: nt(w.scaleZ, g.scaleZ),
                                    x: nt(w.x, g.x),
                                    y: nt(w.y, g.y),
                                    z: nt(w.z, g.z),
                                    xPercent: nt(w.xPercent, g.xPercent),
                                    yPercent: nt(w.yPercent, g.yPercent),
                                    perspective: nt(w.transformPerspective, g.perspective)
                                }, m = w.directionalRotation, null != m)
                                if ("object" == typeof m)
                                    for (c in m) w[c] = m[c];
                                else w.rotation = m;
                                "string" == typeof w.x && -1 !== w.x.indexOf("%") && (u.x = 0, u.xPercent = nt(w.x, g.xPercent)), "string" == typeof w.y && -1 !== w.y.indexOf("%") && (u.y = 0, u.yPercent = nt(w.y, g.yPercent)), u.rotation = rt("rotation" in w ? w.rotation : "shortRotation" in w ? w.shortRotation + "_short" : "rotationZ" in w ? w.rotationZ : g.rotation, g.rotation, "rotation", x), Tt && (u.rotationX = rt("rotationX" in w ? w.rotationX : "shortRotationX" in w ? w.shortRotationX + "_short" : g.rotationX || 0, g.rotationX, "rotationX", x), u.rotationY = rt("rotationY" in w ? w.rotationY : "shortRotationY" in w ? w.shortRotationY + "_short" : g.rotationY || 0, g.rotationY, "rotationY", x)), u.skewX = null == w.skewX ? g.skewX : rt(w.skewX, g.skewX), u.skewY = null == w.skewY ? g.skewY : rt(w.skewY, g.skewY), (p = u.skewY - g.skewY) && (u.skewX += p, u.rotation += p)
                        }
                        for (Tt && null != w.force3D && (g.force3D = w.force3D, f = !0), g.skewType = w.skewType || g.skewType || a.defaultSkewType, d = g.force3D || g.z || g.rotationX || g.rotationY || u.z || u.rotationX || u.rotationY || u.perspective, d || null == w.scale || (u.scaleZ = 1); --y > -1;) i = _t[y], h = u[i] - g[i], (h > _ || -_ > h || null != L[i]) && (f = !0, s = new ht(g, i, g[i], h, s), i in x && (s.e = x[i]), s.xs0 = 0, s.plugin = o, n._overwriteProps.push(s.n));
                        return h = w.transformOrigin, (h || Tt && d && g.zOrigin) && (yt ? (f = !0, i = xt, h = (h || G(e, i, r, !1, "50% 50%")) + "", s = new ht(v, i, 0, 0, s, -1, "transformOrigin"), s.b = v[i], s.plugin = o, Tt ? (c = g.zOrigin, h = h.split(" "), g.zOrigin = (h.length > 2 && (0 === c || "0px" !== h[2]) ? parseFloat(h[2]) : c) || 0, s.xs0 = s.e = h[0] + " " + (h[1] || "50%") + " 0px", s = new ht(g, "zOrigin", 0, 0, s, -1, s.n), s.b = c, s.xs0 = s.e = g.zOrigin) : s.xs0 = s.e = h) : tt(h + "", g)), f && (n._transformType = d || 3 === this._transformType ? 3 : 2), s
                    },
                    prefix: !0
                }), gt("boxShadow", {
                    defaultValue: "0px 0px 0px 0px #999",
                    prefix: !0,
                    color: !0,
                    multi: !0,
                    keyword: "inset"
                }), gt("borderRadius", {
                    defaultValue: "0px",
                    parser: function(e, t, i, s, a) {
                        t = this.format(t);
                        var o, l, u, p, c, h, d, f, m, g, v, _, y, w, x, T, b = ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius"],
                            S = e.style;
                        for (m = parseFloat(e.offsetWidth), g = parseFloat(e.offsetHeight), o = t.split(" "), l = 0; b.length > l; l++) this.p.indexOf("border") && (b[l] = q(b[l])), c = p = G(e, b[l], r, !1, "0px"), -1 !== c.indexOf(" ") && (p = c.split(" "), c = p[0], p = p[1]), h = u = o[l], d = parseFloat(c), _ = c.substr((d + "").length), y = "=" === h.charAt(1), y ? (f = parseInt(h.charAt(0) + "1", 10), h = h.substr(2), f *= parseFloat(h), v = h.substr((f + "").length - (0 > f ? 1 : 0)) || "") : (f = parseFloat(h), v = h.substr((f + "").length)), "" === v && (v = n[i] || _), v !== _ && (w = V(e, "borderLeft", d, _), x = V(e, "borderTop", d, _), "%" === v ? (c = 100 * (w / m) + "%", p = 100 * (x / g) + "%") : "em" === v ? (T = V(e, "borderLeft", 1, "em"), c = w / T + "em", p = x / T + "em") : (c = w + "px", p = x + "px"), y && (h = parseFloat(c) + f + v, u = parseFloat(p) + f + v)), a = dt(S, b[l], c + " " + p, h + " " + u, !1, "0px", a);
                        return a
                    },
                    prefix: !0,
                    formatter: ut("0px 0px 0px 0px", !1, !0)
                }), gt("backgroundPosition", {
                    defaultValue: "0 0",
                    parser: function(e, t, i, n, s, a) {
                        var o, l, u, p, c, h, d = "background-position",
                            m = r || Y(e, null),
                            g = this.format((m ? f ? m.getPropertyValue(d + "-x") + " " + m.getPropertyValue(d + "-y") : m.getPropertyValue(d) : e.currentStyle.backgroundPositionX + " " + e.currentStyle.backgroundPositionY) || "0 0"),
                            v = this.format(t);
                        if (-1 !== g.indexOf("%") != (-1 !== v.indexOf("%")) && (h = G(e, "backgroundImage").replace(P, ""), h && "none" !== h)) {
                            for (o = g.split(" "), l = v.split(" "), z.setAttribute("src", h), u = 2; --u > -1;) g = o[u], p = -1 !== g.indexOf("%"), p !== (-1 !== l[u].indexOf("%")) && (c = 0 === u ? e.offsetWidth - z.width : e.offsetHeight - z.height, o[u] = p ? parseFloat(g) / 100 * c + "px" : 100 * (parseFloat(g) / c) + "%");
                            g = o.join(" ")
                        }
                        return this.parseComplex(e.style, g, v, s, a)
                    },
                    formatter: tt
                }), gt("backgroundSize", {
                    defaultValue: "0 0",
                    formatter: tt
                }), gt("perspective", {
                    defaultValue: "0px",
                    prefix: !0
                }), gt("perspectiveOrigin", {
                    defaultValue: "50% 50%",
                    prefix: !0
                }), gt("transformStyle", {
                    prefix: !0
                }), gt("backfaceVisibility", {
                    prefix: !0
                }), gt("userSelect", {
                    prefix: !0
                }), gt("margin", {
                    parser: pt("marginTop,marginRight,marginBottom,marginLeft")
                }), gt("padding", {
                    parser: pt("paddingTop,paddingRight,paddingBottom,paddingLeft")
                }), gt("clip", {
                    defaultValue: "rect(0px,0px,0px,0px)",
                    parser: function(e, t, i, n, s, a) {
                        var o, l, u;
                        return 9 > f ? (l = e.currentStyle, u = 8 > f ? " " : ",", o = "rect(" + l.clipTop + u + l.clipRight + u + l.clipBottom + u + l.clipLeft + ")", t = this.format(t).split(",").join(u)) : (o = this.format(G(e, this.p, r, !1, this.dflt)), t = this.format(t)), this.parseComplex(e.style, o, t, s, a)
                    }
                }), gt("textShadow", {
                    defaultValue: "0px 0px 0px #999",
                    color: !0,
                    multi: !0
                }), gt("autoRound,strictUnits", {
                    parser: function(e, t, i, n, r) {
                        return r
                    }
                }), gt("border", {
                    defaultValue: "0px solid #000",
                    parser: function(e, t, i, n, s, a) {
                        return this.parseComplex(e.style, this.format(G(e, "borderTopWidth", r, !1, "0px") + " " + G(e, "borderTopStyle", r, !1, "solid") + " " + G(e, "borderTopColor", r, !1, "#000")), this.format(t), s, a)
                    },
                    color: !0,
                    formatter: function(e) {
                        var t = e.split(" ");
                        return t[0] + " " + (t[1] || "solid") + " " + (e.match(lt) || ["#000"])[0]
                    }
                }), gt("borderWidth", {
                    parser: pt("borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth")
                }), gt("float,cssFloat,styleFloat", {
                    parser: function(e, t, i, n, r) {
                        var s = e.style,
                            a = "cssFloat" in s ? "cssFloat" : "styleFloat";
                        return new ht(s, a, 0, 0, r, -1, i, !1, 0, s[a], t)
                    }
                });
                var Mt = function(e) {
                    var t, i = this.t,
                        n = i.filter || G(this.data, "filter"),
                        r = 0 | this.s + this.c * e;
                    100 === r && (-1 === n.indexOf("atrix(") && -1 === n.indexOf("radient(") && -1 === n.indexOf("oader(") ? (i.removeAttribute("filter"), t = !G(this.data, "filter")) : (i.filter = n.replace(T, ""), t = !0)), t || (this.xn1 && (i.filter = n = n || "alpha(opacity=" + r + ")"), -1 === n.indexOf("pacity") ? 0 === r && this.xn1 || (i.filter = n + " alpha(opacity=" + r + ")") : i.filter = n.replace(w, "opacity=" + r))
                };
                gt("opacity,alpha,autoAlpha", {
                    defaultValue: "1",
                    parser: function(e, t, i, n, s, a) {
                        var o = parseFloat(G(e, "opacity", r, !1, "1")),
                            l = e.style,
                            u = "autoAlpha" === i;
                        return "string" == typeof t && "=" === t.charAt(1) && (t = ("-" === t.charAt(0) ? -1 : 1) * parseFloat(t.substr(2)) + o), u && 1 === o && "hidden" === G(e, "visibility", r) && 0 !== t && (o = 0), B ? s = new ht(l, "opacity", o, t - o, s) : (s = new ht(l, "opacity", 100 * o, 100 * (t - o), s), s.xn1 = u ? 1 : 0, l.zoom = 1, s.type = 2, s.b = "alpha(opacity=" + s.s + ")", s.e = "alpha(opacity=" + (s.s + s.c) + ")", s.data = e, s.plugin = a, s.setRatio = Mt), u && (s = new ht(l, "visibility", 0, 0, s, -1, null, !1, 0, 0 !== o ? "inherit" : "hidden", 0 === t ? "hidden" : "inherit"), s.xs0 = "inherit", n._overwriteProps.push(s.n), n._overwriteProps.push(i)), s
                    }
                });
                var Dt = function(e, t) {
                        t && (e.removeProperty ? ("ms" === t.substr(0, 2) && (t = "M" + t.substr(1)), e.removeProperty(t.replace(S, "-$1").toLowerCase())) : e.removeAttribute(t))
                    },
                    Et = function(e) {
                        if (this.t._gsClassPT = this, 1 === e || 0 === e) {
                            this.t.setAttribute("class", 0 === e ? this.b : this.e);
                            for (var t = this.data, i = this.t.style; t;) t.v ? i[t.p] = t.v : Dt(i, t.p), t = t._next;
                            1 === e && this.t._gsClassPT === this && (this.t._gsClassPT = null)
                        } else this.t.getAttribute("class") !== this.e && this.t.setAttribute("class", this.e)
                    };
                gt("className", {
                    parser: function(e, t, n, s, a, o, l) {
                        var u, p, c, h, d, f = e.getAttribute("class") || "",
                            m = e.style.cssText;
                        if (a = s._classNamePT = new ht(e, n, 0, 0, a, 2), a.setRatio = Et, a.pr = -11, i = !0, a.b = f, p = Q(e, r), c = e._gsClassPT) {
                            for (h = {}, d = c.data; d;) h[d.p] = 1, d = d._next;
                            c.setRatio(1)
                        }
                        return e._gsClassPT = a, a.e = "=" !== t.charAt(1) ? t : f.replace(RegExp("\\s*\\b" + t.substr(2) + "\\b"), "") + ("+" === t.charAt(0) ? " " + t.substr(2) : ""), s._tween._duration && (e.setAttribute("class", a.e), u = K(e, p, Q(e), l, h), e.setAttribute("class", f), a.data = u.firstMPT, e.style.cssText = m, a = a.xfirst = s.parse(e, u.difs, a, o)), a
                    }
                });
                var At = function(e) {
                    if ((1 === e || 0 === e) && this.data._totalTime === this.data._totalDuration && "isFromStart" !== this.data.data) {
                        var t, i, n, r, s = this.t.style,
                            a = o.transform.parse;
                        if ("all" === this.e) s.cssText = "", r = !0;
                        else
                            for (t = this.e.split(","), n = t.length; --n > -1;) i = t[n], o[i] && (o[i].parse === a ? r = !0 : i = "transformOrigin" === i ? xt : o[i].p), Dt(s, i);
                        r && (Dt(s, yt), this.t._gsTransform && delete this.t._gsTransform)
                    }
                };
                for (gt("clearProps", {
                        parser: function(e, t, n, r, s) {
                            return s = new ht(e, n, 0, 0, s, 2), s.setRatio = At, s.e = t, s.pr = -10, s.data = r._tween, i = !0, s
                        }
                    }), l = "bezier,throwProps,physicsProps,physics2D".split(","), ft = l.length; ft--;) vt(l[ft]);
                l = a.prototype, l._firstPT = null, l._onInitTween = function(e, t, o) {
                    if (!e.nodeType) return !1;
                    this._target = e, this._tween = o, this._vars = t, u = t.autoRound, i = !1, n = t.suffixMap || a.suffixMap, r = Y(e, ""), s = this._overwriteProps;
                    var l, h, f, m, g, v, _, y, w, T = e.style;
                    if (p && "" === T.zIndex && (l = G(e, "zIndex", r), ("auto" === l || "" === l) && this._addLazySet(T, "zIndex", 0)), "string" == typeof t && (m = T.cssText, l = Q(e, r), T.cssText = m + ";" + t, l = K(e, l, Q(e)).difs, !B && x.test(t) && (l.opacity = parseFloat(RegExp.$1)), t = l, T.cssText = m), this._firstPT = h = this.parse(e, t, null), this._transformType) {
                        for (w = 3 === this._transformType, yt ? c && (p = !0, "" === T.zIndex && (_ = G(e, "zIndex", r), ("auto" === _ || "" === _) && this._addLazySet(T, "zIndex", 0)), d && this._addLazySet(T, "WebkitBackfaceVisibility", this._vars.WebkitBackfaceVisibility || (w ? "visible" : "hidden"))) : T.zoom = 1, f = h; f && f._next;) f = f._next;
                        y = new ht(e, "transform", 0, 0, null, 2), this._linkCSSP(y, null, f), y.setRatio = w && Tt ? Pt : yt ? kt : Ct, y.data = this._transform || St(e, r, !0), s.pop()
                    }
                    if (i) {
                        for (; h;) {
                            for (v = h._next, f = m; f && f.pr > h.pr;) f = f._next;
                            (h._prev = f ? f._prev : g) ? h._prev._next = h: m = h, (h._next = f) ? f._prev = h : g = h, h = v
                        }
                        this._firstPT = m
                    }
                    return !0
                }, l.parse = function(e, t, i, s) {
                    var a, l, p, c, h, d, f, m, g, v, _ = e.style;
                    for (a in t) d = t[a], l = o[a], l ? i = l.parse(e, d, a, this, i, s, t) : (h = G(e, a, r) + "", g = "string" == typeof d, "color" === a || "fill" === a || "stroke" === a || -1 !== a.indexOf("Color") || g && b.test(d) ? (g || (d = ot(d), d = (d.length > 3 ? "rgba(" : "rgb(") + d.join(",") + ")"), i = dt(_, a, h, d, !0, "transparent", i, 0, s)) : !g || -1 === d.indexOf(" ") && -1 === d.indexOf(",") ? (p = parseFloat(h), f = p || 0 === p ? h.substr((p + "").length) : "", ("" === h || "auto" === h) && ("width" === a || "height" === a ? (p = et(e, a, r), f = "px") : "left" === a || "top" === a ? (p = U(e, a, r), f = "px") : (p = "opacity" !== a ? 0 : 1, f = "")), v = g && "=" === d.charAt(1), v ? (c = parseInt(d.charAt(0) + "1", 10), d = d.substr(2), c *= parseFloat(d), m = d.replace(y, "")) : (c = parseFloat(d), m = g ? d.substr((c + "").length) || "" : ""), "" === m && (m = a in n ? n[a] : f), d = c || 0 === c ? (v ? c + p : c) + m : t[a], f !== m && "" !== m && (c || 0 === c) && p && (p = V(e, a, p, f), "%" === m ? (p /= V(e, a, 100, "%") / 100, t.strictUnits !== !0 && (h = p + "%")) : "em" === m ? p /= V(e, a, 1, "em") : "px" !== m && (c = V(e, a, c, m), m = "px"), v && (c || 0 === c) && (d = c + p + m)), v && (c += p), !p && 0 !== p || !c && 0 !== c ? void 0 !== _[a] && (d || "NaN" != d + "" && null != d) ? (i = new ht(_, a, c || p || 0, 0, i, -1, a, !1, 0, h, d), i.xs0 = "none" !== d || "display" !== a && -1 === a.indexOf("Style") ? d : h) : $("invalid " + a + " tween value: " + t[a]) : (i = new ht(_, a, p, c - p, i, 0, a, u !== !1 && ("px" === m || "zIndex" === a), 0, h, d), i.xs0 = m)) : i = dt(_, a, h, d, !0, null, i, 0, s)), s && i && !i.plugin && (i.plugin = s);
                    return i
                }, l.setRatio = function(e) {
                    var t, i, n, r = this._firstPT,
                        s = 1e-6;
                    if (1 !== e || this._tween._time !== this._tween._duration && 0 !== this._tween._time)
                        if (e || this._tween._time !== this._tween._duration && 0 !== this._tween._time || this._tween._rawPrevTime === -1e-6)
                            for (; r;) {
                                if (t = r.c * e + r.s, r.r ? t = Math.round(t) : s > t && t > -s && (t = 0), r.type)
                                    if (1 === r.type)
                                        if (n = r.l, 2 === n) r.t[r.p] = r.xs0 + t + r.xs1 + r.xn1 + r.xs2;
                                        else if (3 === n) r.t[r.p] = r.xs0 + t + r.xs1 + r.xn1 + r.xs2 + r.xn2 + r.xs3;
                                else if (4 === n) r.t[r.p] = r.xs0 + t + r.xs1 + r.xn1 + r.xs2 + r.xn2 + r.xs3 + r.xn3 + r.xs4;
                                else if (5 === n) r.t[r.p] = r.xs0 + t + r.xs1 + r.xn1 + r.xs2 + r.xn2 + r.xs3 + r.xn3 + r.xs4 + r.xn4 + r.xs5;
                                else {
                                    for (i = r.xs0 + t + r.xs1, n = 1; r.l > n; n++) i += r["xn" + n] + r["xs" + (n + 1)];
                                    r.t[r.p] = i
                                } else -1 === r.type ? r.t[r.p] = r.xs0 : r.setRatio && r.setRatio(e);
                                else r.t[r.p] = t + r.xs0;
                                r = r._next
                            } else
                                for (; r;) 2 !== r.type ? r.t[r.p] = r.b : r.setRatio(e), r = r._next;
                        else
                            for (; r;) 2 !== r.type ? r.t[r.p] = r.e : r.setRatio(e), r = r._next
                }, l._enableTransforms = function(e) {
                    this._transformType = e || 3 === this._transformType ? 3 : 2, this._transform = this._transform || St(this._target, r, !0)
                };
                var Ot = function() {
                    this.t[this.p] = this.e, this.data._linkCSSP(this, this._next, null, !0)
                };
                l._addLazySet = function(e, t, i) {
                    var n = this._firstPT = new ht(e, t, 0, 0, this._firstPT, 2);
                    n.e = i, n.setRatio = Ot, n.data = this
                }, l._linkCSSP = function(e, t, i, n) {
                    return e && (t && (t._prev = e), e._next && (e._next._prev = e._prev), e._prev ? e._prev._next = e._next : this._firstPT === e && (this._firstPT = e._next, n = !0), i ? i._next = e : n || null !== this._firstPT || (this._firstPT = e), e._next = t, e._prev = i), e
                }, l._kill = function(t) {
                    var i, n, r, s = t;
                    if (t.autoAlpha || t.alpha) {
                        s = {};
                        for (n in t) s[n] = t[n];
                        s.opacity = 1, s.autoAlpha && (s.visibility = 1)
                    }
                    return t.className && (i = this._classNamePT) && (r = i.xfirst, r && r._prev ? this._linkCSSP(r._prev, i._next, r._prev._prev) : r === this._firstPT && (this._firstPT = i._next), i._next && this._linkCSSP(i._next, i._next._next, r._prev), this._classNamePT = null), e.prototype._kill.call(this, s)
                };
                var Rt = function(e, t, i) {
                    var n, r, s, a;
                    if (e.slice)
                        for (r = e.length; --r > -1;) Rt(e[r], t, i);
                    else
                        for (n = e.childNodes, r = n.length; --r > -1;) s = n[r], a = s.type, s.style && (t.push(Q(s)), i && i.push(s)), 1 !== a && 9 !== a && 11 !== a || !s.childNodes.length || Rt(s, t, i)
                };
                return a.cascadeTo = function(e, i, n) {
                    var r, s, a, o = t.to(e, i, n),
                        l = [o],
                        u = [],
                        p = [],
                        c = [],
                        h = t._internals.reservedProps;
                    for (e = o._targets || o.target, Rt(e, u, c), o.render(i, !0), Rt(e, p), o.render(0, !0), o._enabled(!0), r = c.length; --r > -1;)
                        if (s = K(c[r], u[r], p[r]), s.firstMPT) {
                            s = s.difs;
                            for (a in n) h[a] && (s[a] = n[a]);
                            l.push(t.to(c[r], i, s))
                        }
                    return l
                }, e.activate([a]), a
            }, !0),
            function() {
                var e = _gsScope._gsDefine.plugin({
                        propName: "roundProps",
                        priority: -1,
                        API: 2,
                        init: function(e, t, i) {
                            return this._tween = i, !0
                        }
                    }),
                    t = e.prototype;
                t._onInitAllProps = function() {
                    for (var e, t, i, n = this._tween, r = n.vars.roundProps instanceof Array ? n.vars.roundProps : n.vars.roundProps.split(","), s = r.length, a = {}, o = n._propLookup.roundProps; --s > -1;) a[r[s]] = 1;
                    for (s = r.length; --s > -1;)
                        for (e = r[s], t = n._firstPT; t;) i = t._next, t.pg ? t.t._roundProps(a, !0) : t.n === e && (this._add(t.t, e, t.s, t.c), i && (i._prev = t._prev), t._prev ? t._prev._next = i : n._firstPT === t && (n._firstPT = i), t._next = t._prev = null, n._propLookup[e] = o), t = i;
                    return !1
                }, t._add = function(e, t, i, n) {
                    this._addTween(e, t, i, i + n, t, !0), this._overwriteProps.push(t)
                }
            }(), _gsScope._gsDefine.plugin({
                propName: "attr",
                API: 2,
                version: "0.3.3",
                init: function(e, t) {
                    var i, n, r;
                    if ("function" != typeof e.setAttribute) return !1;
                    this._target = e, this._proxy = {}, this._start = {}, this._end = {};
                    for (i in t) this._start[i] = this._proxy[i] = n = e.getAttribute(i), r = this._addTween(this._proxy, i, parseFloat(n), t[i], i), this._end[i] = r ? r.s + r.c : t[i], this._overwriteProps.push(i);
                    return !0
                },
                set: function(e) {
                    this._super.setRatio.call(this, e);
                    for (var t, i = this._overwriteProps, n = i.length, r = 1 === e ? this._end : e ? this._proxy : this._start; --n > -1;) t = i[n], this._target.setAttribute(t, r[t] + "")
                }
            }), _gsScope._gsDefine.plugin({
                propName: "directionalRotation",
                version: "0.2.1",
                API: 2,
                init: function(e, t) {
                    "object" != typeof t && (t = {
                        rotation: t
                    }), this.finals = {};
                    var i, n, r, s, a, o, l = t.useRadians === !0 ? 2 * Math.PI : 360,
                        u = 1e-6;
                    for (i in t) "useRadians" !== i && (o = (t[i] + "").split("_"), n = o[0], r = parseFloat("function" != typeof e[i] ? e[i] : e[i.indexOf("set") || "function" != typeof e["get" + i.substr(3)] ? i : "get" + i.substr(3)]()), s = this.finals[i] = "string" == typeof n && "=" === n.charAt(1) ? r + parseInt(n.charAt(0) + "1", 10) * Number(n.substr(2)) : Number(n) || 0, a = s - r, o.length && (n = o.join("_"), -1 !== n.indexOf("short") && (a %= l, a !== a % (l / 2) && (a = 0 > a ? a + l : a - l)), -1 !== n.indexOf("_cw") && 0 > a ? a = (a + 9999999999 * l) % l - (0 | a / l) * l : -1 !== n.indexOf("ccw") && a > 0 && (a = (a - 9999999999 * l) % l - (0 | a / l) * l)), (a > u || -u > a) && (this._addTween(e, i, r, r + a, i), this._overwriteProps.push(i)));
                    return !0
                },
                set: function(e) {
                    var t;
                    if (1 !== e) this._super.setRatio.call(this, e);
                    else
                        for (t = this._firstPT; t;) t.f ? t.t[t.p](this.finals[t.p]) : t.t[t.p] = this.finals[t.p], t = t._next
                }
            })._autoCSS = !0, _gsScope._gsDefine("easing.Back", ["easing.Ease"], function(e) {
                var t, i, n, r = _gsScope.GreenSockGlobals || _gsScope,
                    s = r.com.greensock,
                    a = 2 * Math.PI,
                    o = Math.PI / 2,
                    l = s._class,
                    u = function(t, i) {
                        var n = l("easing." + t, function() {}, !0),
                            r = n.prototype = new e;
                        return r.constructor = n, r.getRatio = i, n
                    },
                    p = e.register || function() {},
                    c = function(e, t, i, n) {
                        var r = l("easing." + e, {
                            easeOut: new t,
                            easeIn: new i,
                            easeInOut: new n
                        }, !0);
                        return p(r, e), r
                    },
                    h = function(e, t, i) {
                        this.t = e, this.v = t, i && (this.next = i, i.prev = this, this.c = i.v - t, this.gap = i.t - e)
                    },
                    d = function(t, i) {
                        var n = l("easing." + t, function(e) {
                                this._p1 = e || 0 === e ? e : 1.70158, this._p2 = 1.525 * this._p1
                            }, !0),
                            r = n.prototype = new e;
                        return r.constructor = n, r.getRatio = i, r.config = function(e) {
                            return new n(e)
                        }, n
                    },
                    f = c("Back", d("BackOut", function(e) {
                        return (e -= 1) * e * ((this._p1 + 1) * e + this._p1) + 1
                    }), d("BackIn", function(e) {
                        return e * e * ((this._p1 + 1) * e - this._p1)
                    }), d("BackInOut", function(e) {
                        return 1 > (e *= 2) ? .5 * e * e * ((this._p2 + 1) * e - this._p2) : .5 * ((e -= 2) * e * ((this._p2 + 1) * e + this._p2) + 2)
                    })),
                    m = l("easing.SlowMo", function(e, t, i) {
                        t = t || 0 === t ? t : .7, null == e ? e = .7 : e > 1 && (e = 1), this._p = 1 !== e ? t : 0, this._p1 = (1 - e) / 2, this._p2 = e, this._p3 = this._p1 + this._p2, this._calcEnd = i === !0
                    }, !0),
                    g = m.prototype = new e;
                return g.constructor = m, g.getRatio = function(e) {
                    var t = e + (.5 - e) * this._p;
                    return this._p1 > e ? this._calcEnd ? 1 - (e = 1 - e / this._p1) * e : t - (e = 1 - e / this._p1) * e * e * e * t : e > this._p3 ? this._calcEnd ? 1 - (e = (e - this._p3) / this._p1) * e : t + (e - t) * (e = (e - this._p3) / this._p1) * e * e * e : this._calcEnd ? 1 : t
                }, m.ease = new m(.7, .7), g.config = m.config = function(e, t, i) {
                    return new m(e, t, i)
                }, t = l("easing.SteppedEase", function(e) {
                    e = e || 1, this._p1 = 1 / e, this._p2 = e + 1
                }, !0), g = t.prototype = new e, g.constructor = t, g.getRatio = function(e) {
                    return 0 > e ? e = 0 : e >= 1 && (e = .999999999), (this._p2 * e >> 0) * this._p1
                }, g.config = t.config = function(e) {
                    return new t(e)
                }, i = l("easing.RoughEase", function(t) {
                    t = t || {};
                    for (var i, n, r, s, a, o, l = t.taper || "none", u = [], p = 0, c = 0 | (t.points || 20), d = c, f = t.randomize !== !1, m = t.clamp === !0, g = t.template instanceof e ? t.template : null, v = "number" == typeof t.strength ? .4 * t.strength : .4; --d > -1;) i = f ? Math.random() : 1 / c * d, n = g ? g.getRatio(i) : i, "none" === l ? r = v : "out" === l ? (s = 1 - i, r = s * s * v) : "in" === l ? r = i * i * v : .5 > i ? (s = 2 * i, r = .5 * s * s * v) : (s = 2 * (1 - i), r = .5 * s * s * v), f ? n += Math.random() * r - .5 * r : d % 2 ? n += .5 * r : n -= .5 * r, m && (n > 1 ? n = 1 : 0 > n && (n = 0)), u[p++] = {
                        x: i,
                        y: n
                    };
                    for (u.sort(function(e, t) {
                            return e.x - t.x
                        }), o = new h(1, 1, null), d = c; --d > -1;) a = u[d], o = new h(a.x, a.y, o);
                    this._prev = new h(0, 0, 0 !== o.t ? o : o.next)
                }, !0), g = i.prototype = new e, g.constructor = i, g.getRatio = function(e) {
                    var t = this._prev;
                    if (e > t.t) {
                        for (; t.next && e >= t.t;) t = t.next;
                        t = t.prev
                    } else
                        for (; t.prev && t.t >= e;) t = t.prev;
                    return this._prev = t, t.v + (e - t.t) / t.gap * t.c
                }, g.config = function(e) {
                    return new i(e)
                }, i.ease = new i, c("Bounce", u("BounceOut", function(e) {
                    return 1 / 2.75 > e ? 7.5625 * e * e : 2 / 2.75 > e ? 7.5625 * (e -= 1.5 / 2.75) * e + .75 : 2.5 / 2.75 > e ? 7.5625 * (e -= 2.25 / 2.75) * e + .9375 : 7.5625 * (e -= 2.625 / 2.75) * e + .984375
                }), u("BounceIn", function(e) {
                    return 1 / 2.75 > (e = 1 - e) ? 1 - 7.5625 * e * e : 2 / 2.75 > e ? 1 - (7.5625 * (e -= 1.5 / 2.75) * e + .75) : 2.5 / 2.75 > e ? 1 - (7.5625 * (e -= 2.25 / 2.75) * e + .9375) : 1 - (7.5625 * (e -= 2.625 / 2.75) * e + .984375)
                }), u("BounceInOut", function(e) {
                    var t = .5 > e;
                    return e = t ? 1 - 2 * e : 2 * e - 1, e = 1 / 2.75 > e ? 7.5625 * e * e : 2 / 2.75 > e ? 7.5625 * (e -= 1.5 / 2.75) * e + .75 : 2.5 / 2.75 > e ? 7.5625 * (e -= 2.25 / 2.75) * e + .9375 : 7.5625 * (e -= 2.625 / 2.75) * e + .984375, t ? .5 * (1 - e) : .5 * e + .5
                })), c("Circ", u("CircOut", function(e) {
                    return Math.sqrt(1 - (e -= 1) * e)
                }), u("CircIn", function(e) {
                    return -(Math.sqrt(1 - e * e) - 1)
                }), u("CircInOut", function(e) {
                    return 1 > (e *= 2) ? -.5 * (Math.sqrt(1 - e * e) - 1) : .5 * (Math.sqrt(1 - (e -= 2) * e) + 1)
                })), n = function(t, i, n) {
                    var r = l("easing." + t, function(e, t) {
                            this._p1 = e || 1, this._p2 = t || n, this._p3 = this._p2 / a * (Math.asin(1 / this._p1) || 0)
                        }, !0),
                        s = r.prototype = new e;
                    return s.constructor = r, s.getRatio = i, s.config = function(e, t) {
                        return new r(e, t)
                    }, r
                }, c("Elastic", n("ElasticOut", function(e) {
                    return this._p1 * Math.pow(2, -10 * e) * Math.sin((e - this._p3) * a / this._p2) + 1
                }, .3), n("ElasticIn", function(e) {
                    return -(this._p1 * Math.pow(2, 10 * (e -= 1)) * Math.sin((e - this._p3) * a / this._p2))
                }, .3), n("ElasticInOut", function(e) {
                    return 1 > (e *= 2) ? -.5 * this._p1 * Math.pow(2, 10 * (e -= 1)) * Math.sin((e - this._p3) * a / this._p2) : .5 * this._p1 * Math.pow(2, -10 * (e -= 1)) * Math.sin((e - this._p3) * a / this._p2) + 1
                }, .45)), c("Expo", u("ExpoOut", function(e) {
                    return 1 - Math.pow(2, -10 * e)
                }), u("ExpoIn", function(e) {
                    return Math.pow(2, 10 * (e - 1)) - .001
                }), u("ExpoInOut", function(e) {
                    return 1 > (e *= 2) ? .5 * Math.pow(2, 10 * (e - 1)) : .5 * (2 - Math.pow(2, -10 * (e - 1)))
                })), c("Sine", u("SineOut", function(e) {
                    return Math.sin(e * o)
                }), u("SineIn", function(e) {
                    return -Math.cos(e * o) + 1
                }), u("SineInOut", function(e) {
                    return -.5 * (Math.cos(Math.PI * e) - 1)
                })), l("easing.EaseLookup", {
                    find: function(t) {
                        return e.map[t]
                    }
                }, !0), p(r.SlowMo, "SlowMo", "ease,"), p(i, "RoughEase", "ease,"), p(t, "SteppedEase", "ease,"), f
            }, !0)
    }), _gsScope._gsDefine && _gsScope._gsQueue.pop()(),
    function(e, t) {
        "use strict";
        var i = e.GreenSockGlobals = e.GreenSockGlobals || e;
        if (!i.TweenLite) {
            var n, r, s, a, o, l = function(e) {
                    var t, n = e.split("."),
                        r = i;
                    for (t = 0; n.length > t; t++) r[n[t]] = r = r[n[t]] || {};
                    return r
                },
                u = l("com.greensock"),
                p = 1e-10,
                c = function(e) {
                    var t, i = [],
                        n = e.length;
                    for (t = 0; t !== n; i.push(e[t++]));
                    return i
                },
                h = function() {},
                d = function() {
                    var e = Object.prototype.toString,
                        t = e.call([]);
                    return function(i) {
                        return null != i && (i instanceof Array || "object" == typeof i && !!i.push && e.call(i) === t)
                    }
                }(),
                f = {},
                m = function(n, r, s, a) {
                    this.sc = f[n] ? f[n].sc : [], f[n] = this, this.gsClass = null, this.func = s;
                    var o = [];
                    this.check = function(u) {
                        for (var p, c, h, d, g = r.length, v = g; --g > -1;)(p = f[r[g]] || new m(r[g], [])).gsClass ? (o[g] = p.gsClass, v--) : u && p.sc.push(this);
                        if (0 === v && s)
                            for (c = ("com.greensock." + n).split("."), h = c.pop(), d = l(c.join("."))[h] = this.gsClass = s.apply(s, o), a && (i[h] = d, "function" == typeof define && define.amd ? define((e.GreenSockAMDPath ? e.GreenSockAMDPath + "/" : "") + n.split(".").pop(), [], function() {
                                    return d
                                }) : n === t && "undefined" != typeof module && module.exports && (module.exports = d)), g = 0; this.sc.length > g; g++) this.sc[g].check()
                    }, this.check(!0)
                },
                g = e._gsDefine = function(e, t, i, n) {
                    return new m(e, t, i, n)
                },
                v = u._class = function(e, t, i) {
                    return t = t || function() {}, g(e, [], function() {
                        return t
                    }, i), t
                };
            g.globals = i;
            var _ = [0, 0, 1, 1],
                y = [],
                w = v("easing.Ease", function(e, t, i, n) {
                    this._func = e, this._type = i || 0, this._power = n || 0, this._params = t ? _.concat(t) : _
                }, !0),
                x = w.map = {},
                T = w.register = function(e, t, i, n) {
                    for (var r, s, a, o, l = t.split(","), p = l.length, c = (i || "easeIn,easeOut,easeInOut").split(","); --p > -1;)
                        for (s = l[p], r = n ? v("easing." + s, null, !0) : u.easing[s] || {}, a = c.length; --a > -1;) o = c[a], x[s + "." + o] = x[o + s] = r[o] = e.getRatio ? e : e[o] || new e
                };
            for (s = w.prototype, s._calcEnd = !1, s.getRatio = function(e) {
                    if (this._func) return this._params[0] = e, this._func.apply(null, this._params);
                    var t = this._type,
                        i = this._power,
                        n = 1 === t ? 1 - e : 2 === t ? e : .5 > e ? 2 * e : 2 * (1 - e);
                    return 1 === i ? n *= n : 2 === i ? n *= n * n : 3 === i ? n *= n * n * n : 4 === i && (n *= n * n * n * n), 1 === t ? 1 - n : 2 === t ? n : .5 > e ? n / 2 : 1 - n / 2
                }, n = ["Linear", "Quad", "Cubic", "Quart", "Quint,Strong"], r = n.length; --r > -1;) s = n[r] + ",Power" + r, T(new w(null, null, 1, r), s, "easeOut", !0), T(new w(null, null, 2, r), s, "easeIn" + (0 === r ? ",easeNone" : "")), T(new w(null, null, 3, r), s, "easeInOut");
            x.linear = u.easing.Linear.easeIn, x.swing = u.easing.Quad.easeInOut;
            var b = v("events.EventDispatcher", function(e) {
                this._listeners = {}, this._eventTarget = e || this
            });
            s = b.prototype, s.addEventListener = function(e, t, i, n, r) {
                r = r || 0;
                var s, l, u = this._listeners[e],
                    p = 0;
                for (null == u && (this._listeners[e] = u = []), l = u.length; --l > -1;) s = u[l], s.c === t && s.s === i ? u.splice(l, 1) : 0 === p && r > s.pr && (p = l + 1);
                u.splice(p, 0, {
                    c: t,
                    s: i,
                    up: n,
                    pr: r
                }), this !== a || o || a.wake()
            }, s.removeEventListener = function(e, t) {
                var i, n = this._listeners[e];
                if (n)
                    for (i = n.length; --i > -1;)
                        if (n[i].c === t) return void n.splice(i, 1)
            }, s.dispatchEvent = function(e) {
                var t, i, n, r = this._listeners[e];
                if (r)
                    for (t = r.length, i = this._eventTarget; --t > -1;) n = r[t], n.up ? n.c.call(n.s || i, {
                        type: e,
                        target: i
                    }) : n.c.call(n.s || i)
            };
            var S = e.requestAnimationFrame,
                C = e.cancelAnimationFrame,
                P = Date.now || function() {
                    return (new Date).getTime()
                },
                k = P();
            for (n = ["ms", "moz", "webkit", "o"], r = n.length; --r > -1 && !S;) S = e[n[r] + "RequestAnimationFrame"], C = e[n[r] + "CancelAnimationFrame"] || e[n[r] + "CancelRequestAnimationFrame"];
            v("Ticker", function(e, t) {
                var i, n, r, s, l, u = this,
                    c = P(),
                    d = t !== !1 && S,
                    f = 500,
                    m = 33,
                    g = function(e) {
                        var t, a, o = P() - k;
                        o > f && (c += o - m), k += o, u.time = (k - c) / 1e3, t = u.time - l, (!i || t > 0 || e === !0) && (u.frame++, l += t + (t >= s ? .004 : s - t), a = !0), e !== !0 && (r = n(g)), a && u.dispatchEvent("tick")
                    };
                b.call(u), u.time = u.frame = 0, u.tick = function() {
                    g(!0)
                }, u.lagSmoothing = function(e, t) {
                    f = e || 1 / p, m = Math.min(t, f, 0)
                }, u.sleep = function() {
                    null != r && (d && C ? C(r) : clearTimeout(r), n = h, r = null, u === a && (o = !1))
                }, u.wake = function() {
                    null !== r ? u.sleep() : u.frame > 10 && (k = P() - f + 5), n = 0 === i ? h : d && S ? S : function(e) {
                        return setTimeout(e, 0 | 1e3 * (l - u.time) + 1)
                    }, u === a && (o = !0), g(2)
                }, u.fps = function(e) {
                    return arguments.length ? (i = e, s = 1 / (i || 60), l = this.time + s, void u.wake()) : i
                }, u.useRAF = function(e) {
                    return arguments.length ? (u.sleep(), d = e, void u.fps(i)) : d
                }, u.fps(e), setTimeout(function() {
                    d && (!r || 5 > u.frame) && u.useRAF(!1)
                }, 1500)
            }), s = u.Ticker.prototype = new u.events.EventDispatcher, s.constructor = u.Ticker;
            var M = v("core.Animation", function(e, t) {
                if (this.vars = t = t || {}, this._duration = this._totalDuration = e || 0, this._delay = Number(t.delay) || 0, this._timeScale = 1, this._active = t.immediateRender === !0, this.data = t.data, this._reversed = t.reversed === !0, X) {
                    o || a.wake();
                    var i = this.vars.useFrames ? $ : X;
                    i.add(this, i._time), this.vars.paused && this.paused(!0)
                }
            });
            a = M.ticker = new u.Ticker, s = M.prototype, s._dirty = s._gc = s._initted = s._paused = !1, s._totalTime = s._time = 0, s._rawPrevTime = -1, s._next = s._last = s._onUpdate = s._timeline = s.timeline = null, s._paused = !1;
            var D = function() {
                o && P() - k > 2e3 && a.wake(), setTimeout(D, 2e3)
            };
            D(), s.play = function(e, t) {
                return null != e && this.seek(e, t), this.reversed(!1).paused(!1)
            }, s.pause = function(e, t) {
                return null != e && this.seek(e, t), this.paused(!0)
            }, s.resume = function(e, t) {
                return null != e && this.seek(e, t), this.paused(!1)
            }, s.seek = function(e, t) {
                return this.totalTime(Number(e), t !== !1)
            }, s.restart = function(e, t) {
                return this.reversed(!1).paused(!1).totalTime(e ? -this._delay : 0, t !== !1, !0)
            }, s.reverse = function(e, t) {
                return null != e && this.seek(e || this.totalDuration(), t), this.reversed(!0).paused(!1)
            }, s.render = function() {}, s.invalidate = function() {
                return this._time = this._totalTime = 0, this._initted = this._gc = !1, this._rawPrevTime = -1, (this._gc || !this.timeline) && this._enabled(!0), this
            }, s.isActive = function() {
                var e, t = this._timeline,
                    i = this._startTime;
                return !t || !this._gc && !this._paused && t.isActive() && (e = t.rawTime()) >= i && i + this.totalDuration() / this._timeScale > e
            }, s._enabled = function(e, t) {
                return o || a.wake(), this._gc = !e, this._active = this.isActive(), t !== !0 && (e && !this.timeline ? this._timeline.add(this, this._startTime - this._delay) : !e && this.timeline && this._timeline._remove(this, !0)), !1
            }, s._kill = function() {
                return this._enabled(!1, !1)
            }, s.kill = function(e, t) {
                return this._kill(e, t), this
            }, s._uncache = function(e) {
                for (var t = e ? this : this.timeline; t;) t._dirty = !0, t = t.timeline;
                return this
            }, s._swapSelfInParams = function(e) {
                for (var t = e.length, i = e.concat(); --t > -1;) "{self}" === e[t] && (i[t] = this);
                return i
            }, s.eventCallback = function(e, t, i, n) {
                if ("on" === (e || "").substr(0, 2)) {
                    var r = this.vars;
                    if (1 === arguments.length) return r[e];
                    null == t ? delete r[e] : (r[e] = t, r[e + "Params"] = d(i) && -1 !== i.join("").indexOf("{self}") ? this._swapSelfInParams(i) : i, r[e + "Scope"] = n), "onUpdate" === e && (this._onUpdate = t)
                }
                return this
            }, s.delay = function(e) {
                return arguments.length ? (this._timeline.smoothChildTiming && this.startTime(this._startTime + e - this._delay), this._delay = e, this) : this._delay
            }, s.duration = function(e) {
                return arguments.length ? (this._duration = this._totalDuration = e, this._uncache(!0), this._timeline.smoothChildTiming && this._time > 0 && this._time < this._duration && 0 !== e && this.totalTime(this._totalTime * (e / this._duration), !0), this) : (this._dirty = !1, this._duration)
            }, s.totalDuration = function(e) {
                return this._dirty = !1, arguments.length ? this.duration(e) : this._totalDuration
            }, s.time = function(e, t) {
                return arguments.length ? (this._dirty && this.totalDuration(), this.totalTime(e > this._duration ? this._duration : e, t)) : this._time
            }, s.totalTime = function(e, t, i) {
                if (o || a.wake(), !arguments.length) return this._totalTime;
                if (this._timeline) {
                    if (0 > e && !i && (e += this.totalDuration()), this._timeline.smoothChildTiming) {
                        this._dirty && this.totalDuration();
                        var n = this._totalDuration,
                            r = this._timeline;
                        if (e > n && !i && (e = n), this._startTime = (this._paused ? this._pauseTime : r._time) - (this._reversed ? n - e : e) / this._timeScale, r._dirty || this._uncache(!1), r._timeline)
                            for (; r._timeline;) r._timeline._time !== (r._startTime + r._totalTime) / r._timeScale && r.totalTime(r._totalTime, !0), r = r._timeline
                    }
                    this._gc && this._enabled(!0, !1), (this._totalTime !== e || 0 === this._duration) && (this.render(e, t, !1), L.length && H())
                }
                return this
            }, s.progress = s.totalProgress = function(e, t) {
                return arguments.length ? this.totalTime(this.duration() * e, t) : this._time / this.duration()
            }, s.startTime = function(e) {
                return arguments.length ? (e !== this._startTime && (this._startTime = e, this.timeline && this.timeline._sortChildren && this.timeline.add(this, e - this._delay)), this) : this._startTime
            }, s.timeScale = function(e) {
                if (!arguments.length) return this._timeScale;
                if (e = e || p, this._timeline && this._timeline.smoothChildTiming) {
                    var t = this._pauseTime,
                        i = t || 0 === t ? t : this._timeline.totalTime();
                    this._startTime = i - (i - this._startTime) * this._timeScale / e
                }
                return this._timeScale = e, this._uncache(!1)
            }, s.reversed = function(e) {
                return arguments.length ? (e != this._reversed && (this._reversed = e, this.totalTime(this._timeline && !this._timeline.smoothChildTiming ? this.totalDuration() - this._totalTime : this._totalTime, !0)), this) : this._reversed
            }, s.paused = function(e) {
                if (!arguments.length) return this._paused;
                if (e != this._paused && this._timeline) {
                    o || e || a.wake();
                    var t = this._timeline,
                        i = t.rawTime(),
                        n = i - this._pauseTime;
                    !e && t.smoothChildTiming && (this._startTime += n, this._uncache(!1)), this._pauseTime = e ? i : null, this._paused = e, this._active = this.isActive(), !e && 0 !== n && this._initted && this.duration() && this.render(t.smoothChildTiming ? this._totalTime : (i - this._startTime) / this._timeScale, !0, !0)
                }
                return this._gc && !e && this._enabled(!0, !1), this
            };
            var E = v("core.SimpleTimeline", function(e) {
                M.call(this, 0, e), this.autoRemoveChildren = this.smoothChildTiming = !0
            });
            s = E.prototype = new M, s.constructor = E, s.kill()._gc = !1, s._first = s._last = null, s._sortChildren = !1, s.add = s.insert = function(e, t) {
                var i, n;
                if (e._startTime = Number(t || 0) + e._delay, e._paused && this !== e._timeline && (e._pauseTime = e._startTime + (this.rawTime() - e._startTime) / e._timeScale), e.timeline && e.timeline._remove(e, !0), e.timeline = e._timeline = this, e._gc && e._enabled(!0, !0), i = this._last, this._sortChildren)
                    for (n = e._startTime; i && i._startTime > n;) i = i._prev;
                return i ? (e._next = i._next, i._next = e) : (e._next = this._first, this._first = e), e._next ? e._next._prev = e : this._last = e, e._prev = i, this._timeline && this._uncache(!0), this
            }, s._remove = function(e, t) {
                return e.timeline === this && (t || e._enabled(!1, !0), e._prev ? e._prev._next = e._next : this._first === e && (this._first = e._next), e._next ? e._next._prev = e._prev : this._last === e && (this._last = e._prev), e._next = e._prev = e.timeline = null, this._timeline && this._uncache(!0)), this
            }, s.render = function(e, t, i) {
                var n, r = this._first;
                for (this._totalTime = this._time = this._rawPrevTime = e; r;) n = r._next, (r._active || e >= r._startTime && !r._paused) && (r._reversed ? r.render((r._dirty ? r.totalDuration() : r._totalDuration) - (e - r._startTime) * r._timeScale, t, i) : r.render((e - r._startTime) * r._timeScale, t, i)), r = n
            }, s.rawTime = function() {
                return o || a.wake(), this._totalTime
            };
            var A = v("TweenLite", function(t, i, n) {
                    if (M.call(this, i, n), this.render = A.prototype.render, null == t) throw "Cannot tween a null target.";
                    this.target = t = "string" != typeof t ? t : A.selector(t) || t;
                    var r, s, a, o = t.jquery || t.length && t !== e && t[0] && (t[0] === e || t[0].nodeType && t[0].style && !t.nodeType),
                        l = this.vars.overwrite;
                    if (this._overwrite = l = null == l ? W[A.defaultOverwrite] : "number" == typeof l ? l >> 0 : W[l], (o || t instanceof Array || t.push && d(t)) && "number" != typeof t[0])
                        for (this._targets = a = c(t), this._propLookup = [], this._siblings = [], r = 0; a.length > r; r++) s = a[r], s ? "string" != typeof s ? s.length && s !== e && s[0] && (s[0] === e || s[0].nodeType && s[0].style && !s.nodeType) ? (a.splice(r--, 1), this._targets = a = a.concat(c(s))) : (this._siblings[r] = q(s, this, !1), 1 === l && this._siblings[r].length > 1 && Y(s, this, null, 1, this._siblings[r])) : (s = a[r--] = A.selector(s), "string" == typeof s && a.splice(r + 1, 1)) : a.splice(r--, 1);
                    else this._propLookup = {}, this._siblings = q(t, this, !1), 1 === l && this._siblings.length > 1 && Y(t, this, null, 1, this._siblings);
                    (this.vars.immediateRender || 0 === i && 0 === this._delay && this.vars.immediateRender !== !1) && (this._time = -p, this.render(-this._delay))
                }, !0),
                O = function(t) {
                    return t.length && t !== e && t[0] && (t[0] === e || t[0].nodeType && t[0].style && !t.nodeType)
                },
                R = function(e, t) {
                    var i, n = {};
                    for (i in e) B[i] || i in t && "transform" !== i && "x" !== i && "y" !== i && "width" !== i && "height" !== i && "className" !== i && "border" !== i || !(!z[i] || z[i] && z[i]._autoCSS) || (n[i] = e[i], delete e[i]);
                    e.css = n
                };
            s = A.prototype = new M, s.constructor = A, s.kill()._gc = !1, s.ratio = 0, s._firstPT = s._targets = s._overwrittenProps = s._startAt = null, s._notifyPluginsOfEnabled = s._lazy = !1, A.version = "1.13.2", A.defaultEase = s._ease = new w(null, null, 1, 1), A.defaultOverwrite = "auto", A.ticker = a, A.autoSleep = !0, A.lagSmoothing = function(e, t) {
                a.lagSmoothing(e, t)
            }, A.selector = e.$ || e.jQuery || function(t) {
                var i = e.$ || e.jQuery;
                return i ? (A.selector = i, i(t)) : "undefined" == typeof document ? t : document.querySelectorAll ? document.querySelectorAll(t) : document.getElementById("#" === t.charAt(0) ? t.substr(1) : t)
            };
            var L = [],
                N = {},
                I = A._internals = {
                    isArray: d,

                    isSelector: O,
                    lazyTweens: L
                },
                z = A._plugins = {},
                j = I.tweenLookup = {},
                F = 0,
                B = I.reservedProps = {
                    ease: 1,
                    delay: 1,
                    overwrite: 1,
                    onComplete: 1,
                    onCompleteParams: 1,
                    onCompleteScope: 1,
                    useFrames: 1,
                    runBackwards: 1,
                    startAt: 1,
                    onUpdate: 1,
                    onUpdateParams: 1,
                    onUpdateScope: 1,
                    onStart: 1,
                    onStartParams: 1,
                    onStartScope: 1,
                    onReverseComplete: 1,
                    onReverseCompleteParams: 1,
                    onReverseCompleteScope: 1,
                    onRepeat: 1,
                    onRepeatParams: 1,
                    onRepeatScope: 1,
                    easeParams: 1,
                    yoyo: 1,
                    immediateRender: 1,
                    repeat: 1,
                    repeatDelay: 1,
                    data: 1,
                    paused: 1,
                    reversed: 1,
                    autoCSS: 1,
                    lazy: 1
                },
                W = {
                    none: 0,
                    all: 1,
                    auto: 2,
                    concurrent: 3,
                    allOnStart: 4,
                    preexisting: 5,
                    "true": 1,
                    "false": 0
                },
                $ = M._rootFramesTimeline = new E,
                X = M._rootTimeline = new E,
                H = I.lazyRender = function() {
                    var e = L.length;
                    for (N = {}; --e > -1;) n = L[e], n && n._lazy !== !1 && (n.render(n._lazy[0], n._lazy[1], !0), n._lazy = !1);
                    L.length = 0
                };
            X._startTime = a.time, $._startTime = a.frame, X._active = $._active = !0, setTimeout(H, 1), M._updateRoot = A.render = function() {
                var e, t, i;
                if (L.length && H(), X.render((a.time - X._startTime) * X._timeScale, !1, !1), $.render((a.frame - $._startTime) * $._timeScale, !1, !1), L.length && H(), !(a.frame % 120)) {
                    for (i in j) {
                        for (t = j[i].tweens, e = t.length; --e > -1;) t[e]._gc && t.splice(e, 1);
                        0 === t.length && delete j[i]
                    }
                    if (i = X._first, (!i || i._paused) && A.autoSleep && !$._first && 1 === a._listeners.tick.length) {
                        for (; i && i._paused;) i = i._next;
                        i || a.sleep()
                    }
                }
            }, a.addEventListener("tick", M._updateRoot);
            var q = function(e, t, i) {
                    var n, r, s = e._gsTweenID;
                    if (j[s || (e._gsTweenID = s = "t" + F++)] || (j[s] = {
                            target: e,
                            tweens: []
                        }), t && (n = j[s].tweens, n[r = n.length] = t, i))
                        for (; --r > -1;) n[r] === t && n.splice(r, 1);
                    return j[s].tweens
                },
                Y = function(e, t, i, n, r) {
                    var s, a, o, l;
                    if (1 === n || n >= 4) {
                        for (l = r.length, s = 0; l > s; s++)
                            if ((o = r[s]) !== t) o._gc || o._enabled(!1, !1) && (a = !0);
                            else if (5 === n) break;
                        return a
                    }
                    var u, c = t._startTime + p,
                        h = [],
                        d = 0,
                        f = 0 === t._duration;
                    for (s = r.length; --s > -1;)(o = r[s]) === t || o._gc || o._paused || (o._timeline !== t._timeline ? (u = u || G(t, 0, f), 0 === G(o, u, f) && (h[d++] = o)) : c >= o._startTime && o._startTime + o.totalDuration() / o._timeScale > c && ((f || !o._initted) && 2e-10 >= c - o._startTime || (h[d++] = o)));
                    for (s = d; --s > -1;) o = h[s], 2 === n && o._kill(i, e) && (a = !0), (2 !== n || !o._firstPT && o._initted) && o._enabled(!1, !1) && (a = !0);
                    return a
                },
                G = function(e, t, i) {
                    for (var n = e._timeline, r = n._timeScale, s = e._startTime; n._timeline;) {
                        if (s += n._startTime, r *= n._timeScale, n._paused) return -100;
                        n = n._timeline
                    }
                    return s /= r, s > t ? s - t : i && s === t || !e._initted && 2 * p > s - t ? p : (s += e.totalDuration() / e._timeScale / r) > t + p ? 0 : s - t - p
                };
            s._init = function() {
                var e, t, i, n, r, s = this.vars,
                    a = this._overwrittenProps,
                    o = this._duration,
                    l = !!s.immediateRender,
                    u = s.ease;
                if (s.startAt) {
                    this._startAt && (this._startAt.render(-1, !0), this._startAt.kill()), r = {};
                    for (n in s.startAt) r[n] = s.startAt[n];
                    if (r.overwrite = !1, r.immediateRender = !0, r.lazy = l && s.lazy !== !1, r.startAt = r.delay = null, this._startAt = A.to(this.target, 0, r), l)
                        if (this._time > 0) this._startAt = null;
                        else if (0 !== o) return
                } else if (s.runBackwards && 0 !== o)
                    if (this._startAt) this._startAt.render(-1, !0), this._startAt.kill(), this._startAt = null;
                    else {
                        0 !== this._time && (l = !1), i = {};
                        for (n in s) B[n] && "autoCSS" !== n || (i[n] = s[n]);
                        if (i.overwrite = 0, i.data = "isFromStart", i.lazy = l && s.lazy !== !1, i.immediateRender = l, this._startAt = A.to(this.target, 0, i), l) {
                            if (0 === this._time) return
                        } else this._startAt._init(), this._startAt._enabled(!1), this.vars.immediateRender && (this._startAt = null)
                    }
                if (this._ease = u = u ? u instanceof w ? u : "function" == typeof u ? new w(u, s.easeParams) : x[u] || A.defaultEase : A.defaultEase, s.easeParams instanceof Array && u.config && (this._ease = u.config.apply(u, s.easeParams)), this._easeType = this._ease._type, this._easePower = this._ease._power, this._firstPT = null, this._targets)
                    for (e = this._targets.length; --e > -1;) this._initProps(this._targets[e], this._propLookup[e] = {}, this._siblings[e], a ? a[e] : null) && (t = !0);
                else t = this._initProps(this.target, this._propLookup, this._siblings, a);
                if (t && A._onPluginEvent("_onInitAllProps", this), a && (this._firstPT || "function" != typeof this.target && this._enabled(!1, !1)), s.runBackwards)
                    for (i = this._firstPT; i;) i.s += i.c, i.c = -i.c, i = i._next;
                this._onUpdate = s.onUpdate, this._initted = !0
            }, s._initProps = function(t, i, n, r) {
                var s, a, o, l, u, p;
                if (null == t) return !1;
                N[t._gsTweenID] && H(), this.vars.css || t.style && t !== e && t.nodeType && z.css && this.vars.autoCSS !== !1 && R(this.vars, t);
                for (s in this.vars) {
                    if (p = this.vars[s], B[s]) p && (p instanceof Array || p.push && d(p)) && -1 !== p.join("").indexOf("{self}") && (this.vars[s] = p = this._swapSelfInParams(p, this));
                    else if (z[s] && (l = new z[s])._onInitTween(t, this.vars[s], this)) {
                        for (this._firstPT = u = {
                                _next: this._firstPT,
                                t: l,
                                p: "setRatio",
                                s: 0,
                                c: 1,
                                f: !0,
                                n: s,
                                pg: !0,
                                pr: l._priority
                            }, a = l._overwriteProps.length; --a > -1;) i[l._overwriteProps[a]] = this._firstPT;
                        (l._priority || l._onInitAllProps) && (o = !0), (l._onDisable || l._onEnable) && (this._notifyPluginsOfEnabled = !0)
                    } else this._firstPT = i[s] = u = {
                        _next: this._firstPT,
                        t: t,
                        p: s,
                        f: "function" == typeof t[s],
                        n: s,
                        pg: !1,
                        pr: 0
                    }, u.s = u.f ? t[s.indexOf("set") || "function" != typeof t["get" + s.substr(3)] ? s : "get" + s.substr(3)]() : parseFloat(t[s]), u.c = "string" == typeof p && "=" === p.charAt(1) ? parseInt(p.charAt(0) + "1", 10) * Number(p.substr(2)) : Number(p) - u.s || 0;
                    u && u._next && (u._next._prev = u)
                }
                return r && this._kill(r, t) ? this._initProps(t, i, n, r) : this._overwrite > 1 && this._firstPT && n.length > 1 && Y(t, this, i, this._overwrite, n) ? (this._kill(i, t), this._initProps(t, i, n, r)) : (this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration) && (N[t._gsTweenID] = !0), o)
            }, s.render = function(e, t, i) {
                var n, r, s, a, o = this._time,
                    l = this._duration,
                    u = this._rawPrevTime;
                if (e >= l) this._totalTime = this._time = l, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1, this._reversed || (n = !0, r = "onComplete"), 0 === l && (this._initted || !this.vars.lazy || i) && (this._startTime === this._timeline._duration && (e = 0), (0 === e || 0 > u || u === p) && u !== e && (i = !0, u > p && (r = "onReverseComplete")), this._rawPrevTime = a = !t || e || u === e ? e : p);
                else if (1e-7 > e) this._totalTime = this._time = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0, (0 !== o || 0 === l && u > 0 && u !== p) && (r = "onReverseComplete", n = this._reversed), 0 > e && (this._active = !1, 0 === l && (this._initted || !this.vars.lazy || i) && (u >= 0 && (i = !0), this._rawPrevTime = a = !t || e || u === e ? e : p)), this._initted || (i = !0);
                else if (this._totalTime = this._time = e, this._easeType) {
                    var c = e / l,
                        h = this._easeType,
                        d = this._easePower;
                    (1 === h || 3 === h && c >= .5) && (c = 1 - c), 3 === h && (c *= 2), 1 === d ? c *= c : 2 === d ? c *= c * c : 3 === d ? c *= c * c * c : 4 === d && (c *= c * c * c * c), this.ratio = 1 === h ? 1 - c : 2 === h ? c : .5 > e / l ? c / 2 : 1 - c / 2
                } else this.ratio = this._ease.getRatio(e / l);
                if (this._time !== o || i) {
                    if (!this._initted) {
                        if (this._init(), !this._initted || this._gc) return;
                        if (!i && this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration)) return this._time = this._totalTime = o, this._rawPrevTime = u, L.push(this), void(this._lazy = [e, t]);
                        this._time && !n ? this.ratio = this._ease.getRatio(this._time / l) : n && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1))
                    }
                    for (this._lazy !== !1 && (this._lazy = !1), this._active || !this._paused && this._time !== o && e >= 0 && (this._active = !0), 0 === o && (this._startAt && (e >= 0 ? this._startAt.render(e, t, i) : r || (r = "_dummyGS")), this.vars.onStart && (0 !== this._time || 0 === l) && (t || this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || y))), s = this._firstPT; s;) s.f ? s.t[s.p](s.c * this.ratio + s.s) : s.t[s.p] = s.c * this.ratio + s.s, s = s._next;
                    this._onUpdate && (0 > e && this._startAt && this._startTime && this._startAt.render(e, t, i), t || (this._time !== o || n) && this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || y)), r && (!this._gc || i) && (0 > e && this._startAt && !this._onUpdate && this._startTime && this._startAt.render(e, t, i), n && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !t && this.vars[r] && this.vars[r].apply(this.vars[r + "Scope"] || this, this.vars[r + "Params"] || y), 0 === l && this._rawPrevTime === p && a !== p && (this._rawPrevTime = 0))
                }
            }, s._kill = function(e, t) {
                if ("all" === e && (e = null), null != e || null != t && t !== this.target) {
                    t = "string" != typeof t ? t || this._targets || this.target : A.selector(t) || t;
                    var i, n, r, s, a, o, l, u;
                    if ((d(t) || O(t)) && "number" != typeof t[0])
                        for (i = t.length; --i > -1;) this._kill(e, t[i]) && (o = !0);
                    else {
                        if (this._targets) {
                            for (i = this._targets.length; --i > -1;)
                                if (t === this._targets[i]) {
                                    a = this._propLookup[i] || {}, this._overwrittenProps = this._overwrittenProps || [], n = this._overwrittenProps[i] = e ? this._overwrittenProps[i] || {} : "all";
                                    break
                                }
                        } else {
                            if (t !== this.target) return !1;
                            a = this._propLookup, n = this._overwrittenProps = e ? this._overwrittenProps || {} : "all"
                        }
                        if (a) {
                            l = e || a, u = e !== n && "all" !== n && e !== a && ("object" != typeof e || !e._tempKill);
                            for (r in l)(s = a[r]) && (s.pg && s.t._kill(l) && (o = !0), s.pg && 0 !== s.t._overwriteProps.length || (s._prev ? s._prev._next = s._next : s === this._firstPT && (this._firstPT = s._next), s._next && (s._next._prev = s._prev), s._next = s._prev = null), delete a[r]), u && (n[r] = 1);
                            !this._firstPT && this._initted && this._enabled(!1, !1)
                        }
                    }
                    return o
                }
                return this._lazy = !1, this._enabled(!1, !1)
            }, s.invalidate = function() {
                return this._notifyPluginsOfEnabled && A._onPluginEvent("_onDisable", this), this._firstPT = this._overwrittenProps = this._startAt = this._onUpdate = null, this._notifyPluginsOfEnabled = this._active = this._lazy = !1, this._propLookup = this._targets ? {} : [], M.prototype.invalidate.call(this), this.vars.immediateRender && (this._time = -p, this.render(-this._delay)), this
            }, s._enabled = function(e, t) {
                if (o || a.wake(), e && this._gc) {
                    var i, n = this._targets;
                    if (n)
                        for (i = n.length; --i > -1;) this._siblings[i] = q(n[i], this, !0);
                    else this._siblings = q(this.target, this, !0)
                }
                return M.prototype._enabled.call(this, e, t), this._notifyPluginsOfEnabled && this._firstPT ? A._onPluginEvent(e ? "_onEnable" : "_onDisable", this) : !1
            }, A.to = function(e, t, i) {
                return new A(e, t, i)
            }, A.from = function(e, t, i) {
                return i.runBackwards = !0, i.immediateRender = 0 != i.immediateRender, new A(e, t, i)
            }, A.fromTo = function(e, t, i, n) {
                return n.startAt = i, n.immediateRender = 0 != n.immediateRender && 0 != i.immediateRender, new A(e, t, n)
            }, A.delayedCall = function(e, t, i, n, r) {
                return new A(t, 0, {
                    delay: e,
                    onComplete: t,
                    onCompleteParams: i,
                    onCompleteScope: n,
                    onReverseComplete: t,
                    onReverseCompleteParams: i,
                    onReverseCompleteScope: n,
                    immediateRender: !1,
                    useFrames: r,
                    overwrite: 0
                })
            }, A.set = function(e, t) {
                return new A(e, 0, t)
            }, A.getTweensOf = function(e, t) {
                if (null == e) return [];
                e = "string" != typeof e ? e : A.selector(e) || e;
                var i, n, r, s;
                if ((d(e) || O(e)) && "number" != typeof e[0]) {
                    for (i = e.length, n = []; --i > -1;) n = n.concat(A.getTweensOf(e[i], t));
                    for (i = n.length; --i > -1;)
                        for (s = n[i], r = i; --r > -1;) s === n[r] && n.splice(i, 1)
                } else
                    for (n = q(e).concat(), i = n.length; --i > -1;)(n[i]._gc || t && !n[i].isActive()) && n.splice(i, 1);
                return n
            }, A.killTweensOf = A.killDelayedCallsTo = function(e, t, i) {
                "object" == typeof t && (i = t, t = !1);
                for (var n = A.getTweensOf(e, t), r = n.length; --r > -1;) n[r]._kill(i, e)
            };
            var V = v("plugins.TweenPlugin", function(e, t) {
                this._overwriteProps = (e || "").split(","), this._propName = this._overwriteProps[0], this._priority = t || 0, this._super = V.prototype
            }, !0);
            if (s = V.prototype, V.version = "1.10.1", V.API = 2, s._firstPT = null, s._addTween = function(e, t, i, n, r, s) {
                    var a, o;
                    return null != n && (a = "number" == typeof n || "=" !== n.charAt(1) ? Number(n) - i : parseInt(n.charAt(0) + "1", 10) * Number(n.substr(2))) ? (this._firstPT = o = {
                        _next: this._firstPT,
                        t: e,
                        p: t,
                        s: i,
                        c: a,
                        f: "function" == typeof e[t],
                        n: r || t,
                        r: s
                    }, o._next && (o._next._prev = o), o) : void 0
                }, s.setRatio = function(e) {
                    for (var t, i = this._firstPT, n = 1e-6; i;) t = i.c * e + i.s, i.r ? t = Math.round(t) : n > t && t > -n && (t = 0), i.f ? i.t[i.p](t) : i.t[i.p] = t, i = i._next
                }, s._kill = function(e) {
                    var t, i = this._overwriteProps,
                        n = this._firstPT;
                    if (null != e[this._propName]) this._overwriteProps = [];
                    else
                        for (t = i.length; --t > -1;) null != e[i[t]] && i.splice(t, 1);
                    for (; n;) null != e[n.n] && (n._next && (n._next._prev = n._prev), n._prev ? (n._prev._next = n._next, n._prev = null) : this._firstPT === n && (this._firstPT = n._next)), n = n._next;
                    return !1
                }, s._roundProps = function(e, t) {
                    for (var i = this._firstPT; i;)(e[this._propName] || null != i.n && e[i.n.split(this._propName + "_").join("")]) && (i.r = t), i = i._next
                }, A._onPluginEvent = function(e, t) {
                    var i, n, r, s, a, o = t._firstPT;
                    if ("_onInitAllProps" === e) {
                        for (; o;) {
                            for (a = o._next, n = r; n && n.pr > o.pr;) n = n._next;
                            (o._prev = n ? n._prev : s) ? o._prev._next = o: r = o, (o._next = n) ? n._prev = o : s = o, o = a
                        }
                        o = t._firstPT = r
                    }
                    for (; o;) o.pg && "function" == typeof o.t[e] && o.t[e]() && (i = !0), o = o._next;
                    return i
                }, V.activate = function(e) {
                    for (var t = e.length; --t > -1;) e[t].API === V.API && (z[(new e[t])._propName] = e[t]);
                    return !0
                }, g.plugin = function(e) {
                    if (!(e && e.propName && e.init && e.API)) throw "illegal plugin definition.";
                    var t, i = e.propName,
                        n = e.priority || 0,
                        r = e.overwriteProps,
                        s = {
                            init: "_onInitTween",
                            set: "setRatio",
                            kill: "_kill",
                            round: "_roundProps",
                            initAll: "_onInitAllProps"
                        },
                        a = v("plugins." + i.charAt(0).toUpperCase() + i.substr(1) + "Plugin", function() {
                            V.call(this, i, n), this._overwriteProps = r || []
                        }, e.global === !0),
                        o = a.prototype = new V(i);
                    o.constructor = a, a.API = e.API;
                    for (t in s) "function" == typeof e[t] && (o[s[t]] = e[t]);
                    return a.version = e.version, V.activate([a]), a
                }, n = e._gsQueue) {
                for (r = 0; n.length > r; r++) n[r]();
                for (s in f) f[s].func || e.console.log("GSAP encountered missing dependency: com.greensock." + s)
            }
            o = !1
        }
    }("undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window, "TweenMax");
var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function() {
    "use strict";
    var e = document.documentElement,
        t = window,
        i = function(i, n) {
            var r = "x" === n ? "Width" : "Height",
                s = "scroll" + r,
                a = "client" + r,
                o = document.body;
            return i === t || i === e || i === o ? Math.max(e[s], o[s]) - (t["inner" + r] || Math.max(e[a], o[a])) : i[s] - i["offset" + r]
        },
        n = _gsScope._gsDefine.plugin({
            propName: "scrollTo",
            API: 2,
            version: "1.7.4",
            init: function(e, n, r) {
                return this._wdw = e === t, this._target = e, this._tween = r, "object" != typeof n && (n = {
                    y: n
                }), this.vars = n, this._autoKill = n.autoKill !== !1, this.x = this.xPrev = this.getX(), this.y = this.yPrev = this.getY(), null != n.x ? (this._addTween(this, "x", this.x, "max" === n.x ? i(e, "x") : n.x, "scrollTo_x", !0), this._overwriteProps.push("scrollTo_x")) : this.skipX = !0, null != n.y ? (this._addTween(this, "y", this.y, "max" === n.y ? i(e, "y") : n.y, "scrollTo_y", !0), this._overwriteProps.push("scrollTo_y")) : this.skipY = !0, !0
            },
            set: function(e) {
                this._super.setRatio.call(this, e);
                var n = this._wdw || !this.skipX ? this.getX() : this.xPrev,
                    r = this._wdw || !this.skipY ? this.getY() : this.yPrev,
                    s = r - this.yPrev,
                    a = n - this.xPrev;
                this._autoKill && (!this.skipX && (a > 7 || -7 > a) && i(this._target, "x") > n && (this.skipX = !0), !this.skipY && (s > 7 || -7 > s) && i(this._target, "y") > r && (this.skipY = !0), this.skipX && this.skipY && (this._tween.kill(), this.vars.onAutoKill && this.vars.onAutoKill.apply(this.vars.onAutoKillScope || this._tween, this.vars.onAutoKillParams || []))), this._wdw ? t.scrollTo(this.skipX ? n : this.x, this.skipY ? r : this.y) : (this.skipY || (this._target.scrollTop = this.y), this.skipX || (this._target.scrollLeft = this.x)), this.xPrev = this.x, this.yPrev = this.y
            }
        }),
        r = n.prototype;
    n.max = i, r.getX = function() {
        return this._wdw ? null != t.pageXOffset ? t.pageXOffset : null != e.scrollLeft ? e.scrollLeft : document.body.scrollLeft : this._target.scrollLeft
    }, r.getY = function() {
        return this._wdw ? null != t.pageYOffset ? t.pageYOffset : null != e.scrollTop ? e.scrollTop : document.body.scrollTop : this._target.scrollTop
    }, r._kill = function(e) {
        return e.scrollTo_x && (this.skipX = !0), e.scrollTo_y && (this.skipY = !0), this._super._kill.call(this, e)
    }
}), _gsScope._gsDefine && _gsScope._gsQueue.pop()(), ! function() {
    "use strict";

    function e(e) {
        e.fn.swiper = function(t) {
            var i;
            return e(this).each(function() {
                var e = new Swiper(this, t);
                i || (i = e)
            }), i
        }
    }
    window.Swiper = function(e, i) {
        function n() {
            return "horizontal" === d.params.direction
        }

        function r() {
            d.autoplayTimeoutId = setTimeout(function() {
                d.params.loop ? (d.fixLoop(), d._slideNext()) : d.isEnd ? i.autoplayStopOnLast ? d.stopAutoplay() : d._slideTo(0) : d._slideNext()
            }, d.params.autoplay)
        }

        function s(e, t) {
            var i = f(e.target);
            if (!i.is(t))
                if ("string" == typeof t) i = i.parents(t);
                else if (t.nodeType) {
                var n;
                return i.parents().each(function(e, i) {
                    i === t && (n = t)
                }), n ? t : void 0
            }
            return 0 === i.length ? void 0 : i[0]
        }

        function a(e, t) {
            t = t || {};
            var i = window.MutationObserver || window.WebkitMutationObserver,
                n = new i(function(e) {
                    e.forEach(function(e) {
                        d.onResize(), d.params.onObserverUpdate && d.params.onObserverUpdate(d, e)
                    })
                });
            n.observe(e, {
                attributes: "undefined" == typeof t.attributes ? !0 : t.attributes,
                childList: "undefined" == typeof t.childList ? !0 : t.childList,
                characterData: "undefined" == typeof t.characterData ? !0 : t.characterData
            }), d.observers.push(n)
        }

        function o(e) {
            e.originalEvent && (e = e.originalEvent);
            var t = e.keyCode || e.charCode;
            if (!(e.shiftKey || e.altKey || e.ctrlKey || e.metaKey || document.activeElement && document.activeElement.nodeName && ("input" === document.activeElement.nodeName.toLowerCase() || "textarea" === document.activeElement.nodeName.toLowerCase()))) {
                if (37 === t || 39 === t || 38 === t || 40 === t) {
                    var i = !1;
                    if (d.container.parents(".swiper-slide").length > 0 && 0 === d.container.parents(".swiper-slide-active").length) return;
                    for (var r = {
                            left: window.pageXOffset,
                            top: window.pageYOffset
                        }, s = window.innerWidth, a = window.innerHeight, o = d.container.offset(), l = [
                            [o.left, o.top],
                            [o.left + d.width, o.top],
                            [o.left, o.top + d.height],
                            [o.left + d.width, o.top + d.height]
                        ], u = 0; u < l.length; u++) {
                        var p = l[u];
                        p[0] >= r.left && p[0] <= r.left + s && p[1] >= r.top && p[1] <= r.top + a && (i = !0)
                    }
                    if (!i) return
                }
                n() ? ((37 === t || 39 === t) && (e.preventDefault ? e.preventDefault() : e.returnValue = !1), 39 === t && d.slideNext(), 37 === t && d.slidePrev()) : ((38 === t || 40 === t) && (e.preventDefault ? e.preventDefault() : e.returnValue = !1), 40 === t && d.slideNext(), 38 === t && d.slidePrev())
            }
        }

        function l(e) {
            e.originalEvent && (e = e.originalEvent);
            var t = d._wheelEvent,
                i = 0;
            if (e.detail) i = -e.detail;
            else if ("mousewheel" === t)
                if (d.params.mousewheelForceToAxis)
                    if (n()) {
                        if (!(Math.abs(e.wheelDeltaX) > Math.abs(e.wheelDeltaY))) return;
                        i = e.wheelDeltaX
                    } else {
                        if (!(Math.abs(e.wheelDeltaY) > Math.abs(e.wheelDeltaX))) return;
                        i = e.wheelDeltaY
                    } else i = e.wheelDelta;
            else if ("DOMMouseScroll" === t) i = -e.detail;
            else if ("wheel" === t)
                if (d.params.mousewheelForceToAxis)
                    if (n()) {
                        if (!(Math.abs(e.deltaX) > Math.abs(e.deltaY))) return;
                        i = -e.deltaX
                    } else {
                        if (!(Math.abs(e.deltaY) > Math.abs(e.deltaX))) return;
                        i = -e.deltaY
                    } else i = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? -e.deltaX : -e.deltaY;
            if (d.params.freeMode) {
                var r = d.getWrapperTranslate() + i;
                if (r > 0 && (r = 0), r < d.maxTranslate() && (r = d.maxTranslate()), d.setWrapperTransition(0), d.setWrapperTranslate(r), d.updateProgress(), d.updateActiveIndex(), 0 === r || r === d.maxTranslate()) return
            } else(new Date).getTime() - d._lastWheelScrollTime > 60 && (0 > i ? d.slideNext() : d.slidePrev()), d._lastWheelScrollTime = (new Date).getTime();
            return d.params.autoplay && d.stopAutoplay(), e.preventDefault ? e.preventDefault() : e.returnValue = !1, !1
        }

        function u(e, t) {
            e = f(e);
            var i, r, s, a, o;
            i = e.attr("data-swiper-parallax"), r = e.attr("data-swiper-parallax-x"), s = e.attr("data-swiper-parallax-y"), r || s || !i ? (r = r ? r : "0", s = s ? s : "0") : n() ? (r = i, s = "0") : (s = i, r = "0"), r = r.indexOf("%") >= 0 ? parseInt(r, 10) * t + "%" : r * t + "px", s = s.indexOf("%") >= 0 ? parseInt(s, 10) * t + "%" : s * t + "px", a = r, o = s, e.transform("translate3d(" + a + ", " + o + ",0px)")
        }
        var p = {
            direction: "horizontal",
            touchEventsTarget: "container",
            initialSlide: 0,
            speed: 300,
            autoplay: !1,
            autoplayDisableOnInteraction: !0,
            freeMode: !1,
            freeModeMomentum: !0,
            freeModeMomentumRatio: 1,
            freeModeMomentumBounce: !0,
            freeModeMomentumBounceRatio: 1,
            effect: "slide",
            coverflow: {
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: !0
            },
            cube: {
                slideShadows: !0,
                shadow: !0,
                shadowOffset: 20,
                shadowScale: .94
            },
            fade: {
                crossFade: !1
            },
            parallax: !1,
            scrollbar: null,
            scrollbarHide: !0,
            keyboardControl: !1,
            mousewheelControl: !1,
            mousewheelForceToAxis: !1,
            hashnav: !1,
            spaceBetween: 0,
            slidesPerView: 1,
            slidesPerColumn: 1,
            slidesPerColumnFill: "column",
            slidesPerGroup: 1,
            centeredSlides: !1,
            touchRatio: 1,
            touchAngle: 45,
            simulateTouch: !0,
            shortSwipes: !0,
            longSwipes: !0,
            longSwipesRatio: .5,
            longSwipesMs: 300,
            followFinger: !0,
            onlyExternal: !1,
            threshold: 0,
            touchMoveStopPropagation: !0,
            pagination: null,
            paginationClickable: !1,
            paginationHide: !1,
            paginationBulletRender: null,
            resistance: !0,
            resistanceRatio: .85,
            nextButton: null,
            prevButton: null,
            watchSlidesProgress: !1,
            watchSlidesVisibility: !1,
            grabCursor: !1,
            preventClicks: !0,
            preventClicksPropagation: !0,
            slideToClickedSlide: !1,
            lazyLoading: !1,
            lazyLoadingInPrevNext: !1,
            lazyLoadingOnTransitionStart: !1,
            preloadImages: !0,
            updateOnImagesReady: !0,
            loop: !1,
            loopAdditionalSlides: 0,
            loopedSlides: null,
            control: void 0,
            controlInverse: !1,
            allowSwipeToPrev: !0,
            allowSwipeToNext: !0,
            swipeHandler: null,
            noSwiping: !0,
            noSwipingClass: "swiper-no-swiping",
            slideClass: "swiper-slide",
            slideActiveClass: "swiper-slide-active",
            slideVisibleClass: "swiper-slide-visible",
            slideDuplicateClass: "swiper-slide-duplicate",
            slideNextClass: "swiper-slide-next",
            slidePrevClass: "swiper-slide-prev",
            wrapperClass: "swiper-wrapper",
            bulletClass: "swiper-pagination-bullet",
            bulletActiveClass: "swiper-pagination-bullet-active",
            buttonDisabledClass: "swiper-button-disabled",
            paginationHiddenClass: "swiper-pagination-hidden",
            observer: !1,
            observeParents: !1,
            runCallbacksOnInit: !0
        };
        i = i || {};
        for (var c in p)
            if ("undefined" == typeof i[c]) i[c] = p[c];
            else if ("object" == typeof i[c])
            for (var h in p[c]) "undefined" == typeof i[c][h] && (i[c][h] = p[c][h]);
        var d = this;
        d.params = i;
        var f;
        if (f = "undefined" == typeof t ? window.Dom7 || window.Zepto || window.jQuery : t, f && (d.container = f(e), 0 !== d.container.length)) {
            if (d.container.length > 1) return void d.container.each(function() {
                new Swiper(this, i)
            });
            d.container[0].swiper = d, d.container.data("swiper", d), d.container.addClass("swiper-container-" + d.params.direction), d.params.freeMode && d.container.addClass("swiper-container-free-mode"), (d.params.parallax || d.params.watchSlidesVisibility) && (d.params.watchSlidesProgress = !0), ["cube", "coverflow"].indexOf(d.params.effect) >= 0 && (d.support.transforms3d ? (d.params.watchSlidesProgress = !0, d.container.addClass("swiper-container-3d")) : d.params.effect = "slide"), "slide" !== d.params.effect && d.container.addClass("swiper-container-" + d.params.effect), "cube" === d.params.effect && (d.params.resistanceRatio = 0, d.params.slidesPerView = 1, d.params.slidesPerColumn = 1, d.params.slidesPerGroup = 1, d.params.centeredSlides = !1, d.params.spaceBetween = 0), "fade" === d.params.effect && (d.params.watchSlidesProgress = !0, d.params.spaceBetween = 0), d.params.grabCursor && d.support.touch && (d.params.grabCursor = !1), d.wrapper = d.container.children("." + d.params.wrapperClass), d.params.pagination && (d.paginationContainer = f(d.params.pagination), d.params.paginationClickable && d.paginationContainer.addClass("swiper-pagination-clickable")), d.rtl = n() && ("rtl" === d.container[0].dir.toLowerCase() || "rtl" === d.container.css("direction")), d.rtl && d.container.addClass("swiper-container-rtl"), d.rtl && (d.wrongRTL = "-webkit-box" === d.wrapper.css("display")), d.translate = 0, d.progress = 0, d.velocity = 0, d.lockSwipeToNext = function() {
                d.params.allowSwipeToNext = !1
            }, d.lockSwipeToPrev = function() {
                d.params.allowSwipeToPrev = !1
            }, d.lockSwipes = function() {
                d.params.allowSwipeToNext = d.params.allowSwipeToPrev = !1
            }, d.unlockSwipeToNext = function() {
                d.params.allowSwipeToNext = !0
            }, d.unlockSwipeToPrev = function() {
                d.params.allowSwipeToPrev = !0
            }, d.unlockSwipes = function() {
                d.params.allowSwipeToNext = d.params.allowSwipeToPrev = !0
            }, d.params.slidesPerColumn > 1 && d.container.addClass("swiper-container-multirow"), d.params.grabCursor && (d.container[0].style.cursor = "move", d.container[0].style.cursor = "-webkit-grab", d.container[0].style.cursor = "-moz-grab", d.container[0].style.cursor = "grab"), d.imagesToLoad = [], d.imagesLoaded = 0, d.loadImage = function(e, t, i, n) {
                function r() {
                    n && n()
                }
                var s;
                e.complete && i ? r() : t ? (s = new Image, s.onload = r, s.onerror = r, s.src = t) : r()
            }, d.preloadImages = function() {
                function e() {
                    "undefined" != typeof d && null !== d && (void 0 !== d.imagesLoaded && d.imagesLoaded++, d.imagesLoaded === d.imagesToLoad.length && (d.params.updateOnImagesReady && d.update(), d.params.onImagesReady && d.params.onImagesReady(d)))
                }
                d.imagesToLoad = d.container.find("img");
                for (var t = 0; t < d.imagesToLoad.length; t++) d.loadImage(d.imagesToLoad[t], d.imagesToLoad[t].currentSrc || d.imagesToLoad[t].getAttribute("src"), !0, e)
            }, d.autoplayTimeoutId = void 0, d.autoplaying = !1, d.autoplayPaused = !1, d.startAutoplay = function() {
                return "undefined" != typeof d.autoplayTimeoutId ? !1 : d.params.autoplay ? d.autoplaying ? !1 : (d.autoplaying = !0, d.params.onAutoplayStart && d.params.onAutoplayStart(d), void r()) : !1
            }, d.stopAutoplay = function() {
                d.autoplayTimeoutId && (d.autoplayTimeoutId && clearTimeout(d.autoplayTimeoutId), d.autoplaying = !1, d.autoplayTimeoutId = void 0, d.params.onAutoplayStop && d.params.onAutoplayStop(d))
            }, d.pauseAutoplay = function(e) {
                d.autoplayPaused || (d.autoplayTimeoutId && clearTimeout(d.autoplayTimeoutId), d.autoplayPaused = !0, 0 === e ? (d.autoplayPaused = !1, r()) : d.wrapper.transitionEnd(function() {
                    d.autoplayPaused = !1, d.autoplaying ? r() : d.stopAutoplay()
                }))
            }, d.minTranslate = function() {
                return -d.snapGrid[0]
            }, d.maxTranslate = function() {
                return -d.snapGrid[d.snapGrid.length - 1]
            }, d.updateContainerSize = function() {
                d.width = d.container[0].clientWidth, d.height = d.container[0].clientHeight, d.size = n() ? d.width : d.height
            }, d.updateSlidesSize = function() {
                d.slides = d.wrapper.children("." + d.params.slideClass), d.snapGrid = [], d.slidesGrid = [], d.slidesSizesGrid = [];
                var e, t = d.params.spaceBetween,
                    i = 0,
                    r = 0,
                    s = 0;
                "string" == typeof t && t.indexOf("%") >= 0 && (t = parseFloat(t.replace("%", "")) / 100 * d.size), d.virtualWidth = -t, d.slides.css(d.rtl ? {
                    marginLeft: "",
                    marginTop: ""
                } : {
                    marginRight: "",
                    marginBottom: ""
                });
                var a;
                d.params.slidesPerColumn > 1 && (a = Math.floor(d.slides.length / d.params.slidesPerColumn) === d.slides.length / d.params.slidesPerColumn ? d.slides.length : Math.ceil(d.slides.length / d.params.slidesPerColumn) * d.params.slidesPerColumn);
                var o;
                for (e = 0; e < d.slides.length; e++) {
                    o = 0;
                    var l = d.slides.eq(e);
                    if (d.params.slidesPerColumn > 1) {
                        var u, p, c, h, f = d.params.slidesPerColumn;
                        "column" === d.params.slidesPerColumnFill ? (p = Math.floor(e / f), c = e - p * f, u = p + c * a / f, l.css({
                            "-webkit-box-ordinal-group": u,
                            "-moz-box-ordinal-group": u,
                            "-ms-flex-order": u,
                            "-webkit-order": u,
                            order: u
                        })) : (h = a / f, c = Math.floor(e / h), p = e - c * h), l.css({
                            "margin-top": 0 !== c && d.params.spaceBetween && d.params.spaceBetween + "px"
                        }).attr("data-swiper-column", p).attr("data-swiper-row", c)
                    }
                    "none" !== l.css("display") && ("auto" === d.params.slidesPerView ? o = n() ? l.outerWidth(!0) : l.outerHeight(!0) : (o = (d.size - (d.params.slidesPerView - 1) * t) / d.params.slidesPerView, n() ? d.slides[e].style.width = o + "px" : d.slides[e].style.height = o + "px"), d.slides[e].swiperSlideSize = o, d.slidesSizesGrid.push(o), d.params.centeredSlides ? (i = i + o / 2 + r / 2 + t, 0 === e && (i = i - d.size / 2 - t), Math.abs(i) < .001 && (i = 0), s % d.params.slidesPerGroup === 0 && d.snapGrid.push(i), d.slidesGrid.push(i)) : (s % d.params.slidesPerGroup === 0 && d.snapGrid.push(i), d.slidesGrid.push(i), i = i + o + t), d.virtualWidth += o + t, r = o, s++)
                }
                d.virtualWidth = Math.max(d.virtualWidth, d.size);
                var m;
                if (d.rtl && d.wrongRTL && ("slide" === d.params.effect || "coverflow" === d.params.effect) && d.wrapper.css({
                        width: d.virtualWidth + d.params.spaceBetween + "px"
                    }), d.params.slidesPerColumn > 1 && (d.virtualWidth = (o + d.params.spaceBetween) * a, d.virtualWidth = Math.ceil(d.virtualWidth / d.params.slidesPerColumn) - d.params.spaceBetween, d.wrapper.css({
                        width: d.virtualWidth + d.params.spaceBetween + "px"
                    }), d.params.centeredSlides)) {
                    for (m = [], e = 0; e < d.snapGrid.length; e++) d.snapGrid[e] < d.virtualWidth + d.snapGrid[0] && m.push(d.snapGrid[e]);
                    d.snapGrid = m
                }
                if (!d.params.centeredSlides) {
                    for (m = [], e = 0; e < d.snapGrid.length; e++) d.snapGrid[e] <= d.virtualWidth - d.size && m.push(d.snapGrid[e]);
                    d.snapGrid = m, Math.floor(d.virtualWidth - d.size) > Math.floor(d.snapGrid[d.snapGrid.length - 1]) && d.snapGrid.push(d.virtualWidth - d.size)
                }
                0 === d.snapGrid.length && (d.snapGrid = [0]), 0 !== d.params.spaceBetween && d.slides.css(n() ? d.rtl ? {
                    marginLeft: t + "px"
                } : {
                    marginRight: t + "px"
                } : {
                    marginBottom: t + "px"
                }), d.params.watchSlidesProgress && d.updateSlidesOffset()
            }, d.updateSlidesOffset = function() {
                for (var e = 0; e < d.slides.length; e++) d.slides[e].swiperSlideOffset = n() ? d.slides[e].offsetLeft : d.slides[e].offsetTop
            }, d.updateSlidesProgress = function(e) {
                if ("undefined" == typeof e && (e = d.translate || 0), 0 !== d.slides.length) {
                    "undefined" == typeof d.slides[0].swiperSlideOffset && d.updateSlidesOffset();
                    var t = d.params.centeredSlides ? -e + d.size / 2 : -e;
                    d.rtl && (t = d.params.centeredSlides ? e - d.size / 2 : e), d.container[0].getBoundingClientRect(), n() ? "left" : "top", n() ? "right" : "bottom", d.slides.removeClass(d.params.slideVisibleClass);
                    for (var i = 0; i < d.slides.length; i++) {
                        var r = d.slides[i],
                            s = d.params.centeredSlides === !0 ? r.swiperSlideSize / 2 : 0,
                            a = (t - r.swiperSlideOffset - s) / (r.swiperSlideSize + d.params.spaceBetween);
                        if (d.params.watchSlidesVisibility) {
                            var o = -(t - r.swiperSlideOffset - s),
                                l = o + d.slidesSizesGrid[i],
                                u = o >= 0 && o < d.size || l > 0 && l <= d.size || 0 >= o && l >= d.size;
                            u && d.slides.eq(i).addClass(d.params.slideVisibleClass)
                        }
                        r.progress = d.rtl ? -a : a
                    }
                }
            }, d.updateProgress = function(e) {
                "undefined" == typeof e && (e = d.translate || 0);
                var t = d.maxTranslate() - d.minTranslate();
                0 === t ? (d.progress = 0, d.isBeginning = d.isEnd = !0) : (d.progress = (e - d.minTranslate()) / t, d.isBeginning = d.progress <= 0, d.isEnd = d.progress >= 1), d.isBeginning && d.params.onReachBeginning && d.params.onReachBeginning(d), d.isEnd && d.params.onReachEnd && d.params.onReachEnd(d), d.params.watchSlidesProgress && d.updateSlidesProgress(e), d.params.onProgress && d.params.onProgress(d, d.progress)
            }, d.updateActiveIndex = function() {
                var e, t, i, n = d.rtl ? d.translate : -d.translate;
                for (t = 0; t < d.slidesGrid.length; t++) "undefined" != typeof d.slidesGrid[t + 1] ? n >= d.slidesGrid[t] && n < d.slidesGrid[t + 1] - (d.slidesGrid[t + 1] - d.slidesGrid[t]) / 2 ? e = t : n >= d.slidesGrid[t] && n < d.slidesGrid[t + 1] && (e = t + 1) : n >= d.slidesGrid[t] && (e = t);
                (0 > e || "undefined" == typeof e) && (e = 0), i = Math.floor(e / d.params.slidesPerGroup), i >= d.snapGrid.length && (i = d.snapGrid.length - 1), e !== d.activeIndex && (d.snapIndex = i, d.previousIndex = d.activeIndex, d.activeIndex = e, d.updateClasses())
            }, d.updateClasses = function() {
                d.slides.removeClass(d.params.slideActiveClass + " " + d.params.slideNextClass + " " + d.params.slidePrevClass);
                var e = d.slides.eq(d.activeIndex);
                if (e.addClass(d.params.slideActiveClass), e.next("." + d.params.slideClass).addClass(d.params.slideNextClass), e.prev("." + d.params.slideClass).addClass(d.params.slidePrevClass), d.bullets && d.bullets.length > 0) {
                    d.bullets.removeClass(d.params.bulletActiveClass);
                    var t;
                    d.params.loop ? (t = d.activeIndex - d.loopedSlides, t > d.slides.length - 1 - 2 * d.loopedSlides && (t -= d.slides.length - 2 * d.loopedSlides)) : t = "undefined" != typeof d.snapIndex ? d.snapIndex : d.activeIndex || 0, d.bullets.eq(t).addClass(d.params.bulletActiveClass)
                }
                d.params.loop || (d.params.prevButton && (d.isBeginning ? f(d.params.prevButton).addClass(d.params.buttonDisabledClass) : f(d.params.prevButton).removeClass(d.params.buttonDisabledClass)), d.params.nextButton && (d.isEnd ? f(d.params.nextButton).addClass(d.params.buttonDisabledClass) : f(d.params.nextButton).removeClass(d.params.buttonDisabledClass)))
            }, d.updatePagination = function() {
                if (d.params.pagination && d.paginationContainer && d.paginationContainer.length > 0) {
                    for (var e = "", t = d.params.loop ? d.slides.length - 2 * d.loopedSlides : d.snapGrid.length, i = 0; t > i; i++) e += d.params.paginationBulletRender ? d.params.paginationBulletRender(i, d.params.bulletClass) : '<span class="' + d.params.bulletClass + '"></span>';
                    d.paginationContainer.html(e), d.bullets = d.paginationContainer.find("." + d.params.bulletClass)
                }
            }, d.update = function(e) {
                function t() {
                    n = Math.min(Math.max(d.translate, d.maxTranslate()), d.minTranslate()), d.setWrapperTranslate(n), d.updateActiveIndex(), d.updateClasses()
                }
                if (d.updateContainerSize(), d.updateSlidesSize(), d.updateProgress(), d.updatePagination(), d.updateClasses(), d.params.scrollbar && d.scrollbar && d.scrollbar.set(), e) {
                    var i, n;
                    d.params.freeMode ? t() : (i = "auto" === d.params.slidesPerView && d.isEnd && !d.params.centeredSlides ? d.slideTo(d.slides.length - 1, 0, !1, !0) : d.slideTo(d.activeIndex, 0, !1, !0), i || t())
                }
            }, d.onResize = function() {
                if (d.updateContainerSize(), d.updateSlidesSize(), d.updateProgress(), ("auto" === d.params.slidesPerView || d.params.freeMode) && d.updatePagination(), d.params.scrollbar && d.scrollbar && d.scrollbar.set(), d.params.freeMode) {
                    var e = Math.min(Math.max(d.translate, d.maxTranslate()), d.minTranslate());
                    d.setWrapperTranslate(e), d.updateActiveIndex(), d.updateClasses()
                } else d.updateClasses(), "auto" === d.params.slidesPerView && d.isEnd && !d.params.centeredSlides ? d.slideTo(d.slides.length - 1, 0, !1, !0) : d.slideTo(d.activeIndex, 0, !1, !0)
            };
            var m = ["mousedown", "mousemove", "mouseup"];
            window.navigator.pointerEnabled ? m = ["pointerdown", "pointermove", "pointerup"] : window.navigator.msPointerEnabled && (m = ["MSPointerDown", "MSPointerMove", "MSPointerUp"]), d.touchEvents = {
                start: d.support.touch || !d.params.simulateTouch ? "touchstart" : m[0],
                move: d.support.touch || !d.params.simulateTouch ? "touchmove" : m[1],
                end: d.support.touch || !d.params.simulateTouch ? "touchend" : m[2]
            }, (window.navigator.pointerEnabled || window.navigator.msPointerEnabled) && ("container" === d.params.touchEventsTarget ? d.container : d.wrapper).addClass("swiper-wp8-" + d.params.direction), d.events = function(e) {
                var t = e ? "off" : "on",
                    n = e ? "removeEventListener" : "addEventListener",
                    r = "container" === d.params.touchEventsTarget ? d.container[0] : d.wrapper[0],
                    s = d.support.touch ? r : document,
                    a = d.params.nested ? !0 : !1;
                d.browser.ie ? (r[n](d.touchEvents.start, d.onTouchStart, !1), s[n](d.touchEvents.move, d.onTouchMove, a), s[n](d.touchEvents.end, d.onTouchEnd, !1)) : (d.support.touch && (r[n](d.touchEvents.start, d.onTouchStart, !1), r[n](d.touchEvents.move, d.onTouchMove, a), r[n](d.touchEvents.end, d.onTouchEnd, !1)), !i.simulateTouch || d.device.ios || d.device.android || (r[n]("mousedown", d.onTouchStart, !1), s[n]("mousemove", d.onTouchMove, a), s[n]("mouseup", d.onTouchEnd, !1))), window[n]("resize", d.onResize), d.params.nextButton && f(d.params.nextButton)[t]("click", d.onClickNext), d.params.prevButton && f(d.params.prevButton)[t]("click", d.onClickPrev), d.params.pagination && d.params.paginationClickable && f(d.paginationContainer)[t]("click", "." + d.params.bulletClass, d.onClickIndex), (d.params.preventClicks || d.params.preventClicksPropagation) && r[n]("click", d.preventClicks, !0)
            }, d.attachEvents = function() {
                d.events()
            }, d.detachEvents = function() {
                d.events(!0)
            }, d.allowClick = !0, d.preventClicks = function(e) {
                d.allowClick || (d.params.preventClicks && e.preventDefault(), d.params.preventClicksPropagation && (e.stopPropagation(), e.stopImmediatePropagation()))
            }, d.onClickNext = function(e) {
                e.preventDefault(), d.slideNext()
            }, d.onClickPrev = function(e) {
                e.preventDefault(), d.slidePrev()
            }, d.onClickIndex = function(e) {
                e.preventDefault();
                var t = f(this).index() * d.params.slidesPerGroup;
                d.params.loop && (t += d.loopedSlides), d.slideTo(t)
            }, d.updateClickedSlide = function(e) {
                var t = s(e, "." + d.params.slideClass);
                if (!t) return d.clickedSlide = void 0, void(d.clickedIndex = void 0);
                if (d.clickedSlide = t, d.clickedIndex = f(t).index(), d.params.slideToClickedSlide && void 0 !== d.clickedIndex && d.clickedIndex !== d.activeIndex) {
                    var i, n = d.clickedIndex;
                    if (d.params.loop)
                        if (i = f(d.clickedSlide).attr("data-swiper-slide-index"), n > d.slides.length - d.params.slidesPerView) d.fixLoop(), n = d.wrapper.children("." + d.params.slideClass + '[data-swiper-slide-index="' + i + '"]').eq(0).index(), setTimeout(function() {
                            d.slideTo(n)
                        }, 0);
                        else if (n < d.params.slidesPerView - 1) {
                        d.fixLoop();
                        var r = d.wrapper.children("." + d.params.slideClass + '[data-swiper-slide-index="' + i + '"]');
                        n = r.eq(r.length - 1).index(), setTimeout(function() {
                            d.slideTo(n)
                        }, 0)
                    } else d.slideTo(n);
                    else d.slideTo(n)
                }
            };
            var g, v, _, y, w, x, T, b, S, C = "input, select, textarea, button",
                P = Date.now(),
                k = [];
            d.animating = !1, d.touches = {
                startX: 0,
                startY: 0,
                currentX: 0,
                currentY: 0,
                diff: 0
            };
            var M;
            if (d.onTouchStart = function(e) {
                    if (e.originalEvent && (e = e.originalEvent), M = "touchstart" === e.type, M || !("which" in e) || 3 !== e.which) {
                        if (d.params.noSwiping && s(e, "." + d.params.noSwipingClass)) return void(d.allowClick = !0);
                        if (!d.params.swipeHandler || s(e, d.params.swipeHandler)) {
                            if (g = !0, v = !1, y = void 0, d.touches.startX = d.touches.currentX = "touchstart" === e.type ? e.targetTouches[0].pageX : e.pageX, d.touches.startY = d.touches.currentY = "touchstart" === e.type ? e.targetTouches[0].pageY : e.pageY, _ = Date.now(), d.allowClick = !0, d.updateContainerSize(), d.swipeDirection = void 0, d.params.threshold > 0 && (T = !1), "touchstart" !== e.type) {
                                var t = !0;
                                f(e.target).is(C) && (t = !1), document.activeElement && f(document.activeElement).is(C) && document.activeElement.blur(), t && e.preventDefault()
                            }
                            d.params.onTouchStart && d.params.onTouchStart(d, e)
                        }
                    }
                }, d.onTouchMove = function(e) {
                    if (e.originalEvent && (e = e.originalEvent), !(M && "mousemove" === e.type || e.preventedByNestedSwiper)) {
                        if (d.params.onlyExternal) return v = !0, void(d.allowClick = !1);
                        if (M && document.activeElement && e.target === document.activeElement && f(e.target).is(C)) return v = !0, void(d.allowClick = !1);
                        if (d.params.onTouchMove && d.params.onTouchMove(d, e), d.allowClick = !1, !(e.targetTouches && e.targetTouches.length > 1)) {
                            if (d.touches.currentX = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX, d.touches.currentY = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY, "undefined" == typeof y) {
                                var t = 180 * Math.atan2(Math.abs(d.touches.currentY - d.touches.startY), Math.abs(d.touches.currentX - d.touches.startX)) / Math.PI;
                                y = n() ? t > d.params.touchAngle : 90 - t > d.params.touchAngle
                            }
                            if (y && d.params.onTouchMoveOpposite && d.params.onTouchMoveOpposite(d, e), g) {
                                if (y) return void(g = !1);
                                d.params.onSliderMove && d.params.onSliderMove(d, e), e.preventDefault(), d.params.touchMoveStopPropagation && !d.params.nested && e.stopPropagation(), v || (i.loop && d.fixLoop(), x = "cube" === d.params.effect ? (d.rtl ? -d.translate : d.translate) || 0 : d.getWrapperTranslate(), d.setWrapperTransition(0), d.animating && d.wrapper.trigger("webkitTransitionEnd transitionend oTransitionEnd MSTransitionEnd msTransitionEnd"), d.params.autoplay && d.autoplaying && (d.params.autoplayDisableOnInteraction ? d.stopAutoplay() : d.pauseAutoplay()), S = !1, d.params.grabCursor && (d.container[0].style.cursor = "move", d.container[0].style.cursor = "-webkit-grabbing", d.container[0].style.cursor = "-moz-grabbin", d.container[0].style.cursor = "grabbing")), v = !0;
                                var r = d.touches.diff = n() ? d.touches.currentX - d.touches.startX : d.touches.currentY - d.touches.startY;
                                r *= d.params.touchRatio, d.rtl && (r = -r), d.swipeDirection = r > 0 ? "prev" : "next", w = r + x;
                                var s = !0;
                                if (r > 0 && w > d.minTranslate() ? (s = !1, d.params.resistance && (w = d.minTranslate() - 1 + Math.pow(-d.minTranslate() + x + r, d.params.resistanceRatio))) : 0 > r && w < d.maxTranslate() && (s = !1, d.params.resistance && (w = d.maxTranslate() + 1 - Math.pow(d.maxTranslate() - x - r, d.params.resistanceRatio))), s && (e.preventedByNestedSwiper = !0), !d.params.allowSwipeToNext && "next" === d.swipeDirection && x > w && (w = x), !d.params.allowSwipeToPrev && "prev" === d.swipeDirection && w > x && (w = x), d.params.followFinger) {
                                    if (d.params.threshold > 0) {
                                        if (!(Math.abs(r) > d.params.threshold || T)) return void(w = x);
                                        if (!T) return T = !0, d.touches.startX = d.touches.currentX, d.touches.startY = d.touches.currentY, w = x, void(d.touches.diff = n() ? d.touches.currentX - d.touches.startX : d.touches.currentY - d.touches.startY)
                                    }(d.params.freeMode || d.params.watchSlidesProgress) && d.updateActiveIndex(), d.params.freeMode && (0 === k.length && k.push({
                                        position: d.touches[n() ? "startX" : "startY"],
                                        time: _
                                    }), k.push({
                                        position: d.touches[n() ? "currentX" : "currentY"],
                                        time: (new Date).getTime()
                                    })), d.updateProgress(w), d.setWrapperTranslate(w)
                                }
                            }
                        }
                    }
                }, d.onTouchEnd = function(e) {
                    if (e.originalEvent && (e = e.originalEvent), d.params.onTouchEnd && d.params.onTouchEnd(d, e), g) {
                        d.params.grabCursor && v && g && (d.container[0].style.cursor = "move", d.container[0].style.cursor = "-webkit-grab", d.container[0].style.cursor = "-moz-grab", d.container[0].style.cursor = "grab");
                        var t = Date.now(),
                            i = t - _;
                        if (d.allowClick && (d.updateClickedSlide(e), d.params.onTap && d.params.onTap(d, e), 300 > i && t - P > 300 && (b && clearTimeout(b), b = setTimeout(function() {
                                d && (d.params.paginationHide && d.paginationContainer.length > 0 && !f(e.target).hasClass(d.params.bulletClass) && d.paginationContainer.toggleClass(d.params.paginationHiddenClass), d.params.onClick && d.params.onClick(d, e))
                            }, 300)), 300 > i && 300 > t - P && (b && clearTimeout(b), d.params.onDoubleTap && d.params.onDoubleTap(d, e))), P = Date.now(), setTimeout(function() {
                                d && d.allowClick && (d.allowClick = !0)
                            }, 0), !g || !v || !d.swipeDirection || 0 === d.touches.diff || w === x) return void(g = v = !1);
                        g = v = !1;
                        var n;
                        if (n = d.params.followFinger ? d.rtl ? d.translate : -d.translate : -w, d.params.freeMode) {
                            if (n < -d.minTranslate()) return void d.slideTo(d.activeIndex);
                            if (n > -d.maxTranslate()) return void d.slideTo(d.slides.length - 1);
                            if (d.params.freeModeMomentum) {
                                if (k.length > 1) {
                                    var r = k.pop(),
                                        s = k.pop(),
                                        a = r.position - s.position,
                                        o = r.time - s.time;
                                    d.velocity = a / o, d.velocity = d.velocity / 2, Math.abs(d.velocity) < .02 && (d.velocity = 0), (o > 150 || (new Date).getTime() - r.time > 300) && (d.velocity = 0)
                                } else d.velocity = 0;
                                k.length = 0;
                                var l = 1e3 * d.params.freeModeMomentumRatio,
                                    u = d.velocity * l,
                                    p = d.translate + u;
                                d.rtl && (p = -p);
                                var c, h = !1,
                                    m = 20 * Math.abs(d.velocity) * d.params.freeModeMomentumBounceRatio;
                                p < d.maxTranslate() && (d.params.freeModeMomentumBounce ? (p + d.maxTranslate() < -m && (p = d.maxTranslate() - m), c = d.maxTranslate(), h = !0, S = !0) : p = d.maxTranslate()), p > d.minTranslate() && (d.params.freeModeMomentumBounce ? (p - d.minTranslate() > m && (p = d.minTranslate() + m), c = d.minTranslate(), h = !0, S = !0) : p = d.minTranslate()), 0 !== d.velocity && (l = Math.abs(d.rtl ? (-p - d.translate) / d.velocity : (p - d.translate) / d.velocity)), d.params.freeModeMomentumBounce && h ? (d.updateProgress(c), d.setWrapperTransition(l), d.setWrapperTranslate(p), d.onTransitionStart(), d.animating = !0, d.wrapper.transitionEnd(function() {
                                    S && (d.params.onMomentumBounce && d.params.onMomentumBounce(d), d.setWrapperTransition(d.params.speed), d.setWrapperTranslate(c), d.wrapper.transitionEnd(function() {
                                        d.onTransitionEnd()
                                    }))
                                })) : d.velocity ? (d.updateProgress(p), d.setWrapperTransition(l), d.setWrapperTranslate(p), d.onTransitionStart(), d.animating || (d.animating = !0, d.wrapper.transitionEnd(function() {
                                    d.onTransitionEnd()
                                }))) : d.updateProgress(p), d.updateActiveIndex()
                            }
                            return void((!d.params.freeModeMomentum || i >= d.params.longSwipesMs) && (d.updateProgress(), d.updateActiveIndex()))
                        }
                        var y, T = 0,
                            C = d.slidesSizesGrid[0];
                        for (y = 0; y < d.slidesGrid.length; y += d.params.slidesPerGroup) "undefined" != typeof d.slidesGrid[y + d.params.slidesPerGroup] ? n >= d.slidesGrid[y] && n < d.slidesGrid[y + d.params.slidesPerGroup] && (T = y, C = d.slidesGrid[y + d.params.slidesPerGroup] - d.slidesGrid[y]) : n >= d.slidesGrid[y] && (T = y, C = d.slidesGrid[d.slidesGrid.length - 1] - d.slidesGrid[d.slidesGrid.length - 2]);
                        var M = (n - d.slidesGrid[T]) / C;
                        if (i > d.params.longSwipesMs) {
                            if (!d.params.longSwipes) return void d.slideTo(d.activeIndex);
                            "next" === d.swipeDirection && d.slideTo(M >= d.params.longSwipesRatio ? T + d.params.slidesPerGroup : T), "prev" === d.swipeDirection && d.slideTo(M > 1 - d.params.longSwipesRatio ? T + d.params.slidesPerGroup : T)
                        } else {
                            if (!d.params.shortSwipes) return void d.slideTo(d.activeIndex);
                            "next" === d.swipeDirection && d.slideTo(T + d.params.slidesPerGroup), "prev" === d.swipeDirection && d.slideTo(T)
                        }
                    }
                }, d._slideTo = function(e, t) {
                    return d.slideTo(e, t, !0, !0)
                }, d.slideTo = function(e, t, i, r) {
                    "undefined" == typeof i && (i = !0), "undefined" == typeof e && (e = 0), 0 > e && (e = 0), d.snapIndex = Math.floor(e / d.params.slidesPerGroup), d.snapIndex >= d.snapGrid.length && (d.snapIndex = d.snapGrid.length - 1);
                    var s = -d.snapGrid[d.snapIndex];
                    d.params.autoplay && d.autoplaying && (r || !d.params.autoplayDisableOnInteraction ? d.pauseAutoplay(t) : d.stopAutoplay()), d.updateProgress(s);
                    for (var a = 0; a < d.slidesGrid.length; a++) - s >= d.slidesGrid[a] && (e = a);
                    return "undefined" == typeof t && (t = d.params.speed), d.previousIndex = d.activeIndex || 0, d.activeIndex = e, s === d.translate ? (d.updateClasses(), !1) : (d.onTransitionStart(i), n() ? s : 0, n() ? 0 : s, 0 === t ? (d.setWrapperTransition(0), d.setWrapperTranslate(s), d.onTransitionEnd(i)) : (d.setWrapperTransition(t), d.setWrapperTranslate(s), d.animating || (d.animating = !0, d.wrapper.transitionEnd(function() {
                        d.onTransitionEnd(i)
                    }))), d.updateClasses(), !0)
                }, d.onTransitionStart = function(e) {
                    "undefined" == typeof e && (e = !0), d.lazy && d.lazy.onTransitionStart(), e && (d.params.onTransitionStart && d.params.onTransitionStart(d), d.params.onSlideChangeStart && d.activeIndex !== d.previousIndex && d.params.onSlideChangeStart(d))
                }, d.onTransitionEnd = function(e) {
                    d.animating = !1, d.setWrapperTransition(0), "undefined" == typeof e && (e = !0), d.lazy && d.lazy.onTransitionEnd(), e && (d.params.onTransitionEnd && d.params.onTransitionEnd(d), d.params.onSlideChangeEnd && d.activeIndex !== d.previousIndex && d.params.onSlideChangeEnd(d))
                }, d.slideNext = function(e, t, i) {
                    return d.params.loop ? d.animating ? !1 : (d.fixLoop(), d.container[0].clientLeft, d.slideTo(d.activeIndex + d.params.slidesPerGroup, t, e, i)) : d.slideTo(d.activeIndex + d.params.slidesPerGroup, t, e, i)
                }, d._slideNext = function(e) {
                    return d.slideNext(!0, e, !0)
                }, d.slidePrev = function(e, t, i) {
                    return d.params.loop ? d.animating ? !1 : (d.fixLoop(), d.container[0].clientLeft, d.slideTo(d.activeIndex - 1, t, e, i)) : d.slideTo(d.activeIndex - 1, t, e, i)
                }, d._slidePrev = function(e) {
                    return d.slidePrev(!0, e, !0)
                }, d.slideReset = function(e, t) {
                    return d.slideTo(d.activeIndex, t, e)
                }, d.setWrapperTransition = function(e, t) {
                    d.wrapper.transition(e), d.params.onSetTransition && d.params.onSetTransition(d, e), "slide" !== d.params.effect && d.effects[d.params.effect] && d.effects[d.params.effect].setTransition(e), d.params.parallax && d.parallax && d.parallax.setTransition(e), d.params.scrollbar && d.scrollbar && d.scrollbar.setTransition(e), d.params.control && d.controller && d.controller.setTransition(e, t)
                }, d.setWrapperTranslate = function(e, t, i) {
                    var r = 0,
                        s = 0,
                        a = 0;
                    n() ? r = d.rtl ? -e : e : s = e, d.wrapper.transform(d.support.transforms3d ? "translate3d(" + r + "px, " + s + "px, " + a + "px)" : "translate(" + r + "px, " + s + "px)"), d.translate = n() ? r : s, t && d.updateActiveIndex(), "slide" !== d.params.effect && d.effects[d.params.effect] && d.effects[d.params.effect].setTranslate(d.translate), d.params.parallax && d.parallax && d.parallax.setTranslate(d.translate), d.params.scrollbar && d.scrollbar && d.scrollbar.setTranslate(d.translate), d.params.control && d.controller && d.controller.setTranslate(d.translate, i), d.params.hashnav && d.hashnav && d.hashnav.setHash(), d.params.onSetTranslate && d.params.onSetTranslate(d, d.translate)
                }, d.getTranslate = function(e, t) {
                    var i, n, r, s;
                    return "undefined" == typeof t && (t = "x"), r = window.getComputedStyle(e, null), window.WebKitCSSMatrix ? s = new WebKitCSSMatrix("none" === r.webkitTransform ? "" : r.webkitTransform) : (s = r.MozTransform || r.OTransform || r.MsTransform || r.msTransform || r.transform || r.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,"), i = s.toString().split(",")), "x" === t && (n = window.WebKitCSSMatrix ? s.m41 : parseFloat(16 === i.length ? i[12] : i[4])), "y" === t && (n = window.WebKitCSSMatrix ? s.m42 : parseFloat(16 === i.length ? i[13] : i[5])), d.rtl && n && (n = -n), n || 0
                }, d.getWrapperTranslate = function(e) {
                    return "undefined" == typeof e && (e = n() ? "x" : "y"), d.getTranslate(d.wrapper[0], e)
                }, d.observers = [], d.initObservers = function() {
                    if (d.params.observeParents)
                        for (var e = d.container.parents(), t = 0; t < e.length; t++) a(e[t]);
                    a(d.container[0], {
                        childList: !1
                    }), a(d.wrapper[0], {
                        attributes: !1
                    })
                }, d.disconnectObservers = function() {
                    for (var e = 0; e < d.observers.length; e++) d.observers[e].disconnect();
                    d.observers = []
                }, d.createLoop = function() {
                    d.wrapper.children("." + d.params.slideClass + "." + d.params.slideDuplicateClass).remove();
                    var e = d.wrapper.children("." + d.params.slideClass);
                    d.loopedSlides = parseInt(d.params.loopedSlides || d.params.slidesPerView, 10), d.loopedSlides = d.loopedSlides + d.params.loopAdditionalSlides, d.loopedSlides > e.length && (d.loopedSlides = e.length);
                    var t, i = [],
                        n = [];
                    for (e.each(function(t, r) {
                            var s = f(this);
                            t < d.loopedSlides && n.push(r), t < e.length && t >= e.length - d.loopedSlides && i.push(r), s.attr("data-swiper-slide-index", t)
                        }), t = 0; t < n.length; t++) d.wrapper.append(f(n[t].cloneNode(!0)).addClass(d.params.slideDuplicateClass));
                    for (t = i.length - 1; t >= 0; t--) d.wrapper.prepend(f(i[t].cloneNode(!0)).addClass(d.params.slideDuplicateClass))
                }, d.destroyLoop = function() {
                    d.wrapper.children("." + d.params.slideClass + "." + d.params.slideDuplicateClass).remove()
                }, d.fixLoop = function() {
                    var e;
                    d.activeIndex < d.loopedSlides ? (e = d.slides.length - 3 * d.loopedSlides + d.activeIndex, e += d.loopedSlides, d.slideTo(e, 0, !1, !0)) : ("auto" === d.params.slidesPerView && d.activeIndex >= 2 * d.loopedSlides || d.activeIndex > d.slides.length - 2 * d.params.slidesPerView) && (e = -d.slides.length + d.activeIndex + d.loopedSlides, e += d.loopedSlides, d.slideTo(e, 0, !1, !0))
                }, d.appendSlide = function(e) {
                    if (d.params.loop && d.destroyLoop(), "object" == typeof e && e.length)
                        for (var t = 0; t < e.length; t++) e[t] && d.wrapper.append(e[t]);
                    else d.wrapper.append(e);
                    d.params.loop && d.createLoop(), d.params.observer && d.support.observer || d.update(!0)
                }, d.prependSlide = function(e) {
                    d.params.loop && d.destroyLoop();
                    var t = d.activeIndex + 1;
                    if ("object" == typeof e && e.length) {
                        for (var i = 0; i < e.length; i++) e[i] && d.wrapper.prepend(e[i]);
                        t = d.activeIndex + e.length
                    } else d.wrapper.prepend(e);
                    d.params.loop && d.createLoop(), d.params.observer && d.support.observer || d.update(!0), d.slideTo(t, 0, !1)
                }, d.removeSlide = function(e) {
                    d.params.loop && d.destroyLoop();
                    var t, i = d.activeIndex;
                    if ("object" == typeof e && e.length) {
                        for (var n = 0; n < e.length; n++) t = e[n], d.slides[t] && d.slides.eq(t).remove(), i > t && i--;
                        i = Math.max(i, 0)
                    } else t = e, d.slides[t] && d.slides.eq(t).remove(), i > t && i--, i = Math.max(i, 0);
                    d.params.observer && d.support.observer || d.update(!0), d.slideTo(i, 0, !1)
                }, d.removeAllSlides = function() {
                    for (var e = [], t = 0; t < d.slides.length; t++) e.push(t);
                    d.removeSlide(e)
                }, d.effects = {
                    fade: {
                        setTranslate: function() {
                            for (var e = 0; e < d.slides.length; e++) {
                                var t = d.slides.eq(e),
                                    i = t[0].swiperSlideOffset,
                                    r = -i - d.translate,
                                    s = 0;
                                n() || (s = r, r = 0);
                                var a = d.params.fade.crossFade ? Math.max(1 - Math.abs(t[0].progress), 0) : 1 + Math.min(Math.max(t[0].progress, -1), 0);
                                t.css({
                                    opacity: a
                                }).transform("translate3d(" + r + "px, " + s + "px, 0px)")
                            }
                        },
                        setTransition: function(e) {
                            d.slides.transition(e)
                        }
                    },
                    cube: {
                        setTranslate: function() {
                            var e, t = 0;
                            d.params.cube.shadow && (n() ? (e = d.wrapper.find(".swiper-cube-shadow"), 0 === e.length && (e = f('<div class="swiper-cube-shadow"></div>'), d.wrapper.append(e)), e.css({
                                height: d.width + "px"
                            })) : (e = d.container.find(".swiper-cube-shadow"), 0 === e.length && (e = f('<div class="swiper-cube-shadow"></div>'), d.container.append(e))));
                            for (var i = 0; i < d.slides.length; i++) {
                                var r = d.slides.eq(i),
                                    s = 90 * i,
                                    a = Math.floor(s / 360);
                                d.rtl && (s = -s, a = Math.floor(-s / 360));
                                var o = Math.max(Math.min(r[0].progress, 1), -1),
                                    l = 0,
                                    u = 0,
                                    p = 0;
                                i % 4 === 0 ? (l = 4 * -a * d.size, p = 0) : (i - 1) % 4 === 0 ? (l = 0, p = 4 * -a * d.size) : (i - 2) % 4 === 0 ? (l = d.size + 4 * a * d.size, p = d.size) : (i - 3) % 4 === 0 && (l = -d.size, p = 3 * d.size + 4 * d.size * a), d.rtl && (l = -l), n() || (u = l, l = 0);
                                var c = "rotateX(" + (n() ? 0 : -s) + "deg) rotateY(" + (n() ? s : 0) + "deg) translate3d(" + l + "px, " + u + "px, " + p + "px)";
                                if (1 >= o && o > -1 && (t = 90 * i + 90 * o, d.rtl && (t = 90 * -i - 90 * o)), r.transform(c), d.params.cube.slideShadows) {
                                    var h = r.find(n() ? ".swiper-slide-shadow-left" : ".swiper-slide-shadow-top"),
                                        m = r.find(n() ? ".swiper-slide-shadow-right" : ".swiper-slide-shadow-bottom");
                                    0 === h.length && (h = f('<div class="swiper-slide-shadow-' + (n() ? "left" : "top") + '"></div>'), r.append(h)), 0 === m.length && (m = f('<div class="swiper-slide-shadow-' + (n() ? "right" : "bottom") + '"></div>'), r.append(m)), r[0].progress, h.length && (h[0].style.opacity = -r[0].progress), m.length && (m[0].style.opacity = r[0].progress)
                                }
                            }
                            if (d.wrapper.css({
                                    "-webkit-transform-origin": "50% 50% -" + d.size / 2 + "px",
                                    "-moz-transform-origin": "50% 50% -" + d.size / 2 + "px",
                                    "-ms-transform-origin": "50% 50% -" + d.size / 2 + "px",
                                    "transform-origin": "50% 50% -" + d.size / 2 + "px"
                                }), d.params.cube.shadow)
                                if (n()) e.transform("translate3d(0px, " + (d.width / 2 + d.params.cube.shadowOffset) + "px, " + -d.width / 2 + "px) rotateX(90deg) rotateZ(0deg) scale(" + d.params.cube.shadowScale + ")");
                                else {
                                    var g = Math.abs(t) - 90 * Math.floor(Math.abs(t) / 90),
                                        v = 1.5 - (Math.sin(2 * g * Math.PI / 360) / 2 + Math.cos(2 * g * Math.PI / 360) / 2),
                                        _ = d.params.cube.shadowScale,
                                        y = d.params.cube.shadowScale / v,
                                        w = d.params.cube.shadowOffset;
                                    e.transform("scale3d(" + _ + ", 1, " + y + ") translate3d(0px, " + (d.height / 2 + w) + "px, " + -d.height / 2 / y + "px) rotateX(-90deg)")
                                }
                            var x = d.isSafari || d.isUiWebView ? -d.size / 2 : 0;
                            d.wrapper.transform("translate3d(0px,0," + x + "px) rotateX(" + (n() ? 0 : t) + "deg) rotateY(" + (n() ? -t : 0) + "deg)")
                        },
                        setTransition: function(e) {
                            d.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e), d.params.cube.shadow && !n() && d.container.find(".swiper-cube-shadow").transition(e)
                        }
                    },
                    coverflow: {
                        setTranslate: function() {
                            for (var e = d.translate, t = n() ? -e + d.width / 2 : -e + d.height / 2, i = n() ? d.params.coverflow.rotate : -d.params.coverflow.rotate, r = d.params.coverflow.depth, s = 0, a = d.slides.length; a > s; s++) {
                                var o = d.slides.eq(s),
                                    l = d.slidesSizesGrid[s],
                                    u = o[0].swiperSlideOffset,
                                    p = (t - u - l / 2) / l * d.params.coverflow.modifier,
                                    c = n() ? i * p : 0,
                                    h = n() ? 0 : i * p,
                                    m = -r * Math.abs(p),
                                    g = n() ? 0 : d.params.coverflow.stretch * p,
                                    v = n() ? d.params.coverflow.stretch * p : 0;
                                Math.abs(v) < .001 && (v = 0), Math.abs(g) < .001 && (g = 0), Math.abs(m) < .001 && (m = 0), Math.abs(c) < .001 && (c = 0), Math.abs(h) < .001 && (h = 0);
                                var _ = "translate3d(" + v + "px," + g + "px," + m + "px)  rotateX(" + h + "deg) rotateY(" + c + "deg)";
                                if (o.transform(_), o[0].style.zIndex = -Math.abs(Math.round(p)) + 1, d.params.coverflow.slideShadows) {
                                    var y = o.find(n() ? ".swiper-slide-shadow-left" : ".swiper-slide-shadow-top"),
                                        w = o.find(n() ? ".swiper-slide-shadow-right" : ".swiper-slide-shadow-bottom");
                                    0 === y.length && (y = f('<div class="swiper-slide-shadow-' + (n() ? "left" : "top") + '"></div>'), o.append(y)), 0 === w.length && (w = f('<div class="swiper-slide-shadow-' + (n() ? "right" : "bottom") + '"></div>'), o.append(w)), y.length && (y[0].style.opacity = p > 0 ? p : 0), w.length && (w[0].style.opacity = -p > 0 ? -p : 0)
                                }
                            }
                            if (window.navigator.pointerEnabled || window.navigator.msPointerEnabled) {
                                var x = d.wrapper.style;
                                x.perspectiveOrigin = t + "px 50%"
                            }
                        },
                        setTransition: function(e) {
                            d.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e)
                        }
                    }
                }, d.lazy = {
                    initialImageLoaded: !1,
                    loadImageInSlide: function(e) {
                        if ("undefined" != typeof e && 0 !== d.slides.length) {
                            var t = d.slides.eq(e),
                                i = t.find("img.swiper-lazy:not(.swiper-lazy-loaded):not(.swiper-lazy-loading)");
                            0 !== i.length && i.each(function() {
                                var e = f(this);
                                e.addClass("swiper-lazy-loading");
                                var i = e.attr("data-src");
                                d.loadImage(e[0], i, !1, function() {
                                    e.attr("src", i), e.removeAttr("data-src"), e.addClass("swiper-lazy-loaded").removeClass("swiper-lazy-loading"), t.find(".swiper-lazy-preloader, .preloader").remove(), d.params.onLazyImageLoaded && d.params.onLazyImageLoaded(d, t[0], e[0])
                                }), d.params.onLazyImageLoad && d.params.onLazyImageLoad(d, t[0], e[0])
                            })
                        }
                    },
                    load: function() {
                        if (d.params.watchSlidesVisibility) d.wrapper.children("." + d.params.slideVisibleClass).each(function() {
                            d.lazy.loadImageInSlide(f(this).index())
                        });
                        else if (d.params.slidesPerView > 1)
                            for (var e = d.activeIndex; e < d.activeIndex + d.params.slidesPerView; e++) d.slides[e] && d.lazy.loadImageInSlide(e);
                        else d.lazy.loadImageInSlide(d.activeIndex);
                        if (d.params.lazyLoadingInPrevNext) {
                            var t = d.wrapper.children("." + d.params.slideNextClass);
                            t.length > 0 && d.lazy.loadImageInSlide(t.index());
                            var i = d.wrapper.children("." + d.params.slidePrevClass);
                            i.length > 0 && d.loadImageInSlide(i.index())
                        }
                    },
                    onTransitionStart: function() {
                        d.params.lazyLoading && (d.params.lazyLoadingOnTransitionStart || !d.params.lazyLoadingOnTransitionStart && !d.lazy.initialImageLoaded) && (d.lazy.initialImageLoaded = !0, d.lazy.load())
                    },
                    onTransitionEnd: function() {
                        d.params.lazyLoading && !d.params.lazyLoadingOnTransitionStart && d.lazy.load()
                    }
                }, d.scrollbar = {
                    set: function() {
                        if (d.params.scrollbar) {
                            var e = d.scrollbar;
                            e.track = f(d.params.scrollbar), e.drag = e.track.find(".swiper-scrollbar-drag"), 0 === e.drag.length && (e.drag = f('<div class="swiper-scrollbar-drag"></div>'), e.track.append(e.drag)), e.drag[0].style.width = "", e.drag[0].style.height = "", e.trackSize = n() ? e.track[0].offsetWidth : e.track[0].offsetHeight, e.divider = d.size / d.virtualWidth, e.moveDivider = e.divider * (e.trackSize / d.size), e.dragSize = e.trackSize * e.divider, n() ? e.drag[0].style.width = e.dragSize + "px" : e.drag[0].style.height = e.dragSize + "px", e.track[0].style.display = e.divider >= 1 ? "none" : "", d.params.scrollbarHide && (e.track[0].style.opacity = 0)
                        }
                    },
                    setTranslate: function() {
                        if (d.params.scrollbar) {
                            var e, t = d.scrollbar,
                                i = (d.translate || 0, t.dragSize);
                            e = (t.trackSize - t.dragSize) * d.progress, d.rtl && n() ? (e = -e, e > 0 ? (i = t.dragSize - e, e = 0) : -e + t.dragSize > t.trackSize && (i = t.trackSize + e)) : 0 > e ? (i = t.dragSize + e, e = 0) : e + t.dragSize > t.trackSize && (i = t.trackSize - e), n() ? (t.drag.transform("translate3d(" + e + "px, 0, 0)"), t.drag[0].style.width = i + "px") : (t.drag.transform("translate3d(0px, " + e + "px, 0)"), t.drag[0].style.height = i + "px"), d.params.scrollbarHide && (clearTimeout(t.timeout), t.track[0].style.opacity = 1, t.timeout = setTimeout(function() {
                                t.track[0].style.opacity = 0, t.track.transition(400)
                            }, 1e3))
                        }
                    },
                    setTransition: function(e) {
                        d.params.scrollbar && d.scrollbar.drag.transition(e)
                    }
                }, d.controller = {
                    setTranslate: function(e, t) {
                        var i, n, r = d.params.control;
                        if (d.isArray(r))
                            for (var s = 0; s < r.length; s++) r[s] !== t && r[s] instanceof Swiper && (e = r[s].rtl && "horizontal" === r[s].params.direction ? -d.translate : d.translate, i = (r[s].maxTranslate() - r[s].minTranslate()) / (d.maxTranslate() - d.minTranslate()), n = (e - d.minTranslate()) * i + r[s].minTranslate(), d.params.controlInverse && (n = r[s].maxTranslate() - n), r[s].updateProgress(n), r[s].setWrapperTranslate(n, !1, d), r[s].updateActiveIndex());
                        else r instanceof Swiper && t !== r && (e = r.rtl && "horizontal" === r.params.direction ? -d.translate : d.translate, i = (r.maxTranslate() - r.minTranslate()) / (d.maxTranslate() - d.minTranslate()), n = (e - d.minTranslate()) * i + r.minTranslate(), d.params.controlInverse && (n = r.maxTranslate() - n), r.updateProgress(n), r.setWrapperTranslate(n, !1, d), r.updateActiveIndex())
                    },
                    setTransition: function(e, t) {
                        var i = d.params.control;
                        if (d.isArray(i))
                            for (var n = 0; n < i.length; n++) i[n] !== t && i[n] instanceof Swiper && i[n].setWrapperTransition(e, d);
                        else i instanceof Swiper && t !== i && i.setWrapperTransition(e, d)
                    }
                }, d.hashnav = {
                    init: function() {
                        if (d.params.hashnav) {
                            d.hashnav.initialized = !0;
                            var e = document.location.hash.replace("#", "");
                            if (e)
                                for (var t = 0, i = 0, n = d.slides.length; n > i; i++) {
                                    var r = d.slides.eq(i),
                                        s = r.attr("data-hash");
                                    if (s === e && !r.hasClass(d.params.slideDuplicateClass)) {
                                        var a = r.index();
                                        d.slideTo(a, t, d.params.runCallbacksOnInit, !0)
                                    }
                                }
                        }
                    },
                    setHash: function() {
                        d.hashnav.initialized && d.params.hashnav && (document.location.hash = d.slides.eq(d.activeIndex).attr("data-hash") || "")
                    }
                }, d.disableKeyboardControl = function() {
                    f(document).off("keydown", o)
                }, d.enableKeyboardControl = function() {
                    f(document).on("keydown", o)
                }, d._wheelEvent = !1, d._lastWheelScrollTime = (new Date).getTime(), d.params.mousewheelControl) {
                if (void 0 !== document.onmousewheel && (d._wheelEvent = "mousewheel"), !d._wheelEvent) try {
                    new WheelEvent("wheel"), d._wheelEvent = "wheel"
                } catch (D) {}
                d._wheelEvent || (d._wheelEvent = "DOMMouseScroll")
            }
            return d.disableMousewheelControl = function() {
                return d._wheelEvent ? (d.container.off(d._wheelEvent, l), !0) : !1
            }, d.enableMousewheelControl = function() {
                return d._wheelEvent ? (d.container.on(d._wheelEvent, l), !0) : !1
            }, d.parallax = {
                setTranslate: function() {
                    d.container.children("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function() {
                        u(this, d.progress)
                    }), d.slides.each(function() {
                        var e = f(this);
                        e.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function() {
                            var t = Math.min(Math.max(e[0].progress, -1), 1);
                            u(this, t)
                        })
                    })
                },
                setTransition: function(e) {
                    "undefined" == typeof e && (e = d.params.speed), d.container.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function() {
                        var t = f(this),
                            i = parseInt(t.attr("data-swiper-parallax-duration"), 10) || e;
                        0 === e && (i = 0), t.transition(i)
                    })
                }
            }, d.init = function() {
                d.params.loop && d.createLoop(), d.updateContainerSize(), d.updateSlidesSize(), d.updatePagination(), d.params.scrollbar && d.scrollbar && d.scrollbar.set(), "slide" !== d.params.effect && d.effects[d.params.effect] && (d.params.loop || d.updateProgress(), d.effects[d.params.effect].setTranslate()), d.params.loop ? d.slideTo(d.params.initialSlide + d.loopedSlides, 0, d.params.runCallbacksOnInit) : (d.slideTo(d.params.initialSlide, 0, d.params.runCallbacksOnInit), 0 === d.params.initialSlide && (d.parallax && d.params.parallax && d.parallax.setTranslate(), d.lazy && d.params.lazyLoading && d.lazy.load())), d.attachEvents(), d.params.observer && d.support.observer && d.initObservers(), d.params.preloadImages && !d.params.lazyLoading && d.preloadImages(), d.params.autoplay && d.startAutoplay(), d.params.keyboardControl && d.enableKeyboardControl && d.enableKeyboardControl(), d.params.mousewheelControl && d.enableMousewheelControl && d.enableMousewheelControl(), d.params.hashnav && d.hashnav && d.hashnav.init(), d.params.onInit && d.params.onInit(d)
            }, d.destroy = function(e) {
                d.detachEvents(), d.disconnectObservers(), d.params.keyboardControl && d.disableKeyboardControl && d.disableKeyboardControl(), d.params.mousewheelControl && d.disableMousewheelControl && d.disableMousewheelControl(), d.params.onDestroy && d.params.onDestroy(), e !== !1 && (d = null)
            }, d.init(), d
        }
    }, Swiper.prototype = {
        isSafari: function() {
            var e = navigator.userAgent.toLowerCase();
            return e.indexOf("safari") >= 0 && e.indexOf("chrome") < 0 && e.indexOf("android") < 0
        }(),
        isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent),
        isArray: function(e) {
            return "[object Array]" === Object.prototype.toString.apply(e)
        },
        browser: {
            ie: window.navigator.pointerEnabled || window.navigator.msPointerEnabled
        },
        device: function() {
            var e = navigator.userAgent,
                t = e.match(/(Android);?[\s\/]+([\d.]+)?/),
                i = e.match(/(iPad).*OS\s([\d_]+)/),
                n = (e.match(/(iPod)(.*OS\s([\d_]+))?/), !i && e.match(/(iPhone\sOS)\s([\d_]+)/));
            return {
                ios: i || n || i,
                android: t
            }
        }(),
        support: {
            touch: window.Modernizr && Modernizr.touch === !0 || function() {
                return !!("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch)
            }(),
            transforms3d: window.Modernizr && Modernizr.csstransforms3d === !0 || function() {
                var e = document.createElement("div").style;
                return "webkitPerspective" in e || "MozPerspective" in e || "OPerspective" in e || "MsPerspective" in e || "perspective" in e
            }(),
            flexbox: function() {
                for (var e = document.createElement("div").style, t = "WebkitBox msFlexbox MsFlexbox WebkitFlex MozBox flex".split(" "), i = 0; i < t.length; i++)
                    if (t[i] in e) return !0
            }(),
            observer: function() {
                return "MutationObserver" in window || "WebkitMutationObserver" in window
            }()
        }
    };
    for (var t = (function() {
            var e = function(e) {
                    var t = this,
                        i = 0;
                    for (i = 0; i < e.length; i++) t[i] = e[i];
                    return t.length = e.length, this
                },
                t = function(t, i) {
                    var n = [],
                        r = 0;
                    if (t && !i && t instanceof e) return t;
                    if (t)
                        if ("string" == typeof t) {
                            var s, a, o = t.trim();
                            if (o.indexOf("<") >= 0 && o.indexOf(">") >= 0) {
                                var l = "div";
                                for (0 === o.indexOf("<li") && (l = "ul"), 0 === o.indexOf("<tr") && (l = "tbody"), (0 === o.indexOf("<td") || 0 === o.indexOf("<th")) && (l = "tr"), 0 === o.indexOf("<tbody") && (l = "table"), 0 === o.indexOf("<option") && (l = "select"), a = document.createElement(l), a.innerHTML = t, r = 0; r < a.childNodes.length; r++) n.push(a.childNodes[r])
                            } else
                                for (s = i || "#" !== t[0] || t.match(/[ .<>:~]/) ? (i || document).querySelectorAll(t) : [document.getElementById(t.split("#")[1])], r = 0; r < s.length; r++) s[r] && n.push(s[r])
                        } else if (t.nodeType || t === window || t === document) n.push(t);
                    else if (t.length > 0 && t[0].nodeType)
                        for (r = 0; r < t.length; r++) n.push(t[r]);
                    return new e(n)
                };
            return e.prototype = {
                addClass: function(e) {
                    if ("undefined" == typeof e) return this;
                    for (var t = e.split(" "), i = 0; i < t.length; i++)
                        for (var n = 0; n < this.length; n++) this[n].classList.add(t[i]);
                    return this
                },
                removeClass: function(e) {
                    for (var t = e.split(" "), i = 0; i < t.length; i++)
                        for (var n = 0; n < this.length; n++) this[n].classList.remove(t[i]);
                    return this
                },
                hasClass: function(e) {
                    return this[0] ? this[0].classList.contains(e) : !1
                },
                toggleClass: function(e) {
                    for (var t = e.split(" "), i = 0; i < t.length; i++)
                        for (var n = 0; n < this.length; n++) this[n].classList.toggle(t[i]);
                    return this
                },
                attr: function(e, t) {
                    if (1 === arguments.length && "string" == typeof e) return this[0] ? this[0].getAttribute(e) : void 0;
                    for (var i = 0; i < this.length; i++)
                        if (2 === arguments.length) this[i].setAttribute(e, t);
                        else
                            for (var n in e) this[i][n] = e[n], this[i].setAttribute(n, e[n]);
                    return this
                },
                removeAttr: function(e) {
                    for (var t = 0; t < this.length; t++) this[t].removeAttribute(e)
                },
                data: function(e, t) {
                    if ("undefined" == typeof t) {
                        if (this[0]) {
                            var i = this[0].getAttribute("data-" + e);
                            return i ? i : this[0].dom7ElementDataStorage && e in this[0].dom7ElementDataStorage ? this[0].dom7ElementDataStorage[e] : void 0
                        }
                        return void 0
                    }
                    for (var n = 0; n < this.length; n++) {
                        var r = this[n];
                        r.dom7ElementDataStorage || (r.dom7ElementDataStorage = {}), r.dom7ElementDataStorage[e] = t
                    }
                    return this
                },
                transform: function(e) {
                    for (var t = 0; t < this.length; t++) {
                        var i = this[t].style;
                        i.webkitTransform = i.MsTransform = i.msTransform = i.MozTransform = i.OTransform = i.transform = e
                    }
                    return this
                },
                transition: function(e) {
                    "string" != typeof e && (e += "ms");
                    for (var t = 0; t < this.length; t++) {
                        var i = this[t].style;
                        i.webkitTransitionDuration = i.MsTransitionDuration = i.msTransitionDuration = i.MozTransitionDuration = i.OTransitionDuration = i.transitionDuration = e
                    }
                    return this
                },
                on: function(e, i, n, r) {
                    function s(e) {
                        var r = e.target;
                        if (t(r).is(i)) n.call(r, e);
                        else
                            for (var s = t(r).parents(), a = 0; a < s.length; a++) t(s[a]).is(i) && n.call(s[a], e)
                    }
                    var a, o, l = e.split(" ");
                    for (a = 0; a < this.length; a++)
                        if ("function" == typeof i || i === !1)
                            for ("function" == typeof i && (n = arguments[1], r = arguments[2] || !1), o = 0; o < l.length; o++) this[a].addEventListener(l[o], n, r);
                        else
                            for (o = 0; o < l.length; o++) this[a].dom7LiveListeners || (this[a].dom7LiveListeners = []), this[a].dom7LiveListeners.push({
                                listener: n,
                                liveListener: s
                            }), this[a].addEventListener(l[o], s, r);
                    return this
                },
                off: function(e, t, i, n) {
                    for (var r = e.split(" "), s = 0; s < r.length; s++)
                        for (var a = 0; a < this.length; a++)
                            if ("function" == typeof t || t === !1) "function" == typeof t && (i = arguments[1], n = arguments[2] || !1), this[a].removeEventListener(r[s], i, n);
                            else if (this[a].dom7LiveListeners)
                        for (var o = 0; o < this[a].dom7LiveListeners.length; o++) this[a].dom7LiveListeners[o].listener === i && this[a].removeEventListener(r[s], this[a].dom7LiveListeners[o].liveListener, n);
                    return this
                },
                once: function(e, t, i, n) {
                    function r(a) {
                        i(a), s.off(e, t, r, n)
                    }
                    var s = this;
                    "function" == typeof t && (t = !1, i = arguments[1], n = arguments[2]), s.on(e, t, r, n)
                },
                trigger: function(e, t) {
                    for (var i = 0; i < this.length; i++) {
                        var n;
                        try {
                            n = new CustomEvent(e, {
                                detail: t,
                                bubbles: !0,
                                cancelable: !0
                            })
                        } catch (r) {
                            n = document.createEvent("Event"), n.initEvent(e, !0, !0), n.detail = t
                        }
                        this[i].dispatchEvent(n)
                    }
                    return this
                },
                transitionEnd: function(e) {
                    function t(s) {
                        if (s.target === this)
                            for (e.call(this, s), i = 0; i < n.length; i++) r.off(n[i], t)
                    }
                    var i, n = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"],
                        r = this;
                    if (e)
                        for (i = 0; i < n.length; i++) r.on(n[i], t);
                    return this
                },
                width: function() {
                    return this[0] === window ? window.innerWidth : this.length > 0 ? parseFloat(this.css("width")) : null
                },
                outerWidth: function(e) {
                    return this.length > 0 ? e ? this[0].offsetWidth + parseFloat(this.css("margin-right")) + parseFloat(this.css("margin-left")) : this[0].offsetWidth : null
                },
                height: function() {
                    return this[0] === window ? window.innerHeight : this.length > 0 ? parseFloat(this.css("height")) : null
                },
                outerHeight: function(e) {
                    return this.length > 0 ? e ? this[0].offsetHeight + parseFloat(this.css("margin-top")) + parseFloat(this.css("margin-bottom")) : this[0].offsetHeight : null
                },
                offset: function() {
                    if (this.length > 0) {
                        var e = this[0],
                            t = e.getBoundingClientRect(),
                            i = document.body,
                            n = e.clientTop || i.clientTop || 0,
                            r = e.clientLeft || i.clientLeft || 0,
                            s = window.pageYOffset || e.scrollTop,
                            a = window.pageXOffset || e.scrollLeft;
                        return {
                            top: t.top + s - n,
                            left: t.left + a - r
                        }
                    }
                    return null
                },
                css: function(e, t) {
                    var i;
                    if (1 === arguments.length) {
                        if ("string" != typeof e) {
                            for (i = 0; i < this.length; i++)
                                for (var n in e) this[i].style[n] = e[n];
                            return this
                        }
                        if (this[0]) return window.getComputedStyle(this[0], null).getPropertyValue(e)
                    }
                    if (2 === arguments.length && "string" == typeof e) {
                        for (i = 0; i < this.length; i++) this[i].style[e] = t;
                        return this
                    }
                    return this
                },
                each: function(e) {
                    for (var t = 0; t < this.length; t++) e.call(this[t], t, this[t]);
                    return this
                },
                html: function(e) {
                    if ("undefined" == typeof e) return this[0] ? this[0].innerHTML : void 0;
                    for (var t = 0; t < this.length; t++) this[t].innerHTML = e;
                    return this
                },
                is: function(i) {
                    if (!this[0]) return !1;
                    var n, r;
                    if ("string" == typeof i) {
                        var s = this[0];
                        if (s === document) return i === document;
                        if (s === window) return i === window;
                        if (s.matches) return s.matches(i);
                        if (s.webkitMatchesSelector) return s.webkitMatchesSelector(i);
                        if (s.mozMatchesSelector) return s.mozMatchesSelector(i);
                        if (s.msMatchesSelector) return s.msMatchesSelector(i);
                        for (n = t(i), r = 0; r < n.length; r++)
                            if (n[r] === this[0]) return !0;
                        return !1
                    }
                    if (i === document) return this[0] === document;
                    if (i === window) return this[0] === window;
                    if (i.nodeType || i instanceof e) {
                        for (n = i.nodeType ? [i] : i, r = 0; r < n.length; r++)
                            if (n[r] === this[0]) return !0;
                        return !1
                    }
                    return !1
                },
                index: function() {
                    if (this[0]) {
                        for (var e = this[0], t = 0; null !== (e = e.previousSibling);) 1 === e.nodeType && t++;
                        return t
                    }
                    return void 0
                },
                eq: function(t) {
                    if ("undefined" == typeof t) return this;
                    var i, n = this.length;
                    return t > n - 1 ? new e([]) : 0 > t ? (i = n + t, new e(0 > i ? [] : [this[i]])) : new e([this[t]])
                },
                append: function(t) {
                    var i, n;
                    for (i = 0; i < this.length; i++)
                        if ("string" == typeof t) {
                            var r = document.createElement("div");
                            for (r.innerHTML = t; r.firstChild;) this[i].appendChild(r.firstChild)
                        } else if (t instanceof e)
                        for (n = 0; n < t.length; n++) this[i].appendChild(t[n]);
                    else this[i].appendChild(t);
                    return this
                },
                prepend: function(t) {
                    var i, n;
                    for (i = 0; i < this.length; i++)
                        if ("string" == typeof t) {
                            var r = document.createElement("div");
                            for (r.innerHTML = t, n = r.childNodes.length - 1; n >= 0; n--) this[i].insertBefore(r.childNodes[n], this[i].childNodes[0])
                        } else if (t instanceof e)
                        for (n = 0; n < t.length; n++) this[i].insertBefore(t[n], this[i].childNodes[0]);
                    else this[i].insertBefore(t, this[i].childNodes[0]);
                    return this
                },
                insertBefore: function(e) {
                    for (var i = t(e), n = 0; n < this.length; n++)
                        if (1 === i.length) i[0].parentNode.insertBefore(this[n], i[0]);
                        else if (i.length > 1)
                        for (var r = 0; r < i.length; r++) i[r].parentNode.insertBefore(this[n].cloneNode(!0), i[r])
                },
                insertAfter: function(e) {
                    for (var i = t(e), n = 0; n < this.length; n++)
                        if (1 === i.length) i[0].parentNode.insertBefore(this[n], i[0].nextSibling);
                        else if (i.length > 1)
                        for (var r = 0; r < i.length; r++) i[r].parentNode.insertBefore(this[n].cloneNode(!0), i[r].nextSibling)
                },
                next: function(i) {
                    return new e(this.length > 0 ? i ? this[0].nextElementSibling && t(this[0].nextElementSibling).is(i) ? [this[0].nextElementSibling] : [] : this[0].nextElementSibling ? [this[0].nextElementSibling] : [] : [])
                },
                nextAll: function(i) {
                    var n = [],
                        r = this[0];
                    if (!r) return new e([]);
                    for (; r.nextElementSibling;) {
                        var s = r.nextElementSibling;
                        i ? t(s).is(i) && n.push(s) : n.push(s), r = s
                    }
                    return new e(n)
                },
                prev: function(i) {
                    return new e(this.length > 0 ? i ? this[0].previousElementSibling && t(this[0].previousElementSibling).is(i) ? [this[0].previousElementSibling] : [] : this[0].previousElementSibling ? [this[0].previousElementSibling] : [] : [])
                },
                prevAll: function(i) {
                    var n = [],
                        r = this[0];
                    if (!r) return new e([]);
                    for (; r.previousElementSibling;) {
                        var s = r.previousElementSibling;
                        i ? t(s).is(i) && n.push(s) : n.push(s), r = s
                    }
                    return new e(n)
                },
                parent: function(e) {
                    for (var i = [], n = 0; n < this.length; n++) e ? t(this[n].parentNode).is(e) && i.push(this[n].parentNode) : i.push(this[n].parentNode);
                    return t(t.unique(i))
                },
                parents: function(e) {
                    for (var i = [], n = 0; n < this.length; n++)
                        for (var r = this[n].parentNode; r;) e ? t(r).is(e) && i.push(r) : i.push(r), r = r.parentNode;
                    return t(t.unique(i))
                },
                find: function(t) {
                    for (var i = [], n = 0; n < this.length; n++)
                        for (var r = this[n].querySelectorAll(t), s = 0; s < r.length; s++) i.push(r[s]);
                    return new e(i)
                },
                children: function(i) {
                    for (var n = [], r = 0; r < this.length; r++)
                        for (var s = this[r].childNodes, a = 0; a < s.length; a++) i ? 1 === s[a].nodeType && t(s[a]).is(i) && n.push(s[a]) : 1 === s[a].nodeType && n.push(s[a]);
                    return new e(t.unique(n))
                },
                remove: function() {
                    for (var e = 0; e < this.length; e++) this[e].parentNode && this[e].parentNode.removeChild(this[e]);
                    return this
                },
                add: function() {
                    var e, i, n = this;
                    for (e = 0; e < arguments.length; e++) {
                        var r = t(arguments[e]);
                        for (i = 0; i < r.length; i++) n[n.length] = r[i], n.length++
                    }
                    return n
                }
            }, t.fn = e.prototype, t.unique = function(e) {
                for (var t = [], i = 0; i < e.length; i++) - 1 === t.indexOf(e[i]) && t.push(e[i]);
                return t
            }, t
        }()), i = ["jQuery", "Zepto", "Dom7"], n = 0; n < i.length; n++) window[i[n]] && e(window[i[n]]);
    var r;
    r = "undefined" == typeof t ? window.Dom7 || window.Zepto || window.jQuery : t, r && ("transitionEnd" in r.fn || (r.fn.transitionEnd = function(e) {
        function t(s) {
            if (s.target === this)
                for (e.call(this, s), i = 0; i < n.length; i++) r.off(n[i], t)
        }
        var i, n = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"],
            r = this;
        if (e)
            for (i = 0; i < n.length; i++) r.on(n[i], t);
        return this
    }), "transform" in r.fn || (r.fn.transform = function(e) {
        for (var t = 0; t < this.length; t++) {
            var i = this[t].style;
            i.webkitTransform = i.MsTransform = i.msTransform = i.MozTransform = i.OTransform = i.transform = e
        }
        return this
    }), "transition" in r.fn || (r.fn.transition = function(e) {
        "string" != typeof e && (e += "ms");
        for (var t = 0; t < this.length; t++) {
            var i = this[t].style;
            i.webkitTransitionDuration = i.MsTransitionDuration = i.msTransitionDuration = i.MozTransitionDuration = i.OTransitionDuration = i.transitionDuration = e
        }
        return this
    }))
}(), "undefined" != typeof module ? module.exports = Swiper : "function" == typeof define && define.amd && define([], function() {
    "use strict";
    return Swiper
});
var docCookies = {
        getItem: function(e) {
            return unescape(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + escape(e).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null
        },
        setItem: function(e, t, i, n, r, s) {
            if (!e || /^(?:expires|max\-age|path|domain|secure)$/i.test(e)) return !1;
            var a = "";
            if (i) switch (i.constructor) {
                case Number:
                    a = 1 / 0 === i ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + i;
                    break;
                case String:
                    a = "; expires=" + i;
                    break;
                case Date:
                    a = "; expires=" + i.toGMTString()
            }
            return document.cookie = escape(e) + "=" + escape(t) + a + (r ? "; domain=" + r : "") + (n ? "; path=" + n : "") + (s ? "; secure" : ""), !0
        },
        removeItem: function(e, t) {
            return e && this.hasItem(e) ? (document.cookie = escape(e) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (t ? "; path=" + t : ""), !0) : !1
        },
        hasItem: function(e) {
            return new RegExp("(?:^|;\\s*)" + escape(e).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=").test(document.cookie)
        },
        keys: function() {
            for (var e = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/), t = 0; t < e.length; t++) e[t] = unescape(e[t]);
            return e
        }
    },
    lg = $("html").attr("lang"),
    wH, wW, resizeFromSmall = !1,
    pixelDensity = window.devicePixelRatio || 1,
    mobile = /iPhone|iPad|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? !0 : !1,
    isIE9 = $("html").hasClass("ie9") ? !0 : !1,
    isChrome = navigator.userAgent.indexOf("Chrome") > -1,
    isExplorer = navigator.userAgent.indexOf("MSIE") > -1,
    isFirefox = navigator.userAgent.indexOf("Firefox") > -1,
    isSafari = navigator.userAgent.indexOf("Safari") > -1,
    isOpera = navigator.userAgent.indexOf("Presto") > -1;
isChrome && isSafari && (isSafari = !1);
var mousewheelevt = /Firefox/i.test(navigator.userAgent) ? "DOMMouseScroll" : "mousewheel";
window.requestAnimFrame = function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(e) {
        window.setTimeout(e, 1e3 / 60)
    }
}();
for (var scrollTop, fixedHeaderThreshold, parallaxElements = [], controlledScrolling = !1, animLetters, headerTL, mobileMenuVisible = !1, dragging = !1, trIMGpaths = [], i = 0; 20 > i; i++) trIMGpaths[i] = "/img/transition-exports-LQ/transition_" + i + ".png";
var trIMG = [],
    currentTrIMG = {
        now: 0
    },
    transitioning = !1,
    scrollBlocked = !1,
    currentPage = $("body").data("page-id"),
    pageLoaded = !1,
    preloadedIMG = ["img/transition-sprite.png", "img/bg/1.jpg", "img/bg/2.jpg", "img/bg/3.jpg", "img/bg/4.jpg", "img/bg/5.jpg"];
$(document).on("click touchend", "[data-scroll-to]", function(e) {
    e.preventDefault();
    var t = $(this),
        i = t.attr("href") ? t.attr("href") : t.data("scroll-to");
    return TweenMax.to(window, .8, {
        scrollTo: {
            y: $(i).offset().top,
            autoKill: !1
        },
        ease: Sine.easeInOut
    }), !1
}), $(document).on("click touchend", ".slider-bullets a", function(e) {
    e.preventDefault();
    var t = $(this),
        i = t.index(".slider-bullets a"),
        n = Math.abs(i - slider.activeIndex);
    return $(".slider-bullets a").removeClass("current"), t.addClass("current"), slider.params.speed = 700 + 700 / $(".slider-bullets a").length * n, slider.slideTo(i + 1), !1
}), $(document).on("click touchend", ".nav-btn", function(e) {
    e.preventDefault(), mobileMenuVisible = !mobileMenuVisible, $("body").toggleClass("mobile-menu")
}), $(document).on("touchmove", function(e) {
    dragging = !0, mobileMenuVisible && e.preventDefault()
}), $(document).on("touchend", function() {
    dragging = !1
}), $(document).on("touchmove", ".slider-bullets", function(e) {
    e.stopPropagation()
}), $(document).on("click touchend", "[data-goto]", function(e) {
    e.preventDefault();
    var t = $(this).data("goto");
	//alert($(this).attr("href"));
	//alert(currentPage+"PP"+t);
	//alert(t);
	
    dragging || transitioning || currentPage === t || (mobile && 720 > wW ? window.location = $(this).attr("href") : changePage(t, $(this).attr("href")))
});
var mapStyles = [{
    featureType: "administrative",
    stylers: [{
        visibility: "off"
    }]
}, {
    featureType: "poi",
    stylers: [{
        visibility: "off"
    }]
}, {
    featureType: "road",
    stylers: [{
        visibility: "simplified"
    }]
}, {
    featureType: "water",
    stylers: [{
        visibility: "simplified"
    }]
}, {
    featureType: "transit",
    stylers: [{
        visibility: "simplified"
    }]
}, {
    featureType: "landscape",
    stylers: [{
        visibility: "simplified"
    }]
}, {
    featureType: "road.highway",
    stylers: [{
        visibility: "off"
    }]
}, {
    featureType: "road.local",
    stylers: [{
        visibility: "on"
    }]
}, {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{
        visibility: "on"
    }]
}, {
    featureType: "water",
    stylers: [{
        color: "#84afa3"
    }, {
        lightness: 52
    }]
}, {
    stylers: [{
        saturation: -77
    }]
}, {
    featureType: "road"
}];
$("input, textarea, select").focus(function() {
    $(this).parents("li").removeClass("error")
}), $(document).on("click touchend", "#send", function(e) {
    e.preventDefault();
    var t = $(this),
        i = $("#contact-form").attr("action"),
        n = {
            _token: $("#token").val(),
            "first-name": $("#first-name").val(),
            "last-name": $("#last-name").val(),
            email: $("#email").val(),
            day: $("#day").val(),
            month: $("#month").val(),
            year: $("#year").val(),
            time: $("#time").val(),
            seats: $("#seats").val(),
            tel: $("#tel").val(),
            message: $("#message").val()
        };
    t.is(":disabled") || $.ajax({
        url: i,
        data: n,
        dataType: "json",
        cache: !1,
        type: "POST",
        beforeSend: function() {
            t.attr("disabled", "disabled").addClass("sending")
        },
        success: function(e) {
            "ok" === e.status ? TweenMax.staggerTo("#contact-form .animate", .1, {
                y: 100,
                opacity: 0,
                ease: Quad.easeInOut
            }, .1, function() {
                $("#contact-form").addClass("success")
            }) : $(e.message).each(function(e, t) {
                setTimeout(function() {
                    $("#" + t).parents("li").addClass("error")
                }, 100 * e)
            }), t.removeAttr("disabled").removeClass("sending")
        }
    })
}), $(".btn-book-again").on("click touchend", function(e) {
    e.preventDefault(), $("#contact-form").removeClass("success"), TweenMax.staggerTo("#contact-form .animate", .1, {
        y: 0,
        opacity: 1,
        ease: Quad.easeInOut
    }, .1)
}), $(document).ready(function() {
    layoutSettings(), isSafari && $("html").addClass("safari"), isFirefox && $("html").addClass("firefox"), $("html").addClass(isSafari || isChrome ? "fancy-transition" : "standard-transition"), "admin-index" !== currentPage && "login" !== currentPage && (onDocumentReady(currentPage), preloadImages(preloadedIMG), setupIntroTimeline(currentPage))
}), $(window).load(function() {
	
    $("body").removeClass("preload"), pageLoaded = !0, onPageLoaded(currentPage)
}), window.onpopstate = function(e) {
    if (e.state && !transitioning) {
        var t = "home" === e.state || null === e.state ? "/" + lg : "/" + lg + "/" + e.state,
            i = "home" === e.state || null === e.state ? "home" : e.state;
        changePage(i, t)
    }
}, $(window).scroll(function() {
    scrollTop = $(window).scrollTop(), wW > 640 && (setupHeader(), setDarkenerOpacity()), $(parallaxElements).each(function(e) {
        parallaxElements[e].update(scrollTop)
    })
}), $(window).resize(function() {
    layoutSettings()
});
function initsubmenu()
{
	var topMenu = $(".sub-nav"),
			topMenuHeight = topMenu.outerHeight()+15,
			// All list items
			menuItems = topMenu.find("a"),
			// Anchors corresponding to menu items
			scrollItems = menuItems.map(function(){
			  var item = $($(this).attr("href"));
			  if (item.length) { return item; }
			});
			$(window).scroll(function(){
				// Get container scroll position
				
   				var fromTop = $(this).scrollTop()+topMenuHeight+150;
				// Get id of current scroll item
			   var cur = scrollItems.map(function(){
				  // console.log($(this).offset().top)
				 if ($(this).offset().top < fromTop)
				   return this;
			   });
			   //console.log(fromTop);
			   // Get the id of the current element
			   cur = cur[cur.length-1];
			   var id = cur && cur.length ? cur[0].id : "";
			   // Set/remove active class
			   menuItems
				 .parent().removeClass("current")
				 .end().filter("[href=#"+id+"]").parent().addClass("current");
				
			});
		$(document).on("click", ".sub-nav a", function(e) {
				var minusval = $(this).attr("rel");
				$(".sub-nav a").parent().removeClass("current");
				e.preventDefault();
				$(this).parent().addClass("current");
				var t = $(this),
					i = t.attr("href") ? t.attr("href") : t.data("scroll-to");
				return TweenMax.to(window, 2.8, {
					scrollTo: {
						y: ($(i).offset().top)-minusval,
						autoKill: !1
					},
					ease: Expo.easeOut
					
				}), !1
			})
}
function initFacebook()
	{
		//console.log($('').html();
		/*var firstScript = document.getElementsByTagName('script')[0],
		  js = document.createElement('script');
		  js.src = '//connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v2.4';
		  firstScript.parentNode.insertBefore(js, firstScript);*/
		
		if($('#facebook_feed_loaded').val()==1)
		{
			$( ".facebook_feed" ).html($( "div.FaceBookfeedHolder" ).html());
		}
		else
		{
		(function(d, s, id) {
		  var js, fjs = d.getElementsByTagName(s)[0];
		  if (d.getElementById(id)) return;
		  js = d.createElement(s); js.id = id;
		  js.src = "//connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v2.4";
		  fjs.parentNode.insertBefore(js, fjs);
		}(document, 'script', 'facebook-jssdk'));
		
		/*var imported = document.createElement('script');
		imported.src = '//connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v2.4';
		document.head.appendChild(imported);*/
		
		$('#facebook_feed_loaded').val(1);
		}
		/*$(".facebook_feed").empty();
		$.ajax({
						  type: 'GET',
						  url: 'facebook_feed.html',
						  cache: false,  
						  success: function(result){
							  $('.facebook_feed').html(result);
						  }
		});*/
		//alert($('#fb-root').html());
		/*(function(d, s, id) {
		  var js, fjs = d.getElementsByTagName(s)[0];
		  //console.log(js);
		  if (d.getElementById(id)) return;
		  js = d.createElement(s); js.id = id;
		  js.src = "//connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v2.4";
		  fjs.parentNode.insertBefore(js, fjs);
		}(document, 'script', 'facebook-jssdk'));
		*/
		
	}
function initmediaScript()
{
	//console.log("calling");
	 $(function(){
            $(".audio").mb_miniPlayer({
                width:270,
                inLine:false,
                id3:false,
                downloadPage:null
//                downloadPage:"map_download.php"
            });
		 
        });
	$(document).ready(function(){
		$(".youtube").colorbox({iframe:true, width:"80%", height:"80%"});
		});
}

function pause()
{
	$("#yourAudio")[0].pause();
	$('.pause').hide();
	$('.play').show();
	//alert(id);
	
	  //pauseAllAudio();
	  
}
function play()
{
	$("#yourAudio")[0].play();
	$('.play').hide();
	$('.pause').show();
	//alert(id);
	
	  //pauseAllAudio();
	  
}
function remveBlanktag()
{
	$(document).ready(function (){
		console.log(window.innerWidth);
		if(window.innerWidth < 480 )
		   {
			 
			 $('p').each(function() {
			 var $this = $(this);
			 if($this.html().replace(/\s|&nbsp;/g, '').length == 0)
				 $this.remove(); }); 
			 $('h1').each(function() {
			 var $this = $(this);
			 if($this.html().replace(/\s|&nbsp;/g, '').length == 0)
				 $this.remove(); }); 
			 $('h3').each(function() {
			 var $this = $(this);
			 if($this.html().replace(/\s|&nbsp;/g, '').length == 0)
				 $this.remove(); }); 
		   }
		   
		});
   
}
function checkAudio()
{
	var myAudio = document.getElementById('yourAudio');

	if (myAudio.duration > 0 && !myAudio.paused) {
	
		//Its playing...do your job
	
	} else {
	     if(!firstloadcomplete)
		 {
			play();
			firstloadcomplete=true;
		 }
		 else
		 {
			 $('.pause').hide();
	        $('.play').show();
		 }
		
	}
	/*if(firstloadcomplete)
	{
	var myAudio = document.getElementById('yourAudio');
	if (myAudio.duration > 0 && !myAudio.paused) {
		$('.play').hide();
	    $('.pause').show();
		
	
	} else {
	
		$('.pause').hide();
	   $('.play').show();
	
	}
	}*/
}

function initScriller()
{
  $(document).ready(function() {
	   $("#burgers .article-text-inner").niceScroll({
		cursorcolor: "#333",
        cursoropacitymin: 0.3,
        background: "#bbb",
        cursorborder: "0",
        autohidemode: false,
        cursorminheight: 30}); // First scrollable DIV.
		 $("#suchismita .article-text-inner").niceScroll({
		cursorcolor: "#333",
        cursoropacitymin: 0.3,
        background: "#bbb",
        cursorborder: "0",
        autohidemode: false,
        cursorminheight: 30}); 
		
	    });
}
