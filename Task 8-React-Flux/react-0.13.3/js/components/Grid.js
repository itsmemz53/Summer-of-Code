 var Square = require('./Square');
 var Grid = React.createClass({
        render: function(){

          console.log("Idher AAjaoo")
          var Pic=this.props.image;

          var arr=[];
          console.log("Ye Picture hai",Pic)
          for (var i in Pic){
            var temp= <Square imgs={Pic[i].url} />
            arr.push(temp);
          }

          console.log("Ye array hai",arr)
          return (<div> {arr} </div>)
        }
        
      

        });
 
 
module.exports = Grid;