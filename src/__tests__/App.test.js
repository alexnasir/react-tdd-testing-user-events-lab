
import '@testing-library/jest-dom';
import App from "../App";

// Test: Form Initial State
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

test('form submission', async () => {
  render(<App />);
  
  fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'John Doe' } });
  fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'john@example.com' } });
  fireEvent.click(screen.getByRole('button', { name: /submit/i }));

  await waitFor(() => {
    expect(screen.getByText(/thank you for subscribing/i)).toBeInTheDocument();
  });
});

test("the form includes three checkboxes to select areas of interest", () => {
  render(<App />);
  
  const techCheckbox = screen.getByLabelText(/tech/i);
  const designCheckbox = screen.getByLabelText(/design/i);
  const businessCheckbox = screen.getByLabelText(/business/i);
  
  expect(techCheckbox).toBeInTheDocument();
  expect(designCheckbox).toBeInTheDocument();
  expect(businessCheckbox).toBeInTheDocument();
});

test("the checkboxes are initially unchecked", () => {
  render(<App />);
  
  const techCheckbox = screen.getByLabelText(/tech/i);
  const designCheckbox = screen.getByLabelText(/design/i);
  const businessCheckbox = screen.getByLabelText(/business/i);
  
  expect(techCheckbox).not.toBeChecked();
  expect(designCheckbox).not.toBeChecked();
  expect(businessCheckbox).not.toBeChecked();
});

// Test: Form Interaction
test("the page shows information the user types into the name and email address form fields", () => {
  render(<App />);
  
  const nameInput = screen.getByLabelText(/name/i);
  const emailInput = screen.getByLabelText(/email/i);
  
  fireEvent.change(nameInput, { target: { value: "John Doe" } });
  fireEvent.change(emailInput, { target: { value: "john@example.com" } });
  
  expect(nameInput.value).toBe("John Doe");
  expect(emailInput.value).toBe("john@example.com");
});

test("checked status of checkboxes changes when user clicks them", () => {
  render(<App />);
  
  const techCheckbox = screen.getByLabelText(/tech/i);
  fireEvent.click(techCheckbox);
  
  expect(techCheckbox).toBeChecked();
  
  fireEvent.click(techCheckbox);
  expect(techCheckbox).not.toBeChecked();
});

// Test: Form Submission
test("a message is displayed when the user clicks the Submit button", () => {
  render(<App />);
  
  const nameInput = screen.getByLabelText(/name/i);
  const emailInput = screen.getByLabelText(/email/i);
  const submitButton = screen.getByRole("button", { name: /submit/i });
  
  fireEvent.change(nameInput, { target: { value: "John Doe" } });
  fireEvent.change(emailInput, { target: { value: "john@example.com" } });
  
  fireEvent.click(submitButton);
  
  const successMessage = screen.getByText(/thank you for subscribing, john doe/i);
  expect(successMessage).toBeInTheDocument();
});
