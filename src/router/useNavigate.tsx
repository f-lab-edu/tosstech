export function useNavigate() {
  function navigate(path: string) {
    window.history.pushState({}, "", path);
  }

  return { navigate };
}
