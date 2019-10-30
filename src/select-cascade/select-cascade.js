import React from 'react'
import {Http} from './services.js'


function Option({item, itemText}) {
  return <option value={item} >{itemText}</option>
}

function Select({
  onChange, 
  items,
  currentValue,
  level,
  itemIndex
}) {
  return (
    <select 
      style={{marginRight:'15px'}}
      value = {currentValue || undefined}
      disabled={!items[level]}
      onChange={({target}) => onChange(target.value, level, itemIndex)}
    >
      <option>choose select</option>
      {
        items[level] && items[level].map((item, idx) => 
          <Option 
            key={idx} 
            itemText={item.name} 
            item={
              JSON.stringify(item)
            } 
          />
        )
      }
    </select>
  )
  
}

class SelectCascade extends React.Component {
  state = {
    items: [{}],
    currentValues: [{}]
  }

  setCurrentState = (list, currentLevel, itemIndex) => {
    list.forEach((item, i) => {
      if(i === itemIndex) {
        Object.keys(item).forEach(level => {
          if(level && level > currentLevel) {
            item[level] = null
          }
          return false
        })
      }
      
    })
  }

  handleChange = (value, currentLevel, itemIndex) => {
    

    let items = this.state.items.slice()
    let currentValues = this.state.currentValues.slice()
    this.fetch(itemIndex, JSON.parse(value).id)
    
    this.setCurrentState(currentValues, currentLevel, itemIndex)
    this.setCurrentState(items, currentLevel, itemIndex)

    this.setState(state => ({
      ...this.state,
      items,
      currentValues: state.currentValues.map((item, i) => {
        if(i === itemIndex) {
          item = Object.assign(item, {[currentLevel]: value})
        }
        return item
      })
    }), () => {
      console.log(this.state.items, this.state.currentValues)
    })
  }


  fetch = async (itemIndex, id = 0) => {
    let {api} = this.props
    let result = await Http.get(`/qualification/getCQByPid/${id}`)
    let {content} = result.data
    let level = this.getItemProps(content, 'level')
    if(content.length) {
      this.setState(state => ({
        ...this.state,
        items: state.items.map((item, i) => {
          if(i === itemIndex) {
            item = Object.assign(item, {[level]: content})
          }
          return item
        })
      }), () => {
      })
    }
  }

  add = () => {
    this.setState(state => ({
      ...this.state,
      items: state.items.concat({}),
      currentValues: state.currentValues.concat({})
    }), () => {
      this.fetch(this.state.items.length - 1)
    })
  }

  getItemProps = (data, props) => {
    return data.reduce((prev, next) => {
      return next[props]
    }, {})
  }

  removeItem = (idx) => (e) => {
    let {items, currentValues} = this.state
    items.forEach((item, i) => {
      if(i === idx) {
        items.splice(i, 1)
        currentValues.splice(i, 1)
      }
    })
    this.setState({
      items,
      currentValues
    })
  }

  componentDidMount() {
    this.fetch(this.state.items.length - 1)   
  }

  render() {
    let {items} = this.state
    let { selectNumber} = this.props
    return (
      <React.Fragment>
        <button onClick={this.add}>add</button>
        {
          items.map((list, idx) => {
            return (
              <div 
                style={{marginBottom:'15px'}}
                key={`${Math.random().toString(16).substr(2)}`}>
                {
                  Array(selectNumber).fill(null).map((item, i) => {
                    return <Select 
                      key={i} 
                      level={i} 
                      itemIndex={idx} 
                      currentValue={this.state.currentValues[idx] && this.state.currentValues[idx][i]}
                      items={items[idx]} 
                      onChange={this.handleChange} 
                    />
                  })
                }
                <button onClick={this.removeItem(idx)}>remove</button>
              </div>
            )
          })
        }
      </React.Fragment>
    )
  }
}

SelectCascade.defaultProps = {
  selectNumber: 5
}

export default SelectCascade
