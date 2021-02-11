$(window).on("load", function () {
  $(".level-bar-inner").each(function () {
    const itemWidth = $(this).data("level");
    $(this).animate(
      {
        width: itemWidth,
      },
      800
    );
  });
});

$(function ($) {
  // Skillset
  $(".level-bar-inner").css("width", "0");
  $(".level-label").tooltip();
  // /Skillset
  $(".hoverimg")
    .off()
    .on("mouseenter", function (event) {
      const img = $(this);
      const x = event.pageX - this.naturalWidth;
      const y = event.pageY - this.naturalHeight + 100;
      $("body").append(
        `<div id="hoverimg"><img src="${img.attr("src")}"/></div>`
      );
      $("#hoverimg")
        .css("position", "absolute")
        .css("top", `${y}px`)
        .css("left", `${x}px`)
        .fadeIn("fast");
    })
    .on("mouseleave", function () {
      $("#hoverimg").remove();
    });
});
