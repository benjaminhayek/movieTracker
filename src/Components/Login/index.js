import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUser, toggleFavorite } from '../../actions';
import './Login.css'

class Login extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      email: '',
      password: '',
      signUp: false,
      avatar: '',
      error: ''
    }
  }

  createUser = () => {
    this.setState({signUp: !this.state.signUp})
  }

  handleKeyPress = (event) => {
    const { name, value } = event.target;
    this.setState({[name]: value})
  }

  x = async (event) => {
    const { signUp, name, email, password } = this.state;
    event.preventDefault();
    return signUp
      ? this.props.fetchUser(name, email, password)
      : this.props.fetchUser(null, email, password) 
  }

  handleSubmit = async (event) => {
    await this.x(event)
  }

  render(){
    const { name, email, password, signUp } = this.state;
    return (
      <div className='login-container'>
        <main className='login'>
          <form className='login-form' onSubmit={this.handleSubmit}>
            <input name='email' type='email' placeholder='Email' value={email} onChange={this.handleKeyPress} />
            <input name='password' type='password' placeholder='Password' value={password} onChange={this.handleKeyPress} />
            {
              signUp && 
              <article className='avatars'>
                <input type='text' name='name' placeholder='Name' value={name} onChange={this.handleKeyPress} />
              </article>
            } 
            <button>
              {signUp ? 'Sign Up' : 'Login'}
            </button>
          </form>
          {
            !signUp && 
            <p className='sign-up' onClick={this.createUser} >Sign Up</p>
            
          }
        </main>
      </div>
    )
  }
} 

const mapStateToProps = (state) => ({
  user: state.user
})

const mapDispatchToProps = (dispatch) => ({
  fetchUser:(name, email, password) => dispatch(fetchUser(name, email, password)),
  toggleFavorite: (favorites) => dispatch(toggleFavorite(favorites))
})

export default connect (mapStateToProps, mapDispatchToProps)(Login);