import React, {Component} from 'react'

const MemeURL = "https://api.imgflip.com/get_memes"

class MemeGenerator extends Component{
  constructor(){
    super()
    this.state = {
      topText : "",
      bottomText: "",
      allMemeImgs: [],
      randomImg: "http://i.imgflip.com/1bij.jpg"
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount(){
    fetch(MemeURL)
    .then(response => response.json())
    .then(response=>{
      const {memes} =response.data
      this.setState({allMemeImgs: memes})
    })
  }
  handleChange(event){
    const {name,value} = event.target
    this.setState({ [name]: value })
  }
  handleSubmit(event){
    event.preventDefault()
    const rand = Math.floor(Math.random() * this.state.allMemeImgs.length)
    const randMemeImg = this.state.allMemeImgs[rand].url
    this.setState({randomImg : randMemeImg })
    }
  render(){
    return(
      <div>
        <form className='meme-form' onSubmit={this.handleSubmit}>
          <input 
            name="topText"
            type="text" 
            placeholder='Top Text'
            value={this.state.topText}
            onChange={this.handleChange}/>
          <input 
            name='bottomText'
            type="text" 
            className="bottomText"
            placeholder="Bottom Text"
            value={this.state.bottomText}
            onChange={this.handleChange}/>
          <button >Gen</button>
        </form>
        <div className="meme">
          <img src={this.state.randomImg} alt=""/>
          <h2 className='top'> {this.state.topText} </h2>
          <h2 className='bottom'> {this.state.bottomText} </h2>
        </div>
      </div>
    )
  }
}

export default MemeGenerator