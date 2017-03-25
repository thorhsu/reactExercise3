function cx(obj){ 
  return Object.keys(obj).filter(function(key){
    return obj[key];
  }).join(' ');
}

var Item = React.createClass({
  render:function(){
    var cn = cx({
      item: true,
      left: this.props.id < this.props.currentId,
      right: this.props.id > this.props.currentId
    });
    //code here...


      return(
        <div className={cn}>
          <div className='title'>{this.props.title}</div>
          <div className='imt'></div>
          <div className='submit'></div>
        </div>
      );

  }
});


var Nav = React.createClass({
  activate:function(){
    this.props.setCurrentId(this.props.id);
  },
  render:function(){
    //code here...
    var cn = 'nav';
    if(this.props.currentId === this.props.id)
      cn = cn + " active";

    return (
      <div className={cn} onClick={this.activate}>
        {this.props.title}
      </div>
    );
  }
});


var App = React.createClass({
  getInitialState: function() {
    return {
      hps: [
        {id: 1, title:'涼感內衣'},
        {id: 2, title:'涼感內褲'},
        {id: 3, title:'涼感皮帶'},
        {id: 4, title:'茶葉蛋'},
      ],
      currentId: 1,
      cart:[]
    };
  },
  setCurrentId:function(id){
    this.setState({currentId:id});
  },
  render: function() {
    return (
      <div className='app'>

        <div className='navbar'>
          {this.state.items.map(function(item){
            return (
              <Nav
                key={'nav'+item.id}
                currentId={this.state.currentId}
                setCurrentId={this.setCurrentId}
                {...item}
                />
            );
          }.bind(this))}
        </div>

        <div className='items'>
          {this.state.items.map(function(item){
            return (
              <Item
                key = {"item"+item.id}
                currentId = {this.state.currentId}
                {...item}
                />
            );
          }.bind(this))}
        </div>
        <div className="cart-container">
           {this.state.cart.map(function(){
             return(
               <div className="cart-item">
                 {title}
               </div>
             )
           })}
        </div>

      </div>
    );
  }
});


ReactDOM.render(
  <App/>,
  document.getElementById('content')
);
