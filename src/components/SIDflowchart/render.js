import * as d3 from 'd3';
import {roundTo20} from '../../utils/math';


function wrap(text, initWidth, initX, initY) {
  let width = initWidth-25
  text.each(function() {
    var text = d3.select(this),
        words = text.text().split(/(?!$)/u).reverse(),
        word,
        line = [],
        lineNumber = 0,
        lineHeight = 1.1, // ems
        y = text.attr("y"),
        dy = parseFloat(text.attr("dy")),
        tspan = text.text(null).append("tspan").attr("x", initX).attr("y", y).attr("dy", dy + "em");
    while (word = words.pop()) {
      line.push(word);
      tspan.text(line.join(""));
      if (tspan.node().getComputedTextLength() > width || word === "-") {
        line.pop();
        tspan.text(line.join(""));
        line = [word];
        tspan = text.append("tspan").attr("x", initX).attr("y",  y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
      }
    }
  });
}



function render(g, node, isSelected) {
  node.width = node.width || 120;
  node.height = node.height || 140;
  let borderColor = isSelected ? '#666666' : '#bbbbbb';

  // body
  let body = null;
  if(node.type === "intern"){
  // type: intern
    body = g.append('rect').attr('class', 'body');
    body.style('width', node.width + 'px').
        style('fill', 'white').
        style('stroke-width', '1px');
      body.attr('x', node.x).
          attr('y', node.y).
          attr('rx', 5)
          .style('fill', '#d4e2bd');
      body.style('height', node.height + 'px');
    body.attr('stroke', borderColor);
  
    g.append('svg:image')
    .attr('x', node.x + 5)
    .attr('y', node.y+2)
    .attr('width', 15 + 'px')
    .attr('height', 20 + 'px')
    .attr('xlink:href', "./assets/Subjekt.png");
  } else {
  // type: extern
  var colors = [ 'white', '#dedddc' ];
  var grad = g.append('defs')
  .append('linearGradient')
  .attr('id', 'grad')
  .attr('x1', '0%')
  .attr('x2', '0%')
  .attr('y1', '0%')
  .attr('y2', '100%');

grad.selectAll('stop')
  .data(colors)
  .enter()
  .append('stop')
  .style('stop-color', function(d){ return d; })
  .attr('offset', function(d,i){
    return 100 * (i / (colors.length - 1)) + '%';
  })
   body = g.append('rect').attr('class', 'body');
    body.style('width', node.width + 'px').
    attr('stroke', 'black')
    .attr("stroke-linecap", 'round')
    .
    style('stroke-width', '1px');
      body.attr('x', node.x ).
          attr('y', node.y).
          attr('rx', 5)
          .style('fill', 'url(#grad)');
      body.style('height', node.height + 'px');

      if(!isSelected){
        body.attr('stroke-dasharray', '2 5')
      } 
    g.append('svg:image')
    .attr('x', node.x + 8)
    .attr('y', node.y+3)
    .attr('width', 20 + 'px')
    .attr('height', 25 + 'px')
    .attr('xlink:href', "./assets/Interface_Subject_Symbol.png");
  }

  //multi subject 
if(node.multiSubject){
  body.clone().attr('x', node.x + 5).
  attr('y', node.y - 2.5).clone().attr('x', node.x).
  attr('y', node.y)
  body.attr('x', node.x + 10).
  attr('y', node.y - 5)
}
  // body text
  let text = node.text
  let bodyTextY; 
    bodyTextY = node.y + roundTo20(node.height)/5;
  
  g.append('text').
      attr('x', node.x + node.width / 2).
      attr('y', bodyTextY).
      attr('class', 'unselectable').
      attr('text-anchor', 'middle').
      text(text)
      .attr('dy', '.71em')
      .call(wrap, node.width, (node.x + node.width / 2), node.y);

}


export default render;