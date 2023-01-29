var bgmode= 0;

$.getJSON("projects.json", function(grid) {

    var gridheight = $(window).height() - $(".topnav").height() - $(".tags").height()
    

    $(".columns").height(gridheight)
    // $(".rightcolumns").height(gridheight)
    $(".leftcolumns").height(gridheight)




    let column1 = '';
    let column2 = '';
    let column3 = '';
    let leftcolumn = '';
    var tagsarray = [];
    var turnedontagsarray=[];
    let imagetags = '';
    var link='';
    var haslink = 0;
   
    $.each(grid, function(i, project) {
        if(project.link.length == 0){
            link=''
            haslink = 0;
        }

        else{
            link = project.link[0]
            haslink = 1;
        }
         

        imagetags=""
        for (i=0; i<project.tags.length; i++){
            imagetags += `<div class="tag">${project.tags[i]}</div>`
            if(tagsarray.includes(project.tags[i])){

            }
            else{
                tagsarray.push(project.tags[i]) 
            }
        }

        leftcolumn += 
        `<div class="columnitem" id="label${project.item}">
        <div class="columnitemtext">${project.name}</div>
        <div class="columnitemtext">${project.year}</div>
        </div><div class="caption" id="caption${project.item}"=>${project.caption}<div class="link">${link}</div><div class="captiontags">${imagetags}</div></div>`

        // if(haslink==0){
        // leftcolumn += 
        // `<div class="columnitem" id="label${project.item}">
        // <div class="columnitemtext">${project.name}</div>
        // <div class="columnitemtext">${project.year}</div>
        // </div><div class="caption" id="caption${project.item}"=>${project.caption}<div class="captiontags">${imagetags}</div></div>`
        // }

        // else if(haslink==1){
        // leftcolumn += 
        // `<div class="columnitem" id="label${project.item}">
        // <div class="columnitemtext">${project.name}</div>
        // <div class="columnitemtext">${project.year}</div>
        // </div><div>${link}</div><div class="caption" id="caption${project.item}"=>${project.caption}<div class="captiontags">${imagetags}</div></div>`

        // }
        
        if (`${project.column}`== "1"){
            column1 +=  
            `<div class="columnimage" id="image${project.item}">
            <div class="hidearrow arrows" ><div class="leftclick"></div><div class="rightclick"></div></div>
            <img src= ${project.image}>
            </div>`
        }

        else if(`${project.column}`== "2"){
            column2 +=  
           `<div class="columnimage" id="image${project.item}">
            <div class="hidearrow arrows"><div class="leftclick"></div><div class="rightclick"></div></div>
            <img src= ${project.image}>
            </div>`
        }

        else if(`${project.column}`== "3"){
            column3 +=  
            `<div class="columnimage" id="image${project.item}">
            <div class="hidearrow arrows"><div class="leftclick"></div><div class="rightclick"></div></div>
            <img src= ${project.image}>
            </div>`
        }
        
    });

    

    for(i=0; i<tagsarray.length; i++){
        $(".tags").append(`<div class="tag" id="${tagsarray[i]}">${tagsarray[i]}</div>`);
    }

   
    $("#column1").append(column1);
    $("#column2").append(column2);
    $("#column3").append(column3);
    $(".leftcolumn").append(leftcolumn);

  


    // event listeners
    $(".columnimage").hover(function(){
        if(slideshow ==0){
            var hovered = $(this).attr('id')
            $(`#label${hovered.slice(-2)}`).toggleClass("columnitem")
            $(`#label${hovered.slice(-2)}`).toggleClass("columnitemhighlight")
        }

        else{

        }
          
    })

    // variable to determine if site is in slideshow mode, 0 is no, 1 is yes
    var slideshow = 0

    var slideno = 0
    var parentid;
    var clicked;
    var clickedno;

    $(".columnimage").on("click", function(){
        slideshow = 1
        clicked = $(this).attr('id')
        clickedno = clicked.slice(-2)
        parentid = $(this).parent().attr('id')

        $(".arrows").removeClass("hidearrow");
        
        $( ".columnimage" ).each(function(i) {
            if ($(this).attr('id')== clicked){
                $(':nth-child(2)', this).attr('src',`${grid[clickedno-1].images[slideno]}`)
            }
            else{
                $(this).hide()
            }
          });

        $( ".rightcolumns" ).each(function(i) {
            if($(this).attr('id')== parentid){
            
            }
            else{
                $(this).css("flex","0%")
                $(this).hide()
            } 
        });

        // gap property is causing 10px
        $("#"+`${parentid}`).css("flex","75%")

        $(".leftcolumn").children().each(function(i) {
            $(this).removeClass("columnitemhighlight")
            $(this).removeClass("columnitem")
            $(this).addClass("descriptionitem")
            if ($(this).attr('id').slice(-2) == clickedno){
                $("#caption" + `${clickedno}`).show()
            }

            else{
                $(this).hide()
            }

          });
        if (slideno == grid[clickedno-1].images.length - 1){
            slideno = 0
        }
        else{
            slideno = slideno + 1
        }

    })

    $(".columnitem").click(function(){
        console.log("clicked")
        slideshow = 1
        clicked = $(this).attr('id')
        clickedno = clicked.slice(-2)
        

        $(".arrows").removeClass("hidearrow");
        
        $( ".columnimage" ).each(function(i) {
            if ($(this).attr('id').slice(-2) == clickedno){
                parentid = $(this).parent().attr('id')
                $(':nth-child(2)', this).attr('src',`${grid[clickedno-1].images[slideno]}`)
            }
            else{
                $(this).hide()
            }
          });

        $( ".rightcolumns" ).each(function(i) {
            if($(this).attr('id')== parentid){
            
            }
            else{
                $(this).css("flex","0%")
                $(this).hide()
            } 
        });

        // gap property is causing 10px
        $("#"+`${parentid}`).css("flex","75%")

        $(".leftcolumn").children().each(function(i) {
            $(this).removeClass("columnitemhighlight")
            $(this).removeClass("columnitem")
            $(this).addClass("descriptionitem")
            if ($(this).attr('id').slice(-2) == clickedno){
                $("#caption" + `${clickedno}`).show()
            }

            else{
                $(this).hide()
            }

          });
        if (slideno == grid[clickedno-1].images.length - 1){
            slideno = 0
        }
        else{
            slideno = slideno + 1
        }

    })

    var resetmode = 0;

    $("#projectreset").click(function(){
        function gridreset(){
            $(".arrows").addClass("hidearrow");
            slideshow = 0
            slideno = 0
            var selection = "#"+`${clicked}`
            $("#"+`${clicked}`).children().attr('src',`${grid[clickedno-1].image}`)
            $( ".rightcolumns" ).each(function(i) {
                if($(this).attr('id')== parentid){
                    $(this).css("flex","25%")
                }
    
                else{
                    $(this).css("flex","25%")
                    $(this).show()
                }
            
            });    
    
            $( ".columnimage" ).each(function(i) {
                if ($(this).attr('id')== clicked){
                   
                }
                else{
                    $(this).show()
                }
              });
    
              $(".leftcolumn").children().each(function(i) {
                $(this).show()
                $(this).addClass("columnitem")
                $(this).removeClass("descriptionitem")
              });
    
              $(".caption").each(function(i) {
                $(this).hide()
              });
        }
        if (resetmode == 0){
            console.log("reset 0")
            // $(".bgspace").show();
            // $(".bggrid").show();
            // $(window).scrollTop(scrolltoheight)
            $("html, body").animate({ scrollTop: scrolltoheight},1050, "swing");
            setTimeout(() => {
            $(".bgspace").hide();
            $(".bggrid").hide();
            resetmode = 1
        }, "1100")

        }

        else if(resetmode == 1){
            gridreset();

            }
           

        // if reset mode = 2 (AKA tags have been activated)

        else if(resetmode = 2){
            turnedontagsarray =[]
            projectarray = [];
            detachedprojectarray = [];
            columncounter = 1;
            tagson= 0; 
            
        }

        // if reset mode = 3 (full grid, nothing happens)

    
    })

    


    $(".buttonhalf").click(function(){
        bgmode = 2
      
        $("body").css("cursor", "pointer")
    })

    $(".bgbuttonblack").click(function(){
        bgmode = 0
        $("body").css(
            "cursor","pointer")
        
    
    })
    turnedontagsarray =[]
    var index;
    var projectarray = [];
    var detachedprojectarray = [];
    var columncounter = 1;
    var projectno; 
    var tagson= 0; 
    
    $(".tag").click(function(){    
        resetmode = 2
        var turnedonprojects = []
        tagson = tagson + 1 

        if (turnedontagsarray.includes($(this).attr('id'))){
            index = turnedontagsarray.indexOf($(this).attr('id'));
            turnedontagsarray.splice(index,1)

        }
        else{
            turnedontagsarray.push($(this).attr('id'))
        }
        $(this).toggleClass("tag")
        $(this).toggleClass("tagselect")

        $.each(grid, function(i, project) {
            projectno = $(this)[0].item;
            if(tagson < 2){
                projectarray[i]= $("#image" + `${projectno}`).detach();
            }
            else{
                detachedprojectarray = $(".rightcolumns").children().detach()
            }
            for(x=0; x< $(this)[0].tags.length ; x++){ 
                if((turnedontagsarray.includes($(this)[0].tags[x])) == true){
                    if(turnedonprojects.includes(projectarray[i]) == true){
                    }
                    else{
                        turnedonprojects.push(projectarray[i])
                    }
                    continue;          
                }
            }
        })

        var columncounter = 1;

        for(x=0;x< turnedonprojects.length; x++){
            var columnid = "#column" + `${columncounter}`
            $(columnid).append(turnedonprojects[x])
             if(columncounter == 3){
                    columncounter = 1
                }

                else{
                    columncounter = columncounter + 1
                }

        }


    

    })

    $(".buttonhalf").click(function(){
        bgmode = 2
    
        $("body").css("cursor", "pointer")
    })

    // scroll
    var fired = 0; 
    var aboutclicked = 0; 
    var scrolltoheight = $(window).height()
    window.onbeforeunload = function () {
        window.scrollTo(0, 0);
        fired=0;
      }
    $(document).scroll(function(){

        if($(window).scrollTop()> (.7 * scrolltoheight)){
            if((fired == 0) && (aboutclicked ==0)){
                console.log("fired")
                $("html, body").animate({ scrollTop: scrolltoheight},700, "swing");
                setTimeout(() => {
                    $(".bggrid").hide();
                    $(".bgspace").hide();
                    resetmode = 1;
                }, "700")
            }
            else{
            }
            
            fired = 1;
        }   
        
    })

    $("#about").click(function(){
        aboutclicked = 1;
        resetmode = 0;
        $(".bgspace").show();
        $(".bggrid").show();
        $(window).scrollTop(scrolltoheight)
        $("html, body").animate({ scrollTop: 0},1000, "swing");
        setTimeout(() => {
            aboutclicked = 0
            fired=0;
        }, "1100")
        
    })

    

  
});

$( document ).ready(function() {
    
});


var count = 0; 

var mousediv;
let x = 1;
let y = 1;
let easing = 0.2;
function setup() {
var myCanvas = createCanvas(windowWidth, windowHeight);
myCanvas.parent("p5bg");

background(0);
// mousediv = createDiv();
// mousediv.style('position', 'fixed');



  
  
}

function draw() {
// console.log(mouseX, mouseY)
  let targetX = mouseX;
  let dx = targetX - x;
  x += dx * easing;

  let targetY = mouseY;
  let dy = targetY - y;
  y += dy * easing;

    


  if (bgmode == 2){
    fill(255)
    strokeWeight(0)
    
      
      ellipse(x, y, 20, 20)
      
      // triangle(mouseX-80, mouseY+80, mouseX, mouseY-80, mouseX+80, mouseY+80);
     
    
    
    
    count = count + 1 
  }

  else if(bgmode ==0){
    
    // clear();
    // fill(255)
    // stroke(255)
    // strokeWeight(0)
    // ellipse(x, y, 20, 20)


   
    
  }
  
  
}