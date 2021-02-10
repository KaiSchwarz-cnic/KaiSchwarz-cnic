$(window).on('load', function () {
    $('.level-bar-inner').each(function () {
        var itemWidth = $(this).data('level')
        $(this).animate({
            width: itemWidth
        }, 800)
    })
})

$(function ($) {
    /*======= Skillset *=======*/
    $('.level-bar-inner').css('width', '0')

    /* Bootstrap Tooltip for Skillset */
    $('.level-label').tooltip()

    $('.hoverimg')
        .off()
        .on('mouseenter', function(e){
            const img = $(this)
            const x = e.pageX - this.naturalWidth
            const y = e.pageY - this.naturalHeight + 100
            $("body").append(`<div id="hoverimg"><img src="${img.attr('src')}"/></div>`)
            $("#hoverimg")
                .css("position", "absolute")
                .css("top", `${y}px`)
                .css("left", `${x}px`)
                .fadeIn("fast")
        })
        .on('mouseleave', function(){
            $("#hoverimg").remove()
        })
})