// TABS
// =================================
    $('.section-tabs .section-tabs__tabs ul li').click(function() {
        $(this).parent().find('li.active').removeClass('active');
        $(this).addClass('active');
        var sectionTabs = $(this).parent().parent().parent().find('.section-tabs__content_type-small');
        sectionTabs.removeClass('concatenated');
        var arrowDirection = $('.collapsable__btn');
        arrowDirection.addClass('untoggled');
        var index = $(this).index();
        $(this).parent().parent().parent().find('.slide').each(function(i, elem) {
            if (i == index) {
                $(elem).slideDown(300);
            } else {
                $(elem).slideUp(300);
            }
        });
    });


    $('.collapsable__btn').on("click", function() {
        $(this).toggleClass('untoggled');
    });



    // TABS SHOW/HIDE FULL CONTENT ON BUTTON CLICK
    // =================================
    $(document).ready(function() {
        $('.collapsable__btn').on("click", function() {
            var sectionTabs = $(this).parent().find('.section-tabs__content_type-small');
            if (sectionTabs.hasClass('concatenated')) {
                sectionTabs.removeClass('concatenated');
            } else {
                sectionTabs.addClass('concatenated');
            }
        });
    });
    // мини табы_____________
    // обьявление масив li
    var li_name = [];
    // расчет количества
    $('.section-tabs .section-tabs__tabs').each(function(i, elem) {
        elem.setAttribute('rel', i);
        $('.section-tabs .section-tabs__tabs[rel=' + i + ']').parent().find('.section-tabs__content').attr('rel', i);
        super_sbor(i);
    });
    // логика сборки 
    function super_sbor(number) {
        $('.section-tabs .section-tabs__tabs[rel=' + number + '] ul li').each(function(i, elem) {
            li_name[i] = elem.innerHTML;
            // console.log('номер '+number+" колич"+i);
        });
        // var el=$('.section-tabs .section-tabs__tabs[rel='+number+'] ul li')
        // console.log(li_name);
        // обьявление контента
        var content = [];
        // сборка контента 
        $('.section-tabs__content[rel=' + number + '] .slide').each(function(i, elem) {
            content[i] = elem.innerHTML;
        });            
        paint_dom(content, li_name, number);
         // функция delete нефигу не пашит на масивах поэтому просто обьявляю пустой массив
        content = new Array();
        li_name = new Array();
    }

    // логика кликов по mini_tab
    $('#mini_tab ul.cd-accordion-menu .has-children').click(function() {
        if ($(this).attr('class') == 'has-children active') {
            $(this).children('.slide_children').slideUp(200);
            $(this).removeClass('active');
        } else {
            $('.slide_children').hide(200);
            console.log("hide me");
            $('#mini_tab ul.cd-accordion-menu .has-children.active').removeClass('active');
            $(this).addClass('active');
            $(this).children('.slide_children').slideDown(200);
        }
    });


// отрисовка нового мини-меню
function paint_dom(content, li_name, number, name_home_dom='section-tabs__tabs') {
    var structur_dom = '<ul class="cd-accordion-menu">';
    for (var i = 0; i < li_name.length; i++) {
        // делаем пустышку пустышкой
        if (content[i] == undefined) {
            content[i] = ' ';
        }
        structur_dom = structur_dom + '<li rel=' + i + ' class="has-children"><label class="group-1">' + li_name[i] + '</label><div style="display:none;" class="slide_children">' + content[i] + '</div></li>';
    }
    structur_dom = structur_dom + '</ul>';
    // вывод структуры mini_tab
    if (name_home_dom=='section-tabs__tabs') {
     $('.section-tabs__tabs[rel=' + number + '] ').append("<div id='mini_tab'>" + structur_dom + "</div>");
    }else{

      $('.'+name_home_dom+'').append("<div id='mini_tab'>" + structur_dom + "</div>");
    }
}