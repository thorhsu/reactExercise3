
function cx(obj){
  return Object.keys(obj).filter(function(key){
    return obj[key];
  }).join(' ');
}

var App = React.createClass({
  getInitialState: function() {
    return {
      data:[
          {id: 0, "src":"./images/children/0.jpg"},
          {id: 1, "src":"./images/children/1.jpg"},
          {id: 2, "src":"./images/children/2.jpg"},
          {id: 3, "src":"./images/children/3.jpg"},
          {id: 4, "src":"./images/children/4.jpg"},
          {id: 5, "src":"./images/children/5.jpg"},
          {id: 6, "src":"./images/children/6.jpg"},
          {id: 7, "src":"./images/children/7.jpg"}
      ]
      ,
      currentId: 0
    };
  },
  setCurrentId: function(data){
    this.setState({data: data});
  },
  componentDidMount: function(){

    // $.getJSON(this.props.url, function(data){
    //
    // }).always(this.setData);
  },
  setData(data){
//    console.log(data.responseText);
    this.setState({data:data.responseText});
  },
  setCurrentId:function(id){
    this.setState({currentId:id});
  },
  render: function() {
    return (
      <div id="app" >
        <div id="container">
           <ImageList data={this.state.data} currentId={this.state.currentId} setCurrentId={this.setCurrentId}/>
           <Nav data={this.state.data} currentId={this.state.currentId} setCurrentId={this.setCurrentId}/>
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
      console.log(this.props.currentId + "|||" + this.state.data.id);
      cn += " active";
    }
    var self = this;
    return (
      <a href="#" ><img className={cn} src={self.props.data.src} onClick={this.setCurrentId}/></a>
    );
  }
});

var ImageList = React.createClass({
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
  render: function() {
    var self = this;
    return (
      <div className="center">
        <div className="left-arrow">
           <i className="fa fa-angle-left fa-lg" aria-hidden="true" onClick={self.setCurrentIdMinus}></i>
        </div>
        {
           this.props.data.map(
             function(imgData, index){
                return(
                    <Image dataSet={self.props.data} data={imgData} id={index} currentId={self.props.currentId}/>
                );
             })
        }
        <div className="right-arrow">
           <i className="fa fa-angle-right fa-lg" aria-hidden="true" onClick={self.setCurrentIdPlus}></i>
        </div>
    </div>
    );
  }
});
var Image = React.createClass({

  render: function() {

    var className = cx({
      'img': true,
      'active': this.props.data.id === this.props.currentId,
      'left':  this.props.data.id < this.props.currentId && (this.props.currentId != this.props.dataSet.length - 1 || this.props.data.id != 0),
      'right': this.props.data.id > this.props.currentId && (this.props.currentId != 0 || this.props.data.id != this.props.dataSet.length - 1)
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
  <App url="./api/imgData.json" title="My photo rotator"/>,
  document.getElementById('content')
);
