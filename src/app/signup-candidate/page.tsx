/**
 * SignupCandidatePage
 *
 * This is the page that a candidate will see when they are signing up
 */
import React from 'react' 

const SignupCandidatePage = () => {
  return (
    <div>
      <h1>Signup Candidate</h1>
      <form>
        <label>
          Email:
          <input type="email" name="email" />
        </label>
        <label>
          Password:
          <input type="password" name="password" />
        </label>
        <label>
          First Name:
          <input type="text" name="firstName" />
        </label>
        <label>
          Last Name:
          <input type="text" name="lastName" />
        </label>
        <button type="submit">Signup</button>
      </form>
    </div>
  )
}

export default SignupCandidatePage
