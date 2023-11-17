interface Window {
  x: string;
  fetchAuth: (link: string, config: object) => Promise<void>;
}
