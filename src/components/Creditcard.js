import React, { Component } from 'react'
import '../css/credit-card.css'
import '../css/form-style.css'
import Cards from '../react-credit-cards'
class Creditcard extends Component {
  constructor (props) {
    super(props)

    this.state = {
      cvc: '',
      expiry: '',
      expiryyear: '',
      focus: '',
      name: '',
      number: ''
    }
  }

  /*function to remove special characters like + - . e E 
    which are otherwise valid in case of type=number used in case  of cvc*/
  removeSpecial = e => {
    var invalidChars = ['-', '+', 'e', 'E', ' ', '.']
    if (invalidChars.includes(e.key)) {
      e.preventDefault()
    }
  }

  //function to add space after every 4 character in card number
  addSpace = e => {
    const { value, id } = e.target
    var ele = document.getElementById(id)
    if (value.length === 4 || value.length === 9 || value.length === 14)
      ele.value = ele.value.replace(/\W/gi, '').replace(/(.{4})/g, '$1 ')
  }

  //function to validate the length of input in case of cvv and replace invalid characters in case of card number
  validateInput = e => {
    const { name, value, maxLength, id } = e.target
    var temp, ele

    if (id === 'cvv') {
      if (value.length > maxLength) {
        temp = value.slice(0, maxLength)
        const num = temp
        ele = document.getElementById(id)
        ele.value = temp
        this.setState({ [name]: num })
      } else {
        this.setState({ [name]: value })
      }
    }

    //works when function is invoked by cardNumber input
    else {
      ele = document.getElementById(id)
      //if user enters any invalid characters it gets replaced
      ele.value = ele.value.replace(
        /[A-Za-z}"`~_=.\->\]|<?+*/,;\[:{\\!@#\/'$%^&*()]/g,
        ''
      )
      this.setState({ [name]: ele.value })
    }
  }

  //function to handle focus on input
  handleInputFocus = e => {
    this.setState({ focus: e.target.name })
  }

  //function to handle  input and update the state of variable
  handleInputChange = e => {
    const { name, value, id } = e.target

    if (id === 'cardHolder') {
      var ele = document.getElementById(id)
      //if user enters any invalid characters it gets replaced
      ele.value = ele.value.replace(
        /[}"`~_=.\->\]|<?+*/,\d;\[:{\\!@#\/'$%^&*()]/g,
        ''
      )
      this.setState({ [name]: ele.value })
    } else this.setState({ [name]: value })
  }

  render () {
    return (
      <div>
        <div className='credit-card '>
          <Cards
            locale={{ valid: 'Expires' }}
            placeholders={{ name: 'Card Holder' }}
            cvc={this.state.cvc}
            expiry={this.state.expiry}
            expiryyear={this.state.expiryyear}
            focused={this.state.focus}
            name={this.state.name}
            number={this.state.number}
          />
        </div>
        <div className='card'>
          <form className='payment-form'>
            <div className='form-group'>
              <label htmlFor='cardNumber' className='card-label'>
                Card Number
              </label>
              <input
                type='text'
                onChange={this.validateInput}
                value={this.state.number}
                onKeyDown={this.removeSpecial}
                onPaste={e => e.preventDefault()}
                onKeyPress={this.addSpace}
                onFocus={this.handleInputFocus}
                name='number'
                maxLength='19'
                id='cardNumber'
                required
                className='form-control form-control-lg'
              />
            </div>
            <div className='form-group'>
              <label htmlFor='cardHolder' className='card-label'>
                Card holder
              </label>
              <input
                type='text'
                name='name'
                spellCheck='false'
                value={this.state.name}
                maxLength='20'
                autoComplete='off'
                onPaste={e => e.preventDefault()}
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
                id='cardHolder'
                required
                className='form-control form-control-lg'
              />
            </div>
            <div className='date-cvv-box'>
              <div className='expiry-class'>
                <div className='form-group card-month '>
                  <label htmlFor='cardMonth' className='card-label'>
                    Expiration Date
                  </label>

                  <select
                    id='cardMonth'
                    data-ref='cardDate'
                    value={this.state.expiry}
                    name='expiry'
                    onChange={this.handleInputChange}
                    onFocus={this.handleInputFocus}
                    className='form-control form-control-lg'
                  >
                    <option value='' defaultChecked='true'>
                      Month
                    </option>
                    <option value='01'>01</option>
                    <option value='02'>02</option>
                    <option value='03'>03</option>
                    <option value='04'>04</option>
                    <option value='05'>05</option>
                    <option value='06'>06</option>
                    <option value='07'>07</option>
                    <option value='08'>08</option>
                    <option value='09'>09</option>
                    <option value='10'>10</option>
                    <option value='11'>11</option>
                    <option value='12'>12</option>
                  </select>
                </div>
                <div className='form-group card-year'>
                  <select
                    id='cardYear'
                    data-ref='cardDate'
                    value={this.state.expiryyear}
                    name='expiryyear'
                    onChange={this.handleInputChange}
                    onFocus={this.handleInputFocus}
                    className='form-control form-control-lg'
                  >
                    <option value='' defaultChecked='true'>
                      Year
                    </option>
                    <option value='2022'>2022</option>
                    <option value='2023'>2023</option>
                    <option value='2024'>2024</option>
                    <option value='2025'>2025</option>
                    <option value='2026'>2026</option>
                    <option value='2027'>2027</option>
                    <option value='2028'>2028</option>
                    <option value='2029'>2029</option>
                    <option value='2030'>2030</option>
                    <option value='2031'>2031</option>
                    <option value='2031'>2032</option>
                    <option value='2031'>2033</option>
                  </select>
                </div>
              </div>

              <div className='cvv-class form-group'>
                <label htmlFor='cvv' className='card-label cvv-label'>
                  CVV
                </label>
                <input
                  type='number'
                  onChange={this.validateInput}
                  onKeyDown={this.removeSpecial}
                  onPaste={e => e.preventDefault()}
                  onFocus={this.handleInputFocus}
                  name='cvc'
                  id='cvv'
                  required
                  value={this.state.cvc}
                  className='form-control form-control-lg '
                  maxLength='4'
                />
              </div>
            </div>

            <button className='btn btn-primary btn-lg btn-block'>Submit</button>
          </form>
        </div>
      </div>
    )
  }
}

export default Creditcard
