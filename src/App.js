import React,{ useState } from 'react';

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [interests, setInterests] = useState({
    tech: false,
    design: false,
    business: false,
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    if (type === 'text') {
      name === 'name' ? setName(value) : setEmail(value);
    } else if (type === 'checkbox') {
      setInterests((prev) => ({
        ...prev,
        [name]: checked,
      }));
    }
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };


  const interestsList = Object.keys(interests)
    .filter((key) => interests[key])
    .join(', ');

  return (
    <main>
      <h1>Hi, I'm (your name)</h1>
      <img alt="My profile pic" src="https://via.placeholder.com/350" />
      <h2>About Me</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>

      <div>
        <a href="https://github.com">GitHub</a>
        <a href="https://linkedin.com">LinkedIn</a>
      </div>

      <h2>Newsletter Signup</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </label>
        <fieldset>
          <legend>Select your areas of interest:</legend>
          <label>
            <input
              type="checkbox"
              name="tech"
              checked={interests.tech}
              onChange={handleChange}
            />
            Tech
          </label>
          <label>
            <input
              type="checkbox"
              name="design"
              checked={interests.design}
              onChange={handleChange}
            />
            Design
          </label>
          <label>
            <input
              type="checkbox"
              name="business"
              checked={interests.business}
              onChange={handleChange}
            />
            Business
          </label>
        </fieldset>
        <button type="submit">Submit</button>
      </form>

      {submitted && (
        <p>
          Thank you for subscribing, {name}! We will send updates to {email}.
          Your interests: {interestsList || 'None selected'}.
        </p>
      )}
    </main>
  );
}

export default App;
