import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const form = document.querySelector('.feedback-form');

form.addEventListener('submit', onFormSubmit);

let formData = {};
form.addEventListener(
  'input',
  throttle(event => {
    formData[event.target.name] = event.target.value.trim();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }, 500)
);

function onFormSubmit(event) {
  event.preventDefault();
  const { email, message } = event.target;
  const emailValue = email.value.trim();
  const messageValue = message.value.trim();
  console.log({
    email: emailValue,
    message: messageValue,
  });

  event.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

const load = key => {
  try {
    const savedInputs = localStorage.getItem(key);
    return savedInputs ? JSON.parse(savedInputs) : undefined;
  } catch (error) {
    console.error(error.message);
  }
};

const storageData = load(STORAGE_KEY);
if (storageData) {
  formData = storageData;
  const keys = Object.keys(formData);
  for (const key of keys) {
    form.elements[key].value = formData[key];
  }
}
