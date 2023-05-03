import { useState } from "react"

export default function UserInfoForm() {
    
    const [state, setState] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        repeatedPassword: '',
        passwordDoesNotMatch: ''
    });

    let copyOfState = {...state};

    console.log('STATE', state);

    const set = (key, value) => {
        copyOfState[key] = value;
        console.log('COPY OF STATE', copyOfState);
        setState({ ...copyOfState });
    };

    function setSatetFromForm(event) {
        let element = event.target;
        set(element.name, element.value);
    }

    async function submit(event){
        // prevent submit from page reload        
        event.preventDefault();
        (state.password !== state.repeatedPassword) ? set('passwordDoesNotMatch', 'Passwords not matched') : set('passwordDoesNotMatch', '') ;

        let serverResponse = await(await fetch('/api/users', {
            method: 'POST',
            
        }))
    }

    return <form onSubmit={submit}>
        <input type="text" 
            minLength="3" 
            name='firstName' 
            value={state.firstName}
            placeholder="First Name"
            onChange={setSatetFromForm}>

        </input>

        <input type="text" 
            minLength="3" 
            name='lastName' 
            value={state.lastName}
            placeholder="Last Name"
            onChange={setSatetFromForm}>

        </input>

        <input type="email" 
            name='email' 
            value={state.email}
            placeholder="Email"
            onChange={setSatetFromForm}>

        </input>


        
        <input type="password" 
            name='password' 
            value={state.password}
            placeholder="Password"
            onChange={setSatetFromForm}>

        </input>


        
        <input type="password" 
            name='repeatedPassword' 
            value={state.repeatPassword}
            placeholder="Repeat Password"
            onChange={setSatetFromForm}>

        </input>


        <button type="submit">Submit</button>
        
        { state.passwordDoesNotMatch &&  <p className="warning">{state.passwordDoesNotMatch}</p> }
        
        <div className="info">
            <p>
                <b>Your name: </b>
                {state.firstName} {state.lastName}<b> and your email is </b>{state.email}
            </p>
        </div>

    </form>
}