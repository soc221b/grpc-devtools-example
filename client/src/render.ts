import { ChatService } from "./chat-service";

export const createApp = (props: { chatService: ChatService }) => {
  document.body.appendChild(renderMain({ chatService: props.chatService }));
};

const renderMain = (props: { chatService: ChatService }) => {
  const main = document.createElement("main");
  main.classList.add("container");
  main.appendChild(renderMessages({ chatService: props.chatService }));
  main.appendChild(renderForm({ chatService: props.chatService }));
  return main;
};

const renderMessages = (props: { chatService: ChatService }) => {
  const ul = document.createElement("ul");
  props.chatService.addListener((message) => {
    ul.appendChild(renderMessage({ message }));
    window.scrollTo(0, document.body.scrollHeight);
  });
  return ul;
};

const renderMessage = (props: { message: string }) => {
  const li = document.createElement("li");
  li.textContent = props.message;
  return li;
};

const renderForm = (props: { chatService: ChatService }) => {
  const form = document.createElement("form");
  const input = renderInput();
  form.appendChild(input);
  form.appendChild(renderSubmit());
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (input.value) {
      props.chatService.send(input.value);
      input.value = "";
    }
  });
  window.addEventListener("beforeunload", () => {
    props.chatService.send("leave");
  });
  return form;
};

const renderInput = () => {
  const input = document.createElement("input");
  input.placeholder = "Type something... (type 'leave' to close server stream)";
  input.autofocus = true;
  return input;
};

const renderSubmit = () => {
  const button = document.createElement("button");
  button.type = "submit";
  button.textContent = "Send";
  return button;
};
