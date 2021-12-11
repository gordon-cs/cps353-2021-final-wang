import './App.css';
import React,{ Component} from 'react';
import Axios from 'axios';

export default class App extends Component{
  constructor(props){
    super(props);

    this.state = {data: null, greetingData: null, name: ''};

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
      Axios.get(this.url+book+"%20"+chapter+"&type=json").then((abc) => {
        console.log(abc);

        this.setState({ data: abc.data})
      });
      // Single verse case
    } else {
      Axios.get(this.url+book+"%20"+chapter+':'+verse+"&type=json").then((abc) => {
        console.log(abc);

        this.setState({ data: abc.data})
      });
    }
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
    return(
      <div class="content">{this.state.greetingData}</div>
    );
  }

  // Show the bible verses 
  // Base on the parameter verse you previously entered will show multiple or single verses
  showContent(){
    // Multiple verses case
    if(this.state.data.length > 1) {
      return (
        <div className="verse">
          <span>{this.state.data[0].bookname + ' '+
                + this.state.data[0].chapter + ':'+
                this.state.data[0].verse + '-' + this.state.data.length}</span>
          <br></br>
          <span> {this.state.data.map((verses,index)=>{return(<span key={index}> <b>{index + 1 + ' '}</b>{verses.text}</span>);})}</span>
      </div>  
      );
      // Single verses case
    } else {
      return this.state.data.map((verse, index) => {
        return (
        <div key={index} className="verse">
          <span>{verse.bookname + ' '+
                + verse.chapter + ':'+
                verse.verse  }</span>
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
      return  (<button id={buttonName} class="flipButton" onClick={()=> this.getVerses(this.state.data[0].bookname,
      this.state.data[0].chapter-number,
      '0')}> 
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

  // The layout of page
  render(){
    if (!this.state.data) return<div>Sorry can't find the verse.</div>;

    return (
      <div class="main">
        <div class="menu"> 
            <input type="text" id="userName" class="textBox" placeholder="enter your name" onChange={ this.setUserName } value={ this.state.name } />
            <input type="text" id="bookName" class="textBox" placeholder="BookName"/>
            <span> </span>
            <input type="text" id="chapter" class="textBox" placeholder="chapter"/>
            <span>:</span>
            <input type="text" id="verse" class="textBox" placeholder="verse"/>
    
            <button id="search" class="button" onClick={()=> this.getVerses(document.getElementById("bookName").value,document.getElementById("chapter").value,document.getElementById("verse").value)}> 
            Search
            </button>
            <button id="fullChapter" class="button" onClick={()=> this.getVerses(this.state.data[0].bookname,this.state.data[0].chapter,'0')}> 
            Full Chapter
            </button>
        </div >
        {this.showGreeting()}
        {this.showButton("⮜",1)}
        {this.showButton("⮞",-1)}
        <div class="content">{this.showContent()}</div>
      </div>
    );
  }
}

