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
  node.width = node.width || 140;
  node.height = node.height || 70;
  let borderColor = isSelected ? '#666666' : '#bbbbbb';

  // body
  // type: action
  if(node.type === "action"){
    let body = g.append('rect').attr('class', 'body');
    body.style('width', node.width + 'px').
        style('fill', 'white').
        style('stroke-width', '1px');
      body.attr('x', node.x).
          attr('y', node.y).
          attr('rx', 5)
          .style('fill', '#fdff7f');
      body.style('height', node.height + 'px');
    body.attr('stroke', borderColor);
  
    g.append('svg:image')
    .attr('x', node.x + 12)
    .attr('y', node.y+4)
    .attr('width', 21 + 'px')
    .attr('height', 21 + 'px')
    .attr('xlink:href', "../assets/Do_state_Symbol.png");
  }
//type:receive
  if(node.type === "receive"){
    let body = g.append('rect').attr('class', 'body');
    body.style('width', node.width + 'px').
        style('fill', 'white').
        style('stroke-width', '1px');
      body.attr('x', node.x).
          attr('y', node.y).
          attr('rx', 5)
          .style('fill', '#dc9691');
      body.style('height', node.height + 'px');
    body.attr('stroke', borderColor);
    
    g.append('svg:image')
    .attr('x', node.x + 12)
    .attr('y', node.y+4)
    .attr('width', 21 + 'px')
    .attr('height', 21 + 'px')
    .attr('xlink:href', "../assets/Receive.png");
  }

//type: send
  if(node.type === "send"){
    let body = g.append('rect').attr('class', 'body');
    body.style('width', node.width + 'px').
        style('fill', 'white').
        style('stroke-width', '1px');
      body.attr('x', node.x).
          attr('y', node.y).
          attr('rx', 5)
          .style('fill', '#cddeb1');
      body.style('height', node.height + 'px');
    body.attr('stroke', borderColor);
  
    g.append('svg:image')
    .attr('x', node.x + 12)
    .attr('y', node.y+4)
    .attr('width', 21 + 'px')
    .attr('height', 21 + 'px')
    .attr('xlink:href', "../assets/Send.png");
  }

  if(node.state){
    if(node.state.includes("Start") && node.state.includes("End")){
      g.append('svg:image')
      .attr('x', node.x + 100)
      .attr('y', node.y+2)
      .attr('width', 20 + 'px')
      .attr('height', 25 + 'px')
      .attr('xlink:href', "../assets/End_State_Symbol.png");
      g.append('svg:image')
        .attr('x', node.x + 70)
        .attr('y', node.y+2)
        .attr('width', 20 + 'px')
        .attr('height', 25 + 'px')
        .attr('xlink:href', "../assets/Start_State_Symbol.png");
      
    } 
    else if(node.state.includes("End")){
      g.append('svg:image')
      .attr('x', node.x + 100)
      .attr('y', node.y+2)
      .attr('width', 20 + 'px')
      .attr('height', 25 + 'px')
      .attr('xlink:href', "../assets/End_State_Symbol.png");
    } else if(node.state.includes("Start")){
      if(node.state.includes("Start")){
        g.append('svg:image')
        .attr('x', node.x + 100)
        .attr('y', node.y+2)
        .attr('width', 20 + 'px')
        .attr('height', 25 + 'px')
        .attr('xlink:href', "../assets/Start_State_Symbol.png");
      }
    }
  }



  // body text
  let text = node.text
  let bodyTextY; 
    bodyTextY = node.y + roundTo20(node.height)/5;
  
  let txt = g.append('text').
      attr('x', node.x + node.width / 2).
      attr('y', bodyTextY +15).
      attr('class', 'unselectable').
      attr('text-anchor', 'middle').
      text(text)
      .attr('dy', '.71em')
      .call(wrap, node.width, (node.x + node.width / 2), node.y);

}

export default render;