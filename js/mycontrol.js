
(function () {
    $.fn.bs_dialog = function (a, i) {
        if (typeof a == "string") {
            var t = $.fn.bs_dialog.methods[a];
            if (t) {
                return t(this, i)
            }
        }
        a = a || {};
        return this.each(function () {
            var i = $.data(this, "bs_dialog");
            if (i) {
                $.extend(i.options, a)
            } else {
                i = $.data(this, "bs_dialog", {
                    options: $.extend({},
                    $.fn.bs_dialog.defaults, a)
                })
            }
            e(this)
        })
    };
    $.fn.bs_dialog.defaults = {
        backdrop: "static",
        keyboard: false,
        show: false,
        showClose: true,
        appfoothide: true,
        title: "",
        width: "",
        buttons: [],
        onBeforeClose: function () {
            return true
        },
        onClose: function () { },
        onShow: function () { },
        onBeforeOpen: function () {
            return true
        }
    };
    $.fn.bs_dialog.methods = {
        open: function (e) {
            var a = $.data(e[0], "bs_dialog");
            a.dialog.modal("show")
        },
        close: function (e) {
            var a = $.data(e[0], "bs_dialog");
            a.dialog.modal("hide")
        },
        showLoading: function (e, a) {
            var i = $.data(e[0], "bs_dialog");
            i.dialog.find(">div.modal-dialog").showLoading(a)
        },
        hideLoading: function (e) {
            var a = $.data(e[0], "bs_dialog");
            a.dialog.find(">div.modal-dialog").hideLoading()
        },
        resize: function (e) {
            a(e[0])
        },
        getdhbar: function (e) {
            var a = $.data(e[0], "bs_dialog");
            return a.dialog_head_xs
        },
        destory: function (e) {
            e.closest("div.modal-dialog").remove()
        }
    };
    var e = function (e) {
        var i = $.data(e, "bs_dialog");
        var t = $.data(e, "bs_dialog").options;
        $(e).addClass("mx-dialog-c");
        if (!i["isdrawui"]) {
            var o = "";
            var d = "";
            if (t.width == "lg") {
                o = "bs-example-modal-lg";
                d = "modal-lg"
            } else if (t.width == "sm") {
                o = "bs-example-modal-sm";
                d = "modal-sm"
            }
            i["dialog"] = $('<div class="modal fade ' + o + '" ><div class="modal-dialog modal-bs-dialog ' + d + '"></div></div>');
            i["dialog_content"] = $('<div class="modal-content"></div>').appendTo(i.dialog.find(">div.modal-dialog"));
            i["dialog_head"] = $('<div class="modal-header"></div>').appendTo(i.dialog_content);
            //i["dialog_head_xs"] = $('<div class="dh-bar modal-header-xs"></div>').appendTo(i.dialog_content);
            i["dialog_body"] = $('<div class="modal-body"></div>').appendTo(i.dialog_content);
            i.dialog_body.append($(e));
            i["dialog_footer"] = $('<div class="modal-footer"></div>').appendTo(i.dialog_content);
            if (t.appfoothide) {
                i.dialog_footer.addClass("appfoothide")
            }
            $(e).addClass("bs_dialog");
            $("body").append(i.dialog);
            i.dialog.modal({
                keyboard: t.keyboard,
                show: t.show,
                backdrop: t.backdrop
            });
            i.dialog.on("show.bs.modal",
            function () {
                if (t.onBeforeOpen.call(e) == false) return false
            }).on("shown.bs.modal",
            function () {
                $(e).addClass("open");
                $(e).resize();
                a(e);
                t.onShow.call(e)
            }).on("hide.bs.modal",
            function () {
                if (t.onBeforeClose.call(e) == false) return false;
                var a = $.data(e, "bs_dialog");
                a.dialog.find(">div.modal-dialog").addClass("modal-bs-dialog")
            }).on("hidden.bs.modal",
            function () {
                $(e).removeClass("open");
                var a = $("body").find("div.modal.fade.in");
                if (a.length > 0) {
                    $("body").addClass("modal-open")
                }
                t.onClose.call(e)
            }).on("loaded.bs.modal",
            function () { })
        }
        i["isdrawui"] = true;
        var n = '<button type="button" class="close" data-dismiss="modal" aria-hidden="true" >&times;</button>';
        if (!t.showClose) {
            n = ""
        }
        i.dialog_head.empty();
        i.dialog_head.html(n + " " + t.title);
        //i.dialog_head_xs.empty();
        //i.xs_return = $('<button type="button" class="btn  pull-left ">  <i class="ace-icon fa fa-angle-left  bigger-120"></i>关闭</button> ').appendTo(i.dialog_head_xs);
        //if (!t.showClose) {
        //    i.xs_return.remove()
        //}
        //$(t.title).appendTo(i.dialog_head_xs);
        //i.xs_more = $('<div class="btn-group pull-right"><button type="button" class="btn  no-border dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="ace-icon fa fa-reorder "></i></button><ul class="dropdown-menu dropdown-light"></ul></div>').appendTo(i.dialog_head_xs);
        //if (i.xs_return && i.xs_return.length > 0) {
        //    i.xs_return.on("click",
        //    function (e) {
        //        i.dialog.modal("hide")
        //    })
        //}
        i.dialog_footer.empty();
        if (t.buttons && t.buttons.length > 0) {
            i.dialog_footer.show();
            $.each(t.buttons,
            function (e, a) {
                var t = $(a.dom).appendTo(i.dialog_footer);
                t.on("click",
                function () {
                    return a.handler.call(this)
                });
                //var o = i.xs_more.find("ul");
                if (!t.is("button,div.btn-group")) {
                    return true
                }
                if (t.hasClass("mx-xs-quick")) {
                    var d = t.html();
                    //var n = $('<button type="button" class="btn  pull-right" > ' + d + "</button> ").appendTo(i.dialog_head_xs);
                    $.data(n[0], "linkbtn", t);
                    //$.data(t[0], "linkbtn", n);
                    //n.on("click",
                    //function (e) {
                    //    var a = $.data(this, "linkbtn");
                    //    a.trigger("click")
                    //});
                    return true
                }
                if (t.hasClass("btn-group")) {
                    var d = t.find(">button").html();
                    $('<li class="divider"></li>').appendTo(o);
                    var l = t.find(">ul");
                    l.find(">li").each(function (e, a) {
                        $liO = $(a);
                        if ($liO.hasClass("divider")) {
                            $('<li class="divider"></li>').appendTo(o);
                            return true
                        }
                        var i = $("<li>" + $liO.html() + "</li>").appendTo(o);
                        if ($liO.hasClass("disabled") || $liO.hasClass("hidden")) {
                            i.addClass("hidden")
                        }
                        $.data(i[0], "linkbtn", $liO);
                        $.data($liO[0], "linkbtn", i);
                        i.on("click",
                        function (e) {
                            var a = $.data(this, "linkbtn");
                            a.trigger("click")
                        })
                    })
                } else {
                    var d = t.html();
                    var s = $('<li><a href="#" >' + d + "</a></li>").appendTo(o);
                    if (t.hasClass("disabled") || t.hasClass("hidden")) {
                        s.addClass("hidden")
                    }
                    $.data(s[0], "linkbtn", t);
                    $.data(t[0], "linkbtn", s);
                    s.on("click",
                    function (e) {
                        var a = $.data(this, "linkbtn");
                        a.trigger("click")
                    })
                }
            });
            //if (i.xs_more.find(">ul>li").length <= 0) {
            //    i.xs_more.addClass("hidden")
            //} else {
            //    i.xs_more.removeClass("hidden")
            //}
        } else {
            i.dialog_footer.hide()
        }
        i.dialog.find('a[data-toggle="tab"]').on("shown.bs.tab",
        function (i) {
            a(e)
        })
    };
    var a = function (e) {
        var a = $.data(e, "bs_dialog");
        var i = $.data(e, "bs_dialog").options;
        a.dialog.find(">div.modal-dialog").removeClass("modal-bs-dialog");
        var t = $(window).height();
        //if ($.browser.useapp) {
        //    a.dialog.addClass("mx-xs");
        //    a.dialog_body.height(t - a.dialog_head.outerHeight() - a.dialog_footer.outerHeight() - 2);
        //    return
        //} else {
        //    a.dialog.removeClass("mx-xs")
        //}
        if (a.dialog_head.outerHeight() + a.dialog_body.outerHeight() + a.dialog_footer.outerHeight() > t) {
            a.dialog.find(".modal-dialog").addClass("max")
        } else { }
        a.dialog_body.css({
            "max-height": t - a.dialog_head.outerHeight() - a.dialog_footer.outerHeight() - 5
        })
    }
})(jQuery);


$.fn.showLoading = function (e) {
    if (window.frames.length != parent.frames.length) {
        if ($(parent.document).find("div.widget-box-overlay").length > 0) {
            return
        }
    }
    $(this).find(">div.widget-box-overlay").remove();
    var t = '<div class="widget-box-overlay"><button type="button" class="close"  >×</button><span class="loading-icon"></span></div>';
    $(this).append(t);
    $(this).find("div.widget-box-overlay .close").on("click",
    function (e) {
        var t = $(this);
        t.closest("div.widget-box-overlay").remove()
    })
};
$.fn.hideLoading = function () {
    $(this).find(">div>i.fa-spin").html("");
    var e = this;
    $(e).find(">div.widget-box-overlay").remove()
};

/*
年月选择
依赖：jquery,bootstrap
调用：
$('#test').DatePicker({
   onChange: function (v) {
	alert(v);		
   }
});
*/
(function ($) {

    var dateformat = function (d, fmt) { //author: meizz 
        var o = {
            "M+": d.getMonth() + 1, //月份 
            "d+": d.getDate(), //日 
            "h+": d.getHours(), //小时 
            "m+": d.getMinutes(), //分 
            "s+": d.getSeconds(), //秒 
            "q+": Math.floor((d.getMonth() + 3) / 3), //季度 
            "S": d.getMilliseconds() //毫秒 
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (d.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }

    $.fn.DatePicker = function (options) {
        options = $.extend({}, $.fn.DatePicker.defaults, options)

        var e = this;
        var ctl = $('<div><button class="btn btn-sm btn-info btn-prev" style="border-width:1px!important"><i class="icon icon-chevron-left"></i></button><button type="button" class="btn btn-sm btn-white changetime" style="border-width:1px!important">' + options.dfdate + '</button><button class="btn btn-sm btn-info btn-next" style="border-width:1px!important"><i class="icon icon-chevron-right"></i></button></div>');
        e.empty();
        e.append(ctl);
        var b = e.find('.changetime');
        var hide = function () {
            b.popover('hide');
        }
        var ct = $('<div><select class="year" style="height:28px;"></select> - <select style="height:28px;" class="month"></select>&nbsp;<button class="btn btn-info pull-right btn-sm btn-ok" style="border-width:1px!important">确定</button></div>');
        
        var m = ct.find('.month'), y = ct.find('.year');
        
        ct.find('.btn-ok').click(function () {
            var s = y.find('option:selected').val() + '-' + m.find('option:selected').val();
            b.text(s);
            options.onChange(s);
            hide();
        });

        var am = [], ay = [];
        if (m.find('option').length == 0) {
            for (var i = 1; i <= 12; i++) {
                var ti = i.toString().length == 1 ? '0' + i : i;
                am.push(ti);
                m.append('<option value="' + ti + '">' + ti + '月</option>');
            }
        }
        if (y.find('option').length == 0) {
            var cy = new Date().getFullYear();
            for (var i = cy; i >= options.minYear; i--) {
                ay.push(i);
                y.append('<option value="' + i + '">' + i + '年</option>');
            }
        }
        b.popover({
            title: '<i class="icon icon-calendar"></i> 选择统计时间',
            html: true,
            placement: 'top',
            content: ct
        }).click(function (v) {
            b.popover('toggle');
            b.popover('show');
            var s = b.text();
            var ym = s.split('-');
            if (ym.length > 1 && am.join(',').indexOf(ym[1]) != -1) {
                m.val(ym[1]);
            }
            if (ay.join(',').indexOf(ym[0]) != -1) {
                y.val(parseInt(ym[0]));
            }
        });
        ctl.find('.btn-prev').on('click', function () {
            hide();
            var s = b.text();
            var at = s.split('-');
            var ty = parseInt(at[0]), tm = parseInt(at[1]);
            if (tm == 1) {
                tm = 12;
                ty = ty - 1 < options.minYear ? ty : ty - 1;
            }
            else {
                tm--;
            }
            var tv = ty + '-' + (tm.toString().length == 1 ? '0' + tm : tm);
            b.text(tv);
            options.onChange(tv);
        });
        ctl.find('.btn-next').on('click', function () {
            hide();
            var s = b.text();
            var at = s.split('-');
            var ty = parseInt(at[0]), tm = parseInt(at[1]);
            if (tm == 12) {
                tm = 1;
                ty = ty + 1 > new Date().getFullYear() ? ty : ty + 1;
            }
            else {
                tm++
            }
            var tv = ty + '-' + (tm.toString().length == 1 ? '0' + tm : tm);
            b.text(tv);
            options.onChange(tv);
        });
    };

    var _dfdate = dateformat(new Date(), 'yyyy-MM');
    $.fn.DatePicker.defaults = {
        dfdate: _dfdate,
        minYear: 2015,
        onChange: function (e) { }
    };
})(jQuery)
