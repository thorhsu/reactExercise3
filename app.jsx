
function cx(obj){
  return Object.keys(obj).filter(function(key){
    return obj[key];
  }).join(' ');
}

var App = React.createClass({
  getInitialState: function() {
    return {
      data:[],
      currentId: 0
    };
  },
  componentDidMount: function(){
     var self = this;
     $.getJSON(this.props.url, function(data){
        self.setData(data);
     });
  },
  setData: function(data){
    this.setState({data:data});
  },
  setCurrentId:function(id){
    this.setState({currentId:id});
  },
  render: function() {
    var navbar = "";
    if(this.props.navbar){
      navbar = <Nav data={this.state.data} currentId={this.state.currentId} setCurrentId={this.setCurrentId}/>;
    }
    return (
      <div id="app" >
        <div id="container">
           <ImageList data={this.state.data} loop={this.props.loop} currentId={this.state.currentId} setCurrentId={this.setCurrentId}/>
           {navbar}
        </div>
      </div>
    );
  }
});
var Nav = React.createClass({
  setCurrentId: function(data){
    this.props.setCurrentId(data);
  },
  render: function() {
    var self = this;
    return (
      <div className="navImg">
        {
           this.props.data.map(
             function(imgData, index){
                return(
                    <ImgThumb data={imgData} key={"thumb_" + index} id={index} setCurrentId={self.setCurrentId} currentId={self.props.currentId}/>
                );
             })
        }
      </div>
    );
  }
});


var ImgThumb = React.createClass({
  getInitialState: function() {
    return {
      data: this.props.data
    };
  },
  setCurrentId: function(e){
    e.preventDefault();
    e.stopPropagation();
    this.props.setCurrentId(this.state.data.id);
  },
  render: function() {
    var cn = "imgThumb";

    if(this.props.currentId == this.state.data.id){
      cn += " active";
    }
    var self = this;
    return (
      <a href="#" ><img className={cn} src={self.props.data.src} onClick={this.setCurrentId}/></a>
    );
  }
});

var ImageList = React.createClass({
  getInitialState: function() {
    return {
      timer: null
    };
  },
  setCurrentIdPlus: function(){
     var currentId = (parseInt(this.props.currentId) + 1) % this.props.data.length;
     this.props.setCurrentId(currentId);
  },
  setCurrentIdMinus: function(){
     var currentId = (parseInt(this.props.currentId) - 1)
     if(currentId < 0)
        currentId = this.props.data.length - 1;
     this.props.setCurrentId(currentId);
  },
  componentDidMount: function(){
    var timer = setInterval(this.setCurrentIdPlus, 10000);
    this.state.timer = timer;
  },
  componentDidUpdate: function(){
    clearInterval(this.state.timer);
    var timer = setInterval(this.setCurrentIdPlus, 10000);
    this.state.timer = timer;
  },
  render: function() {
    var self = this;
    var rightArrow = (
            <div className="right-arrow">
               <i className="fa fa-angle-right fa-lg" aria-hidden="true" onClick={self.setCurrentIdPlus}></i>
            </div>);
    var leftArrow = (
            <div className="left-arrow">
              <i className="fa fa-angle-left fa-lg" aria-hidden="true" onClick={self.setCurrentIdMinus}></i>
            </div>
    );
    if(!this.props.loop){
      if(this.props.currentId == this.props.data.length - 1){
        rightArrow = "";
      }
      if(this.props.currentId == 0){
        leftArrow = "";
      }
    }
    return (
      <div className="center">
        {leftArrow}
        {
           this.props.data.map(
             function(imgData, index){
                return(
                    <Image dataSet={self.props.data} data={imgData} id={index} currentId={self.props.currentId}/>
                );
             })
        }
        {rightArrow}
    </div>
    );
  }
});
var Image = React.createClass({

  render: function() {

    var className = cx({
      'img': true,
      'active': this.props.data.id === this.props.currentId,
      'left':  this.props.data.id < this.props.currentId
          && (this.props.currentId != this.props.dataSet.length - 1 || this.props.data.id != 0),
      'right': this.props.data.id > this.props.currentId
          && (this.props.currentId != 0 || this.props.data.id != this.props.dataSet.length - 1)
    });
    if(this.props.currentId == this.props.dataSet.length - 1 && this.props.data.id == 0)
       className += " right";
    if(this.props.currentId == 0 && this.props.data.id == this.props.dataSet.length - 1)
          className += " left";
    return (
         <div className={className}>
            <img src={this.props.data.src} id={this.props.data.id} key={"img" + this.props.data.id} />
         </div>
    );
  }
});


ReactDOM.render(
  <App url="./api/imgData.json" title="My photo rotator" loop={true} navbar={true} />,
  document.getElementById('content')
);
