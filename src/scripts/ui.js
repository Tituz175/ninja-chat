// render chat templates to the DOM
// clear the list of chats (when room changes)

class ChatUI {
  constructor(list) {
    this.list = list;
  }
  clear() {
    this.list.innerHTML = "";
  }
  render(data) {
    // console.log(data.created_at);
    const when = dateFns.distanceInWordsToNow(data.created_at.toDate(), {
      addSuffix: true,
    });
    const html = `
      <li class="border rounded-sm my-2 py-2 px-3">
        <span class="username font-semibold capitalize">${data.username}</span>
        <span class="message">${data.message}</span>
        <div class="time text-gray-400">${when}</div>
      </li>
    `;
    this.list.innerHTML += html;
  }
}
