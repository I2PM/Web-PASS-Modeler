import * as d3 from 'd3';
import {roundTo20} from '../../utils/math';

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
        tspan = text.text(null).append("tspan").attr("x", initX-20).attr("y", y).attr("dy", dy + "em")
      //console.log(messages)

    messages.forEach(function(message, index) {
      String.prototype.insert = function(index, string) {
        if (index > 0) {
          return this.substring(0, index) + string + this.substr(index);
        }
        return string + this;
      };
      message = message.insert(0, "- ")
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
          tspan = text.append("tspan").attr("x", initX-20).attr("y",  y).attr("dy", ++lineNumber * lineHeight + dy+ "em").text(word);

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
    if (node.type == 'message') {
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
      g.append('svg:image')
      .attr('x', (node.x-(node.width/2))+5)
      .attr('y', node.y)
      .attr('width', 15 + 'px')
      .attr('height', 20 + 'px')
      .attr('xlink:href', "./assets/Message.png");
      //.attr('xlink:href', 'https://cdn.pixabay.com/photo/2016/01/10/22/51/letters-1132701_1280.png');
      
      /*var txt = g.append('text').
          attr('x', (node.x-(node.width/2))+25).
          attr('y', node.y+16).
          attr('class', 'unselectable').
          text(() => node.name).call(wrap, someWidth);*/
     
          //console.log(node.width)
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



