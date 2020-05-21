import React from 'react'


const EmailList = React.forwardRef(({emailList, index, visible}, ref) => {
  return (
    <div className="content" style={{ display: visible ? '' : 'none'}} ref={ref}>
      {
        emailList.sort().map((email, i) => 
          <Item 
            key={email} 
            email={email} 
            style={{backgroundColor: i === index ? '#eee' : ''}} 
          />
        )
      }
    </div>
  )
})

const Item = ({email, style}) => <p style={{...style}}>{email}</p>

class App extends React.Component {
  state = {
    value: '',
    index: 0,
    visiblePanel: true
  }
  filterEmail: null 
  handleChange = ({target}) => {
    let value = target.value
    this.splitValue = ~value.indexOf('@') && (value.indexOf('@') === value.lastIndexOf('@')) ? value.split('@') : null
    this.setState({
      value: value,
      index: 0,
      visiblePanel: true
    })
  }
  componentDidMount() {
    console.log(this.inputRef)
    this.inputRef.focus()
    document.addEventListener('click', this.listener = function(e) {
      if(e.target === this.inputRef) return
      if(this.containerRef && !this.containerRef.contains(e.target) ) {
        this.setState({
          ...this.state,
          visiblePanel: false
        })
      }
    }.bind(this))
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.listener)
  }

  getFullEmailValue = (idx, callback) => {
    let {value} = this.state
    console.log(value)
    this.setState({
      value: this.filterEmail[idx] || value
    }, callback)
  }
  
  handleKeyDown = ({keyCode, nativeEvent}) => {
    nativeEvent.stopPropagation && nativeEvent.stopPropagation()
    switch (keyCode) {
    case 13:
      this.getFullEmailValue(this.state.index, () => {
        this.inputRef.blur()
      })
      this.splitValue = null
      return
    case 38:
      this.setState(state => ({
        ...this.state,
        index: this.splitValue ? (state.index > 0 ? state.index - 1 : this.filterEmail.length - 1) : 0
      }), () => {
        this.getFullEmailValue(this.state.index)
      })
      return
    case 40:
      this.setState(state => ({
        ...this.state,
        index: this.splitValue ? (state.index === this.filterEmail.length - 1 ? 0 : state.index + 1) : 0
      }), () => {
        this.getFullEmailValue(this.state.index)
      })
      return
    
    default:
      return
    }

  }
  getRefs = ref => el => {
    this[ref] = el
  }

  render() {
    let {email} = this.props
    let {value, index, visiblePanel} = this.state

    this.filterEmail = email.filter(email => {
      return this.splitValue && ~email.indexOf(this.splitValue[1])
    }).map(email => {
      return this.splitValue[0] + email
    })

    return (
      <div style={{width:'30%'}} >
        <input
          ref={this.getRefs('inputRef')}
          type="text" 
          onKeyDown={this.handleKeyDown}
          onChange={this.handleChange} 
          value={value}
          placeholder="enter your email" />
        
        <EmailList 
          visible={visiblePanel}
          ref={this.getRefs('containerRef')}
          emailList={this.filterEmail} 
          index={index} 
        /> 
      </div>
    )
  }
}

let emailList = [
  '@chrome.com', 
  '@firefox.com', 
  '@firefox.net', 
  '@opera.net', 
  '@safari.net',  
  '@safari.com', 
  '@opera.com', 
  '@chrome.net'
]

App.defaultProps = {
  email: emailList
}
export default App
