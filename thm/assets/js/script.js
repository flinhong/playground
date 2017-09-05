$(document).ready(function(a) {
  var b;
  a("header a").attr("tabindex", 1);
  var c = ["ul#cpUl li a", "#search form input#q", "#search form input#searchSubmit"];
  for (b = 0; b < c.length; b++) a(c[b]).attr("tabindex", 2);
  a("#imageArrowRight, #imageArrowLeft").attr("tabindex", 3), 0 !== a("#heroContainer").length && (a('<li><a href="javascript:;" id="topPause" tabindex="1">Pause Rotating Stories</a></li>').insertAfter("#accessibilityNav ul li:eq(0)"), a("#imageScrollerWindow .heroBlock:first-child").addClass("heroBlockActive"), a("#imageScrollerWindow .heroBlock:first-child .heroTextHolder").children().addClass("heroContentActive"));
  var d = a("#q").val(),
      e = a("#emailSignup").val();
  a("#q").focus(function() {
          a("#q").val() == d && a("#q").val(""), a(".largeNav").hasClass("largeNavActive") && (a(".largeNav").removeClass("largeNavActive"), a("nav").removeAttr("style"), a("#cpUl li a").attr("tabindex", "2"), a(".cpActive").removeClass("cpActive"), a("#cpUl li a").attr("title", "Expand Menu"))
      }), a("#q").blur(function() {
          "" === a("#q").val() && a("#q").val(d)
      }), a("#emailSignup, .emailSignup").focus(function() {
          a(this).val() == e && a(this).val("")
      }), a("#emailSignup, .emailSignup").blur(function() {
          "" === a(this).val() && a(this).val(e)
      }), a("#azindex a").not("#azindexdropdown li a").click(function() {
          "none" == a(this).siblings("ul").css("display") ? (a("#azindexdropdown").addClass("azindexdropdownActive"), a(this).addClass("azActive")) : (a("#azindexdropdown").removeClass("azindexdropdownActive"), a(this).removeClass("azActive"))
      }), a("#azindexdropdown li a").focus(function() {
          a("#azindexdropdown").addClass("azindexdropdownActive")
      }), a("#azindex").hover(function() {
          a("#quicklinksdropdown").removeClass("quicklinksdropdownActive")
      }, function() {
          a("#azindexdropdown").hasClass("azindexdropdownActive") && a("a", this).not("#azindexdropdown li a").addClass("azActive")
      }), a("#quicklinks a").click(function() {
          "none" == a(this).siblings("ul").css("display") ? a("#quicklinksdropdown").addClass("quicklinksdropdownActive") : a("#quicklinksdropdown").removeClass("quicklinksdropdownActive")
      }), a("#quicklinks").hover(function() {
          a("#azindexdropdown").removeClass("azindexdropdownActive"), a("#azindex a").removeClass("azActive")
      }, function() {}), a("#quicklinks a, #utilityNav a").not("#azindexdropdown li a, #azindex a").focus(function() {
          "block" == a("#azindex ul").css("display") && (a("#azindex ul").removeClass("azindexdropdownActive"), a("#azindex a").removeClass("azActive"))
      }), a("#maps a, #azindex a").focus(function() {
          "block" == a("#quicklinks ul").css("display") && a("#quicklinks ul").removeClass("quicklinksdropdownActive")
      }), a("#searchTab").click(function() {
          a(".majorTabActive").removeClass("majorTabActive"), a(this).addClass("majorTabActive"), a(".byCollege").removeClass("majorSearchActive"), a(".plainSearch").addClass("majorSearchActive")
      }), a("#byCollegeTab").click(function() {
          a(".majorTabActive").removeClass("majorTabActive"), a(this).addClass("majorTabActive"), a(".plainSearch").removeClass("majorSearchActive"), a(".byCollege").addClass("majorSearchActive")
      }),
      function() {
          a("#pageTopicsInner li").prepend("<span></span>"), a("#pageTopicsInner span").not("#pageTopicsInner a span").addClass("fa fa-angle-right")
      }()
}), $(document).ready(function(a) {
  a("#cpUl li a").not("#cpUl.cpStandardNav li a, .largeNav a, .link_only").attr({
      href: "javascript:;",
      title: "Expand Menu"
  }), a("#cpUl").not("#cpUl.cpStandardNav").children("li").children("a").click(function() {
      if (a(this).siblings(".largeNav").hasClass("largeNavActive")) a(this).parent().removeClass("cpActive"), a(this).siblings(".largeNav").removeClass("largeNavActive"), a("nav").removeAttr("style"), a(this).attr("title", "Expand Menu");
      else {
          a(".largeNav").removeClass("largeNavActive"), a(".cpActive a:first").attr("title", "Expand Menu"), a(".cpActive").removeClass("cpActive"), a(this).parent().addClass("cpActive"), a(this).siblings(".largeNav").addClass("largeNavActive"), a("nav").css("border-bottom", "5px solid #7f9974").css("margin-bottom", "5px"), a(this).attr("title", "Close Expanded Menu");
          var b = a(".cpActive").index();
          a("#cpUl li a:gt(" + b + ")").attr("tabindex", "2")
      }
  }), a("*").focus(function() {
      (0 === a(this).closest("nav").length || "q" == a(this).attr("id")) && (a(".largeNav").removeClass("largeNavActive"), a("nav").removeAttr("style"), a(".cpActive a:first").attr("title", "Expand Menu"), a(".cpActive").removeClass("cpActive")), 0 === a(this).closest("#azindex").length && (a("#azindexdropdown").removeClass("azindexdropdownActive"), a(".azActive").removeClass("azActive")), 0 === a(this).closest("#quicklinks").length && a("#quicklinksdropdown").removeClass("quicklinksdropdownActive")
  }), a("*").click(function() {
      0 === a(this).closest("nav").length && (a(".largeNav").removeClass("largeNavActive"), a("nav").removeAttr("style"), a(".cpActive a:first").attr("title", "Expand Menu"), a(".cpActive").removeClass("cpActive")), 0 === a(this).closest("#azindex").length && (a("#azindexdropdown").removeClass("azindexdropdownActive"), a(".azActive").removeClass("azActive"))
  }), a("nav").find("*").click(function(a) {
      a.stopPropagation()
  }), a("#azindex").find("*").click(function(a) {
      a.stopPropagation()
  }), a(".largeNavClose").click(function() {
      a(".largeNavActive").removeClass("largeNavActive"), a("nav").removeAttr("style"), a(".cpActive a").eq(1).attr("title", "Expand Menu");
      var b = a("#cpUl").children(".cpActive"),
          c = a("#cpUl").children("li").index(b) + 1;
      a("#cpUl").children("li").eq(c - 1).children("a:first").focus(), a(".cpActive").removeClass("cpActive")
  }), a("#cpUl li a").focus(function() {
      if (a(this).parent().hasClass("cpActive")) {
          a(this).attr("tabindex", "1");
          var b = a(".cpActive").index() + 1;
          a("#cpUl li a:lt(" + b + ")").not(".largeNav a").attr("tabindex", "1"), a("#cpUl li a:gt(" + b + ")").not(".largeNav a").attr("tabindex", "2")
      }
  })
}), $(document).ready(function(a) {
  function b() {
      f === !0 && (i = (e + 2) % h, 0 === i && (i = h), g = !1, f = !1, e++, e %= h, 0 === e && (e = h), k = a(".heroBlock:nth-child(" + e + ") .heroTextHolder .articleDate").html(), l = a(".heroBlock:nth-child(" + e + ") .heroTextHolder h2").html(), m = a(".heroBlock:nth-child(" + e + ") .heroTextHolder p").html(), n = a(".heroBlock:nth-child(" + e + ") .heroTextHolder a").html(), o = a(".heroBlock:nth-child(" + e + ") .heroTextHolder a").attr("href"), a("#heroTextVisible").children().stop(!0, !0).fadeTo(500, 0, function() {
          a(".heroBlockActive").removeClass("heroBlockActive"), a(".heroBlock:nth-child(" + e + ")").addClass("heroBlockActive"), a("#heroTextVisible .articleDate").html(k), a("#heroTextVisible h2").html(l), a("#heroTextVisible p").html(m), a("#heroTextVisible a").not("#readAllStories").html(n), a("#heroTextVisible a").not("#readAllStories").attr("href", o), a("#heroTextVisible").children().fadeTo(500, 1)
      }), a(".scrollerImageCurrent").animate({
          left: "-100%"
      }, 1e3, function() {
          a(".scrollerImagePrevious").not(this).removeClass("scrollerImagePrevious"), a(this).removeClass("scrollerImageCurrent").addClass("scrollerImagePrevious")
      }), a(".scrollerImageNext").css("left", "100%").animate({
          left: "0%"
      }, 1e3, function() {
          a(this).removeClass("scrollerImageNext").addClass("scrollerImageCurrent"), a(".heroBlock:nth-child(" + i + ") .scrollerImage").addClass("scrollerImageNext"), g = !0, f = !0
      }))
  }

  function c() {
      g === !0 && (j = (e - 2 + h) % h, 0 === j && (j = h), g = !1, f = !1, e--, e %= h, 0 === e && (e = h), k = a(".heroBlock:nth-child(" + e + ") .heroTextHolder .articleDate").html(), l = a(".heroBlock:nth-child(" + e + ") .heroTextHolder h2").html(), m = a(".heroBlock:nth-child(" + e + ") .heroTextHolder p").html(), n = a(".heroBlock:nth-child(" + e + ") .heroTextHolder a").html(), o = a(".heroBlock:nth-child(" + e + ") .heroTextHolder a").attr("href"), a("#heroTextVisible").children().stop(!0, !0).fadeTo(500, 0, function() {
          a(".heroBlockActive").removeClass("heroBlockActive"), a(".heroBlock:nth-child(" + e + ")").addClass("heroBlockActive"), a("#heroTextVisible .articleDate").html(k), a("#heroTextVisible h2").html(l), a("#heroTextVisible p").html(m), a("#heroTextVisible a").not("#readAllStories").html(n), a("#heroTextVisible a").not("#readAllStories").attr("href", o), a("#heroTextVisible").children().fadeTo(500, 1)
      }), a(".scrollerImageCurrent").animate({
          left: "100%"
      }, 1e3, function() {
          a(".scrollerImageNext").not(this).removeClass("scrollerImageNext"), a(this).removeClass("scrollerImageCurrent").addClass("scrollerImageNext")
      }), a(".scrollerImagePrevious").css("left", "-100%").animate({
          left: "0%"
      }, 1e3, function() {
          a(this).removeClass("scrollerImagePrevious").addClass("scrollerImageCurrent"), a(".heroBlock:nth-child(" + j + ") .scrollerImage").addClass("scrollerImagePrevious"), g = !0, f = !0
      }))
  }

  function d() {
      var b = a(".scrollerImageCurrent img").width(),
          c = 333 * b / 730;
      if (a(".scrollerImageCurrent").css({
              height: c
          }), a("#mobileNavDept").is(":visible") || a("#mobileNavCP").is(":visible")) {
          var d = a("#heroTextVisible").height();
          a("#smallControlsWrapper").css("left" == a("#deptName").css("text-align") ? {
              top: c - 28 + "px"
          } : {
              top: c - 34 + "px"
          }), a("#heroTextVisible").css({
              top: c + 20 + "px"
          }), a("#imageScrollerContainer").css({
              height: c + d + 30 + "px"
          })
      } else {
          var e = Math.round(c / 2 - 18),
              f = a("#smallControlsWrapper").width(),
              g = Math.round((f - 100) / 2 - 9),
              h = parseInt(a("#heroTextVisible p").css("line-height"), 10),
              i = Math.floor((c - 175) / h) * h;
          a("#imageArrowLeft").css({
              top: e + "px"
          }), a("#imageArrowRight").css({
              top: e + "px"
          }), a("#imageScrollerContainer").css({
              height: c + 2 + "px"
          }), a("#smallNext").css({
              right: g + "px"
          }), a("#smallPause").css({
              right: g + 50 + "px"
          }), a("#smallPrev").css({
              right: g + 100 + "px"
          }), a(".spacer").height(c + 6), a("#heroTextVisible").css({
              top: 0
          }), a("#heroTextVisible p").css({
              "max-height": i + "px"
          }), a("#smallControlsWrapper").css("top", "auto")
      }
  }
  if (a("#heroContainer").length) {
      var e = 1,
          f = !0,
          g = !0,
          h = a("#imageScrollerWindow").children().length,
          i = 2,
          j = h,
          k = "",
          l = "",
          m = "",
          n = "",
          o = "";
      a("#heroTextVisible").addClass("heroTextVisibleOn"), a(".heroTextHolder").addClass("heroTextHolderOff"), a(".heroBlock:nth-child(1) .scrollerImage").addClass("scrollerImageCurrent"), a(".heroBlock:nth-child(2) .scrollerImage").addClass("scrollerImageNext"), a(".heroBlock:nth-child(" + j + ") .scrollerImage").addClass("scrollerImagePrevious"), a(".scrollerImage").not(".scrollerImageCurrent").css("left", "100%"), a("#heroTextVisible .articleDate").html(a(".heroBlockActive .heroTextHolder .articleDate").html()), a("#heroTextVisible h2").html(a(".heroBlockActive .heroTextHolder h2").html()), a("#heroTextVisible p").html(a(".heroBlockActive .heroTextHolder p").html()), a("#heroTextVisible a").not("#readAllStories").html(a(".heroBlockActive .heroTextHolder a").html()), a("#heroTextVisible a").not("#readAllStories").attr("href", a(".heroBlockActive .heroTextHolder a").attr("href")), a("#imageArrowRight").click(function() {
          b()
      }), a("#imageArrowLeft").click(function() {
          c()
      }), a("#smallNext").click(function() {
          b()
      }), a("#smallPrev").click(function() {
          c()
      });
      var p = 0;
      p = setInterval(b, 9e3);
      var q = null;
      a("#imageScrollerContainer, #imageArrowRight, #imageArrowLeft").hover(function() {
          q || clearInterval(p)
      }, function() {
          q || (clearInterval(p), p = setInterval(b, 9e3))
      }), a("#imageArrowRight, #imageArrowLeft, #smallPause, #smallNext, #smallPrev, #heroTextVisible a").focus(function() {
          q || clearInterval(p)
      }), a("#imageArrowRight, #imageArrowLeft, #smallPause, #smallNext, #smallPrev, #heroTextVisible a").blur(function() {
          q || (clearInterval(p), p = setInterval(b, 9e3))
      }), a("#smallPause, #topPause").click(function() {
          q ? (clearInterval(p), p = setInterval(b, 9e3), q = null, a("#smallPause span").removeClass("fa-play").addClass("fa-pause")) : (clearInterval(p), q = 1, a("#smallPause span").removeClass("fa-pause").addClass("fa-play"))
      }), d(), setTimeout(d, 200);
      var r;
      for (r = 1; 10 >= r; r++) setTimeout(d, 1e3 * r);
      a(window).resize(d)
  }
}),
function(a, b, c) {
  function d(b, c) {
      this.element = b, this.settings = a.extend({}, e, c), this._defaults = e, this._name = f, this.init()
  }
  var e = {
          label: "MENU",
          duplicate: !0,
          duration: 200,
          easingOpen: "linear",
          easingClose: "linear",
          closedSymbol: "&#9658;",
          openedSymbol: "&#9660;",
          fontAwesome: "fa fa-navicon",
          prependTo: "",
          appendTo: "",
          parentTag: "a",
          closeOnClick: !1,
          allowParentLinks: !0,
          nestedParentLinks: !0,
          showChildren: !1,
          init: function() {},
          open: function() {},
          close: function() {}
      },
      f = "slicknav",
      g = "slicknav";
  d.prototype.init = function() {
      var c, d, e = this,
          f = a(this.element),
          h = this.settings;
      h.duplicate ? (e.mobileNav = f.clone(), e.mobileNav.removeAttr("id"), e.mobileNav.find("*").each(function(b, c) {
          a(c).removeAttr("id")
      })) : e.mobileNav = f, c = g + "_icon", "" === h.label && (c += " " + g + "_no-text"), "a" == h.parentTag && (h.parentTag = 'a href="#"'), e.mobileNav.attr("class", g + "_nav"), d = a('<div class="' + g + '_menu"></div>'), e.btn = a(["<" + h.parentTag + ' aria-haspopup="true" tabindex="0" class="' + g + "_btn " + g + '_collapsed">', '<span class="' + g + "_menutxt " + h.fontAwesome + '">' + h.label + "</span>", '<span class="' + c + '">', '<span class="' + g + '_icon-bar"></span>', '<span class="' + g + '_icon-bar"></span>', '<span class="' + g + '_icon-bar"></span>', "</span>", "</" + h.parentTag + ">"].join("")), "" !== h.prependTo && (a("#mobileIcons").prepend(e.btn), a(h.prependTo).prepend(d)), "" !== h.appendTo && (a("#mobileIcons").append(e.btn), a(h.appendTo).prepend(d)), d.append(e.mobileNav);
      var i = e.mobileNav.find("li");
      a(i).each(function() {
          var b = a(this),
              c = {};
          if (c.children = b.children("ul").attr("role", "menu"), b.data("menu", c), c.children.length > 0) {
              var d = b.contents(),
                  f = !1;
              nodes = [], a(d).each(function() {
                  return a(this).is("ul") ? !1 : (nodes.push(this), void(a(this).is("a") && (f = !0)))
              });
              var i = a("<" + h.parentTag + ' role="menuitem" aria-haspopup="true" tabindex="-1" class="' + g + '_item"/>');
              if (h.allowParentLinks && !h.nestedParentLinks && f) a(nodes).wrapAll('<span class="' + g + "_parent-link " + g + '_row"/>').parent();
              else {
                  var j = a(nodes).wrapAll(i).parent();
                  j.addClass(g + "_row")
              }
              b.addClass(g + "_collapsed"), b.addClass(g + "_parent");
              var k = a('<span class="' + g + '_arrow fa fa-chevron-circle-right fa-lg"></span>');
              h.allowParentLinks && !h.nestedParentLinks && f && (k = k.wrap(i).parent()), a(nodes).first().before(k)
          } else 0 === b.children().length && b.addClass(g + "_txtnode");
          b.children("a").attr("role", "menuitem").click(function(b) {
              h.closeOnClick && !a(b.target).parent().closest("li").hasClass(g + "_parent") && a(e.btn).click()
          }), h.closeOnClick && h.allowParentLinks && (b.children("a").children("a").click(function(b) {
              a(e.btn).click()
          }), b.find("." + g + "_parent-link a:not(." + g + "_item)").click(function(b) {
              a(e.btn).click()
          }))
      }), a(i).each(function() {
          var b = a(this).data("menu");
          h.showChildren || e._visibilityToggle(b.children, null, !1, null, !0)
      }), e._visibilityToggle(e.mobileNav, null, !1, "init", !0), e.mobileNav.attr("role", "menu"), a(b).mousedown(function() {
          e._outlines(!1)
      }), a(b).keyup(function() {
          e._outlines(!0)
      }), a(e.btn).click(function(a) {
          a.preventDefault(), e._menuToggle()
      }), e.mobileNav.on("click", "." + g + "_item", function(b) {
          b.preventDefault(), e._itemClick(a(this))
      }), a(e.btn).keydown(function(a) {
          var b = a || event;
          13 == b.keyCode && (a.preventDefault(), e._menuToggle())
      }), e.mobileNav.on("keydown", "." + g + "_item", function(b) {
          var c = b || event;
          13 == c.keyCode && (b.preventDefault(), e._itemClick(a(b.target)))
      }), h.allowParentLinks && h.nestedParentLinks && a("." + g + "_item a").click(function(a) {
          a.stopImmediatePropagation()
      })
  }, d.prototype._menuToggle = function(a) {
      var b = this,
          c = b.btn,
          d = b.mobileNav;
      c.hasClass(g + "_collapsed") ? (c.removeClass(g + "_collapsed"), c.addClass(g + "_open")) : (c.removeClass(g + "_open"), c.addClass(g + "_collapsed")), c.addClass(g + "_animating"), b._visibilityToggle(d, c.parent(), !0, c)
  }, d.prototype._itemClick = function(a) {
      var b = this,
          c = (b.settings, a.data("menu"));
      c || (c = {}, c.arrow = a.children("." + g + "_arrow"), c.ul = a.next("ul"), c.parent = a.parent(), c.parent.hasClass(g + "_parent-link") && (c.parent = a.parent().parent(), c.ul = a.parent().next("ul")), a.data("menu", c)), c.parent.hasClass(g + "_collapsed") ? (c.arrow.removeClass("fa-chevron-circle-right"), c.arrow.addClass("fa-chevron-circle-down"), c.parent.removeClass(g + "_collapsed"), c.parent.addClass(g + "_open"), c.parent.addClass(g + "_animating"), b._visibilityToggle(c.ul, c.parent, !0, a)) : (c.arrow.removeClass("fa-chevron-circle-down"), c.arrow.addClass("fa-chevron-circle-right"), c.parent.addClass(g + "_collapsed"), c.parent.removeClass(g + "_open"), c.parent.addClass(g + "_animating"), b._visibilityToggle(c.ul, c.parent, !0, a))
  }, d.prototype._visibilityToggle = function(b, c, d, e, f) {
      var h = this,
          i = h.settings,
          j = h._getActionItems(b),
          k = 0;
      d && (k = i.duration), b.hasClass(g + "_hidden") ? (b.removeClass(g + "_hidden"), b.slideDown(k, i.easingOpen, function() {
          a(e).removeClass(g + "_animating"), a(c).removeClass(g + "_animating"), f || i.open(e)
      }), b.attr("aria-hidden", "false"), j.attr("tabindex", "0"), h._setVisAttr(b, !1)) : (b.addClass(g + "_hidden"), b.slideUp(k, this.settings.easingClose, function() {
          b.attr("aria-hidden", "true"), j.attr("tabindex", "-1"), h._setVisAttr(b, !0), b.hide(), a(e).removeClass(g + "_animating"), a(c).removeClass(g + "_animating"), f ? "init" == e && i.init() : i.close(e)
      }))
  }, d.prototype._setVisAttr = function(b, c) {
      var d = this,
          e = b.children("li").children("ul").not("." + g + "_hidden");
      e.each(c ? function() {
          var b = a(this);
          b.attr("aria-hidden", "true");
          var e = d._getActionItems(b);
          e.attr("tabindex", "-1"), d._setVisAttr(b, c)
      } : function() {
          var b = a(this);
          b.attr("aria-hidden", "false");
          var e = d._getActionItems(b);
          e.attr("tabindex", "0"), d._setVisAttr(b, c)
      })
  }, d.prototype._getActionItems = function(a) {
      var b = a.data("menu");
      if (!b) {
          b = {};
          var c = a.children("li"),
              d = c.find("a");
          b.links = d.add(c.find("." + g + "_item")), a.data("menu", b)
      }
      return b.links
  }, d.prototype._outlines = function(b) {
      b ? a("." + g + "_item, ." + g + "_btn").css("outline", "") : a("." + g + "_item, ." + g + "_btn").css("outline", "none")
  }, d.prototype.toggle = function() {
      var a = this;
      a._menuToggle()
  }, d.prototype.open = function() {
      var a = this;
      a.btn.hasClass(g + "_collapsed") && a._menuToggle()
  }, d.prototype.close = function() {
      var a = this;
      a.btn.hasClass(g + "_open") && a._menuToggle()
  }, a.fn[f] = function(b) {
      var c = arguments;
      if (void 0 === b || "object" == typeof b) return this.each(function() {
          a.data(this, "plugin_" + f) || a.data(this, "plugin_" + f, new d(this, b))
      });
      if ("string" == typeof b && "_" !== b[0] && "init" !== b) {
          var e;
          return this.each(function() {
              var g = a.data(this, "plugin_" + f);
              g instanceof d && "function" == typeof g[b] && (e = g[b].apply(g, Array.prototype.slice.call(c, 1)))
          }), void 0 !== e ? e : this
      }
  }
}(jQuery, document, window), $(document).ready(function(a) {
  function b() {
      for (var b = "", d = a("#cpUl").children("li").not(".not-on-mobile"), e = 0; e < d.length; e++) {
          b += "<li>";
          var f = d.eq(e).children().children().children("h2");
          b += 0 !== a(f).find("a").length ? "<a href='" + a("a", f[0]).attr("href") + "'>" + a("a", d[e]).html() + "</a>" : a("a", d[e]).html();
          var g = d.eq(e).children().children().children().children("h3").not(".not-on-mobile");
          if (0 !== g.length) {
              b += "<ul>";
              for (var h = 0; h < g.length; h++) {
                  b += a("a", g[h]).length ? "<li><a href='" + a("a", g[h]).attr("href") + "'>" + a("a", g[h]).html() + "</a>" : "<li>" + a("span", g[h]).html();
                  var i = g.eq(h).parent().children("ul").children("li").not(".not-on-mobile");
                  if (0 !== i.length) {
                      b += "<ul>";
                      for (var j = 0; j < i.length; j++) b += "<li><a href='" + a("a", i[j]).attr("href") + "'>" + a("a", i[j]).html() + "</a>";
                      b += "</ul>"
                  }
                  b += "</li>"
              }
              b += "</ul>"
          }
          b += "</li>"
      }
      c.append(b)
  }
  var c = a("#mobileMenu");
  0 !== a("#contact").length && a("#mobileIcons").append('<a href="' + a("#contact a").attr("href") + '"><span class="fa fa-envelope-o"><span class="iconTitle">Contact</span></span></a>'), 0 !== a("#maps").length && a("#mobileIcons").append('<a href="' + a("#maps a").attr("href") + '"><span class="fa fa-map-marker"><span class="iconTitle">Maps</span></span></a>'), 0 !== a(".largeNav").length ? b() : c.append(a("#cpUl").html());
  var d = a("#rightCol").children("div").children("h2").html(),
      e = a("#rightCol").children("div").not("#news, #newsColor, #relatedLinks").children("ul").first();
  if (0 !== e.length && c.append('<li class="divider"></li><li>' + d + "<ul>" + e.eq(0).html() + "</ul></li>"), (0 !== a("#azindex").length || 0 !== a("#audienceNav").length || 0 !== a("#quicklinks").length) && c.append('<li class="divider"></li>'), 0 !== a("#azindex").length) {
      var f = a("#azindex").children("a").attr("href"),
          g = a("#azindex").children("a").html();
      c.append('<li><a href="' + f + '">' + g + "</a></li>")
  }
  if (0 !== a("#quicklinks").length) {
      var h = a("#quicklinks").children("a").html(),
          i = a("#quicklinksdropdown").html();
      c.append("<li>" + h + "<ul>" + i + "</ul></li>")
  }
  if (0 !== a("#audienceNav").length) {
      var j = a("#audienceNav").children("ul").html();
      c.append("<li>Information for...<ul>" + j + "</ul></li>")
  }
  if (0 !== a("#searchli").length) {
      a("#searchField").attr("tabindex", "1"), a("#searchSubmit").attr("tabindex", "1"), c.slicknav({
          label: "<span>Menu</span>",
          prependTo: "#mobileNav",
          open: function() {
              a("#mobileSearch").slicknav("close")
          }
      }), a("#mobileSearch").slicknav({
          label: "<span>Search</span>",
          appendTo: "#mobileNav",
          fontAwesome: "fa fa-search",
          open: function() {
              c.slicknav("close")
          }
      });
      var k = a("#mobileNav form div");
      k.css({
          "min-width": "200px",
          "max-width": "300px",
          margin: "5px auto 8px auto"
      }), k.attr("id", "mobileSearchForm"), k.find("input").eq(5).css({
          width: "85%"
      });
      var l = k.find("input").eq(6);
      l.attr({
          value: "GO",
          src: ""
      }), l.css({
          height: "25px",
          margin: "0 0 0 -4px",
          border: "none",
          color: "white",
          background: "#6F6345"
      }), l.get(0).setAttribute("type", "submit")
  } else c.slicknav({
      label: "<span>Menu</span>",
      prependTo: "#mobileNav"
  });
  ! function() {
      if (a("#mobileNavDept").is(":visible") ? a("#contentHeader").after(a("#pageTopics")) : a("#contentHeader").before(a("#pageTopics")), a("#rightCol").length) {
          var b = a("#rightCol").html();
          a("#mobileNavDept").is(":visible") ? (a("#relatedLinksBottom, #relatedLinksTitle").show(), a("#relatedLinksBottom").html(b)) : a("#relatedLinksBottom, #relatedLinksTitle").hide()
      } else a("#relatedLinksBottom, #relatedLinksTitle").hide();
      var c = a("#footer_links li:first"),
          d = a("#footer_links li:last");
      a("#mobileNavDept").is(":visible") ? a("li#footerLogo").prependTo(c.parent()) : a("li#footerLogo").appendTo(d.parent())
  }(), a(window).resize(function() {
      if (a("#mobileNavDept").is(":visible") ? a("#contentHeader").after(a("#pageTopics")) : a("#contentHeader").before(a("#pageTopics")), a("#rightCol").length) {
          var b = a("#rightCol").html();
          a("#mobileNavDept").is(":visible") ? (a("#relatedLinksBottom, #relatedLinksTitle").show(), a("#relatedLinksBottom").html(b)) : a("#relatedLinksBottom, #relatedLinksTitle").hide()
      } else a("#relatedLinksBottom, #relatedLinksTitle").hide();
      var c = a("#footer_links li:first"),
          d = a("#footer_links li:last");
      a("#mobileNavDept").is(":visible") ? a("li#footerLogo").prependTo(c.parent()) : a("li#footerLogo").appendTo(d.parent())
  })
});