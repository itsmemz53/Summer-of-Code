 var Square=React.createClass({
        render:function()
        {
        	console.log("Idher Aooonaa ",src);

          var src=this.props.imgs;
                  	console.log("Idher Agaya",src);
          return (
           <a href={src}><img style={{width:200 +"px",height:200 +"px",display:"inline" }} src={src} /> </a>
          )
        }
      });
 module.exports = Square;