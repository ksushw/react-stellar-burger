interface Window {
  x: string;
  fetchAuth: (
    link: string,
    config: {
      method?: string;
      headers?: {
        [key: string]: string;
      };
      body?: string;
    },
  ) => Promise<Response>;
}
