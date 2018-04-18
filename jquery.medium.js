(function ( $ ) {
 
    $.fn.medium= function( options ) {

        var settings = $.extend({
            rss_to_json: 'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/' + options.user,
            items: 3,
            excerpt_length: 250,
            layout: 'columns',
            framework: 'bs4',
            read_more_txt: 'Read more'
        }, options ),
        element = $(this);

        var template = {
            getRow: function (content) {
                return '<div class="row medium-row">' + content + '</div>';
            },
            getColumn: function (title, thumbnail_url, excerpt, link) {
                var column = '<div class="col-md-4 medium-column">'
                                +'<a href="' + link + '">'
                                    +'<div class="medium-thumbnail"><img src="' + thumbnail_url + '" /></div>'
                                +'</a>'
                                +'<h3 class="medium-title">' + title + '</h3>'
                                +'<p class="medium-excerpt">' + excerpt + '</p>'
                                +'<a href="' + link + '" class="medium-read-more">'
                                    + settings.read_more_txt
                                +'</a>'
                            +'</div>';
                return column;
            }
        };

        $.get(settings.rss_to_json, function (data) {
            if (data.status === 'ok') {
                var columns = '';

                $.each(data.items, function (i, item) {
                    var column = template.getColumn(item.title, item.thumbnail, $(item.description).text().substring(0, settings.excerpt_length), item.link);
                    columns = columns.concat(column);

                    // Limit to getting only the number of articles requested
                    if (i === settings.items - 1) {
                        return false;
                    }
                });

                var row = template.getRow(columns);

                $(element).html(row);
            }
        });
    };
 
}( jQuery ));

// https://gist.github.com/psynewave/4220821