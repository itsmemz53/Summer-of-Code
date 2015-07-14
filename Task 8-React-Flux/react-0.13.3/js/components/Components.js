 var Grid = require('./Grid');
 var AppDispatcher = require('../Dispatcher')
 var Constants = require('../Constants')
 var Store = require('../store')







 var MyComponent2 = React.createClass({
        render: function(){
            return (
              <div>
                <Grid image={this.state.image} />
                <input type="text" onChange={this.onChange} id="url"/>
                <button id="butt1" onClick={this.updateImage}>Show Images </button>
              </div>
            );
        },
        getInitialState: function(){
          return {
            image:[]
          }
        },
          getImage:function()
        { 
            

          },
          componentDidMount:function()
          {
              Store.addChangeListener(this._onChange);
            //this.getImage();
          },

        componentWillUnmount:function(){
          Store.removeChangeListener(this._onChange);
        },

         updateImage:function()
        {
          AppDispatcher.dispatch({actionType: Constants.URL_NEW,data: this.state.url})
          //var that=this;
         // var data={url:this.state.url};
          //var pdata=this.state.image;
         // pdata.push(data);
        //  $.ajax({
      //url: 'http://datastore.asadmemon.com/mz53',
      //type: 'POST', 
     // contentType: 'application/json', 
     // data: JSON.stringify(pdata),
   // success:function(res){

     //   that.getImage();
   // }
    //});
     
  },
        onChange:function(event)
        {
          this.setState({url:event.target.value})
        },
        _onChange:function(){
          this.setState({image:Store.getAll()});
        }
        
        
    });

  module.exports = MyComponent2;