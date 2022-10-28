let formUpload = document.getElementById("form-upload");

formUpload.addEventListener("click", (e) => {
  let id = window.location.href.split("/")[4];
  if (e.target.id == "upload-btn") {
    let title = formUpload.children[2].children[1].value;
    let content = formUpload.children[3].children[1].value;
    if (title && content) {
      let data = {
        title,
        content,
      };
      fetch(`http://127.0.0.1:3800/users/${id}/upload`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
});
