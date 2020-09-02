import React from 'react'
import {Field, reduxForm} from 'redux-form'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {createPost} from '../actions'

class PostsNews extends React.Component{

    renderField(field){

       const className=`form-group ${field.meta.touched && field.meta.error ? 'has-danger' : ''}`

       return(
       <div className={className}>
            <label>{field.label}</label>
            <input
                className='form-control'
                type='text'
                {...field.input}
            />
            <div className='text-help'>
               {field.meta.touched ? field.meta.error : ''}
            </div>            
        </div>)
    }
    
    onSubmit(values){
        
        this.props.createPost(values, ()=>{
            this.props.history.push('/')
        })
    }

    render(){

        const {handleSubmit} = this.props
        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field label='Title for post' name='title' component={this.renderField}/>
                <Field label='Categories' name='categories' component={this.renderField}/>
                <Field label='Post content' name='content' component={this.renderField}/>
                <button type='submit' className='btn btn-primary'>Submit</button>
                <Link to='' className='btn btn-danger'>Cancel</Link>
            </form>
        )
    }
}

const validate=(values)=>{
    //console.log(values)  ==> {title: <value>, categories : <value> ,content :<value>}
    const errors ={}
    //validate de inputs from 'values'
    if(!values.title){
         errors.title = 'Enter a title'
    }
    if(!values.categories){
        errors.categories = 'Enter some categories'
    }
    if(!values.content){
        errors.content = 'Enter some content please'
    }
    //if errors is empty , the form is fine to submit
    //if error has *any* properties, redux form assumes form is invalid
    return errors 
}

export default reduxForm({validate,form : 'postsNewForm'})(connect(null,{createPost})(PostsNews))