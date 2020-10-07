var schoolNames = function(gradRates)
{
    var getSchools = function(gradRate)
    {
        return gradRate.school
    }
    var schools = gradRates.map(getSchools)
    return schools
}

var conferences = function(gradRates)
{
    var getConf = function(gradRate)
    {
        return gradRate.conference
    }
    var conferences = gradRates.map(getConf)
    return conferences
}


//Graph 1 --- Difference in graduation rates of student athletes and the student body at division I schools
var drawBars1 = function(gradRates,target,graph1,xScale,yScale)
{   
    target.selectAll("rect")
        .data(gradRates)
        .enter()
        .append("rect")
        .attr("class","rect")
        .attr("x",function(gradRate)
        { 
            return xScale(gradRate.school)
        })
        .attr("y",function(gradRate)
        { 
            if (gradRate.saGradRate - gradRate.sbGradRate > 0)
            {
                return yScale(gradRate.saGradRate - gradRate.sbGradRate)
            }
            else
            {
                return yScale(0)
            } 

        })
        .attr("width",xScale.bandwidth)
        .attr("height",function(gradRate)
        { 
            if (gradRate.saGradRate - gradRate.sbGradRate > 0)
            {
                return graph1.height/2 - yScale(gradRate.saGradRate - gradRate.sbGradRate)
            }
            else 
            {
                return yScale(gradRate.saGradRate - gradRate.sbGradRate) - graph1.height/2
            }
    
        })
        .on("mouseenter",function(gradRate)
        {  
            var xPos = d3.event.pageX;
            var yPos =d3.event.pageY;
            
            d3.select("#tooltip")
            .classed("hidden",false)
            .style("top",yPos+"px")
            .style("left",xPos+"px")
            
            d3.select("#school")
                .text("School: " + gradRate.school);
        
            d3.select("#percent")
            .text(function(gradRate)
            { 
              return (gradRate.saGradRate - gradRate.sbGradRate) + "%"
            });
    })
     .on("mouseleave",function(gradRates)
        {
            var xPos = d3.event.pageX;
            var yPos =d3.event.pageY;
        
            d3.select("#tooltip")
                .classed("hidden",true)
        })
            
}

var drawAxes1 = function(graph1,margins,xScale,yScale)
{
    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale);
    
    var axes = d3.select("#graph1")
        .append("g")
    
    //axes.append("g")
      //  .attr("transform","translate("+margins.left+","+(margins.top+graph1.height/2)+")")
        //.call(xAxis)
    axes.append("g")
        .attr("transform","translate("+margins.left+","+(margins.top)+")")
        .call(yAxis)
}

var drawLabels1 = function(graph1,margins)
{
    var labels = d3.select("#graph1")
    .append("g")
    .classed("labels",true)
    
    //title
    labels.append("text")
        .text("Difference in Graduation Rate Between Student-Athletes and the Student Body")
        .classed("title",true)
        .attr("text-anchor","middle")
        .attr("id","title1")
        .attr("x",margins.left+(graph1.width/2))
        .attr("y",margins.top-10)
    
    //x-axis
    labels.append("text")
        .text("School")
        .classed("label",true)
        .attr("text-anchor","middle")
        .attr("id","label1")
        .attr("x",margins.left+(graph1.width/2))
        .attr("y",margins.top+graph1.height)
   
    //y-axis
    labels.append("g")
        .attr("transform","translate(15,"+(margins.top+graph1.height/2)+")")
        .append("text")
        .text("Student Athlete Graduation Rate - Student Body Graduation Rate")
        .classed("label",true)
        .attr("text-anchor","middle")
        .attr("id","label1")
        .attr("transform","rotate(270)")
}


var initGraph1 = function(gradRates)
{   
    function onlyUnique(value, index, self) 
    {
        return self.indexOf(value) === index;
    }

    var conferenceArray = conferences(gradRates).filter(onlyUnique).sort()
    
    var screen = {width:800,height:600}
    var margins ={left:50,right:50,top:50,bottom:50}
    
    var graph1 = 
        {
            width:screen.width-margins.left-margins.right,
            height:screen.height-margins.top-margins.bottom
        };
                    
    d3.select("#graph1")
        .attr("width",screen.width)
        .attr("height",screen.height)
        
   var target = d3.select("#graph1")
        .append("g")
        .attr("id","#graph")
        .attr("transform", "translate("+margins.left+","+margins.top+")");
    
    var xScale = d3.scaleBand()
        .domain(schoolNames(gradRates))
        .range([0,graph1.width])
        .paddingInner(0.3)
        
    
    var yScale =d3.scaleLinear()
        .domain([-100,100])
        .range([graph1.height,0])
    
    d3.select("#div")
        .selectAll("button")
        .data(conferenceArray)
        .enter()
        .append("button")
        .attr("id","button")
        .text(function(conf)
            {return conf})
        .on("click",function(conf)
        {
            var filteredConf = filtered(gradRates,conf)
            
            d3.select("#graph1")
                .selectAll("rect")
                .remove()
                
        
            var xScale = d3.scaleBand()
                .domain(schoolNames(filteredConf))
                .range([0,graph1.width])
                .paddingInner(0.3)
             drawBars1(filteredConf,target,graph1,xScale,yScale);
        })
            
                
    drawAxes1(graph1,margins,xScale,yScale);
    drawBars1(gradRates,target,graph1,xScale,yScale);
    drawLabels1(graph1,margins);
}

//Bar Graph 2 -- wellbeing of student athletes compared to non student athletes
var drawBars2sa = function(wellbeings,g0,graph2,xScale,yScale,margins)
{
    g0.selectAll("rect")
        .data(wellbeings)
        .enter()
        .append("rect")
        .attr("id","saBars")
        .attr("x",function(pref)
            {
                return xScale(pref.wellbeing)
            })
        .attr("y",function(pref)
             {
                return yScale(pref.sa)
    })
        .attr("width",25)
        .attr("height",function(pref)
             {
                return graph2.height-yScale(pref.sa)
        })
    .on("mouseenter",function(wellbeings)
        {  
            var xPos = d3.event.pageX;
            var yPos =d3.event.pageY;
            
            d3.select("#tooltip")
            .classed("hidden",false)
            .style("top",yPos+"px")
            .style("left",xPos+"px")
            .text(wellbeings.sa + "%")
        })
     .on("mouseleave",function(wellbeings)
        {
            var xPos = d3.event.pageX;
            var yPos =d3.event.pageY;
        
            d3.select("#tooltip")
                .classed("hidden",true)
        })
            
        
}

var drawBars2sb = function(wellbeings,target,graph2,xScale,yScale,margins)
{
    target.selectAll("rect")
        .data(wellbeings)
        .enter()
        .append("rect")
        .attr("id","sbBars")
        .attr("x",function(pref)
            {
                return xScale(pref.wellbeing)
            })
        .attr("y",function(pref)
             {
                return yScale(pref.sb)
    })
        .attr("width",25)
        .attr("height",function(pref)
             {
                return graph2.height-yScale(pref.sb)
        })
    .on("mouseenter",function(wellbeings)
        {  
            var xPos = d3.event.pageX;
            var yPos =d3.event.pageY;
            
            d3.select("#tooltip")
            .classed("hidden",false)
            .style("top",yPos+"px")
            .style("left",xPos+"px")
            .text(wellbeings.sb + "%")
        })
     .on("mouseleave",function(wellbeings)
        {
            var xPos = d3.event.pageX;
            var yPos =d3.event.pageY;
        
            d3.select("#tooltip")
                .classed("hidden",true)
        })
        
}

var drawAxes2 = function(graph2,margins,xScale,yScale)
{
    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale);
    
    var axes = d3.select("#graph2")
        .append("g")
    
    axes.append("g")
        .attr("transform","translate("+margins.left+","+(margins.top+graph2.height)+")")
        .call(xAxis)
    axes.append("g")
        .attr("transform","translate("+margins.left+","+(margins.top)+")")
        .call(yAxis)
}

var drawLabels2 = function(graph2,margins)
{
    var labels = d3.select("#graph2")
    .append("g")
    .classed("labels",true)
    
    //title
    labels.append("text")
        .text("Wellbeing of Student Athletes and Non Student Athletes")
        .classed("title",true)
        .attr("id","title2")
        .attr("text-anchor","middle")
        .attr("x",margins.left+(graph2.width/2))
        .attr("y",margins.top-10)
    
    //x-axis
    labels.append("text")
        .text("Type of Wellbeing")
        .classed("label",true)
        .attr("text-anchor","middle")
        .attr("x",margins.left+(graph2.width/2))
        .attr("y",margins.top+graph2.height+(35))
   
    //y-axis
    labels.append("g")
        .attr("transform","translate(15,"+(margins.top+graph2.height/2)+")")
        .append("text")
        .text("Percent Thriving")
        .classed("label",true)
        .attr("text-anchor","middle")
        .attr("transform","rotate(270)")
}

var drawLegend2 = function(graph2,margins)
{
    var legend = d3.select("#graph2")
        .append("g")
        .classed("legend",true)
        .attr("transform","translate("+(margins.left+(0.6*graph2.width))+","+(margins.top+(graph2.height/5))+")")
 
   var categories = [
       {
           class:"sa",
           name:"Student Athletes"
       },
       {
           class:"sb",
           name:"Non Student Athletes"
       }
    ]
   
   var entries = legend.selectAll("g")
        .data(categories)
        .enter()
        .append("g")
        .classed("legendEntry",true)
        .attr("class",function(category){
            return category.class
        })
        .attr("transform",function(category,index)
              {
                return "translate(0,"+(index*20)+")";
              })
        entries.append("rect")
              .attr("width",10)
              .attr("height",10)
        
        entries.append("text")
            .text(function(category)
                 {return category.name})
            .attr("x",15)
            .attr("y",10)
}

var initGraph2 = function(wellbeings)
{   
    var screen = {width:575,height:300}
    var margins ={left:50,right:50,top:50,bottom:40}
    
    var graph2 = 
        {
            width:screen.width-margins.left-margins.right,
            height:screen.height-margins.top-margins.bottom
        };
    
    d3.select("#graph2")
        .attr("width",screen.width)
        .attr("height",screen.height)
    
    var target = d3.select("#graph2")
    .append("g")
    .attr("id","#graph")
    .attr("transform", "translate("+margins.left+","+margins.top+")");
    
    var xScale = d3.scaleBand()
        .domain(["purpose","social","financial","community","physical"])
        .range([0,graph2.width])
        .paddingInner(0.25)
    
    var yScale =d3.scaleLinear()
        .domain([0,100])
        .range([graph2.height,0])
    
    drawAxes2(graph2,margins,xScale,yScale);
    
    var g0 = target.append("g")
        .attr("transform","translate(10,0)")
    drawBars2sa(wellbeings,g0,graph2,xScale,yScale);
    
    var g1 = target.append("g")
        .attr("transform","translate(40,0)")
    drawBars2sb(wellbeings,g1,graph2,xScale,yScale,margins);
    
    drawLabels2(graph2,margins);
    
    drawLegend2(graph2,margins);  
}

//Bar graph 3 --- Time taken to obtain a job for student athletes and non student athletes upon graduation
var drawBars3sa = function(employment,g0,graph3,xScale,yScale,margins)
{
    g0.selectAll("rect")
        .data(employment)
        .enter()
        .append("rect")
        .attr("id","saBars")
        .attr("x",function(pref)
            {
                return xScale(pref.time)
            })
        .attr("y",function(pref)
             {
                return yScale(pref.sa)
    })
        .attr("width",30)
        .attr("height",function(pref)
             {  console.log(graph3.height)
                return graph3.height-yScale(pref.sa)
        })
    .on("mouseenter",function(employment)
        {  
            var xPos = d3.event.pageX;
            var yPos =d3.event.pageY;
            
            d3.select("#tooltip")
            .classed("hidden",false)
            .style("top",yPos+"px")
            .style("left",xPos+"px")
            .text(employment.sa + "%")
        })
     .on("mouseleave",function(employment)
        {
            var xPos = d3.event.pageX;
            var yPos =d3.event.pageY;
        
            d3.select("#tooltip")
                .classed("hidden",true)
        })
        
}

var drawBars3sb = function(employment,target,graph3,xScale,yScale,margins)
{
    target.selectAll("rect")
        .data(employment)
        .enter()
        .append("rect")
        .attr("id","sbBars")
        .attr("x",function(pref)
            {
                return xScale(pref.time)
            })
        .attr("y",function(pref)
             {
                return yScale(pref.sb)
    })
        .attr("width",30)
        .attr("height",function(pref)
             {
                return graph3.height-yScale(pref.sb)
        })
    .on("mouseenter",function(employment)
        {  
            var xPos = d3.event.pageX;
            var yPos =d3.event.pageY;
            
            d3.select("#tooltip")
            .classed("hidden",false)
            .style("top",yPos+"px")
            .style("left",xPos+"px")
            .text(employment.sb + "%")
        })
     .on("mouseleave",function(employment)
        {
            var xPos = d3.event.pageX;
            var yPos =d3.event.pageY;
        
            d3.select("#tooltip")
                .classed("hidden",true)
        })
        
}

var drawAxes3 = function(graph3,margins,xScale,yScale)
{
    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale);
    
    var axes = d3.select("#graph3")
        .append("g")
    
    axes.append("g")
        .attr("transform","translate("+margins.left+","+(margins.top+graph3.height)+")")
        .call(xAxis)
    axes.append("g")
        .attr("transform","translate("+margins.left+","+(margins.top)+")")
        .call(yAxis)
}

var drawLabels3 = function(graph3,margins)
{
    var labels = d3.select("#graph3")
    .append("g")
    .classed("labels",true)
    
    //title
    labels.append("text")
        .text("Obtaining Employment Upon Graduation")
        .classed("title",true)
        .attr("id","title3")
        .attr("text-anchor","middle")
        .attr("x",margins.left+(graph3.width/2))
        .attr("y",margins.top-10)
    
    //x-axis
    labels.append("text")
        .text("Time taken")
        .classed("label",true)
        .attr("text-anchor","middle")
        .attr("x",margins.left+(graph3.width/2))
        .attr("y",margins.top+graph3.height+(35))
   
    //y-axis
    labels.append("g")
        .attr("transform","translate(15,"+(margins.top+graph3.height/2)+")")
        .append("text")
        .text("Percent of Students")
        .classed("label",true)
        .attr("text-anchor","middle")
        .attr("transform","rotate(270)")
}

var drawLegend3 = function(graph3,margins)
{
    var legend = d3.select("#graph3")
        .append("g")
        .classed("legend",true)
        .attr("transform","translate("+(margins.left+(0.75*graph3.width))+","+(margins.top+(graph3.height/5))+")")
 
   var categories = [
       {
           class:"sa",
           name:"Student Athletes"
       },
       {
           class:"sb",
           name:"Non Student Athletes"
       }
    ]
   
   var entries = legend.selectAll("g")
        .data(categories)
        .enter()
        .append("g")
        .classed("legendEntry",true)
        .attr("class",function(category){
            return category.class
        })
        .attr("transform",function(category,index)
              {
                return "translate(0,"+(index*20)+")";
              })
        entries.append("rect")
              .attr("width",10)
              .attr("height",10)
        
        entries.append("text")
            .text(function(category)
                 {return category.name})
            .attr("x",15)
            .attr("y",10)
}

var initGraph3 = function(employment)
{   
    var screen = {width:900,height:300}
    var margins ={left:50,right:50,top:50,bottom:40}
    
    var graph3 = 
        {
            width:screen.width-margins.left-margins.right,
            height:screen.height-margins.top-margins.bottom
        };
    
    d3.select("#graph3")
        .attr("width",screen.width)
        .attr("height",screen.height)
    
    var target = d3.select("#graph3")
    .append("g")
    .attr("id","#graph")
    .attr("transform", "translate("+margins.left+","+margins.top+")");
    
    var xScale = d3.scaleBand()
        .domain(["had_job_waiting","two_months_or_less","three_months_to_six_months","seven_months_to_one_year","more_than_one_year","not_seeking_employment"])
        .range([0,graph3.width])
        .paddingInner(0.25)
    
    var yScale =d3.scaleLinear()
        .domain([0,100])
        .range([graph3.height,0])
    
    drawAxes3(graph3,margins,xScale,yScale);
    
    var g0 = target.append("g")
        .attr("transform","translate(20,0)")
    drawBars3sa(employment,g0,graph3,xScale,yScale);
    
    var g1 = target.append("g")
        .attr("transform","translate(55,0)")
    drawBars3sb(employment,g1,graph3,xScale,yScale,margins);
    
    drawLabels3(graph3,margins);
    
    drawLegend3(graph3,margins);  
}

//Bar graph 4 --- Undergraduate experience in different categories for student athletes vs non student athletes
var drawBars4sa = function(experience,g0,graph4,xScale,yScale,margins)
{
    g0.selectAll("rect")
        .data(experience)
        .enter()
        .append("rect")
        .attr("id","saBars")
        .attr("x",function(pref)
            {
                return xScale(pref.category)
            })
        .attr("y",function(pref)
             {
                return yScale(pref.sa)
    })
        .attr("width",25)
        .attr("height",function(pref)
             {  console.log(graph4.height)
                return graph4.height-yScale(pref.sa)
        })
    .on("mouseenter",function(experience)
        {  
            var xPos = d3.event.pageX;
            var yPos =d3.event.pageY;
            
            d3.select("#tooltip")
            .classed("hidden",false)
            .style("top",yPos+"px")
            .style("left",xPos+"px")
            .text(experience.sa + "%")
        })
     .on("mouseleave",function(experience)
        {
            var xPos = d3.event.pageX;
            var yPos =d3.event.pageY;
        
            d3.select("#tooltip")
                .classed("hidden",true)
        })
        
}

var drawBars4sb = function(experience,target,graph4,xScale,yScale,margins)
{
    target.selectAll("rect")
        .data(experience)
        .enter()
        .append("rect")
        .attr("id","sbBars")
        .attr("x",function(pref)
            {
                return xScale(pref.category)
            })
        .attr("y",function(pref)
             {
                return yScale(pref.sb)
    })
        .attr("width",25)
        .attr("height",function(pref)
             {
                return graph4.height-yScale(pref.sb)
        })
    .on("mouseenter",function(experience)
        {  
            var xPos = d3.event.pageX;
            var yPos =d3.event.pageY;
            
            d3.select("#tooltip")
            .classed("hidden",false)
            .style("top",yPos+"px")
            .style("left",xPos+"px")
            .text(experience.sb + "%")
        })
    .on("mouseleave",function(experience)
        {
            var xPos = d3.event.pageX;
            var yPos =d3.event.pageY;
        
            d3.select("#tooltip")
                .classed("hidden",true)
        })
        
}

var drawAxes4 = function(graph4,margins,xScale,yScale)
{
    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale);
    
    var axes = d3.select("#graph4")
        .append("g")
    
    axes.append("g")
        .attr("transform","translate("+margins.left+","+(margins.top+graph4.height)+")")
        .call(xAxis)
    axes.append("g")
        .attr("transform","translate("+margins.left+","+(margins.top)+")")
        .call(yAxis)
}

var drawLabels4 = function(graph4,margins)
{
    var labels = d3.select("#graph4")
    .append("g")
    .classed("labels",true)
    
    //title
    labels.append("text")
        .text("Undergraduate Experience")
        .classed("title",true)
        .attr("id","title3")
        .attr("text-anchor","middle")
        .attr("x",margins.left+(graph4.width/2))
        .attr("y",margins.top-10)
    
    //x-axis
    labels.append("text")
        .text("Category")
        .classed("label",true)
        .attr("text-anchor","middle")
        .attr("x",margins.left+(graph4.width/2))
        .attr("y",margins.top+graph4.height+(35))
   
    //y-axis
    labels.append("g")
        .attr("transform","translate(15,"+(margins.top+graph4.height/2)+")")
        .append("text")
        .text("Percent of Students")
        .classed("label",true)
        .attr("text-anchor","middle")
        .attr("transform","rotate(270)")
}

var drawLegend4 = function(graph4,margins)
{
    var legend = d3.select("#graph4")
        .append("g")
        .classed("legend",true)
        .attr("transform","translate("+(margins.left+(0.75*graph4.width))+","+(margins.top+(graph4.height/5))+")")
 
   var categories = [
       {
           class:"sa",
           name:"Student Athletes"
       },
       {
           class:"sb",
           name:"Non Student Athletes"
       }
    ]
   
   var entries = legend.selectAll("g")
        .data(categories)
        .enter()
        .append("g")
        .classed("legendEntry",true)
        .attr("class",function(category){
            return category.class
        })
        .attr("transform",function(category,index)
              {
                return "translate(0,"+(index*20)+")";
              })
        entries.append("rect")
              .attr("width",10)
              .attr("height",10)
        
        entries.append("text")
            .text(function(category)
                 {return category.name})
            .attr("x",15)
            .attr("y",10)
}

var initGraph4 = function(experience)
{   
    var screen = {width:575,height:300}
    var margins ={left:50,right:50,top:50,bottom:40}
    
    var graph4 = 
        {
            width:screen.width-margins.left-margins.right,
            height:screen.height-margins.top-margins.bottom
        };
    
    d3.select("#graph4")
        .attr("width",screen.width)
        .attr("height",screen.height)
    
    var target = d3.select("#graph4")
    .append("g")
    .attr("id","#graph")
    .attr("transform", "translate("+margins.left+","+margins.top+")");
    
    var xScale = d3.scaleBand()
        .domain(["felt_professors_cared","had_encouraging_mentor","excited_to_learn","had_leadership_position"])
        .range([0,graph4.width])
        .paddingInner(0.25)
    
    var yScale =d3.scaleLinear()
        .domain([0,100])
        .range([graph4.height,0])
    
    drawAxes4(graph4,margins,xScale,yScale);
    
    var g0 = target.append("g")
        .attr("transform","translate(21,0)")
    drawBars4sa(experience,g0,graph4,xScale,yScale);
    
    var g1 = target.append("g")
        .attr("transform","translate(50,0)")
    drawBars4sb(experience,g1,graph4,xScale,yScale,margins);
    
    drawLabels4(graph4,margins);
    
    drawLegend4(graph4,margins);  
}

var employmentPromise = d3.csv("../csv/employment.csv")
var experiencePromise = d3.csv("../csv/experience.csv")
var gradRatePromise = d3.csv("../csv/gradRate.csv")
var graduateTimePromise = d3.csv("../csv/graduateTime.csv")
var leadershipPromise = d3.csv("../csv/leadership.csv")
var sportGradRatePromise = d3.csv("../csv/sportGradRate.csv")
var studentLoansPromise = d3.csv("../csv/studentLoans.csv")
var wellbeingPromise = d3.csv("../csv/wellbeing.csv")

var succFCN = function(data)
{
    var employment = data[0]
    var experience = data[1]
    var gradRates = data[2]
    var graduateTime = data[3]
    var leadership = data[4]
    var sportGradRates = data[5]
    var studentLoans = data[6]
    var wellbeings = data[7]
    
    console.log("data",data)
    initGraph1(gradRates)
    initGraph2(wellbeings)
    initGraph3(employment)
    initGraph4(experience)
    
    console.log("filtered",filtered(gradRates,"Big Ten Conference")) 
}

var filtered = function(gradRates,conference)
    {
        var getConf = function(gradRate)
        {
            if(gradRate.conference == conference)
                {
                    return true;
                }
            else
                {
                    return false;
                }
        }
        var conferences = gradRates.filter(getConf)
        return conferences
    }

var failFCN = function(error)
{
    console.log("error",error);
}

var promises = [employmentPromise, experiencePromise, gradRatePromise, graduateTimePromise, leadershipPromise, sportGradRatePromise, studentLoansPromise, wellbeingPromise];

Promise.all(promises).then(succFCN,failFCN)