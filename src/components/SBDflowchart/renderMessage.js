import * as d3 from 'd3';
import {roundTo20} from '../../utils/math';






function wrapAction(text, initWidth, initX, initY) {
  let width = initWidth
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


function wrap(text, initWidth, initX, initY, messages) {
  let width = initWidth-30
  text.each(function() {
    var text = d3.select(this),
        word,
        words,
        line = [],
        lineNumber = 0,
        lineHeight = 1.1, // ems
        y = text.attr("y"),
        dy = parseFloat(text.attr("dy")),
        tspan = text.text(null).append("tspan").attr("x", initX-40).attr("y", y).attr("dy", dy + "em")
      //console.log(messages)

    messages.forEach(function(message, index) {
      String.prototype.insert = function(index, string) {
        if (index > 0) {
          return this.substring(0, index) + string + this.substr(index);
        }
        return string + this;
      };
      words = message.split(/\s+/).reverse();
      let wordLength = words.length
      while (word = words.pop()) {
        line.push(word);
        tspan.text(line.join(" "));
        //console.log(words.length)
        if (tspan.node().getComputedTextLength() > width || (words.length === (wordLength-1) && index != 0)) {
          //alert("Test")
          line.pop();
          tspan.text(line.join(" "));
          line = [word];
          tspan = text.append("tspan").attr("x", initX-40).attr("y",  y).attr("dy", ++lineNumber * lineHeight + dy+ "em").text(word);

        }
      }
      })  

  });
}
function renderMessage(g, node, isSelected) {
  if(node.messages.length === 0){return;}
    node.width = node.width || 100;
    node.height = node.height || 60;
    let borderColor = isSelected ? '#666666' : '#bbbbbb';
    if (node.type === 'send' || node.type === "receive" || node.type === "action") {
      var boxWidth = 180;
      /*g.append('path').
        attr("id", "test").
        attr('stroke', "#a3a3a3").
        attr('stroke-width', 1).
        attr('fill', 'none').
        attr('d', `M ${node.x} ${node.y} L ${node.x-(node.width/2)} ${node.y-(node.height/2)}`)*/
      var rect = g.append('rect').
      attr('x', node.x-(node.width/2)).
      attr('y', node.y).
      attr('stroke', borderColor).
      attr('class', 'title').
      style('fill', '#f1f3f4').
      style('stroke-width', '1px').
      style('width', boxWidth + 'px')
      .attr('height', 20 + 'px');
    }

    if(node.type === "action"){
      let text = node.messages
      let bodyTextY; 
        bodyTextY = node.y + roundTo20(node.height)/5;
      
      let txt = g.append('text').
          attr('x', (node.x + 10) ).
          attr('y', bodyTextY ).
          attr('class', 'unselectable').
          attr('text-anchor', 'middle').
          text(text)
          .attr('dy', '.71em')
          .call(wrapAction, node.width + 60, node.x  +40, node.y);


      let height = txt.node().getBBox().height + 20; //<-- get our height plus a margin
      rect.attr('height', height + 'px'); //<-- change our rect
    } else{
      let txt = g.append('text').
      attr('x', (node.x-(node.width/2))).
      attr('y', node.y+10)
      .text(node.text).
      attr('class', 'unselectable')
      .attr('dy', '.71em')
      .style('fill', 'black')
      .call(wrap, boxWidth, node.x, node.y, node.messages);

      let height = txt.node().getBBox().height + 10; //<-- get our height plus a margin
      rect.attr('height', height + 'px'); //<-- change our rect
    }
     
    
}
export default renderMessage;



