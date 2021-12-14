import './App.css';
import React,{ Component} from 'react';
import Axios from 'axios';

export default class App extends Component{
  constructor(props){
    super(props);

    this.state = {data: null, greetingData: null, name: '', flip: 'disable', count:'3'};

    this.url = "https://labs.bible.org/api/?passage=";
    this.hi = "https://cps353-2021-cloud-wang-5clehebsjq-uc.a.run.app";

    this.setUserName = this.setUserName.bind(this);
  
    console.log("constructor");
  }
  // Call the Bible API and Google cloud to get verses and greeting info
  componentDidMount(){
    this.getVerses('Hebrews',12,1);
    this.getGreating(this.state.name);
  }
  // Call the Bible API to get jason format data 
  // @Parameter book is the name of book
  // Base on the parameter of verse is empty or not to get a full chapter verses or single verse
  getVerses(book,chapter,verse) {
    // Full chapter case
    if(verse.length===0 || verse ==='0') {
      Axios.get(this.url+book+"%20"+chapter+"&type=json").then((verses) => {
        console.log(verses);

        this.setState({ data: verses.data})
      });
      // Single verse case
    } else {
      Axios.get(this.url+book+"%20"+chapter+':'+verse+"&type=json").then((verses) => {
        console.log(verses);

        this.setState({ data: verses.data})
      });
    }
  }
 
  getMultipleVerses(book1,chapter1,verse1,book2,chapter2,verse2) {
    // Full chapter case
    
      Axios.get(this.url+book1+"%20"+chapter1+':'+verse1 + ';' + book2+"%20"+chapter2+':'+verse2 + "&type=json").then((verses) => {
        console.log(verses);

        this.setState({ data: verses.data})
      });
   
  }

  // Call the Google cloud API to get the greeting data
  // @Parameter name is the name of user
  getGreating(name){
    Axios.get(this.hi+'/'+ name).then((hi) => {
      console.log( hi.data);
      this.setState({ greetingData: hi.data})
    });
  }

  // Show the greating result on html
  showGreeting(){
    if (this.state.greetingData ==='') return<div>Processing....</div>;

    return(
      <div className="content" id="greeting">{this.state.greetingData}</div>
    );
  }

  // Change the className for each verses to underline it or not
  changeClassName(key) {
    const chosen =document.getElementById(key);
    if(chosen.className === '') {
      chosen.className = 'chosen';
    } else {
      chosen.className = '';
    }
  }


  // Show the bible verses 
  // Base on the parameter verse you previously entered will show multiple or single verses
  showContent(){
    // Multiple verses case
    if(this.state.data.length > 1) {
      return (
        <div className="verse">
          <span>
                {this.state.data[0].bookname + ' '+ this.state.data[0].chapter + ':'+
                 this.state.data[0].verse + '-' + this.state.data.length}
          </span>
          <br></br>
          <span> 
            {this.state.data.map((verses,index)=>{
                return( 
                  <span key={index} id={index} className='' 
                  onClick={()=>this.changeClassName(index)}> 
                      <sup>{index + 1 + ' '}</sup>
                      {verses.text}
                  </span>);
              })
            }
          </span>
      </div>  
      );
      // Single verses case
    } else {
      return this.state.data.map((verse, index) => {
        return (
          <div key={index} className="verse">
            <span>
              {verse.bookname + ' '+verse.chapter + ':'+ verse.verse  }
            </span>
            <br></br>
            <span> {verse.text}</span>
          </div> 
        );
      });
    }
  }

  //@Parameter number is the amount of changing page
  showButton(buttonName,number){

    if(true) {
      return  (
      <button id={buttonName} className="flipButton" 
              onClick={()=> this.getVerses(this.state.data[0].bookname,this.state.data[0].chapter-number,'0')}> 
      {buttonName}
      </button>);
      // I wonder if we are on the first page we should not allow to go back but it's more complex than I expected 
      // I will finish it later so I keep it
    } else {
      return
       <button id="front" class="textBox" > 
      index
      </button>;
    }
  }
  
  // The part to change the state of username and call Greeting function to refresh the page
  setUserName(e) {
    console.log("changed name to: " + e.target.value);
    this.setState({name: e.target.value});
    this.getGreating(e.target.value);
}

  changeFlipState(){
    if(this.state.flip == 'disable'){
    this.setState({flip: 'active'});
    } else {
      this.setState({flip: 'disable'});
    }
  }

  addTextField(){
    this.setState({acount: this.state.acount + 1});
    return(
      <div>
      <input type="text" id="userName" className="textBox" placeholder="enter your name" onChange={ this.setUserName } value={ this.state.name } />
      <input type="text" id="bookName" className="textBox" placeholder="BookName"/>
      <span> </span>
      <input type="text" id="chapter" className="textBox" placeholder="chapter"/>
      <span>:</span>
      <input type="text" id="verse" className="textBox" placeholder="verse"/>

      <button id="search" className="button" onClick={()=> this.getVerses(document.getElementById("bookName").value,document.getElementById("chapter").value,document.getElementById("verse").value)}> 
      Search
      </button>
      </div>
    );
  }

  // The layout of page
  render(){
    if (!this.state.data) return<div>Sorry can't find the verse.</div>;

    return (
      <div className="main">
         <div className="flip-box" id={this.state.flip}>
          <div className="flip-box-inner">
            <div className="flip-box-front"> 
              <input type="text" id="userName" className="textBox" placeholder="enter your name" onChange={ this.setUserName } value={ this.state.name } />
              <input type="text" id="bookName" className="textBox" placeholder="BookName"/>
              <span> </span>
              <input type="text" id="chapter" className="textBox" placeholder="chapter"/>
              <span>:</span>
              <input type="text" id="verse" className="textBox" placeholder="verse"/>
      
              <button id="search" className="button" onClick={()=> this.getVerses(document.getElementById("bookName").value,document.getElementById("chapter").value,document.getElementById("verse").value)}> 
              Search
              </button>
              <button id="fullChapter" className="button" onClick={()=> this.getVerses(this.state.data[0].bookname,this.state.data[0].chapter,'0')}> 
              Full Chapter
              </button>
            
              <button className="button" onClick={()=> this.changeFlipState()}>Flip</button>
            </div>
            <div className="flip-box-back">   
              <input type="text" id="bookName1" className="textBox" placeholder="BookName"/>
              <span> </span>
              <input type="text" id="chapter1" className="textBox" placeholder="chapter"/>
              <span>:</span>
              <input type="text" id="verse1" className="textBox" placeholder="verse"/>

              <input type="text" id="bookName2" className="textBox" placeholder="BookName"/>
              <span> </span>
              <input type="text" id="chapter2" className="textBox" placeholder="chapter"/>
              <span>:</span>
              <input type="text" id="verse2" className="textBox" placeholder="verse"/>
      
              <button id="search" className="button" onClick={()=> this.getMultipleVerses(document.getElementById("bookName1").value,document.getElementById("chapter1").value,document.getElementById("verse1").value,
                                                                                      document.getElementById("bookName2").value,document.getElementById("chapter2").value,document.getElementById("verse2").value)}> 
              Search
              </button>

              <button className="button" onClick={()=> this.addTextField()}>Add</button>
              <button className="button"onClick={()=> this.changeFlipState()}>Flip</button>
            </div>
          </div>
        </div>
       
        {this.showGreeting()}
        {this.showButton("˂",1)}
        {this.showButton("˃",-1)}
        <div className="content">{this.showContent()}</div>
      </div>
    );
  }
}



