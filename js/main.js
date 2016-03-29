//don't forget to npm install globally: babel and webpack
import React from 'react';
import ReactDOM from 'react-dom';
var $ = require('jquery');
let Main = React.createClass({
  getInitialState: function(){
    return {};
  },
  componentDidMount:function(){
     //it seems like we have to hit the session endpoint
     //or the session stuff doesn't work
     setInterval( () => {
         $.get("/cam", (result) => {
             console.log("cam:");
             console.log(result);
             this.setState({cam:result})
         });
     },500);
 },
  render: function(){

      if(!this.state||!this.state.cam){
          return (
            <div>
              Connecting...
            </div>
          )
      }else{
          var src = "picam/"+this.state.cam;
          return (
            <div>
                <img src={src}/>
            </div>
          );
      }


  }
});
ReactDOM.render(<Main />, document.getElementById('app'));
