

var schoolNames = function(gradRates)
{
    var getSchools = function(gradRate)
    {
        return gradRate.school
    }
    var schools = gradRates.map(getSchools)
    return schools
}

var diffGradRates = function(gradRates)
{
   var getGradRates = function(gradRate)
   {
       return Number(gradRate.saGradRate)- Number(gradRate.sbGradRate)
   }
   var saRates = gradRates.map(getGradRates)
   return saRates
}


var drawBars1 = function(gradRates,target,graph1,xScale,yScale)
{   
    target.selectAll("rect")
        .data(gradRates)
        .enter()
        .append("rect")
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
    
        });
}

var drawAxes1 = function(graph1,margins,xScale,yScale)
{
    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale);
    
    var axes = d3.select("#graph1")
        .append("g")
    
    axes.append("g")
        .attr("transform","translate("+margins.left+","+(margins.top+graph1.height/2)+")")
        .call(xAxis)
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
        .attr("x",margins.left+(graph1.width/2))
        .attr("y",margins.top-10)
    
    //x-axis
    labels.append("text")
        .text("School")
        .classed("label",true)
        .attr("text-anchor","middle")
        .attr("x",margins.left+(graph1.width/2))
        .attr("y",margins.top+graph1.height+margins.bottom)
   
    //y-axis
    labels.append("g")
        .attr("transform","translate(15,"+(margins.top+graph1.height/2)+")")
        .append("text")
        .text("Graduation Rate")
        .classed("label",true)
        .attr("text-anchor","middle")
        .attr("transform","rotate(270)")
}


var initGraph1 = function(gradRates)
{   console.log(diffGradRates(gradRates))
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
    
    var yScale =d3.scaleLinear()
        .domain([-100,100])
        .range([graph1.height,0])
    
    drawAxes1(graph1,margins,xScale,yScale);
    drawBars1(gradRates,target,graph1,xScale,yScale);
    drawLabels1(graph1,margins);
    //drawLegend1(graph1,margins);
    
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
    var sportGradRate = data[5]
    var studentLoans = data[6]
    var wellbeing = data[7]
    
    console.log("data",data)
    initGraph1(gradRates)
    
  
}

var failFCN = function(error)
{
    console.log("error",error);
}

var promises = [employmentPromise, experiencePromise, gradRatePromise, graduateTimePromise, leadershipPromise, sportGradRatePromise, studentLoansPromise, wellbeingPromise];

Promise.all(promises).then(succFCN,failFCN)