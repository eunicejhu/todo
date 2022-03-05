const url = "https://randomuser.me/api/";

export interface AvartarInfo {
  large: string;
  medium: string;
  thumbnail: string;
}
export function fetchAvatar(): Promise<AvartarInfo> {
  return fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const result = data.results[0];
      if (result) {
        return result.picture;
      }
      return { thumbnail: "" };
    });
}
