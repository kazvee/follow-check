window.onload = async () => {
  try {
    const response = await fetch("/api/data");
    const data = await response.json();

    const youDontFollowBackContainer =
      document.getElementById("youDontFollowBack");
    const notFollowingYouBackContainer = document.getElementById(
      "notFollowingYouBack"
    );

    youDontFollowBackContainer.innerHTML = data.youDontFollowBack
      .map((user) => `<li>${user}</li>`)
      .join("");
    notFollowingYouBackContainer.innerHTML = data.notFollowingYouBack
      .map((user) => `<li>${user}</li>`)
      .join("");
  } catch (error) {
    console.error("☹️ Error fetching data:", error);
  }
};
