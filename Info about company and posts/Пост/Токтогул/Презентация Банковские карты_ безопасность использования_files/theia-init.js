jQuery(function () {
    var sidebars = jQuery('.theiaStickySidebar');
    if (sidebars.length) {
        if ($.fn.theiaStickySidebar) {
            initSidebars();
        }
        function initSidebars() {
            sidebars.each(function () {
                var $this = $(this);
                var def = {
                    // Settings
                    additionalMarginTop: $this.data("theia-margin-top") || 70,
                    additionalMarginBottom: $this.data("theia-margin-bottom") || 70,
                    minWidth: $this.data("theia-minwidth") || 1000,
                    updateSidebarHeight: false
                };
                var containerSelector = $this.data("theia-container");

                // To prevent unexpected property min-height
                // in not login sticky sidebars, additional
                // parameter was added
                var fixHeight = $this.data("theia-fix-height");

                if (containerSelector) {
                    def.containerSelector = containerSelector;
                }
                var minWidth = $this.data("theia-width");
                if (minWidth) {
                    def.minWidth = minWidth;
                }
                var marginBottom = $this.data("theia-margin-bottom");
                if (marginBottom) {
                    def.additionalMarginBottom = marginBottom;
                }
                if ($this.attr('data-theia-take-this')) {
                    var $theia = $this;
                    $this.removeClass("theiaStickySidebar");
                } else {
                    $theia = $this.parent();
                }
                var theia = $theia.theiaStickySidebar(def)[0];

                // If page body to small - sidebar used to go undermain content
                // here we set parent container min-height as the height of the sidebar
                // to exclude this behaviour
                if (fixHeight && theia.container && theia.stickySidebar) {
                    theia.container.css('min-height', theia.stickySidebar.height()+'px');
                }

                if ($this.attr('data-theia-padding-top')){
                    theia.paddingHack = +$this.attr('data-theia-padding-top');
                }
                $theia.data('theia', theia);
            });
        }

        window.fixTheiaSidebars = function () {
            $('.theiaStickySidebar').each(function () {
                var $this = $(this);
                var parent = $this.parent();
                var theia = parent.data("theia");//we use modified version of lib
                $this.css({position: "static"});
                theia.onScroll(theia);
            });
        };

        function fixOverflow() {
            $('.theiaStickySidebar').each(function () {
                var $this = $(this);
                var parent = $this.parent();
                var theia = parent.data("theia");//we use modified version of lib
                if (theia.sidebar.data('theia-expand')) {
                    return;
                }
                parent.css({maxHeight: '1px'});
                var outerHeight = $this.outerHeight();
                var parentHeight = parent.parent().outerHeight();
                if (outerHeight > parentHeight && $(window).width() > 992) {
                    parent.css({maxHeight: '1px'});
                } else {
                    parent.css({maxHeight: 'none'});
                }
            });
        }

        fixOverflow();
        $(window).resize(fixOverflow);
    }
});
