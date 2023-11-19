export function getCookie(name: string) {
  console.log(name);

  const matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)",
    ),
  );
  console.log(matches ? decodeURIComponent(matches[1]) : undefined);

  return matches ? decodeURIComponent(matches[1]) : undefined;
}
