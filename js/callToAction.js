var drawBars = function(engagement,target,graph,xScale,yScale,margins)
{
    target.selectAll("rect")
        .data(engagement)
        .enter()
        .append("rect")
        .attr("id","percent")
        .attr("x",function(pref)
            {
                return xScale(pref.subject)
            })
        .attr("y",function(pref)
             {
                return yScale(pref.percent)
    })
        .attr("width",25)
        .attr("height",function(pref)
             {
                return graph.height-yScale(pref.percent)
        })
        .attr("fill","navy")
        .attr("transform","translate(52)")
    .on("mouseenter",function(engagement)
        {  
            var xPos = d3.event.pageX;
            var yPos =d3.event.pageY;
            
            d3.select("#tooltip")
            .classed("hidden",false)
            .style("top",yPos+"px")
            .style("left",xPos+"px")
            .text(engagement.percent + "%")
        })
     .on("mouseleave",function(engagement)
        {
            var xPos = d3.event.pageX;
            var yPos =d3.event.pageY;
        
            d3.select("#tooltip")
                .classed("hidden",true)
        })
            
        
}

var drawAxes = function(graph,margins,xScale,yScale)
{
    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale);
    
    var axes = d3.select("#graph")
        .append("g")
    
    axes.append("g")
        .attr("transform","translate("+margins.left+","+(margins.top+graph.height)+")")
        .call(xAxis)
    axes.append("g")
        .attr("transform","translate("+margins.left+","+(margins.top)+")")
        .call(yAxis)
}

var drawLabels = function(graph,margins)
{
    var labels = d3.select("#graph")
    .append("g")
    .classed("labels",true)
    
    //title
    labels.append("text")
        .text("Effects of Student Engagement on Student Growth")
        .classed("title",true)
        .attr("id","title")
        .attr("text-anchor","middle")
        .attr("x",margins.left+(graph.width/2))
        .attr("y",margins.top-10)
    
    //x-axis
    labels.append("text")
        .text("Subject")
        .classed("label",true)
        .attr("text-anchor","middle")
        .attr("x",margins.left+(graph.width/2))
        .attr("y",margins.top+graph.height+(35))
   
    //y-axis
    labels.append("g")
        .attr("transform","translate(15,"+(margins.top+graph.height/2)+")")
        .append("text")
        .text("Percent higher that are exceeding")
        .classed("label",true)
        .attr("text-anchor","middle")
        .attr("transform","rotate(270)")
}

var initGraph = function(engagement)
{   
    var screen = {width:575,height:300}
    var margins ={left:50,right:50,top:50,bottom:40}
    
    var graph = 
        {
            width:screen.width-margins.left-margins.right,
            height:screen.height-margins.top-margins.bottom
        };
    
    d3.select("#graph")
        .attr("width",screen.width)
        .attr("height",screen.height)
    
    var target = d3.select("#graph")
    .append("g")
    .attr("id","#graph")
    .attr("transform", "translate("+margins.left+","+margins.top+")");
    
    var xScale = d3.scaleBand()
        .domain(["all_subjects","math","reading"])
        .range([0,graph.width])
        .paddingInner(0.25)
    
    var yScale =d3.scaleLinear()
        .domain([0,200])
        .range([graph.height,0])
    
    
    drawAxes(graph,margins,xScale,yScale);
    drawBars(engagement,target,graph,xScale,yScale,margins);
    
    drawLabels(graph,margins);
}


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
    
    d3.select("#button")
        .on("click",function()
        {
            d3.select("#second")
            .classed("hidden2",false)
                
        })
    
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



var engagementPromise = d3.csv("../csv/engagement.csv")
var experiencePromise = d3.csv("../csv/experience.csv")

var succFCN = function(data)
{
    var engagement = data[0]
    var experience = data[1]
    console.log('data',data);
    initGraph(engagement);
    initGraph4(experience);
}

var failFCN = function(error)
{
    console.log("error",error)
}

var promises = [engagementPromise,experiencePromise];

Promise.all(promises).then(succFCN,failFCN);