'use strict';

/*
 * Subject directive
 * Creates the possibility to use a <subject> element,
 * which will be replaced with the contents of template/subject.html
 * Additionally a subject directive uses it's own scope which is needed,
 * so that each subject can hold it's own property list
 */

angular.module('GSB.directives.subject', [])

    .directive('subjectDir', function ($document) {
    return {
        restrict: "E",
        replace: true,
        templateUrl: 'template/subject.html',
      link: function(scope, element) {
        var startX = 0, startY = 0, x = 150 , y = 400 ;

        scope.$watch('offsetX', function(newValue) {
          moveX(newValue);
        });

        scope.$watch('offsetY', function(newValue) {
          moveY(newValue);
        });

        function moveX(offset){
          x = x + offset;
          element.css({left: x + 'px'});
        }

        function moveY(offset){
          y = y + offset;
          element.css({top: y + 'px'});
        }


        element.find("mover").on('mousedown', function(event) {
          // Prevent default dragging of selected content
          event.preventDefault();
          startX = event.pageX - x;
          startY = event.pageY - y;
          $document.on('mousemove', mousemove);
          $document.on('mouseup', mouseup);
        });

        function mousemove(event) {
          y = event.pageY - startY;
          x = event.pageX - startX;
          element.css({
            top: y + 'px',
            left:  x + 'px'
          });
        }

        function mouseup() {
          $document.unbind('mousemove', mousemove);
          $document.unbind('mouseup', mouseup);
        }
      }

    }
});