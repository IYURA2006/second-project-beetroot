const userName = document.querySelector("#firstName");
const feedbackForm = document.querySelector("#form");
const userEmail = document.querySelector("#userEmail");
const userWebsite = document.querySelector("#website");
const userComment = document.querySelector("#comment");
const rememberMe = document.querySelector("#rememberMe");

userEmail.value = localStorage.getItem("email");
userName.value = localStorage.getItem("firstName");
userWebsite.value = localStorage.getItem("site");

const emailValidationBox = document.createElement("div");
userEmail.after(emailValidationBox);
const nameValidationBox = document.createElement("div");
userName.after(nameValidationBox);
const websiteValidationBox = document.createElement("div");
userWebsite.after(websiteValidationBox);
const commentValidationBox = document.createElement("div");
userComment.after(commentValidationBox);

const getEmailValidationMessage = (email) => {
  if (
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail.value) ===
    false
  ) {
    return "Please enter a valid email";
  }
  if (userEmail.value === "") {
    return "This field is required*";
  }
};
const getNameValidationMessage = (name) => {
  if (/^(([A-ZА-Яa-zа-я]?){1,}([0-9]?))\d*$/g.test(userName.value) === false) {
    return "Please enter a valid name";
  }
  if (userName.value === "") {
    return "This field is required*";
  }
};
const getWebsiteValidationMessage = (website) => {
  if (userWebsite.value !== "") {
    if (/[A-ZА-Яa-zа-я][0-9]\d*/g.test(userWebsite.value) === false) {
      return "Please enter a valid site";
    }
  }
};
const getCommentValidationMessage = (comment) => {
  if (userComment.value.length < 15) {
    return "Please enter bigger comment";
  }
  if (userComment.value.length > 500) {
    return "Please do not write such a big comment";
  }
};
const triggerField = (field, messageBox, message) => {
  if (message) {
    field.classList.add("form__inputs--data-incorrect");
    field.classList.remove("form__inputs--data-correct");
    messageBox.classList = "form__inputs--invalid";
    messageBox.innerText = message;
    return;
  }
  field.classList.remove("form__inputs--data-incorrect");
  field.classList.add("form__inputs--data-correct");
  messageBox.classList = "valid-feedback";
  messageBox.innerText = "";
};

const rememberUser = (email, name, website) => {
  localStorage.email = email;
  localStorage.firstName = name;
  localStorage.site = website;
};
const createComment = (email, name, website, message) => {

  let comment = {
    nameUser : name,
    userEmail:email,
    userWebsite: website,
    userMessage: message,
    time: Math.floor(Date.now() / 1000)
  }
  console.log(comment);
  email.value = '';
  name.value = ''
  website.value = ''
  message.value = ''
}
const showComment = (email, name, website, message) => {}


userEmail.addEventListener("blur", () => {
  const email = userEmail.value;
  const emailMessage = getEmailValidationMessage(email);
  triggerField(userEmail, emailValidationBox, emailMessage);
});
userName.addEventListener("blur", () => {
  const name = userName.value;
  const nameMessage = getNameValidationMessage(name);
  triggerField(userName, nameValidationBox, nameMessage);
});
userWebsite.addEventListener("blur", () => {
  const website = userWebsite.value;
  const websiteMessage = getWebsiteValidationMessage(website);
  triggerField(userWebsite, websiteValidationBox, websiteMessage);
});
userComment.addEventListener("blur", () => {
  const comment = userComment.value;
  const commentMessage = getCommentValidationMessage(comment);
  triggerField(userComment, commentValidationBox, commentMessage);
});
feedbackForm.addEventListener("submit", (e) => {
  const email = userEmail.value;
  const emailMessage = getEmailValidationMessage(email);

  const name = userName.value;
  const nameMessage = getNameValidationMessage(name);

  const site = userWebsite.value;
  const websiteMessage = getWebsiteValidationMessage(site);

  const comment = userComment.value;
  const commentMessage = getCommentValidationMessage(comment);

  triggerField(userEmail, emailValidationBox, emailMessage);

  triggerField(userName, nameValidationBox, nameMessage);

  triggerField(userWebsite, websiteValidationBox, websiteMessage);

  triggerField(userComment, commentValidationBox, commentMessage);

  if (emailMessage || nameMessage || websiteMessage || commentMessage) {
    e.preventDefault();
  } else {
    if (rememberMe.checked) {
      rememberUser(email, name, site)
    }
    e.preventDefault();
    createComment(email, name, site, comment)
  }
});
feedbackForm.addEventListener("reset", (e) => {
  websiteValidationBox.innerText = "";
  userWebsite.classList.remove(
    "form__inputs--data-incorrect",
    "form__inputs--data-correct"
  );

  nameValidationBox.innerText = "";
  userName.classList.remove(
    "form__inputs--data-incorrect",
    "form__inputs--data-correct"
  );

  emailValidationBox.innerText = "";
  userEmail.classList.remove(
    "form__inputs--data-incorrect",
    "form__inputs--data-correct"
  );

  commentValidationBox.innerText = "";
  userComment.classList.remove(
    "form__inputs--data-incorrect",
    "form__inputs--data-correct"
  );
});
