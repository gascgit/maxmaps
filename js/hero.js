
(function ($, window, document) {

    $(window).load(function () {
        setTimeout(function () {
            $('img[usemap]').rwdImageMaps();
            $(window).trigger("resize");
            $(".maphide").hide();
            init();
        }, 250);
    });
    function heroBackground() {
        mW = $("#map1").width();
        mH = $("#map1").height();
        overlay = '<div id="hero" style="width:' + mW + 'px; height:' + mH + 'px;"></div>';
        $(overlay).appendTo("#map1").animate({
            opacity: 1
        }, 500);
    }


    function heroOpen(ths) {
        mod = 10;
        mW = $("#map1").width() - (($("#map1").width() / mod) * 2);
        mH = $("#map1").height() - (($("#map1").height() / mod) * 2);
        pos = $(ths).data("pos").split(",");
        point = points[pos[0]][pos[1]];
        $(".dot").removeClass("actv"); // ALL PIN REMOVE ACTIVE
        $(ths).addClass("actv"); // SET THIS PIN ACTIVE

        close = '<img class="closehero" src="img/close.png"/>';
        prenext = '<div id="innerhero-control"><div class="text-center"><span>PREV</span> | <span>NEXT</span></div></div>';
        container = '<div class="container-fluid"><div class="row"><div class="col-xs-9">';
        inner = '<div id="innerhero" style="margin:' + ((mH / mod) + 15) + 'px ' + (mW / mod) + 'px; height:' + mH + 'px; opacity:0; width: ' + mW + '+px">' + container + '<div class="info" style="height:' + (mH - 15) + 'px"><img src="img/amenities/' + point.pin + '.jpg" style="max-width:100%; padding:15px 0"/></div></div><div class="col-xs-3 heroinfocontainer" style="height:' + (mH - 30) + 'px; padding-top:30px; padding-right:30px">' + prenext + '<div class="herotitle" style="text-transform:uppercase">' + point.title + '</div><div class="spacer"></div><div class="time">' + point.time + ' MINUTES AWAY</div><div class="spacer"></div><div class="heroinfo">' + point.content + '</div></div>' + close + '</div>';
        if (!$("#hero").length) {
            heroBackground();
        }
        $("#hero").html(inner);
        $('.heroinfo').flowtype({
            fontRatio: 15
        });
        $('.time, #innerhero-control').flowtype({
            fontRatio: 8
        });
        $('.herotitle').flowtype({
            fontRatio: 6
        });
        $("#innerhero").animate({
            opacity: 1
        }, 250);
    }

    $(document).on("click", ".dot", function () {
        clearInterval(looper);
        if ($(this).attr("data-dx") !== "1") {
            heroOpen($(this));
        }
    });
    $(document).on('click', "#innerhero-control span", function () {
        pinCount = parseInt($(".dot").length);
        direction = parseInt($("#innerhero-control span").index(this));
        actvdot = parseInt($(".dot.actv").attr("data-dx"));
        if (direction === 0) {
            if (actvdot === 0) {
                nextdot = parseInt(pinCount - 1);
            } else {
                nextdot = parseInt(actvdot - 1);
            }
            if (nextdot === 1) {
                nextdot = 0;
            }
        } else {
            if (actvdot === parseInt(pinCount - 1)) {
                nextdot = 0;
            } else {
                nextdot = parseInt(actvdot + 1);
            }
            if (nextdot === 1) {
                nextdot = 2;
            }
        }
        $(".dot").removeClass("actv");
        $("#innerhero").fadeOut(250, function () {
            $("#innerhero").remove();
            $(".dot").eq(nextdot).trigger("click");
        });
    });
    $(document).on("click", ".closehero", heroClose);
    $(document).on("click", ".herocontrols span", function () {
        $(".herocontrols span").removeClass("actv");
        $(this).addClass("actv");
        indx = $(".herocontrols span").index(this);
        setPoints(indx);
    });
    $(".heroleft, .heroright").click(function () {
        $(this).css("opacity", .5).animate({
            opacity: 1
        }, 250);
        herocount = $(".herocontrols span").length;
        actv = $(".herocontrols span.actv").index();
        last = (herocount - 1);
        if ($(this).hasClass("heroleft")) {
            next = actv - 1;
            if (actv === 0) {
                next = last;
            }
        } else {
            next = actv + 1;
            if (actv === last) {
                next = 0;
            }
        }
        $(".herocontrols span").eq(next).trigger("click");
    });
})(window.jQuery, window, document);

function setcontrols() {
    countheros = $(".mappoints").length;
    for (a = 0; a < countheros; a++) {
        $(".herocontrols").append("<span></span>");
    }
    $(".herocontrols span").eq(0).addClass("actv");
    hW = ($(".herocontrols").width() / 2) * -1;
    $(".herocontrols").css("margin-left", hW + "px");
}

function heroClose() {
    $("#hero").fadeOut(250, function () {
        $(this).remove();
    });
}

function setPoints() {
    $(".dot").remove();
    mainmapwidth = $("#mainmap").width();
    setTimeout(function () {
        $(".dot").remove();
        active = $(".herocontrols span.actv").index();
        pincount = 0;
        $(".mappoints:eq(" + active + ") area").each(function () {
            point = points[active][pincount];
            coords = $(this).attr("coords").split(",");
            pinwidth = (mainmapwidth + 300) * .044;
            pinheight = (pinwidth) * 1.3;
            //pinwidth = 70;
            pintop = 91;
            if (pincount === 1) {
                pinwidth = pinwidth + 40;
                pinheight = pinheight + 50;
            }

            coord1 = (coords[0] - (pinwidth / 2));
            coord2 = (coords[1] - pinheight);
            dot = '<img class="dot" src="img/pins/' + point.pin + '.png" style="height:' + pinheight + 'px; width:' + pinwidth + 'px; left:' + coord1 + 'px; top:' + (pinheight * -1) + 'px;" data-y="' + coord2 + '" data-pos="' + [active, pincount] + '" data-dx="' + pincount + '" />';
            $(dot).appendTo('#map1');
            pincount++;
        });
        time = 150;
        setTimeout(function () {
            $(".dot").each(function () {
                y = $(this).attr("data-y");
                $(this).delay(time).animate({
                    top: y
                }, 500);
                time += 150;
            });
            loopIt();
        }, 250);
    }, 250);
}

looper = null;

function loopIt() {
    console.log("loop it");
    clearInterval(looper);
    looper = setTimeout(function () {
        $(".heroright").trigger("click");
    }, 5000);
}

function init() {
    setcontrols();
}

$(window).on('resize', function () {
    $("#hero").remove();
    setPoints();
});
points = [
    [
        {
            pin: "pin1-1",
            title: "George Brown College",
            content: "<div>George Brown College’s St. James campus is just an 11 minute walk south and offers a wide range of courses available to George Brown’s student body of 25,888 full time students and 62,840 continuing education students.</div>",
            time: "11"
        }, {
            pin: "pinmax",
            title: "Max Condos",
            content: "<div>asdf</div>",
            time: "0"
        }, {
            pin: "pin1-2",
            title: "Hockey Hall of Fame",
            content: "<div>Explore the rich history of Canada’s favourite game at the Hockey Hall of Fame. Featuring fascinating collectors items and interactive exhibits, no matter what your favourite team is, you can have a great day at The Hockey Hall of Fame.</div>",
            time: "16"
        }, {
            pin: "pin1-3",
            title: "St. Michael’s Choir School",
            content: "<div>Founded in 1937, St. Michael’s Choir school is a semi-private Roman Catholic boys’ school that is known for its exceptional music program that includes the study of choral music, music theory and piano, as well as options to study second instruments. This respected school is ranked number 1 out of 740 schools rated by the Fraser Institute, scoring 9.9 out of 10 on the Fraser Institute’s scale as recently as 2013.</div>",
            time: "5"
        }, {
            pin: "pin1-4",
            title: "Elgin and Winter Garden Theatre",
            content: "<div>The Elgin and Winter Garden theatres are the oldest surviving Edwardian stacked theatres in the world, first built in 1913. Today you can enjoy some of Toronto’s most acclaimed stage performances in these historic venues.</div>",
            time: "8"
        }, {
            pin: "pin1-5",
            title: "Ripley’s Aquarium",
            content: "<div>You can dive in to a fun filled day of wonder and discovery at Ripley’s Aquarium. This world-class facility has beautifully recreated 5.7 million litres of diverse marine and freshwater habitats from around the world. Enjoy close up encounters with over 13,500 exotic marine species and more than 450 freshwater species.</div>",
            time: "30"
        }, {
            pin: "pin1-7",
            title: "Ryerson University",
            content: "<div>Ryerson University is one of Canada’s top Universities — with a current student population of over 40,000 students studying across a wide range of popular fields.</div>",
            time: "4"
        }, {
            pin: "pin1-6",
            title: "Nathan Phillips Square",
            content: "<div>Right in front of City Hall, Nathan Phillips Square is a gathering place for all manner of events throughout the year. From skating on the iconic public ice rink in the winter, to special holiday celebrations and live concerts, there’s always something exciting to look forward to!</div>",
            time: "12"
        }, {
            pin: "pin1-8",
            title: "Kinka Izakaya",
            content: "<div>An izakaya is a  Japanese pub, known as an inviting place to enjoy delicious food and drinks. Kinka Izakaya recreates this quintessential Japanese experience with a bustling atmosphere and authentic izakaya cuisine.</div>",
            time: "40"
        }, {
            pin: "pin1-9",
            title: "The Churchmouse Pub",
            content: "<div>The Churchmouse is a charming 2-storey Firkin Pub located in a heritage building at 475 Church St. Enjoy a wonderful menu of classic British Pub food and a wide selection of draft beers from all over the world here.</div>",
            time: "14"
        }
    ],
    [
        {
            pin: "pin2-1",
            title: "St. Lawrence Market",
            content: "<div>A 12 minute walk south will bring you to the world famous St. Lawrence Market. Featuring over 120 vendors offering the finest in produce, meats, fresh fish and artisanal goods, you can enjoy all the rich flavours of city living here.</div>",
            time: "12"
        }, {
            pin: "pinmax",
            title: "Max Condos",
            content: "<div>asdf</div>",
            time: "0"
        }, {
            pin: "pin2-2",
            title: "Sony Centre for the Performing Arts",
            content: "<div>The Sony Centre is a premier theatrical venue that has been host to everything from concerts, to musical theatre, comedies, dance performances and more over the past 50 years.</div>",
            time: "16"
        }, {
            pin: "pin2-3",
            title: "Air Canada Centre",
            content: "<div>Home to The Toronto Raptors and The Toronto Maple Leafs, some of the most exciting nights in Toronto sports happen here on a regular basis. When there aren’t games playing, you can also enjoy some of the biggest name musical performances in the world here. </div>",
            time: "22"
        }, {
            pin: "pin2-4",
            title: "Ed Mirvish Theatre",
            content: "<div>First opened in 1920, this historic theatre has a long and proud history of putting on excellent live performances for nearly 100 years. Today, the Ed Mirvish Theatre hosts some of the finest live theatre productions in the city.</div>",
            time: "7"
        }, {
            pin: "pin2-5",
            title: "Toronto Eaton Centre",
            content: "<div>Home to over 250 top brand name shopping destinations, a world of vibrant urban style is just waiting to be discovered at Eaton Centre.</div>",
            time: "5"
        }, {
            pin: "pin2-6",
            title: "Rogers Centre",
            content: "<div>Home to the Toronto Blue Jays and host to numerous exciting concerts and events throughout the year, a trip to Toronto’s Roger’s Centre means that you can count on a great time.</div>",
            time: "30"
        }, {
            pin: "pin2-9",
            title: "Roy Thompson Hall",
            content: "<div>Roy Thompson Hall is a spectacular 2,630 seat venue that is home to The Toronto Symphony Orchestra and Toronto Mendelssohn Choir. It is also one of the primary venues used by The Toronto International Film Festival.</div>",
            time: "23"
        }, {
            pin: "pin2-7",
            title: "Yonge-Dundas Square",
            content: "<div>With literally hundreds of shops and restaurants to choose from, you can discover something new every day in this exceptional neighbourhood!</div>",
            time: "5"
        }, {
            pin: "pin2-8",
            title: "Ryerson University at Maple Leaf Gardens",
            content: "<div>You can still enjoy the spirit of excellence and athleticism at the historic Maple Leaf Gardens thanks to Ryerson University’s state-of-the-art sports and recreation complex that is now located here. Featuring a fitness facility, studios, high-performance gymnasium courts and an NHL-sized hockey rink, there’s still plenty to cheer for at this cherished Toronto institution.</div>",
            time: "12"
        }
    ],
    [
        {
            pin: "pin3-1",
            title: "Toronto Islands",
            content: "<div>Toronto’s own peaceful island paradise is just a short ferry ride away when you live at Max Condos. Swim and relax at one of 3 beautiful Blue Flag beaches,  or spend your day riding bikes and exploring, eating at one of the excellent local restaurants or just relaxing and taking in a cool lake breeze.</div>",
            time: "40"
        }, {
            pin: "pinmax",
            content: "<div>asdf</div>"
        }, {
            title: "Allan Gardens",
            pin: "pin3-2",
            content: "<div>Founded in 1858, Allan Gardens’ landmark Victorian conservatory, houses rare plants across a sprawling 5 greenhouse complex that includes a tropical area  and a 'cool house' that features a waterfall, pond and citrus trees.</div>",
            time: "10"

        }, {
            pin: "pin3-3",
            title: "Metro",
            content: "<div>Enjoy a wide selection of farm fresh produce, gourmet meats, household staples and prepared goods from Metro Supermarket.</div>",
            time: "14"
        }, {
            pin: "pin3-4",
            title: "Massey Hall",
            content: "<div>Opened in 1894, Massey hall has been one of Toronto’s favourite live performance venues for over 120 years. In 1981, this venue was designated a national historic site of Canada. Today you can still catch big name musical acts performing to sold out crowds on a regular basis.</div>",
            time: "6"
        }, {
            pin: "pin3-5",
            title: "Hard Rock Café",
            content: "<div>The Hard Rock Café Toronto has been a local landmark since it first opened its door over 40 years ago. Enjoy delicious American and local cuisine in a vibrant rock and roll atmosphere — featuring an extensive collection of musical memorabilia, live performances and even a gift shop!</div>",
            time: "7"
        }, {
            pin: "pin3-6",
            title: "Yonge St. Shops & Restaurants",
            content: "<div>With literally hundreds of shops and restaurants to choose from, you can discover something new every day in this exceptional neighbourhood!</div>",
            time: "5"
        }, {
            pin: "pin3-7",
            title: "Loblaws at Maple Leaf Gardens",
            content: "<div>asdf</div>",
            time: "14"
        }, {
            pin: "pin3-8",
            title: "College Park",
            content: "<div>College Park is a classic Toronto building that features shopping and dining and is connected to Toronto’s world-class PATH system, allowing for all-season walking throughout the downtown core.</div>",
            time: "14"
        }
    ]
];
